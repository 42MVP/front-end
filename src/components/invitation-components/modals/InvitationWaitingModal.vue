<template>
  <Modal title="상대방을 기다리고 있습니다">
    <template #body>
      <CountdownTimer :targetTime="new Date(invitationStore.endTimeMs)" />
      <slot />
    </template>
    <template #footer>
      <Button text="취소" style="margin: 0 10px" @response="cancelInvite" />
    </template>
  </Modal>
</template>

<script setup lang="ts">
import Modal from '@/components/Modal.vue';
import Button from '@/components/BasicButton.vue';
import CountdownTimer from '@/components/CountdownTimer.vue';

import { InvitationStep, useInvitationStore } from '@/stores/invitation.store';
import { GameService } from '@/services/game.service';

const invitationStore = useInvitationStore();

const cancelInvite = async () => {
  try {
    await GameService.invitation.cancelInvite(invitationStore.id);
  } catch (e) {
    alert('초대 취소 실패');
    invitationStore.setStep(InvitationStep.None);
  }
};
</script>
