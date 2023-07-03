<script lang="ts">
import Modal from '../../Modal.vue';
import BasicListElement from '../../BasicListElement.vue';
import BasicButton from '../../BasicButton.vue';
import TextInputBox from '../../TextInputBox.vue';

export default {
  emits: ['close'],
  components: {
    Modal,
    TextInputBox,
    BasicListElement,
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
  <Modal title="채널 비밀번호 입력" :show="isShow">
    <template #body>
      <TextInputBox type="password" placeholderText="비밀번호 입력" :maxLength="15" @response="e => console.log(e)" />
    </template>
    <template #footer>
      <BasicButton :type="false" text="취소" @click="showModal = false" style="margin-right: 5px" />
      <BasicButton text="확인" />
    </template>
  </Modal>
</template>

<style scoped></style>
