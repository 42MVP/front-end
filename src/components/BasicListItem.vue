<template>
  <li class="list-element-container">
    <div v-if="'state' in props.item" class="indicator-dot-container">
      <div v-if="props.item.state === UserStateString.ONLINE" class="indicator-dot" />
      <div
        v-else-if="props.item.state === UserStateString.IN_GAME"
        class="indicator-dot"
        style="background-color: yellow"
      />
      <div
        v-else-if="props.item.state === UserStateString.FIND_GAME"
        class="indicator-dot"
        style="background-color: blue"
      />
      <div v-else class="indicator-dot" style="background-color: gray" />
      {{ props.item.state }}
    </div>
    <div class="list-element-info-container">
      <div v-if="'avatarURL' in props.item" class="list-element-avatar profileText">
        <AvatarItem :avartarUrl="props.item.avatarURL" imgSize="40" />
      </div>
      <div>
        <span>{{ props.item?.name }}</span>
        <p v-if="'level' in props.item">[{{ props.item?.level }}]</p>
      </div>
    </div>
    <div class="list-element-icon-container">
      <button
        v-for="(iconButton, index) in iconButtons"
        :key="index"
        @click="e => onClick(e, props.item.id, iconButton.event)"
      >
        {{ iconButton.emoji }}
      </button>
    </div>
  </li>
</template>

<script setup lang="ts">
import AvatarItem from '@/components/common/AvatarItem.vue';
import type { IconButton } from '@/interfaces/IconButton.interface';
import type { IconEmitResponse } from '@/interfaces/IconEmitResponse.interface';
import { UserStateString, type OthersInfo } from '@/interfaces/FriendsInfo.interface';
import type { User } from '@/interfaces/user/User.interface';
import type { ChatInfo } from '@/interfaces/chat/ChatInfo.interface';
import type { ChatRoom } from '@/interfaces/chat/ChatRoom.interface';

type ItemInfo = User | ChatInfo | OthersInfo | ChatRoom;

const props = defineProps({
  itemKey: { type: Number, default: -1 },
  item: { type: Object as () => ItemInfo, default: {} as OthersInfo },
  clickEvent: { type: String, default: '' },
  iconButtons: { type: Array<IconButton>, default: [] as IconButton[] },
});

const emits = defineEmits<{
  (e: 'onMousePosition', event: MouseEvent): void;
  (e: 'clickIconButton', data: IconEmitResponse): void;
}>();

const onClick = (event: MouseEvent, id: number, iconEvent: string) => {
  if (iconEvent === 'ONMUTE') {
    emits('onMousePosition', event);
  }
  emits('clickIconButton', { id: id, eventName: iconEvent });
};
</script>

<style scoped>
.list-element-container {
  position: relative;
  display: flex;
  flex: none;
  justify-content: space-between;
  align-self: stretch;
  height: 80px;
  flex: 1;
}

.list-element-info-container {
  cursor: pointer;
  display: flex;
  align-items: center;
}

.list-element-info-container span {
  display: flex;
  align-items: center;
  color: var(--brown, #463f3a);
  font: var(--small);
  height: fit-content;
}

.list-element-avatar {
  position: relative;
  display: flex;
  height: fit-content;
  align-items: center;
  margin-right: 15px;
  margin-left: 15px;
}

.list-element-avatar p {
  position: absolute;
  top: -6px;
  left: -6px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: var(--base-pink, #e0afa0);
  font-size: 10px;
  color: var(--base-ivory, #f4f3ee);
  font-weight: 700;
  width: 22px;
  height: 22px;
}

.list-element-avatar img {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 40px;
  height: 40px;
}

.list-element-icon-container {
  display: flex;
  align-items: center;
  justify-content: right;
  margin-right: 15px;
}

.list-element-icon-container button {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  width: 20px;
  height: 20px;
  border-radius: 10%;
  border: none;
  background-color: inherit;
  cursor: pointer;
  margin-left: 10px;
}

.list-element-icon-container button:hover {
  opacity: 0.5;
  transition: 0.1s ease-out;
}

.indicator-dot-container {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 3px;
  left: 3px;
  font-size: 12px;
}

.indicator-dot {
  opacity: 0.3;
  width: 10px;
  height: 10px;
  border-radius: 30%;
  background-color: green;
  margin-right: 5px;
}
</style>
