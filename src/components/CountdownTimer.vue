<template>
  <div :class="{ 'formatted-timde-div': true, 'small-font': props.fontSize === 'small' ? true : false }">
    {{ formattedTime }}
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  targetTime: { type: Date, default: new Date() },
  timeoutMessage: { type: String },
  fontSize: { type: String, default: 'extra-large' },
});

const emits = defineEmits(['timeout']);

const formattedTime = ref<String>();

const getTimeDifference = (targetTime: Date) => {
  const now = new Date();
  return targetTime.getTime() - now.getTime();
};

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const updateFormattedTime = (targetTime: Date) => {
  const timeDifference = getTimeDifference(targetTime);
  timeDifference < 1 ? emits('timeout', props.timeoutMessage) : (formattedTime.value = formatTime(timeDifference + 1));
  // console.log('updateTimer', targetTime.getUTCMinutes(), ':', targetTime.getUTCSeconds());
};

onMounted(() => {
  updateFormattedTime(props.targetTime);
  const timer = setInterval(updateFormattedTime, 1000, props.targetTime);
  onBeforeUnmount(() => {
    clearInterval(timer);
  });
});
</script>

<style scoped>
.formatted-timde-div {
  display: flex;
  align-items: center;
  justify-content: center;
  font: var(--extra-large);
  font-weight: bolder;
}
.small-font {
  font: var(--small);
}
</style>
