import { GameInvitationService } from '@/services/gameInvitation.service';
import { GameMatchingService } from '@/services/gameMatching.service';
import { APIWithToken } from './utils/apiDecorator.utils';
import { axiosAPI } from './utils/axiosInstance.utils';
import type { GameHistory } from '@/interfaces/game/GameHistory.interface';

export class GameService {
  private static gameMatchingService: GameMatchingService | undefined = undefined;
  private static gameInvitationService: GameInvitationService | undefined = undefined;

  static get matching(): GameMatchingService {
    if (this.gameMatchingService === undefined) this.gameMatchingService = new GameMatchingService();

    return this.gameMatchingService;
  }
  static get invitation(): GameInvitationService {
    if (this.gameInvitationService === undefined) this.gameInvitationService = new GameInvitationService();

    return this.gameInvitationService;
  }

  @APIWithToken()
  static async getGameResult(gameId: number): Promise<GameHistory> {
    const ret = await axiosAPI.auth().get(`/game/game-history/${gameId}`);
    const gameResult: GameHistory = ret.data;

    return gameResult;
  }
}
