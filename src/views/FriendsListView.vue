<script setup lang="ts">
import { ref } from 'vue';
import FriendList from '@/components/FriendsComponent/FriendList.vue';
</script>

<template>
  <main>
    <FriendList />
  </main>
</template>

<style scoped>
main {
  background-color: white;
  margin-top: 40px;
  margin-left: 40px;
}
</style>
