import type { User } from '@/interfaces/user/User.interface';

export interface ChatInfo {
  id: number;
  name: string;
  isChannel: boolean;
  roomMode: string;
  self: User;
  users: User[];
  banUsers: User[];
}
