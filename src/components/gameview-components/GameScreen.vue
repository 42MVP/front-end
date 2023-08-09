<template>
  <div class="game-ui-continer">
    <div class="user-info-div">
      <AvatarItem :username="loginStore.name" :avartarUrl="loginStore.avatarURL" imgSize="100" />
    </div>
    <span class="score-div">{{ 5 }} : {{ 4 }}</span>
    <div class="user-info-div">
      <AvatarItem :username="gameStore.opponent?.name" :avartarUrl="gameStore.opponent?.avatarURL" imgSize="100" />
    </div>
  </div>
  <div class="table-div">
    <div class="stick-div" />
    <div v-if="!gameStore.isGameConnected" class="user-info-div bold">
      {{ 'Lose🍂' }} <br />
      {{ 1899 - 12 }} ({{ -12 }})
    </div>
    <div class="net-div" />
    <div v-if="!gameStore.isGameConnected" class="user-info-div bold">
      {{ 'Win👑' }} <br />{{ 1899 + 12 }} (+{{ 12 }})
    </div>
    <div class="stick-div" />
  </div>
  <button class="delete-me" @click="tmp1">임시(결과)</button>
  <button class="delete-me" @click="tmp2">임시(처음)</button>
  <button class="delete-me" @click="tmp3">임시(다시)</button>
</template>

<script setup lang="ts">
import AvatarItem from '@/components/common/AvatarItem.vue';

import { useLoginStore } from '@/stores/login.store';
import { useGameStore } from '@/stores/game.store';

const loginStore = useLoginStore();
const gameStore = useGameStore();

// endGame - result
const tmp1 = () => {
  gameStore.isGameConnected = false;
};
// endGame - 처음으로
const tmp2 = () => {
  gameStore.endGame();
};
// endGame - 다시
const tmp3 = () => {
  gameStore.setStatus('상대방대기');
  gameStore.setReadyTime();
  gameStore.isMatched = false;
};
</script>

<style scoped>
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

.table-div {
  display: flex;
  border-style: solid;
  justify-content: space-between;
  border-color: var(--semi-brown);
  border-width: 2px;
  border-radius: 15px;
  margin: 10px 50px;
  min-width: 1000px;
  min-height: 500px;
  background-color: var(--base-ivory);

  .net-div {
    border: 1px dashed var(--base-gray);
    width: 1px;
    height: 100%;
    min-height: inherit;
  }

  .stick-div {
    background-color: var(--brown);
    width: 10px;
    height: 60px;
    margin: 5px 10px;
  }
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
.bold {
  font-weight: bold;
}
</style>
