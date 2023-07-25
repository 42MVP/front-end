<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Login } from '@/contexts/fetchLogin';
import { useLoginStore } from '@/stores/login.store';
import { useModalStore } from '@/stores/modal.store';

const route = useRoute();
const router = useRouter();
const loginStore = useLoginStore();
const modalStore = useModalStore();

onMounted(async () => {
  const code = route.query.code;
  try {
    const res = await Login.fecthUserInfo(code);
    loginStore.name = res.name;
    loginStore.avatarURL = res.avatarURL;
    loginStore.refreshToken = res.refreshToken;
    loginStore.accessToken = res.accessToken;
    loginStore.isLogin = true;
    if (res.isFirstLogin === true) {
      router.push('/signUp/setProfile');
    } else {
      router.push('/');
    }
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

<template>
  <div class="oauth-wrap">
    <div id="spinner"></div>
  </div>
</template>

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
