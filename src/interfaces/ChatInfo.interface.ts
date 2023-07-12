import type { IChat } from './Chat.interface';
import type { IUser } from './User.interface';

export interface IChatInfo {
  id: number;
  isChannel: boolean;
  hasPassword: boolean;
  name: string;
  alertCount: number;
  avatarURL: string;
  users: IUser[];
  banUsers: IUser[];
  chats: IChat[];
}
