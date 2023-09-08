import axios from 'axios';
import { axiosGet } from '@/services/utils/axiosInstance.utils';
import { endpoint } from '@/services/utils/config.utils';
import type { LoginInfo } from '@/interfaces/login/login.interface';

export interface AuthCode {
  code: string;
}

export class LoginService {
  static async getUserInfo(): Promise<LoginInfo> {
    const loginInfo: LoginInfo = await axiosGet('/user/me');
    return loginInfo;
  }

  static async postTwoFactor(token: String, authCode: AuthCode): Promise<void> {
    const ret = await axios.post(endpoint + '/login/2fa-auth', authCode, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    if (typeof ret.data === 'string') localStorage.setItem('access-token', ret.data);
  }
}
