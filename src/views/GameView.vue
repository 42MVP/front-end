<template>
  <div v-if="!isMatched" class="container">
    <GameMatching :opponent="getOpponent"/>
  </div>
  <div v-else class="container">
    <div class="game-screen-div" v-if="isGameConnected">
      <GameScreen />
    </div>
    <div class="game-result-div" v-else>
      <GameResultInfo @response="reMatch" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import GameMatching from '@/components/gameview-components/GameMatching.vue';
import GameScreen from '@/components/gameview-components/GameScreen.vue';
import GameResultInfo from '@/components/gameview-components/GameResultInfo.vue';

const isMatched = ref(1);
const isGameConnected = ref(0);
const opponent = ref<string>('');

const reMatch = (userName: string) => {
  opponent.value = userName;
  isMatched.value = 0;
  isGameConnected.value = 0;
};

const getOpponent = computed(() => {
  return opponent.value;
});
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

.game-result-div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-width: 900px;
}
</style>
