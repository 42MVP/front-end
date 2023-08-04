<template>
  <Transition name="modal">
    <div v-if="props.show" class="modal-mask">
      <div class="modal-container">
        <div class="modal-header">{{ props.title }}</div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer">
          <slot name="footer"></slot>
        </div>
      </div>
      <div class="top-container">
        <slot name="top"></slot>
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

<style>
.modal-mask {
  position: fixed;
  z-index: 9997;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-container {
  border-radius: 15px;
  border: 1px solid #463f3a;
  background: #f4f3ee;
  margin: auto;
  padding: 20px 35px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header {
  color: var(--brown, #463f3a);
  font: var(--large);
  font-weight: 700;
}
.modal-body {
  margin: 20px 0;
  white-space: pre-wrap;
  color: var(--brown, #463f3a);
}

.modal-footer {
  display: flex;
  align-items: center;
  justify-content: right;
  width: 100%;
}

.top-container {
  z-index: 9998;

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

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
