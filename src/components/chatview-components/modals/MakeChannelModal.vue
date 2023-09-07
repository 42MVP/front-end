<template>
  <Modal title="채널 생성" :show="props.isShow">
    <template #body>
      <TextInputBox placeholderText="채팅방 이름 입력" :maxLength="15" @response="e => (roomName = e)" />
      <div class="radio-button-out-div">
        <RadioButton :value="1" text="public" @click="selectButton" :isActive="setActive(1)" />
        <RadioButton :value="2" text="protected" @click="selectButton" :isActive="setActive(2)" />
        <RadioButton :value="3" text="private" @click="selectButton" :isActive="setActive(3)" />
      </div>
      <div v-if="setActive(2)">
        <TextInputBox type="password" placeholderText="비밀번호 입력" :maxLength="15" @response="e => (password = e)" />
        <TextInputBox
          type="password"
          placeholderText="비밀번호 입력 확인"
          :maxLength="15"
          :prevPassword="password"
          @response="e => (password2th = e)"
        />
      </div>
    </template>
    <template #footer>
      <BasicButton :type="false" text="취소" @click="emits('close')" style="margin-right: 5px" />
      <BasicButton text="확인" @click="createRoom()" />
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ChatService } from '@/services/chat.service';

import Modal from '@/components/Modal.vue';
import BasicButton from '@/components/BasicButton.vue';
import RadioButton from '@/components/RadioButton.vue';
import TextInputBox from '@/components/TextInputBox.vue';

import type { ChatRoomCreateChannel } from '@/interfaces/chat/ChatRoom.interface';
import { useChatStore } from '@/stores/chat.store';
import { useLoginStore } from '@/stores/login.store';
import type { ChatInfo } from '@/interfaces/chat/ChatInfo.interface';

const emits = defineEmits(['close']);
const props = defineProps<{ isShow: boolean }>();

const mode: Record<number, string> = {
  1: 'PUBLIC',
  2: 'PROTECTED',
  3: 'PRIVATE',
};
const selectedMode = ref<number>(1);

const selectButton = (index: number) => {
  selectedMode.value = index;
};

const setActive = (index: number) => {
  return selectedMode.value === index;
};

const roomName = ref<string>('');
const password = ref<string>('');
const password2th = ref<string>('');

const chatStore = useChatStore();
const loginStore = useLoginStore();

const createRoom = async () => {
  if (mode[selectedMode.value] === 'PROTECTED') {
    // TODO : password 처리
    if (!password.value) throw '패스워드 필요';
    if (password.value !== password2th.value) throw '패스워드 불일치';
  }
  const chatRoom: ChatRoomCreateChannel = {
    roomName: roomName.value,
    roomMode: mode[selectedMode.value],
    password: password.value,
  };
  const room = await ChatService.createRoom(chatRoom);
  const chatInfo: ChatInfo = {
    id: room.id,
    name: room.name,
    roomMode: room.roomMode,
    isChannel: true,
    self: loginStore.owner,
    users: [],
    banUsers: [],
  };
  chatStore.addChatRoom(room.id, chatInfo);
};
</script>

<style scoped>
.radio-button-out-div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 24px;
  padding: 0px 10px;
}
</style>
