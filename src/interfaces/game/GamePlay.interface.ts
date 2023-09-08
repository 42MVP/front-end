export interface GameInfo {
  background: string;
  leftScore: number;
  rightScore: number;
  tableInfo: GameTable;
}

export interface GameTable {
  background: string;
  leftPaddle: Paddle;
  rightPaddle: Paddle;
  ball: Ball;
}

export interface Paddle {
  width: number;
  height: number;
  x: number;
  y: number;
}

export interface Ball {
  x: number;
  y: number;
  dx: number;
  dy: number;
}
