<template>
  <Modal title="매칭이 취소되었습니다.">
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
    gameStore.setStatus('게임설정');
  }, 3000);
});
</script>
