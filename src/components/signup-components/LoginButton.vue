<template>
  <a href="http://localhost:3000/login/ft">
    <BasicButton class="buttonStyle" text="42로그인" href="http://localhost:3000/login/ft"></BasicButton>
  </a>
</template>

<script setup lang="ts">
import BasicButton from '@/components/BasicButton.vue';
</script>

<style scoped>
.buttonStyle {
  margin-left: 250px;
  width: 240px;
  height: 70px;
}
</style>
