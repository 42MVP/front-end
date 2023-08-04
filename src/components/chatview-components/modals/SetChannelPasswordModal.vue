<template>
  <Modal title="비밀번호 설정" :show="props.isShow">
    <template #body>
      <TextInputBox type="password" placeholderText="비밀번호 입력" :maxLength="15" @response="e => (password = e)" />
      <TextInputBox
        type="password"
        placeholderText="비밀번호 입력 확인"
        :maxLength="15"
        @response="e => console.log('hh')"
      />
    </template>
    <template #footer>
      <BasicButton :type="false" text="취소" @click="emits('close')" style="margin-right: 5px" />
      <BasicButton text="확인" @click="changeRoomModeProtected()" />
    </template>
  </Modal>
</template>

<script setup lang="ts">
import Modal from '@/components/Modal.vue';
import BasicButton from '@/components/BasicButton.vue';
import TextInputBox from '@/components/TextInputBox.vue';

import type { ChatRoomMode } from '@/interfaces/chat/ChatRoom.interface';
import type { ChatInfo } from '@/interfaces/chat/ChatInfo.interface';

import { ChatService, RoomMode } from '@/services/chat.service';

const emits = defineEmits(['close', 'submit']);
const props = defineProps<{
  chatInfo: ChatInfo;
  isShow: boolean;
}>();
const password: string = '';

const changeRoomModeProtected = () => {
  if (password === '') {
    console.log('비밀번호 공백');
    return;
  }
  const roomMode: ChatRoomMode = {
    roomId: props.chatInfo.id,
    roomMode: 'PROTECTED',
    password: password,
  };
  console.log(roomMode);
  ChatService.changeRoomMode(roomMode);
};
</script>

<style scoped></style>
