import { axiosDelete, axiosGet, axiosPost, axiosPut } from '@/services/utils/axiosInstance.utils';
import type { User } from '@/interfaces/user/User.interface';
import type { UserInfo } from '@/interfaces/user/UserInfo.interface';
import type { OthersInfo } from '@/interfaces/FriendsInfo.interface';
import { useRoute } from 'vue-router';

export class UserService {
  static async getAllUser(): Promise<User> {
    const user: User = await axiosGet('/user');
    return user;
  }

  // TODO: TYPE
  static async getUserById(id: number): Promise<UserInfo> {
    const userInfo: UserInfo = await axiosGet(`/user/${id}`);
    return userInfo;
  }

  static async getUserByName(name: string): Promise<UserInfo> {
    const userInfo: UserInfo = await axiosGet(`/user/${name}`);
    return userInfo;
  }

  static async getUserProfile(name: string): Promise<UserInfo> {
    const userInfo: UserInfo = await axiosGet(`/user/name/${name}`);
    return userInfo;
  }

  static async getFriendsList(): Promise<OthersInfo[]> {
    const friendsList: OthersInfo[] = await axiosGet(`/friend`);
    return friendsList;
  }

  static async followUser(userId: number): Promise<void> {
    console.log(userId);
    console.log('follow');
    await axiosPost(`/friend/${userId}`);
  }

  static async unfollowUser(userId: number): Promise<void> {
    await axiosDelete(`/friend/${userId}`);
  }

  static async getBlocksList(): Promise<OthersInfo[]> {
    const BlocksList: OthersInfo[] = await axiosGet(`/block`);
    return BlocksList;
  }

  static async blockUser(userId: number): Promise<void> {
    await axiosPost(`/block/${userId}`);
  }

  static async unblockUser(userId: number): Promise<void> {
    await axiosDelete(`/block/${userId}`);
  }

  static async setUserProfile(formData: FormData): Promise<void> {
    await axiosPut(`/user`, formData);
  }
}
