import type { GameHistory } from '@/interfaces/GameHistory.interface';
import type { UserInfo } from '@/interfaces/UserInfo.interface';

export const getGameHistory: Function = (): GameHistory[] => {
  return [
    {
      id: 1,
      winnerScore: 5,
      loserScore: 2,
      winner: 'chaejkim',
      loser: 'kanghyki',
      winnerAvatarUrl: 'https://ca.slack-edge.com/T039P7U66-U02LNN8QWJV-4c936417baf6-512',
      loserAvatarUrl: 'https://ca.slack-edge.com/T039P7U66-U02L3CLQ6S2-gadbfaa25482-512',
      createAt: '2023.6.24. 15:23:45',
    },
    {
      id: 2,
      winnerScore: 5,
      loserScore: 4,
      winner: 'hejang',
      loser: 'chaejkim',
      winnerAvatarUrl: 'https://ca.slack-edge.com/T039P7U66-U02LA4V3351-b8f6020a843c-512',
      loserAvatarUrl: 'https://ca.slack-edge.com/T039P7U66-U02LNN8QWJV-4c936417baf6-512',
      createAt: '2023.6.24. 15:10:04',
    },
    {
      id: 3,
      winnerScore: 5,
      loserScore: 2,
      winner: 'kanghyki',
      loser: 'chaejkim',
      winnerAvatarUrl: 'https://ca.slack-edge.com/T039P7U66-U02LNN8QWJV-4c936417baf6-512',
      loserAvatarUrl: 'https://ca.slack-edge.com/T039P7U66-U02LNN8QWJV-4c936417baf6-512',
      createAt: '2023.6.24. 15:10:04',
    },
  ];
};

export const getUserInfo: Function = (): UserInfo => {
  return {
    id: 1,
    name: 'chaejkim',
    avatarURL: 'https://ca.slack-edge.com/T039P7U66-U02LNN8QWJV-4c936417baf6-512',
    isFollow: false,
    isBlock: false,
    rate: 1000,
    achievement: [0, 1, 4],
    gameHistory: getGameHistory(),
  };
};
