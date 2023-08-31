import { defineStore } from 'pinia';
import type { User } from '@/interfaces/user/User.interface';
import type { LoginInfo } from '@/interfaces/login/login.interface';

interface LoginState {
  isLogin: boolean;
  id: number;
  name: string;
  avatarURL: string;
  isAuth: boolean;
  email: string;
}

export const useLoginStore = defineStore('login', {
  state: (): LoginState => ({
    isLogin: false,
    id: -1,
    name: '',
    avatarURL: '',
    isAuth: false,
    email: '',
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
      this.isAuth = false;
      this.email = '';
    },
    setLogin(user: LoginInfo) {
      this.isLogin = true;
      this.name = user.name;
      this.avatarURL = user.avatarURL || import.meta.env.VITE_APP_DEFAULT_AVATAR_URL;
      this.email = user.email;
      this.isAuth = user.isAuth;
    },
    updateLoginInfo(user: LoginInfo) {
      this.name = user.name;
      this.avatarURL = user.avatarURL;
      this.isAuth = user.isAuth;
    },
  },
  persist: true,
});
