<template>
  <div class="gameContainer">
    <div v-if="!gameStore.isStarted">
      <CountdownTimer v-if="gameStore.startTimeMs" :targetTime="new Date(gameStore.startTimeMs)" @timeout="timeout" />
    </div>
    <div v-show="gameStore.isStarted">
      <div class="game-ui-continer">
        <div class="user-info-div">
          <AvatarItem :username="leftPlayer?.name" :avartarUrl="leftPlayer?.avatarURL" imgSize="100" />
        </div>
        <span class="score-div">{{ gameStore.leftScore }} : {{ gameStore.rightScore }}</span>
        <div class="user-info-div">
          <AvatarItem :username="rightPlayer?.name" :avartarUrl="rightPlayer?.avatarURL" imgSize="100" />
        </div>
      </div>
      <canvas class="gameBoard" ref="gameBoard" width="1100" height="700"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

import CountdownTimer from '@/components/CountdownTimer.vue';

import { useGameStore } from '@/stores/game.store';
import { GameService } from '@/services/game.service';
import type { GameUser } from '@/interfaces/game/GameUser.interface';
import type { Paddle, Ball } from '@/interfaces/game/GamePlay.interface';

const timeout = () => {
  gameStore.isStarted = true;
  requestAnimationFrame(renderTable);
};

const gameStore = useGameStore();

const leftPlayer = ref<GameUser | undefined>(undefined);
const rightPlayer = ref<GameUser | undefined>(undefined);

const gameBoard = ref<null | HTMLCanvasElement>(null);
const ctx = ref<null | CanvasRenderingContext2D>(null);

const gameSettings = {
  gameWidth: 1100,
  gameHeight: 700,
  boardBackground: gameStore.background,
  paddleColor: '#463F3A',
  ballColor: '#E0AFA0',
  ballRadius: 12.5,
  paddleSpeed: 50,
};

const { gameWidth, gameHeight, boardBackground, paddleColor, ballColor, ballRadius } = gameSettings;

const renderTable = () => {
  if (gameStore.tableInfo) {
    const tableInfo = gameStore.tableInfo;
    clearBoard();
    drawBall(tableInfo.ball);
    drawPaddles(tableInfo.leftPaddle, tableInfo.rightPaddle);
    requestAnimationFrame(renderTable);
    console.log(tableInfo);
  } else {
    console.warn('renderTable fail - check gameStore.tableInfo');
  }
};

const drawBall = (ball: Ball) => {
  if (!ctx.value) return;
  ctx.value.fillStyle = ballColor;
  ctx.value.lineWidth = 2;
  ctx.value.beginPath();
  ctx.value.arc(ball.x, ball.y, ballRadius, 0, 2 * Math.PI);
  ctx.value.stroke();
  ctx.value.fill();
};

const drawPaddles = (leftPaddle: Paddle, rightPaddle: Paddle) => {
  if (!ctx.value) return;

  ctx.value.fillStyle = paddleColor;
  ctx.value.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
  ctx.value.strokeRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);

  ctx.value.fillStyle = paddleColor;
  ctx.value.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);
  ctx.value.strokeRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);
};

const clearBoard = () => {
  if (!ctx.value) return;
  ctx.value.fillStyle = boardBackground || '#E0AFA0FF';
  ctx.value.fillRect(0, 0, gameWidth, gameHeight);
};

onMounted(() => {
  gameStore.isStarted = false;
  leftPlayer.value = gameStore.matchInfo?.leftUser;
  rightPlayer.value = gameStore.matchInfo?.rightUser;
  GameService.play.socket.on();
  if (gameBoard.value) {
    ctx.value = gameBoard.value.getContext('2d');
  }
  GameService.play.socket.readyGame();
  // requestAnimationFrame(renderTable);
});

onBeforeUnmount(() => {
  GameService.play.socket.off();
  gameStore.isStarted = false;
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
  margin-top: 15px;
  .net-div {
    border: 1px dashed var(--base-gray);
    width: 1px;
    height: 100%;
    min-height: inherit;
  }
}
</style>
@/services/gamePlay.service
