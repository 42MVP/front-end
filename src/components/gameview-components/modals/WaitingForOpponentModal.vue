<template>
  <Modal title="상대방을 기다리고 있습니다">
    <template #body>
      <CountdownTimer :targetTime="gameStore.atReadyTime" @timeout="timeout" />
      <slot />
    </template>
    <template #footer>
      <button class="delete-me" @click="tmp">임시</button>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

import Modal from '@/components/Modal.vue';
import CountdownTimer from '@/components/CountdownTimer.vue';

import { useGameStore } from '@/stores/game.store';

const gameStore = useGameStore();

const timeout = () => {
  gameStore.setStatus('매칭중');
};

const tmp = () => {
  gameStore.setOpponent({ id: -1, name: 'hyeongki', avatarURL: '' });
  gameStore.setStatus('게임시작');
};

onMounted(() => {
  setTimeout(() => {
    gameStore.initGame();
  }, gameStore.atReadyTime.getTime() - new Date().getTime());
});
</script>
