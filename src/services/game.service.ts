import { GameInvitationService } from '@/services/gameInvitation.service';
import { GameMatchingService } from '@/services/gameMatching.service';
import { GamePlayService } from '@/services/gamePlay.service';
import { APIWithToken } from './utils/apiDecorator.utils';
import { axiosAPI } from './utils/axiosInstance.utils';
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

  @APIWithToken()
  static async getGameResult(gameId: number): Promise<GameHistory> {
    console.log('gameId', gameId);
    const ret = await axiosAPI.auth().get(`/game/game-history/${gameId}`);
    const gameResult: GameHistory = ret.data;

    return gameResult;
  }
}
