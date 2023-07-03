import { reactive } from 'vue';

interface IUser {
  userID: number;
  name: string;
  token: string;
  avatarURL: string;
}

export const userStore = reactive({
  user: {
    userID: -1,
    name: 'kanghyki',
    avatarURL: '',
    token: '',
  } as IUser,
  setUser(user: IUser) {
    this.user = user;
  },
  setToken(token: string) {
    this.user.token = token;
  },
  resetUser() {
    this.user = {
      userID: -1,
      name: '',
      token: '',
    };
  },
});
