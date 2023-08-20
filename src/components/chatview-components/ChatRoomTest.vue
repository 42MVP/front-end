<template>
  <div class="chat-list-container"></div>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue';
// components
import ManageChannelMemberModal from '@/components/chatview-components/modals/ManageChannelMemberModal.vue';
import ChangeChannelPasswordModal from '@/components/chatview-components/modals/ChangeChannelPasswordModal.vue';
import DeleteChannelPasswordModal from '@/components/chatview-components/modals/DeleteChannelPasswordModal.vue';
import SetChannelPasswordModal from '@/components/chatview-components/modals/SetChannelPasswordModal.vue';
import SetChannelPrivateModal from '@/components/chatview-components/modals/SetChannelPrivateModal.vue';
import UndoChannelPrivateModal from '@/components/chatview-components/modals/UndoChannelPrivateModal.vue';
import MessageList from '@/components/chatview-components/MessageList.vue';
import ChatInputBox from '@/components/chatview-components/ChatInputBox.vue';
import DropdownMenu from '@/components/dropdown-component/DropdownMenu.vue';
import BasicList from '@/components/BasicList.vue';

// stores
import { useLoginStore } from '@/stores/login.store';
import { useChatStore } from '@/stores/chat.store';
// interfaces
import { RoomMode } from '@/services/chat.service';
import type { IconEmitResponse } from '@/interfaces/IconEmitResponse.interface';
// services
import type { Chat } from '@/interfaces/chat/Chat.interface';
</script>

<style scoped></style>
