<template>
  <Modal title="초대 받았음!">
    <template #body>
      <div class="user-info-div">
        <AvatarItem
          :username="invitationStore.inviterUserName"
          :avartarUrl="invitationStore.inviterAvatarUrl"
          imgSize="100"
        >
        </AvatarItem>
      </div>
      <CountdownTimer :targetTime="new Date(invitationStore.endTimeMs)" />
    </template>
    <template #footer>
      <div class="button-div">
        <Button text="수락" style="margin: 0 10px" @response="acceptGame" />
        <Button text="거절" style="margin: 0 10px" @response="refuseGame" />
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import Modal from '@/components/Modal.vue';
import Button from '@/components/BasicButton.vue';
import AvatarItem from '@/components/common/AvatarItem.vue';
import CountdownTimer from '@/components/CountdownTimer.vue';

import { useInvitationStore } from '@/stores/invitation.store';
import { GameInvitationService } from '@/services/gameInvitation.service';

const invitationStore = useInvitationStore();

const acceptGame = () => {
  GameInvitationService.socket.acceptInvitation(invitationStore.id);
};

const refuseGame = () => {
  GameInvitationService.socket.rejectInvitation(invitationStore.id);
};
</script>

<style scoped>
.button-div {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 80px;
}

.user-info-div {
  display: flex;
  flex-direction: column;
  font: var(--medium);
  flex-direction: column;
}
</style>
