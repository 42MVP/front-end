<template>
  <div class="game-result-container">
    <div class="user-info-div">
      <span class="bold">{{ 'Lose🍂' }}</span>
      <ProfileCard user_id="chaejkim" img="1.png" img_size="150">
        <span class="bold">{{ 1899 - 12 }} ({{ -12 }})</span>
      </ProfileCard>
    </div>
    <span class="score-div">{{ 10 }} : {{ 15 }}</span>
    <div class="user-info-div">
      <span class="bold">{{ 'Win👑' }}</span>

      <ProfileCard user_id="hyeongki" img="4.png" img_size="150">
        <span class="bold">{{ 1899 + 12 }} ({{ +12 }})</span>
      </ProfileCard>
    </div>
  </div>
  <div class="button-div">
    <BasicButton text="홈으로" style="margin: 0 50px" @response="refuseGame" />
    <BasicButton text="다시하기" style="margin: 0 50px" @response="acceptGame" />
  </div>
</template>

<script setup lang="ts">
import BasicButton from '@/components/BasicButton.vue';
import ProfileCard from '@/components/profileview-components/ProfileCard.vue';

const emits = defineEmits(['response']);

const acceptGame = () => {
  emits('response', 'hyeonki');
};

const refuseGame = () => {
  emits('response', '');
};
</script>

<style scoped>
.game-result-container {
  display: flex;
  justify-content: center;
  align-self: center;
}

.user-info-div {
  margin: 0 100px;
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

.button-div {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 50px;
}
</style>
