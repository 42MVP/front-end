<template>
  <Modal title="Private 해제 설정" :show="props.isShow">
    <template #body> 채팅방이 더이상 Private 상태가 아니며, 검색 결과에 포함됩니다 </template>
    <template #footer>
      <BasicButton :type="false" text="취소" @click="emits('close')" style="margin-right: 5px" />
      <BasicButton
        text="확인"
        @click="
          changeRoomModePublic();
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
import { chatStore } from '@/main';

const emits = defineEmits(['close', 'submit']);
const props = defineProps<{
  isShow: boolean;
}>();

const chatSotre = useChatStore();

const changeRoomModePublic = async () => {
  if (!chatStore.isSelected) return;
  const roomMode: ChatRoomMode = {
    roomId: chatStore.selectedID,
    roomMode: 'PUBLIC',
  };
  chatStore.changeRoomMode(roomMode);
};
</script>

<style scoped></style>
