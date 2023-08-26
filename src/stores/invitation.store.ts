import { defineStore } from 'pinia';

export enum InvitationStep {
  None = -1,
  Invited = 0,
  Waiting = 1,
  Accept = 2,
  Cancel = 3,
  InGame = 4,
}

interface InvitationState {
  id: number;
  step: InvitationStep;
  cancelMessage: string;
  endTimeMs: number;
  inviterAvatarUrl: string;
  inviterUserName: string;
}

export const useInvitationStore = defineStore('invitation', {
  state: (): InvitationState => ({
    id: -1,
    step: InvitationStep.None,
    cancelMessage: '',
    endTimeMs: 0,
    inviterAvatarUrl: '',
    inviterUserName: '',
  }),
  getters: {
    isStep: (state: InvitationState) => {
      return (step: InvitationStep) => state.step === step;
    },
  },
  actions: {
    setStep(step: InvitationStep): void {
      this.step = step;
    },
    setEndTimeMs(ms: number): void {
      this.endTimeMs = ms;
    },
    setId(id: number): void {
      this.id = id;
    },
    setInviter(userName: string, avatarURL: string): void {
      this.inviterUserName = userName;
      this.inviterAvatarUrl = avatarURL;
    },
    setCancelMessage(msg: string): void {
      this.cancelMessage = msg;
    },
  },
});
