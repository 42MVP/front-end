<template>
  <div class="container">
    <div class="chat-left">
      <ChatList :chatInfos="chatInfos" @selectchat="e => (index = e)" @reset="index = 0" />
    </div>
    <div class="chat-right">
      <ChatRoom :friends="friends" :chatInfo="chatInfos[index]" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ChatList from '@/components/chatview-components/ChatList.vue';
import ChatRoom from '@/components/chatview-components/ChatRoom.vue';
import * as mock from '@/contexts/fecthChat';

const chatInfos = ref([]);
const friends = ref([]);
const index = ref(0);

onMounted(() => {
  console.log('asd');
  chatInfos.value = mock.getChatInfos();
  friends.value = mock.getFriend();
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');

.container {
  display: flex;
  width: 100%;
  height: calc(100% - 90px);
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
</style>
