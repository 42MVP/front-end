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

const props = defineProps({
  isLoginUser: { type: Boolean, default: false },
  isFollow: { type: Boolean, default: false },
  isBlock: { type: Boolean, default: false },
});

const isFollow = ref<Boolean>(props.isFollow);
const isBlock = ref<Boolean>(props.isBlock);

const editButton = () => {
  router.push('/users');
};
const followButton = () => {
  isFollow.value = true;
  console.log(isFollow.value);
};

const unFollowButton = () => {
  isFollow.value = false;
  console.log(isFollow.value);
};

const blockButton = () => {
  isBlock.value = true;
  isFollow.value = false;
};

const unBlockButton = () => {
  if (isBlock.value) {
    isBlock.value = false;
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
