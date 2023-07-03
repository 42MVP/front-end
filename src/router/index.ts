import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import FriendsListView from '../views/FriendsListView.vue';
import GameView from '../views/GameView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/game',
      name: 'game',
      component: () => import('../views/GameView.vue'),
    },
    {
      path: '/users',
      name: 'users',
      component: () => import(/* webpackChunkName: "user" */ '../views/MyProfileView.vue'),
    },
    {
      path: '/users/:id',
      name: 'profile',
      component: () => import(/* webpackChunkName: "user" */ '../views/ProfileView.vue'),
      props: route => ({ user_id: route.params.id }),
    },
    {
      path: '/chats',
      name: 'chats',
      component: () => import('../views/ChatView.vue'),
    },
    {
      path: '/friends',
      name: 'friends',
      component: FriendsListView,
    },
  ],
});

export default router;
