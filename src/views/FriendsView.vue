<template>
  <main>
    <FriendList />
    <FriendProfile />
  </main>
</template>

<script setup lang="ts">
import FriendList from '@/components/friendslist-component/FriendList.vue';
import FriendProfile from '@/components/friendslist-component/FriendProfile.vue';
</script>

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
