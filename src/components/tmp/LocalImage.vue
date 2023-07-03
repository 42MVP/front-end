<template><img class="local_img" :src="logo" :width="imageWidth" :height="imageHeight" /></template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';

const props = defineProps({
  imagePath: { type: String, default: 'profile_0.png' },
  imageWidth: { type: String, default: '100' },
  imageHeight: { type: String, default: '100' },
});

const logo = ref();
watchEffect(async () => {
  logo.value = (await import(/* @vite-ignore */ `../../assets/images/${props.imagePath}`)).default;
});
</script>
