<script lang="ts">
import Modal from '../../Modal.vue';
import BasicButton from '../../BasicButton.vue';

export default {
  emits: ['close', 'submit'],
  components: {
    Modal,
    BasicButton,
  },
  data() {
    return {};
  },
  props: {
    isShow: {
      default: false,
    },
  },
};
</script>

<template>
  <Modal title="비밀번호 해제" :show="isShow">
    <template #body> 채팅방이 public으로 설정됩니다. </template>
    <template #footer>
      <BasicButton :type="false" text="취소" @click="$emit('close')" style="margin-right: 5px" />
      <BasicButton text="확인" @click="$emit('submit')" />
    </template>
  </Modal>
</template>

<style scoped></style>
