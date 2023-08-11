import { loginStore } from '@/main';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import { axiosAPI } from './axiosInstance.utils';

export function API() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const fn = descriptor.value;
    descriptor.value = async function (...args: any) {
      try {
        return fn.apply(target, args);
      } catch (e) {
        throw `요청 에러: ${e}`;
      }
    };
  };
}

export function APIWithToken() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const fn = descriptor.value;
    descriptor.value = async function (...args: any) {
      const accessToken = Cookies.get('access-token');
      if (isExpiredToken(accessToken)) {
        await getNewAccessToken();
      }
      try {
        return await fn.apply(target, args);
      } catch (e) {
        throw `요청 에러: ${e}`;
      }
    };
  };
}

const getNewAccessToken = async (): Promise<void> => {
  const refreshToken = Cookies.get('refresh-token');
  if (isExpiredToken(refreshToken)) {
    Cookies.remove('access-token');
    Cookies.remove('refresh-token');
    loginStore.resetAll();
    throw '토큰이 만료되었습니다. 다시 로그인해주세요.';
  }
  try {
    await axiosAPI.noAuth().post(
      '/auth/reissue',
      {},
      {
        headers: {
          Authorization: 'Bearer ' + Cookies.get('refresh-token'),
        },
        withCredentials: true,
      },
    );
  } catch (e) {
    Cookies.remove('access-token');
    Cookies.remove('refresh-token');
    loginStore.resetAll();
    throw `요청 에러: ${e}`;
  }
};

const isExpiredToken = (token: string) => {
  try {
    const now = new Date().getTime() / 1000;
    const tokenPayload: { exp: number } = jwtDecode(token);
    if (now > tokenPayload?.exp) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return true;
  }
};

export const getUserID = () => {
  const accessToken = Cookies.get('access-token');
  try {
    const tokenPayload: { exp: number } = jwtDecode(accessToken);
    return tokenPayload.sub;
  } catch (e) {}
};
