import { APIWithToken } from '@/services/utils/apiDecorator.utils';
import { axiosAPI } from '@/services/utils/axiosInstance.utils';
import type { ChatInfo } from '@/interfaces/chat/ChatInfo.interface';
import type { User } from '@/interfaces/user/User.interface';

export class ChatService {
  @APIWithToken()
  static async createRoom() {
    console.log(
      await axiosAPI.auth().post('/chat/create-room', {
        userId: 1,
        roomName: '첫 채팅방이에유',
        roomMode: 'PUBLIC',
      }),
    );
  }

  @APIWithToken()
  static async getChatInfos(): Promise<ChatInfo[]> {
    console.log(await axiosAPI.auth().get('/chat/kanghyki', {}));
    return new Promise((resolve, reject) => {
      setTimeout(
        () =>
          resolve([
            {
              id: 1,
              isChannel: true,
              name: '42mvp',
              alertCount: 42,
              roomMode: 'PROTECTED',
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
              roomMode: 'PUBLIC',
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
