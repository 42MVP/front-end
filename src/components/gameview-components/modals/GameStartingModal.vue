<template>
  <Modal title="잠시 후 경기가 시작됩니다">
    <template #body>
      <div class="body-container">
        <div class="user-info-div">
          <ProfileCard :user_id="loginStore.name" :img="loginStore.avatarURL" img_size="100">
            <span class="bold">1899</span>
          </ProfileCard>
        </div>
        <span class="verse">vs</span>
        <div class="user-info-div">
          <ProfileCard :user_id="gameStore.opponent?.name" :img="gameStore.opponent?.avatarURL" img_size="100">
            <span class="bold">1899</span>
          </ProfileCard>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import Modal from '@/components/Modal.vue';
import ProfileCard from '@/components/profileview-components/ProfileCard.vue';

import { useLoginStore } from '@/stores/login.store';
import { useGameStore } from '@/stores/game.store';

const loginStore = useLoginStore();
const gameStore = useGameStore();
</script>

<style>
.body-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 40px 15px 0px 15px;
  min-width: 440px;
  min-height: 160px;
}

.user-info-div {
  display: flex;
  flex-direction: column;
  font: var(--medium);
  flex-direction: column;
}

.verse {
  font: var(--extra-large);
  align-self: center;
}

.bold {
  font-weight: bold;
}
</style>
