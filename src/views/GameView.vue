<template>
  <div class="game-screen-div">
    <!--<GameScreen />-->
    <GameTest />
  </div>
</template>

<script setup lang="ts">
import GameTest from '@/views/GameTest.vue';
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
