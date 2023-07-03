<script setup lang="ts">
import { ref } from 'vue';
</script>

<template>
  <div class="header">
    <h1 class="navLogo">PING PONG</h1>
    <nav class="navItem">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/chat">Chat</RouterLink>
      <RouterLink to="/friends">Friends</RouterLink>
      <RouterLink to="/game">Game</RouterLink>
    </nav>
    <nav class="userName">
      <a class="profileImage"></a>
      <RouterLink to="/friends">User1</RouterLink>
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
  /* justify-content: space-between; */
}

.navItem {
  display: flex;
  justify-content: space-between;
  margin-left: 50px;
}

.navItem a {
  font-weight: 900;
  font-size: 32px;
  color: #463f3a;
  margin-left: 20px;
}

.navLogo {
  color: #f4f3ee;
  font-weight: 900;
  font-size: 64px;
  font-style: italic;
  margin-left: 20px;
}

/* .navLogo::after {
  display: block;
  content: '';
  right: 40px;
  top: 30px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: chartreuse;
} */

.menuBar {
}
.userName {
  margin-left: 300px;
  display: flex;
  flex-flow: row;
  align-items: center;
}
.userName a {
  font-weight: 800;
  font-size: 26px;
  color: black;
  margin-left: 20px;
}

.profileImage {
  height: 55px;
  width: 55px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  position: relative;
}
</style>
