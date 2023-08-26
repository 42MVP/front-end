<template>
  <MatchingBox title="상대방을 기다리고 있습니다">
    <template #body>
      <CountdownTimer :targetTime="new Date(matchingStore.matchingEndTimeMs)" @timeout="timeout" />
      <slot />
    </template>
  </MatchingBox>
</template>

<script setup lang="ts">
import MatchingBox from '../MatchingBox.vue';
import CountdownTimer from '@/components/CountdownTimer.vue';

import { MatchingStep, useMatchingStore } from '@/stores/matching.store';
import { GameMatchingService } from '@/services/gameMatching.service';

const matchingStore = useMatchingStore();

const timeout = async () => {
  try {
    GameMatchingService.applyQueue();
  } catch (e) {
    matchingStore.setStep(MatchingStep.GameSetting);
  }
};
</script>
