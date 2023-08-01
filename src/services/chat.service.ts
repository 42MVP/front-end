import { APIWithToken } from '@/services/utils/apiDecorator.utils';
import { axiosAPI } from '@/services/utils/axiosInstance.utils';
import { ChatInfo } from '@/interfaces/chat/ChatInfo.interface';
import { ChatRoom, ChatRoomCreate, ChatRoomEnter, ChatRoomMode } from '@/interfaces/chat/ChatRoom.interface';

export enum RoomMode {
  PUBLIC = 'PUBLIC',
  PROTECTED = 'PROTECTED',
  PRIVATE = 'PRIVATE',
  DIRECT = 'DIRECT',
}

export class ChatService {
  @APIWithToken()
  static async createRoom(body: ChatRoomCreate): Promise<ChatRoom> {
    const ret = await axiosAPI.auth().post('/chat/create-room', {
      roomName: body.roomName,
      roomMode: body.roomMode,
      password: body.password,
      dmId: body.dmId,
    });

    return ret.data;
  }

  @APIWithToken()
  static async enterRoom(body: ChatRoomEnter): Promise<ChatInfo> {
    const ret = await axiosAPI.auth().post('/chat/enter-room', {
      roomId: body.roomId,
      password: body.password,
    });

    return ret.data;
  }

  @APIWithToken()
  static async exitRoom(roomId: number): Promise<void> {
    console.log('exit:', `/chat/exit-room/${roomId}`);
    await axiosAPI.auth().delete(`/chat/exit-room/${roomId}`);
  }

  @APIWithToken()
  static async getChatList(username: string): Promise<ChatInfo[]> {
    const ret = await axiosAPI.auth().get(`/chat/${username}`);

    return ret.data;
  }

  @APIWithToken()
  static async searchChatList(): Promise<ChatRoom[]> {
    const ret = await axiosAPI.auth().get('/chat/search');

    return ret.data;
  }
}
