import { io } from 'socket.io-client';
import { endpoint } from './utils/config.utils';
import { refreshToken } from './utils/axiosInstance.utils';

export class SocketService {
  private static instance: SocketService;
  private socket: any;

  private constructor() {
    this.connectSocket();
  }

  static getInstance(): SocketService {
    if (SocketService.instance === undefined) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  connectSocket(): void {
    const accessToken = localStorage.getItem('token');
    const URL = endpoint;
    this.socket = io(URL, {
      auth: {
        token: accessToken,
      },
    });
    this.onSocket();
  }

  getSocket(): any {
    return this.socket;
  }

  onSocket(): void {
    this.socket.on('connect', () => {
      console.log('connect');
    });
    this.socket.on('disconnect', async () => {
      console.log('disconnect');
      await refreshToken().catch(() => {
        localStorage.clear();
      });
      location.reload();
    });
    this.socket.on('connect_error', (error: any) => {
      console.log('connect_error:', error);
    });
  }

  offSocket(): void {
    this.socket.off('connect');
    this.socket.off('disconnect');
    this.socket.off('connect_error');
  }
}
