<template>
  <Modal title="상대방이 취소하였습니다">
    <template #body> </template>
  </Modal>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

import Modal from '@/components/Modal.vue';

import { useGameStore } from '@/stores/game.store';

const gameStore = useGameStore();

onMounted(() => {
  setTimeout(() => {
    gameStore.setMatchInfo(null);
    gameStore.setStatus('매칭중');
  }, 3000);
});
</script>
