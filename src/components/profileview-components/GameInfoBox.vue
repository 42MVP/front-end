<template>
  <div class="g-info-rate">
    <DBox :middle="'Lv.' + calculateLevel(rate).toString()" />
    <DBox
      :top="'total ' + info.totalGame + ' games'"
      :middle="calculateLevel(rate).toString() + '%'"
      :bottom="'win' + info.winNum + ' lose' + info.loseNum"
    />
  </div>
</template>

<script setup lang="ts">
import DBox from '@/components/common/BasicBox.vue';
import { ref } from 'vue';

const props = defineProps({
  rate: { Number, default: 0 },
});

const info = ref({
  totalGame: 42,
  winNum: 21,
  loseNum: 21,
});

const calculateLevel = (rate: number): number => {
  const totalExperience = rate;
  const startingLevel = 1;
  const experiencePerLevel = 100;
  // const experienceGrowth: 1.2,
  const level = Math.floor(totalExperience / experiencePerLevel) + startingLevel;
  return Math.max(level, startingLevel);
};
</script>

<style scoped>
.g-info-rate {
  justify-content: space-between;
}
</style>
