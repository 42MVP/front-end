import { API, APIWithToken } from '@/services/utils/apiDecorator.utils';
import { axiosAPI } from '@/services/utils/axiosInstance.utils';
import type { User } from '@/interfaces/user/User.interface';
import type { UserInfo } from '@/interfaces/user/UserInfo.interface';
import type { OthersInfo } from '@/interfaces/FriendsInfo.interface';
import { useUsersStore } from '@/stores/users.store';
import { useRoute } from 'vue-router';

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
    userStore.
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

  static async getUserProfile(name: string): Promise<UserInfo> {
    const ret = await axiosAPI.auth().get(`/user/name/${name}`);
    const userInfo: UserInfo = ret.data;
    return userInfo;
  }

  @APIWithToken()
  static async getFriendsList(): Promise<OthersInfo[]> {
    const ret = await axiosAPI.auth().get(`/friend`);
    const friendsList: OthersInfo[] = ret.data;

    return friendsList;
  }

  @APIWithToken()
  static async followUser(user: OthersInfo): Promise<void> {
    await axiosAPI.auth().post(`/friend/${user.id}`);
    useUsersStore().addFriends(user);
  }

  @APIWithToken()
  static async unfollowUser(userId: number): Promise<void> {
    await axiosAPI.auth().delete(`/friend/${userId}`);
    useUsersStore().friends.filter(u => u.id !== userId);
  }

  @APIWithToken()
  static async getBlocksList(): Promise<OthersInfo[]> {
    const ret = await axiosAPI.auth().get(`/block`);
    const BlocksList: OthersInfo[] = ret.data;

    return BlocksList;
  }

  @APIWithToken()
  static async blockUser(user: OthersInfo): Promise<void> {
    await axiosAPI.auth().post(`/block/${user.id}`);
    useUsersStore().addBlocks(user);
  }

  @APIWithToken()
  static async unblockUser(userId: number): Promise<void> {
    await axiosAPI.auth().delete(`/block/${userId}`);
    useUsersStore().blocks.filter(u => u.id !== userId);
  }


  static async setUserProfile(formData: FormData): Promise<void> {
    const ret = await axiosAPI.auth().put(`/user`, formData);
  }
}
