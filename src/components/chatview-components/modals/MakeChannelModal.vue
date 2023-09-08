<template>
  <Modal title="채널 생성" :show="props.isShow">
    <template #body>
      <TextInputBox placeholderText="채팅방 이름 입력" :maxLength="15" @response="e => (roomName = e)" />
      <div class="radio-button-out-div">
        <RadioButton :value="1" text="public" @click="selectButton" :isActive="setActive(1)" />
        <RadioButton :value="2" text="protected" @click="selectButton" :isActive="setActive(2)" />
        <RadioButton :value="3" text="private" @click="selectButton" :isActive="setActive(3)" />
      </div>
      <div v-if="setActive(2)">
        <TextInputBox type="password" placeholderText="비밀번호 입력" :maxLength="15" @response="e => (password = e)" />
        <TextInputBox
          type="password"
          placeholderText="비밀번호 입력 확인"
          :maxLength="15"
          :prevPassword="password"
          @response="e => (password2th = e)"
        />
      </div>
    </template>
    <template #footer>
      <BasicButton :type="false" text="취소" @click="emits('close')" style="margin-right: 5px" />
      <BasicButton
        text="확인"
        @click="
          createRoom();
          emits('close');
        "
      />
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import Modal from '@/components/Modal.vue';
import BasicButton from '@/components/BasicButton.vue';
import RadioButton from '@/components/RadioButton.vue';
import TextInputBox from '@/components/TextInputBox.vue';

import type { ChatRoomCreateChannel } from '@/interfaces/chat/ChatRoom.interface';
import { useChatStore } from '@/stores/chat.store';
import { useLoginStore } from '@/stores/login.store';
import { useModalStore } from '@/stores/modal.store';

const emits = defineEmits(['close']);
const props = defineProps<{ isShow: boolean }>();

const mode: Record<number, string> = {
  1: 'PUBLIC',
  2: 'PROTECTED',
  3: 'PRIVATE',
};
const selectedMode = ref<number>(1);

const selectButton = (index: number) => {
  selectedMode.value = index;
};

const setActive = (index: number) => {
  return selectedMode.value === index;
};

const roomName = ref<string>('');
const password = ref<string>('');
const password2th = ref<string>('');

const chatStore = useChatStore();
const loginStore = useLoginStore();
const modalStore = useModalStore();

const createRoom = async () => {
  if (mode[selectedMode.value] === 'PROTECTED') {
    if (!password.value) {
      modalStore.notify('패스워드 필요');
      return;
    }
    if (password.value !== password2th.value) {
      modalStore.notify('패스워드 불일치');
      return;
    }
  }
  const chatRoom: ChatRoomCreateChannel = {
    roomName: roomName.value,
    roomMode: mode[selectedMode.value],
    password: password.value,
  };
  chatStore.createRoom(chatRoom, true, loginStore.owner);
};
</script>

<style scoped>
.radio-button-out-div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 24px;
  padding: 0px 10px;
}
</style>
