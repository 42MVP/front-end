<script setup lang="ts">
import { useLoginStore } from '@/stores/login.store';
import { useModalStore } from '@/stores/modal.store';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const loginStore = useLoginStore();
const modalStore = useModalStore();
const router = useRouter();

onMounted(() => {
  if (!loginStore.isLogin) {
    modalStore.on({
      isActive: true,
      title: '알림',
      text: '로그인이 필요합니다.',
      buttonText: '로그인 하기',
      buttonFunc: () => {
        router.push('/signin');
      },
    });
  }
});

const links = [
  {
    to: '/chats',
    text: 'Chats',
  },
  {
    to: '/friends',
    text: 'Friends',
  },
  {
    to: '/game',
    text: 'Game',
  },
];
</script>

<template>
  <div class="header">
    <div class="header-left">
      <RouterLink to="/"> <h1 class="navLogo">PING PONG</h1></RouterLink>
      <div class="ball" />
      <nav class="navItems">
        <RouterLink v-for="(link, idx) in links" :key="idx" class="navItem" :to="link.to">{{ link.text }}</RouterLink>
      </nav>
    </div>
    <nav class="userInfo">
      <img :src="loginStore?.avatarURL" class="profileImage" />
      <RouterLink :to="'/users/' + loginStore?.name">{{ loginStore?.name }}</RouterLink>
    </nav>
  </div>
</template>

<style scoped>
.header {
  width: 100%;
  height: 90px;
  background-color: #e0afa0;
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: space-between;
  padding: 0px 30px;
}

.header-left {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.navItems {
  display: flex;
  justify-content: space-between;
}

.navItems a {
  font-weight: 900;
  font-size: 32px;
  color: #463f3a;
  margin-right: 30px;
  cursor: pointer;
  text-decoration: none;
}

.navItems a:hover {
  opacity: 0.5;
  transition: 0.1s ease-out;
}

.navLogo {
  color: #f4f3ee;
  font-weight: 900;
  font-size: 64px;
  font-style: italic;
  cursor: pointer;
  margin-right: 50px;
  min-width: max-content;
}

.ball {
  background: var(--base-pink, #e0afa0);
  border-radius: 50%;
  width: 53px;
  height: 54.33px;
  position: absolute;
  left: 370px;
  top: -8px;
  padding: -10px 0px 0px 0px;
  box-sizing: border-box;
}

.userInfo {
  display: flex;
  flex-flow: row;
  align-items: center;
}

.userInfo a {
  font-weight: 800;
  font-size: 26px;
  color: black;
  color: #463f3a;
  text-decoration: none;
}

.userInfo a:hover {
  opacity: 0.5;
  transition: 0.1s ease-out;
}

.userInfo img {
  height: 55px;
  width: 55px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 20px;
}

a:link,
a:visited,
a:hover,
a:active {
  text-decoration: none !important;
}
</style>
