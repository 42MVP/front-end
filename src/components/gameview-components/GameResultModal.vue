<template>
  <Modal title="경기 결과" :show="props.isShow">
    <template #body>
      <div class="body-container">
        <div class="user-info-div">
          <span class="bold">Win👑</span>
          <AvatarItem :username="gameResult?.winner" :avartarUrl="gameResult?.winnerAvatarUrl" imgSize="100">
            <span class="rate">{{ gameResult?.winnerRate as number }} +12</span>
            <span class="bold">{{ gameResult?.winnerScore }}</span>
          </AvatarItem>
        </div>
        <div class="user-info-div">
          <span class="bold">Lose🍂</span>
          <AvatarItem :username="gameResult?.loser" :avartarUrl="gameResult?.loserAvatarUrl" imgSize="100">
            <span class="rate">{{ gameResult?.loserRate as number }} -12</span>
            <span class="bold">{{ gameResult?.loserScore }}</span>
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

const props = defineProps<{
  isShow: boolean;
}>();

const moveToProfile = () => {
  router.push(`/users/${loginStore?.name}`);
}

onMounted(async () => {
  try {
    gameResult.value = await GameService.getGameResult(gameStore.gameHistoryId);
    // gameResult.value = await GameService.getGameResult(gameStore.matchInfo!.gameRoomId!);
  } catch (e) {
    console.log(e);
  }
});
</script>

<style scoped>
.body-container {
  display: flex;
  flex-flow: row;
  text-align: center;
}

.game-result-container {
  display: flex;
  justify-content: center;
  align-self: center;
}

.user-info-div {
  margin: 0 100px;
  display: flex;
  flex-flow: column;
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

.rate {
  align-self: center;
  font-weight: lighter;
}

.button-div {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 50px;
}
</style>
