<template>
  <SearchChannelModal v-if="modalName === '채널 탐색'" @close="modalName = ''" />
  <MakeDmModal :isShow="modalName === 'DM 생성'" @close="modalName = ''" />
  <MakeChannelModal :isShow="modalName === '채널 생성'" @close="modalName = ''" />
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
      <BasicListItem
        v-for="(element, index) in chatStore.rooms"
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
// component
import BasicList from '@/components/BasicList.vue';
import BasicListItem from '@/components/BasicListItem.vue';
import DropdownMenu from '@/components/dropdown-component/DropdownMenu.vue';
import DropdownMenuItem from '@/components/dropdown-component/DropdownMenuItem.vue';
import SearchChannelModal from '@/components/chatview-components/modals/SearchChannelModal.vue';
import MakeDmModal from '@/components/chatview-components/modals/MakeDmModal.vue';
import MakeChannelModal from '@/components/chatview-components/modals/MakeChannelModal.vue';

// store
import { useChatStore } from '@/stores/chat.store';
import { useModalStore } from '@/stores/modal.store';

// service
import { ChatService } from '@/services/chat.service';

const chatStore = useChatStore();
const modalStore = useModalStore();

const emits = defineEmits(['selectchat', 'reset']);

const iconButtons = [{ emoji: '❌', event: 'quit' }];

const modalName = ref('');
const isMenu = ref(false);
const eventResponse = ref('');

watch(eventResponse, async () => {
  console.log(eventResponse);
  if (!eventResponse.value) return;
  const sp = eventResponse.value.split(':');
  const index = parseInt(sp[0]);
  const eventName = sp[1];
  if (eventName === 'click') {
    emits('selectchat', index);
  } else if (eventName === 'quit') {
    try {
      await ChatService.exitRoom(chatStore.rooms[index].id);
      chatStore.deleteChatRoom(index);
    } catch (e) {
      modalStore.on({
        title: '알림',
        text: e,
        buttonText: '닫기',
        buttonFunc: () => {},
      });
    }
  }
});

watch(
  () => chatStore.rooms,
  () => {
    nextTick(() => {
      let userList = document.querySelector('.user-list-container');
      userList?.scrollTo({ top: userList.scrollHeight, behavior: 'smooth' });
    });
  },
);

const setModal: Function = (name: string) => {
  modalName.value = name;
};
</script>

<style scoped>
.title-icon-relative {
  position: relative;
}
</style>
