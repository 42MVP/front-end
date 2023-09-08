import axios, { type AxiosInstance, type AxiosError, type AxiosResponse, type AxiosRequestConfig } from 'axios';
import { triggerApiError } from './apiError.utils';
import { endpoint } from '@/services/utils/config.utils';

const setRequestConfig = (config: AxiosRequestConfig) => {
  if (config.url?.includes('auth')) {
    if (config.url?.includes('login') || config.url?.includes('logout'))
      return setWithCredentials(setAuthorizationHeader(config));
    return setWithCredentials(config);
  }
  return setAuthorizationHeader(config);
};

const setWithCredentials = (config: AxiosRequestConfig) => {
  config.withCredentials = true;
  return config;
};

const setAuthorizationHeader = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const accessToken = localStorage.getItem('token');
  if (accessToken) {
    if (!config.headers) {
      config.headers = {};
    }
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
};

async function refreshToken(): Promise<void> {
  const data = await axiosGet('/auth/reissue');
  if (typeof data === 'string') localStorage.setItem('token', data);
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

  const retry = async <ResType>(errorConfig: AxiosRequestConfig): Promise<ApiResponse<ResType>> => {
    const retryConfig = setAuthorizationHeader(errorConfig);
    return await axios.request<ResType>(retryConfig);
  };

  const onRejectedRes = async <ResType>(error: AxiosError) => {
    const data = error.response?.data as AxiosError;
    if (data && !error.config?.url?.includes('auth') && !error.config?.url?.includes('logout')) {
      if (data.message.includes('JWT')) {
        await refreshToken();
        if (error.config) {
          return await retry<ResType>(error.config);
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
    const reqConfig = setRequestConfig(config);
    const instance = axiosInstance();
    const response: AxiosResponse<ResType> = await instance.request<ResType>(reqConfig);
    return { data: response.data };
  } catch (error) {
    throw triggerApiError(error);
  }
}

export async function axiosGet<ResType>(uri: string, params?: URLSearchParams | string): Promise<ResType> {
  return await axiosRequest<ResType>({
    method: 'GET',
    url: uri,
    params,
  }).then(({ data }) => data);
}
export async function axiosPatch<ResType, B>(uri: string, reqData?: B): Promise<ResType> {
  return await axiosRequest<ResType>({
    method: 'PATCH',
    url: uri,
    data: reqData,
  }).then(({ data }) => data);
}

export async function axiosPost<ResType, B>(uri: string, reqData?: B): Promise<ResType> {
  return await axiosRequest<ResType>({
    method: 'POST',
    url: uri,
    data: reqData,
  }).then(({ data }) => data);
}

export async function axiosPut<ResType = void, B = any>(uri: string, reqData?: B): Promise<ResType> {
  return await axiosRequest<ResType>({
    method: 'PUT',
    url: uri,
    data: reqData,
  }).then(({ data }) => data);
}

export async function axiosDelete<ResType = void, B = any>(uri: string, param?: string, reqData?: B): Promise<ResType> {
  return await axiosRequest<ResType>({
    method: 'DELETE',
    url: param ? `${uri}/${param}` : uri,
    data: reqData,
  }).then(({ data }) => data);
}
