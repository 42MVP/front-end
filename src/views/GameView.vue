<template>
  <!-- <GameMatching v-if="!isMatched" />
  <div v-else class="game-screen-div"> -->
    <!-- <GameScreen /> -->
    <GameResultModal />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import GameMatching from '@/components/gameview-components/GameMatching.vue';
import GameScreen from '@/components/gameview-components/GameScreen.vue';

import { useGameStore } from '@/stores/game.store';
import GameResultModal from '@/components/gameview-components/modals/GameResultModal.vue';

const gameStore = useGameStore();

const isMatched = computed(() => {
  return gameStore.isMatched;
});
</script>

<style scoped>
.game-screen-div {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  flex-direction: column;
}
</style>
