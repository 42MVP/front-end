import { defineStore } from 'pinia';
import type { OthersInfo } from '@/interfaces/FriendsInfo.interface';

interface UsersState {
  friends: OthersInfo[];
  blocks: OthersInfo[];
  selectedUserId: number;
}

export const useUsersStore = defineStore('users', {
  state: (): UsersState => ({
    friends: [],
    blocks: [],
    selectedUserId: -1,
  }),
  getters: {},
  actions: {
    addFriends(user: OthersInfo) {
      this.friends.push(user);
    },
    addBlocks(user: OthersInfo) {
      this.blocks.push(user);
    },
    deleteFriends(id: number) {
      this.friends.filter(user => user.id !== id);
    },
    deleteBlocks(id: number) {
      this.blocks.filter(user => user.id !== id);
    },

    //unfollow, unblock이 있으니까 delete action 도 추가해두기
  },
});
