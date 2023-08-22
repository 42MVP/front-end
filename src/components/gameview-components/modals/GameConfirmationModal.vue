<template>
  <Modal title="게임을 찾았습니다!">
    <template #body>
      <CountdownTimer :targetTime="gameStore.atReadyTime" />
    </template>
    <template #footer>
      <div class="button-div">
        <Button text="수락" style="margin: 0 10px" @response="acceptGame" />
        <Button text="거절" style="margin: 0 10px" @response="refuseGame" />
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import Modal from '@/components/Modal.vue';
import Button from '@/components/BasicButton.vue';
import CountdownTimer from '@/components/CountdownTimer.vue';

import { useGameStore } from '@/stores/game.store';
import { GameSocketService } from '@/services/gameSocket.service';

const gameStore = useGameStore();

const acceptGame = () => {
  GameSocketService.acceptGame(gameStore.matchingId);
  gameStore.setStatus('상대방대기');
};

const refuseGame = () => {
  GameSocketService.rejectGame(gameStore.matchingId);
  gameStore.setMatchInfo(null);
  gameStore.setStatus('게임설정');
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
