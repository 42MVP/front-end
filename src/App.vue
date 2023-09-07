<template>
  <InvitationConfirmModal v-if="invitationStore.isStep(InvitationStep.Invited)" />
  <InvitationWaitingModal v-else-if="invitationStore.isStep(InvitationStep.Waiting)" />
  <InvitationAcceptedModal v-else-if="invitationStore.isStep(InvitationStep.Accept)" />
  <InvitationCancelModal v-else-if="invitationStore.isStep(InvitationStep.Cancel)" />
  <main>
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
import { useLoginStore } from './stores/login.store';
import { useModalStore } from '@/stores/modal.store';
import { InvitationStep, useInvitationStore } from '@/stores/invitation.store';
// services
import { GameService } from '@/services/game.service';
import { ChatSocketService } from '@/services/chatSocket.service';
import { ApiError } from '@/services/utils/apiError.utils';
import router from './router';

const loginStore = useLoginStore();
const modalStore = useModalStore();
const invitationStore = useInvitationStore();

const routerNotify = async (uri: string, message: string) => {
  await router.push(uri);
  modalStore.notify(message);
};


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
      if (error.statusCode === 404) {
        routerNotify('/404', error.message);
      } else {
        modalStore.notify(error.message);
      }
    }
  } else {
    console.log('에러:', error.name, error.message);
    console.log('컴포넌트:', vm);
    console.log('에러 정보:', info);
  }
  return false;
});
</script>
