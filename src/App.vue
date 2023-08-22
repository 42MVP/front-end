<script setup lang="ts">
import { onMounted, watch } from 'vue';
import NavBar from './components/NavBar.vue';
import Modal from '@/components/Modal.vue';
import BasicButton from '@/components/BasicButton.vue';
import { useModalStore } from '@/stores/modal.store';
import { ChatSocketService } from './services/chatSocket.service';
import { GameSocketService } from './services/gameSocket.service';
import { useGameStore } from './stores/game.store';
import { useRouter } from 'vue-router';

const modalStore = useModalStore();
const gameStore = useGameStore();
const router = useRouter();

watch(
  () => gameStore.isMatched,
  () => {
    if (gameStore.isOnGame === true) return;
    GameSocketService.onGameInit();
    router.push('/game');
  },
);

onMounted(() => {
  ChatSocketService.onChat();
  GameSocketService.onGameInvitation();
});
</script>

<template>
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
