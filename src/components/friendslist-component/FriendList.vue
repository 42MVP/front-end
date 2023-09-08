<template>
  <BasicListFrame>
    <template #title>{{ listType }}</template>
    <template #title-icon>
      <div class="title-icon-relative" @click="isMenu = !isMenu">
        {{ !isMenu ? '⊕' : '⊖' }}
      </div>
    </template>
    <template #title-icon-menu>
      <DropdownMenu v-if="isMenu">
        <template #dropdown-item>
          <DropdownMenuItem text="Blocks" @click="setType('Blocks')" />
          <DropdownMenuItem text="Friends" @click="setType('Friends')" />
        </template>
      </DropdownMenu>
    </template>
    <template #user-element>
      <div>
        <BasicList :items="users" @chooseItem="chooseUser" @clickItemSlot="removeFromList" #default="{ clickButton }">
          <BasicButton :text="getButtonTitle()" @click="clickButton" />
        </BasicList>
      </div>
    </template>
  </BasicListFrame>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { type OthersInfo } from '@/interfaces/FriendsInfo.interface';
import BasicListFrame from '@/components/BasicListFrame.vue';
import DropdownMenu from '@/components/dropdown-component/DropdownMenu.vue';
import DropdownMenuItem from '@/components/dropdown-component/DropdownMenuItem.vue';
import BasicList from '@/components/BasicList.vue';
import BasicButton from '@/components/BasicButton.vue';
import { UserService } from '@/services/user.service';
import { useUsersStore } from '@/stores/users.store';
import { SocketService } from '@/services/socket.service';

const isMenu = ref(false);
const userStore = useUsersStore();

const listType = ref<string>('Friends');
const users = ref<OthersInfo[]>([]);

const removeFromList = async (id: number) => {
  users.value = users.value.filter(u => u.id !== id);
  if (listType.value === 'Friends') {
    userStore.friends.filter(u => u.id !== id);
    await UserService.unfollowUser(id);
  } else if (listType.value === 'Blocks') {
    userStore.blocks.filter(u => u.id !== id);
    await UserService.unblockUser(id);
  }
  userStore.selectedUserId = -1;
};

const setType = (type: string) => {
  listType.value = type;
};

const getButtonTitle = () => {
  return listType.value === 'Friends' ? 'unfollow' : 'unblock';
};

const updateUser = (id: number, state: string): void => {
  for (const user of users.value) {
    if (user.id === id) {
      user.state = state;
      return;
    }
  }
};

onMounted(async () => {
  const socket = SocketService.getInstance().getSocket();
  socket.on('user-update', (d: { id: number; state: string }) => {
    updateUser(d.id, d.state);
  });
  const friends: OthersInfo[] = await UserService.getFriendsList();
  friends.forEach(e => {
    userStore.addFriends(e);
  });
  users.value = friends;
  const blocks: OthersInfo[] = await UserService.getBlocksList();
  blocks.forEach(e => {
    userStore.addBlocks(e);
  });
});

onUnmounted(() => {
  const socket = SocketService.getInstance().getSocket();
  socket.off('user-update');
});

watch(
  () => listType.value,
  () => {
    if (listType.value === 'Friends') {
      users.value = userStore.friends;
      userStore.selectedUserId = -1;
    } else if (listType.value === 'Blocks') {
      users.value = userStore.blocks;
      userStore.selectedUserId = -1;
    }
  },
);

const chooseUser = (userId: number) => {
  userStore.selectedUserId = userId;
};
</script>

<style scoped>
.listBox {
  margin: 0;
  padding: 0px 20px 20px 10px;
}
.title-icon-relative {
  position: relative;
}

ul {
  list-style-type: none;
}
</style>
