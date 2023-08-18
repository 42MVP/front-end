<template>
  <div class="gameContainer">
    <div class="game-ui-continer">
      <div class="user-info-div">
        <AvatarItem :username="matchInfo?.leftUser.name" :avartarUrl="matchInfo?.leftUser.avatarURL" imgSize="100" />
      </div>
      <span class="score-div">{{ lPlayerScore }} : {{ rPlayerScore }}</span>
      <div class="user-info-div">
        <AvatarItem :username="matchInfo?.rightUser.name" :avartarUrl="matchInfo?.rightUser.avatarURL" imgSize="100" />
      </div>
    </div>
    <canvas class="gameBoard" ref="gameBoard" width="1500" height="800"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watchEffect } from 'vue';
import { useGameStore } from '@/stores/game.store';
import { GameSocketService } from '@/services/gameSocket.service';
import type { GameTable, Paddle, Ball } from '@/interfaces/game/GamePlay.interface';

const gameStore = useGameStore();
const matchInfo = gameStore.matchInfo;

const gameBoard = ref<null | HTMLCanvasElement>(null);
const ctx = ref<null | CanvasRenderingContext2D>(null);

const lPlayerScore = ref<number>(GameSocketService.leftScore);
const rPlayerScore = ref<number>(GameSocketService.rightScore);

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

.game-ui-continer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0px 50px;
  min-width: 500px;
  .user-info-div {
    font: var(--medium);
  }

  .score-div {
    font: var(--extra-large);
    align-self: center;
    min-width: max-content;
  }
}
.scoreText {
  font-family: 'consolas', monospace;
  font-size: 100px;
}

.user-info-div {
  margin: 0 100px;
  align-self: center;
  text-align: center;
  font: var(--large);
}

.score-div {
  font: var(--extra-large);
  align-self: center;
  font-weight: bolder;
}

.gameBoard {
  border: 3px solid;
}
</style>
