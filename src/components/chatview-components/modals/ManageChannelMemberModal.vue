<script setup lang="ts">
import { ref } from 'vue';
import Modal from '@/components/Modal.vue';
import SearchBar from '@/components/SearchBar.vue';
import BasicListElement from '@/components/BasicListElement.vue';
import BasicButton from '@/components/BasicButton.vue';

const userTabIcon = [
  { emoji: '😷', event: 'abong' },
  { emoji: '🏁', event: 'flag' },
  { emoji: '❌', event: 'quit' },
]
const banTabIcon = [
  { emoji: '⊖', event: 'unban' }
]
const isUserTab = ref(true);
const tempIsSearch = ref(false);

const emits = defineEmits(['close']);
const props = defineProps({
  friends: [],
  chatInfo: {},
  isShow: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <Modal title="멤버 관리" :show="isShow">
    <template #body>
      <div class="choice-block-container">
        <div
          :class="{ 'choice-block': isUserTab, 'choice-block-unchoose': !isUserTab }"
          @click="isUserTab = true"
        >
          채널 유저
        </div>
        <div
          :class="{ 'choice-block': !isUserTab, 'choice-block-unchoose': isUserTab }"
          @click="isUserTab = false"
        >
          차단 유저
        </div>
      </div>
      <SearchBar
        placeholderText="유저명을 입력하세요"
        icon="👩‍🌾"
        :isMenu="tempIsSearch"
        @response="e => {
          if (e === '')
            tempIsSearch = false;
          else
            tempIsSearch = true;
        }"
      >
        <template v-if="isUserTab" #search-bar-element>
          <BasicListElement
            @click="
            tempIsSearch = false;
            isUserTab ? chatInfo.users.push(element) : chatInfo.banUsers.push(element);
            "
            v-for="element in friends"
            :key="element.id"
            :id="element.id"
            :name="element.name"
            :avatarURL="element.avatarURL"
            :iconButtons="[{ emoji: '✉️', event: 'invite' }]"
            clickEvent="good~"
            @response="e => console.log(e)"
          />
        </template>
        <template v-else #search-bar-element>
          <BasicListElement
            @click="
            tempIsSearch = false;
            isUserTab ? chatInfo.users.push(element) : chatInfo.banUsers.push(element);
            "
            v-for="element in friends"
            :key="element.id"
            :id="element.id"
            :name="element.name"
            :avatarURL="element.avatarURL"
            :iconButtons="[{ emoji: '⚠️', event: 'ban' }]"
            clickEvent="good~"
            @response="e => console.log(e)"
          />
        </template>
      </SearchBar>
      <div v-if="isUserTab" class="modal-user-list-container">
        <BasicListElement
          v-for="element in chatInfo.users"
          :key="element.id"
          :id="element.id"
          :name="element.name"
          :avatarURL="element.avatarURL"
          :iconButtons="userTabIcon"
          style="position: relative"
          @response="
            e => {
              console.log(e);
              if (e.split(':')[1] === 'abong') isAbong = true;
              console.log(isAbong);
            }
          "
        >
          <DropdownMenu v-if="isAbong" style="width: 150px">
            <template #dropdown-element>
              <DropdownMenuElement text="1분" @click="isAbong = false" />
              <DropdownMenuElement text="5분" @click="isAbong = false" />
              <DropdownMenuElement text="10분" @click="isAbong = false" />
              <DropdownMenuElement text="30분" @click="isAbong = false" />
              <DropdownMenuElement text="1시간" @click="isAbong = false" />
              <DropdownMenuElement text="취소" @click="isAbong = false" />
            </template>
          </DropdownMenu>
        </BasicListElement>
      </div>
      <div v-else class="modal-user-list-container">
        <BasicListElement
          v-for="element in chatInfo.banUsers"
          :key="element.id"
          :id="element.id"
          :name="element.name"
          :avatarURL="element.avatarURL"
          :iconButtons="banTabIcon"
          @response="e => console.log(e)"
        />
      </div>
    </template>
    <template #footer>
      <BasicButton text="닫기" @click="emits('close')" />
    </template>
  </Modal>
</template>

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
  color: #463f3a;
  text-align: center;
  font-size: 24px;
  font-family: Inter;
  font-weight: 500;
}

.choice-block-unchoose {
  border: 1px solid #463f3a;
  border-bottom: none;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  padding: auto;
  width: 150px;
  height: 35px;
  color: #8a817c;
  background: #bcb8b1;
  text-align: center;
  font-size: 24px;
  font-family: Inter;
  font-weight: 500;
}

.modal-user-list-container {
  overflow: auto;
  max-height: 300px;
}
</style>
