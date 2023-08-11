import { defineStore } from 'pinia';
import type { ChatInfo } from '@/interfaces/chat/ChatInfo.interface';
import type { Chat } from '@/interfaces/chat/Chat.interface';

interface ChatState {
  rooms: { [id: number]: ChatInfo };
  chats: { [id: number]: Chat[] };
  selectedID: number;
}

export const useChatStore = defineStore('chat', {
  state: (): ChatState => ({
    rooms: [],
    chats: [],
    selectedID: -1,
  }),
  getters: {
    isSelected(): boolean {
      if (this.selectedID === -1) return false;
      return true;
    },
  },
  actions: {
    addChatRoom(id: number, room: ChatInfo) {
      this.rooms[id] = room;
      if (!this.chats[id]) this.chats[id] = [];
    },
    deleteChatRoom(id: number) {
      delete this.rooms[id];
    },
    addChat(id: number, newChat: Chat) {
      const chats = this.chats[id];
      if (chats) {
        chats.push(newChat);
      }
    },
    //    handleJoinEvent(event: CustomEvent<{ id: number; newChat: Chat }>) {
    //      const { id, newChat } = event.detail;
    //      this.addChatRoom(id, newChat);
    //    },
    //    handleMessageEvent(event: CustomEvent<{ id: number; newChat: Chat }>) {
    //      const { id, newChat } = event.detail;
    //      this.addChat(id, newChat);
    //    },
    //    handleLeaveEvent(event: CustomEvent<{ id: number }>) {
    //      const { id } = event.detail;
    //      this.deleteChatRoom(id);
    //    },
  },
});
