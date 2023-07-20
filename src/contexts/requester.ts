import { useLoginStore } from '@/stores/login.store';
import jwtDecode from 'jwt-decode';

export const requester = (callback: () => void) => {
  const loginStore = useLoginStore();
  const now = new Date().getTime();
  const accessTokenPayload: { exp: number } = jwtDecode(loginStore.accessToken);

  if (now > accessTokenPayload?.exp) {
    try {
      requestAccessToken();
      // ... set accessToken...
    } catch (e) {
      loginStore.resetAll();
      console.log('requestAccessToken error... do something...');
    }
    return;
  }
  try {
    callback();
  } catch (e) {
    console.log('requester error... do someting...');
  }
};

export const requestAccessToken = () => {
  const isSuccess = true; // for test
  const loginStore = useLoginStore();
  const now = new Date().getTime();
  const refreshTokenPayload: { exp: number } = jwtDecode(loginStore.refreshToken);

  if (now > refreshTokenPayload?.exp) {
    loginStore.resetAll();
    return;
  }

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!isSuccess) {
        reject('error');
      }
      resolve({
        accessToken: '',
      });
    }, 3000);
  });
};
