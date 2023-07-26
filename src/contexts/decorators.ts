import { loginStore } from '@/main';
import jwtDecode from 'jwt-decode';

/*
 *
 * class {
 *    @RequestWithoutToken()
 *    function () {
 *      try {
 *        axios request
 *      } catch (e) {
 *        do something
 *      }
 *    }
 * }
 *
 */
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

/*
 *
 * class {
 *    @RequestWithToken()
 *    function () {
 *      try {
 *        axios request
 *      } catch (e) {
 *        do something
 *      }
 *    }
 * }
 *
 */
export function APIWithToken() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const fn = descriptor.value;
    descriptor.value = async function (...args: any) {
      if (!loginStore.isLogin) {
        throw '로그인이 필요한 요청입니다.';
      }
      if (isExpiredToken(loginStore.accessToken)) {
        const res = await requestAccessToken();
        loginStore.accessToken = res.accessToken;
      }
      try {
        return fn.apply(target, args);
      } catch (e) {
        throw `요청 에러: ${e}`;
      }
    };
  };
}

const requestAccessToken = () => {
  if (isExpiredToken(loginStore.refreshToken)) {
    loginStore.resetAll();
    throw '토큰이 만료되었습니다. 다시 로그인해주세요.';
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJuYW1lX3Rva2VuIiwicm9sZSI6IjMwZGF5IiwiaWF0IjoxNjkwMjQ1MTExLCJleHAiOjE2OTI4MzcxMTF9.9YvAdge0M4GTPX0zlCNLarF6_-_y71xYwTepnvTjwp0',
      });
    }, 3000);
  });
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
