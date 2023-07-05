<script setup lang="ts">
// NOTE : unused-vars
const emits = defineEmits(['response']);
</script>

<template>
  <div class="user-main-container">
    <div class="user-top-container">
      <div class="user-list-title">
        <slot name="title"> </slot>
      </div>
      <div class="title-icon-container">
        <div class="title-icon">
          <slot name="title-icon"> </slot>
        </div>
        <div class="title-icon-menu">
          <slot name="title-icon-menu"></slot>
        </div>
      </div>
    </div>
    <div class="user-list-container">
      <slot name="user-element" />
    </div>
  </div>
</template>

<style scoped>
.user-main-container {
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 90%;
}

.user-top-container {
  width: 100%;
  padding: 20px 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #8a817c;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

.user-list-title {
  color: #f4f3ee;
  font-size: 32px;
  font-family: Inter;
  font-weight: 700;
}

.title-icon:hover {
  opacity: 0.5;
  transition: 0.1s ease-out;
}

.user-list-container {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  background-color: #f4f3ee;
  overflow: auto;
}

.title-icon-container {
  position: relative;
}

.title-icon {
  color: #f4f3ee;
  font-size: 24px;
  cursor: pointer;
}

.title-icon-menu {
  position: absolute;
}
</style>
