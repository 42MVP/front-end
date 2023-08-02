<template>
  <li class="list-element-container">
    <div
      class="list-element-info-container"
      :style="{ cursor: clickEvent && 'pointer' }"
      @click="clickEvent && onClick(props.id, clickEvent)"
    >
      <div class="list-element-avatar">
        <p v-if="alertCount > 0">{{ alertCount > 99 ? '99+' : alertCount }}</p>
        <img :src="avatarURL !== '' ? avatarURL : ''" />
      </div>
      <span :style="{ fontWeight: alertCount > 0 ? '700' : undefined }">{{ name }}</span>
    </div>
    <div class="list-element-icon-container">
      <button v-for="(iconButton, index) in iconButtons" :key="index" @click="onClick(props.id, iconButton.event)">
        {{ iconButton.emoji }}
      </button>
    </div>
  </li>
</template>

<script setup lang="ts">
import type { IconButton } from '@/interfaces/IconButton.interface';
import type { EmitResponse } from '@/interfaces/EmitResponse.interface';

const props = defineProps({
  id: { type: Number, default: 0 },
  alertCount: { type: Number, default: 0 },
  clickEvent: { default: '' },
  avatarURL: {
    type: String,
    default: '',
  },
  name: { type: String, default: '' },
  iconButtons: { type: Array<IconButton>, default: [] as IconButton[] },
});

const emits = defineEmits(['response']);

const onClick = (id: number, iconEvent: string) => {
  emits('response', { id: id, eventName: iconEvent } as EmitResponse);
};
</script>

<style scoped>
.list-element-container {
  display: flex;
  flex: none;
  justify-content: space-between;
  justify-content: center;
  width: 100%;
  height: 80px;
}

.list-element-container:hover {
  background-color: rgba(0, 0, 0, 0.05);
  transition: 0.1s ease-out;
}

.list-element-info-container {
  cursor: pointer;
  display: flex;
  align-items: center;
  flex: 1;
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
</style>
