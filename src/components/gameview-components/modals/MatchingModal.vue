<template>
  <Modal title="매칭중">
    <template #body>
      <div id="spinner"></div>
    </template>
    <template #footer>
      <Button class="button-div" text="취소" @response="cancle" />
    </template>
  </Modal>
</template>

<script setup lang="ts">
import Modal from '@/components/Modal.vue';
import Button from '@/components/BasicButton.vue';

import { useGameStore } from '@/stores/game.store';
import { GameSocketService } from '@/services/gameSocket.service';

const gameStore = useGameStore();

const cancle = () => {
  GameSocketService.nonoQueue();
  gameStore.setStatus('게임설정');
};
</script>

<style scoped>
.button-div {
  display: flex;
  align-items: center;
  justify-content: center !important;
  margin: 0 100px;
}

#spinner {
  display: flex;
  align-items: center;
  justify-content: center !important;
  margin: 0 80px;

  margin: clac(50% - 25px) auto;
  width: 100px;
  height: 100px;
  border: 7px solid #e0afa0;
  box-sizing: border-box;
  border-top-color: #fff;

  border-radius: 100%;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>
