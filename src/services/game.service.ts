import { APIWithToken } from './utils/apiDecorator.utils';
import { axiosAPI } from './utils/axiosInstance.utils';

export class GameService {
  @APIWithToken()
  static async applyQueue(): Promise<void> {
    await axiosAPI.auth().post('/game-matching/queue');
  }

  @APIWithToken()
  static async cancelQueue(): Promise<void> {
    await axiosAPI.auth().post('/game-matching/cancel-queue');
  }

  @APIWithToken()
  static async inviteMatching(userId: number): Promise<void> {
    await axiosAPI.auth().post(`/game-invitation/invite/${userId}`);
  }
}
