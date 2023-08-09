<template>
  <GameMatching v-if="!gameStore.isMatched" />
  <div v-else class="game-screen-div">
    <GameScreen />
  </div>
</template>

<script setup lang="ts">

import GameMatching from '@/components/gameview-components/GameMatching.vue';
import GameScreen from '@/components/gameview-components/GameScreen.vue';

import { useGameStore } from '@/stores/game.store';

const gameStore = useGameStore();
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
