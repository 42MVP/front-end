import { APIWithToken } from '@/services/utils/apiDecorator.utils';
import { axiosAPI } from '@/services/utils/axiosInstance.utils';
import type { User } from '@/interfaces/user/User.interface';

export class UserService {
  static mockUser = (): User[] => {
    return [
      {
        id: 3,
        name: 'kanghyki',
        avatarURL: '',
      },
      {
        id: 2,
        name: 'hyeongki',
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
  static async setUserProfile(formData: FormData) {
    return axiosAPI.auth().put(`/user`, formData);
  }
}
