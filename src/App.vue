<script setup lang="ts">
import { RouterView } from 'vue-router';
import Nav from '@/components/tmp/HeaderNav.vue';
import Card from '@/components/profileview-components/ProfileCard.vue';
// import TButton from '@/components/ToggleButton.vue';
</script>

<template>
  <header>
    <Nav>
      <Card user_id="chaejkim" img_size="60"></Card>
    </Nav>
  </header>
  <RouterView />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@500&display=swap');
</style>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.layout-padding {
  padding: 1em 4em;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}
</style>
