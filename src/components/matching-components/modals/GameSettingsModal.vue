<template>
  <MatchingBox title="게임 설정">
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
      <Button class="button-div" text="게임 찾기" @response="applyQueue" />
    </template>
  </MatchingBox>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import MatchingBox from '../MatchingBox.vue';
import Button from '@/components/BasicButton.vue';
import RadioButton from '@/components/RadioButton.vue';

import { GameMatchingService } from '@/services/gameMatching.service';

const selectedOption = ref<number>(1);

const selectButton = (index: number) => {
  selectedOption.value = index;
};

const setActive = (index: number) => {
  return selectedOption.value === index;
};

const applyQueue = async () => {
  try {
    await GameMatchingService.applyQueue();
  } catch (e) {
    alert('큐 요청 실패');
    console.warn(e);
  }
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
