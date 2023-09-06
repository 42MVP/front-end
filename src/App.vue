<script setup lang="ts">
import { watch } from 'vue';
import NavBar from './components/NavBar.vue';
import Modal from '@/components/Modal.vue';
import BasicButton from '@/components/BasicButton.vue';
import { useModalStore } from '@/stores/modal.store';
import { useLoginStore } from './stores/login.store';
import { ChatSocketService } from './services/chatSocket.service';

import InvitationAcceptedModal from './components/invitation-components/modals/InvitationAcceptedModal.vue';
import InvitationConfirmModal from './components/invitation-components/modals/InvitationConfirmModal.vue';
import InvitationWaitingModal from './components/invitation-components/modals/InvitationWaitingModal.vue';
import { InvitationStep, useInvitationStore } from './stores/invitation.store';
import InvitationCancelModal from './components/invitation-components/modals/InvitationCancelModal.vue';
import { GameService } from './services/game.service';
import { SocketService } from './services/socket.service';

const loginStore = useLoginStore();
const modalStore = useModalStore();
const invitationStore = useInvitationStore();

watch(
  () => loginStore.isLogin,
  () => {
    if (loginStore.isLogin) {
      ChatSocketService.onChat();
      GameService.invitation.socket.on();
    } else {
      GameService.invitation.socket.off();
      SocketService.getInstance();
    }
  },
);
</script>

<template>
  <InvitationConfirmModal v-if="invitationStore.isStep(InvitationStep.Invited)" />
  <InvitationWaitingModal v-else-if="invitationStore.isStep(InvitationStep.Waiting)" />
  <InvitationAcceptedModal v-else-if="invitationStore.isStep(InvitationStep.Accept)" />
  <InvitationCancelModal v-else-if="invitationStore.isStep(InvitationStep.Cancel)" />
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
