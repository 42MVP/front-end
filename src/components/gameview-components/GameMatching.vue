<template>
  <div class="conatiner">
    <GameSettingsModal v-if="isStatusMatched('게임설정')" @response="changeStatus" />
    <MatchingModal v-else-if="isStatusMatched('매칭중')" @response="changeStatus" />
    <GameConfirmationModal v-else-if="isStatusMatched('게임여부')" @response="changeStatus" />
    <WaitingForOpponentModal v-else @response="changeStatus">
      <GameRefusedModal v-if="isStatusMatched('상대방거절')" @response="changeStatus" />
      <GameStartingModal v-if="isStatusMatched('게임시작')" @response="changeStatus" />
    </WaitingForOpponentModal>
    {{ console.log('gameview', currentStatus) }}
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import GameSettingsModal from '@/components/gameview-components/modals/GameSettingsModal.vue';
import MatchingModal from '@/components/gameview-components/modals/MatchingModal.vue';
import GameConfirmationModal from '@/components/gameview-components/modals/GameConfirmationModal.vue';
import WaitingForOpponentModal from '@/components/gameview-components/modals/WaitingForOpponentModal.vue';
import GameStartingModal from '@/components/gameview-components/modals/GameStartingModal.vue';
import GameRefusedModal from '@/components/gameview-components/modals/GameRefusedModal.vue';

const status: Record<string, number> = {
  게임설정: 1,
  매칭중: 2,
  게임여부: 3,
  상대방대기: 4,
  상대방거절: 5,
  게임시작: 6,
};

const currentStatus = ref<number>(status['게임설정']);

const isStatusMatched = (modalName: string) => {
  return currentStatus.value === status[modalName];
};

const changeStatus = (modalName: string) => {
  currentStatus.value = status[modalName];
  console.log('changeStatus', modalName, currentStatus.value);
};
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
