import { gameStore } from '@/main';
import { SocketService } from './socket.service';

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

interface GameUser {
  id: number;
  name: string;
  avatarURL: string;
}

interface EmitConfirm {
  result: boolean;
  leftUser: GameUser | undefined;
  rightUser: GameUser | undefined;
  gameRoomId: number | undefined;
}

interface EmitMatched {
  matchingId: number;
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
  inviteFailed: 'invite-failed',
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

interface GameUser {
  id: number;
  name: string;
  avatarURL: string;
}

interface EmitInviteConfirm {
  result: boolean;
  leftUser: GameUser | undefined;
  rightUser: GameUser | undefined;
  gameRoomId: number | undefined;
}

export class GameSocketService {
  /**
   * matching
   * matching
   * matching
   * matching
   * matching
   */
  static onGame(): void {
    const socket = SocketService.getInstance().getSocket();
    socket.on(GameMatchingEvent.matched, (d: EmitMatched) => {
      console.log('matched: ', d);
      gameStore.setReadyTime();
      gameStore.setStatus('게임여부');
      gameStore.matchingId = d.matchingId;
    });

    socket.on(GameMatchingEvent.confirm, (d: EmitConfirm) => {
      console.log('confirm:', d);
      if (d.result === true) {
        gameStore.matchInfo = d;
        gameStore.setStatus('게임시작');
      } else {
        gameStore.setStatus('상대방거절');
      }
    });

    socket.on(GameMatchingEvent.timeout, (d: void) => {
      gameStore.setStatus('시간초과');
    });
  }

  static onGameInit() {
    const socket = SocketService.getInstance().getSocket();

    socket.on('enter-game', (d: any) => {
      console.log('enter-game: ', d);
    });
    socket.on('complete', (d: any) => {
      console.log('complete: ', d);
    });
    socket.on('init', (d: any) => {
      console.log('init: ', d);
    });
  }
  //-----------

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

    socket.on(GameInviteEvent.inviteConfirm, (d: EmitInviteConfirm) => {
      if (d.result === true) {
        console.log('게임 수락됨');
        gameStore.matchInfo = d;
        gameStore.initGame();
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
