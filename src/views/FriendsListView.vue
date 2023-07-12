<template>
  <main>
    <FriendList :selectedUser="selectedUser" @updateSelection="updateSelection" />
    <FriendInfo :user="getSelectedUser(selectedUser)" />
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import FriendList from '@/components/friendslist-component/FriendList.vue';
import FriendInfo from '@/components/friendslist-component/FriendInfo.vue';
import { type FriendType } from '@/components/FriendsData';

var users = ref<FriendType[]>([
  { _id: 1, name: 'chaejkim', img: '1.png', isFollow: false, isBlock: false, Level: 42, Achievement: 'Achievement1' },
  { _id: 2, name: 'kanghyki', img: '2.png', isFollow: false, isBlock: false, Level: 42, Achievement: 'Achievement1' },
  { _id: 3, name: 'hejang', img: '3.png', isFollow: false, isBlock: false, Level: 42, Achievement: 'Achievement1' },
  { _id: 4, name: 'hyeonki', img: '4.png', isFollow: false, isBlock: false, Level: 52, Achievement: 'Achievement1' },
  { _id: 5, name: 'hyeonkkim', img: '5.png', isFollow: false, isBlock: false, Level: 42, Achievement: 'Achievement1' },
]);

var selectedUser = ref<string>('');

const updateSelection = (name: string) => {
  selectedUser.value = name;
};

const getSelectedUser = (name: string) => {
  return users.value.find(user => user.name == name);
};

const removeUserFromList = (name: string) => {
  // friendsList.value.filter(friend => friend.name !== name);
  users.value.forEach((item, index) => {
    if (item.name === name) {
      users.value.splice(index, 1);
    }
  });
};
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
