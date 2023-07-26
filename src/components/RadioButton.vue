<template>
  <div class="radio-button-container">
    <div @click="emits('click', props.value || props.text)" :class="className" />
    <p>{{ text }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  value: { type: Number, default: null },
  text: { type: String, default: '' },
  isActive: {
    default: false,
  },
});

const emits = defineEmits(['click']);

const className = computed(() => [{ 'radio-button': !props.isActive }, { 'radio-button-click': props.isActive }]);
</script>

<style>
.radio-button-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.radio-button {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: inherit;
  margin-right: 10px;
  cursor: pointer;
  outline: 1px solid #463f3a;
}

.radio-button:hover {
  outline: 1px solid tomato;
  transition: 0.1s ease-out;
}

.radio-button-click {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: inherit;
  margin-right: 10px;
  cursor: pointer;
  border: 8px solid tomato;
  outline: 1px solid #463f3a;
}

.radio-button-container p {
  color: var(--brown, #463f3a);
  font: var(--small);
}
</style>
