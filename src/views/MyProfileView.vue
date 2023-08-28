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
        <h3>2차인증</h3>
        <TButton :value="isCheckAuth" />
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

import TButton from '@/components/common/ToggleButton.vue';
import UploadImage from '@/components/common/UploadImage.vue';
import TextInputBox from '@/components/TextInputBox.vue';
import BasicButton from '@/components/BasicButton.vue';

// stores
import { useLoginStore } from '@/stores/login.store';
import { useModalStore } from '@/stores/modal.store';
// services
import { UserService } from '@/services/user.service';
import { LoginService } from '@/services/login.service';

const uploadedFile = ref<File | undefined>(undefined);
const username = ref<string>('');
const isCheckAuth = ref<boolean>(false);

const loginStore = useLoginStore();
const modalStore = useModalStore();

const isValidFrom = (): boolean => {
  if (username.value.length && username.value.length < 5) {
    modalStore.on({
      title: '알림',
      text: '최소 5글자 이상 닉네임을 설정할 수 있습니다.',
      buttonText: '닫기',
      buttonFunc: () => {},
    });
    return false;
  }
  return true;
};

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
  if (!isValidFrom()) return;
  try {
    const formData = createFormData();
    await UserService.setUserProfile(formData);
    const loginInfo = await LoginService.getUserInfo();
    loginStore.updateLoginInfo(loginInfo);
  } catch (e) {
    modalStore.on({
      title: '오류',
      text: '프로필 수정 중 에러 발생!',
      buttonText: '닫기',
      buttonFunc: () => {
        modalStore.off();
      },
    });
  }
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
  gap: 64px;
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
