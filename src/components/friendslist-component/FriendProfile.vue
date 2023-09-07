<template>
  <div class="wrap">
    <div v-if="!selectedUser">🫥</div>
    <div v-else class="p-container">
      <div class="top">
        <AvatarItem class="p-info" :username="selectedUser?.name" :avartarUrl="selectedUser.avatarURL" />
        <div class="g-info">
          <GBox :record="userRecord" />
          <!-- <Achieve class="achieve"></Achieve> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import AvatarItem from '@/components/common/AvatarItem.vue';
import GBox from '@/components/profileview-components/GameInfoBox.vue';
import Achieve from '@/components/profileview-components/UserAchievement.vue';
import { useUsersStore } from '@/stores/users.store';

import type { OthersInfo } from '@/interfaces/FriendsInfo.interface';
import type { UserGameRecord } from '@/interfaces/user/UserGameRecord.interface';

const userStore = useUsersStore();

const selectedUser = ref<OthersInfo>();

const userRecord = ref<UserGameRecord>();

watch(
  () => userStore.selectedUserId,
  () => {
    selectedUser.value = userStore.friends.find(u => u.id === userStore.selectedUserId);
    setUserRecord();
  },
);

const setUserRecord = () => {
  const record = {
    rate: selectedUser.value?.rate ?? 0,
    totalGame: 0,
    winNum: selectedUser.value?.winNum ?? 0,
    loseNum: selectedUser.value?.loseNum ?? 0,
  };
  userRecord.value = record;
};

onMounted(() => {
  selectedUser.value = userStore.friends.find(u => u.id === userStore.selectedUserId);
});
</script>

<style scoped>
.wrap {
  display: flex;
  flex-flow: row;
}
.p-container,
.p-container * {
  box-sizing: border-box;
  display: flex;
  align-self: stretch;
  position: relative;
  align-items: center;
}
.p-container {
  /* padding: 15px 0px; */
  /* gap: 10px; */
  flex-direction: column;
}

.top {
  display: flex;
  flex-flow: column;
  justify-content: space-evenly;
  position: relative;
  margin-left: 60px;
  /* margin-bottom: 40px; */
}

.p-info {
  color: var(--brown);
  font: 600 40px 'Inter', sans-serif;
  flex-direction: column;
  margin-right: 50px;
}

.g-info {
  margin-top: 20px;
  flex-direction: column;
  gap: 5px;
}
.achieve {
  background: var(--base-ivory);
  /* border-radius: 10px; */
  padding: 80px 34px 80px 34px;
  justify-content: space-between;
}
</style>
