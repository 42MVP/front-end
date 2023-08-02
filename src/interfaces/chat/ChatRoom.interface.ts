export interface ChatRoom {
  id: number;
  name: string;
  roomMode: string;
}

export type ChatRoomCreate = ChatRoomCreateDM | ChatRoomCreateChannel;

export interface ChatRoomCreateDM {
  userId: number;
  roomMode: { type: string; default: 'DIRECT' };
}

export interface ChatRoomCreateChannel {
  roomName: string;
  roomMode: string;
  password?: string;
}

export interface ChatRoomMode {
  roomId: number;
  roomMode: string;
  password?: string;
}
