<template>
  <div v-if="!isMatched" class="container">
    <GameMatching />
  </div>
  <div v-else class="container">
    <div class="game-screen-div" v-if="isGameConnected">
      <GameScreen />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import GameMatching from '@/components/gameview-components/GameMatching.vue';
import GameScreen from '@/components/gameview-components/GameScreen.vue';

const isMatched = ref(1);
const isGameConnected = ref(1);
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}

.game-screen-div {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
</style>
