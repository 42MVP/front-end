<template>
  <Modal title="시간초과 되어 초대가 취소되었습니다.">
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
    invitationStore.setStep(InvitationStep.None);
  }, 3000);
});
</script>
