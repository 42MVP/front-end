<template>
  <MatchingBox title="시간 초과로 매칭이 취소되었습니다.">
    <template #body> </template>
  </MatchingBox>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import MatchingBox from '../MatchingBox.vue';
import { MatchingStep, useMatchingStore } from '@/stores/matching.store';

const matchingStore = useMatchingStore();

onMounted(() => {
  setTimeout(() => {
    matchingStore.setStep(MatchingStep.GameSetting);
  }, 3000);
});
</script>
