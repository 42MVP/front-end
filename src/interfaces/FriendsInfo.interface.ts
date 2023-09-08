export interface OthersInfo {
  state?: string;
  id: number;
  name: string;
  avatarURL: string;
  rate: number;
  loseNum: number;
  winNum: number;
}

export enum UserStateString {
  ONLINE = '온라인',
  OFFLINE = '오프라인',
  FIND_GAME = '게임 찾는중',
  IN_GAME = '게임중',
}
