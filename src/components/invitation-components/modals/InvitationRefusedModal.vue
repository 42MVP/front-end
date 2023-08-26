<template>
  <Modal title="Invitation rejected">
    <template #body> </template>
  </Modal>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

import Modal from '@/components/Modal.vue';

import { invitationStore } from '@/main';
import { InvitationStep } from '@/stores/invitation.store';

onMounted(() => {
  setTimeout(() => {
    invitationStore.setStep(InvitationStep.None);
  }, 3000);
});
</script>
