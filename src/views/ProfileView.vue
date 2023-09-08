<template>
  <div v-if="profileUser" class="p-container">
    <div class="top">
      <AvatarItem class="avatar-item" :username="profileUser.name" :avartarUrl="profileUser.avatarURL">
        <ProfileButton :isLoginUser="username === getLoginName" :profileUser="profileUser" />
      </AvatarItem>
      <div class="g-info-div">
        <GBox class="g-box" :record="gameRecord" />
      </div>
    </div>
    <div v-show="profileUser.gameHistory.length" class="bottom">
      <GameHistory :username="profileUser.name" :img="profileUser.avatarURL" :histories="profileUser.gameHistory" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue';
import GBox from '@/components/profileview-components/GameInfoBox.vue';
import ProfileButton from '@/components/profileview-components/ProfileButton.vue';
import AvatarItem from '@/components/common/AvatarItem.vue';
import Achieve from '@/components/profileview-components/UserAchievement.vue';
import GameHistory from '@/components/profileview-components/GameHistory.vue';
// stores
import { useLoginStore } from '@/stores/login.store';
// services
import { UserService } from '@/services/user.service';
// interfaces
import type { UserInfo } from '@/interfaces/user/UserInfo.interface';
import type { UserGameRecord } from '@/interfaces/user/UserGameRecord.interface';

const props = defineProps({
  username: { type: String, default: '' },
});

const profileUser = ref<UserInfo>();

const gameRecord = ref<UserGameRecord>();

onBeforeMount(async () => {
  profileUser.value = await UserService.getUserProfile(props.username);
  gameRecord.value = {
    rate: profileUser.value.rate,
    totalGame: profileUser.value.winNum + profileUser.value.loseNum,
    winNum: profileUser.value.winNum,
    loseNum: profileUser.value.loseNum,
  };
});

const getLoginName = computed(() => {
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
