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
          <DropdownMenuItem text="Blocks" @click="listType = 'Blocks'" />
          <DropdownMenuItem text="Friends" @click="listType = 'Friends'" />
        </template>
      </DropdownMenu>
    </template>
    <template #user-element>
      <BasicList :items="users" @chooseItem="chooseUser" @clickItemSlot="removeFromList" #default="{ clickButton }">
        <BasicButton :text="getButtonTitle()" @click="clickButton" />
      </BasicList>
    </template>
  </BasicListFrame>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { type OthersInfo } from '@/interfaces/FriendsInfo.interface';
import BasicListFrame from '@/components/BasicListFrame.vue';
import DropdownMenu from '@/components/dropdown-component/DropdownMenu.vue';
import DropdownMenuItem from '@/components/dropdown-component/DropdownMenuItem.vue';
import BasicList from '@/components/BasicList.vue';
import BasicButton from '@/components/BasicButton.vue';
import { UserService } from '@/services/user.service';
import { useUsersStore } from '@/stores/users.store';

const isMenu = ref(false);
const userStore = useUsersStore();

const listType = ref<string>('Friends');
const users = ref<OthersInfo[]>([]);

const removeFromList = async (id: number) => {
  try {
    users.value = users.value.filter(u => u.id !== id);
    if (listType.value === 'Friends') {
      userStore.friends.filter(u => u.id !== id);
      await UserService.unfollowUser(id);
    } else if (listType.value === 'Blocks') {
      userStore.blocks.filter(u => u.id !== id);
      await UserService.unblockUser(id);
    }
    userStore.selectedUserId = -1;
  } catch (e) {
    console.log(e);
  }
};

const getButtonTitle = () => {
  return listType.value === 'Friends' ? 'unfollow' : 'unblock';
};

onMounted(async () => {
  try {
    // const friends: OthersInfo[] = await UserService.getFriendsList();
    // friends.forEach(e => {
    //   userStore.addFriends(e);
    // });
    // console.log(friends);
    // users.value = friends;
    const blocks: OthersInfo[] = await UserService.getBlocksList();
    blocks.forEach(e => {
      userStore.addBlocks(e);
    });
  } catch (e) {
    console.log(e);
  }
});

watch(
  () => listType.value,
  () => {
    if (listType.value === 'Friends') {
      users.value = userStore.friends;
    } else if (listType.value === 'Blocks') {
      users.value = userStore.blocks;
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
