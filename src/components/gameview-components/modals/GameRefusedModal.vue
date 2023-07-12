<template>
  <Modal title="상대방이 취소하였습니다">
    <template #body> </template>
  </Modal>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

import Modal from '@/components/Modal.vue';

const emits = defineEmits(['response']);

onMounted(() => {
  setTimeout(() => {
    emits('response', '매칭중');
  }, 3000);
});
</script>
