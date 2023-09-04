import { APIWithToken } from '@/services/utils/apiDecorator.utils';
import { axiosAPI } from './utils/axiosInstance.utils';
import type { LoginInfo } from '@/interfaces/login/login.interface';

export class LoginService {
  @APIWithToken()
  static async getUserInfo(): Promise<LoginInfo> {
    const ret = await axiosAPI.auth().get(`http://localhost:3000/user/me`);
    return ret.data;
  }
}
