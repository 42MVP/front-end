<template>
  <Modal title="게임 설정">
    <template #body>
      <div class="radio-button-out-div">
        <RadioButton
          :value="1"
          text="게임 옵션 1"
          @click="selectButton"
          :isActive="setActive(1)"
          style="margin: 10px"
        />
        <RadioButton
          :value="2"
          text="게임 옵션 2"
          @click="selectButton"
          :isActive="setActive(2)"
          style="margin: 10px"
        />
      </div>
    </template>
    <template #footer>
      <Button class="button-div" text="게임 찾기" @response="findGame" />
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import Modal from '@/components/Modal.vue';
import Button from '@/components/BasicButton.vue';
import RadioButton from '@/components/RadioButton.vue';

const selectedOption = ref<number>(1);

const selectButton = (index: number) => {
  selectedOption.value = index;
};

const setActive = (index: number) => {
  return selectedOption.value === index;
};

const emits = defineEmits(['response']);

const findGame = () => {
  emits('response', '매칭중'); // 대기열 등록 성공시 게임 찾기 모달로 넘어가기
};
</script>

<style scoped>
.button-div {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 100px;
}
</style>
