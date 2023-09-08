<template>
  <InvitationConfirmModal v-if="invitationStore.isStep(InvitationStep.Invited)" />
  <InvitationWaitingModal v-else-if="invitationStore.isStep(InvitationStep.Waiting)" />
  <InvitationAcceptedModal v-else-if="invitationStore.isStep(InvitationStep.Accept)" />
  <InvitationCancelModal v-else-if="invitationStore.isStep(InvitationStep.Cancel)" />
  <main class="container">
    <Modal :title="modalStore.title" :show="modalStore.isActive">
      <template #body>{{ modalStore.text }} </template>
      <template #footer>
        <BasicButton :text="modalStore.buttonText" @click="() => {
          modalStore.buttonFunc();
          modalStore.off();
        }
          " />
      </template>
    </Modal>

    <header v-if="$route.path !== '/' && !$route.path.includes('/sign')">
      <NavBar />
    </header>
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { onMounted, onErrorCaptured } from 'vue';
// components
import NavBar from '@/components/NavBar.vue';
import Modal from '@/components/Modal.vue';
import BasicButton from '@/components/BasicButton.vue';
import InvitationAcceptedModal from '@/components/invitation-components/modals/InvitationAcceptedModal.vue';
import InvitationConfirmModal from '@/components/invitation-components/modals/InvitationConfirmModal.vue';
import InvitationWaitingModal from '@/components/invitation-components/modals/InvitationWaitingModal.vue';
import InvitationCancelModal from '@/components/invitation-components/modals/InvitationCancelModal.vue';
// stores
import { useModalStore } from '@/stores/modal.store';
import { useLoginStore } from '@/stores/login.store';
import { ChatSocketService } from '@/services/chatSocket.service';
import { InvitationStep, useInvitationStore } from '@/stores/invitation.store';
// services
import { GameService } from '@/services/game.service';
import { ApiError } from '@/services/utils/apiError.utils';

const loginStore = useLoginStore();
const modalStore = useModalStore();
const invitationStore = useInvitationStore();

onMounted(() => {
  if (loginStore.isLogin) {
    ChatSocketService.onChat();
    GameService.invitation.socket.on();
  }
});

onErrorCaptured((error, vm, info): boolean | void => {
  if (error instanceof ApiError) {
    if (error.message.includes('JWT')) {
      // TODO : logout, localStorage.clear();
      return false;
    } else {
      modalStore.notify(error.message);
    }
  } else {
    console.log('에러:', error.name, error.message);
    console.log('컴포넌트:', vm);
    console.log('에러 정보:', info);
  }
  return false;
});
</script>

<style scoped>
.container {
  min-width: 1000px;
  min-height: 1000px;
}
</style>