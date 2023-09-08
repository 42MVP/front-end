import { defineStore } from 'pinia';
import type { GameMatch } from '@/interfaces/game/GameMatch.interface';
import type { GameTable, GameInfo } from '@/interfaces/game/GamePlay.interface';

interface GameState {
  matchInfo: GameMatch | null;
  startTimeMs: number | undefined;
  isStarted: boolean;
  isFinished: boolean;
  background: string;
  leftScore: number;
  rightScore: number;
  tableInfo: GameTable;
  gameHistoryId: number;
}

const gameSettings = {
  gameWidth: 1100,
  gameHeight: 700,
  boardBackground: '#FFFFFF',
  paddleColor: '#463F3A',
  ballColor: '#E0AFA0',
  ballRadius: 12.5,
  paddleSpeed: 50,
};

export const useGameStore = defineStore('game', {
  state: (): GameState => ({
    matchInfo: null,
    startTimeMs: undefined,
    isStarted: false,
    isFinished: false,
    background: 'white',
    leftScore: 0,
    rightScore: 0,
    tableInfo: {
      background: 'white',
      leftPaddle: {
        width: 20,
        height: 100,
        x: 0,
        y: (gameSettings.gameHeight - 100) / 2,
      },
      rightPaddle: {
        width: 20,
        height: 100,
        x: 1100 - 20,
        y: (gameSettings.gameHeight - 100) / 2,
      },
      ball: {
        x: gameSettings.gameWidth / 2,
        y: gameSettings.gameHeight / 2,
        dx: 1,
        dy: 1,
      },
    },
    gameHistoryId: 0,
  }),
  getters: {
    isGameStart(): boolean {
      const isOver = this.startTimeMs ? this.startTimeMs < new Date().getTime() : false;
      return this.tableInfo !== undefined && isOver;
    },
  },
  actions: {
    setMatchInfo(matchInfo: GameMatch | null): void {
      this.matchInfo = matchInfo;
    },
    // game play
    setGamInfo(gameInfo: GameInfo): void {
      this.background = gameInfo.background;
      this.leftScore = gameInfo.leftScore;
      this.rightScore = gameInfo.rightScore;
      this.tableInfo = gameInfo.tableInfo;
    },
    setTableInfo(newInfo: GameTable) {
      this.tableInfo = newInfo;
    },

    setGameHistoryId(id: number) {
      this.gameHistoryId = id;
    },
  },
});
