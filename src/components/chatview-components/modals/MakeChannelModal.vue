<script lang="ts">
import Modal from '../../Modal.vue';
import SearchBar from '../../SearchBar.vue';
import BasicButton from '../../BasicButton.vue';
import RadioButton from '../../RadioButton.vue';
import TextInputBox from '../../TextInputBox.vue';

export default {
  emits: ['close'],
  components: {
    Modal,
    SearchBar,
    BasicButton,
    RadioButton,
    TextInputBox,
  },
  data() {
    return {
      button: 1,
    };
  },
  props: {
    isShow: {
      default: false,
    },
  },
};
</script>

<template>
  <Modal title="채널 생성" :show="isShow">
    <template #body>
      <TextInputBox placeholderText="채팅방 이름 입력" :maxLength="15" @response="e => console.log(e)" />
      <div class="radio-button-out-div">
        <RadioButton text="public" @click="button = 1" :isActive="button === 1" />
        <RadioButton text="protected" @click="button = 2" :isActive="button === 2" />
        <RadioButton text="private" @click="button = 3" :isActive="button === 3" />
      </div>
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
      <BasicButton text="확인" />
    </template>
  </Modal>
</template>

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
