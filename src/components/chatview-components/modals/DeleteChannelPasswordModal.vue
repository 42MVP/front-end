<template>
  <Modal title="비밀번호 해제" :show="props.isShow">
    <template #body> 채팅방이 public으로 설정됩니다. </template>
    <template #footer>
      <BasicButton :type="false" text="취소" @click="emits('close')" style="margin-right: 5px" />
      <BasicButton text="확인" @click="emits('submit')" />
    </template>
  </Modal>
</template>

<script setup lang="ts">
import Modal from '@/components/Modal.vue';
import BasicButton from '@/components/BasicButton.vue';

const emits = defineEmits(['close', 'submit']);
const props = defineProps<{ isShow: boolean }>();
</script>

<style scoped></style>
