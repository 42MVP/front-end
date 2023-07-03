<template>
  <!-- {{ console.log(user) }} -->
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
  </div>
</template>

<script setup lang="ts">
import DButton from '@/components/tmp/DefaultButton.vue';
import TButton from '@/components/common/ToggleButton.vue';
import Card from '@/components/profileview-components/ProfileCard.vue';
import { ref } from 'vue';

// const props = defineProps({
//   user_id: String,
// });

const user = { _id: '1', name: 'chaejkim', img: '1.png', email: 'chaejkim@student.42seoul.kr', isAuth: false };
const tmp_user = { _id: '1', name: 'chaejkim', img: '1.png', email: 'chaejkim@student.42seoul.kr', isAuth: false };
const uploadedFile = ref<File | null>(null);

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
.p-container,
.p-container * {
  display: grid;
  box-sizing: border-box;
  position: relative;
  align-items: center;
}
.p-container {
  grid-template-columns: 2fr 3fr;
  width: 100%;
  height: 100%;
  justify-content: space-evenly;
}

.p-info {
  justify-self: right;
  display: flex;
  flex-direction: column;
}
.button-slot {
  margin: 10px 10px;
}

.input-file {
  position: absolute;
}

.e-info {
  display: grid;
  grid-template-columns: 100px auto;
  grid-template-rows: 3fr 2fr 2fr 5fr;
  justify-self: center;
  grid-gap: 30px;
  /* flex-direction: column; */
}

.two-buttons {
  grid-area: span 1 / 2;
  grid-template-columns: 50px 50px;
  gap: 50px;
  justify-self: left;
}

.end-align {
  /* align-self: end; */
  text-align: end;
}
</style>
