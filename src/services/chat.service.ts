import { axiosGet, axiosPatch, axiosPost, axiosDelete } from '@/services/utils/axiosInstance.utils';
import type { ChatInfo } from '@/interfaces/chat/ChatInfo.interface';
import type { ChatRoom, ChatRoomCreate, ChatRoomEnter, ChatRoomMode } from '@/interfaces/chat/ChatRoom.interface';
import type { ChatUserInfo, ChatUser, ChatUserState, ChatUserRole } from '@/interfaces/chat/ChatUser.interface';
import type { User } from '@/interfaces/user/User.interface';

export enum RoomMode {
  PUBLIC = 'PUBLIC',
  PROTECTED = 'PROTECTED',
  PRIVATE = 'PRIVATE',
  DIRECT = 'DIRECT',
}

export enum Role {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export enum Mode {
  INVITE = 'INVITE',
  KICK = 'KICK',
  ONMUTE = 'ONMUTE',
  MUTE = 'MUTE',
  NONE = 'NONE',
  BAN = 'BAN',
  COMMON = 'COMMON',
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

  static createChatInfo(room: ChatRoom, isChannel: boolean, self: User): ChatInfo {
    return {
      id: room.id,
      name: room.name,
      roomMode: room.roomMode,
      isChannel: isChannel,
      self: self,
      users: [],
      banUsers: [],
    };
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

export function createChatUserByEvent(
  userId: number,
  roomId: number,
  eventName: string,
  muteTime?: Date,
): ChatUserInfo | null {
  if (createChatUserFunctions[eventName]) {
    return createChatUserFunctions[eventName](userId, roomId);
  }
  if (createChatUserStateFunctions[eventName]) {
    return muteTime
      ? createChatUserStateFunctions[eventName](userId, roomId, eventName, muteTime)
      : createChatUserStateFunctions[eventName](userId, roomId, eventName);
  }
  if (createChatUserRoleFunctions[eventName]) {
    return createChatUserRoleFunctions[eventName](userId, roomId, eventName);
  }
  return null;
}

type ChatUserFunction = (userId: number, roomId: number) => ChatUser;
type ChatUserRoleFunction = (userId: number, roomId: number, role: string) => ChatUserRole;
type ChatUserStateFunction = (userId: number, roomId: number, status: string, muteTime?: Date) => ChatUserState;

const createChatUserFunctions: Record<string, ChatUserFunction> = {
  INVITE: createChatUser,
};

const createChatUserRoleFunctions: Record<string, ChatUserRoleFunction> = {
  ADMIN: createChatUserRole,
  USER: createChatUserRole,
};

const createChatUserStateFunctions: Record<string, ChatUserStateFunction> = {
  KICK: createChatUserState,
  BAN: createChatUserState,
  MUTE: createChatUserState,
  NONE: createChatUserState,
};

function createChatUser(userId: number, roomId: number): ChatUser {
  return { userId, roomId };
}

function createChatUserState(userId: number, roomId: number, status: string, muteTime?: Date): ChatUserState {
  return muteTime ? { userId, roomId, status, muteTime } : { userId, roomId, status };
}

function createChatUserRole(userId: number, roomId: number, role: string): ChatUserRole {
  return { userId, roomId, role };
}
