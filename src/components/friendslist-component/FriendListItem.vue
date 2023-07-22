<template>
  <div class="container">
    <div class="profileContent">
      <img :src="require(`@/assets/images/${friend.img}`)" />
      <div class="profileText">
        <h3>{{ friend.name }}</h3>
        <p>[{{ friend.Level }}] {{ friend.Achievement }}</p>
      </div>
    </div>
    <BasicButton :text="getButtonTitle()" @click="$emit('removeFromList', friend.name)" />
  </div>
</template>

<script setup lang="ts">
import BasicButton from '@/components/BasicButton.vue';
import type { FriendInfoType } from '@/interfaces/FriendsInfo.interface';

const props = defineProps<{
  listType: string;
  friend: FriendInfoType;
  selectedUser: string;
}>();

const getButtonTitle = () => {
  if (props.listType === 'Friends') {
    return 'unfollow';
  } else {
    return 'unblock';
  }
};

// const getColor = () => {
//   if (props.friend.State === 'onLine') {
//     return 'green';
//   } else if (props.friend.State === 'offLine') {
//     return 'gray';
//   } else {
//     return 'red';
//   }
// };
</script>

<style scoped>
.profileContent {
  display: flex;
  align-items: center;
}

.container {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin: 30px 0px 3px 3px;
}
/* .profileImage {
  height: 70px;
  width: 70px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  position: relative;
} */

.profileImage::after {
  display: block;
  content: '';
  position: absolute;
  right: 0;
  top: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: green;
}
.profileText {
  color: #000;
  line-height: 1.5;
  margin-left: 10px;
}

image {
  width: 50px;
  height: 50px;
}

h3 {
  font-weight: 600;
  cursor: pointer;
}
</style>
