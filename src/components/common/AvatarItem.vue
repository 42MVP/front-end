<template>
  <div class="container">
    <img class="avatar-img" :src="props.avartarUrl || avatarURL" :style="avatarStyle" />
    <div class="nickname-div">{{ props.username }}</div>
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  username: {
    type: String,
    default: undefined,
  },
  avartarUrl: {
    type: String,
    default: undefined,
  },
  imgSize: {
    type: String,
    default: '300',
  },
});

const avatarURL = import.meta.env.VITE_APP_DEFAULT_AVATAR_URL;

const avatarStyle = {
  minWidth: `${props.imgSize}px`,
  minHeight: `${props.imgSize}px`,
  width: `${props.imgSize}px`,
  height: `${props.imgSize}px`,
};
</script>

<style scoped>
.container,
.container * {
  display: flex;
  flex-direction: inherit;
  align-items: center;
  justify-content: flex-start;
  position: relative;
}
.avatar-img {
  border-style: solid;
  border-radius: 100%;
  border-width: 1px;
  border-color: var(--base-ivory);
}
.nickname-div {
  color: var(--brown, #463f3a);
  min-width: max-content;
}
</style>
