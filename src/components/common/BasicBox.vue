<template>
  <div class="box">
    <p class="top">{{ props.top }}</p>
    <p class="middle">{{ props.middle }}</p>
    <p class="bottom">{{ props.bottom }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  top: { type: String, default: undefined },
  middle: { type: String, default: 'NA' },
  bottom: { type: String, default: undefined },
});
</script>

<style scoped>
.box {
  background: var(--base-ivory, #f4f3ee);
  border-radius: 10px;
  padding: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  width: 230px;
  height: 190px;
}

.top {
  text-align: left;
  color: var(--base-gray, #bcb8b1);
  font: var(--small, 500 16px/24px 'Inter', sans-serif);
}
.middle {
  color: var(--brown, #463f3a);
  text-align: left;
  font: 700 48px 'Inter', sans-serif;
}
.bottom {
  text-align: left;
  color: var(--base-gray, #bcb8b1);
  font: var(--medium, 500 24px/32px 'Inter', sans-serif);
}
</style>
