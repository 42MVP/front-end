export interface ChatRoom {
  id: number;
  name: string;
  roomMode: string;
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
