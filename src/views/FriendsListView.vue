<template>
  <main>
    <FriendList @updateSelection="updateSelection" />
    <FriendProfile :user="getSelectedUser" />
  </main>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import FriendList from '@/components/friendslist-component/FriendList.vue';
import FriendProfile from '@/components/friendslist-component/FriendProfile.vue';
import type { FriendInfo } from '@/interfaces/FriendsInfo.interface';

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

var selectedUser = ref<FriendInfo | undefined>();

const updateSelection = (id: number) => {
  selectedUser.value = users.value.find(user => user.id == id);
};

const getSelectedUser = computed(() => {
  return selectedUser.value;
});
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
