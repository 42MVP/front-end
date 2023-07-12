<template>
  <Modal title="상대방을 기다리고 있습니다">
    <template #body>
      <CountdownTimer :targetTime="new Date(new Date().getTime() + 50000)" @timeout="timeout" />
      <slot />
    </template>
    <template #footer></template>
  </Modal>
</template>

<script setup lang="ts">
import Modal from '@/components/Modal.vue';
import CountdownTimer from '@/components/CountdownTimer.vue';

const emits = defineEmits(['response']);

const timeout = () => {
  emits('response', '매칭중');
};
</script>
