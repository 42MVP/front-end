<template>
  <!-- <div class="wrap"> -->
  <div class="logoWrap">
    <h1 class="mainLogo">PINGPONG</h1>
    <Image />
  </div>
  <!-- </div> -->
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Image from '../icons/PongImage.vue';
</script>

<style scoped>
.wrap {
  display: flex;
  flex-flow: row;
  align-items: center;
}
.logoWrap {
  width: 50%;
  min-width: 370;
  height: 100vh;
  background-color: #e0afa0;
  display: flex;
  flex-flow: column;
  align-items: center;
}

.mainLogo {
  color: #463f3a;
  font-weight: 900;
  font-size: 90px;
  font-style: italic;
  align-items: center;
  margin-top: 200px;
}

svg {
  width: 50%;
  height: 50%;
}
</style>
