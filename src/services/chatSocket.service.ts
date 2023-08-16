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
    socket.on('ban', (d: SocketUserAction) => {
      console.log('ban');
      console.log(d);
    });
    socket.on('kick', (d: SocketUserAction) => {
      console.log('kick');
      console.log(d);
    });
    socket.on('userMode', (d: SocketUserMode) => {
      console.log('userMode');
      console.log(d);
    });
    socket.on('mute', (d: SocketMute) => {
      console.log('mute');
      console.log(d);
    });
  }

  static offChannel(): void {
    const socket = SocketService.getInstance().getSocket();
    socket.off('join');
    socket.off('leave');
    socket.off('userMode');
    socket.off('ban');
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
