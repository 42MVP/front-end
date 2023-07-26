import { defineStore } from 'pinia';

export const useLoginStore = defineStore('login', {
  state: () => ({
    isLogin: false,
    id: -1,
    name: '',
    avatarURL: '',
  }),
  getters: {},
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
