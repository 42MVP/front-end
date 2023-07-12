<template>
  <Modal title="비밀번호 설정" :show="props.isShow">
    <template #body>
      <TextInputBox type="password" placeholderText="비밀번호 입력" :maxLength="15" @response="e => console.log(e)" />
      <TextInputBox
        type="password"
        placeholderText="비밀번호 입력 확인"
        :maxLength="15"
        @response="e => console.log(e)"
      />
    </template>
    <template #footer>
      <BasicButton :type="false" text="취소" @click="emits('close')" style="margin-right: 5px" />
      <BasicButton text="확인" @click="emits('submit')" />
    </template>
  </Modal>
</template>

<script setup lang="ts">
import Modal from '@/components/Modal.vue';
import BasicButton from '@/components/BasicButton.vue';
import TextInputBox from '@/components/TextInputBox.vue';

const emits = defineEmits(['close', 'submit']);
const props = defineProps<{ isShow: boolean }>();
</script>

<style scoped></style>
