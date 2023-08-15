import { defineStore } from 'pinia';
import type { GameMatch } from '@/interfaces/game/GameMatch.interface';

interface GameState {
  isMatched: boolean;
  status: number;
  atReadyTime: Date;
  isGameConnected: boolean;
  option: number;
  matchInfo: GameMatch | null;
}

export const useGameStore = defineStore('game', {
  state: (): GameState => ({
    isMatched: false,
    status: 0,
    atReadyTime: new Date(0),
    isGameConnected: true,
    option: 0,
    matchInfo: null,
  }),
  getters: {
    isStatusMatched:
      state =>
      (stage: string): boolean => {
        return state.status === status[stage];
      },
  },
  actions: {
    setStatus(stage: string): void {
      this.status = status[stage];
    },
    setOption(option: number): void {
      this.option = option;
    },
    setReadyTime(ms: number = 5000): void {
      this.atReadyTime = new Date(new Date().getTime() + ms);
    },
    setMatchInfo(matchInfo: GameMatch | null): void {
      this.matchInfo = matchInfo;
    },
    initGame(): void {
      this.isMatched = true;
      this.isGameConnected = true;
    },
    endGame(): void {
      this.isMatched = false;
      this.isGameConnected = false;
      this.matchInfo = null;
    },
  },
});

const status: Record<string, number> = {
  게임설정: 1,
  매칭중: 2,
  게임여부: 3,
  상대방대기: 4,
  상대방거절: 5,
  게임시작: 6,
};
