import axios, {
  type AxiosInstance,
  type AxiosError,
  type AxiosResponse,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
  isAxiosError,
} from 'axios';

const endpoint = 'http://localhost:3000';

interface ErrorResponseData {
  message: string;
  error: string;
  statusCode: number;
}

const axiosInstance = (): AxiosInstance => {
  const axiosInstance = axios.create({
    baseURL: endpoint,
    timeout: 10000,
    validateStatus: status => {
      return 200 <= status && status < 400;
    },
  });
  const onFulfilledReq = (config: AxiosRequestConfig): InternalAxiosRequestConfig => {
    if (!config.url?.includes('auth')) {
      const accessToken = localStorage.getItem('access-token');
      if (accessToken) {
        if (!config.headers) {
          config.headers = {};
        }
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config as InternalAxiosRequestConfig;
  };
  const onRejectedReq = (error: AxiosError) => {
    return Promise.reject(error);
  };
  const onFulfilledRes = (response: AxiosResponse) => {
    return response;
  };

  const retry = async <T>(errorConfig: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    const { headers, ...retryConfig } = errorConfig;
    headers;
    return await axiosRequest<T>(retryConfig);
  };

  const onRejectedRes = async (error: AxiosError) => {
    const data: ErrorResponseData = error.response?.data as ErrorResponseData;
    if (data) {
      // NOTE : if (data.message.includes('JWT Access Token 인증 에러')) {
      if (data.message.includes('JWT')) {
        const response = await axios.get(`${endpoint}/auth/reissue`, {
          withCredentials: true,
        });
        localStorage.setItem('access-token', response.data);
        if (error.config) {
          return await retry(error.config);
        }
      }
    }

    return Promise.reject(error);
  };

  axiosInstance.interceptors.request.use(onFulfilledReq, onRejectedReq);
  axiosInstance.interceptors.response.use(onFulfilledRes, onRejectedRes);
  return axiosInstance;
};

interface ApiResponse<T> {
  data: T;
}

export async function axiosRequest<ResType>(config: AxiosRequestConfig): Promise<ApiResponse<ResType>> {
  try {
    const response: AxiosResponse<ResType> = await axiosInstance().request<ResType>(config);
    return { data: response.data };
  } catch (error) {
    if (isAxiosError(error)) {
      alert(error.message);
      throw error.message;
    }
    throw error;
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
