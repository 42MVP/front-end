import { defineStore } from 'pinia';
import type { Chat } from '@/interfaces/Chat.interface';

interface ChatState {
  chatRooms: { [id: number]: Chat[] };
}

export const useChatStore = defineStore('chat', {
  state: (): ChatState => ({
    chatRooms: {},
  }),
  getters: {
    getChatById:
      state =>
      (id: number): Chat[] => {
        return state.chatRooms[id] || ([] as Chat[]);
      },
  },
  actions: {
    addChatRoom(id: number, newChat: Chat) {
      this.chatRooms[id] = [newChat];
    },
    addChat(id: number, newChat: Chat) {
      const chatRoom = this.chatRooms[id];
      if (chatRoom) {
        chatRoom.push(newChat);
      }
      else {
        this.addChatRoom(id, newChat);
      }
    },
    deleteChatRoom(id: number) {
      delete this.chatRooms[id];
    },
    handleJoinEvent(event: CustomEvent<{ id: number; newChat: Chat }>) {
      const { id, newChat } = event.detail;
      this.addChatRoom(id, newChat);
    },
    handleMessageEvent(event: CustomEvent<{ id: number; newChat: Chat }>) {
      const { id, newChat } = event.detail;
      this.addChat(id, newChat);
    },
    handleLeaveEvent(event: CustomEvent<{ id: number }>) {
      const { id } = event.detail;
      this.deleteChatRoom(id);
    },
  },
});
