export interface ChatUserState {
    userId: number;
    roomId: number;
    state: string;
    muteTime: string;
}

export interface ChatUserRole {
  userId: number;
  roomId: number;
  role: string;
}