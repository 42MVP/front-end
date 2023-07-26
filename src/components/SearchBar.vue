<template>
  <div class="search-bar-relative">
    <div class="search-bar-main-container">
      <div class="search-bar-icon">{{ props.icon }}</div>
      <input
        v-model="search_text"
        :placeholder="props.placeholderText"
        class="search-bar-input"
        @input="emits('response', search_text)"
      />
    </div>
    <DropdownMenu v-if="props.isMenu" style="width: 100%; max-height: 300px">
      <template #dropdown-item>
        <slot name="search-bar-item" />
      </template>
    </DropdownMenu>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DropdownMenu from '@/components/dropdown-component/DropdownMenu.vue';

const props = defineProps({
  placeholderText: { type: String, default: '' },
  isMenu: { default: false },
  icon: { default: '' },
});

const emits = defineEmits(['response']); // REVIEW : update:search_text

const search_text = ref('');
</script>

<style>
.search-bar-relative {
  position: relative;
}

.search-bar-main-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 400px;
  height: 45px;
  border-radius: 4px;
  border: 1px solid #463f3a;
  background-color: white;
}

.search-bar-icon {
  font: var(--medium);
  margin: 0 10px;
}

.search-bar-input {
  font: var(--small);
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  color: var(--brown, #463f3a);
}
</style>
