<template>
  <div class="getInfoWrap">
    <UploadImage v-model="uploadedFile" />
    <div class="setProfile">
      <a>닉네임 설정</a>
      <TextInputBox
        @response="
          e => {
            username = e;
          }
        "
        :placeholderText="defaultName"
        type="name"
        :maxLength="15"
        required
      />
    </div>
    <label class="container"
      >2차 인증 사용하기
      <input type="checkbox" v-model="isCheckAuth" />
      <span class="checkmark"></span>
    </label>
    <div class="submitButton">
      <BasicButton @click="submitFrom()" text="완료" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import TextInputBox from '@/components/TextInputBox.vue';
import BasicButton from '@/components/BasicButton.vue';
import UploadImage from '../common/UploadImage.vue';
// stores
import { useLoginStore } from '@/stores/login.store';
import { useModalStore } from '@/stores/modal.store';
// services
import { UserService } from '@/services/user.service';
import { LoginService } from '@/services/login.service';

const username = ref<string>('');
const uploadedFile = ref<File | undefined>(undefined);
const isCheckAuth = ref<boolean>(false);

const route = useRoute();
const router = useRouter();
const modalStore = useModalStore();
const loginStore = useLoginStore();

const defaultName = String(route.query.name);

const createFormData = (): FormData => {
  const formData = new FormData();
  formData.append('name', username.value || defaultName);
  formData.append('isAuth', String(isCheckAuth.value));
  if (uploadedFile.value) {
    formData.append('avatar', uploadedFile.value);
  }
  return formData;
};

const submitFrom = async (): Promise<void> => {
  try {
    const formData = createFormData();
    await UserService.setUserProfile(formData);
    loginStore.login();
    if (username.value.length === 0) {
      modalStore.on({
        title: '알림',
        text: '기본 닉네임이 유지됩니다.\n언제든 [유저 - 내 프로필] 에서 변경이 가능합니다.\
      ',
        buttonText: '홈으로',
        buttonFunc: () => {
          router.push('/');
        },
      });
    } else router.push('/');
  } catch (e) {
    modalStore.on({
      title: '오류',
      text: String(e),
      buttonText: '닫기',
      buttonFunc: () => {
        loginStore.resetAll();
        router.push('/');
      },
    });
  }
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

.labelButton {
  display: flex;
  background-color: #463f3a;
  color: #fff;
  border-radius: 10px 10px 10px 10px;
  padding: 10px;
  /* width: 240px; */
  height: 45px;
  /* margin-bottom: 10px; */
  margin-top: 30px;
}
input[type='file'] {
  display: none;
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
  margin-left: 520px;
  margin-top: 30px;
}
</style>
