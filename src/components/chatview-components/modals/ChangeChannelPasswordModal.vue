<template>
  <Modal title="비밀번호 변경" :show="props.isShow">
    <template #body>
      <TextInputBox type="password" placeholderText="비밀번호 입력" :maxLength="15" @response="e => console.log(e)" />
      <TextInputBox
        type="password"
        placeholderText="비밀번호 입력 확인"
        :maxLength="15"
        @response="e => console.log(e)"
      />
    </template>
    <template #footer>
      <BasicButton :type="false" text="취소" @click="emits('close')" style="margin-right: 5px" />
      <BasicButton text="확인" @click="changeRoomPassword()" />
    </template>
  </Modal>
</template>

<script setup lang="ts">
import Modal from '@/components/Modal.vue';
import BasicButton from '@/components/BasicButton.vue';
import TextInputBox from '@/components/TextInputBox.vue';

import type { ChatInfo } from '@/interfaces/chat/ChatInfo.interface';
import type { ChatRoom, ChatRoomMode } from '@/interfaces/chat/ChatRoom.interface';
import { ChatService, RoomMode } from '@/services/chat.service';

const emits = defineEmits(['close', 'submit']);
const props = defineProps<{
  chatInfo: ChatInfo;
  isShow: boolean;
}>();
const password: string = '';

const changeRoomPassword = () => {
  if (password === '') {
    console.log('비밀번호 공백');
  }
  const roomInfo: ChatRoomMode = {
    roomId: props.chatInfo.id,
    roomMode: 'PUBLIC',
    password: password,
  };
  console.log(roomInfo);
  ChatService.changeRoomMode(roomInfo);
};
</script>

<style scoped></style>
