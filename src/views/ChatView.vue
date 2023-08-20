<template>
  <div class="container">
    <div class="chat-left">
      <ChatList />
    </div>
    <div class="chat-right">
      <ChatRoom v-if="chatStore.isSelected" />
      <div v-else class="chat-box-unchoose">☺️</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
// component
import ChatList from '@/components/chatview-components/ChatList.vue';
import ChatRoom from '@/components/chatview-components/ChatRoom.vue';
// store
import { useChatStore } from '@/stores/chat.store';
// service
import { ChatSocketService } from '@/services/chatSocket.service';

const chatStore = useChatStore();

onMounted(() => {
  ChatSocketService.onChannel();
});

onUnmounted(() => {
  ChatSocketService.offChannel();
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');

.container {
  display: flex;
  width: 100vw;
  margin-top: 40px;
}

.chat-left {
  display: flex;
  justify-content: center;
  align-items: center;

  flex: 1;
  width: 100%;
  height: 100%;

  background-color: inherit;
}

.chat-right {
  display: flex;
  justify-content: center;
  align-items: center;

  flex: 2;
  width: 100%;
  height: 100%;
  background-color: inherit;
}

.chat-box-unchoose {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 300px;
  opacity: 0.1;
  width: 100%;
  height: 100%;
  color: var(--brown, #463f3a);
}
</style>
