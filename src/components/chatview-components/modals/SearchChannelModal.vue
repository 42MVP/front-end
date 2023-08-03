<template>
  <Modal title="채널 탐색">
    <template #body>
      <SearchBar
        placeholderText="채널명을 입력하세요"
        icon="🔍"
        :isMenu="searchChatList.length > 0"
        @response="e => searchRoom(e)"
      >
        <template #search-bar-item>
          <BasicList :items="chatList" @chooseItem="chooseRoom" />
        </template>
      </SearchBar>
      <div v-if="enterStatus === EnterStatus.PASSWORD">비밀방입니다.</div>
      <TextInputBox
        v-if="enterStatus === EnterStatus.PASSWORD"
        type="password"
        placeholderText="비밀번호 입력"
        :maxLength="15"
        @response="
          e => {
            if (e === '') password = undefined;
            password = e;
          }
        "
      />
      <div v-else-if="enterStatus === EnterStatus.CONFIRM">공개방입니다. 바로 입장하시겠습니까?</div>
    </template>
    <template #footer>
      <BasicButton v-if="enterStatus === EnterStatus.CHOICE" :type="false" text="닫기" @click="emits('close')" />
      <BasicButton
        v-if="enterStatus !== EnterStatus.CHOICE"
        :type="false"
        text="취소"
        @click="enterStatus = EnterStatus.CHOICE"
        style="margin-right: 5px"
      />
      <BasicButton
        v-if="enterStatus !== EnterStatus.CHOICE"
        :type="true"
        text="확인"
        @click="
          enterRoom(selectionRoomId, password);
          emits('close');
        "
      />
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
// components
import Modal from '@/components/Modal.vue';
import SearchBar from '@/components/SearchBar.vue';
import BasicList from '@/components/BasicList.vue';
import BasicButton from '@/components/BasicButton.vue';
import TextInputBox from '@/components/TextInputBox.vue';
// service
import { ChatService, RoomMode } from '@/services/chat.service';
// store
import { useChatStore } from '@/stores/chat.store';
import { useModalStore } from '@/stores/modal.store';
// interface
import type { ChatRoom } from '@/interfaces/chat/ChatRoom.interface';
import type { User } from '@/interfaces/user/User.interface';

const EnterStatus = {
  CHOICE: 1,
  CONFIRM: 2,
  PASSWORD: 3,
};

const enterStatus = ref<number>(EnterStatus.CHOICE);
const password = ref<string | undefined>(undefined);
const selectionRoomId = ref<number>(-1);

const chatStore = useChatStore();
const modalStore = useModalStore();

const chatList = ref<ChatRoom[]>([]);
const searchChatList = ref<ChatRoom[]>([]);

onMounted(async () => {
  try {
    const ret = await ChatService.searchChatList();
    chatList.value = ret;
  } catch (e) {
    modalStore.on({
      title: '알림',
      text: e,
      buttonText: '닫기',
      buttonFunc: () => {},
    });
  }
});

const emits = defineEmits(['close', 'submit']);

const searchRoom = (roomName: string) => {
  if (roomName === '') searchChatList.value = [];
  else searchChatList.value = chatList.value.filter(chat => chat.name.includes(roomName));
};

const chooseRoom = (roomId: number) => {
  const chatRoom = chatList.value.find(chat => chat.id === roomId);
  const roomMode = chatRoom?.roomMode;
  console.log('chooseRoom', chatRoom, roomMode);
  if (roomMode === RoomMode.PROTECTED) {
    enterStatus.value = EnterStatus.PASSWORD;
  } else {
    enterStatus.value = EnterStatus.CONFIRM;
  }
  selectionRoomId.value = roomId;
  searchChatList.value = [];
};

const enterRoom = async (roomId: number, password: string | undefined) => {
  try {
    const enter = await ChatService.enterRoom({ roomId: roomId, password: password });
    chatStore.addChatRoom(roomId, enter);
  } catch (e) {
    modalStore.on({
      title: '알림',
      text: e,
      buttonText: '닫기',
      buttonFunc: () => {},
    });
  }
};
</script>

<style scoped></style>
