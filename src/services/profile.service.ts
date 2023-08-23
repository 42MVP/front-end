import { APIWithToken } from '@/services/utils/apiDecorator.utils';
import { axiosAPI } from '@/services/utils/axiosInstance.utils';
import type { UserInfo } from '@/interfaces/user/UserInfo.interface';

export class ProfileService {
  @APIWithToken()
  static async getProfile(name: string): Promise<UserInfo> {
    const ret = await axiosAPI.auth().get(`/user/name/${name}`);
    return ret.data;
  }
}
