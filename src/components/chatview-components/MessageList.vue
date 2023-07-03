<script lang="ts">
import MessageBox from './MessageBox.vue';

export interface chat {
  id: number;
  username: string;
  userAvatarURL: string;
  message: string;
  date: Date;
}

export default {
  components: {
    MessageBox,
  },
  props: {
    chats: {} as chat[],
  },
  watch: {
    chats() {
      this.$nextTick(() => {
        let chatList = this.$refs.chatref;
        //        let chatList = document.querySelector('.chat-box-container');
        chatList.scrollTo({ top: chatList.scrollHeight, behavior: 'smooth' });
      });
    },
  },
  mounted() {
    let chatList = document.querySelector('.chat-box-container');
    chatList.scrollTop = chatList.scrollHeight;
  },
};
</script>

<template>
  <div class="chat-box-container" ref="chatref">
    <MessageBox v-for="chat in chats" :key="chat.id" :chat="chat" />
  </div>
</template>

<style>
.chat-box-container {
  overflow: auto;
  width: 100%;
  height: 100%;
  margin: 20px 0px;
}
</style>
