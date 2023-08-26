import { GameInvitationService } from '@/services/gameInvitation.service';
import { GameMatchingService } from '@/services/gameMatching.service';

export class GameService {
  static get matching(): GameMatchingService {
    return new GameMatchingService();
  }
  static get invitation(): GameInvitationService {
    return new GameInvitationService();
  }
}
