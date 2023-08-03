<template>
  <ul class="list-container">
    <li class="list-item-container" v-for="(item, index) in props.items" :key="index">
      <BasicListItem
        :item="item"
        :style="{ cursor: clickEvent && 'pointer' }"
        :iconButtons="iconButtons"
        @click="clickEvent && emits('chooseItem', item?.id)"
        @clickIconButton="data => emits('clickIconButton', data)"
      />
      <slot />
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { User } from '@/interfaces/user/User.interface';
import type { FriendInfo } from '@/interfaces/FriendsInfo.interface';
import type { ChatInfo } from '@/interfaces/chat/ChatInfo.interface';
import type { ChatRoom } from '@/interfaces/chat/ChatRoom.interface';
import type { IconButton } from '@/interfaces/IconButton.interface';
import type { IconEmitResponse } from '@/interfaces/IconEmitResponse.interface';
import BasicListItem from '@/components/BasicListItem.vue';

type ItemsInfo = User[] | ChatInfo[] | FriendInfo[] | ChatRoom[];

const props = defineProps({
  items: { type: Object as () => ItemsInfo, defalut: [] as User[] },
  clickEvent: { type: Boolean, default: true },
  iconButtons: { type: Array<IconButton>, default: [] as IconButton[] },
});

const emits = defineEmits<{
  (e: 'chooseItem', id: number): void;
  (e: 'clickIconButton', data: IconEmitResponse): void;
}>();
</script>

<style scoped>
ul {
  list-style: none;
  padding-left: 0px;
}

.list-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.list-item-container {
  display: flex;
  align-self: stretch;
  align-items: center;
  justify-content: space-between;
  min-width: max-content;
  min-height: max-content;
  padding: 0 5px;
}

.list-item-container:hover {
  background-color: rgba(0, 0, 0, 0.05);
  transition: 0.1s ease-out;
}
</style>
