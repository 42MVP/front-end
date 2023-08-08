import { APIWithToken } from '@/services/utils/apiDecorator.utils';
import { axiosAPI } from '@/services/utils/axiosInstance.utils';
import type { ChatInfo } from '@/interfaces/chat/ChatInfo.interface';
import type { ChatRoom, ChatRoomCreate, ChatRoomEnter, ChatRoomMode } from '@/interfaces/chat/ChatRoom.interface';
import type { ChatUserInfo } from '@/interfaces/chat/ChatUser.interface';

export enum RoomMode {
  PUBLIC = 'PUBLIC',
  PROTECTED = 'PROTECTED',
  PRIVATE = 'PRIVATE',
  DIRECT = 'DIRECT',
}

export type ServiceChatUser = (body: ChatUserInfo) => Promise<void> | null;

export class ChatService {
  static getServiceChatUser(eventName: string): ServiceChatUser {
    return chatUserServiceFunctions[eventName];
  }

  @APIWithToken()
  static async createRoom(body: ChatRoomCreate): Promise<ChatRoom> {
    const ret = await axiosAPI.auth().post('/chat/create-room', body);
    const chatRoom: ChatRoom = ret.data;
    return chatRoom;
  }

  @APIWithToken()
  static async enterRoom(body: ChatRoomEnter): Promise<ChatInfo> {
    const ret = await axiosAPI.auth().post('/chat/enter-room', {
      roomId: body.roomId,
      password: body.password,
    });
    const chatInfo: ChatInfo = ret.data;
    return chatInfo;
  }

  @APIWithToken()
  static async exitRoom(roomId: number): Promise<void> {
    console.log('exit:', `/chat/exit-room/${roomId}`);
    await axiosAPI.auth().delete(`/chat/exit-room/${roomId}`);
  }

  @APIWithToken()
  static async changeRoomMode(body: ChatRoomMode): Promise<void> {
    await axiosAPI.auth().patch('/chat/change-room-info', body);
  }

  @APIWithToken()
  static async getChatList(): Promise<ChatInfo[]> {
    const ret = await axiosAPI.auth().get(`/chat`);
    const chatInfo: ChatInfo[] = ret.data;

    return chatInfo;
  }

  @APIWithToken()
  static async searchChatList(): Promise<ChatRoom[]> {
    const ret = await axiosAPI.auth().get('/chat/search');
    const chatRoom: ChatRoom[] = ret.data;

    return chatRoom;
  }

  @APIWithToken()
  static async inviteUser(body: ChatUserInfo): Promise<void> {
    const ret = await axiosAPI.auth().post('/chat/invite', body);
    return ret.data;
  }

  @APIWithToken()
  static async kickUser(body: ChatUserInfo): Promise<void> {
    const ret = await axiosAPI.auth().delete('/chat/kick', { data: body });
    return ret.data;
  }

  @APIWithToken()
  static async updateUserRole(body: ChatUserInfo): Promise<void> {
    const ret = await axiosAPI.auth().patch('/chat/change-role', body);
    return ret.data;
  }

  @APIWithToken()
  static async updateUserState(body: ChatUserInfo): Promise<void> {
    const ret = await axiosAPI.auth().patch('/chat/change-status', body);
    return ret.data;
  }
}

const chatUserServiceFunctions: Record<string, ServiceChatUser> = {
  KICK: ChatService.kickUser,
  INVITE: ChatService.inviteUser,
  ADMIN: ChatService.updateUserRole,
  USER: ChatService.updateUserRole,
  BAN: ChatService.updateUserState,
  MUTE: ChatService.updateUserState,
  NONE: ChatService.updateUserState,
};
