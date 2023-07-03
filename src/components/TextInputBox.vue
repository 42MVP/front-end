<script>
export default {
  emits: ['response'],
  data() {
    return {
      text: '',
    };
  },
  props: {
    maxLength: 0,
    placeholderText: '',
    type: false,
  },
  watch: {
    text() {
      this.$emit('response', this.text);
    },
  },
  computed: {
    isTextOver() {
      if (this.text.length >= this.maxLength) {
        return true;
      }
      return false;
    },
    limitText() {
      if (this.text.length > this.maxLength) {
        this.text = this.text.slice(0, this.maxLength);
      }
      return this.text;
    },
  },
};
</script>

<template>
  <div class="text-input-box-container">
    <input :type="type" v-model="text" class="text-input-box" :placeholder="placeholderText" />
    <p :class="{ 'text-input-box-counter': !isTextOver, 'text-input-box-counter-false': isTextOver }">
      {{ limitText.length }}/{{ maxLength }}
    </p>
  </div>
</template>

<style>
.text-input-box-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
  margin: 10px 0px 10px 0px;
}

.text-input-box {
  width: 100%;
  height: 100%;
  border: 2px solid #bcb8b1;
  border-radius: 15px;
  background-color: inherit;
  color: #463f3a;
  font-size: 24px;
  font-family: Inter;
  font-weight: 500;
  line-height: 32px;
  height: 65px;
  padding: 15px;
  outline: none;
}

.text-input-box:focus {
  border: 2px solid #8a817c;
}

.text-input-box-counter {
  color: #8a817c;
  text-align: right;
  font-size: 12px;
  font-family: Inter;
  line-height: 24px;
  width: 100%;
}

.text-input-box-counter-false {
  color: #e0afa0;
  text-align: right;
  font-size: 12px;
  font-family: Inter;
  line-height: 24px;
  width: 100%;
}
</style>
