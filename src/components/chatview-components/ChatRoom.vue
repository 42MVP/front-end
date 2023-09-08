<template>
  <ManageChannelMemberModal :isShow="modalName === '멤버 관리'" @close="modalName = ''" />
  <ChangeChannelPasswordModal :isShow="modalName === '비밀번호 변경'" @close="modalName = ''" />
  <SetChannelPasswordModal :isShow="modalName === '비밀번호 설정'" @close="modalName = ''" @submit="modalName = ''" />
  <DeleteChannelPasswordModal
    :isShow="modalName === '비밀번호 해제'"
    @close="modalName = ''"
    @submit="
      console.log('비밀 번호 해제');
      modalName = '';
    "
  />
  <SetChannelPrivateModal
    :isShow="modalName === '프라이빗 설정'"
    @submit="
      console.log('프라이빗 설정');
      modalName = '';
    "
  />
  <UndoChannelPrivateModal
    :isShow="modalName === '프라이빗 해제'"
    @submit="
      console.log('프라이빗 설정');
      modalName = '';
    "
  />

  <div class="chat-list-container">
    <div v-if="chatStore.chatRoom?.roomMode !== RoomMode.DIRECT" class="chat-box-list-name">
      <div class="chat-box-list-name-left">
        <div class="chat-box-list-name-left-word" style="font-weight: bold;">{{ chatStore.chatRoom?.name }}</div>
        <div class="chat-box-list-name-left-icon-container">
          <div class="chat-box-list-name-left-icon" @click="isActiveDropdown = !isActiveDropdown">
            {{ !isActiveDropdown ? '⊕' : '⊖' }}
          </div>
          <DropdownMenu v-if="isActiveDropdown" style="min-width: max-content">
            <template #dropdown-item>
              <BasicList
                :items="chatStore.chatRoom?.users"
                @chooseItem="showUserProfile"
                :iconButtons="[{ emoji: '✉️', event: 'invite' }]"
                @clickIconButton="inviteGame"
              />
            </template>
          </DropdownMenu>
        </div>
      </div>
      <div v-if="chatStore.chatRoom?.self.role !== 'USER'" class="chat-box-list-name-right">
        <div class="list-element-icon-container">
          <div class="chat-box-icon" @click="setModal('멤버 관리')">✅</div>
          <button
            v-show="chatStore.chatRoom?.self.role === 'OWNER'"
            v-for="(modeButton, index) in roomModeIcon[roomMode]"
            :key="index"
            @click="setModal(modeButton.modal)"
          >
            {{ modeButton.emoji }}
          </button>
        </div>
      </div>
    </div>
    <div v-else class="chat-box-list-name">
      <div class="chat-box-list-name-left-word">
        <span class="chat-box-list-dm-name" @click="toProfile">
          {{ chatStore.chatRoom?.users[0]?.name && chatStore.chatRoom?.users[0]?.name }}
        </span>
        님과의 대화</div>
    </div>
    <MessageList :chats="chatStore.chat" />
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
import { useUsersStore } from '@/stores/users.store';
// interfaces
import { RoomMode } from '@/services/chat.service';
import type { IconEmitResponse } from '@/interfaces/IconEmitResponse.interface';
import type { RoomModeIcon } from '@/interfaces/chat/ChatRoom.interface';
import type { Chat } from '@/interfaces/chat/Chat.interface';
// services
import { ChatSocketService } from '@/services/chatSocket.service';
import { GameService } from '@/services/game.service';
import { useRouter } from 'vue-router';

const router = useRouter();

const chatStore = useChatStore();
const loginStore = useLoginStore();
const usersStore = useUsersStore();

const modalName = ref<string>('');
const isActiveDropdown = ref<boolean>(false);
const roomMode = ref<string>(chatStore.chatRoom?.roomMode || '');
const role = chatStore.chatRoom?.self.role;

watch(
  () => chatStore.isSelected && chatStore.chatRoom?.roomMode,
  newMode => {
    newMode ? (roomMode.value = newMode) : (roomMode.value = '');
  },
);

const toProfile = () => {
  router.push(`/users/${chatStore.chatRoom?.users[0]?.name}`)
}

const addChat = (newMessage: string): void => {
  if (chatStore.isSelected)
    ChatSocketService.sendMessage(
      chatStore.selectedID,
      loginStore.id,
      loginStore.name,
      loginStore.avatarURL,
      newMessage,
    );
};

const showUserProfile = (userId: number) => {
  const selectedUser = chatStore.chatRoom?.users.find(u => u.id === userId);
  router.push(`/users/${selectedUser?.name}`);
};

// const filterChat = (): Chat[] => {
//   const filteredChat = chatStore.chat.filter(chat => {
//     const blocksChat = usersStore.blocks.find(block => block.name === chat.username);
//   });
//   return filteredChat;
// }

const setModal: Function = (name: string) => {
  modalName.value = name;
};

const roomModeIcon: Record<string, RoomModeIcon[]> = {
  PUBLIC: [
    { emoji: '🔓', modal: '비밀번호 설정' },
    { emoji: '🙉', modal: '프라이빗 설정' },
  ],
  PRIVATE: [
    { emoji: '🔓', modal: '비밀번호 설정' },
    { emoji: '🙈', modal: '프라이빗 해제' },
  ],
  PROTECTED: [
    { emoji: '🔒', modal: '비밀번호 변경' },
    { emoji: '🔑', modal: '비밀번호 해제' },
  ],
};

const emits = defineEmits(['response']);

const inviteGame = (iconEmitResponse: IconEmitResponse) => {
  GameService.invitation.inviteMatching(iconEmitResponse.id);
};
</script>

<style scoped>
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
.chat-box-list-dm-name {
  font-weight: bold;
  cursor: pointer;
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
