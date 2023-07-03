<template>
  <div class="p-avatar">
    <Image class="avatar" :imagePath="props.img" :imageWidth="props.img_size" :imageHeight="props.img_size" />
    <div class="name">
      <p>{{ props.user_id }}</p>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import Image from '@/components/tmp/LocalImage.vue';

const props = defineProps({
  user_id: String,
  img: String,
  img_size: {
    type: String,
    default: '270',
  },
});
</script>

<style scoped>
.p-avatar,
.p-avatar * {
  display: flex;
  flex-direction: inherit;
  align-items: center;
  justify-content: flex-start;
  position: relative;
}
.avatar {
  border-radius: 50%;
  border-style: solid;
  border-color: #000000;
  border-width: 1px;
}
.user-name {
  min-width: 492px;
  color: var(--brown, #463f3a);
}
</style>
