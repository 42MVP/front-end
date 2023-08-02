<template>
  <div class="container">
    <div class="chat-left">
      <ChatList />
    </div>
    <div class="chat-right">
      <ChatRoom v-if="chatStore.isSelected" :chatInfo="chatStore.getSelectionChatInfo" @response="updateRoomMode" />
      <div v-else class="chat-box-unchoose">☺️</div>
    </div>
  </div>
</template>

<script setup lang="ts">
// vue
import { onMounted } from 'vue';
// component
import ChatList from '@/components/chatview-components/ChatList.vue';
import ChatRoom from '@/components/chatview-components/ChatRoom.vue';
// service
import { ChatService } from '@/services/chat.service';
// store
import { useModalStore } from '@/stores/modal.store';
import { useLoginStore } from '@/stores/login.store';
import { useChatStore } from '@/stores/chat.store';

const modalStore = useModalStore();
const loginStore = useLoginStore();
const chatStore = useChatStore();

onMounted(async () => {
  try {
    chatStore.rooms = await ChatService.getChatList(loginStore.name);
    console.log('chatStore.rooms:', chatStore.rooms);
    //    const ret = await ChatService.createRoom({
    //      roomName: 'wowowowow',
    //      roomMode: RoomMode.DIRECT,
    //      dmId: 123,
    //    });
  } catch (e) {
    modalStore.on({
      title: '알림',
      text: e,
      buttonText: '닫기',
      buttonFunc: () => {},
    });
  }
});

//const updateRoomMode = (eventResponse: { id: number; roomMode: string }) => {
//  const room = chatInfos.value.find(element => element.id === eventResponse.id);
//  if (room) {
//    room.roomMode = eventResponse.roomMode;
//  }
//};
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
