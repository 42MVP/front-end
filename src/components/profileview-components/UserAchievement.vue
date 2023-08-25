<template>
  <div class="achieve">
    <span v-for="(item, index) in achieveIcon" :key="index" :style="getOpacity(index)">
      {{ item }}
    </span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  achievement: {
    type: Array<Number>,
    default: [],
  },
});

type StyleFunction = (index: number) => { opacity: number };

const achieveIcon = ['🥇', '🥈', '🥉', '🥇', '🥈'];
const getOpacity: StyleFunction = index => {
  return { opacity: props.achievement.includes(index) ? 1 : 0.2 };
};
</script>

<style>
.achieve {
  font: 500 60px/32px 'Inter', sans-serif;
  gap: 10px;
}
</style>
