<template>
  <div class="gameContainer">
    <!-- <div class="game-ui-continer">
      <div class="user-info-div">
        <AvatarItem :username="leftPlayer?.name" :avartarUrl="leftPlayer?.avatarURL" imgSize="100" />
      </div>
      <span class="score-div">{{ lPlayerScore }} : {{ rPlayerScore }}</span>
      <div class="user-info-div">
        <AvatarItem :username="rightPlayer?.name" :avartarUrl="rightPlayer?.avatarURL" imgSize="100" />
      </div>
    </div> -->
    <canvas class="gameBoard" ref="gameBoard" width="1100" height="700"></canvas>
    <!-- <div v-if="!gameStore.isGameConnected" class="user-info-div bold">
      {{ 'Lose🍂' }} <br />
      {{ (leftPlayer?.rating as number) - 12 }} ({{ -12 }})
    </div>
    <div class="net-div" />
    <div v-if="!gameStore.isGameConnected" class="user-info-div bold">
      {{ 'Win👑' }} <br />{{ (rightPlayer?.rating as number) + 12 }} (+{{ 12 }})
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watchEffect } from 'vue';
import { useGameStore } from '@/stores/game.store';
import { GameSocketService } from '@/services/gameSocket.service';
import type { GameTable, Paddle, Ball } from '@/interfaces/game/GamePlay.interface';

const gameStore = useGameStore();

const leftPlayer = gameStore.matchInfo?.leftUser;
const rightPlayer = gameStore.matchInfo?.rightUser;

const gameBoard = ref<null | HTMLCanvasElement>(null);
const ctx = ref<null | CanvasRenderingContext2D>(null);

const lPlayerScore = ref<number>(GameSocketService.leftScore);
const rPlayerScore = ref<number>(GameSocketService.rightScore);

const gameSettings = {
  gameWidth: 1100,
  gameHeight: 700,
  boardBackground: GameSocketService.backGround,
  paddleColor: '#463F3A',
  ballColor: '#E0AFA0',
  ballRadius: 12.5,
  paddleSpeed: 50,
};

const { gameWidth, gameHeight, boardBackground, paddleColor, ballColor, ballRadius } = gameSettings;

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
  margin-top: 15px;
  .net-div {
    border: 1px dashed var(--base-gray);
    width: 1px;
    height: 100%;
    min-height: inherit;
  }
}
</style>
