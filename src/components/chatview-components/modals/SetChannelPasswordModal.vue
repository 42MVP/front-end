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
      <BasicButton
        text="확인"
        @click="
          changeRoomModeProtected();
          emits('close');
        "
      />
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Modal from '@/components/Modal.vue';
import BasicButton from '@/components/BasicButton.vue';
import TextInputBox from '@/components/TextInputBox.vue';

import type { ChatRoomMode } from '@/interfaces/chat/ChatRoom.interface';
import type { ChatInfo } from '@/interfaces/chat/ChatInfo.interface';

import { ChatService, RoomMode } from '@/services/chat.service';
import { useChatStore } from '@/stores/chat.store';

const emits = defineEmits(['close', 'submit']);
const props = defineProps<{
  isShow: boolean;
}>();
const password = ref<string>('');
const passwordDup = ref<string>('');

const chatStore = useChatStore();

const validForm = (): never | void => {
  if (password.value === '') throw '비밀번호 공백';
  if (password.value !== passwordDup.value) throw '비밀번호 확인 필요';
};

const changeRoomModeProtected = async () => {
  if (!chatStore.isSelected) return;
  validForm();
  const roomMode: ChatRoomMode = {
    roomId: chatStore.selectedID,
    roomMode: 'PROTECTED',
    password: password.value,
  };
  chatStore.changeRoomMode(roomMode);
};
</script>

<style scoped></style>
