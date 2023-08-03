export interface ChatUser {
  userId: number;
  roomId: number;
}

export interface ChatUserState {
  userId: number;
  roomId: number;
  status: string;
  muteTime?: string;
}

export interface ChatUserRole {
  userId: number;
  roomId: number;
  role: string;
}
