<template>
  <Modal :title="invitationStore.cancelMessage">
    <template #body> </template>
  </Modal>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

import Modal from '@/components/Modal.vue';

import { InvitationStep, useInvitationStore } from '@/stores/invitation.store';

const invitationStore = useInvitationStore();

onMounted(() => {
  setTimeout(() => {
    if (invitationStore.isStep(InvitationStep.Cancel)) invitationStore.setStep(InvitationStep.None);
  }, 3000);
});
</script>
