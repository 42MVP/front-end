import { SocketService } from './socket.service';

export class GameSocketService {
  example(): void {
    const socket = SocketService.getInstance().getSocket();
    console.log(socket);
  }
}
