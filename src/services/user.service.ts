import { API, APIWithToken } from '@/services/utils/apiDecorator.utils';
import { axiosAPI } from '@/services/utils/axiosInstance.utils';
import type { User } from '@/interfaces/user/User.interface';
import type { UserInfo } from '@/interfaces/user/UserInfo.interface';
import type { OthersInfo } from '@/interfaces/FriendsInfo.interface';

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
  static async getUserProfile(name: string): Promise<UserInfo> {
    const ret = await axiosAPI.auth().get(`/user/name/${name}`);
    const userInfo: UserInfo = ret.data;
    return userInfo;
  }

  @APIWithToken()
  static async getFriendsList(): Promise<OthersInfo[]> {
    const ret = await axiosAPI.auth().get(`/friend`);
    const friendsList: OthersInfo[] = ret.data;

    friendsList.push({
      id: 1,
      name: 'test',
      avatarURL: 'asdf',
      rate: 1234,
      achievements: [0, 1, 2],
      loseNum: 1,
      winNum: 3,
    });

    return friendsList;
  }

  @APIWithToken()
  static async unfollowUser(id: number): Promise<void> {
    // const ret = await axiosAPI.auth().post('/friend');
  }

  @APIWithToken()
  static async getBlocksList(): Promise<OthersInfo[]> {
    const ret = await axiosAPI.auth().get(`/block`);
    const BlocksList: OthersInfo[] = ret.data;

    return BlocksList;
  }

  @APIWithToken()
  static async unblockUser(id: number): Promise<void> {
    // const ret = await axiosAPI.auth().delete('/block');
  }

  static async setUserProfile(formData: FormData) {
    return axiosAPI.auth().put(`/user`, formData);
  }
}
