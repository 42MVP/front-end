<template>
  <Modal title="비밀번호 변경" :show="props.isShow">
    <template #body>
      <TextInputBox type="password" placeholderText="비밀번호 입력" :maxLength="15" @response="e => (password = e)" />
      <TextInputBox
        type="passwordConfirm"
        placeholderText="비밀번호 입력 확인"
        :maxLength="15"
        :prevPassword="password"
        @response="e => (passwordDup = e)"
      />
    </template>
    <template #footer>
      <BasicButton :type="false" text="취소" @click="emits('close')" style="margin-right: 5px" />
      <BasicButton text="확인" @click="changeRoomPassword()" />
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import Modal from '@/components/Modal.vue';
import BasicButton from '@/components/BasicButton.vue';
import TextInputBox from '@/components/TextInputBox.vue';

import type { ChatInfo } from '@/interfaces/chat/ChatInfo.interface';
import type { ChatRoom, ChatRoomMode } from '@/interfaces/chat/ChatRoom.interface';
import { ChatService, RoomMode } from '@/services/chat.service';
import { useChatStore } from '@/stores/chat.store';

const emits = defineEmits(['close', 'submit']);
const props = defineProps<{
  chatInfo: ChatInfo;
  isShow: boolean;
}>();
const password = ref<string>('');
const passwordDup = ref<string>('');

const chatStore = useChatStore();

const changeRoomPassword = async () => {
  if (password.value === '') {
    console.log('비밀번호 공백');
    return;
  }
  if (password.value !== passwordDup.value) {
    console.log('비밀번호 확인 필요');
  }
  const roomInfo: ChatRoomMode = {
    roomId: props.chatInfo.id,
    roomMode: 'PROTECTED',
    password: password.value,
  };
  console.log(roomInfo);
  try {
    await ChatService.changeRoomMode(roomInfo);
    chatStore.setRoomMode(roomInfo.roomId, roomInfo.roomMode);
  } catch (e) {
    console.warn(e);
  }
};
</script>

<style scoped></style>
