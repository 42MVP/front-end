import { defineStore } from 'pinia';
import type { User } from '@/interfaces/user/User.interface';

export const useLoginStore = defineStore('login', {
  state: () => ({
    isLogin: false,
    id: -1,
    name: '',
    avatarURL: '',
  }),
  getters: {
    owner(): User {
      return {
        id: this.id,
        name: this.name,
        avatarURL: this.avatarURL,
        role: 'OWNER',
        abongTime: new Date(0),
      };
    },
  },
  actions: {
    resetAll() {
      this.isLogin = false;
      this.id = -1;
      this.name = '';
      this.avatarURL = '';
    },
  },
  persist: true,
});
