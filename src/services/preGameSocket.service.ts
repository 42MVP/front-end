import { gameStore, matchingStore } from '@/main';
import { MatchingStep } from '@/stores/matching.store';
import { SocketService } from './socket.service';
import type { GameMatch } from '@/interfaces/game/GameMatch.interface';

/**
 * matching
 * matching
 * matching
 * matching
 * matching
 */
const GameMatchingEvent = {
  matched: 'matched',
  timeout: 'timeout',
  confirm: 'confirm',
};

interface EmitMatched {
  matchingId: number;
  endTimeMs: number;
}

/**
 * invatation
 * invatation
 * invatation
 * invatation
 * invatation
 */

const GameInviteEvent = {
  invite: 'invite',
  inviteSuccess: 'invite-success',
  inviteConfirm: 'invite-confirm',
  inviteTimeout: 'invite-timeout',
  inviteError: 'invite-error',
};

interface EmitInviteError {
  msg: string;
}

interface EmitInvite {
  inviterName: string;
  inviterAvatarUrl: string;
  invitationId: number;
}

interface EmitInviteSuccess {
  invitationId: number;
}

export class PreGameSocketService {
  static onMatching(): void {
    const socket = SocketService.getInstance().getSocket();
    socket.on(GameMatchingEvent.matched, (d: EmitMatched) => {
      console.log('matched: ', d);
      matchingStore.setMatchingEndTimeMs(d.endTimeMs);
      matchingStore.setId(d.matchingId);
      matchingStore.setStep(MatchingStep.InMatching);
    });

    socket.on(GameMatchingEvent.confirm, (d: GameMatch) => {
      console.log('confirm:', d);
      if (d.result === true) {
        gameStore.setMatchInfo(d);
        matchingStore.setStep(MatchingStep.Accept);
      } else {
        matchingStore.setStep(MatchingStep.Reject);
      }
    });

    socket.on(GameMatchingEvent.timeout, () => {
      matchingStore.setStep(MatchingStep.Timeout);
    });
  }

  static offMatching(): void {
    const socket = SocketService.getInstance().getSocket();

    socket.off(GameMatchingEvent.matched);
    socket.off(GameMatchingEvent.confirm);
    socket.off(GameMatchingEvent.timeout);
  }

  static acceptGame(matchingId: number) {
    const socket = SocketService.getInstance().getSocket();

    socket.emit('accept-matching', { matchingId: matchingId });
  }

  static rejectGame(matchingId: number) {
    const socket = SocketService.getInstance().getSocket();

    socket.emit('reject-matching', { matchingId: matchingId });
  }

  /**
   * invatation
   * invatation
   * invatation
   * invatation
   * invatation
   */
  static onGameInvitation() {
    const socket = SocketService.getInstance().getSocket();

    socket.on(GameInviteEvent.invite, (d: EmitInvite) => {
      console.log(d);
      const isConfirmed = confirm(`${d.inviterName}님의 게임 초대를 수락하시겠습니까?`);

      if (isConfirmed === true) {
        this.acceptInvitation(d.invitationId);
      } else {
        this.rejectInvitation(d.invitationId);
      }
    });

    socket.on(GameInviteEvent.inviteSuccess, (d: EmitInviteSuccess) => {
      console.log('상대가 초대를 수신함');
      console.log(d);
    });

    socket.on(GameInviteEvent.inviteConfirm, (d: GameMatch) => {
      if (d.result === true) {
        console.log('게임 수락됨');
        gameStore.setMatchInfo(d);
      } else {
        console.log('초대 게임 거절됨');
      }
    });

    socket.on(GameInviteEvent.inviteTimeout, (d: void) => {
      console.log('상대가 초대를 받지 않음');
      console.log(d);
    });

    socket.on(GameInviteEvent.inviteError, (d: EmitInviteError) => {
      console.log(`error from server: ${d.msg}`);
      console.log(d);
    });
  }

  static offInvitation(): void {
    const socket = SocketService.getInstance().getSocket();

    socket.off(GameInviteEvent.invite);
    socket.off(GameInviteEvent.inviteSuccess);
    socket.off(GameInviteEvent.inviteConfirm);
    socket.off(GameInviteEvent.inviteTimeout);
    socket.off(GameInviteEvent.inviteError);
  }
  //-----------

  static acceptInvitation(invitationId: number) {
    const socket = SocketService.getInstance().getSocket();

    socket.emit('accept-invite', { invitationId: invitationId });
  }

  static rejectInvitation(invitationId: number) {
    const socket = SocketService.getInstance().getSocket();

    socket.emit('reject-invite', { invitationId: invitationId });
  }
}
