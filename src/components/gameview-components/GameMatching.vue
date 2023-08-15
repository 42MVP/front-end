<template>
  <div class="conatiner">
    <GameSettingsModal v-if="gameStore.isStatusMatched('게임설정')" />
    <MatchingModal v-else-if="gameStore.isStatusMatched('매칭중')" />
    <GameConfirmationModal v-else-if="gameStore.isStatusMatched('게임여부')" />
    <WaitingForOpponentModal v-else>
      <GameRefusedModal v-if="gameStore.isStatusMatched('상대방거절')" />
      <GameStartingModal v-if="gameStore.isStatusMatched('게임시작')" />
    </WaitingForOpponentModal>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

import GameSettingsModal from '@/components/gameview-components/modals/GameSettingsModal.vue';
import MatchingModal from '@/components/gameview-components/modals/MatchingModal.vue';
import GameConfirmationModal from '@/components/gameview-components/modals/GameConfirmationModal.vue';
import WaitingForOpponentModal from '@/components/gameview-components/modals/WaitingForOpponentModal.vue';
import GameStartingModal from '@/components/gameview-components/modals/GameStartingModal.vue';
import GameRefusedModal from '@/components/gameview-components/modals/GameRefusedModal.vue';

import { useGameStore } from '@/stores/game.store';

const gameStore = useGameStore();

onMounted(() => {
  if (gameStore.matchInfo) {
    gameStore.setStatus('상대방대기');
  } else gameStore.setStatus('게임설정');
});
</script>

<style scoped>
.conatiner {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
</style>
