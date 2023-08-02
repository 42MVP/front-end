import type { User } from '@/interfaces/user/User.interface';

export interface ChatInfo {
  id: number;
  name: string;
  roomMode: string;
  isChannel: boolean;
  role: string;
  abongTime: Date;
  users: User[];
  banUsers: User[];
}
