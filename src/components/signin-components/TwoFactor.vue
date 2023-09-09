<template>
  <div class="getInfoWrap">
    <div class="setProfile">
      <a>인증 번호</a>
      <TextInputBox
        @response="
          e => {
            code = e;
          }
        "
        placeholderText="숫자 4자리"
        type="text"
        :max-length="4"
      />
    </div>
    <div class="submitButton">
      <div class="timer">
        ⏱
        <CountdownTimer
          :targetTime="new Date(new Date().getTime() + 171000)"
          @timeout="isTimeout = true"
          fontSize="small"
        />
      </div>
      <BasicButton @click="submitAuthCode()" text="완료" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';

import CountdownTimer from '@/components/CountdownTimer.vue';
import TextInputBox from '@/components/TextInputBox.vue';
import BasicButton from '@/components/BasicButton.vue';
// stores
import { useLoginStore } from '@/stores/login.store';
import { useModalStore } from '@/stores/modal.store';
// services
import { LoginService, type AuthCode } from '@/services/login.service';
// utils
import { endpoint } from '@/services/utils/config.utils';

const code = ref<string>('');
const route = useRoute();
const modalStore = useModalStore();
const loginStore = useLoginStore();

const isValidCode = (): boolean => {
  if (code.value.length !== 4) return false;
  const codeNum = Number(code.value);
  if (codeNum > 9999) return false;
  return true;
};

const isTimeout = ref<boolean>(false);

const submitAuthCode = async (): Promise<void> => {
  if (isTimeout.value) {
    modalStore.on({
      title: '알림',
      text: '인증 코드가 만료되었습니다.',
      buttonText: '재발급',
      buttonFunc: () => {
        window.location.href = endpoint + '/login/ft';
      },
    });
    return;
  }
  if (!isValidCode()) {
    modalStore.on({
      title: '알림',
      text: '4자리 코드를 입력해주세요.',
      buttonText: '닫기',
      buttonFunc: () => {},
    });
    return;
  }
  const token = String(route.query.token);
  if (typeof token === 'string') localStorage.setItem('token', token);
  const authCode: AuthCode = { code: code.value };
  await LoginService.postTwoFactor(authCode);
  loginStore.login();
};
</script>

<style scoped>
.getInfoWrap {
  flex: 1;
  display: flex;
  flex-flow: column;
  align-items: center;
  padding: 10px;
}

.setProfile {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
}

.setProfile a {
  color: black;
  font-weight: 600;
  font-size: 24px;
  margin-right: 40px;
  margin-left: 40px;
  margin-bottom: 10px;
}

.submitButton {
  display: flex;
  gap: 10px;
  margin-left: 440px;
  margin-right: 30px;
  margin-top: 30px;
}

.timer {
  display: flex;
  min-width: max-content;
  align-self: center;
  gap: 5px;
}
</style>
