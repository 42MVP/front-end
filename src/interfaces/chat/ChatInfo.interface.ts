import type { User } from '@/interfaces/user/User.interface';

export interface ChatInfo {
  id: number;
  isChannel: boolean;
  roomMode: string;
  name: string;
  role: string;
  abongTime: Date | null;
  users: User[];
  banUsers: User[];
}
