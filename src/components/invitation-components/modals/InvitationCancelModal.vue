<template>
  <Modal :title="invitationStore.cancelMessage">
    <template #body> </template>
  </Modal>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

import Modal from '@/components/Modal.vue';

import { InvitationStep, useInvitationStore } from '@/stores/invitation.store';

const invitationStore = useInvitationStore();

let timeout: number | undefined;

onMounted(() => {
  timeout = setTimeout(() => {
    invitationStore.setStep(InvitationStep.None);
  }, 3000);
});

onUnmounted(() => {
  clearTimeout(timeout);
});
</script>
