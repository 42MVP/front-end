export interface ChatRoom {
  id: number;
  name: string;
  roomMode: string;
}

export interface ChatRoomCreate {
  roomName?: string;
  roomMode: string;
  password?: string;
  dmId?: number;
}

export interface ChatRoomEnter {
  roomId: number;
  password?: string;
}

export interface ChatRoomMode {
  roomId: number;
  roomMode: string;
  password: string | null;
}
