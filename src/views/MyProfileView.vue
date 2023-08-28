<template>
  <!-- {{ console.log(user) }}
  <div class="p-container">
    <Card class="p-info" :img="user.img">
      <div class="button-slot">
        <input type="file" class="input-file" ref="uploadedFile" @click="handleImgChange" />
        <DButton class="upload-button" label="Upload new photo" />
      </div>
    </Card>
    <div class="e-info">
      <div class="end-align">닉네임 설정</div>
      <span>kanghyki 만든 input box 자리 <br />글자수 제한 <br />글자수 제한 <br /> </span>
      <div class="end-align">2차 인증</div>
      <TButton :value="user.isAuth" />
      <div class="end-align">인증 메일</div>
      <div>{{ user.email }}</div>

      <div class="two-buttons">
        <DButton class="edit-button" label="완료" @click="editButton()" />
        <DButton class="cancle-button" label="취소" @click="editButton()" />
      </div>
    </div>
  </div> -->
  <div class="wrap">
    <UploadImage v-model="uploadedFile"/>
    <div class="p-info">
      <div class="name">
        <h3>닉네임 설정</h3>
        <TextInputBox placeholderText="닉네임입력" type="name" :maxLength="15" required />
      </div>
      <div class="auth">
        <h3>2차인증</h3>
        <TButton />
      </div>
      <div class="mail">
        <h3>인증메일</h3>
        <a>hejang@student.42seoul.kr</a>
      </div>
      <div class="two-buttons">
        <!-- <button type="button" :disabled="src" class="test">완료</button> -->
        <BasicButton text="완료" />
        <BasicButton text="취소" :type="false" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TButton from '@/components/common/ToggleButton.vue';
import UploadImage from '@/components/common/UploadImage.vue';
import TextInputBox from '@/components/TextInputBox.vue';
import BasicButton from '@/components/BasicButton.vue';
import { ref } from 'vue';

// const props = defineProps({
//   user_id: String,
// });

const user = { _id: '1', name: 'chaejkim', img: '1.png', email: 'chaejkim@student.42seoul.kr', isAuth: false };
const tmp_user = { _id: '1', name: 'chaejkim', img: '1.png', email: 'chaejkim@student.42seoul.kr', isAuth: false };
const uploadedFile = ref<File | undefined>(undefined);

// const emit = defineEmits(['fileSelected']);

const handleImgChange = (event: Event) => {
  // this.user.img = 'profile_0.png';
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length) {
    uploadedFile.value = input.files[0];
    // emit('fileSelected', input.files[0]);
  }
  console.log(uploadedFile.value);
};

const editButton = () => {
  user.name = tmp_user.name; // TODO : name check
  user.isAuth = tmp_user.isAuth;
  user.img = tmp_user.img;
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
