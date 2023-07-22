<template>
  <div class="wrap">
    <img :src="loginStore.avatarURL" />
    <label>
      <BasicButton class="buttonStyle" text="Upload New Avatar" />
      <input type="file" @change="addImage" accept="image/*" />
    </label>
  </div>
</template>

<script setup lang="ts">
import { useLoginStore } from '@/stores/login.store';
import BasicButton from '@/components/BasicButton.vue';

const loginStore = useLoginStore();

const addImage = (e: Event) => {
  const file = (e.target as HTMLInputElement).files;
  console.log((e.target as HTMLInputElement).files);
  if (file) {
    // TOOD: post -> get/set avatarURL
    loginStore.avatarURL = URL.createObjectURL(file[0]);
  }
};
</script>

<style scoped>
.buttonStyle {
  width: 180px;
  height: 50px;
  margin-top: 10px;
}
.wrap {
  display: flex;
  flex-flow: column;
  align-items: center;
}

input[type='file'] {
  display: none;
}

img {
  width: 340px;
  height: 340px;
  border-radius: 50%;
}
</style>
