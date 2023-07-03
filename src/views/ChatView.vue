<script lang="ts">
import ChatList from '../components/chatview-components/ChatList.vue';
import ChatRoom from '../components/chatview-components/ChatRoom.vue';

export default {
  components: {
    ChatList,
    ChatRoom,
  },
};
</script>
<template>
  <div class="container">
    <div class="chat-left">
      <ChatList @selectchat="console.log('select chat')" />
    </div>
    <div class="chat-right">
      <ChatRoom />
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');

.container {
  display: flex;
  width: 100%;
  height: 100%;
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
