import { API } from '@/contexts/decorators';

export class Login {
  @API()
  static fetchLoginURL(): Promise<{ loginURL: string }> {
    return new Promise((resolve, reject) => {
      setTimeout(
        () =>
          resolve({
            loginURL: 'http://localhost:5173/signin/oauth',
          }),
        1000,
      );
    });
  }

  @API()
  static fecthUserInfo(code: string) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          isFirstLogin: true,
          id: 1,
          name: 'kanghyki',
          avatarURL: '',
          refreshToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJuYW1lX3Rva2VuIiwicm9sZSI6IjM2NWRheSIsImlhdCI6MTY5MDI0NTExMSwiZXhwIjoxNzIxNzgxMTExfQ.uq9q-cmxWFNvzaqLJkok6P8IGp_Ffk0wlkhV3TVvv28',
          accessToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJuYW1lX3Rva2VuIiwicm9sZSI6IjBkYXkiLCJpYXQiOjE2OTAyNDUxMTEsImV4cCI6MTY5MDI0NTExMX0.iOEBJcIF5jhgWfaNTq8bxKm7WIfWOyuwA9TL2inZVsE',
        });
      }, 1000);
    });
  }
}
