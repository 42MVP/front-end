import { gameStore } from '@/main';
import { SocketService } from './socket.service';
import { APIWithToken } from './utils/apiDecorator.utils';
import { axiosAPI } from './utils/axiosInstance.utils';

export class GameSocketService {
  static onGame(): void {
    const socket = SocketService.getInstance().getSocket();
    socket.on('matched', (d: any) => {
      console.log('matched: ', d);

      gameStore.setReadyTime();
      gameStore.setStatus('게임여부');
      gameStore.matchingId = d.matchingId;
    });
    socket.on('match-error', (d: any) => {
      console.log(d);
    });
    socket.on('invite', (d: any) => {
      console.log(d);
    });
    socket.on('confirm', (d: any) => {
      console.log('confirm:', d);
      if (d === true) {
        // 수락
        gameStore.setStatus('게임시작');
        socket.on('enter-game', (d: any) => {
          console.log('enter-game: ', d);
        });
        socket.on('complete', (d: any) => {
          console.log('complete: ', d);
        });
        socket.on('init', (d: any) => {
          console.log('init: ', d);
        });
      } else {
        gameStore.setStatus('상대방거절');
      }
    });

    socket.on('timeout', (d: void) => {
      gameStore.setStatus('시간초과');
    });
  }

  static acceptGame(matchingId: number) {
    const socket = SocketService.getInstance().getSocket();
    socket.emit('accept-matching', { matchingId: matchingId });
  }

  static rejectGame(userId: number, matchingId: number) {
    const socket = SocketService.getInstance().getSocket();
    socket.emit('reject-matching', { userId: userId, matchingId: matchingId });
  }

  @APIWithToken()
  static gogoqueue() {
    axiosAPI.auth().post('/game-matching/queue');
  }
  @APIWithToken()
  static nonoQueue() {
    axiosAPI.auth().post('/game-matching/cancel-queue');
  }
}
