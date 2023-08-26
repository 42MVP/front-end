import { defineStore } from 'pinia';

export enum InvitationStep {
  None = -1,
  Invited = 0,
  Waiting = 1,
  Timeout = 2,
  Accept = 3,
  Reject = 4,
  InGame = 5,
}

interface InvitationState {
  id: number;
  step: InvitationStep;
  endTimeMs: number;
  inviterAvatarUrl: string;
  inviterUserName: string;
}

export const useInvitationStore = defineStore('invitation', {
  state: (): InvitationState => ({
    id: -1,
    step: InvitationStep.None,
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
  },
});
