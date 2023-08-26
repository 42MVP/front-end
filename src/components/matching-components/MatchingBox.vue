<template>
  <Transition name="modal">
    <div class="box-container">
      <div class="box-header">{{ props.title }}</div>
      <div class="box-body">
        <slot name="body"></slot>
      </div>
      <div class="box-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
// TODO : mv Modal.vue BasicModal.vue
const props = defineProps({
  title: { type: String, default: '' },
  show: {
    type: Boolean,
    default: true,
  },
});
</script>

<style scoped>
.box-container {
  border-radius: 15px;
  border: 1px solid #463f3a;
  background: #f4f3ee;
  margin: auto;
  padding: 20px 35px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.box-header {
  color: var(--brown, #463f3a);
  font: var(--large);
  font-weight: 700;
}
.box-body {
  margin: 20px 0;
  white-space: pre-wrap;
  color: var(--brown, #463f3a);
}

.box-footer {
  display: flex;
  align-items: center;
  justify-content: right;
  width: 100%;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .box-container,
.modal-leave-to .box-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
