<template>
  <div class="container">
    <div class="friends-left">
      <FriendList />
    </div>
    <div class="friends-right">
      <FriendProfile />
    </div>
  </div>
</template>

<script setup lang="ts">
import FriendList from '@/components/friendslist-component/FriendList.vue';
import FriendProfile from '@/components/friendslist-component/FriendProfile.vue';
</script>

<style scoped>
.container {
  display: flex;
  width: 100vw;
  margin-top: 40px;
}

.friends-left {
  display: flex;
  justify-content: center;
  align-items: center;

  flex: 1;
  width: 100%;
  height: 100%;

  background-color: inherit;
}

.friends-right {
  display: flex;
  justify-content: center;
  align-items: center;

  flex: 2;
  width: 100%;
  height: 100%;
  background-color: inherit;
}

</style>
