<template>
  <Modal title="비밀번호 설정" :show="props.isShow">
    <template #body>
      <TextInputBox
        type="password"
        placeholderText="비밀번호 입력"
        :maxLength="15"
        @response="pass => (password = pass)"
      />
      <TextInputBox
        type="passwordConfirm"
        placeholderText="비밀번호 입력 확인"
        :maxLength="15"
        :prevPassword="password"
        @response="pass => (passwordDup = pass)"
      />
    </template>
    <template #footer>
      <BasicButton :type="false" text="취소" @click="emits('close')" style="margin-right: 5px" />
      <BasicButton text="확인" @click="changeRoomModeProtected()" />
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import Modal from '@/components/Modal.vue';
import BasicButton from '@/components/BasicButton.vue';
import TextInputBox from '@/components/TextInputBox.vue';

import type { ChatRoomMode } from '@/interfaces/chat/ChatRoom.interface';
import type { ChatInfo } from '@/interfaces/chat/ChatInfo.interface';

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

const changeRoomModeProtected = async () => {
  if (password.value === '') {
    console.log('비밀번호 공백');
    return;
  }
  if (password.value !== passwordDup.value) {
    console.log('비밀번호 확인 필요');
  }
  const roomMode: ChatRoomMode = {
    roomId: props.chatInfo.id,
    roomMode: 'PROTECTED',
    password: password.value,
  };
  console.log(roomMode);
  try {
    await ChatService.changeRoomMode(roomMode);
    chatStore.setRoomMode(roomMode.roomId, roomMode.roomMode);
  } catch (e) {
    console.warn(e);
  }
};
</script>

<style scoped></style>
