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
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
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
import { ChatSocketService } from '@/services/chatSocket.service';

const chatStore = useChatStore();
const modalStore = useModalStore();
const loginStore = useLoginStore();

const iconButtons = [{ emoji: '❌', event: 'quit' }];

const modalName = ref<string>('');
const isMenu = ref<boolean>(false);
const eventResponse = ref<IconEmitResponse>({ id: -1, eventName: '' });

onUnmounted(() => {
  ChatSocketService.offChat();
});

onMounted(async () => {
  try {
    ChatSocketService.onChat();
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

watch(eventResponse, async () => {
  const eventName = eventResponse.value.eventName;
  const id = eventResponse.value.id;
  if (eventName === 'click') {
    chatStore.selectedID = id;
  } else if (eventName === 'quit') {
    try {
      await ChatService.exitRoom(id);
      chatStore.deleteChatRoom(id);
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

const chooseChatRoom = (roomId: number) => {
  eventResponse.value = { id: roomId, eventName: 'click' };
};

const actionChatRoom = (iconEmitResponse: IconEmitResponse) => {
  eventResponse.value = iconEmitResponse;
};
</script>

<style scoped>
.title-icon-relative {
  position: relative;
}
</style>
