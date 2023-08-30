import { APIWithToken } from '@/services/utils/apiDecorator.utils';
import { axiosAPI } from './utils/axiosInstance.utils';

export interface AuthCode {
  code: string;
}

export class LoginService {
  @APIWithToken()
  static async getUserInfo() {
    const ret = await axiosAPI.auth().get(`http://localhost:3000/user/me`);
    return ret;
  }

  static async postTwoFactor(token: String, authCode: AuthCode): Promise<void> {
    const ret = await axiosAPI.twoFaAuth(token).post('/login/2fa-auth', { authCode: authCode });
    return ret.data;
  }
}
