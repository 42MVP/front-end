import { axiosDelete, axiosGet, axiosPost, axiosPut } from '@/services/utils/axiosInstance.utils';
import type { User } from '@/interfaces/user/User.interface';
import type { UserInfo } from '@/interfaces/user/UserInfo.interface';
import type { OthersInfo } from '@/interfaces/FriendsInfo.interface';
import { usersStore } from '@/main';

export class UserService {
  static async getAllUser(): Promise<User[]> {
    const users: User[] = await axiosGet('/user');
    return users;
  }

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

  static async followUser(user: OthersInfo): Promise<void> {
    await axiosPost(`/friend/${user.id}`);
    usersStore.addFriends(user);
  }

  static async unfollowUser(userId: number): Promise<void> {
    await axiosDelete(`/friend/${userId}`);
    usersStore.deleteFriends(userId);
  }

  static async getBlocksList(): Promise<OthersInfo[]> {
    const BlocksList: OthersInfo[] = await axiosGet(`/block`);
    return BlocksList;
  }

  static async blockUser(user: OthersInfo): Promise<void> {
    await axiosPost(`/block/${user.id}`);
    usersStore.addBlocks(user);
  }

  static async unblockUser(userId: number): Promise<void> {
    await axiosDelete(`/block/${userId}`);
    usersStore.deleteBlocks(userId);
  }

  static async setUserProfile(formData: FormData): Promise<void> {
    await axiosPut(`/user`, formData);
  }
}
