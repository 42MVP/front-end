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
            :iconButtons="isUserTab ? icons[Mode.INVITE] : icons[Mode.BAN]"
            @clickIconButton="serviceChatUser"
          />
        </template>
      </SearchBar>

      <div v-if="isUserTab" class="modal-user-list-container">
        <BasicListItem :item="owner" :iconButtons="icons[Role.OWNER]" />
        <BasicList
          :items="chatStore.chatRoom?.users.filter(user => user.role === Role.ADMIN)"
          :iconButtons="
            owner?.id === loginStore.id ? [...icons[Role.ADMIN], ...icons[Mode.COMMON]] : icons[Mode.COMMON]
          "
          @onMousePosition="updateMousePosition"
          @clickIconButton="serviceChatUser"
          style="position: relative"
        />
        <BasicList
          :items="chatStore.chatRoom?.users.filter(user => user.role === Role.USER)"
          :iconButtons="owner?.id === loginStore.id ? [...icons[Role.USER], ...icons[Mode.COMMON]] : icons[Mode.COMMON]"
          @onMousePosition="updateMousePosition"
          @clickIconButton="serviceChatUser"
          style="position: relative"
        />
        <DropdownMenu
          v-if="isMuteTimeVisible && muteId"
          :style="{ top: buttonPosition.y + 1 + 'px', left: buttonPosition.x + 1 + 'px', width: '100px' }"
          class="dropdown-mute-container"
        >
          <template #dropdown-item>
            <DropdownMenuItem
              v-for="(item, index) in getMuteTime()"
              v-bind:key="index"
              :text="item.text"
              @click="chatStore.isSelected && serviceChatUserMute(muteId, chatStore.selectedID, item.time)"
            />
          </template>
        </DropdownMenu>
      </div>
      <div v-else class="modal-user-list-container">
        <BasicList
          :items="chatStore.chatRoom?.banUsers"
          :iconButtons="icons[Mode.NONE]"
          style="position: relative"
          @clickIconButton="serviceChatUser"
        />
      </div>
    </template>
    <template #footer>
      <BasicButton text="닫기" @click="closeModal" />
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, reactive } from 'vue';
// component
import Modal from '@/components/Modal.vue';
import SearchBar from '@/components/SearchBar.vue';
import BasicList from '@/components/BasicList.vue';
import BasicListItem from '@/components/BasicListItem.vue';
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
import type { IconButton } from '@/interfaces/IconButton.interface';
import type { IconEmitResponse } from '@/interfaces/IconEmitResponse.interface';
// utiles
import { createChatUserByEvent, Role, Mode } from '@/utils/chatuser.utils';
import { ms } from '@/utils/time.utils';

const chatStore = useChatStore();
const loginStore = useLoginStore();

const props = defineProps<{
  isShow: boolean;
}>();

const owner = ref<User | undefined>();

onMounted(() => {
  owner.value = getOwner();
});

const getOwner = (): User | undefined => {
  const chatInfo = chatStore.chatRoom;
  return chatInfo?.self.role === Role.OWNER ? chatInfo?.self : chatInfo?.users?.find(user => user.role == Role.OWNER);
};

const icons: Record<string, IconButton[]> = {
  INVITE: [{ emoji: '✉️', event: Mode.INVITE }],
  BAN: [{ emoji: '⚠️', event: Mode.BAN }],
  NONE: [{ emoji: '⊖', event: Mode.NONE }],
  OWNER: [{ emoji: '👑', event: Role.OWNER }],
  ADMIN: [{ emoji: '🚩', event: Role.USER }],
  USER: [{ emoji: '⚐', event: Role.ADMIN }],
  COMMON: [
    { emoji: '🔇', event: Mode.ONMUTE },
    { emoji: '🗙', event: Mode.KICK },
  ],
};

const isUserTab = ref(true);

const usersNotInChannel = ref<User[]>([] as User[]);
const searchedUsers = ref<User[]>([] as User[]);

const serviceGetUser = async () => {
  try {
    const ret = await UserService.mockUser();
    // const ret = await UserService.getAllUser();
    const allUsers: User[] = ret;
    const channelUserIds = new Set(chatStore.chatRoom?.users.map(user => user.id));
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

const getMuteTime = (): { text: string; time: string }[] => {
  const user = chatStore.chatRoom?.users.find(user => user.id === muteId.value);
  if (!user?.abongTime) return [];
  return new Date(user?.abongTime) < new Date()
    ? [
        { text: '1분', time: '00:00:60' },
        { text: '5분', time: '00:05:00' },
        { text: '30분', time: '00:30:00' },
        { text: '1시간', time: '01:00:00' },
        { text: '1일', time: '24:00:00' },
      ]
    : [{ text: '해제', time: '00:00:00' }];
};

const serviceChatUser = async (iconEmitResponse: IconEmitResponse) => {
  if (iconEmitResponse.eventName === Mode.ONMUTE) {
    muteId.value !== iconEmitResponse.id
      ? (isMuteTimeVisible.value = true)
      : (isMuteTimeVisible.value = !isMuteTimeVisible.value);
    muteId.value = iconEmitResponse.id;
    return;
  } else isMuteTimeVisible.value = false;
  const service = ChatService.getServiceChatUser(iconEmitResponse.eventName);
  if (!service) return;
  try {
    if (!chatStore.isSelected) throw '채팅룸 선택 오류';
    const chatUser = createChatUserByEvent(iconEmitResponse.id, chatStore.selectedID, iconEmitResponse.eventName);
    if (!chatUser) throw '채팅 유저 관리 모달 오류';
    const ret = await service(chatUser);
  } catch (e) {
    console.warn('serviceChatUser', e);
  }
};

const serviceChatUserMute = async (userId: number, roomId: number, time: string) => {
  isMuteTimeVisible.value = false;
  const muteTime = new Date(new Date().getTime() + ms(time));
  const chatUserState: ChatUserState = { userId, roomId, status: Mode.NONE };
  if (ms(time)) {
    chatUserState.status = Mode.MUTE;
    chatUserState.muteTime = muteTime;
  }
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
  () => {
    owner.value = getOwner();
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
