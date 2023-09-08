<template>
  <div class="wrap">
    <UploadImage v-model="uploadedFile" />
    <div class="p-info">
      <div class="name">
        <h3>닉네임 설정</h3>
        <TextInputBox
          @response="
            e => {
              username = e;
            }
          "
          :placeholderText="loginStore?.name"
          type="name"
          :maxLength="15"
          required
        />
      </div>
      <div class="auth">
        <h3>2차인증 설정</h3>
        <input type="checkbox" v-model="isCheckAuth" class="c-box" />
        <span class="checkmark"></span>
      </div>
      <div class="mail">
        <h3>인증메일</h3>
        <a>{{ loginStore?.email }}</a>
      </div>
      <div class="two-buttons">
        <BasicButton text="완료" @click="submitFrom()" />
        <BasicButton text="취소" :type="false" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import TButton from '@/components/common/ToggleButton.vue';
import UploadImage from '@/components/common/UploadImage.vue';
import TextInputBox from '@/components/TextInputBox.vue';
import BasicButton from '@/components/BasicButton.vue';

// stores
import { useLoginStore } from '@/stores/login.store';
// services
import { UserService } from '@/services/user.service';
import { LoginService } from '@/services/login.service';

const loginStore = useLoginStore();

const router = useRouter();

const isCheckAuth = ref<boolean>(loginStore.isAuth);
const uploadedFile = ref<File | undefined>(undefined);
const username = ref<string>('');

const updateAuth = (newValue: boolean) => {
  isCheckAuth.value = newValue;
}

const createFormData = (): FormData => {
  const formData = new FormData();
  formData.append('name', username.value || loginStore.name);
  formData.append('isAuth', String(isCheckAuth.value));
  if (uploadedFile.value) {
    formData.append('avatar', uploadedFile.value);
  }
  return formData;
};

const submitFrom = async (): Promise<void> => {
  const formData = createFormData();
  await UserService.setUserProfile(formData);
  const loginInfo = await LoginService.getUserInfo();
  loginStore.updateLoginInfo(loginInfo);
  router.push(`/users/${loginStore?.name}`);

};
</script>

<style scoped>
.wrap {
  display: flex;
  /* flex-flow: row; */
  align-items: center;
  margin-left: 100px;
  margin-top: 70px;
  gap: 70px;
}

.p-info {
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  gap: 30px;
  margin-left: 30px;
  flex-shrink: 0;
  margin-top: 50px;
}

.two-buttons {
  display: flex;
  flex-flow: row;
  margin-top: 50px;
  margin-left: 120px;
  /* grid-area: span 1 / 2; */
  /* grid-template-columns: 50px 50px; */
  gap: 80px;
  /* justify-self: left; */
}

.auth {
  display: flex;
  flex-flow: row;
  align-items: center;
  gap: 34px;
}

.c-box {
  width: 20px;
  height: 20px;
}

.mail {
  display: flex;
  flex-flow: row;
  gap: 60px;
}

.name {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  margin-top: 30px;
}

h3 {
  color: var(--brown, #463f3a);
  font-family: Inter;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px;
}
</style>
