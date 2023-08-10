import { io } from 'socket.io-client';
import Cookies from 'js-cookie';
import { chatStore } from '@/main';
import { Chat } from '@/interfaces/chat/Chat.interface';

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

export class ChatSocket {
  private static instance: ChatSocket;
  private socket: any;

  private constructor() {
    const accessToken = Cookies.get('access-token');
    const URL = 'http://localhost:3000/';
    this.socket = io(URL, {
      auth: {
        token: accessToken,
      },
    });
    this.socket.on('connect', () => {
      console.log('connect');
    });
    this.socket.on('disconnect', () => {
      console.log('disconnect');
    });
    this.socket.on('connect_error', (error: any) => {
      console.log('connect_error:', error);
    });
  }

  static getInstance(): ChatSocket {
    if (ChatSocket.instance === undefined) {
      ChatSocket.instance = new ChatSocket();
    }
    return ChatSocket.instance;
  }

  offChat() {
    this.socket.off('receive-message');
    // this.socket.off('connect');
    // this.socket.off('disconnect');
    // this.socket.off('connect_error');
    this.socket.off('join');
    this.socket.off('leave');
    this.socket.off('userMode');
    this.socket.off('ban');
    this.socket.off('kick');
    this.socket.off('mute');
  }

  onChat() {
    this.socket.on('receive-message', (chat: SocketChat) => {
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
    this.socket.on('join', (d: SocketUserAction) => {
      console.log('join:', d);
      chatStore.joinUser(d.roomId, d.userId);
    });
    this.socket.on('leave', (d: SocketUserAction) => {
      console.log('leave:', d);
      chatStore.leaveUser(d.roomId, d.userId);
    });
    this.socket.on('ban', (d: SocketUserAction) => {
      console.log('ban');
      console.log(d);
    });
    this.socket.on('kick', (d: SocketUserAction) => {
      console.log('kick');
      console.log(d);
    });
    this.socket.on('userMode', (d: SocketUserMode) => {
      console.log('userMode');
      console.log(d);
    });
    this.socket.on('mute', (d: SocketMute) => {
      console.log('mute');
      console.log(d);
    });
  }

  sendMessage(roomId: number, userId: number, userName: string, avatarURL: string, message: string) {
    //    console.log('roomId: ', roomId);
    //    console.log('userId: ', userId);
    //    console.log('userName: ', userName);
    //    console.log('message: ', message);

    this.socket.emit('send-message', {
      roomId: roomId,
      userId: userId,
      userName: userName,
      avatarURL: avatarURL,
      message: message,
    });
  }
}
