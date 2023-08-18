<template>
  <SearchChannelModal v-if="modalName === '채널 탐색'" @close="modalName = ''" />
  <MakeDmModal :isShow="modalName === 'DM 생성'" @close="modalName = ''" />
  <MakeChannelModal :isShow="modalName === '채널 생성'" @close="modalName = ''" />
  <BasicListFrame>
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
      <BasicList
        :items="Object.values(chatStore.rooms).flat()"
        :icon-buttons="iconButtons"
        @chooseItem="chooseChatRoom"
        @clickIconButton="actionChatRoom"
      />
    </template>
  </BasicListFrame>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue';
import BasicListFrame from '@/components/BasicListFrame.vue';
import BasicList from '@/components/BasicList.vue';
import DropdownMenu from '@/components/dropdown-component/DropdownMenu.vue';
import DropdownMenuItem from '@/components/dropdown-component/DropdownMenuItem.vue';
import SearchChannelModal from '@/components/chatview-components/modals/SearchChannelModal.vue';
import MakeDmModal from '@/components/chatview-components/modals/MakeDmModal.vue';
import MakeChannelModal from '@/components/chatview-components/modals/MakeChannelModal.vue';
// stores
import { useChatStore } from '@/stores/chat.store';
import { useModalStore } from '@/stores/modal.store';
import { useLoginStore } from '@/stores/login.store';
// services
import { ChatService } from '@/services/chat.service';
// interfaces
import type { ChatInfo } from '@/interfaces/chat/ChatInfo.interface';
import type { IconEmitResponse } from '@/interfaces/IconEmitResponse.interface';

const chatStore = useChatStore();
const modalStore = useModalStore();
const loginStore = useLoginStore();

const iconButtons = [{ emoji: '❌', event: 'quit' }];

const modalName = ref<string>('');
const isMenu = ref<boolean>(false);

onMounted(async () => {
  try {
    const ret: ChatInfo[] = await ChatService.getChatList();
    ret.forEach(e => {
      chatStore.addChatRoom(e.id, e);
    });
    //    const ret = await ChatService.createRoom({
    //      roomName: 'wowowowow',
    //      roomMode: RoomMode.DIRECT,
    //      dmId: 123,
    //    });
  } catch (e) {
    modalStore.on({
      title: '알림',
      text: e,
      buttonText: '닫기',
      buttonFunc: () => {},
    });
  }
});

const chooseChatRoom = (roomId: number) => {
  if (chatStore.removedRooms[roomId])
    modalStore.on({
      title: '알림',
      text: chatStore.getNotice(roomId),
      buttonText: '닫기',
      buttonFunc: () => {
        chatStore.deleteChatRoom(roomId);
        modalStore.off();
      },
    });
  else chatStore.selectChatRoom(roomId);
};

const actionChatRoom = async (iconEmitResponse: IconEmitResponse) => {
  try {
    await ChatService.exitRoom(iconEmitResponse.id);
    chatStore.selectChatRoom(-1);
    chatStore.deleteChatRoom(iconEmitResponse.id);
  } catch (e) {
    modalStore.on({
      title: '알림',
      text: e,
      buttonText: '닫기',
      buttonFunc: () => {},
    });
  }
};

watch(
  () => chatStore.removedRooms,
  () => {
    const id = chatStore.selectedID;
    if (chatStore.removedRooms[id])
      modalStore.on({
        title: '알림',
        text: chatStore.getNotice(id),
        buttonText: '닫기',
        buttonFunc: () => {
          chatStore.selectChatRoom(-1);
          chatStore.deleteChatRoom(id);
          modalStore.off();
        },
      });
  },
);

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
