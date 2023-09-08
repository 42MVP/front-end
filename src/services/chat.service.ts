import { axiosGet, axiosPatch, axiosPost, axiosDelete } from '@/services/utils/axiosInstance.utils';
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

  static async createRoom(body: ChatRoomCreate): Promise<ChatRoom> {
    const chatRoom: ChatRoom = await axiosPost('/chat/create-room', body);
    return chatRoom;
  }

  static async enterRoom(body: ChatRoomEnter): Promise<ChatInfo> {
    const chatInfo: ChatInfo = await axiosPost('/chat/enter-room', body);
    return chatInfo;
  }

  static async exitRoom(roomId: number): Promise<void> {
    await axiosDelete(`/chat/exit-room/${roomId}`);
  }

  static async changeRoomMode(body: ChatRoomMode): Promise<void> {
    await axiosPatch('/chat/change-room-info', body);
  }

  // static async getChatList(): Promise<ChatInfo[]> {
  //   const ret = await axiosGet(`/chat`);
  //   const chatInfo: ChatInfo[] = ret.data;

  //   return chatInfo;
  // }

  static async getChatList(): Promise<ChatInfo[]> {
    const ChatList: ChatInfo[] = await axiosGet(`/chat`);
    return ChatList;
  }

  static async searchChatList(): Promise<ChatRoom[]> {
    const chatRoom: ChatRoom[] = await axiosGet('/chat/search');
    return chatRoom;
  }

  static async inviteUser(body: ChatUserInfo): Promise<void> {
    await axiosPost('/chat/invite', body);
  }

  static async kickUser(body: ChatUserInfo): Promise<void> {
    await axiosDelete('/chat/kick', undefined, body);
  }

  static async updateUserRole(body: ChatUserInfo): Promise<void> {
    await axiosPatch('/chat/change-role', body);
  }

  static async updateUserState(body: ChatUserInfo): Promise<void> {
    await axiosPatch('/chat/change-status', body);
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
