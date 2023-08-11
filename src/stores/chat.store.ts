import { defineStore } from 'pinia';
import type { ChatInfo } from '@/interfaces/chat/ChatInfo.interface';
import type { Chat } from '@/interfaces/chat/Chat.interface';
import { UserService } from '@/services/user.service';

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
    // socket actions
    async joinUser(roomId: number, userId: number) {
      // TODO: type
      const user = await UserService.getUserById(userId);
      console.log('user: ', user);
      this.rooms[roomId].users.push({
        id: userId,
        name: user.userName,
        avatarURL: user.avatarURL,
        role: 'USER',
        abongTime: new Date(),
      });
    },
    leaveUser(roomId: number, userId: number) {
      this.rooms[roomId].users = this.rooms[roomId].users.filter(e => e.id !== userId);
    },
    changeUserMode(roomId: number, userId: number) {},
    banUser(roomId: number, userId: number) {
      const user = this.rooms[roomId].users.find(e => e.id === userId);
      this.rooms[roomId].users = this.rooms[roomId].users.filter(e => e.id !== userId);
      this.rooms[roomId].banUser.push(user);
    },
    kickUser(roomId: number, userId: number) {},
    muteUser(roomId: number, userId: number, abongTime: Date) {},
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
