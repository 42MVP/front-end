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
  gameId: number;
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
    console.log('socket matching on');
    this.socket.on(event.start, (data: StartGameData) => {
      gameStore.startTimeMs = data.startTimeMs;
      console.log('start: ', gameStore.startTimeMs);
      console.log('curr, start', new Date(), new Date(gameStore.startTimeMs));
      window.addEventListener('keydown', this.keyDown);
    });

    this.socket.on(event.init, (data: GameInfo) => {
      console.log('init: ', data);
      gameStore.setGamInfo(data);
    });

    this.socket.on(event.render, (data: GameTable) => {
      console.log('render:', data);
      gameStore.setTableInfo(data);
    });

    this.socket.on(event.finish, (data: FinishEventData) => {
      // console.log('finish:', data);
      // TODO : data.gameId
      gameStore.isStarted = false;
      gameStore.isFinished = true;
      console.log('gamefinish data', data)
    });
  }

  off(): void {
    // console.log('socket matching off');
    this.socket.off(event.init);
    this.socket.off(event.render);
    this.socket.off(event.finish);
    window.removeEventListener('keydown', this.keyDown);
  }

  /**
   * SOCKET EMIT
   */

  readyGame(): void {
    console.log('readyGame');
    this.socket.emit('ready');
  }

  keyDown(event: KeyboardEvent): void {
    const socket = SocketService.getInstance().getSocket();
    if (event.key === 'ArrowUp') socket.emit('arrowUp');
    else if (event.key === 'ArrowDown') socket.emit('arrowDown');
  }
}
