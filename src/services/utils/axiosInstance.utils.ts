import axios, { type AxiosInstance, type AxiosError, type AxiosResponse, type AxiosRequestConfig } from 'axios';
import { triggerApiError } from './apiError.utils';
import { endpoint } from '@/services/utils/config.utils';

const setAuthorizationHeader = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const accessToken = localStorage.getItem('access-token');
  if (accessToken) {
    if (!config.headers) {
      config.headers = {};
    }
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
};

async function refreshToken(): Promise<void> {
  await axios
    .get(`${endpoint}/auth/reissue`, {
      withCredentials: true,
    })
    .then(({ data }) => {
      localStorage.setItem('access-token', data);
    })
    .catch(error => {
      // TODO await axios.get(`${endpoint}/auth/logout`, {
      //   withCredentials: true,
      // });
      triggerApiError(error);
    });
}

const axiosInstance = (): AxiosInstance => {
  const axiosInstance = axios.create({
    baseURL: endpoint,
    timeout: 10000,
    validateStatus: status => {
      return 200 <= status && status < 400;
    },
  });

  const onFulfilledRes = (response: AxiosResponse) => {
    return response;
  };

  const retry = async <ResType>(errorConfig: AxiosRequestConfig): Promise<ResType> => {
    const retryConfig = setAuthorizationHeader(errorConfig);
    return (await axios.request<ResType>(retryConfig)).data;
  };

  const onRejectedRes = async (error: AxiosError) => {
    const data = error.response?.data as AxiosError;
    if (data) {
      if (data.message.includes('JWT')) {
        await refreshToken();
        if (error.config) {
          return await retry(error.config);
        }
      }
    }

    return Promise.reject(error);
  };

  axiosInstance.interceptors.response.use(onFulfilledRes, onRejectedRes);
  return axiosInstance;
};

interface ApiResponse<T> {
  data: T;
}

export async function axiosRequest<ResType>(config: AxiosRequestConfig): Promise<ApiResponse<ResType>> {
  try {
    const isAuth = config.url?.includes('auth');
    const instance = axiosInstance();
    const reqConfig = isAuth ? config : setAuthorizationHeader(config);
    const response: AxiosResponse<ResType> = await instance.request<ResType>(reqConfig);
    return { data: response.data };
  } catch (error) {
    throw triggerApiError(error);
  }
}

export async function axiosGet<ResType>(uri: string, params?: URLSearchParams | string): Promise<ResType> {
  return axiosRequest<ResType>({
    method: 'GET',
    url: uri,
    params,
  }).then(({ data }) => data);
}

export async function axiosPatch<ResType, B>(uri: string, reqData?: B): Promise<ResType> {
  return axiosRequest<ResType>({
    method: 'PATCH',
    url: uri,
    data: reqData,
  }).then(({ data }) => data);
}

export async function axiosPost<ResType, B>(uri: string, reqData?: B): Promise<ResType> {
  return axiosRequest<ResType>({
    method: 'POST',
    url: uri,
    data: reqData,
  }).then(({ data }) => data);
}

export async function axiosPut<ResType = void, B = any>(uri: string, reqData?: B): Promise<ResType> {
  return axiosRequest<ResType>({
    method: 'PUT',
    url: uri,
    data: reqData,
  }).then(({ data }) => data);
}

export async function axiosDelete<ResType = void, B = any>(uri: string, param?: string, reqData?: B): Promise<ResType> {
  return axiosRequest<ResType>({
    method: 'DELETE',
    url: param ? `${uri}/${param}` : uri,
    data: reqData,
  }).then(({ data }) => data);
}
