<script lang="ts">
import JoinChannelPasswordModal from '../chatview-components/modals/JoinChannelPasswordModal.vue';
import ManageChannelMemberModal from '../chatview-components/modals/ManageChannelMemberModal.vue';
import ChangeChannelPasswordModal from '../chatview-components/modals/ChangeChannelPasswordModal.vue';
import DeleteChannelPasswordModal from '../chatview-components/modals/DeleteChannelPasswordModal.vue';
import SetChannelPasswordModal from '../chatview-components/modals/SetChannelPasswordModal.vue';

import MessageList from '../chatview-components/MessageList.vue';
import ChatInputBox from '../chatview-components/ChatInputBox.vue';
import DropdownMenu from '../dropdown-component/DropdownMenu.vue';
import BasicListElement from '../BasicListElement.vue';

export default {
  components: {
    JoinChannelPasswordModal,
    ManageChannelMemberModal,
    ChangeChannelPasswordModal,
    SetChannelPasswordModal,
    DeleteChannelPasswordModal,
    MessageList,
    ChatInputBox,
    DropdownMenu,
    BasicListElement,
  },
  methods: {
    setModal(name: string) {
      this.modalName = name;
    },
    addChannelChat(newMessage: string) {
      this.selectChannel.chats = [
        ...this.selectChannel.chats,
        {
          id: 1,
          username: 'kanghyki',
          userAvatarURL: '',
          message: newMessage,
          date: new Date(),
        },
      ];
      this.chats = this.selectChannel.chats;
    },
    addUserChat(newMessage: string) {
      this.selectUser.chats = [
        ...this.selectUser.chats,
        {
          id: 1,
          username: 'kanghyki',
          userAvatarURL: '',
          message: newMessage,
          date: new Date(),
        },
      ];
      this.chats = this.selectUser.chats;
    },
  },
  data() {
    return {
      modalName: '',
      isSelect: true,
      isChannel: true,
      isChannelMenu: false,
      selectChannel: {
        id: 1,
        name: '42mvp',
        clickEvent: 'channelclick',
        avatarURL: '',
        alertCount: 42,
        hasPassword: false,
        users: [
          {
            id: 1,
            name: 'kanghyki',
            avatarURL: '',
          },
          {
            id: 2,
            name: 'hyeongki',
            avatarURL: '',
          },
        ],
        banUsers: [
          {
            id: 3,
            name: 'badguy',
            avatarURL: '',
          },
          {
            id: 4,
            name: 'whoami',
            avatarURL: '',
          },
        ],
        chats: [
          {
            id: 1,
            username: 'kanghyki',
            userAvatarURL: '',
            message: '이거봐봐 어때?',
            date: new Date(),
          },
          {
            id: 2,
            username: 'hyeognki',
            userAvatarURL: '',
            message: '오 대단한걸?',
            date: new Date(),
          },
        ],
      },
      selectUser: {
        id: 1,
        name: 'hyeongki',
        avatarURL: '',
        clickEvent: 'userclick',
        alertCount: 12,
        chats: [
          {
            id: 1,
            username: 'hyeongki',
            userAvatarURL: '',
            message: '이건 두번째 메세지',
            date: new Date(),
          },
        ],
      },
      friend_list_elements: [
        {
          id: 1,
          name: 'daram',
          avatarURL: '',
          clickEvent: 'friendclick',
        },
        {
          id: 2,
          name: 'goyang',
          avatarURL: '',
          clickEvent: 'friendclick',
        },
      ],
      chats: [
        {
          id: 1,
          username: 'kanghyki',
          userAvatarURL: '',
          message: '이거봐봐 어때?',
          date: new Date(),
        },
        {
          id: 2,
          username: 'hyeognki',
          userAvatarURL: '',
          message: '오 대단한걸?',
          date: new Date(),
        },
      ],
    };
  },
};
</script>

<template>
  <ManageChannelMemberModal :isShow="modalName === '멤버 관리'" @close="modalName = ''" />
  <ChangeChannelPasswordModal :isShow="modalName === '비밀번호 변경'" @close="modalName = ''" />
  <SetChannelPasswordModal
    :isShow="modalName === '비밀번호 설정'"
    @close="modalName = ''"
    @submit="
      selectChannel.hasPassword = true;
      modalName = '';
    "
  />
  <DeleteChannelPasswordModal
    :isShow="modalName === '비밀번호 해제'"
    @close="modalName = ''"
    @submit="
      selectChannel.hasPassword = false;
      modalName = '';
    "
  />
  <div v-if="isSelect" class="chat-list-container">
    <div v-if="isChannel" class="chat-box-list-name">
      <div class="chat-box-list-name-left">
        <div class="chat-box-list-name-left-word">{{ selectChannel.name }}</div>
        <div class="chat-box-list-name-left-icon-container">
          <div class="chat-box-list-name-left-icon" @click="isChannelMenu = !isChannelMenu">
            {{ !isChannelMenu ? '⊕' : '⊖' }}
          </div>
          <DropdownMenu v-if="isChannelMenu" style="width: 400px">
            <template #dropdown-element>
              <BasicListElement
                v-for="friend in friend_list_elements"
                :key="friend.id"
                :id="friend.id"
                :name="friend.name"
                :avatarURL="friend.avatarURL"
                :iconButtons="[{ emoji: '✉️', event: 'invite' }]"
                @response="e => console.log(e)"
              />
            </template>
          </DropdownMenu>
        </div>
      </div>
      <div class="chat-box-list-name-right">
        <div class="chat-box-icon-list">
          <div class="chat-box-icon" @click="setModal('멤버 관리')">✅</div>
          <div v-if="selectChannel.hasPassword" class="chat-box-icon" @click="setModal('비밀번호 변경')">🔐</div>
          <div
            v-if="selectChannel.hasPassword"
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
      <div class="chat-box-list-name-left-word">{{ selectUser.name }}님과의 대화</div>
    </div>
    <MessageList :chats="chats" />
    <ChatInputBox v-if="isChannel" @response="newMessage => addChannelChat(newMessage)" :maxLength="150" />
    <ChatInputBox v-else @response="newMessage => addUserChat(newMessage)" :maxLength="150" />
  </div>
  <div v-else class="chat-box-unchoose">☺️</div>
</template>

<style scoped>
.chat-box-unchoose {
  width: 900px;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 300px;
  opacity: 0.1;
  width: 100%;
  height: 100%;
}

.title-icon-relative {
  position: relative;
}

.chat-list-container {
  display: flex;
  flex-direction: column;
  width: 900px;
  height: 90%;
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
  font-size: 24px;
  font-family: Inter;
  font-weight: 700;
  margin-right: 10px;
  color: #463f3a;
}

.chat-box-list-name-left-icon-container {
  position: relative;
}

.chat-box-list-name-left-icon {
  display: flex;
  justify-content: center;
  align-content: center;
  cursor: pointer;
  font-size: 24px;
  color: #463f3a;
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

.modal-user-list-container {
  overflow: auto;
  max-height: 300px;
}
</style>
