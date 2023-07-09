<template>
  <div class="chat-box">
    <div class="chat-info-line">
      <div class="chat-info-line-box">
        <img :src="chat.userAvatarURL !== '' ? chat.userAvatarURL : ''" class="user-avatar" />
      </div>
      <div class="chat-info-line-text">
        <p
          :class="{
            'chat-info-line-box': chat.username !== login_username,
            'chat-info-line-box-me': chat.username === login_username,
          }"
        >
          {{ chat.username }}
        </p>
        <p class="chat-info-line-time">
          {{ chat.date.getHours() > 12 ? '오후' : '오전' }}
          {{ chat.date.getHours() % 12 }}:{{ chat.date.getMinutes() < 10 ? '0' : '' }}{{ chat.date.getMinutes() }}
        </p>
      </div>
    </div>
    <p class="chat-message">
      {{ chat.message }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { userStore } from '../../stores/user';

const login_username = ref(userStore?.user?.name);
const props = defineProps({
  chat: {},
});
</script>

<style scoped>
.chat-box {
  border-radius: 20px;
  padding: 10px 20px;
  background-color: #f4f3ee;
  margin: 15px 5px;
}

.chat-info-line {
  display: flex;
  align-content: center;
  text-align: center;
  height: 70px;
}

.user-avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 0px 20px 0px 0px;
  font-size: 50px;
}

.chat-info-line-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  color: #463f3a;
}

.chat-info-line-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 24px;
  font-family: Inter;
  font-weight: 500;
}

.chat-info-line-box-me {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 24px;
  font-family: Inter;
  font-weight: 500;
  color: #e0afa0;
}

.chat-info-line-time {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-family: Inter;
  font-weight: 500;
  line-height: 32px;
  opacity: 0.5;
}

.chat-message {
  padding: 10px;
  font-size: 24px;
  font-family: Inter;
  font-weight: 500;
  line-height: 32px;
  color: #463f3a;
  overflow-wrap: break-word;
}
</style>
