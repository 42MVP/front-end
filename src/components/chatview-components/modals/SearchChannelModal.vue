<script lang="ts">
import Modal from '../../Modal.vue';
import SearchBar from '../../SearchBar.vue';
import BasicListElement from '../../BasicListElement.vue';
import BasicButton from '../../BasicButton.vue';

export default {
  emits: ['close'],
  components: {
    Modal,
    SearchBar,
    BasicListElement,
    BasicButton,
  },
  data() {
    return {
      search_channel_list_elements: [],
    };
  },
  props: {
    isShow: {
      default: false,
    },
  },
};
</script>

<template>
  <Modal title="채널 탐색" :show="isShow">
    <template #body>
      <SearchBar
        placeholderText="채널명을 입력하세요"
        icon="🔍"
        :isMenu="search_channel_list_elements.length > 0"
        @response="
          e => {
            if (e === '') {
              search_channel_list_elements = [];
              return;
            }
            search_channel_list_elements = [
              {
                id: 1,
                name: '42my',
                clickEvent: 'channelclick',
                avatarURL: '',
              },
              {
                id: 2,
                name: '42party',
                clickEvent: 'channelclick',
                avatarURL: '',
              },
              {
                id: 3,
                name: '42mario',
                clickEvent: 'channelclick',
                avatarURL: '',
              },
            ];
          }
        "
      >
        <template #search-bar-element>
          <BasicListElement
            @click="search_channel_list_elements = []"
            v-for="element in search_channel_list_elements"
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
      <BasicButton :type="false" text="취소" @click="$emit('close')" style="margin-right: 5px" />
      <BasicButton :type="true" text="확인" />
    </template>
  </Modal>
</template>

<style scoped></style>
