<template>
  <li class="item" v-for="history in processedHistories" v-bind:key="history._id">
    <Card class="p-user" :user_id="props.user_id" :img="props.img" img_size="100" :style="!history.isUserWin && css" />
    <DBox :top="history.createAt" :middle="history.score + ' vs ' + history.opponent_score" />
    <Card
      class="opponent"
      :user_id="history.opponent_id"
      img="profile_0.png"
      img_size="100"
      :style="history.isUserWin && css"
    />
  </li>
</template>

<script setup lang="ts">
import DBox from '@/components/common/BasicBox.vue';
import Card from '@/components/profileview-components/ProfileCard.vue';
import { ref } from 'vue';

interface GameHistory {
  _id: number;
  win_score: number;
  lose_score: number;
  win_id: string;
  lose_id: string;
  createAt: string;
}

interface GameUserHistory {
  _id: number;
  score: number;
  opponent_id: string;
  opponent_score: number;
  isUserWin: boolean;
  createAt: string;
}

const props = defineProps({
  user_id: String,
  img: String,
});

const css = ref('opacity: 0.3');
const histories: GameHistory[] = [
  {
    _id: 1,
    win_score: 5,
    lose_score: 2,
    win_id: 'chaejkim',
    lose_id: 'kanghyki',
    // win_img: '1.png',
    // lose_img: '3.png',
    createAt: '2023.6.24. 15:23:45',
  },
  {
    _id: 2,
    win_score: 5,
    lose_score: 4,
    win_id: 'hejang',
    lose_id: 'chaejkim',
    // win_img: '2.png',
    // lose_img: '1.png',
    createAt: '2023.6.24. 15:10:04',
  },
  {
    _id: 3,
    win_score: 5,
    lose_score: 2,
    win_id: 'kanghyki',
    lose_id: 'chaejkim',
    // win_img: '2.png',
    // lose_img: '1.png',
    createAt: '2023.6.24. 15:10:04',
  },
];
const processedHistories = ref<GameUserHistory[]>([]);

const processGameHistory = (gameHistories: GameHistory[], id: string | undefined): GameUserHistory[] => {
  return gameHistories.map(history => {
    const { _id, win_id, lose_id, win_score, lose_score, createAt } = history;
    const user_id = id || '';

    const isUserWin = win_id === user_id;
    const score = isUserWin ? win_score : lose_score;
    const opponent_id = isUserWin ? lose_id : win_id;
    const opponent_score = isUserWin ? lose_score : win_score;

    return {
      _id,
      score,
      opponent_id,
      opponent_score,
      isUserWin,
      createAt,
    };
  });
};

processedHistories.value = processGameHistory(histories, props.user_id);
</script>

<style scoped>
.item {
  background: var(--base-ivory, #f4f3ee);
  border-radius: 10px;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  width: 1054px;
  height: 190px;
  margin: 12px 0;

  color: var(--brown, #463f3a);
  font: var(--medium, 500 24px/32px 'Inter', sans-serif);
}

.p-user {
  display: flex;
  flex-direction: row-reverse;
  align-items: flex-end;
  justify-content: flex-start;
  position: relative;
}

.game-record {
  padding: 17px 0px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  align-self: stretch;
  flex-shrink: 0;
  position: relative;
}

.opponent {
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: flex-end;
  justify-content: flex-start;
  flex-shrink: 0;
  position: relative;
}
</style>
