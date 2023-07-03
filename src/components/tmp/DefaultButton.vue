<template>
  <div class="c-button">
    <p class="label">{{ props.label }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  label: { type: String, default: '버튼' },
});
</script>

<style scoped>
.c-button {
  min-width: 65px;
  min-height: 39px;
  padding: 0 10px;
  border-radius: 15px;
  background: var(--brown, #463f3a);
  color: #463f3a;
  
  cursor: pointer;
}

.label {
  color: var(--base-ivory, #f4f3ee);
  text-align: center;
  font-size: 16px;
  font-family: Inter;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: -0.176px;
}
</style>
