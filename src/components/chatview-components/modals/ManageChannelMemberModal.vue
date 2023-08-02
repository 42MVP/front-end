<template>
  <Modal title="멤버 관리" :show="props.isShow">
    <template #body>
      <div class="choice-block-container">
        <div :class="{ 'choice-block': isUserTab, 'choice-block-unchoose': !isUserTab }" @click="isUserTab = true">
          채널 유저
        </div>
        <div :class="{ 'choice-block': !isUserTab, 'choice-block-unchoose': isUserTab }" @click="isUserTab = false">
          차단 유저
        </div>
      </div>
      <SearchBar
        placeholderText="유저명을 입력하세요"
        icon="👩‍🌾"
        :isMenu="tempIsSearch"
        @response="
          e => {
            if (e === '') tempIsSearch = false;
            else tempIsSearch = true;
          }
        "
      >
        <template v-if="isUserTab" #search-bar-item>
          <BasicList
            :items="friends"
            :iconButtons="[{ emoji: '✉️', event: 'invite' }]"
            @clickIconButton="e => console.log(e)"
          />
        </template>
        <template v-else #search-bar-item>
          <BasicList
            :items="friends"
            :iconButtons="[{ emoji: '⚠️', event: 'ban' }]"
            @clickIconButton="e => console.log(e)"
          />
        </template>
      </SearchBar>
      <div v-if="isUserTab" class="modal-user-list-container">
        <BasicList
          :items="props.chatInfo.users"
          :iconButtons="userTabIcon"
          style="position: relative"
          @clickIconButton="e => console.log(e)"
        >
        </BasicList>
      </div>
      <div v-else class="modal-user-list-container">
        <BasicList
          :items="props.chatInfo.banUsers"
          :iconButtons="userTabIcon"
          style="position: relative"
          @="e => console.log(e)"
        />
      </div>
    </template>
    <template #footer>
      <BasicButton text="닫기" @click="emits('close')" />
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Modal from '@/components/Modal.vue';
import SearchBar from '@/components/SearchBar.vue';
import BasicList from '@/components/BasicList.vue';
// import BasicListItem from '@/components/BasicListItem.vue';
import BasicButton from '@/components/BasicButton.vue';
import type { User } from '@/interfaces/user/User.interface';
import type { ChatInfo } from '@/interfaces/chat/ChatInfo.interface';

const userTabIcon = [
  { emoji: '😷', event: 'abong' },
  { emoji: '🏁', event: 'flag' },
  { emoji: '❌', event: 'quit' },
];
const banTabIcon = [{ emoji: '⊖', event: 'unban' }];
const isUserTab = ref(true);
const tempIsSearch = ref(false);

const emits = defineEmits(['close']);
const props = defineProps<{
  friends: User[];
  chatInfo: ChatInfo;
  isShow: boolean;
}>();
</script>

<style scoped>
.choice-block-container {
  padding-left: 3px;
  display: flex;
}

.choice-block {
  border: 1px solid #463f3a;
  border-bottom: none;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  padding: auto;
  width: 150px;
  height: 35px;
  color: var(--brown, #463f3a);
  text-align: center;
  font: var(--medium);
}

.choice-block-unchoose {
  border: 1px solid #463f3a;
  border-bottom: none;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  padding: auto;
  width: 150px;
  height: 35px;
  color: var(--semi-brown, #8a817c);
  background: #bcb8b1;
  text-align: center;
  font: var(--medium);
}

.modal-user-list-container {
  overflow: auto;
  max-height: 300px;
}
</style>
