<template>
  <div class="gameContainer">
    <div class="scoreText">{{ player1Score }} : {{ player2Score }}</div>
    <canvas class="gameBoard" ref="gameBoard" width="1500" height="800"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watchEffect } from 'vue';
import { GameSocketService } from '@/services/gameSocket.service';
import type { GameTable, Paddle, Ball } from '@/interfaces/game/GamePlay.interface';

const gameBoard = ref<null | HTMLCanvasElement>(null);
const ctx = ref<null | CanvasRenderingContext2D>(null);

const player1Score = ref<number>(GameSocketService.leftScore);
const player2Score = ref<number>(GameSocketService.rightScore);

const gameSettings = {
  gameWidth: 1500,
  gameHeight: 800,
  boardBackground: GameSocketService.backGround,
  paddle1Color: 'lightblue',
  paddle2Color: 'red',
  paddleBorder: 'black',
  ballColor: 'yellow',
  ballBorderColor: 'black',
  ballRadius: 12.5,
  paddleSpeed: 50,
};

const {
  gameWidth,
  gameHeight,
  boardBackground,
  paddle1Color,
  paddle2Color,
  paddleBorder,
  ballColor,
  ballBorderColor,
  ballRadius,
} = gameSettings;

const table = ref<GameTable>(GameSocketService.tableInfo);

watchEffect(() => {
  const tableInfo = table.value;
  clearBoard();
  drawBall(tableInfo.ball);
  drawPaddles(tableInfo.leftPaddle, tableInfo.rightPaddle);
});

const drawBall = (ball: Ball) => {
  if (!ctx.value) return;
  ctx.value.fillStyle = ballColor;
  ctx.value.strokeStyle = ballBorderColor;
  ctx.value.lineWidth = 2;
  ctx.value.beginPath();
  ctx.value.arc(ball.x, ball.y, ballRadius, 0, 2 * Math.PI);
  ctx.value.stroke();
  ctx.value.fill();
};

const drawPaddles = (paddle1: Paddle, paddle2: Paddle) => {
  if (!ctx.value) return;
  ctx.value.strokeStyle = paddleBorder;

  ctx.value.fillStyle = paddle1Color;
  ctx.value.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
  ctx.value.strokeRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);

  ctx.value.fillStyle = paddle2Color;
  ctx.value.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
  ctx.value.strokeRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
};

const clearBoard = () => {
  if (!ctx.value) return;
  ctx.value.fillStyle = boardBackground;
  ctx.value.fillRect(0, 0, gameWidth, gameHeight);
};

onMounted(() => {
  GameSocketService.onPlay();
  if (gameBoard.value) {
    ctx.value = gameBoard.value.getContext('2d');
  }
});

onBeforeUnmount(() => {
  GameSocketService.offPlay();
});
</script>

<style scoped>
.gameContainer {
  text-align: center;
}

.scoreText {
  font-family: 'consolas', monospace;
  font-size: 100px;
}

.gameBoard {
  border: 3px solid;
}
</style>
