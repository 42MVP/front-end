export interface UserGameHistory {
  id: number;
  score: number;
  opponent: string;
  opponentScore: number;
  opponentAvatarUrl: string;
  isUserWin: boolean;
  createAt: string;
}
