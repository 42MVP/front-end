<template>
  <MatchingBox title="상대방이 취소하였습니다">
    <template #body> </template>
  </MatchingBox>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

import MatchingBox from '../MatchingBox.vue';

import { MatchingStep, useMatchingStore } from '@/stores/matching.store';
import { GameMatchingService } from '@/services/gameMatching.service';

const matchingStore = useMatchingStore();

onMounted(() => {
  setTimeout(async () => {
    try {
      await GameMatchingService.applyQueue();
    } catch (e) {
      matchingStore.setStep(MatchingStep.GameSetting);
    }
  }, 3000);
});
</script>
