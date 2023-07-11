<template>
  <SearchChannelModal :isShow="modalName === '채널 탐색'" @close="modalName = ''" />
  <MakeDmModal :isShow="modalName === 'DM 생성'" @close="modalName = ''" />
  <MakeChannelModal :isShow="modalName === '채널 생성'" @close="modalName = ''" />
  <JoinChannelPasswordModal :isShow="modalName === '채널 비밀번호 입력'" @close="modalName = ''" />
  <BasicList>
    <template #title> 채팅 </template>
    <template #title-icon>
      <div class="title-icon-relative" @click="isMenu = !isMenu">
        {{ !isMenu ? '⊕' : '⊖' }}
      </div>
    </template>
    <template #title-icon-menu>
      <DropdownMenu v-if="isMenu" style="width: 150px">
        <template #dropdown-item>
          <DropdownMenuItem text="채널 탐색" @click="setModal('채널 탐색')" />
          <DropdownMenuItem text="채널 생성" @click="setModal('채널 생성')" />
          <DropdownMenuItem text="DM 생성" @click="setModal('DM 생성')" />
        </template>
      </DropdownMenu>
    </template>
    <template #user-element>
      <BasicListElement
        v-for="(element, index) in chatInfos"
        :key="element.id"
        :id="index"
        :name="element.name"
        :avatarURL="element.avatarURL"
        :alertCount="element.alertCount"
        :iconButtons="iconButtons"
        clickEvent="click"
        @response="e => (eventResponse = e)"
      />
    </template>
  </BasicList>
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from 'vue';
import BasicList from '@/components/BasicList.vue';
import BasicListElement from '@/components/BasicListElement.vue';
import DropdownMenu from '@/components/dropdown-component/DropdownMenu.vue';
import DropdownMenuItem from '@/components/dropdown-component/DropdownMenuItem.vue';

import SearchChannelModal from '@/components/chatview-components/modals/SearchChannelModal.vue';
import MakeDmModal from '@/components/chatview-components/modals/MakeDmModal.vue';
import MakeChannelModal from '@/components/chatview-components/modals/MakeChannelModal.vue';
import JoinChannelPasswordModal from '@/components/chatview-components/modals/JoinChannelPasswordModal.vue';
import type { IChatInfo } from '@/interfaces/ChatInfo.interface';

const emits = defineEmits(['selectchat', 'reset']);
const props = defineProps<{
  chatInfos: IChatInfo[];
}>();

const iconButtons = [
  { emoji: '✉️', event: 'email' },
  { emoji: '🏁', event: 'flag' },
  { emoji: '❌', event: 'quit' },
];

const modalName = ref('');
const isMenu = ref(false);
const eventResponse = ref('');

watch(eventResponse, () => {
  if (!eventResponse.value) return;
  const sp = eventResponse.value.split(':');
  const index = parseInt(sp[0]);
  const eventName = sp[1];
  const chatInfo = props.chatInfos[index];
  if (eventName === 'click') {
    console.log('click');
    if (chatInfo.hasPassword) {
      setModal('채널 비밀번호 입력');
    } else {
      emits('selectchat', index);
    }
  }
});

watch(
  () => props.chatInfos,
  () => {
    nextTick(() => {
      let userList = document.querySelector('.user-list-container');
      userList?.scrollTo({ top: userList.scrollHeight, behavior: 'smooth' });
    });
  },
);

function setModal(name: string) {
  modalName.value = name;
}
</script>

<style scoped>
.title-icon-relative {
  position: relative;
}
</style>
