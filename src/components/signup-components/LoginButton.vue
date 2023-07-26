<script setup lang="ts">
import BasicButton from '@/components/BasicButton.vue';
import { Login } from '@/contexts/fetchLogin';
import { useModalStore } from '@/stores/modal.store';

const modalStore = useModalStore();

const login = async () => {
  try {
    const ret = await Login.fetchLoginURL();
    window.location.href = ret.loginURL;
  } catch (e) {
    modalStore.on({
      title: '알림',
      text: e,
      buttonText: '닫기',
      buttonFunc: () => {},
    });
  }
};
</script>

<template>
  <BasicButton class="buttonStyle" text="42로그인" @click="login()"></BasicButton>
</template>

<style scoped>
.buttonStyle {
  margin-left: 250px;
  width: 240px;
  height: 70px;
}
</style>
