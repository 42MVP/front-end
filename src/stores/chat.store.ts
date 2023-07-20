import { defineStore } from 'pinia';

export const useChatStore = defineStore('chat', {
  state: () => ({
    someState: 'hello pinia',
  }),
  persist: {
    storage: sessionStorage,
  },
});
