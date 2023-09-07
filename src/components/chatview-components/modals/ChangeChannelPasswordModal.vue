<template>
  <Modal title="비밀번호 변경" :show="props.isShow">
    <template #body>
      <TextInputBox type="password" placeholderText="비밀번호 입력" :maxLength="15" @response="e => (password = e)" />
      <TextInputBox
        type="password"
        placeholderText="비밀번호 입력 확인"
        :maxLength="15"
        :prevPassword="password"
        @response="e => (passwordDup = e)"
      />
    </template>
    <template #footer>
      <BasicButton :type="false" text="취소" @click="emits('close')" style="margin-right: 5px" />
      <BasicButton text="확인" @click="changeRoomPassword(); emits('close');" />
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Modal from '@/components/Modal.vue';
import BasicButton from '@/components/BasicButton.vue';
import TextInputBox from '@/components/TextInputBox.vue';

import type { ChatRoom, ChatRoomMode } from '@/interfaces/chat/ChatRoom.interface';
import { ChatService, RoomMode } from '@/services/chat.service';
import { useChatStore } from '@/stores/chat.store';

const emits = defineEmits(['close', 'submit']);
const props = defineProps<{
  isShow: boolean;
}>();
const password = ref<string>('');
const passwordDup = ref<string>('');

const chatStore = useChatStore();

const isValidPassword = () => {
  if (password.value === '') return false;
  if (password.value !== passwordDup.value) return false;
  return true;
};

const changeRoomPassword = async () => {
  if (!chatStore.isSelected || !isValidPassword) return;
  const roomInfo: ChatRoomMode = {
    roomId: chatStore.selectedID,
    roomMode: 'PROTECTED',
    password: password.value,
  };
  try {
    await ChatService.changeRoomMode(roomInfo);
    chatStore.setRoomMode(roomInfo.roomId, roomInfo.roomMode);
  } catch (e) {
    console.warn(e);
  }
};
</script>

<style scoped></style>
