<template>
  <div class="matching-view-container">
    <GameSettingsModal v-if="matchingStore.isStep(MatchingStep.GameSetting)" />
    <GameMatchingModal v-else-if="matchingStore.isStep(MatchingStep.InQueue)" />
    <GameConfirmationModal v-else-if="matchingStore.isStep(MatchingStep.InMatching)" />
    <GameTimeoutModal v-else-if="matchingStore.isStep(MatchingStep.Timeout)" />
    <GameWaitingModal v-else-if="matchingStore.isStep(MatchingStep.Waiting)" />
    <GameRefusedModal v-else-if="matchingStore.isStep(MatchingStep.Reject)" />
    <GameAcceptedModal v-else-if="matchingStore.isStep(MatchingStep.Accept)" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

import GameSettingsModal from '@/components/matching-components/modals/GameSettingsModal.vue';
import GameMatchingModal from '@/components/matching-components/modals/GameMatchingModal.vue';
import GameConfirmationModal from '@/components/matching-components/modals/GameConfirmationModal.vue';
import GameWaitingModal from '@/components/matching-components/modals/GameWaitingModal.vue';
import GameAcceptedModal from '@/components/matching-components/modals/GameAcceptedModal.vue';
import GameRefusedModal from '@/components/matching-components/modals/GameRefusedModal.vue';
import GameTimeoutModal from '@/components/matching-components/modals/GameTimeoutModal.vue';

import { useMatchingStore } from '@/stores/matching.store';
import { MatchingStep } from '@/stores/matching.store';
import { GameService } from '@/services/game.service';

const matchingStore = useMatchingStore();

onMounted(() => {
  GameService.matching.socket.on();
});

onUnmounted(() => {
  if (matchingStore.isStep(MatchingStep.GameSetting)) GameService.matching.socket.off();
});
</script>

<style scoped>
.matching-view-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  margin-top: 40px;
}
</style>
