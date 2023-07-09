<script lang="ts">
export default {
  emits: ['response'],
  props: {
    text: '',
    type: {
      default: true,
    },
  },
};
</script>
<template>
  <div
    :style="{ backgroundColor: type ? '#463f3a' : '#f4f3ee' }"
    class="basic-button-container"
    @click="this.$emit('response', 'clicked')"
  >
    <p :style="{ color: type ? '#f4f3ee' : '#463f3a' }">{{ text }}</p>
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
  color: #f4f3ee;
}
</style>
