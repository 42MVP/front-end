import { defineStore } from 'pinia';
import type { ChatInfo } from '@/interfaces/chat/ChatInfo.interface';
import type { Chat } from '@/interfaces/chat/Chat.interface';
import type { User } from '@/interfaces/user/User.interface';

interface ChatState {
  rooms: { [id: number]: ChatInfo };
  chats: { [id: number]: Chat[] };
  selectedID: number;
  kickedRooms: number[];
}

export const useChatStore = defineStore('chat', {
  state: (): ChatState => ({
    rooms: [],
    chats: [],
    selectedID: -1,
    kickedRooms: [],
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
    setRoomMode(id: number, roomMode: string) {
      this.rooms[id].roomMode = roomMode; 
    },
    isKicked(id: number) {
      if (this.kickedRooms.find(roomId => roomId === id)) return true;
      return false;
    },
    selectChatRoom(id: number) {
      if (this.isKicked(id)) this.selectedID = -2;
      else this.selectedID = id;
    },
    deleteChatRoom(id: number) {
      delete this.rooms[id];
      this.rooms = { ...this.rooms };
    },
    addChat(id: number, newChat: Chat) {
      const chats = this.chats[id];
      if (chats) {
        chats.push(newChat);
      }
    },
    // socket actions
    joinUser(roomId: number, userId: number, name: string, avatarURL: string) {
      const user: User = {
        id: userId,
        name: name,
        avatarURL: avatarURL,
        role: 'USER',
        abongTime: new Date(),
      };
      this.rooms[roomId].users = [...this.rooms[roomId].users, ...[user]];
    },
    leaveUser(roomId: number, userId: number) {
      this.rooms[roomId].users = this.rooms[roomId].users.filter(e => e.id !== userId);
    },
    banUser(roomId: number, userId: number, name: string, avatarURL: string) {
      const user = { id: userId, name: name, avatarURL: avatarURL };
      this.rooms[roomId].banUsers = [...this.rooms[roomId].banUsers, ...[user]];
    },
    unbanUser(roomId: number, userId: number) {
      this.rooms[roomId].banUsers = this.rooms[roomId].users.filter(user => user.id !== userId);
    },
    kickUser(roomId: number) {
      this.kickedRooms = [...this.kickedRooms, ...[roomId]];
    },
    muteUser(roomId: number, userId: number, abongTime: Date) {
      const selectedUser = this.rooms[roomId].users.find(user => user.id === userId);
      if (selectedUser) selectedUser.abongTime = abongTime;
    },
    changeUserMode(roomId: number, userId: number, role: string) {
      const selectedUser = this.rooms[roomId].users.find(user => user.id === userId);
      if (selectedUser) selectedUser.role = role;
    },
  },
});
