import type { Chat } from '@/interfaces/chat/Chat.interface';
import type { User } from '@/interfaces/user/User.interface';

export interface ChatInfo {
  id: number;
  isChannel: boolean;
  roomMode: string;
  name: string;
  alertCount: number;
  avatarURL: string;
  users: User[];
  banUsers: User[];
  chats: Chat[];
}
