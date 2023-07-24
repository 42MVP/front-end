<template>
  <div class="container">
    <div class="chat-left">
      <ChatList :chatInfos="chatInfos" @selectchat="e => (index = e)" @reset="index = 0" />
    </div>
    <div class="chat-right">
      <ChatRoom v-if="isSelect" :friends="friends" :chatInfo="chatInfos[index]" />
      <div v-else class="chat-box-unchoose">☺️</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import ChatList from '@/components/chatview-components/ChatList.vue';
import ChatRoom from '@/components/chatview-components/ChatRoom.vue';
import * as mock from '@/contexts/fecthChat';
import type { ChatInfo } from '@/interfaces/ChatInfo.interface';
import type { User } from '@/interfaces/User.interface';

const chatInfos = ref<ChatInfo[]>([]);
const friends = ref<User[]>([]);
const index = ref<number>(-1);
const isSelect = ref<boolean>(false);

onMounted(() => {
  chatInfos.value = mock.getChatInfos();
  friends.value = mock.getFriend();
});

watch(index, () => {
  if (index.value !== -1) {
    isSelect.value = true;
  } else {
    isSelect.value = false;
  }
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');

.container {
  display: flex;
  width: 100vw;
  height: calc(100vh - 90px);
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
