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
      friend_list_elements: [
        {
          id: 1,
          name: 'daram',
          avatarURL: '',
          clickEvent: 'friendclick',
        },
        {
          id: 2,
          name: 'goyang',
          avatarURL: '',
          clickEvent: 'friendclick',
        },
      ],
      isChannelUser: true,
      search_channel_list_elements: [],
      selectChannel: {
        id: 1,
        name: '42mvp',
        clickEvent: 'channelclick',
        avatarURL: '',
        alertCount: 42,
        hasPassword: false,
        users: [
          {
            id: 1,
            name: 'kanghyki',
            avatarURL: '',
          },
          {
            id: 2,
            name: 'hyeongki',
            avatarURL: '',
          },
        ],
        banUsers: [
          {
            id: 3,
            name: 'badguy',
            avatarURL: '',
          },
          {
            id: 4,
            name: 'whoami',
            avatarURL: '',
          },
        ],
        chats: [
          {
            id: 1,
            username: 'kanghyki',
            userAvatarURL: '',
            message: '이거봐봐',
            date: new Date(),
          },
          {
            id: 2,
            username: 'hyeognki',
            userAvatarURL: '',
            message: '오 대단한걸?',
            date: new Date(),
          },
        ],
      },
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
      <div class="choice-block-container">
        <div
          :class="{ 'choice-block': isChannelUser, 'choice-block-unchoose': !isChannelUser }"
          @click="isChannelUser = true"
        >
          채널 유저
        </div>
        <div
          :class="{ 'choice-block': !isChannelUser, 'choice-block-unchoose': isChannelUser }"
          @click="isChannelUser = false"
        >
          차단 유저
        </div>
      </div>
      <SearchBar
        placeholderText="유저명을 입력하세요"
        icon="👩‍🌾"
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
        <template v-if="isChannelUser" #search-bar-element>
          <BasicListElement
            @click="
              search_channel_list_elements = [];
              isChannelUser ? selectChannel.users.push(element) : selectChannel.banUsers.push(element);
            "
            v-for="element in friend_list_elements"
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
              search_channel_list_elements = [];
              isChannelUser ? selectChannel.users.push(element) : selectChannel.banUsers.push(element);
            "
            v-for="element in friend_list_elements"
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
      <div v-if="isChannelUser" class="modal-user-list-container">
        <BasicListElement
          v-for="element in selectChannel.users"
          :key="element.id"
          :id="element.id"
          :name="element.name"
          :avatarURL="element.avatarURL"
          :iconButtons="[
            { emoji: '😷', event: 'abong' },
            { emoji: '🏁', event: 'flag' },
            { emoji: '❌', event: 'quit' },
          ]"
          style="position: relative"
          @response="
            e => {
              console.log(e);
              if (e.split(':')[1] === 'abong') isAbong = true;
              console.log(isAbong);
            }
          "
        >
          <DropdownMenu v-if="isAbong" style="position: fixed; width: 150px">
            <template #dropdown-item>
              <DropdownMenuItem text="1분" @click="isAbong = false" />
              <DropdownMenuItem text="5분" @click="isAbong = false" />
              <DropdownMenuItem text="10분" @click="isAbong = false" />
              <DropdownMenuItem text="30분" @click="isAbong = false" />
              <DropdownMenuItem text="1시간" @click="isAbong = false" />
              <DropdownMenuItem text="취소" @click="isAbong = false" />
            </template>
          </DropdownMenu>
        </BasicListElement>
      </div>
      <div v-else class="modal-user-list-container">
        <BasicListElement
          v-for="element in selectChannel.banUsers"
          :key="element.id"
          :id="element.id"
          :name="element.name"
          :avatarURL="element.avatarURL"
          :iconButtons="[{ emoji: '⊖', event: 'unban' }]"
          @response="e => console.log(e)"
        />
      </div>
    </template>
    <template #footer>
      <BasicButton text="닫기" @click="$emit('close')" />
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
</style>
