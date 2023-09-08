<template>
  <div class="chat-box-container" ref="chatref">
    <div v-for="(chat, idx) in chats" :key="idx">
    <MessageBox v-if="isBlockUser(chat.username)" :key="chat.id" :chat="chat" />
  </div>
 </div>
</template>

<script setup lang="ts">
import { onMounted, watch, nextTick, ref } from 'vue';
import MessageBox from './MessageBox.vue';
import type { Chat } from '@/interfaces/chat/Chat.interface';
import { useUsersStore } from '@/stores/users.store';

const usersStore = useUsersStore();

let chatref = ref();

onMounted(() => {
  chatref.value.scrollTop = chatref.value.scrollHeight;
});

const props = defineProps<{ chats: Chat[] }>();

watch(
  () => props.chats.length,
  () => {
    scrollToLatestMsg();
  },
);

const scrollToLatestMsg: Function = () => {
  nextTick(() => {
    chatref.value.scrollTo({ top: chatref.value.scrollHeight, behavior: 'smooth' });
  });
};

const isBlockUser = (name: string) : boolean => {
  const res =  usersStore.blocks.find(block => block.name === name)
  console.log("blocks", usersStore.blocks);
  console.log(res);
  return  usersStore.blocks.find(block => block.name === name) ? false : true;
}

</script>

<style>
.chat-box-container {
  overflow: auto;
  width: 100%;
  height: 100%;
  margin: 20px 0px;
}
</style>
