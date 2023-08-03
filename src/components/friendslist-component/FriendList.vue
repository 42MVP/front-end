<template>
  <BasicListFrame>
    <template #title>{{ listType }}</template>
    <template #title-icon>
      <div class="title-icon-relative" @click="isMenu = !isMenu">
        {{ !isMenu ? '⊕' : '⊖' }}
      </div>
    </template>
    <template #title-icon-menu>
      <DropdownMenu v-if="isMenu">
        <template #dropdown-item>
          <DropdownMenuItem text="Blocks" @click="listType = 'Blocks'" />
          <DropdownMenuItem text="Friends" @click="listType = 'Friends'" />
        </template>
      </DropdownMenu>
    </template>
    <template #user-element>
      <BasicList
        :items="users"
        @chooseItem="(id : number) => $emit('updateSelection', id)"
        @clickItemSlot="removeFromList"
        #default="{ clickButton }"
      >
        <BasicButton :text="getButtonTitle()" @click="clickButton" />
      </BasicList>
    </template>
  </BasicListFrame>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { type FriendInfo } from '@/interfaces/FriendsInfo.interface';
import BasicListFrame from '@/components/BasicListFrame.vue';
import DropdownMenu from '@/components/dropdown-component/DropdownMenu.vue';
import DropdownMenuItem from '@/components/dropdown-component/DropdownMenuItem.vue';
import BasicList from '@/components/BasicList.vue';
import BasicButton from '@/components/BasicButton.vue';

const isMenu = ref(false);

var users = ref<FriendInfo[]>([
  {
    id: 1,
    name: 'chaejkim',
    avatarURL: 'https://ca.slack-edge.com/T039P7U66-U02LNN8QWJV-4c936417baf6-512',
    isFollow: false,
    isBlock: false,
    level: 42,
    achievement: 'Achievement1',
  },
  {
    id: 2,
    name: 'kanghyki',
    avatarURL: 'https://ca.slack-edge.com/T039P7U66-U035MTQ4U4T-9333cd362cf2-512',
    isFollow: false,
    isBlock: false,
    level: 42,
    achievement: 'Achievement1',
  },
  {
    id: 3,
    name: 'hejang',
    avatarURL: 'https://ca.slack-edge.com/T039P7U66-U02LA4V3351-b8f6020a843c-512',
    isFollow: false,
    isBlock: false,
    level: 42,
    achievement: 'Achievement1',
  },
  {
    id: 4,
    name: 'hyeonki',
    avatarURL: 'https://ca.slack-edge.com/T039P7U66-U02L3CLQ6S2-gadbfaa25482-512',
    isFollow: false,
    isBlock: false,
    level: 52,
    achievement: 'Achievement1',
  },
  {
    id: 5,
    name: 'hyeonkkim',
    avatarURL: 'https://ca.slack-edge.com/T039P7U66-U02LA445WF4-bee783ffc454-512',
    isFollow: false,
    isBlock: false,
    level: 42,
    achievement: 'Achievement1',
  },
]);

const removeFromList = (id: number) => {
  users.value = users.value.filter(friend => friend.id !== id);
};

const listType = ref<string>('Friends');

const getButtonTitle = () => {
  return listType.value === 'Friends' ? 'unfollow' : 'unblock';
};
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
