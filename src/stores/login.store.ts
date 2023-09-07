import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import { GameService } from '@/services/game.service';
import { LoginService } from '@/services/login.service';
import { ChatSocketService } from '@/services/chatSocket.service';
import type { User } from '@/interfaces/user/User.interface';
import type { LoginInfo } from '@/interfaces/login/login.interface';

const router = useRouter();

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
    async login() {
      const loginInfo = await LoginService.getUserInfo();
      this.setLogin(loginInfo);
      window.location.href = '/';
    //  window.history.replaceState('', '', '/');
    },
    async logout() {
      await LoginService.logout();
      this.resetAll();
      window.location.href = '/';
    },
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
      this.id = user.id;
      this.name = user.name;
      this.avatarURL = user.avatarURL;
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
