<template>
  <div class="getInfoWrap">
    <div v-if="src">
      <img :src="src" />
    </div>
    <div v-else class="circle"></div>
    <label class="labelButton">
      Upload New Avatar
      <input type="file" @change="addImage" />
    </label>
    <div class="setProfile">
      <a>닉네임 설정 </a>
      <TextInputBox placeholderText="닉네임입력" type="name" :maxLength="15" required />
    </div>
    <div class="submitButton">
      <!-- <button type="button" :disabled="src" class="test">완료</button> -->
      <BasicButton @click="Submit()" text="완료" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import TextInputBox from '@/components/TextInputBox.vue';
import BasicButton from '@/components/BasicButton.vue';

const uploadedAvatar = ref<File | null>(null);

var profile: {
  name: '';
  photo: null; // 업로드한 사진을 저장할 변수
};

const src = ref();

const addImage = (e: Event) => {
  const [file] = (e.target as HTMLInputElement).files;
  console.log((e.target as HTMLInputElement).files);
  if (file) {
    src.value = URL.createObjectURL(file);
  }
};

const Submit: Function = () => {
  if (profile.name.length > 1) {
    const router = useRouter();
    router.replace('/signUp/completed');
  }
};
</script>

<style scoped>
.getInfoWrap {
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

.circle {
  background-color: gray;
  border-radius: 50%;
  width: 340px;
  height: 340px;
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

img {
  width: 340px;
  height: 340px;
  border-radius: 50%;
}

.submitButton {
  margin-left: 520px;
  margin-top: 30px;
}
</style>
