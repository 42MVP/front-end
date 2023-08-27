import { GameInvitationService } from '@/services/gameInvitation.service';
import { GameMatchingService } from '@/services/gameMatching.service';

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
}
