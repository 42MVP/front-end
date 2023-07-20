interface IFetchLoginURL {
  loginURL: string;
}

export const fetchLoginURL = (): Promise<IFetchLoginURL> => {
  console.log('fecthing.....');
  return new Promise((resolve, reject) => {
    setTimeout(
      () =>
        resolve({
          loginURL: '',
        }),
      1000,
    );
  });
};

export const fecthUserInfo = (code: string) => {
  const isSuccess = true;
  console.log(`code is "${code}"`);
  console.log('fecthing.....');
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!isSuccess) {
        reject('error');
      }
      resolve({
        id: 1,
        name: 'kanghyki',
        avatarURL: '',
        refreshToken: '',
        accessToken: '',
      });
    }, 3000);
  });
};
