<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import Button from '../Button.vue';
import type { FriendType } from '../FriendsData';

const props = defineProps<{
  listType: string;
  friend: FriendType;
}>();

const getButtonTitle = () => {
  if (props.listType === 'Friends') {
    return 'unfollow';
  } else {
    return 'unblock';
  }
};

const getColor = () => {
  if (props.friend.State === 'onLine') {
    return 'green';
  } else if (props.friend.State === 'offLine') {
    return 'gray';
  } else {
    return 'red';
  }
};

const bgColor = getColor();

const stateColor = {
  color: {
    if
  }
};
</script>

<template>
  <div class="container">
    <div class="profileContent">
      <a class="profileImage"></a>
      <div class="profileText">
        <h3>{{ friend.userName }}</h3>
        <p>{{ friend.Level }} {{ friend.Achievement }}</p>
      </div>
    </div>
    <Button :buttonTitle="getButtonTitle()" @click="$emit('removeFromList', friend.userName)" />
  </div>
</template>

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
.profileImage {
  height: 70px;
  width: 70px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  position: relative;
}

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
</style>
