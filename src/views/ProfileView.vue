<template>
  <div v-if="!selectedUser">
    No data
    <!-- TODO : 404 not found -->
  </div>
  <div v-else class="p-container">
    <div class="top">
      <Card class="p-info" :user_id="selectedUser.name" :img="selectedUser.img">
        <div class="button-slot">
          <DButton v-if="selectedUser.isBlock" class="unblock-button" label="unblock" @click="unBlockButton()" />
          <div class="two-buttons" v-else>
            <DButton v-if="!selectedUser.isFollow" class="follow-button" label="Follow" @click="followButton()" />
            <DButton v-else class="follow-button" label="Unfollow" @click="unFollowButton()" />
            <DButton class="block-button" label="block" @click="blockButton()" />
          </div>
        </div>
      </Card>
      <div class="g-info">
        <GBox :rate="1000" />
        <Achieve class="achieve"></Achieve>
      </div>
    </div>
    <div class="bottom">
      <GameHistory user_id="chaejkim" img="1.png" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import GBox from '@/components/profileview-components/GameInfoBox.vue';
import DButton from '@/components/tmp/DefaultButton.vue';
import Card from '@/components/profileview-components/ProfileCard.vue';
import Achieve from '@/components/profileview-components/UserAchievement.vue';
import GameHistory from '@/components/profileview-components/GameHistory.vue';

interface UserInfo {
  _id: number;
  name: string;
  img: string;
  isFollow: boolean;
  isBlock: boolean;
}

const users: UserInfo[] = [
  { _id: 1, name: 'chaejkim', img: '1.png', isFollow: false, isBlock: false },
  { _id: 2, name: 'kanghyki', img: '2.png', isFollow: false, isBlock: false },
  { _id: 3, name: 'hejang', img: '3.png', isFollow: false, isBlock: false },
  { _id: 4, name: 'hyeonki', img: '4.png', isFollow: false, isBlock: false },
  { _id: 5, name: 'hyeonkkim', img: '5.png', isFollow: false, isBlock: false },
];

const props = defineProps({
  user_id: { type: String, default: undefined },
});

const selectedUser = ref(findUserInfoByName(users, props.user_id));

function findUserInfoByName(users: UserInfo[], name: string | undefined): UserInfo | undefined {
  return users.find(user => user.name === name);
}

const followButton = () => {
  if (selectedUser.value) {
    selectedUser.value.isFollow = true;
  }
  console.log(selectedUser.value);
};

const unFollowButton = () => {
  if (selectedUser.value) {
    selectedUser.value.isFollow = false;
  }
  console.log(selectedUser.value);
};

const blockButton = () => {
  if (selectedUser.value) {
    selectedUser.value.isBlock = true;
    selectedUser.value.isFollow = false;
  }
};

const unBlockButton = () => {
  if (selectedUser.value) {
    selectedUser.value.isBlock = false;
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
