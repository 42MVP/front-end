<template>
  <div class="oauth-wrap">
    <div id="spinner"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useLoginStore } from '@/stores/login.store';

const loginStore = useLoginStore();
const route = useRoute();

onMounted(async () => {
  const token = route.query.token;
  if (typeof token === 'string') localStorage.setItem('token', token);
  loginStore.login();
});
</script>

<style>
.oauth-wrap {
  display: flex;
  flex: 1;
  height: 100%;
  justify-content: center;
  align-items: center;
}

#spinner {
  margin: calc(50% - 25px) auto;
  width: 100px;
  height: 100px;
  border: 7px solid #e0afa0;
  box-sizing: border-box;
  border-top-color: #fff;

  border-radius: 100%;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>
