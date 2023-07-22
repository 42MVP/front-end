<script setup lang="ts">
import BasicButton from '@/components/BasicButton.vue';
import { fetchLoginURL } from '@/contexts/oauth';

const login = async () => {
  const ret = await fetchLoginURL();
  window.location.href = ret.loginURL;
};
</script>

<template>
  <BasicButton class="buttonStyle" text="42로그인" @click="login()"></BasicButton>
</template>

<style scoped>
.buttonStyle {
  margin-left: 250px;
  width: 240px;
  height: 70px;
}
</style>
