import { gameStore } from '@/main';
import { SocketService } from './socket.service';
import type { GameInfo, GameTable } from '@/interfaces/game/GamePlay.interface';

export class GamePlayService {
  get socket(): GamePlaySocketService {
    return new GamePlaySocketService();
  }
}

/**
 * SOCKET INTERFACE
 */

const event = {
  start: 'start',
  init: 'init',
  render: 'render',
  finish: 'finish',
};

interface StartGameData {
  startTimeMs: number;
}

interface FinishEventData {
  gameHistoryId: number;
}

/**
 * SOCKET
 */

class GamePlaySocketService {
  private socketInstance: any = undefined;

  get socket() {
    if (this.socketInstance === undefined) this.socketInstance = SocketService.getInstance().getSocket();
    return this.socketInstance;
  }

  /**
   * SOCKET ON
   */

  on(): void {
    this.socket.on(event.start, (data: StartGameData) => {
      gameStore.startTimeMs = data.startTimeMs;
      window.addEventListener('keydown', this.keyDown);
    });

    this.socket.on(event.init, (data: GameInfo) => {
      gameStore.setGamInfo(data);
    });

    this.socket.on(event.render, (data: GameTable) => {
      gameStore.setTableInfo(data);
    });

    this.socket.on(event.finish, (data: FinishEventData) => {
      gameStore.setGameHistoryId(data.gameHistoryId);
      gameStore.isStarted = false;
      gameStore.isFinished = true;
      gameStore.leftScore = 0;
      gameStore.rightScore = 0;
      
    });
  }

  off(): void {
    this.socket.off(event.init);
    this.socket.off(event.render);
    this.socket.off(event.finish);
    window.removeEventListener('keydown', this.keyDown);
  }

  /**
   * SOCKET EMIT
   */

  readyGame(): void {
    this.socket.emit('ready');
  }

  keyDown(event: KeyboardEvent): void {
    const socket = SocketService.getInstance().getSocket();
    if (event.key === 'ArrowUp') socket.emit('arrowUp');
    else if (event.key === 'ArrowDown') socket.emit('arrowDown');
  }

  forceQuitGame(): void {
    this.socket.emit('forceQuit');
  }
}
