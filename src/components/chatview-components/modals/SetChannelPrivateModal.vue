<template>
  <Modal title="Private 설정" :show="props.isShow">
    <template #body> 채팅방이 private으로 설정되며 검색목록에 조회되지 않습니다. </template>
    <template #footer>
      <BasicButton :type="false" text="취소" @click="emits('close')" style="margin-right: 5px" />
      <BasicButton
        text="확인"
        @click="
          changeRoomModePrivate();
          emits('close');
        "
      />
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
  isShow: boolean;
}>();

const chatStore = useChatStore();

const changeRoomModePrivate = async () => {
  if (!chatStore.isSelected) return;
  const roomMode: ChatRoomMode = {
    roomId: chatStore.selectedID,
    roomMode: 'PRIVATE',
  };
  chatStore.changeRoomMode(roomMode);
};
</script>

<style scoped></style>
