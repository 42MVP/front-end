<script setup lang="ts">
import GameLoading from '@/components/gameview-components/GameLoading.vue';
import { ref } from 'vue';
</script>

<template>
  <!-- <div class="bg"> -->
  <div class="mm">
    <GameLoading />
  </div>
  <!-- </div> -->
</template>

<style scoped>
.bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  transform: translateZ(0);
  color: aquamarine;
}

.mm {
  background-color: #fff;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
