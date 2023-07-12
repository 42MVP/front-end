<template>
  <main class="wrap">
    <Logo />
    <div class="mainNav">
      <RouterLink to="/game">GAME -></RouterLink>
      <RouterLink to="/chat">CHAT -></RouterLink>
      <RouterLink to="/friends">FRIENDS -></RouterLink>
    </div>
  </main>
</template>

<script setup lang="ts">
import Logo from '@/components/homeview-components/MainLogo.vue';
</script>

<style scoped>
.wrap {
  display: flex;
  flex-flow: row;
  align-items: center;
}
.mainNav {
  display: flex;
  flex-flow: column;
  align-items: left;
  margin-left: 50px;
}

.mainNav a {
  color: #8a817c;
  font-weight: 900;
  font-size: 70px;
  font-style: italic;
}
</style>
