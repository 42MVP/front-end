<template>
  <div class="chat-box">
    <div class="chat-info-line">
      <div class="chat-info-line-box">
        <AvatarItem class="user-avatar" :avartarUrl="props.chat.avatarURL" imgSize="50" />
      </div>
      <div class="chat-info-line-text">
        <p
          :class="{
            'chat-info-line-box': !isMyMessage,
            'chat-info-line-box-me': isMyMessage,
          }"
        >
          {{ props.chat.username }}
        </p>
        <p class="chat-info-line-time">
          {{ timeString }}
        </p>
      </div>
    </div>
    <p class="chat-message">
      {{ props.chat.message }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import AvatarItem from '../common/AvatarItem.vue';
import { useLoginStore } from '@/stores/login.store';
import type { Chat } from '@/interfaces/chat/Chat.interface';

const loginStore = useLoginStore();
const loginUsername = ref(loginStore?.name);

const props = defineProps<{ chat: Chat }>();

const isMyMessage = computed(() => {
  return props.chat.username === loginUsername.value;
});

const timeString = computed(() => {
  return `${props.chat.date.getHours() > 12 ? '오후' : '오전'}\
  ${props.chat.date.getHours() % 12}:${props.chat.date.getMinutes().toString().padStart(2, '0')}`;
});
</script>

<style scoped>
.chat-box {
  border-radius: 20px;
  padding: 10px 20px;
  background-color: var(--base-ivory, #f4f3ee);
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
  color: var(--brown, #463f3a);
}

.chat-info-line-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font: var(--medium);
}

.chat-info-line-box-me {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font: var(--medium);
  color: var(--base-pink, #e0afa0);
}

.chat-info-line-time {
  display: flex;
  align-items: center;
  font: var(--small);
  opacity: 0.5;
}

.chat-message {
  padding: 10px;
  font: var(--medium);
  color: var(--brown, #463f3a);
  overflow-wrap: break-word;
}
</style>
