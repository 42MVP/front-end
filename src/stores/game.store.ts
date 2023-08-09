import { defineStore } from 'pinia';
import type { User } from '@/interfaces/user/User.interface';

interface GameState {
  isMatched: boolean;
  isGameConnected: boolean;
  status: number;
  option: number;
  atReadyTime: Date;
  opponent: User | null;
}

// export interface UserInfoGame {
//   id: number;
//   name: string;
//   avatarURL: string;
//   rate: number;
// }

export const useGameStore = defineStore('game', {
  state: (): GameState => ({
    isMatched: false,
    isGameConnected: true,
    status: 0,
    option: 0,
    atReadyTime: new Date(0),
    opponent: null,
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
    setOpponent(user: User | null): void {
      this.opponent = user;
    },
    initGame(): void {
      this.isMatched = true;
      this.isGameConnected = true;
    },
    endGame(): void {
      this.isMatched = false;
      this.isGameConnected = false;
      this.opponent = null;
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
