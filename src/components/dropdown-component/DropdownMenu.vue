<script lang="ts"></script>

<template>
  <ul class="drop-down-menu-container">
    <slot name="dropdown-element"></slot>
  </ul>
</template>

<style>
.drop-down-menu-container {
  z-index: 1000;
  list-style-type: none;
  position: absolute;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 0;
  border: 1px solid #8A817C;
  background-color: #F4F3EE;
  max-height: 500px;
  overflow: auto;
}
</style>
