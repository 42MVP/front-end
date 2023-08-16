import { SocketService } from './socket.service';
import { chatStore } from '@/main';
import type { Chat } from '@/interfaces/chat/Chat.interface';

interface SocketChat {
  roomId: number;
  userId: number;
  userName: string;
  avatarURL: string;
  message: string;
}

interface SocketUserInfo {
  roomId: number;
  userId: number;
  name: string;
  avatarURL: string;
}

interface SocketUserAction {
  roomId: number;
  userId: number;
}

interface SocketMute {
  roomId: number;
  userId: number;
  abongTime: Date;
}

interface SocketUserMode {
  roomId: number;
  userId: number;
  role: string;
}

export class ChatSocketService {
  static onChat(): void {
    const socket = SocketService.getInstance().getSocket();
    socket.on('receive-message', (chat: SocketChat) => {
      console.log('receive-message: ', chat);
      const newChat: Chat = {
        id: chat.userId,
        username: chat.userName,
        avatarURL: chat.avatarURL,
        message: chat.message,
        date: new Date(),
      };
      chatStore.addChat(chat.roomId, newChat);
    });
  }

  static onChannel(): void {
    const socket = SocketService.getInstance().getSocket();
    socket.on('join', (d: SocketUserAction) => {
      console.log('join:', d);
      chatStore.joinUser(d.roomId, d.userId);
    });
    socket.on('leave', (d: SocketUserAction) => {
      console.log('leave:', d);
      chatStore.leaveUser(d.roomId, d.userId);
    });
    socket.on('ban', (d: SocketUserInfo) => {
      console.log('ban');
      chatStore.banUser(d.roomId, d.userId, d.name, d.avatarURL);
    });
    socket.on('unban', (d: SocketUserAction) => {
      console.log('unban');
      chatStore.unbanUser(d.roomId, d.userId);
    });
    socket.on('kick', (d: SocketUserAction) => {
      console.log('kick');
      chatStore.leaveUser(d.roomId, d.userId);
    });
    socket.on('userMode', (d: SocketUserMode) => {
      console.log('userMode');
      chatStore.changeUserMode(d.roomId, d.userId, d.role);
    });
    socket.on('mute', (d: SocketMute) => {
      console.log('mute');
      chatStore.muteUser(d.roomId, d.userId, d.abongTime);
    });
  }

  static offChannel(): void {
    const socket = SocketService.getInstance().getSocket();
    socket.off('join');
    socket.off('leave');
    socket.off('userMode');
    socket.off('ban');
    socket.off('unban');
    socket.off('kick');
    socket.off('mute');
  }

  static sendMessage(roomId: number, userId: number, userName: string, avatarURL: string, message: string): void {
    const socket = SocketService.getInstance().getSocket();
    socket.emit('send-message', {
      roomId: roomId,
      userId: userId,
      userName: userName,
      avatarURL: avatarURL,
      message: message,
    });
  }
}
