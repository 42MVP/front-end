<template>
  <div class="wrap">
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

<style scoped>
.wrap {
  display: flex;
  flex-flow: column;
  align-items: center;
}
.labelButton {
  background-color: #463f3a;
  color: #fff;
  border-radius: 10px 10px 10px 10px;
  padding: 10px;
  width: 170px;
  height: 45px;
  margin-top: 10px;
}
input[type='file'] {
  display: none;
}

.circle {
  background-color: gray;
  border-radius: 50%;
  width: 340px;
  height: 340px;
}

img {
  width: 340px;
  height: 340px;
  border-radius: 50%;
}
</style>
