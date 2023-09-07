import { GameInvitationService } from '@/services/gameInvitation.service';
import { GameMatchingService } from '@/services/gameMatching.service';
import { GamePlayService } from '@/services/gamePlay.service';
import { axiosGet } from '@/services/utils/axiosInstance.utils';
import type { GameHistory } from '@/interfaces/game/GameHistory.interface';

export class GameService {
  private static gameMatchingService: GameMatchingService | undefined = undefined;
  private static gameInvitationService: GameInvitationService | undefined = undefined;
  private static gamePlayService: GamePlayService | undefined = undefined;

  static get matching(): GameMatchingService {
    if (this.gameMatchingService === undefined) this.gameMatchingService = new GameMatchingService();

    return this.gameMatchingService;
  }
  static get invitation(): GameInvitationService {
    if (this.gameInvitationService === undefined) this.gameInvitationService = new GameInvitationService();

    return this.gameInvitationService;
  }
  static get play(): GamePlayService {
    if (this.gamePlayService === undefined) this.gamePlayService = new GamePlayService();

    return this.gamePlayService;
  }

  static async getGameResult(gameId: number): Promise<GameHistory> {
    const gameResult: GameHistory = await axiosGet(`/game/game-history/${gameId}`);
    return gameResult;
  }
}
