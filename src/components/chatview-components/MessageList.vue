<template>
  <div class="chat-box-container" ref="chatref">
    <MessageBox v-for="chat in chats" :key="chat.id" :chat="chat" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch, nextTick, ref } from 'vue';
import MessageBox from './MessageBox.vue';
import type { IChat } from '@/interfaces/Chat.interface';

let chatref = ref(null);

onMounted(() => {
  chatref.value.scrollTop = chatref.value.scrollHeight;
});

const props = defineProps<{ chats: IChat[] }>();

watch(
  () => props.chats,
  () => {
    scrollToLatestMsg();
  },
);

const scrollToLatestMsg: Function = () => {
  nextTick(() => {
    chatref.value.scrollTo({ top: chatref.value.scrollHeight, behavior: 'smooth' });
  });
};
</script>

<style>
.chat-box-container {
  overflow: auto;
  width: 100%;
  height: 100%;
  margin: 20px 0px;
}
</style>
