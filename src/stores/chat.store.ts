import { defineStore } from 'pinia';
import type { Chat } from '@/interfaces/chat/Chat.interface';
import { ChatInfo } from '@/interfaces/chat/ChatInfo.interface';

export const useChatStore = defineStore('chat', {
  state: () => ({
    rooms: [],
    selectionIndex: -1,
  }),
  getters: {
    //    getChatById:
    //      state =>
    //      (id: number): Chat[] => {
    //        return state.rooms[id] || ([] as Chat[]);
    //      },
    getDmUserName(): string {
      return '디엠유저';
    },
    isSelected(): boolean {
      if (this.selectionIndex === -1) return false;
      return true;
    },
    getSelectionChatInfo(): ChatInfo {
      return this.rooms[this.selectionIndex];
    },
    getSelectionChat(): Chat[] {
      return this.rooms[this.selectionIndex].chats;
    },
  },
  actions: {
    setSelectionIndex(index: number) {
      this.selectionIndex = index;
    },
    addChatRoom(newChat: ChatInfo) {
      this.rooms.push(newChat);
    },
    deleteChatRoom(id: number) {
      this.rooms = this.rooms.filter((e, i) => i !== id);
    },
    addChat(newChat: Chat) {
      // FIXME: 임시
      if (this.getSelectionChat) this.rooms[this.selectionIndex].chats.push(newChat);
      else {
        this.rooms[this.selectionIndex].chats = [];
        this.rooms[this.selectionIndex].chats.push(newChat);
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
