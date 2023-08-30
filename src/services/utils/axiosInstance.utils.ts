import axios from 'axios';
import Cookies from 'js-cookie';

const endpoint = 'http://localhost:3000';

class Axios {
  auth() {
    const tokenInstance = axios.create({
      baseURL: endpoint,
      headers: { Authorization: 'Bearer ' + Cookies.get('access-token') },
    });
    return tokenInstance;
  }

  twoFaAuth(token: String) {
    const tokenInstance = axios.create({
      baseURL: endpoint,
      headers: { Authorization: 'Bearer ' + token },
    });
    return tokenInstance;
  }

  noAuth() {
    return instance;
  }
}

const instance = axios.create({
  baseURL: endpoint,
});

export const axiosAPI = new Axios();
