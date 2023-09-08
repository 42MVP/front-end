import { defineStore } from 'pinia';
import type { ChatInfo } from '@/interfaces/chat/ChatInfo.interface';
import type { Chat } from '@/interfaces/chat/Chat.interface';
import type { User } from '@/interfaces/user/User.interface';

enum RemovedRoomMode {
  DELETED = 1,
  KICKED = 2,
}

class TimeoutManager {
  private static instance: TimeoutManager | undefined;
  private timeoutIds: { [id: number]: number } = [];

  private constructor() {}

  static getInstance(): TimeoutManager {
    if (this.instance === undefined) this.instance = new TimeoutManager();

    return this.instance;
  }

  private isAlreadySet(id: number) {
    const timeoutId = this.timeoutIds[id];
    if (timeoutId) return true;
    return false;
  }

  public setTimeout(id: number, time: Date, fn: () => void) {
    if (this.isAlreadySet(id)) this.deleteTimeout(id);

    const nowTime: number = new Date().getTime();
    const endTime: number = time.getTime();
    if (nowTime < endTime) this.timeoutIds[id] = setTimeout(fn, endTime - nowTime);
  }

  public deleteTimeout(id: number) {
    const timeoutId = this.timeoutIds[id];

    clearTimeout(timeoutId);
    delete this.timeoutIds[id];
  }
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
      return this.selectedID !== -1 ? true : false;
    },
    chatRoom(): ChatInfo | undefined {
      const id = this.selectedID;
      return this.rooms[id];
    },
    chat(): Chat[] {
      const chats = this.chats[this.selectedID];
      return chats ? chats : [];
    },
  },
  actions: {
    addChatRoom(id: number, room: ChatInfo) {
      this.rooms[id] = room;
      if (room.self.abongTime) {
        // TODO: remove
        TimeoutManager.getInstance().setTimeout(id, new Date(room.self.abongTime), () => {
          this.rooms[id].self.abongTime = new Date(0);
        });
      }
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
          return '삭제된 방입니다';
        case RemovedRoomMode.KICKED:
          return '강퇴 당하셨습니다';
        default:
          return '';
      }
    },
    selectChatRoom(id: number) {
      this.selectedID = id;
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
        TimeoutManager.getInstance().setTimeout(roomId, new Date(abongTime), () => {
          this.rooms[roomId].self.abongTime = new Date(0);
        });
      } else {
        const selectedUser = this.rooms[roomId].users.find(user => user.id === userId);
        if (selectedUser) selectedUser.abongTime = abongTime;
      }
    },
    changeUserMode(roomId: number, userId: number, role: string) {
      const room = this.rooms[roomId];
      const target = room.users?.find(user => user.id === userId);

      if (target) target.role = role;
      else if (room.self?.id === userId) room.self.role = role;
    },
  },
});
