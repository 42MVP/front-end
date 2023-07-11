<template>
  <div class="wrap">
    <div class="head">
      <div class="dropdown">
        <h2 class="dropbtn">
          {{ ListType }}
          <div class="triangle-down"></div>
        </h2>
        <ul class="dropdown-content">
          <li @click="ListType = 'Blocks'">Blocks</li>
          <li @click="ListType = 'Friends'">Friends</li>
        </ul>
      </div>
    </div>
    <ul class="listBox">
      <li v-for="(friend, idx) in users" :key="idx">
        <FriendListItem
          @click="$emit('updateSelection', friend.name)"
          @removeFromList="removeFromList"
          :listType="ListType"
          :friend="friend"
          :selectedUser="props.selectedUser"
        />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import FriendListItem from './FriendListItem.vue';
import { type FriendType } from '../FriendsData';

const props = defineProps<{
  selectedUser: string;
}>();

var users = ref<FriendType[]>([
  { _id: 1, name: 'chaejkim', img: '1.png', isFollow: false, isBlock: false, Level: 42, Achievement: 'Achievement1' },
  { _id: 2, name: 'kanghyki', img: '2.png', isFollow: false, isBlock: false, Level: 42, Achievement: 'Achievement1' },
  { _id: 3, name: 'hejang', img: '3.png', isFollow: false, isBlock: false, Level: 42, Achievement: 'Achievement1' },
  { _id: 4, name: 'hyeonki', img: '4.png', isFollow: false, isBlock: false, Level: 52, Achievement: 'Achievement1' },
  { _id: 5, name: 'hyeonkkim', img: '5.png', isFollow: false, isBlock: false, Level: 42, Achievement: 'Achievement1' },
]);

const ListType = ref<string>('Friends');

const removeFromList = (name: string) => {
  users.value.filter(friend => friend.name !== name);
  users.value.forEach((item, index) => {
    if (item.name === name) {
      users.value.splice(index, 1);
    }
  });
};
</script>

<style scoped>
.wrap {
  width: 30%;
  height: 80vh;
  background-color: #f4f3ee;
  border-radius: 20px;
  user-select: none;
  position: relative;
  overflow-x: hidden;
  min-width: 380px;
}

.head {
  height: 50px;
  width: 100%;
  background-color: #8a817c;
  /* border-top-left-radius: 20px;
  border-top-right-radius: 20px; */
  padding: 0 20px;
  position: absolute;
}

.title {
  color: #fff;
}
.day-forecast {
  margin: 0.5rem;
  font-size: 1.2rem;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  z-index: 1;
  font-weight: 400;
  background-color: #f9f9f9;
  min-width: 200px;
  margin: 0;
  padding: 0;
}

.dropdown-content li {
  display: block;
  text-decoration: none;
  color: rgb(37, 37, 37);
  font-size: 20px;
  font-weight: 700;
  padding: 12px 20px;
  cursor: pointer;
}

.dropdown-content li:hover {
  color: rosybrown;
  transition: all 0.3s;
}

.dropdown:hover .dropdown-content {
  display: block;
  background-color: #ececec;
}

.dropbtn {
  height: 50px;
  background-color: #8a817c;
  color: #fff;
  font-weight: 700;
  font-size: 32px;
  cursor: pointer;
  display: flex;
  flex-flow: row;
  align-items: center;
}

.dropbtn span {
  font-size: 20px;
  font-weight: 600;
  color: #d38976;
}

.listBox {
  margin: 0;
  margin-top: 20px;
  padding: 20px;
}

.triangle-down {
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 15px solid #fff;
  margin-left: 10px;
}

ul {
  list-style-type: none;
}
</style>
