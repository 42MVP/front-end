<template>
  <div v-if="props.isLoginUser" class="profile-edit-container">
    <BasicButton class="follow-button" :type="false" text="Edit" @click="editButton()" />
  </div>
  <div v-else class="profile-container">
    <BasicButton v-if="isBlock" class="unblock-button" text="unblock" @click="unBlockButton()" />
    <div class="button-container" v-else>
      <BasicButton v-if="!isFollow" class="follow-button" text="Follow" @click="followButton()" />
      <BasicButton v-else class="follow-button" text="Unfollow" @click="unFollowButton()" />
      <BasicButton class="block-button" text="block" @click="blockButton()" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BasicButton from '@/components/BasicButton.vue';
import router from '@/router';
//stores
import { useUsersStore } from '@/stores/users.store';

// services
import { UserService } from '@/services/user.service';
// interfaces
import type { UserInfo } from '@/interfaces/user/UserInfo.interface';

const userStore = useUsersStore();

const props = defineProps({
  isLoginUser: { type: Boolean, default: false },
  profileUser: { type: UserInfo, default: '' },
});

const isFollow = ref<Boolean>(props.profileUser.isFollow);
const isBlock = ref<Boolean>(props.profileUser.isBlock);

const editButton = () => {
  router.push('/users');
};
const followButton = async () => {
  try {
    isFollow.value = true;
    await UserService.followUser(props.profileUser.id);
  } catch (e) {
    console.log(e);
  }
};

const unFollowButton = async () => {
  try {
    isFollow.value = false;
    await UserService.unfollowUser(props.profileUser.id);
    userStore.friends.filter(u => u !== props.profileUser);
  } catch (e) {
    console.log(e);
  }
};

const blockButton = async () => {
  try {
    isBlock.value = true;
    await UserService.blockUser(props.profileUser.id);
  } catch (e) {
    console.log(e);
  }
};

const unBlockButton = async () => {
  try {
    isBlock.value = false;
    await UserService.unblockUser(props.profileUser.id);
    userStore.blocks.filter(u => u !== props.profileUser);
  } catch (e) {
    console.log(e);
  }
};
</script>

<style scoped>
.profile-container,
.profile-edit-container {
  margin: 10px 10px;
}
.button-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10%;
  width: 100%;
}
</style>
