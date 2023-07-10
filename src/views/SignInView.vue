<template>
  <div class="wrap">
    <Logo />
    <BasicButton class="buttonStyle" text="42로그인"></BasicButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Logo from '@/components/homeview-components/MainLogo.vue';
import BasicButton from '@/components/BasicButton.vue';
</script>

<style scoped>
.wrap {
  display: flex;
  flex-flow: row;
  align-items: center;
}

.buttonStyle {
  margin-left: 250px;
  width: 240px;
  height: 50px;
}
</style>
