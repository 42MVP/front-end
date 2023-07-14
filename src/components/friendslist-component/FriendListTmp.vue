<template>
  <BasicList>
    <template #title>{{ ListType }}</template>
    <template #title-icon>
      <div class="title-icon-relative" @click="isMenu = !isMenu">
        {{ !isMenu ? '⊕' : '⊖' }}
      </div>
    </template>
    <template #title-icon-menu>
      <DropdownMenu v-if="isMenu">
        <template #dropdown-item>
          <DropdownMenuItem text="Blocks" @click="ListType = 'Blocks'" />
          <DropdownMenuItem text="Friends" @click="ListType = 'Friends'" />
        </template>
      </DropdownMenu>
    </template>
    <template #user-element>
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
    </template>
  </BasicList>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { type FriendType } from '../FriendsData';
import BasicList from '../BasicList.vue';
import DropdownMenu from '../dropdown-component/DropdownMenu.vue';
import DropdownMenuItem from '../dropdown-component/DropdownMenuItem.vue';
import FriendListItem from '@/components/friendslist-component/FriendListItem.vue';

const isMenu = ref(false);

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

const removeFromList = (name: string) => {
  users.value.forEach((item, index) => {
    if (item.name === name) {
      users.value.splice(index, 1);
    }
  });
  // users.value.forEach
};

const ListType = ref<string>('Friends');
</script>

<style scoped>
.listBox {
  margin: 0;
  padding: 0px 20px 20px 10px;
}
.title-icon-relative {
  position: relative;
}

ul {
  list-style-type: none;
}
</style>
