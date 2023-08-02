<template>
  <Modal title="DM 생성" :show="props.isShow">
    <template #body>
      <SearchBar
        placeholderText="유저명을 입력하세요"
        icon="🔍"
        :isMenu="users.length > 0"
        @response="
          e => {
            if (e === '') {
              users = [];
              return;
            }
            users = [
              {
                id: 1,
                name: '42my',
                avatarURL: '',
              },
              {
                id: 2,
                name: '42party',
                avatarURL: '',
              },
              {
                id: 3,
                name: '42mario',
                avatarURL: '',
              },
            ];
          }
        "
      >
        <template #search-bar-item>
          <BasicList :items="users" @chooseItem="selectUser" />
        </template>
      </SearchBar>
    </template>
    <template #footer>
      <BasicButton :type="false" text="취소" @click="emits('close')" style="margin-right: 5px" />
      <BasicButton :type="true" text="확인" />
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Modal from '@/components/Modal.vue';
import SearchBar from '@/components/SearchBar.vue';
import BasicList from '@/components/BasicList.vue';
import BasicButton from '@/components/BasicButton.vue';
import type { User } from '@/interfaces/user/User.interface';

const users = ref<User[]>([] as User[]);
const emits = defineEmits(['close', 'submit']);
const props = defineProps<{ isShow: boolean }>();

const selectUser = (userId: number) => {
  const selectedUser = users.value?.find(user => user.id === userId);
  console.log(selectedUser?.id, selectedUser?.name);
};
</script>

<style scoped></style>
