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
      this.rooms[roomId].users = [...this.rooms[roomId].users, ...[user]];
      console.log('socket join');
    },
    leaveUser(roomId: number, userId: number) {
      this.rooms[roomId].users = this.rooms[roomId].users.filter(e => e.id !== userId);
      console.log('socket leave');
      // TODO : userId === loginStore.id
    },
    banUser(roomId: number, userId: number, name: string, avatarURL: string) {
      const user = { id: userId, name: name, avatarURL: avatarURL };
      this.rooms[roomId].banUser = [...this.rooms[roomId].banUser, ...[user]];
    },
    unbanUser(roomId: number, userId: number) {
      this.rooms[roomId].banUser = this.rooms[roomId].users.filter(user => user.id !== userId);
    },
    kickUser(roomId: number, userId: number) {
      this.rooms[roomId].users = this.rooms[roomId].users.filter(user => user.id !== userId);
    },
    muteUser(roomId: number, userId: number, abongTime: Date) {
      const selectedUser = this.rooms[roomId].users.find(user => user.id !== userId);
      selectedUser.abongTime = abongTime;
    },
    changeUserMode(roomId: number, userId: number, role: string) {
      const selectedUser = this.rooms[roomId].users.find(user => user.id !== userId);
      selectedUser.role = role;
      this.rooms[roomId].users = [...this.rooms[roomId].users];
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
