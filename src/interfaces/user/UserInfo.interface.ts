import type { UserGameHistory } from './UserGameHistory.interface';

export interface UserInfo {
  id: number;
  name: string;
  avatarURL: string;
  isFollow: boolean;
  isBlock: boolean;
  rate: number;
  winNum: number;
  loseNum: number;
  achievement: number[];
  gameHistory: UserGameHistory[];
}
