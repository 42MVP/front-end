<script setup lang="ts">
import Logo from '@/components/homeview-components/MainLogo.vue';
</script>

<template>
  <div class="wrap">
    <Logo />
    <RouterView></RouterView>
  </div>
</template>

<style scoped>
.wrap {
  height: 100vh;
  display: flex;
  flex-flow: row;
  align-items: center;
}
</style>
