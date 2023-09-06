<template>
  <div class="oauth-wrap">
    <div id="spinner"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useLoginStore } from '@/stores/login.store';
import { useModalStore } from '@/stores/modal.store';
import { LoginService } from '@/services/login.service';

const router = useRouter();
const loginStore = useLoginStore();
const modalStore = useModalStore();
const route = useRoute();

onMounted(async () => {
  try {
    const token = route.query.token;
    if (typeof token === 'string') localStorage.setItem('access-token', token);
    const data = await LoginService.getUserInfo();
    loginStore.setLogin(data);
    router.push('/');
  } catch (e) {
    modalStore.on({
      title: '알림',
      text: e,
      buttonText: '닫기',
      buttonFunc: () => {},
    });
  }
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
