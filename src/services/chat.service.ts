import { API, APIWithToken } from '@/services/utils/apiDecorator.utils';
import { axiosAPI } from '@/services/utils/axiosInstance.utils';
import type { ChatInfo } from '@/interfaces/chat/ChatInfo.interface';
import type { ChatRoom, ChatRoomCreate, ChatRoomEnter, ChatRoomMode } from '@/interfaces/chat/ChatRoom.interface';
import type { ChatUser, ChatUserState, ChatUserRole } from '@/interfaces/chat/ChatUser.interface';

export enum RoomMode {
  PUBLIC = 'PUBLIC',
  PROTECTED = 'PROTECTED',
  PRIVATE = 'PRIVATE',
  DIRECT = 'DIRECT',
}

type ServiceChatUser = (body: ChatUser | ChatUserState | ChatUserRole) => Promise<void> | null;

export class ChatService {
  static getServiceChatUser(eventName: string): ServiceChatUser {
    return chatUserServiceFunctions[eventName];
  }

  @APIWithToken()
  static async createRoom(body: ChatRoomCreate): Promise<ChatRoom> {
    const ret = await axiosAPI.auth().post('/chat/create-room', body);

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
  static async changeRoomMode(roomInfo: ChatRoomMode): Promise<void> {
    await axiosAPI.auth().patch('/chat/change-room-info', {
      roomId: roomInfo.roomId,
      roomMode: roomInfo.roomMode,
      password: roomInfo.password,
    });
  }

  @APIWithToken()
  static async getChatList(): Promise<ChatInfo[]> {
    const ret = await axiosAPI.auth().get(`/chat`);

    return ret.data;
  }

  @APIWithToken()
  static async searchChatList(): Promise<ChatRoom[]> {
    const ret = await axiosAPI.auth().get('/chat/search');

    return ret.data;
  }

  @APIWithToken()
  static async inviteUser(body: ChatUser): Promise<void> {
    const ret = await axiosAPI.auth().post('/chat/invite', body);
    return ret.data;
  }

  @APIWithToken()
  static async banUser(body: ChatUser): Promise<void> {
    const ret = await axiosAPI.auth().post('/chat/ban', body);
    return ret.data;
  }

  @APIWithToken()
  static async kickUser(body: ChatUserState): Promise<void> {
    const ret = await axiosAPI.auth().delete('/chat/kick', { data: body });
    return ret.data;
  }

  @APIWithToken()
  static async updateUserRole(body: ChatUserRole): Promise<void> {
    const ret = await axiosAPI.auth().patch('/chat/change-role', body);
    return ret.data;
  }

  @APIWithToken()
  static async updateUserState(body: ChatUserState): Promise<void> {
    const ret = await axiosAPI.auth().patch('/chat/change-status', body);
    return ret.data;
  }
}

const chatUserServiceFunctions: Record<string, ServiceChatUser> = {
  KICK: ChatService.kickUser,
  INVITE: ChatService.inviteUser,
  BAN: ChatService.banUser,
  ADMIN: ChatService.updateUserRole,
  USER: ChatService.updateUserRole,
  MUTE: ChatService.updateUserState,
  NONE: ChatService.updateUserState,
};
