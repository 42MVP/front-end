import { APIWithToken } from './utils/apiDecorator.utils';
import { axiosAPI } from './utils/axiosInstance.utils';
import type { GameHistory } from '@/interfaces/game/GameHistory.interface';

export class GameService {
  @APIWithToken()
  static async applyQueue(): Promise<void> {
    await axiosAPI.auth().post('/game-matching/queue');
  }

  @APIWithToken()
  static async cancelQueue(): Promise<void> {
    await axiosAPI.auth().post('/game-matching/cancel-queue');
  }

  @APIWithToken()
  static async inviteMatching(userId: number): Promise<void> {
    await axiosAPI.auth().post(`/game-invitation/invite/${userId}`);
  }

  @APIWithToken()
  static async getGameResult(gameId: string): Promise<GameHistory> {
    const ret = await axiosAPI.auth().get('/game/game-history/');
    const gameResult: GameHistory = ret.data;

    return gameResult;
  }
}
