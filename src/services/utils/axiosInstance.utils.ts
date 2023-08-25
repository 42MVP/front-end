import axios from 'axios';

const endpoint = 'http://localhost:3000';

class Axios {
  auth() {
    const tokenInstance = axios.create({
      baseURL: endpoint,
      headers: { Authorization: 'Bearer ' + localStorage.getItem('access-token') },
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
