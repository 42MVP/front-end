<template>
  <div class="g-info-rate">
    <DBox :middle="'Lv.' + calculateLevel(props.record.rate).toString()" />
    <DBox
      :top="`total ${props.record.totalGame || 0} games`"
      :middle="`${((props.record.winNum / props.record.totalGame) * 100 || 0).toString().slice(0, 4) || '-'} %`"
      :bottom="`win ${props.record.winNum || 0} lose ${props.record.loseNum || 0} `"
    />
  </div>
</template>

<script setup lang="ts">
import DBox from '@/components/common/BasicBox.vue';
import type { UserGameRecord } from '@/interfaces/user/UserGameRecord.interface';

const props = defineProps({
  record: { type: Object as () => UserGameRecord, default: {} as UserGameRecord },
});

const calculateLevel = (rate: number): number => {
  const totalExperience = rate || 0;
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
