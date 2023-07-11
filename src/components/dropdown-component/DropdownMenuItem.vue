<script setup lang="ts">
const props = defineProps<{ text: string }>();
</script>

<template>
  <li class="drop-down-menu-item">{{ props.text }}</li>
</template>

<style scoped>
.drop-down-menu-item {
  width: 100%;
  color: #463f3a;
  font-size: 16px;
  font-family: Inter;
  font-weight: 500;
  line-height: 24px;
  padding: 10px;
  cursor: pointer;
}

.drop-down-menu-item:hover {
  background-color: rgba(0, 0, 0, 0.05);
  transition: 0.1s ease-out;
}
</style>
