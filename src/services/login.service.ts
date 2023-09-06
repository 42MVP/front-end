import { axiosGet } from './utils/axiosInstance.utils';
import type { LoginInfo } from '@/interfaces/login/login.interface';

export class LoginService {
  static async getUserInfo(): Promise<LoginInfo> {
    const loginInfo: LoginInfo = await axiosGet(`http://localhost:3000/user/me`);
    return loginInfo;
  }
}
