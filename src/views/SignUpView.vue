<template>
  <div class="wrap">
    <Logo />
    <RouterView></RouterView>
  </div>
</template>

<script setup lang="ts">
import Logo from '@/components/homeview-components/MainLogo.vue';
</script>

<style scoped>
.wrap {
  height: 100vh;
  display: flex;
  flex-flow: row;
  align-items: center;
}
</style>
