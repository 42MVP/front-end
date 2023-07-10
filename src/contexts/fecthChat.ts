import type { IChatInfo } from '@/interfaces/ChatInfo.interface';
import type { IUser } from '@/interfaces/User.interface';

export function getChatInfos(): IChatInfo[] {
  return [
    {
      id: 1,
      isChannel: true,
      name: '42mvp',
      alertCount: 42,
      hasPassword: true,
      avatarURL: 'https://www.collinsdictionary.com/images/full/circle_374974330.jpg',
      users: [
        {
          id: 1,
          name: 'kanghyki',
          avatarURL: '',
        },
        {
          id: 2,
          name: 'hyeongki',
          avatarURL: '',
        },
      ],
      banUsers: [
        {
          id: 3,
          name: 'badguy',
          avatarURL: '',
        },
        {
          id: 4,
          name: 'whoami',
          avatarURL: '',
        },
      ],
      chats: [
        {
          id: 1,
          username: 'kanghyki',
          avatarURL: '',
          message: '이거봐봐 어때?',
          date: new Date(),
        },
        {
          id: 2,
          username: 'hyeognki',
          avatarURL: '',
          message: '오 대단한걸?',
          date: new Date(),
        },
      ],
    },
    {
      id: 2,
      isChannel: false,
      name: 'kanghyki',
      avatarURL: '',
      hasPassword: false,
      alertCount: 12,
      users: [
        {
          id: 1,
          name: 'kanghyki',
          avatarURL: '',
        },
        {
          id: 2,
          name: 'hyeongki',
          avatarURL: '',
        },
      ],
      banUsers: [],
      chats: [
        {
          id: 1,
          username: 'iphone',
          avatarURL: '',
          message: '아이폰이 최고야',
          date: new Date(),
        },
        {
          id: 2,
          username: 'galaxy',
          avatarURL: '',
          message: '아닌데?',
          date: new Date(),
        },
      ],
    },
  ];
}

export function getFriend(): IUser[] {
  return [
    {
      id: 1,
      name: 'daram',
      avatarURL: '',
    },
    {
      id: 2,
      name: 'goyang',
      avatarURL: '',
    },
  ];
}
