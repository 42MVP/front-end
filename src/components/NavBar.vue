<script setup lang="ts">
import { userStore } from '../stores/user';

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
      <h1 class="navLogo" to="/">PING PONG</h1>
      <nav class="navItems">
        <RouterLink v-for="(link, idx) in links" :key="idx" class="navItem" :to="link.to">{{ link.text }}</RouterLink>
      </nav>
    </div>
    <nav class="userInfo">
      <img :src="userStore?.user?.avatarURL" class="profileImage" />
      <RouterLink to="/friends">{{userStore?.user?.name}}</RouterLink>
    </nav>
  </div>
</template>

<style scoped>
.header {
  min-width: 100vh;
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
  margin-left: 50px;
  cursor: pointer;
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
</style>
