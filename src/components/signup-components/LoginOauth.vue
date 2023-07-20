<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { fecthUserInfo } from '@/contexts/oauth';
import { useLoginStore } from '@/stores/login.store';
import { useChatStore } from '@/stores/chat.store';

const route = useRoute();
const router = useRouter();
const loginStore = useLoginStore();
const chatStore = useChatStore();

onMounted(() => {
  const OauthCode = route.query.code;
  fecthUserInfo(OauthCode)
    .then(res => {
      console.log(res);
      console.log(loginStore.username);
      loginStore.name = res.name;
      loginStore.avatarURL = res.avatarURL;
      loginStore.refreshToken = res.refreshToken;
      loginStore.accessToken = res.accessToken;
      loginStore.isLogin = true;
      chatStore.someState = 'asdasdads';
      router.push('/');
    })
    .catch(e => {
      console.log(e);
    });
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
