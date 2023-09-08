<!-- :checked="value" -->

<template>
  <div class="switch-container">
    <label :class="className" tabindex="0" role="checkbox" @keydown.space.prevent="keyToggle">
      <input
        type="checkbox"
        class="v-switch-input"
        :name="name"
        :checked="value"
        v-model="toggled"
        :disabled="disabled"
        @change.stop="toggle"
      />
      <div class="v-switch-core" :style="coreStyle">
        <div class="v-switch-button" :style="buttonStyle" />
      </div>
    </label>
    <span class="label-text">{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const DEFAULT_COLOR_CHECKED = '#FFF';
const DEFAULT_COLOR_UNCHECKED = '#D9D9D9';
const DEFAULT_SWITCH_COLOR = '#ADE0A0';
const DEFAULT_SWITCH_COLOR_UNCHECKED = '#E0AFA0';

// const DEFAULT_COLOR_CHECKED = '#ADE0A0';
// const DEFAULT_COLOR_UNCHECKED = '#E0AFA0';
// const DEFAULT_SWITCH_COLOR = '#FFF';
// const DEFAULT_SWITCH_COLOR_UNCHECKED = '#FFF';

const props = defineProps({
  value: { type: Boolean, default: false },
  name: String,
  disabled: { type: Boolean, default: false },
  speed: { type: Number, default: 300 },
  height: { type: Number, default: 22 },
  width: { type: Number, default: 50 },
  label: { type: String, default: '' },
});

const toggled = ref<boolean>(!!props.value);

const emits = defineEmits(['input', 'change']);

const className = computed(() => [
  'vue-js-switch',
  {
    toggled: toggled.value,
    disabled: props.disabled,
  },
]);

const coreStyle = computed(() => ({
  width: px(props.width),
  height: px(props.height),
  backgroundColor: toggled.value ? DEFAULT_COLOR_CHECKED : DEFAULT_COLOR_UNCHECKED,
  borderRadius: px(Math.round(props.height / 2)),
  borderColor: toggled.value ? DEFAULT_SWITCH_COLOR : DEFAULT_SWITCH_COLOR_UNCHECKED,
}));

const distance = () => px(props.width - props.height);

const buttonStyle = computed(() => {
  const transition = `transform ${props.speed}ms`;
  const offset = px('-1');
  const transform = toggled.value ? translate(distance(), offset) : translate(offset, offset);
  const background = toggled.value ? DEFAULT_SWITCH_COLOR : DEFAULT_SWITCH_COLOR_UNCHECKED;

  return {
    width: px(props.height),
    height: px(props.height),
    transition,
    transform,
    background,
  };
});

const keyToggle = (event: Event) => {
  if (props.disabled) {
    return;
  }
  toggle(event);
};

const toggle = (event: Event) => {
  const newValue = !toggled.value;
  toggled.value = newValue;
  emits('input', newValue);
  emits('change', { value: newValue, srcEvent: event });
};

// onMounted(() => {
//   toggled.value = !!props.value;
// });

const px = (value: unknown) => {
  return `${value}px`;
};

const translate = (x: string, y: string) => {
  return `translate(${x}, ${y})`;
};
</script>

<style scoped>
.switch-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}


.vue-js-switch {
  cursor: pointer;
  justify-self: start;
}

.vue-js-switch .v-switch-input {
    opacity: 1;
    position: absolute;
    width: 0;
    height: 0;
  }

.vue-js-switch .v-switch-core {
    display: block;
    position: relative;
    box-sizing: border-box;

    border-style: solid;

    /* transition: border-color 0.3s, background-color 0.3s; */
    user-select: none;
}

.vue-js-switch .v-switch-core .v-switch-button {
      display: block;
      overflow: hidden;

      border-radius: 100%;
      z-index: 2;
    }

.label-text {
  color: var(--brown, #463f3a);
  font: var(--small, 500 16px/24px 'Inter', sans-serif);
}
</style>
