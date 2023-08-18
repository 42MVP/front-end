import { defineStore } from 'pinia';
import type { ChatInfo } from '@/interfaces/chat/ChatInfo.interface';
import type { Chat } from '@/interfaces/chat/Chat.interface';
import type { User } from '@/interfaces/user/User.interface';

enum RemovedRoomMode {
  DELETED = 1,
  KICKED = 2,
}

interface ChatState {
  rooms: { [id: number]: ChatInfo };
  chats: { [id: number]: Chat[] };
  selectedID: number;
  removedRooms: { [id: number]: RemovedRoomMode };
}

export const useChatStore = defineStore('chat', {
  state: (): ChatState => ({
    rooms: [],
    chats: [],
    selectedID: -1,
    removedRooms: {},
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
    isOwner(roomId: number, userId: number): boolean {
      const user = this.rooms[roomId].users.find(user => user.id === userId);
      return user?.role === 'OWNER';
    },
    getNotice(id: number): string {
      switch (this.removedRooms[id]) {
        case RemovedRoomMode.DELETED:
          return '삭제된 채널입니다';
        case RemovedRoomMode.KICKED:
          return '강퇴 당하셨습니다';
        default:
          return '';
      }
    },
    selectChatRoom(id: number) {
      if (this.removedRooms[id]) this.selectedID = -1;
      else this.selectedID = id;
    },
    deleteChatRoom(id: number) {
      delete this.rooms[id];
      this.rooms = { ...this.rooms };
      delete this.removedRooms[id];
      this.removedRooms = { ...this.removedRooms };
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
      if (this.isOwner(roomId, userId)) {
        this.removedRooms = { ...this.removedRooms, [roomId]: RemovedRoomMode.DELETED };
        return;
      }
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
      this.removedRooms = { ...this.removedRooms, [roomId]: RemovedRoomMode.KICKED };
    },
    muteUser(roomId: number, userId: number, abongTime: Date) {
      const isSelf = this.rooms[roomId].self.id === userId;
      if (isSelf) {
        this.rooms[roomId].self.abongTime = abongTime;
      } else {
        const selectedUser = this.rooms[roomId].users.find(user => user.id === userId);
        if (selectedUser) selectedUser.abongTime = abongTime;
      }
    },
    changeUserMode(roomId: number, userId: number, role: string) {
      const selectedUser = this.rooms[roomId].users.find(user => user.id === userId);
      if (selectedUser) selectedUser.role = role;
    },
  },
});
