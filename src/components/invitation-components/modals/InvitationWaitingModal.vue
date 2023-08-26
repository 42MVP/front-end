<template>
  <Modal title="상대방을 기다리고 있습니다">
    <template #body>
      <CountdownTimer :targetTime="new Date(invitationStore.endTimeMs)" />
      <slot />
    </template>
  </Modal>
</template>

<script setup lang="ts">
import Modal from '@/components/Modal.vue';
import CountdownTimer from '@/components/CountdownTimer.vue';

import { useInvitationStore } from '@/stores/invitation.store';

const invitationStore = useInvitationStore();
</script>
