<template>
  <div class="wrap">
    <Logo />
    <RouterView></RouterView>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Logo from '@/components/HomeComponents/Logo.vue';
import BasicButton from '@/components/BasicButton.vue';
</script>

<style scoped>
.wrap {
  display: flex;
  flex-flow: row;
  align-items: center;
}
</style>
