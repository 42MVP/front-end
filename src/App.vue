<template>
  <main>
    <header v-if="$route.path !== '/' && !$route.path.includes('/sign')">
      <NavBar />
    </header>
    <RouterView />
  </main>
</template>

<script lang="ts">
import NavBar from './components/NavBar.vue';

export default {
  components: {
    NavBar,
  },
};
</script>
