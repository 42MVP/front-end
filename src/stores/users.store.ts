import { defineStore } from 'pinia';
import type { OthersInfo } from '@/interfaces/FriendsInfo.interface';

interface UsersState {
  friends: { [id: number]: OthersInfo };
  blocks: { [id: number]: OthersInfo };
  selectedUserName: string;
}

export const useUsersSotre = defineStore('users', {
  state: (): UsersState => ({
    friends: [],
    blocks: [],
    selectedUserName: '',
  }),
  getters: {},
  actions: {
    addFriends() {},
    addBlocks() {},
  },
});
