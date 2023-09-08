<template>
  <li class="item" v-for="(history, idx) in props.histories" :key="idx">
    <AvatarItem
      class="p-user"
      :username="username"
      :avartarUrl="img"
      imgSize="100"
      :style="(history.score < history.opponentScore) && 'opacity: 0.3'"
    />
    <DBox :top="''" :middle="history.score + ' vs ' + history.opponentScore" />
    <AvatarItem
      class="opponent"
      :username="history.opponentName"
      :avartarUrl="history.opponentAvatarURL"
      imgSize="100"
      :style="!(history.score < history.opponentScore) && 'opacity: 0.3'"
    />
  </li>
</template>

<script setup lang="ts">
import DBox from '@/components/common/BasicBox.vue';
import AvatarItem from '@/components/common/AvatarItem.vue';
import type { UserGameHistory } from '@/interfaces/user/UserGameHistory.interface';

const props = defineProps({
  username: { type: String, default: '' },
  img: { type: String, default: '' },
  histories: { type: Array<UserGameHistory>, default: [] as UserGameHistory[] },
});

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
