<template>
  <ManageChannelMemberModal
    :friends="friends"
    :chatInfo="chatStore.rooms[chatStore.selectedID]"
    :isShow="modalName === '멤버 관리'"
    @close="modalName = ''"
  />
  <ChangeChannelPasswordModal :isShow="modalName === '비밀번호 변경'" @close="modalName = ''" />
  <SetChannelPasswordModal
    :isShow="modalName === '비밀번호 설정'"
    @close="modalName = ''"
    @submit="
      emits('response', { id: chatStore.rooms[chatStore.selectedID].id, roomMode: 'PROTECTED' });
      modalName = '';
    "
  />
  <DeleteChannelPasswordModal
    :isShow="modalName === '비밀번호 해제'"
    @close="modalName = ''"
    @submit="
      emits('response', { id: chatStore.rooms[chatStore.selectedID].id, roomMode: 'PUBLIC' });
      console.log('비밀 번호 해제');
      modalName = '';
    "
  />
  <div class="chat-list-container">
    <div v-if="chatStore.rooms[chatStore.selectedID].roomMode !== RoomMode.DIRECT" class="chat-box-list-name">
      <div class="chat-box-list-name-left">
        <div class="chat-box-list-name-left-word">{{ chatStore.rooms[chatStore.selectedID].name }}</div>
        <div class="chat-box-list-name-left-icon-container">
          <div class="chat-box-list-name-left-icon" @click="isActiveDropdown = !isActiveDropdown">
            {{ !isActiveDropdown ? '⊕' : '⊖' }}
          </div>
        </div>
      </div>
      <div class="chat-box-list-name-right">
        <div class="chat-box-icon-list">
          <div class="chat-box-icon" @click="setModal('멤버 관리')">✅</div>
          <div
            v-if="chatStore.rooms[chatStore.selectedID].roomMode === 'PROTECTED'"
            class="chat-box-icon"
            @click="setModal('비밀번호 변경')"
          >
            🔐
          </div>
          <div
            v-if="chatStore.rooms[chatStore.selectedID].roomMode === 'PROTECTED'"
            class="chat-box-icon"
            @click="setModal('비밀번호 해제')"
            style="border: 0px"
          >
            🔓
          </div>
          <div v-else class="chat-box-icon" @click="setModal('비밀번호 설정')" style="border: 0px">🔒</div>
        </div>
      </div>
    </div>
    <div v-else class="chat-box-list-name">
      <div class="chat-box-list-name-left-word">디엠상대 님과의 대화</div>
    </div>
    <MessageList :chats="chatStore.chats[chatStore.selectedID]" />
    <ChatInputBox @response="newMessage => addChat(newMessage)" :maxLength="150" />
  </div>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue';
// components
import ManageChannelMemberModal from '@/components/chatview-components/modals/ManageChannelMemberModal.vue';
import ChangeChannelPasswordModal from '@/components/chatview-components/modals/ChangeChannelPasswordModal.vue';
import DeleteChannelPasswordModal from '@/components/chatview-components/modals/DeleteChannelPasswordModal.vue';
import SetChannelPasswordModal from '@/components/chatview-components/modals/SetChannelPasswordModal.vue';
import MessageList from '@/components/chatview-components/MessageList.vue';
import ChatInputBox from '@/components/chatview-components/ChatInputBox.vue';
// stores
import { useLoginStore } from '@/stores/login.store';
import { useChatStore } from '@/stores/chat.store';
// interfaces
import { RoomMode } from '@/services/chat.service';
// services
import type { Chat } from '@/interfaces/chat/Chat.interface';

const isSelect = ref<boolean>(false);
const modalName = ref<string>('');
const isActiveDropdown = ref<boolean>(false);

const chatStore = useChatStore();
const loginStore = useLoginStore();

watch(
  () => chatStore.rooms[chatStore.selectedID],
  () => {
    isSelect.value = true;
  },
);

const setModal: Function = (name: string) => {
  modalName.value = name;
};

const addChat = (newMessage: string): void => {
  const newChat: Chat = {
    id: loginStore.id,
    username: loginStore.name,
    avatarURL: loginStore.avatarURL,
    message: newMessage,
    date: new Date(),
  };
  chatStore.addChat(chatStore.selectedID, newChat);
};

const emits = defineEmits(['response']);
</script>

<style scoped>
.title-icon-relative {
  position: relative;
}

.chat-list-container {
  display: flex;
  flex-direction: column;
  width: 900px;
  height: 80vh;
}

.chat-box-list-name {
  display: flex;
  justify-content: space-between;
  align-content: center;
}

.chat-box-list-name-left {
  display: flex;
  justify-content: space-between;
  align-content: center;
}

.chat-box-list-name-left-word {
  font: var(--medium);
  margin-right: 10px;
  color: var(--brown, #463f3a);
}

.chat-box-list-name-left-icon-container {
  position: relative;
}

.chat-box-list-name-left-icon {
  display: flex;
  justify-content: center;
  align-content: center;
  cursor: pointer;
  font: var(--medium);
  color: var(--brown, #463f3a);
}

.chat-box-list-name-left-icon:hover {
  opacity: 0.5;
  transition: 0.1s ease-out;
}

.chat-box-list-name-right {
  display: flex;
  justify-content: space-between;
  align-content: center;
}

.chat-box-icon-list {
  display: flex;
  border-radius: 5px;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #f4f3ee;
}

.chat-box-icon {
  display: flex;
  padding: 3px;
  width: 40px;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #f4f3ee;
  cursor: pointer;
}

.chat-box-icon:hover {
  opacity: 0.5;
  transition: 0.1s ease-out;
}

.send-message {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.input-bottom {
  display: flex;
  width: 100px;
  justify-content: space-between;
}
</style>
