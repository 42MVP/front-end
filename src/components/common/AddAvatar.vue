<template>
  <div>
    <div v-if="src">
      <img :src="src" />
    </div>
    <div v-else class="circle"></div>
    <label class="labelButton">
      Upload New Avatar
      <input type="file" @change="addImage" />
    </label>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const src = ref();

const addImage = (e: Event) => {
  const [file] = (e.target as HTMLInputElement).files;
  console.log((e.target as HTMLInputElement).files);
  if (file) {
    src.value = URL.createObjectURL(file);
  }
};
</script>

<style scoped></style>
