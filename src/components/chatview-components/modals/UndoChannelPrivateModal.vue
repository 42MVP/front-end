<template>
  <Modal title="Private 해제 설정" :show="props.isShow">
    <template #body> 채팅방이 더이상 Private 상태가 아니며, 검색 결과에 포함됩니다 </template>
    <template #footer>
      <BasicButton :type="false" text="취소" @click="emits('close')" style="margin-right: 5px" />
      <BasicButton text="확인" @click="changeRoomModePublic()" />
    </template>
  </Modal>
</template>

<script setup lang="ts">
import Modal from '@/components/Modal.vue';
import BasicButton from '@/components/BasicButton.vue';

import type { ChatRoomMode } from '@/interfaces/chat/ChatRoom.interface';
import type { ChatInfo } from '@/interfaces/chat/ChatInfo.interface';

import { ChatService } from '@/services/chat.service';
import { useChatStore } from '@/stores/chat.store';

const emits = defineEmits(['close', 'submit']);
const props = defineProps<{
  chatInfo: ChatInfo;
  isShow: boolean;
}>();

const chatSotre = useChatStore();

const changeRoomModePublic = async () => {
  const roomMode: ChatRoomMode = {
    roomId: props.chatInfo.id,
    roomMode: 'PUBLIC',
  };
  console.log(roomMode);
  try {
    ChatService.changeRoomMode(roomMode);
    chatSotre.setRoomMode(roomMode.roomId, roomMode.roomMode);
  } catch (e) {
    console.warn(e);
  }
};
</script>

<style scoped></style>
