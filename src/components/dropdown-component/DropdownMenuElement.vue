<script lang="ts">
export default {
  props: {
    text: '',
  },
};
</script>

<template>
  <li class="drop-down-menu-element">{{ text }}</li>
</template>

<style>
.drop-down-menu-element {
  width: 100%;
  color: #463f3a;
  font-size: 16px;
  font-family: Inter;
  font-weight: 500;
  line-height: 24px;
  padding: 10px;
  cursor: pointer;
}

.drop-down-menu-element:hover {
  background-color: rgba(0, 0, 0, 0.05);
  transition: 0.1s ease-out;
}
</style>
