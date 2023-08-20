import { gameStore } from '@/main';
import { SocketService } from './socket.service';

const GameMatchingEvent = {
  matched: 'matched',
  timeout: 'timeout',
  confirm: 'confirm',
};

const GameInviteEvent = {
  invite: 'invite',
  inviteFailed: 'invite-failed',
  inviteSuccess: 'invite-success',
  inviteAccepted: 'invite-accepted',
  inviteRejected: 'invite-rejected',
  inviteTimeout: 'invite-timeout',
  inviteError: 'invite-error',
};

export class GameSocketService {
  static onGame(): void {
    const socket = SocketService.getInstance().getSocket();
    socket.on(GameMatchingEvent.matched, (d: any) => {
      console.log('matched: ', d);
      gameStore.setReadyTime();
      gameStore.setStatus('게임여부');
      gameStore.matchingId = d.matchingId;
    });

    socket.on(GameMatchingEvent.confirm, (d: any) => {
      console.log('confirm:', d);
      if (d === true) {
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

  static acceptGame(matchingId: number) {
    const socket = SocketService.getInstance().getSocket();

    socket.emit('accept-matching', { matchingId: matchingId });
  }

  static rejectGame(userId: number, matchingId: number) {
    const socket = SocketService.getInstance().getSocket();

    socket.emit('reject-matching', { userId: userId, matchingId: matchingId });
  }

  static onGameInvitation() {
    const socket = SocketService.getInstance().getSocket();

    socket.on(GameInviteEvent.invite, (d: { inviterName: string; inviterAvatarUrl: string; invitationId: number }) => {
      console.log(d);
      const isConfirmed = confirm(`${d.inviterName}님의 게임 초대를 수락하시겠습니까?`);

      if (isConfirmed === true) {
        this.acceptInvitation(d.invitationId);
      } else {
        this.rejectInvitation(d.invitationId);
      }
    });

    socket.on(GameInviteEvent.inviteFailed, (d: { msg: string }) => {
      alert(d.msg);
    });

    socket.on(GameInviteEvent.inviteSuccess, (d: { invitationId: number }) => {
      console.log('상대가 초대를 수신함');
      console.log(d);
    });

    socket.on(GameInviteEvent.inviteAccepted, (d: void) => {
      console.log('게임 수락됨');
      console.log(d);
    });

    socket.on(GameInviteEvent.inviteRejected, (d: void) => {
      console.log('초대 게임 거절됨');
      console.log(d);
    });

    socket.on(GameInviteEvent.inviteTimeout, (d: void) => {
      console.log('상대가 초대를 받지 않음');
      console.log(d);
    });

    socket.on(GameInviteEvent.inviteError, (d: { msg: string }) => {
      console.log(`error from server: ${d.msg}`);
      console.log(d);
    });
  }

  static acceptInvitation(invitationId: number) {
    const socket = SocketService.getInstance().getSocket();

    socket.emit('accept-invite', { invitationId: invitationId });
  }

  static rejectInvitation(invitationId: number) {
    const socket = SocketService.getInstance().getSocket();

    socket.emit('reject-invite', { invitationId: invitationId });
  }
}
