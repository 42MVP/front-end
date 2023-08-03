import { APIWithToken } from '@/services/utils/apiDecorator.utils';
import { axiosAPI } from '@/services/utils/axiosInstance.utils';
import type { User } from '@/interfaces/user/User.interface';
import type { UserInfo } from '@/interfaces/user/UserInfo.interface';

export class UserService {
  static mockUser = (): User[] => {
    return [
      {
        id: 14,
        name: 'haha0',
        avatarURL: '',
      },
      {
        id: 15,
        name: 'haha2',
        avatarURL: '',
      },
      {
        id: 16,
        name: 'ha3ha2',
        avatarURL: '',
      },
    ];
  };

  @APIWithToken()
  static async getAllUser(): Promise<User> {
    const ret = await axiosAPI.auth().get('/user');
    return ret.data;
  }

  @APIWithToken()
  static async getUser(username: string): Promise<User> {
    const ret = await axiosAPI.auth().get('/user', {
      params: { username: username },
    });
    return ret.data;
  }
}
