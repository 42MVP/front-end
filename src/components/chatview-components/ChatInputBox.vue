<script>
import BasicButton from '../BasicButton.vue';

export default {
  emits: ['response'],
  data() {
    return {
      text: '',
      buttonEvent: '',
    };
  },
  components: {
    BasicButton,
  },
  props: {
    maxLength: 0,
  },
  computed: {
    limitText() {
      if (this.text.length > this.maxLength) {
        this.text = this.text.slice(0, this.maxLength);
      }
      return this.text;
    },
  },
  methods: {
    sendEvent() {
      if (this.text.length > 0) {
        this.$emit('response', this.text);
        this.text = '';
      }
    },
  },
};
</script>

<template>
  <div class="chat-input-box-container">
    <input
      v-on:keypress.enter="sendEvent()"
      class="chat-input-box-input"
      v-model="text"
      placeholder="메세지를 입력해주세요"
    />
    <p :style="{ color: limitText.length >= maxLength ? '#e0afa0' : '#463f3a' }" class="chat-input-box-counter">
      {{ limitText.length }}/{{ maxLength }}
    </p>
    <BasicButton @click="sendEvent()" text="버튼" />
  </div>
</template>

<style scoped>
.chat-input-box-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  padding: 0 0px;
}

.chat-input-box-container input {
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  color: #463f3a;
  font-size: 24px;
  font-family: Inter;
  font-weight: 500;
}

.chat-input-box-container p {
  color: #8a817c;
  text-align: right;
  font-size: 12px;
  font-family: Inter;
  line-height: 24px;
  letter-spacing: -0.176px;
  margin-right: 20px;
}
</style>
