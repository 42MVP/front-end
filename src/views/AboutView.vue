<script lang="ts">
import InfoBox from './InfoBox.vue'

export default {
  components: {
    InfoBox
  },
};
</script>

<template>
  <!--  <router-link to="/">Home</router-link> -->
  <div class="acontainer">
    <div class="top">
      <div class="user-card">usercard</div>
      <div class="game-card">
        <InfoBox>
          aasd
        </InfoBox>
        <InfoBox>
          aasd
        </InfoBox>
        <InfoBox>
          aasd
        </InfoBox>
      </div>
    </div>
    <div class="bottom">
      <div class="history"></div>
    </div>
  </div>
</template>

<style scoped>
.acontainer {
  background-color: red;
  width: 100%;
  height: 100%;
}

.top {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: blue;
}

.bottom {
  display: flex;
  justify-content: center;
  background-color: gray;
  padding: 50px 0px;
}
.history {
  background-color: yellow;
  width: 1000px;
  height: 300px;
}

.user-card {
  background-color: yellow;

  width: 300px;
  height: 400px;
}

.game-card {
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  grid-template-columns: repeat(2, 1fr);
  background-color: yellow;
  width: 300px;
  height: 400px;
}
</style>
