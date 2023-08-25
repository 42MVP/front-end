import { axiosAPI } from '@/services/utils/axiosInstance.utils';
import type { User } from '@/interfaces/user/User.interface';
import type { UserInfo } from '@/interfaces/user/UserInfo.interface';
import type { OthersInfo } from '@/interfaces/FriendsInfo.interface';
import { useRoute } from 'vue-router';

export class UserService {
  static async getAllUser(): Promise<User> {
    const ret = await axiosAPI.auth().get('/user');
    return ret.data;
  }

  // TODO: TYPE
  static async getUserById(id: number): Promise<UserInfo> {
    const ret = await axiosAPI.auth().get(`/user/${id}`);
    const userInfo: UserInfo = ret.data;

    return userInfo;
  }

  static async getUserByName(name: string): Promise<UserInfo> {
    const ret = await axiosAPI.auth().get(`/user/${name}`);
    const userInfo: UserInfo = ret.data;
    return userInfo;
  }

  static async getUserProfile(name: string): Promise<UserInfo> {
    const ret = await axiosAPI.auth().get(`/user/name/${name}`);
    const userInfo: UserInfo = ret.data;
    return userInfo;
  }

  static async getFriendsList(): Promise<OthersInfo[]> {
    const ret = await axiosAPI.auth().get(`/friend`);
    const friendsList: OthersInfo[] = ret.data;

    return friendsList;
  }

  static async followUser(userId: number): Promise<void> {
    console.log(userId);
    console.log('follow');
    await axiosAPI.auth().post(`/friend/${userId}`);
  }

  static async unfollowUser(userId: number): Promise<void> {
    await axiosAPI.auth().delete(`/friend/${userId}`);
  }

  static async getBlocksList(): Promise<OthersInfo[]> {
    const ret = await axiosAPI.auth().get(`/block`);
    const BlocksList: OthersInfo[] = ret.data;

    return BlocksList;
  }

  static async blockUser(userId: number): Promise<void> {
    await axiosAPI.auth().post(`/block/${userId}`);
  }

  static async unblockUser(userId: number): Promise<void> {
    await axiosAPI.auth().delete(`/block/${userId}`);
  }

  static async setUserProfile(formData: FormData): Promise<void> {
    const ret = await axiosAPI.auth().put(`/user`, formData);
  }
}
