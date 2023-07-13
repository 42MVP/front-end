<template>
  <div class="chat-input-box-container">
    <input
      v-on:keypress.enter="sendEvent()"
      class="chat-input-box-input"
      v-model="text"
      placeholder="메세지를 입력해주세요"
    />
    <p :style="{ color: text.length >= maxLength ? '#e0afa0' : '#463f3a' }" class="chat-input-box-counter">
      {{ text.length }}/{{ maxLength }}
    </p>
    <BasicButton @click="sendEvent()" text="버튼" />
  </div>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue';
import BasicButton from '@/components/BasicButton.vue';

const text = ref<string>('');
const emits = defineEmits(['response']);
const props = defineProps<{ maxLength: number }>();

watch(text, () => {
  if (text.value.length > props.maxLength) {
    text.value = text.value.slice(0, props.maxLength);
  }
});

const sendEvent: Function = () => {
  if (text.value.length > 0) {
    emits('response', text.value);
    text.value = '';
  }
};
</script>

<style scoped>
.chat-input-box-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  padding: 0 0px;
}

.chat-input-box-container input {
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  color: var(--brown, #463f3a);
  font: var(--medium);
}

.chat-input-box-container p {
  color: var(--semi-brown, #8a817c);
  font: var(--small);
  text-align: right;
  margin-right: 20px;
}
</style>
