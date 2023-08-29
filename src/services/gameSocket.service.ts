import { SocketService } from './socket.service';
import type { GameInfo, GameTable } from '@/interfaces/game/GamePlay.interface';

export class GameSocketService {
  static onGameInit() {
    const socket = SocketService.getInstance().getSocket();

    socket.on('enter-game', (d: any) => {
      console.log('enter-game: ', d);
    });
    socket.on('complete', (d: any) => {
      console.log('complete: ', d);
    });
    socket.on('init', (d: any) => {
      console.log('init: ', d);
    });
  }

  static sendRenderReady(): void {
    const socket = SocketService.getInstance().getSocket();

    socket.emit('render-ready');
  }
  //-----------

  /**
   * play
   * play
   * play
   * play
   * play
   */
  private static _background: string;
  private static _leftScore: number;
  private static _rightScore: number;
  private static _tableInfo: GameTable;
  private static _isCompleted: boolean;

  static onPlay(): void {
    console.log('onPlay==============');
    const socket = SocketService.getInstance().getSocket();
    socket.on('init', (gameInfo: GameInfo) => {
      console.log('game-init', gameInfo);
      this.initGame(gameInfo);
    });
    socket.on('render', (table: GameTable) => {
      this._tableInfo = table;
      console.log('cur:', this._tableInfo);
      console.log('game-render', table);
    });
    socket.on('finish', () => {
      this._isCompleted = true;
    });
    window.addEventListener('keydown', GameSocketService.keyDown);
  }

  static offPlay(): void {
    const socket = SocketService.getInstance().getSocket();
    socket.off('init');
    socket.off('render');
    socket.off('finish');
    window.removeEventListener('keydown', GameSocketService.keyDown);
  }
  static keyDown(event: KeyboardEvent): void {
    const socket = SocketService.getInstance().getSocket();
    if (event.key === 'ArrowUp') socket.emit('arrowUp');
    else if (event.key === 'ArrowDown') socket.emit('arrowDown');
  }
  // game play
  static initGame(gameInfo: GameInfo): void {
    this._background = gameInfo.background;
    this._leftScore = gameInfo.leftScore;
    this._rightScore = gameInfo.rightScore;
    this._tableInfo = gameInfo.tableInfo;
  }
  static set tableInfo(newInfo: GameTable) {
    this._tableInfo = newInfo;
  }

  static get tableInfo() {
    return this._tableInfo;
  }

  static get leftScore() {
    return this._leftScore;
  }

  static get rightScore() {
    return this._rightScore;
  }

  static get backGround() {
    return this._background;
  }

  static get isCompleted() {
    return this._isCompleted;
  }
}
