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
        :placeholderText="loginStore?.name"
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
      <BasicButton @click="submitNickname()" text="완료" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useLoginStore } from '@/stores/login.store';
import { useModalStore } from '@/stores/modal.store';
import { ref } from 'vue';

import TextInputBox from '@/components/TextInputBox.vue';
import BasicButton from '@/components/BasicButton.vue';
import UploadImage from '../common/UploadImage.vue';
import { UserService } from '@/services/user.service';

const username = ref<string>('');
const uploadedFile = ref<File | undefined>(undefined);
const isCheckAuth = ref<boolean>(false);
const router = useRouter();
const modalStore = useModalStore();
const loginStore = useLoginStore();

const submitNickname: Function = async (): Promise<void> => {
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
  } else if (username.value.length < 4) {
    modalStore.on({
      title: '알림',
      text: '최소 5글자 이상 닉네임을 설정할 수 있습니다.',
      buttonText: '닫기',
      buttonFunc: () => {},
    });
  } else {
    try {
      const formData = new FormData();
      formData.append('name', username.value);
      formData.append('isAuth', String(isCheckAuth.value));
      if (uploadedFile.value) {
        formData.append('avatar', uploadedFile.value);
      }
      await UserService.setUserProfile(formData);
      loginStore.isLogin = true;
      loginStore.name = username.value;
      router.push('/');
    } catch (e) {
      modalStore.on({
        title: '오류',
        text: '프로필 수정 중 에러 발생!',
        buttonText: '닫기',
        buttonFunc: () => {
          loginStore.resetAll();
          router.push('/');
        },
      });
    }
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
