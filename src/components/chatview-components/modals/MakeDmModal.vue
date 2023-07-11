<template>
  <Modal title="DM 생성" :show="props.isShow">
    <template #body>
      <SearchBar
        placeholderText="유저명을 입력하세요"
        icon="🔍"
        :isMenu="chat_list_elements.length > 0"
        @response="
          e => {
            if (e === '') {
              chat_list_elements = [];
              return;
            }
            chat_list_elements = [
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
        <template #search-bar-element>
          <BasicListItem
            @click="chat_list_elements = []"
            v-for="element in chat_list_elements"
            :key="element.id"
            :id="element.id"
            :name="element.name"
            :avatarURL="element.avatarURL"
            clickEvent="good~"
            @response="e => console.log(e)"
          />
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
import BasicListItem from '@/components/BasicListItem.vue';
import BasicButton from '@/components/BasicButton.vue';

const chat_list_elements = ref<
  {
    id: number;
    name: string;
    avatarURL: string;
  }[]
>([]);
const emits = defineEmits(['close', 'submit']);
const props = defineProps<{ isShow: boolean }>();
</script>

<style scoped></style>
