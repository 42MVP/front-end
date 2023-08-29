import { defineStore } from 'pinia';
import type { GameMatch } from '@/interfaces/game/GameMatch.interface';

interface GameState {
  matchInfo: GameMatch | null;
  isCompleted: Boolean;
}

export const useGameStore = defineStore('game', {
  state: (): GameState => ({
    matchInfo: null,
    isCompleted: false,
  }),
  getters: {},
  actions: {
    setMatchInfo(matchInfo: GameMatch | null): void {
      this.matchInfo = matchInfo;
    },
  },
});
