import type { GameHistory } from './GameHistory.interface';

export interface UserInfo {
  id: number;
  name: string;
  avatarURL: string;
  isFollow: boolean;
  isBlock: boolean;
  rate: number;
  achievement: number[];
  gameHistory: GameHistory[];
}
