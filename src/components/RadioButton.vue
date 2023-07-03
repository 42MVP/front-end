<script lang="ts">
export default {
  emits: ['click'],
  props: {
    text: '',
    isActive: false,
  },
};
</script>

<template>
  <div class="radio-button-container">
    <div @click="$emit('click')" :class="{ 'radio-button': !isActive, 'radio-button-click': isActive }" />
    <p>{{ text }}</p>
  </div>
</template>

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
  color: #463f3a;
  font-size: 16px;
  font-family: Inter;
  font-weight: 500;
  line-height: 24px;
}
</style>
