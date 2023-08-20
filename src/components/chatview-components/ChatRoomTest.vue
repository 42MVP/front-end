<template>
  <ManageChannelMemberModal
    :chatInfo="chatStore.rooms[chatStore.selectedID]"
    :isShow="modalName === '멤버 관리'"
    @close="modalName = ''"
  />
  <ChangeChannelPasswordModal
    :isShow="modalName === 'setPassword'"
    :chatInfo="chatStore.rooms[chatStore.selectedID]"
    @close="modalName = ''"
  />
  <SetChannelPasswordModal
    :isShow="modalName === 'setPassword'"
    :chatInfo="chatStore.rooms[chatStore.selectedID]"
    @close="modalName = ''"
    @submit="modalName = ''"
  />
  <DeleteChannelPasswordModal
    :isShow="modalName === 'deletePassword'"
    :chatInfo="chatStore.rooms[chatStore.selectedID]"
    @close="modalName = ''"
    @submit="
      console.log('비밀 번호 해제');
      modalName = '';
    "
  />
  <SetChannelPrivateModal
    :isShow="modalName === 'setPrivate'"
    :chatInfo="chatStore.rooms[chatStore.selectedID]"
    @submit="
      console.log('프라이빗 설정');
      modalName = '';
    "
  />
  <UndoChannelPrivateModal
    :isShow="modalName === 'setPrivate'"
    :chatInfo="chatStore.rooms[chatStore.selectedID]"
    @submit="
      console.log('프라이빗 설정');
      modalName = '';
    "
  />

  <div class="chat-list-container">
    <div v-if="chatStore.rooms[chatStore.selectedID].roomMode !== RoomMode.DIRECT" class="chat-box-list-name">
      <div v-if="chatStore.rooms[chatStore.selectedID].self.role !== 'USER'" class="chat-box-list-name-right">
        <div class="list-element-icon-container">
          <div class="chat-box-icon" @click="setModal('멤버 관리')">✅</div>
          <div v-if="chatStore.rooms[chatStore.selectedID].self.role !== 'OWNER'">
            <button v-for="(modeButton, index) in roomModeIcon[roomMode]" :key="index" @click="modeButton.action">
              {{ modeButton.emoji }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="chat-box-list-name">
      <div class="chat-box-list-name-left-word">디엠상대 님과의 대화</div>
    </div>
    <MessageList :chats="chatStore.chats[chatStore.selectedID]" />
    <ChatInputBox
      @response="
        newMessage => {
          addChat(newMessage);
        }
      "
      :maxLength="150"
    />
  </div>
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
import type { RoomModeIcon } from '@/interfaces/chat/ChatRoom.interface';
// services
import { ChatSocketService } from '@/services/chatSocket.service';

const chatStore = useChatStore();
const loginStore = useLoginStore();

const isSelect = ref<boolean>(false);
const modalName = ref<string>('');
const isActiveDropdown = ref<boolean>(false);
const roomMode = ref('');
const role = chatStore.rooms[chatStore.selectedID].self.role;

watch(
  () => chatStore.rooms[chatStore.selectedID],
  () => {
    isSelect.value = true;
  },
);
const addChat = (newMessage: string): void => {
  ChatSocketService.sendMessage(chatStore.selectedID, loginStore.id, loginStore.name, loginStore.avatarURL, newMessage);
  //  const newChat: Chat = {
  //    id: loginStore.id,
  //    username: loginStore.name,
  //    avatarURL: loginStore.avatarURL,
  //    message: newMessage,
  //    date: new Date(),
  //  };
  //  chatStore.addChat(chatStore.selectedID, newChat);
};

const setModal: Function = (name: string) => {
  modalName.value = name;
};

const getRoomMode = () => {
  roomMode.value = chatStore.rooms[chatStore.selectedID].roomMode;
};

const roomModeIcon: Record<string, RoomModeIcon[]> = {
  PUBLIC: [
    { emoji: '🔓', action: "setModal('setPassword')" },
    { emoji: '🙉', action: "setModal('changePrivate')" },
  ],
  PRIVATE: [
    { emoji: '🔓', action: "setModal('setPassword')" },
    { emoji: '🙈', action: "setModal('changePublic')" },
  ],
  PROTECTED: [
    { emoji: '🔒', action: "setModal('setPassword')" },
    { emoji: '🔑', action: "setModal('deletePassword')" },
  ],
};

const emits = defineEmits(['response']);

const inviteGame = (iconEmitResponse: IconEmitResponse) => {
  console.log(iconEmitResponse.id, iconEmitResponse.eventName);
};
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
.list-element-container {
  display: flex;
  flex: none;
  justify-content: space-between;
  align-self: stretch;
  height: 80px;
  flex: 1;
}

.list-element-info-container {
  cursor: pointer;
  display: flex;
  align-items: center;
}

.list-element-info-container span {
  display: flex;
  align-items: center;
  color: var(--brown, #463f3a);
  font: var(--small);
  height: fit-content;
}

.list-element-icon-container {
  display: flex;
  align-items: center;
  justify-content: right;
  margin-right: 15px;
}

.list-element-icon-container button {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  width: 20px;
  height: 20px;
  border-radius: 10%;
  border: none;
  background-color: inherit;
  cursor: pointer;
  margin-left: 10px;
}

.list-element-icon-container button:hover {
  opacity: 0.5;
  transition: 0.1s ease-out;
}
</style>
