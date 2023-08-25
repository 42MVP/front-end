import axios, { type AxiosError, type AxiosResponse, type AxiosRequestConfig } from 'axios';

const endpoint = 'http://localhost:3000';

interface ErrorResponseData {
  message: string;
  error: string;
  statusCode: number;
}

class Axios {
  auth() {
    const tokenInstance = axios.create({
      baseURL: endpoint,
      headers: { Authorization: 'Bearer ' + localStorage.getItem('access-token') },
      withCredentials: true,
      validateStatus: status => {
        return 200 <= status && status < 400;
      },
    });

    const onFulfilled = (response: AxiosResponse) => {
      return response;
    };
    const retry = (errorConfig: AxiosRequestConfig) => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(tokenInstance.request(errorConfig));
        }, 5000);
      });
    };

    const onRejected = async (error: AxiosError) => {
      const data: ErrorResponseData = error.response?.data as ErrorResponseData;
      if (data) {
        if (data.message.includes('JWT Access Token 인증 에러')) {
          await axiosAPI.noAuth().post(
            '/auth/reissue',
            {},
            {
              withCredentials: true,
            },
          );
          if (error.config) {
            return retry(error.config);
          }
        }
      }

      return Promise.reject(error);
    };

    tokenInstance.interceptors.response.use(onFulfilled, onRejected);

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
