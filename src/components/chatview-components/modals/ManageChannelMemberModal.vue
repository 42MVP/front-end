<template>
  <Modal title="멤버 관리" :show="props.isShow">
    <template #body>
      <div class="choice-block-container">
        <div :class="isUserTab ? 'choice-block' : 'choice-block-unchoose'" @click="isUserTab = true">채널 유저</div>
        <div :class="!isUserTab ? 'choice-block' : 'choice-block-unchoose'" @click="isUserTab = false">차단 유저</div>
      </div>
      <SearchBar
        placeholderText="유저명을 입력하세요"
        icon="👩‍🌾"
        :isMenu="searchedUsers.length > 0"
        @activateSearch="serviceGetUser"
        @response="searchUser"
      >
        <template #search-bar-item>
          <BasicList
            :items="searchedUsers"
            :iconButtons="isUserTab ? inviteIcon : banIcon"
            @clickIconButton="serviceChatUser"
          />
        </template>
      </SearchBar>

      <div v-if="isUserTab" class="modal-user-list-container">
        <BasicList :items="[onwer]" :clickEvent="false" :iconButtons="onwerIcon" style="position: relative" />
        <BasicList
          :items="chatStore.rooms[chatStore.selectedID].users.filter(user => user.role === 'ADMIN')"
          :iconButtons="onwer.id === loginStore.id ? [...adminIcon, ...userTabIcon] : userTabIcon"
          @onMousePosition="updateMousePosition"
          @clickIconButton="serviceChatUser"
          style="position: relative"
        />
        <BasicList
          :items="chatStore.rooms[chatStore.selectedID].users.filter(user => user.role === 'USER')"
          :iconButtons="onwer.id === loginStore.id ? [...userIcon, ...userTabIcon] : userTabIcon"
          @onMousePosition="updateMousePosition"
          @clickIconButton="serviceChatUser"
          style="position: relative"
        />
      </div>
      <div v-else class="modal-user-list-container">
        <BasicList
          :items="chatStore.rooms[chatStore.selectedID].banUsers"
          :iconButtons="banTabIcon"
          style="position: relative"
          @clickIconButton="e => console.log(e)"
        />
      </div>
    </template>
    <template #footer>
      <BasicButton text="닫기" @click="closeModal" />
    </template>
  </Modal>
  <DropdownMenu
    v-if="isMuteTimeVisible && muteId"
    :style="{ top: buttonPosition.y + 1 + 'px', left: buttonPosition.x + 1 + 'px', width: '100px' }"
    class="dropdown-mute-container"
  >
    <template #dropdown-item>
      <DropdownMenuItem text="1분" @click="serviceChatUserMute(muteId, chatStore.selectedID, '00:00:60')" />
      <DropdownMenuItem text="5분" @click="serviceChatUserMute(muteId, chatStore.selectedID, '00:05:00')" />
      <DropdownMenuItem text="30분" @click="serviceChatUserMute(muteId, chatStore.selectedID, '00:30:00')" />
      <DropdownMenuItem text="1시간" @click="serviceChatUserMute(muteId, chatStore.selectedID, '01:00:00')" />
      <DropdownMenuItem text="1일" @click="serviceChatUserMute(muteId, chatStore.selectedID, '24:00:00')" />
    </template>
  </DropdownMenu>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, reactive } from 'vue';
// component
import Modal from '@/components/Modal.vue';
import SearchBar from '@/components/SearchBar.vue';
import BasicList from '@/components/BasicList.vue';
import BasicButton from '@/components/BasicButton.vue';
import DropdownMenu from '@/components/dropdown-component/DropdownMenu.vue';
import DropdownMenuItem from '@/components/dropdown-component/DropdownMenuItem.vue';
// store
import { useChatStore } from '@/stores/chat.store';
import { useLoginStore } from '@/stores/login.store';
// services
import { UserService } from '@/services/user.service';
import { ChatService } from '@/services/chat.service';
// interfaces
import type { User } from '@/interfaces/user/User.interface';
import type { ChatUserState } from '@/interfaces/chat/ChatUser.interface';
import type { IconEmitResponse } from '@/interfaces/IconEmitResponse.interface';
// utiles
import { createChatUserByEvent } from '@/utils/chatuser.utils';
import { ms } from '@/utils/time.utils';

const chatStore = useChatStore();
const loginStore = useLoginStore();

const props = defineProps<{
  isShow: boolean;
}>();

const onwer = ref<User>({} as User);

onMounted(() => {
  onwer.value = getOwner();
});

const getOwner = (currentId: number = chatStore.selectedID) => {
  const chatInfo = chatStore.rooms[currentId];
  return chatInfo.role === 'ONWER'
    ? loginStore.$state
    : chatInfo?.users?.find(user => user.role == 'OWNER') || ({} as User);
};

const onwerIcon = [{ emoji: '👑', event: 'onwer' }];
const inviteIcon = [{ emoji: '✉️', event: 'INVITE' }];
const banIcon = [{ emoji: '⚠️', event: 'BAN' }];

const userTabIcon = [
  { emoji: '🔇', event: 'MUTE' },
  { emoji: '🗙', event: 'KICK' },
];
const banTabIcon = [{ emoji: '⊖', event: 'NONE' }];
const adminIcon = [{ emoji: '🚩', event: 'USER' }];
const userIcon = [{ emoji: '⚐', event: 'ADMIN' }];

const isUserTab = ref(true);

const usersNotInChannel = ref<User[]>([] as User[]);
const searchedUsers = ref<User[]>([] as User[]);

const serviceGetUser = async () => {
  try {
    const ret = await UserService.mockUser();
    // const ret = await UserService.getAllUser();
    const allUsers: User[] = ret;
    const channelUserIds = new Set(chatStore.rooms[chatStore.selectedID].users.map(user => user.id));
    usersNotInChannel.value = allUsers.filter(user => !channelUserIds.has(user.id));
  } catch (e) {
    console.warn(e);
  }
};

const searchUser = (name: string) => {
  if (name === '') {
    searchedUsers.value = [];
  } else if (name === ' ') {
    searchedUsers.value = usersNotInChannel.value;
  } else searchedUsers.value = usersNotInChannel.value.filter(user => user.name.startsWith(name));
};

const muteId = ref<number | null>(null);
const isMuteTimeVisible = ref<boolean>(false);

const serviceChatUser = async (iconEmitResponse: IconEmitResponse) => {
  console.log('serviceChatUser', iconEmitResponse.eventName);

  if (iconEmitResponse.eventName === 'MUTE') {
    isMuteTimeVisible.value = !isMuteTimeVisible.value;
    muteId.value = iconEmitResponse.id;
    return;
  }
  const service = ChatService.getServiceChatUser(iconEmitResponse.eventName);
  if (!service) return;
  try {
    const chatUser = createChatUserByEvent(iconEmitResponse.id, chatStore.selectedID, iconEmitResponse.eventName);
    if (!chatUser) throw '채팅 유저 관리 모달 오류';
    const ret = await service(chatUser);
  } catch (e) {
    console.warn('serviceChatUser', e);
  }
};

const serviceChatUserMute = async (userId: number, roomId: number, time: string) => {
  const muteTime = new Date(new Date().getTime() + ms(time));
  const chatUserState: ChatUserState = { userId, roomId, status: 'MUTE', muteTime };
  try {
    const ret = await ChatService.updateUserState(chatUserState);
  } catch (e) {
    console.warn('serviceChatUserMute', e);
  }
};

const emits = defineEmits<{
  (e: 'close'): void;
}>();

const buttonPosition = reactive({ x: 0, y: 0 });

const updateMousePosition = (event: MouseEvent) => {
  buttonPosition.x = event.clientX;
  buttonPosition.y = event.clientY;
};

const closeModal = () => {
  isMuteTimeVisible.value = false;
  emits('close');
};

watch(
  () => chatStore.selectedID,
  (currentId: number) => {
    onwer.value = getOwner(currentId);
  },
);
</script>

<style scoped>
.choice-block-container {
  padding-left: 3px;
  display: flex;
}

.choice-block {
  border: 1px solid #463f3a;
  border-bottom: none;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  padding: auto;
  width: 150px;
  height: 35px;
  color: var(--brown, #463f3a);
  text-align: center;
  font: var(--medium);
}

.choice-block-unchoose {
  border: 1px solid #463f3a;
  border-bottom: none;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  padding: auto;
  width: 150px;
  height: 35px;
  color: var(--semi-brown, #8a817c);
  background: #bcb8b1;
  text-align: center;
  font: var(--medium);
}

.modal-user-list-container {
  overflow: auto;
  max-height: 300px;
}
.dropdown-mute-container {
  z-index: 9998;
}
</style>
