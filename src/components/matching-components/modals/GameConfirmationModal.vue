<template>
  <MatchingBox title="게임을 찾았습니다!">
    <template #body>
      <CountdownTimer :targetTime="new Date(matchingStore.matchingEndTimeMs)" />
    </template>
    <template #footer>
      <div class="button-div">
        <Button text="수락" style="margin: 0 10px" @response="acceptGame" />
        <Button text="거절" style="margin: 0 10px" @response="refuseGame" />
      </div>
    </template>
  </MatchingBox>
</template>

<script setup lang="ts">
import MatchingBox from '../MatchingBox.vue';
import Button from '@/components/BasicButton.vue';
import CountdownTimer from '@/components/CountdownTimer.vue';

import { PreGameSocketService } from '@/services/preGameSocket.service';
import { MatchingStep, useMatchingStore } from '@/stores/matching.store';

const matchingStore = useMatchingStore();

const acceptGame = () => {
  PreGameSocketService.acceptGame(matchingStore.id);
  matchingStore.setStep(MatchingStep.Waiting);
};

const refuseGame = () => {
  PreGameSocketService.rejectGame(matchingStore.id);
  matchingStore.setStep(MatchingStep.GameSetting);
};
</script>

<style scoped>
.button-div {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 80px;
}
</style>
