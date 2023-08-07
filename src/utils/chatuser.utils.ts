import type { ChatUser, ChatUserState, ChatUserRole } from '@/interfaces/chat/ChatUser.interface';

export function createChatUserByEvent(
  userId: number,
  roomId: number,
  eventName: string,
  muteTime?: Date,
): ChatUser | ChatUserState | ChatUserRole | null {
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
