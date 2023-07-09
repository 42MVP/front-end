<template>
  <div v-if="!isMatched" class="container">
    <GameMatching />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import GameMatching from '@/components/gameview-components/GameMatching.vue';

const isMatched = ref(0);
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
</style>
