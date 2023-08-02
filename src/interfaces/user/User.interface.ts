export interface User {
  id: number;
  name: string;
  avatarURL: string;
  role?: string;
  abongTime?: Date | null;
}
