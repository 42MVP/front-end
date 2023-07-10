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

const text = ref('');
const emits = defineEmits(['response']);
const props = defineProps({
  maxLength: { type: Number, default: 0 },
});

watch(text, () => {
  if (text.value.length > props.maxLength) {
    text.value = text.value.slice(0, props.maxLength);
  }
});

function sendEvent() {
  if (text.value.length > 0) {
    emits('response', text.value);
    text.value = '';
  }
}
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
  color: #463f3a;
  font-size: 24px;
  font-family: Inter;
  font-weight: 500;
}

.chat-input-box-container p {
  color: #8a817c;
  text-align: right;
  font-size: 12px;
  font-family: Inter;
  line-height: 24px;
  letter-spacing: -0.176px;
  margin-right: 20px;
}
</style>
