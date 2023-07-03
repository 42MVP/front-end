<script lang="ts">
import { IIconButton } from '../interfaces/IconButton.interface';

export default {
  emits: ['response'],
  props: {
    id: 0,
    alertCount: 0,
    clickEvent: '',
    avatarURL: {
      type: String,
      default: '',
    },
    name: '',
    iconButtons: [] as IIconButton[],
  },
};
</script>

<template>
  <li class="list-element-container">
    <div
      class="list-element-info-container"
      :style="{ cursor: clickEvent && 'pointer' }"
      @click="clickEvent && this.$emit('response', `${id}:${clickEvent}`)"
    >
      <div class="list-element-avatar">
        <p v-if="alertCount > 0">{{ alertCount > 99 ? '99+' : alertCount }}</p>
        <img :src="avatarURL !== '' ? avatarURL : ''" />
      </div>
      <span :style="{ fontWeight: alertCount > 0 && '700' }">{{ name }}</span>
    </div>
    <div class="list-element-icon-container">
      <button
        v-for="iconButton in iconButtons"
        :key="iconButton.id"
        @click="this.$emit('response', `${id}:${iconButton.event}`)"
      >
        {{ iconButton.emoji }}
      </button>
    </div>
  </li>
</template>

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
  color: #463f3a;
  font-size: 16px;
  font-weight: 500;
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
  background-color: #e0afa0;
  font-size: 10px;
  color: #f4f3ee;
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
