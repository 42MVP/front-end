import { io } from 'socket.io-client';

export class SocketService {
  private static instance: SocketService;
  private socket: any;

  private constructor() {
    const accessToken = localStorage.getItem('access-token');
    const URL = 'http://localhost:3000/';
    this.socket = io(URL, {
      auth: {
        token: accessToken,
      },
    });
    this.onSocket();
  }

  static getInstance(): SocketService {
    if (SocketService.instance === undefined) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  getSocket(): any {
    return this.socket;
  }

  onSocket(): void {
    this.socket.on('connect', () => {
      console.log('connect');
    });
    this.socket.on('disconnect', () => {
      console.log('disconnect');
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
