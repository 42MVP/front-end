<script lang="ts">
import BasicList from '../BasicList.vue';
import BasicListElement from '../BasicListElement.vue';
import DropdownMenu from '../dropdown-component/DropdownMenu.vue';
import DropdownMenuElement from '../dropdown-component/DropdownMenuElement.vue';

import SearchChannelModal from '../chatview-components/modals/SearchChannelModal.vue';
import MakeDmModal from '../chatview-components/modals/MakeDmModal.vue';
import MakeChannelModal from '../chatview-components/modals/MakeChannelModal.vue';
import JoinChannelPasswordModal from './modals/JoinChannelPasswordModal.vue';

export default {
  emits: ['selectchat', 'reset'],
  components: {
    BasicList,
    BasicListElement,
    DropdownMenu,
    DropdownMenuElement,
    SearchChannelModal,
    MakeDmModal,
    MakeChannelModal,
    JoinChannelPasswordModal
  },
  props: {
    chatInfos: [],
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
    };
  },
  watch: {
    eventResponse() {
      if (!this.eventResponse) return;
      const sp = this.eventResponse.split(':');
      const index  = parseInt(sp[0]);
      const eventName = sp[1];
      const chatInfo = this.chatInfos[index];
      if (eventName === 'click') {
        console.log('click');
        if (chatInfo.hasPassword) {
          this.setModal('채널 비밀번호 입력');
        }
        else {
          this.$emit('selectchat', index);
        }
      }
    },
    chatInfos() {
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
  <JoinChannelPasswordModal :isShow="modalName === '채널 비밀번호 입력'" @close="$emit('reset'); modalName = ''" />
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

<style scoped>
.title-icon-relative {
  position: relative;
}
</style>
