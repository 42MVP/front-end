export interface UserGameHistory {
  id: number;
  score: number;
  opponentAvatarURL: string;
  opponentName: string;
  opponentScore: number;
  isUserWin: boolean;
  createdAt: string;
}
