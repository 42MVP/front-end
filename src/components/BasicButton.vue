<script setup lang="ts">
const props = defineProps({
  text: { type: String, default: '' },
  type: {
    default: true,
  },
});

const emits = defineEmits(['response']);

const onClick = () => {
  // NOTE : 부모에 넘겨줄 데이터
  emits('response', { text: props.text, type: props.type });
};
</script>

<template>
  <div :style="{ backgroundColor: type ? '#463f3a' : '#f4f3ee' }" class="basic-button-container" @click="onClick">
    <p :style="{ color: props.type ? '#f4f3ee' : '#463f3a' }">{{ props.text }}</p>
  </div>
</template>

<style scoped>
.basic-button-container {
  display: flex;
  justify-content: center;
  align-content: center;
  cursor: pointer;
  padding: 0 18px;
  white-space: nowrap;
  height: 35px;
  border-radius: 15px;
  background: #463f3a;
}

.basic-button-container:hover {
  opacity: 0.5;
  transition: 0.1s ease-out;
}

.basic-button-container p {
  margin: auto 0;
  font-size: 16px;
  font-family: Inter;
  font-weight: 700;
  line-height: 24px;
  color: var(--base-ivory, #f4f3ee);
}
</style>
