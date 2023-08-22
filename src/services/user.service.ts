import { APIWithToken } from '@/services/utils/apiDecorator.utils';
import { axiosAPI } from '@/services/utils/axiosInstance.utils';
import type { User } from '@/interfaces/user/User.interface';
import type { UserInfo } from '@/interfaces/user/UserInfo.interface';

export class UserService {
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

  // TODO: TYPE
  @APIWithToken()
  static async getUserById(id: number): Promise<UserInfo> {
    const ret = await axiosAPI.auth().get(`/user/${id}`);
    const userInfo: UserInfo = ret.data;

    return userInfo;
  }

  @APIWithToken()
  static async getUserByName(name: string): Promise<UserInfo> {
    const ret = await axiosAPI.auth().get(`/user/${name}`);
    const userInfo: UserInfo = ret.data;

    return userInfo;
  }

  @APIWithToken()
  static async getFriendsList(): Promise<UserInfo[]> {
    const ret = await axiosAPI.auth().get(`/friends`);
    const friendsList: UserInfo[] = ret.data;

    return friendsList;
  }

  @APIWithToken()
  static async getBlocksList(): Promise<UserInfo[]> {
    const ret = await axiosAPI.auth().get(`/Blocks`);
    const BlocksList: UserInfo[] = ret.data;

    return BlocksList;
  }
}
