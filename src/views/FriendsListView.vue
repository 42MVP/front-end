<script setup lang="ts">
import { ref } from 'vue';
import FriendList from '@/components/FriendsComponent/FriendList.vue';
import ProfileCard from '@/components/profileview-components/ProfileCard.vue';
</script>

<template>
  <main>
    <FriendList />
    <ProfileCard class="card" />
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
