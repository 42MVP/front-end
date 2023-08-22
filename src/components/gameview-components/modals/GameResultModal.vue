<template>
  <Modal title="경기 결과">
    <template #body>
      <div class="body-container">
        <div class="user-info-div">
          <span class="bold">{{ 'Lose🍂' }}</span>
          <ProfileCard user_id="chaejkim" img="1.png" img_size="150">
            <span class="bold">{{ 1899 - 12 }} ({{ -12 }})</span>
          </ProfileCard>
        </div>
        <span class="score-div">{{ 10 }} : {{ 15 }}</span>
        <div class="user-info-div">
          <span class="bold">{{ 'Win👑' }}</span>
          <ProfileCard user_id="hyeongki" img="4.png" img_size="150">
            <span class="bold">{{ 1899 + 12 }} ({{ +12 }})</span>
          </ProfileCard>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Modal from '@/components/Modal.vue';
import AvatarItem from '@/components/common/AvatarItem.vue';

import { useGameStore } from '@/stores/game.store';
import { GameService } from '@/services/game.service';
import type { GameHistory } from '@/interfaces/game/GameHistory.interface';

const gameStore = useGameStore();

const leftUser = gameStore.matchInfo?.leftUser;
const rightUser = gameStore.matchInfo?.rightUser;

onMounted(async () => {
  try {
    // const gameResult = await GameService.getGameResult(gameStore.matchInfo?.gameroomID);
  } catch (e) {
    console.log(e);
  }
});
</script>

<style scoped>
.game-result-container {
  display: flex;
  justify-content: center;
  align-self: center;
}

.user-info-div {
  margin: 0 100px;
  text-align: center;
  font: var(--large);
}

.score-div {
  font: var(--extra-large);
  align-self: center;
  font-weight: bolder;
}
.bold {
  font-weight: bold;
}

.button-div {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 50px;
}
</style>
