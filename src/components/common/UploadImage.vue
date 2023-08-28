<template>
  <div class="wrap">
    <img :src="previewImage" />
    <label>
      <BasicButton class="buttonStyle" text="Upload New Avatar" />
      <input :value="props.uploadedFile" type="file" @change="updateImg" accept="image/jpg, image/jpeg, image/png" />
    </label>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useLoginStore } from '@/stores/login.store';
import BasicButton from '@/components/BasicButton.vue';

const props = defineProps({
  uploadedFile: { type: File, default: undefined },
});

const loginStore = useLoginStore();

const previewImage = ref<string>(loginStore.avatarURL);

const emits = defineEmits<{
  (e: 'update:modelValue', image: File): void;
}>();

const updateImg = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0];

  if (file) {
    emits('update:modelValue', file);
    previewImage.value = URL.createObjectURL(file);
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
