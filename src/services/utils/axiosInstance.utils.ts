import axios from 'axios';
import Cookies from 'js-cookie';

const endpoint = 'http://localhost:3000';

class Axios {
  auth() {
    return tokenInstance;
  }

  noAuth() {
    return instance;
  }
}

const tokenInstance = axios.create({
  baseURL: endpoint,
  headers: { Authorization: 'Bearer ' + Cookies.get('access-token') },
});

const instance = axios.create({
  baseURL: endpoint,
});

export const axiosAPI = new Axios();
