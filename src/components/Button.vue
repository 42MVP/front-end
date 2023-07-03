<script setup lang="ts">
const props = defineProps<{
  buttonTitle: string;
}>();
</script>

<template>
  <button class="button">{{ buttonTitle }}</button>
</template>

<style>
.button {
  border-radius: 15px;
  background: var(--brown, #463f3a);
  width: 80px;
  height: 40px;
  font-size: 16px;
  color: #fff;
  cursor: pointer;
}
</style>
