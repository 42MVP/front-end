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
  gameStore.setMatchInfo({
    result: true,
    leftUser: {
      name: 'chaejkim',
      avatarURL: 'https://ca.slack-edge.com/T039P7U66-U02LNN8QWJV-4c936417baf6-512',
      rating: 1899,
    },
    rightUser: {
      name: 'hyeongki',
      avatarURL: 'https://ca.slack-edge.com/T039P7U66-U035MTQ4U4T-9333cd362cf2-512',
      rating: 1899,
    },
    gameRoomId: 1,
  });
  gameStore.setStatus('게임시작');
};

onMounted(() => {
  setTimeout(() => {
    gameStore.isStatusMatched('게임시작') ? gameStore.initGame() : gameStore.setMatchInfo(null);
  }, gameStore.atReadyTime.getTime() - new Date().getTime());
});
</script>
