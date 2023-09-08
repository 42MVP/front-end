import { axiosPost } from './utils/axiosInstance.utils';
import { SocketService } from './socket.service';
import { gameStore, matchingStore } from '@/main';
import { MatchingStep } from '@/stores/matching.store';
import type { GameMatch } from '@/interfaces/game/GameMatch.interface';

/**
 * API
 */
export class GameMatchingService {
  async applyQueue(option: number): Promise<void> {
    await axiosPost(`/game-matching/queue/${option}`);
    matchingStore.setStep(MatchingStep.InQueue);
  }

  async cancelQueue(): Promise<void> {
    await axiosPost('/game-matching/cancel-queue');
    matchingStore.setStep(MatchingStep.GameSetting);
  }

  get socket(): GameMatchingSocketService {
    return new GameMatchingSocketService();
  }
}

/**
 * SOCKET INTERFACE
 */

const event = {
  matched: 'matched',
  timeout: 'timeout',
  confirm: 'confirm',
};

interface MatchedEventData {
  matchingId: number;
  endTimeMs: number;
}

interface TimeoutEventData {}

interface ConfirmEventData extends GameMatch {}

/**
 * SOCKET
 */

class GameMatchingSocketService {
  private socketInstance: any = undefined;

  get socket() {
    if (this.socketInstance === undefined) this.socketInstance = SocketService.getInstance().getSocket();
    return this.socketInstance;
  }

  /**
   * SOCKET ON
   */

  on(): void {
    this.socket.on(event.matched, (data: MatchedEventData) => {
      matchingStore.setMatchingEndTimeMs(data.endTimeMs);
      matchingStore.setId(data.matchingId);
      matchingStore.setStep(MatchingStep.InMatching);
    });

    this.socket.on(event.confirm, (data: ConfirmEventData) => {
      if (data.result === true) {
        gameStore.setMatchInfo(data);
        matchingStore.setStep(MatchingStep.Accept);
      } else {
        matchingStore.setStep(MatchingStep.Reject);
      }
    });

    this.socket.on(event.timeout, (data: TimeoutEventData) => {
      matchingStore.setStep(MatchingStep.Timeout);
    });
  }

  off(): void {
    this.socket.off(event.matched);
    this.socket.off(event.confirm);
    this.socket.off(event.timeout);
  }

  /**
   * SOCKET EMIT
   */

  acceptGame(matchingId: number) {
    matchingStore.setStep(MatchingStep.Waiting);
    this.socket.emit('accept-matching', { matchingId: matchingId });
  }

  rejectGame(matchingId: number) {
    matchingStore.setStep(MatchingStep.GameSetting);
    this.socket.emit('reject-matching', { matchingId: matchingId });
  }
}
