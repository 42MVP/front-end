<template>
  <li class="drop-down-menu-item">{{ props.text }}</li>
</template>

<script setup lang="ts">
const props = defineProps<{ text: string }>();
</script>

<style scoped>
.drop-down-menu-item {
  width: 100%;
  color: var(--brown, #463f3a);
  font: var(--small);
  padding: 10px;
  cursor: pointer;
}

.drop-down-menu-item:hover {
  background-color: rgba(0, 0, 0, 0.05);
  transition: 0.1s ease-out;
}
</style>
