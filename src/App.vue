<script setup lang="ts">
import { onMounted } from 'vue';
import NavBar from './components/NavBar.vue';
import Modal from '@/components/Modal.vue';
import BasicButton from '@/components/BasicButton.vue';
import { useModalStore } from '@/stores/modal.store';
import { ChatSocketService } from './services/chatSocket.service';
import { PreGameSocketService } from './services/preGameSocket.service';

import InvitationAcceptedModal from './components/invitation-components/modals/InvitationAcceptedModal.vue';
import InvitationConfirmModal from './components/invitation-components/modals/InvitationConfirmModal.vue';
import InvitationRefusedModal from './components/invitation-components/modals/InvitationRefusedModal.vue';
import InvitationTimeoutModal from './components/invitation-components/modals/InvitationTimeoutModal.vue';
import InvitationWaitingModal from './components/invitation-components/modals/InvitationWaitingModal.vue';
import { InvitationStep, useInvitationStore } from './stores/invitation.store';

const modalStore = useModalStore();
const invitationStore = useInvitationStore();

onMounted(() => {
  ChatSocketService.onChat();
  PreGameSocketService.onGameInvitation();
});
</script>

<template>
  <InvitationAcceptedModal v-if="invitationStore.isStep(InvitationStep.Accept)" />
  <InvitationConfirmModal v-else-if="invitationStore.isStep(InvitationStep.Invited)" />
  <InvitationRefusedModal v-else-if="invitationStore.isStep(InvitationStep.Reject)" />
  <InvitationTimeoutModal v-else-if="invitationStore.isStep(InvitationStep.Timeout)" />
  <InvitationWaitingModal v-else-if="invitationStore.isStep(InvitationStep.Waiting)" />
  <main>
    <Modal :title="modalStore.title" :show="modalStore.isActive">
      <template #body>{{ modalStore.text }} </template>
      <template #footer>
        <BasicButton
          :text="modalStore.buttonText"
          @click="
            () => {
              modalStore.buttonFunc();
              modalStore.off();
            }
          "
        />
      </template>
    </Modal>

    <header v-if="$route.path !== '/' && !$route.path.includes('/sign')">
      <NavBar />
    </header>
    <RouterView />
  </main>
</template>
