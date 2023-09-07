<template>
  <Modal title="DM 생성" :show="props.isShow">
    <template #body>
      <SearchBar
        placeholderText="유저명을 입력하세요"
        icon="🔍"
        :isMenu="searchedUsers.length > 0"
        @activateSearch="searchUser"
        @response="updateSearchName"
      >
        <template #search-bar-item>
          <BasicList :items="searchedUsers" @chooseItem="selectUser" />
        </template>
      </SearchBar>
      <BasicListItem
        v-if="selectedUser"
        :item="selectedUser"
        :iconButtons="[{ emoji: '⊖', event: 'unSelect' }]"
        @clickIconButton="unSelectUser"
      />
    </template>
    <template #footer>
      <BasicButton :type="false" text="취소" @click="close()" style="margin-right: 5px" />
      <BasicButton
        :type="true"
        text="확인"
        @click="
          createRoom();
          close();
        "
      />
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Modal from '@/components/Modal.vue';
import SearchBar from '@/components/SearchBar.vue';
import BasicListItem from '@/components/BasicListItem.vue';
import BasicList from '@/components/BasicList.vue';
import BasicButton from '@/components/BasicButton.vue';
import { useLoginStore } from '@/stores/login.store';
import { useUsersStore } from '@/stores/users.store';
import { useChatStore } from '@/stores/chat.store';
import { UserService } from '@/services/user.service';
import { ChatService } from '@/services/chat.service';
import type { User } from '@/interfaces/user/User.interface';
import type { ChatInfo } from '@/interfaces/chat/ChatInfo.interface';
import type { ChatRoomCreateDM } from '@/interfaces/chat/ChatRoom.interface';

const loginStore = useLoginStore();
const userStore = useUsersStore();
const chatStore = useChatStore();

const searchName = ref<string>('');

const updateSearchName = (name: string) => {
  searchName.value = name;
};

const joinableUsers = ref<User[]>([] as User[]);

const searchUser = async () => {
  try {
    const allUsers: User[] = await UserService.getAllUser();
    const blockedUserIds = new Set(userStore.blocks.map(blockedUser => blockedUser.id));
    const filteredOutUserIds = new Set([...blockedUserIds, loginStore.id]);
    joinableUsers.value = allUsers.filter(user => !filteredOutUserIds.has(user.id));
  } catch (e) {
    console.warn(e);
  }
};

const searchedUsers = computed((): User[] => {
  if (searchName.value === '') return [];
  if (searchName.value === ' ') return joinableUsers.value;
  return joinableUsers.value.filter(user => user.name.startsWith(searchName.value));
});

const selectedUser = ref<User | undefined>(undefined);

const selectUser = (id: number) => {
  const idx = joinableUsers.value.findIndex(user => user.id === id);
  if (idx !== -1) selectedUser.value = joinableUsers.value.splice(idx, 1)[0];
};

const unSelectUser = () => {
  if (selectedUser.value) {
    joinableUsers.value = { ...joinableUsers.value, ...[selectedUser.value] };
    selectedUser.value = undefined;
  }
};

const createRoom = async () => {
  if (selectedUser.value === undefined) {
    return;
  }
  try {
    const chatRoom: ChatRoomCreateDM = {
      userId: selectedUser.value?.id,
      roomMode: 'DIRECT',
    };
    const room = await ChatService.createRoom(chatRoom);
    const chatInfo: ChatInfo = {
      id: room.id,
      name: room.name,
      roomMode: room.roomMode,
      isChannel: false,
      self: loginStore.owner,
      users: [],
      banUsers: [],
    };
    chatStore.addChatRoom(room.id, chatInfo);
  } catch (e) {
    console.warn(e);
  }
};

const close = () => {
  emits('close');
  selectedUser.value = undefined;
};

const emits = defineEmits(['close', 'submit']);
const props = defineProps<{ isShow: boolean }>();
</script>

<style scoped></style>
