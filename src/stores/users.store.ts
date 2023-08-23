import { defineStore } from 'pinia';
import type { OthersInfo } from '@/interfaces/FriendsInfo.interface';

interface UsersState {
  friends: OthersInfo[];
  blocks: OthersInfo[];
  selectedUserId: number;
}

export const useUsersSotre = defineStore('users', {
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
  },
});
