<template>
  <Modal title="경기 결과">
    <template #body>
      <div class="body-container">
        <div class="user-info-div">
          <span class="bold">Win👑</span>
          <AvatarItem :username="gameResult?.winner" :avartarUrl="gameResult?.winnerAvatarUrl" imgSize="100">
            <span class="rate">{{ gameResult?.winnerRate as number }} (+12)</span>
          </AvatarItem>
        </div>
        <span class="score">{{ gameResult?.winnerScore }} : {{ gameResult?.loserScore }} </span>
        <div class="user-info-div">
          <span class="bold">Lose🍂</span>
          <AvatarItem :username="gameResult?.loser" :avartarUrl="gameResult?.loserAvatarUrl" imgSize="100">
            <span class="rate">{{ gameResult?.loserRate as number }} (-12)</span>
          </AvatarItem>
        </div>
      </div>
    </template>
    <template #footer>
      <BasicButton text="확인" @click="moveToProfile()" />
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Modal from '@/components/Modal.vue';
import AvatarItem from '@/components/common/AvatarItem.vue';
import BasicButton from '../BasicButton.vue';

import { useGameStore } from '@/stores/game.store';
import { GameService } from '@/services/game.service';
import type { GameHistory } from '@/interfaces/game/GameHistory.interface';
import { useRouter } from 'vue-router';
import { useLoginStore } from '@/stores/login.store';

const loginStore = useLoginStore();
const gameStore = useGameStore();
const gameResult = ref<GameHistory>();

const router = useRouter();

const moveToProfile = () => {
  gameStore.isFinished = false;
  router.push(`/users/${loginStore?.name}`);
};

onMounted(async () => {
  gameResult.value = await GameService.getGameResult(gameStore.gameHistoryId);
  // gameResult.value = await GameService.getGameResult(gameStore.matchInfo!.gameRoomId!);
});
</script>

<style scoped>
.body-container {
  display: flex;
  flex-flow: row;
  align-items: center;
  text-align: center;
}

.user-info-div {
  margin: 0 80px;
  display: flex;
  flex-flow: column;
  text-align: center;
  font: var(--large);
}

.score {
  font: var(--extra-large);
  align-self: center;
  font-weight: bolder;
}

.rate {
  align-self: center;
  font-weight: lighter;
  font-size: medium;
}

.button-div {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 50px;
}
</style>
