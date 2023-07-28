<template>
  <div v-if="!profileUser">
    No data
    <!-- TODO : 404 not found -->
  </div>
  <div v-else class="p-container">
    <div class="top">
      <AvatarItem class="avatar-item" :username="profileUser.name" :avartarUrl="profileUser.avatarURL">
        <ProfileButton
          :isLoginUser="username === getLoginName"
          :isFollow="profileUser.isFollow"
          :isBlock="profileUser.isBlock"
        />
      </AvatarItem>
      <div class="g-info-div">
        <GBox class="g-box" :rate="profileUser.rate" />
        <Achieve class="achieve"></Achieve>
      </div>
    </div>
    <div class="bottom">
      <GameHistory :username="profileUser.name" :img="profileUser.avatarURL" :histories="profileUser.gameHistory" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import GBox from '@/components/profileview-components/GameInfoBox.vue';
import ProfileButton from '@/components/profileview-components/ProfileButton.vue';
import AvatarItem from '@/components/common/AvatarItem.vue';
import Achieve from '@/components/profileview-components/UserAchievement.vue';
import GameHistory from '@/components/profileview-components/GameHistory.vue';
import type { UserInfo } from '@/interfaces/UserInfo.interface';
import * as mock from '@/services/profile.service';
import { useLoginStore } from '@/stores/login.store';

const props = defineProps({
  username: { type: String, default: '' },
});

const profileUser = ref<UserInfo>();

onMounted(() => {
  profileUser.value = mock.getUserInfo(props.username);
});

const getLoginName = computed(() => {
  console.log(props.username);
  return useLoginStore().name;
});
</script>

<style scoped>
.p-container,
.p-container * {
  display: flex;
  position: relative;
  align-items: center;
}
.p-container {
  flex-direction: column;
  min-width: max-content;
}

.top {
  justify-content: center;
  position: relative;
  align-self: stretch;
  gap: 100px;
  max-height: max-content;
}

.avatar-item {
  color: var(--brown);
  font: 600 40px 'Inter', sans-serif;
  flex-direction: column;
}

.g-info-div {
  flex-direction: column;
  gap: 5px;
}

.g-box {
  align-self: stretch;
}

.achieve {
  background: var(--base-ivory);
  border-radius: 10px;
  padding: 80px 34px 80px 34px;
  justify-content: space-between;
}

.bottom {
  align-self: center;
  padding: 0px 15px;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 10px;
  font: var(--medium);

  min-height: 100px;
  max-height: 60vh;

  background: var(--base-gray);
  opacity: 0.7;
  overflow: auto;
}
</style>
