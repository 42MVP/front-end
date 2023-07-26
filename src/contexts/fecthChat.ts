import { APIWithToken } from '@/contexts/decorators';
import type { ChatInfo } from '@/interfaces/ChatInfo.interface';
import type { User } from '@/interfaces/User.interface';

export class ChatFetcher {
  @APIWithToken()
  static getChatInfos(): Promise<ChatInfo[]> {
    return new Promise((resolve, reject) => {
      setTimeout(
        () =>
          resolve([
            {
              id: 1,
              isChannel: true,
              name: '42mvp',
              alertCount: 42,
              hasPassword: true,
              avatarURL: '',
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
          ]),
        1000,
      );
    });
  }

  @APIWithToken()
  static getFriend(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([
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
        ]);
      }, 1000);
    });
  }
}
