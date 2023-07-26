import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { useLoginStore } from '@/stores/login.store';
import { VueCookies } from 'vue-cookies';

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);
app.use(VueCookies, { expireTimes: '30d', secure: true });

export const loginStore = useLoginStore();

app.mount('#app');
