import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { useLoginStore } from '@/stores/login.store';
import { useChatStore } from './stores/chat.store';
import { useGameStore } from './stores/game.store';

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);

export const loginStore = useLoginStore();
export const chatStore = useChatStore();
export const gameStore = useGameStore();

app.mount('#app');
