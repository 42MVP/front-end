<template>
  <div class="container">
    <div class="chat-left">
      <ChatList :chatInfos="chatInfos" @selectchat="e => (index = e)" @reset="index = 0" />
    </div>
    <div class="chat-right">
      <ChatRoom v-if="isSelect" :friends="friends" :chatInfo="chatInfos[index]" @response="updateRoomMode" />
      <div v-else class="chat-box-unchoose">☺️</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import ChatList from '@/components/chatview-components/ChatList.vue';
import ChatRoom from '@/components/chatview-components/ChatRoom.vue';
import { ChatService } from '@/services/chat.service';
import type { ChatInfo } from '@/interfaces/chat/ChatInfo.interface';
import type { User } from '@/interfaces/user/User.interface';
import { useModalStore } from '@/stores/modal.store';
import { useLoginStore } from '@/stores/login.store';

const chatInfos = ref<ChatInfo[]>([]);
const friends = ref<User[]>([]);
const index = ref<number>(-1);
const isSelect = ref<boolean>(false);
const modalStore = useModalStore();
const loginStore = useLoginStore();

onMounted(async () => {
  if (!loginStore.isLogin) {
    return;
  }
  try {
    chatInfos.value = await ChatService.getChatInfos();
    friends.value = await ChatService.getFriend();
    console.log(chatInfos.value);
    console.log(friends.value);
  } catch (e) {
    modalStore.on({
      title: '알림',
      text: e,
      buttonText: '닫기',
      buttonFunc: () => {},
    });
  }
});

watch(index, () => {
  if (index.value !== -1) {
    isSelect.value = true;
  } else {
    isSelect.value = false;
  }
});

const updateRoomMode = (eventResponse: { id: number; roomMode: string }) => {
  const room = chatInfos.value.find(element => element.id === eventResponse.id);
  if (room) {
    room.roomMode = eventResponse.roomMode;
  }
};
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
