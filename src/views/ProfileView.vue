<template>
  <div v-if="!profileUser">
    No data
    <!-- TODO : 404 not found -->
  </div>
  <div v-else class="p-container">
    <div class="top">
      <AvatarItem class="p-info" :username="profileUser.name" :avartarUrl="profileUser.avatarURL">
        <div class="button-slot">
          <BasicButton v-if="profileUser.isBlock" class="unblock-button" text="unblock" @click="unBlockButton()" />
          <div class="two-buttons" v-else>
            <BasicButton v-if="!profileUser.isFollow" class="follow-button" text="Follow" @click="followButton()" />
            <BasicButton v-else class="follow-button" text="Unfollow" @click="unFollowButton()" />
            <BasicButton class="block-button" text="block" @click="blockButton()" />
          </div>
        </div>
      </AvatarItem>
      <div class="g-info">
        <GBox :rate="profileUser.rate" />
        <Achieve class="achieve"></Achieve>
      </div>
    </div>
    <div class="bottom">
      <GameHistory :username="profileUser.name" :img="profileUser.avatarURL" :histories="profileUser.gameHistory" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import GBox from '@/components/profileview-components/GameInfoBox.vue';
import BasicButton from '@/components/BasicButton.vue';
import AvatarItem from '@/components/common/AvatarItem.vue';
import Achieve from '@/components/profileview-components/UserAchievement.vue';
import GameHistory from '@/components/profileview-components/GameHistory.vue';
import type { UserInfo } from '@/interfaces/UserInfo.interface';
import * as mock from '@/contexts/fetchProfile';

const props = defineProps({
  username: { type: String, default: undefined },
});

const profileUser = ref<UserInfo>();

onMounted(() => {
  profileUser.value = mock.getUserInfo();
});

const followButton = () => {
  if (profileUser.value) {
    profileUser.value.isFollow = true;
  }
  console.log(profileUser.value);
};

const unFollowButton = () => {
  if (profileUser.value) {
    profileUser.value.isFollow = false;
  }
  console.log(profileUser.value);
};

const blockButton = () => {
  if (profileUser.value) {
    profileUser.value.isBlock = true;
    profileUser.value.isFollow = false;
  }
};

const unBlockButton = () => {
  if (profileUser.value) {
    profileUser.value.isBlock = false;
  }
};
</script>

<style scoped>
.p-container,
.p-container * {
  box-sizing: border-box;
  display: flex;
  align-self: stretch;
  position: relative;
  align-items: center;
}
.p-container {
  padding: 15px 0px;
  gap: 10px;
  flex-direction: column;
}

.top {
  justify-content: space-evenly;
  position: relative;
}

.p-info {
  color: var(--brown);
  font: 600 40px 'Inter', sans-serif;
  flex-direction: column;

  .button-slot {
    margin: 10px 10px;
    justify-content: center;
  }
}

.two-buttons {
  justify-content: space-around;
  width: 100%;
}

.g-info {
  flex-direction: column;
  gap: 5px;
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
  max-height: 30vh;

  background: var(--base-gray);
  opacity: 0.7;
  overflow: auto;
}
</style>
@/contexts/fetchProfile
