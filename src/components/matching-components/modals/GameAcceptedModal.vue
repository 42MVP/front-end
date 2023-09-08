<template>
  <MatchingBox title="잠시 후 경기가 시작됩니다">
    <template #body>
      <div class="body-container">
        <div class="user-info-div">
          <AvatarItem :username="leftUser?.name" :avartarUrl="leftUser?.avatarURL" imgSize="100">
            <span class="bold">{{ leftUser?.rating }}</span>
          </AvatarItem>
        </div>
        <span class="verse">vs</span>
        <div class="user-info-div">
          <AvatarItem :username="rightUser?.name" :avartarUrl="rightUser?.avatarURL" imgSize="100">
            <span class="bold">{{ rightUser?.rating }}</span>
          </AvatarItem>
        </div>
      </div>
    </template>
  </MatchingBox>
</template>

<script setup lang="ts">
import MatchingBox from '../MatchingBox.vue';
import AvatarItem from '@/components/common/AvatarItem.vue';
import type { GameUser } from '@/interfaces/game/GameUser.interface';

import { useGameStore } from '@/stores/game.store';
import { MatchingStep, useMatchingStore } from '@/stores/matching.store';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const gameStore = useGameStore();
const matchingStore = useMatchingStore();

const UnknownPlayer: GameUser = {
  name: 'Unknown',
  avatarURL: '',
  rating: 0,
};

const leftUser = gameStore.matchInfo?.leftUser ? gameStore.matchInfo.leftUser : UnknownPlayer;
const rightUser = gameStore.matchInfo?.rightUser ? gameStore.matchInfo.rightUser : UnknownPlayer;

const router = useRouter();

onMounted(() => {
  setTimeout(() => {
    matchingStore.setStep(MatchingStep.GameSetting);
    router.push('/game');
  }, 5000);
});
</script>

<style>
.body-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 40px 15px 0px 15px;
  min-width: 440px;
  min-height: 160px;
}

.user-info-div {
  display: flex;
  flex-direction: column;
  font: var(--medium);
  flex-direction: column;
}

.verse {
  font: var(--extra-large);
  align-self: center;
}

.bold {
  font-weight: bold;
}
</style>
