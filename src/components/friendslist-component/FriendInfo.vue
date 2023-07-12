<template>
  <div class="wrap">
    <div v-if="!user">
      <!-- {{ selectedUser.name }} -->
      not found
    </div>
    <div v-else class="p-container">
      <div class="top">
        <Card class="p-info" :user_id="user.name" :img="user.img"> </Card>
        <div class="g-info">
          <GBox :rate="1000" />
          <Achieve class="achieve"></Achieve>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import GBox from '@/components/profileview-components/GameInfoBox.vue';
import Card from '@/components/profileview-components/ProfileCard.vue';
import Achieve from '@/components/profileview-components/UserAchievement.vue';
import { type FriendType } from '@/components/FriendsData';

const props = defineProps<{
  user: FriendType | undefined;
}>();
</script>

<style scoped>
/* .wrap {
  display: flex;
  flex-flow: row;
} */
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
  display: flex;
  flex-flow: column;
  justify-content: space-evenly;
  position: relative;
  margin-left: 60px;
  margin-top: 20px;
  margin-bottom: 40px;
}

.p-info {
  color: var(--brown);
  font: 600 40px 'Inter', sans-serif;
  flex-direction: column;
  margin-right: 50px;

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
  margin-top: 20px;
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
