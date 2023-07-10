<script setup lang="ts">
import { ref } from 'vue';
import FriendList from '@/components/friendslist-component/FriendList.vue';
import FriendInfo from '@/components/friendslist-component/FriendInfo.vue';
</script>

<template>
  <main>
    <FriendList />
    <FriendInfo />
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-flow: row;
  align-items: center;
  background-color: white;
  margin-top: 40px;
  margin-left: 40px;
}
.card {
  margin-left: 100px;
}
</style>
