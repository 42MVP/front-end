import { defineStore } from 'pinia';

export enum MatchingStep {
  GameSetting = 0,
  InQueue = 1,
  InMatching = 2,
  Waiting = 3,
  Timeout = 4,
  Accept = 5,
  Reject = 6,
  InGame = 7,
}

interface MatchingState {
  id: number;
  step: MatchingStep;
  matchingEndTimeMs: number;
  option: string; // TODO: 옵션?
}

export const useMatchingStore = defineStore('matching', {
  state: (): MatchingState => ({
    id: -1,
    step: MatchingStep.GameSetting,
    matchingEndTimeMs: 0,
    option: '',
  }),
  getters: {
    isStep: (state: MatchingState) => {
      return (step: MatchingStep) => state.step === step;
    },
  },
  actions: {
    setStep(step: MatchingStep): void {
      this.step = step;
    },
    setMatchingEndTimeMs(ms: number): void {
      this.matchingEndTimeMs = ms;
    },
    setId(id: number): void {
      this.id = id;
    },
  },
});
