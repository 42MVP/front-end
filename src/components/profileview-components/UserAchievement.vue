<template>
  <div class="achieve">
    <span v-for="(item, index) in achievement" :key="index" :style="getOpacity(index)">
      {{ item }}
    </span>
  </div>
</template>

<script setup lang="ts">
// import {ref} from vue;

type StyleFunction = (index: number) => { opacity: number };

// const id = 'chaejkim';
// const img = '1.png';
// const rating = 300;
// const win_num = 21;
// const lose_num = 21;
const user_achieve = [0, 1, 4];
const achievement = ['🥇', '🥈', '🥉', '🥇', '🥈'];
const getOpacity: StyleFunction = index => {
  return { opacity: user_achieve.includes(index) ? 1 : 0.2 };
};
</script>

<style>
.achieve {
  font: 500 60px/32px 'Inter', sans-serif;
  gap: 10px;
}
</style>
