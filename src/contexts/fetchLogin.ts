import { API } from '@/contexts/decorators';
import axios from 'axios';

export class Login {
  @API()
  static async fetchUserInfo(userID: number, token: string) {
    const ret = await axios.get(`http://localhost:3000/user/${userID}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
    return ret;
  }
}
