import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import FriendsListView from '@/views/FriendsListView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/signIn',
      name: 'signIn',
      component: () => import('@/views/SignInView.vue'),
    },
    {
      path: '/signUp',
      name: 'signUp',
      component: () => import('@/views/SignUpView.vue'),
      redirect: 'signUp/setProfile',
      children: [
        {
          path: 'setProfile',
          name: 'setProfile',
          component: () => import('@/components/signin-components/SetProfile.vue'),
        },
        {
          path: 'completed',
          name: 'complete',
          component: () => import('@/components/signin-components/SignUpCompleted.vue'),
        },
      ],
    },
    {
      path: '/game',
      name: 'game',
      component: () => import('@/views/GameView.vue'),
    },
    {
      path: '/users',
      name: 'users',

      component: () => import('@/views/MyProfileView.vue'),
    },
    {
      path: '/users/:id',
      name: 'profile',

      component: () => import('@/views/ProfileView.vue'),
      props: route => ({ user_id: route.params.id }),
    },
    {
      path: '/chats',
      name: 'chats',
      component: () => import('@/views/ChatView.vue'),
    },
    {
      path: '/friends',
      name: 'friends',
      component: FriendsListView,
    },
  ],
});

export default router;
