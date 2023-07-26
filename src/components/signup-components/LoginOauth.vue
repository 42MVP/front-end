<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useLoginStore } from '@/stores/login.store';
import { useModalStore } from '@/stores/modal.store';
import { getUserID } from '@/contexts/decorators';
import axios from 'axios';
import { Login } from '@/contexts/fetchLogin';

const route = useRoute();
const router = useRouter();
const loginStore = useLoginStore();
const modalStore = useModalStore();

onMounted(async () => {
  const token = $cookies.get('access-token');
  const userID = getUserID(token);
  try {
    const ret = await Login.fetchUserInfo(userID, token);
    const data = ret.data;
    console.log(data);
    loginStore.name = data.userName;
    loginStore.id = data.id;
    loginStore.isLogin = true;
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
