<script lang="ts">
import BasicList from '../BasicList.vue';
import BasicListElement from '../BasicListElement.vue';
import DropdownMenu from '../dropdown-component/DropdownMenu.vue';
import DropdownMenuElement from '../dropdown-component/DropdownMenuElement.vue';

import SearchChannelModal from '../chatview-components/modals/SearchChannelModal.vue';
import MakeDmModal from '../chatview-components/modals/MakeDmModal.vue';
import MakeChannelModal from '../chatview-components/modals/MakeChannelModal.vue';

export default {
  emits: ['selectchat'],
  components: {
    BasicList,
    BasicListElement,
    DropdownMenu,
    DropdownMenuElement,
    SearchChannelModal,
    MakeDmModal,
    MakeChannelModal,
  },
  data() {
    return {
      iconButtons: [
        { emoji: '✉️', event: 'email' },
        { emoji: '🏁', event: 'flag' },
        { emoji: '❌', event: 'quit' },
      ],
      modalName: '',
      isMenu: false,
      eventResponse: '',
      chatList: [
        {
          id: 1,
          name: '42mvp',
          avatarURL: '',
          type: 'channel',
          alertCount: 42,
        },
        {
          id: 2,
          name: 'kanghyki',
          avatarURL: '',
          type: 'dm',
          alertCount: 12,
        },
        {
          id: 3,
          name: 'hyeognki',
          avatarURL: '',
          type: 'dm',
          alertCount: 0,
        },
      ],
    };
  },
  watch: {
    eventResponse() {
      if (!this.eventResponse) return;
      const sp = this.eventResponse.split(':');
      const chatID = parseInt(sp[0]);
      const eventName = sp[1];
      const chat = this.chatList.find(e => e.id === chatID);
      if (eventName === 'click') {
        console.log('click');
        this.$emit('selectchat', chatID);
      } else if (eventName === 'quit') {
        console.log('quit');
        this.chatList = this.chatList.filter(e => e.id !== chatID);
      }
    },
    chatList() {
      this.$nextTick(() => {
        let userList = document.querySelector('.user-list-container');
        userList.scrollTo({ top: userList.scrollHeight, behavior: 'smooth' });
      });
    },
  },
  methods: {
    setModal(modalName: string) {
      this.modalName = modalName;
    },
  },
};
</script>

<template>
  <SearchChannelModal :isShow="modalName === '채널 탐색'" @close="modalName = ''" />
  <MakeDmModal :isShow="modalName === 'DM 생성'" @close="modalName = ''" />
  <MakeChannelModal :isShow="modalName === '채널 생성'" @close="modalName = ''" />
  <BasicList :elements="user_list_elements">
    <template #title> 채팅 </template>
    <template #title-icon>
      <div class="title-icon-relative" @click="isMenu = !isMenu">
        {{ !isMenu ? '⊕' : '⊖' }}
      </div>
    </template>
    <template #title-icon-menu>
      <DropdownMenu v-if="isMenu" style="width: 150px">
        <template #dropdown-element>
          <DropdownMenuElement text="채널 탐색" @click="setModal('채널 탐색')" />
          <DropdownMenuElement text="채널 생성" @click="setModal('채널 생성')" />
          <DropdownMenuElement text="DM 생성" @click="setModal('DM 생성')" />
        </template>
      </DropdownMenu>
    </template>
    <template #user-element>
      <BasicListElement
        v-for="element in chatList"
        :key="element.id"
        :id="element.id"
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

<style scoped>
.title-icon-relative {
  position: relative;
}
</style>
