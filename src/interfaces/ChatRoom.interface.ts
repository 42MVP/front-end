export interface ChatRoom {
  id: number;
  name: string;
  hasPassword: boolean;
}

export interface ChatRoomCreate {
  userId: number | null;
  roomName: string | null;
  roomMode: string;
  password: string | null;
}

export interface ChatRoomMode {
  roomId: number;
  roomMode: string;
  password: string | null;
}