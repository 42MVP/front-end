<template>
  <GameMatching v-if="!isMatched" />
  <div v-else class="game-screen-div">
    <GameScreen />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import GameMatching from '@/components/gameview-components/GameMatching.vue';
import GameScreen from '@/components/gameview-components/GameScreen.vue';

const isMatched = ref(1);
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
