<script lang="ts">
import Modal from '../../Modal.vue';
import BasicButton from '../../BasicButton.vue';
import TextInputBox from '../../TextInputBox.vue';

export default {
  emits: ['close', 'submit'],
  components: {
    Modal,
    TextInputBox,
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
  <Modal title="비밀번호 변경" :show="isShow">
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
      <BasicButton :type="false" text="취소" @click="$emit('close')" style="margin-right: 5px" />
      <BasicButton text="확인" @click="$emit('submit')" />
    </template>
  </Modal>
</template>

<style scoped></style>
