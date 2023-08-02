<template>
  <BasicListFrame>
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
  </BasicListFrame>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { type FriendInfo } from '@/interfaces/FriendsInfo.interface';
import BasicListFrame from '@/components/BasicListFrame.vue';
import DropdownMenu from '@/components/dropdown-component/DropdownMenu.vue';
import DropdownMenuItem from '@/components/dropdown-component/DropdownMenuItem.vue';
import FriendListItem from '@/components/FriendListItem.vue';

const isMenu = ref(false);

const props = defineProps<{
  selectedUser: string;
}>();

var users = ref<FriendInfoType[]>([
  {
    _id: 1,
    name: 'chaejkim',
    img: 'https://ca.slack-edge.com/T039P7U66-U02LNN8QWJV-4c936417baf6-512',
    isFollow: false,
    isBlock: false,
    Level: 42,
    Achievement: 'Achievement1',
  },
  {
    _id: 2,
    name: 'kanghyki',
    img: 'https://ca.slack-edge.com/T039P7U66-U035MTQ4U4T-9333cd362cf2-512',
    isFollow: false,
    isBlock: false,
    Level: 42,
    Achievement: 'Achievement1',
  },
  {
    _id: 3,
    name: 'hejang',
    img: 'https://ca.slack-edge.com/T039P7U66-U02LA4V3351-b8f6020a843c-512',
    isFollow: false,
    isBlock: false,
    Level: 42,
    Achievement: 'Achievement1',
  },
  {
    _id: 4,
    name: 'hyeonki',
    img: 'https://ca.slack-edge.com/T039P7U66-U02L3CLQ6S2-gadbfaa25482-512',
    isFollow: false,
    isBlock: false,
    Level: 52,
    Achievement: 'Achievement1',
  },
  {
    _id: 5,
    name: 'hyeonkkim',
    img: 'https://ca.slack-edge.com/T039P7U66-U02LA445WF4-bee783ffc454-512',
    isFollow: false,
    isBlock: false,
    Level: 42,
    Achievement: 'Achievement1',
  },
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
