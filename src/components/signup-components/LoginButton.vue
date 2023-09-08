<template>
  <a :href="endpoint + '/login/ft'">
    <BasicButton class="buttonStyle" text="42로그인" :href="endpoint + '/login/ft'"></BasicButton>
  </a>
</template>

<script setup lang="ts">
import BasicButton from '@/components/BasicButton.vue';
import { endpoint } from '@/services/utils/config.utils';
</script>

<style scoped>
.buttonStyle {
  margin-left: 250px;
  width: 240px;
  height: 70px;
}
</style>