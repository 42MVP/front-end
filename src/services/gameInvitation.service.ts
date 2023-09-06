import { axiosPost } from './utils/axiosInstance.utils';
import { SocketService } from './socket.service';
import { gameStore, invitationStore } from '@/main';
import { InvitationStep } from '@/stores/invitation.store';
import type { GameMatch } from '@/interfaces/game/GameMatch.interface';

/**
 * API
 */
export class GameInvitationService {
  async inviteMatching(userId: number): Promise<void> {
    await axiosPost(`/game-invitation/invite/${userId}`);
  }

  async cancelInvite(invitationId: number): Promise<void> {
    await axiosPost(`/game-invitation/cancel-invite/${invitationId}`);
    invitationStore.setStep(InvitationStep.None);
  }

  get socket(): GameInvitationSocketService {
    return new GameInvitationSocketService();
  }
}

/**
 * SOCKET INTERFACE
 */

const event = {
  invite: 'invite',
  inviteSuccess: 'invite-success',
  inviteConfirm: 'invite-confirm',
  inviteTimeout: 'invite-timeout',
  inviteCancel: 'invite-cancel',
  inviteError: 'invite-error',
};

interface InviteEventData {
  inviterName: string;
  inviterAvatarUrl: string;
  invitationId: number;
  endTimeMs: number;
}

interface InviteSuccessEventData {
  invitationId: number;
  endTimeMs: number;
}

interface InviteConfirmEventData extends GameMatch {}

interface InviteTimeoutEventData {}

interface InviteCancelEventData {}

interface InviteErrorEventData {
  msg: string;
}

/**
 * SOCKET
 */

export class GameInvitationSocketService {
  private socketInstance: any = undefined;

  get socket() {
    if (this.socketInstance === undefined) this.socketInstance = SocketService.getInstance().getSocket();
    return this.socketInstance;
  }

  /**
   * ON
   */

  on() {
    console.log('socket invitation on');

    this.socket.on(event.invite, (data: InviteEventData) => {
      console.log('게임 초대됨');
      console.log(data);
      invitationStore.setId(data.invitationId);
      invitationStore.setEndTimeMs(data.endTimeMs);
      invitationStore.setInviter(data.inviterName, data.inviterAvatarUrl);
      invitationStore.setStep(InvitationStep.Invited);
    });

    this.socket.on(event.inviteSuccess, (data: InviteSuccessEventData) => {
      console.log('상대가 초대를 수신함');
      console.log(data);
      invitationStore.setId(data.invitationId);
      invitationStore.setEndTimeMs(data.endTimeMs);
      invitationStore.setStep(InvitationStep.Waiting);
    });

    this.socket.on(event.inviteCancel, (data: InviteCancelEventData) => {
      console.log('상대가 초대를 취소함');
      console.log(data);

      invitationStore.setCancelMessage('상대가 초대를 취소함');
      invitationStore.setStep(InvitationStep.Cancel);
    });

    this.socket.on(event.inviteConfirm, (data: InviteConfirmEventData) => {
      if (data.result === true) {
        console.log('게임 수락됨');
        invitationStore.setStep(InvitationStep.Accept);
        gameStore.setMatchInfo(data);
      } else {
        console.log('초대 게임 거절됨');
        invitationStore.setCancelMessage('초대 거절 됨');
        invitationStore.setStep(InvitationStep.Cancel);
      }
    });

    this.socket.on(event.inviteTimeout, (data: InviteTimeoutEventData) => {
      console.log('상대가 초대를 받지 않음');
      console.log(data);
      invitationStore.setCancelMessage('상대가 초대를 받지 않음');
      invitationStore.setStep(InvitationStep.Cancel);
    });

    this.socket.on(event.inviteError, (data: InviteErrorEventData) => {
      alert(`error from server: ${data.msg}`);
      console.log(data);
    });
  }

  off(): void {
    console.log('socket invitation off');

    this.socket.off(event.invite);
    this.socket.off(event.inviteSuccess);
    this.socket.off(event.inviteCancel);
    this.socket.off(event.inviteConfirm);
    this.socket.off(event.inviteTimeout);
    this.socket.off(event.inviteError);
  }

  /**
   * EMIT
   */

  acceptInvitation(invitationId: number) {
    invitationStore.setStep(InvitationStep.Waiting);
    this.socket.emit('accept-invite', { invitationId: invitationId });
  }

  rejectInvitation(invitationId: number) {
    invitationStore.setStep(InvitationStep.None);
    this.socket.emit('reject-invite', { invitationId: invitationId });
  }
}
