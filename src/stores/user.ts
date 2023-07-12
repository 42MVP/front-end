import type { IUser } from '@/interfaces/User.interface';
import { reactive } from 'vue';

export const userStore = reactive({
  token: '',
  user: {
    id: -1,
    name: 'kanghyki',
    avatarURL: '',
  } as IUser,
  setUser(user: IUser) {
    this.user = user;
  },
  setToken(token: string) {
    this.token = token;
  },
  resetUser() {
    this.user = {
      id: -1,
      name: '',
      avatarURL: '',
    };
    this.token = '';
  },
});
