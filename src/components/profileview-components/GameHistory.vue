<template>
  <li class="item" v-for="history in processedHistories" v-bind:key="history.id">
    <AvatarItem
      class="p-user"
      :username="props.username"
      :avartarUrl="props.img"
      imgSize="100"
      :style="!history.isUserWin && 'opacity: 0.3'"
    />
    <DBox :top="history.createAt" :middle="history.score + ' vs ' + history.opponentScore" />
    <AvatarItem
      class="opponent"
      :username="history.opponent"
      :avartarUrl="history.opponentAvatarUrl"
      imgSize="100"
      :style="history.isUserWin && 'opacity: 0.3'"
    />
  </li>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DBox from '@/components/common/BasicBox.vue';
import AvatarItem from '@/components/common/AvatarItem.vue';
import type { GameHistory } from '@/interfaces/GameHistory.interface';
import type { UserGameHistory } from '@/interfaces/UserGameHistory.interface';

const props = defineProps({
  username: { type: String, default: '' },
  img: { type: String, default: '' },
  histories: { type: Array<GameHistory>, default: [] as GameHistory[] },
});

const processedHistories = ref<UserGameHistory[]>([]);
const processGameHistory = (gameHistories: GameHistory[], username: string): UserGameHistory[] => {
  return gameHistories.map(history => {
    const { id, winner, loser, winnerScore, loserScore, createAt, loserAvatarUrl, winnerAvatarUrl } = history;

    const isUserWin = winner === username;
    const score = isUserWin ? winnerScore : loserScore;
    const opponent = isUserWin ? loser : winner;
    const opponentScore = isUserWin ? loserScore : winnerScore;
    const opponentAvatarUrl = isUserWin ? loserAvatarUrl : winnerAvatarUrl;

    return {
      id,
      score,
      opponent,
      opponentScore,
      opponentAvatarUrl,
      isUserWin,
      createAt,
    };
  });
};

processedHistories.value = processGameHistory(props.histories, props.username);
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
@/contexts/fetchProfile
