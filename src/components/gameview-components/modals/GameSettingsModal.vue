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
      <Button class="button-div" text="게임 찾기" @response="findGame" @click="GameSocketService.gogoqueue()" />
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import Modal from '@/components/Modal.vue';
import Button from '@/components/BasicButton.vue';
import RadioButton from '@/components/RadioButton.vue';

import { useGameStore } from '@/stores/game.store';
import { GameSocketService } from '@/services/gameSocket.service';

const selectedOption = ref<number>(1);

const selectButton = (index: number) => {
  selectedOption.value = index;
};

const setActive = (index: number) => {
  return selectedOption.value === index;
};

const gameStore = useGameStore();

const findGame = () => {
  gameStore.setOption(selectedOption.value);
  gameStore.setStatus('매칭중');
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
