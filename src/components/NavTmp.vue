<script setup lang="ts">
import { ref } from 'vue';
</script>

<template>
  <header>
    <div id="barnd"><RouterLink to="/">HOME</RouterLink></div>
    <nav>
      <ul>
        <li><RouterLink to="/about">About</RouterLink>"</li>
        <li><RouterLink to="/user">USER</RouterLink></li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  background-color: black;
  padding: 0 10px;
}

header a {
  text-decoration: none;
}

ul {
  display: flex;
  list-style-type: none;
  gap: 20px;
}
li a {
  color: white;
}

@media only screen and (max-width: 600px) {
  header nav {
    display: none;
  }

  #hamburger-icon {
    display: block;
  }
}
</style>
