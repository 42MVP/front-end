import { APIWithToken, getUserID } from '@/services/utils/apiDecorator.utils';
import { axiosAPI } from './utils/axiosInstance.utils';

export class LoginService {
  @APIWithToken()
  static async getUserInfo() {
    const userID = getUserID();
    const ret = await axiosAPI.auth().get(`http://localhost:3000/user/${userID}`);
    return ret;
  }
}
