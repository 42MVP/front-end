<template>
  <div class="game-ui-continer">
    <div class="user-info-div">
      <ProfileCard user_id="chaejkim" img="1.png" img_size="100" />
    </div>
    <span class="score-div">{{ 5 }} : {{ 4 }}</span>
    <div class="user-info-div">
      <ProfileCard user_id="hyeongki" img="4.png" img_size="100" />
    </div>
  </div>
  <!-- TODO : canvase -->
  <div class="table-div">
    <div class="stick-div" />
    <div v-if="!isGameConnected" class="user-info-div bold">
      {{ 'Lose🍂' }} <br />
      {{ 1899 - 12 }} ({{ -12 }})
    </div>
    <div class="net-div" />
    <div v-if="!isGameConnected" class="user-info-div bold">{{ 'Win👑' }} <br />{{ 1899 + 12 }} (+{{ 12 }})</div>
    <div class="stick-div" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ProfileCard from '@/components/profileview-components/ProfileCard.vue';

const isGameConnected = ref<boolean>(false);
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
    border: 1px dashed;
    width: 1px;
    height: 100%;
    border-color: var(--base-gray);
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
