import type { GameUser } from '@/interfaces/game/GameUser.interface';

export interface GameMatch {
  result: boolean;
  leftUser?: GameUser;
  rightUser?: GameUser;
  gameRoomId?: number;
}