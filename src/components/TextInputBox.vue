<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue';

const props = defineProps({
  maxLength: { type: Number, default: 0 },
  placeholderText: { type: String, default: '' },
  type: { default: '' },
});

const text = ref('');

const emits = defineEmits(['response']); // REVIEW : update:text

const isTextOver = ref(false);
watchEffect(() => {
  isTextOver.value = text.value.length >= props.maxLength;
});

const limitText = computed(() => {
  const textLimit = text.value;
  return text.value.length > props.maxLength ? textLimit : textLimit.slice(0, props.maxLength);
});
</script>

<template>
  <div class="text-input-box-container">
    <input
      :type="props.type"
      v-model="text"
      class="text-input-box"
      :placeholder="placeholderText"
      @input="emits('response', text)"
    />
    <p :class="{ 'text-input-box-counter': !isTextOver, 'text-input-box-counter-false': isTextOver }">
      {{ limitText.length }}/{{ props.maxLength }}
    </p>
  </div>
</template>

<style>
.text-input-box-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
  margin: 10px 0px 10px 0px;
}

.text-input-box {
  width: 100%;
  height: 100%;
  border: 2px solid #bcb8b1;
  border-radius: 15px;
  background-color: inherit;
  color: #463f3a;
  font-size: 24px;
  font-family: Inter;
  font-weight: 500;
  line-height: 32px;
  height: 65px;
  padding: 15px;
  outline: none;
}

.text-input-box:focus {
  border: 2px solid #8a817c;
}

.text-input-box-counter {
  color: #8a817c;
  text-align: right;
  font-size: 12px;
  font-family: Inter;
  line-height: 24px;
  width: 100%;
}

.text-input-box-counter-false {
  color: #e0afa0;
  text-align: right;
  font-size: 12px;
  font-family: Inter;
  line-height: 24px;
  width: 100%;
}
</style>
