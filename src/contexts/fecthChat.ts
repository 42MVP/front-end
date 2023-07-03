export function getChatInfos() {
  return [
    {
      isChannel: true,
      name: '42mvp',
      alertCount: 42,
      hasPassword: true,
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
          userAvatarURL: '',
          message: '이거봐봐 어때?',
          date: new Date(),
        },
        {
          id: 2,
          username: 'hyeognki',
          userAvatarURL: '',
          message: '오 대단한걸?',
          date: new Date(),
        },
      ],
    },
    {
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
      chats: [
        {
          id: 1,
          username: 'iphone',
          userAvatarURL: '',
          message: '아이폰이 최고야',
          date: new Date(),
        },
        {
          id: 2,
          username: 'galaxy',
          userAvatarURL: '',
          message: '아닌데?',
          date: new Date(),
        },
      ],
    },
  ];
}

export function getFriend() {
  return [
    {
      id: 1,
      name: 'daram',
      avatarURL: '',
      clickEvent: 'friendclick',
    },
    {
      id: 2,
      name: 'goyang',
      avatarURL: '',
      clickEvent: 'friendclick',
    },
  ];
}
