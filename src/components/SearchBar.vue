<script lang="ts">
import DropdownMenu from '../components/dropdown-component/DropdownMenu.vue';

export default {
  emits: ['response'],
  data() {
    return {
      search_text: '',
    };
  },
  watch: {
    search_text() {
      this.$emit('response', this.search_text);
    },
  },
  props: {
    placeholderText: '',
    isMenu: false,
    icon: '',
  },
  components: {
    DropdownMenu,
  },
};
</script>

<template>
  <div class="search-bar-relative">
    <div class="search-bar-main-container">
      <div class="search-bar-icon">{{ icon }}</div>
      <input v-model="search_text" :placeholder="placeholderText" class="search-bar-input" />
    </div>
    <DropdownMenu v-if="isMenu" style="width: 100%; max-height: 300px">
      <template #dropdown-element>
        <slot name="search-bar-element" />
      </template>
    </DropdownMenu>
  </div>
</template>

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
  font-size: 24px;
  margin: 0 10px;
}

.search-bar-input {
  font-size: 16px;
  font-family: Inter;
  font-weight: 500;
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  color: #463f3a;
}
</style>
