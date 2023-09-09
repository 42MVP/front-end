import { axiosGet, axiosPost } from '@/services/utils/axiosInstance.utils';
import type { LoginInfo } from '@/interfaces/login/login.interface';

export interface AuthCode {
  code: string;
}

export class LoginService {
  static async getUserInfo(): Promise<LoginInfo> {
    const loginInfo: LoginInfo = await axiosGet('/user/me');
    return loginInfo;
  }

  static async postTwoFactor(authCode: AuthCode): Promise<void> {
    const data = await axiosPost('/login/2fa-auth', authCode);
    if (typeof data === 'string') localStorage.setItem('token', data);
  }

  static async logout(): Promise<void> {
    await axiosPost('/logout').catch(() => {});
    localStorage.clear();
  }
}
