import type { Chat } from './Chat.interface';
import type { User } from './User.interface';

export interface ChatInfo {
  id: number;
  isChannel: boolean;
  hasPassword: boolean;
  name: string;
  alertCount: number;
  avatarURL: string;
  users: User[];
  banUsers: User[];
  chats: Chat[];
}
