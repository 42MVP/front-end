import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: import('@/views/HomeView.vue'),
    },
    {
      path: '/signIn',
      name: 'signIn',
      component: () => import('../views/SignInView.vue'),
      redirect: 'signIn/choose',
      children: [
        {
          path: 'choose',
          name: 'choose',
          component: () => import('@/components/signup-components/LoginButton.vue'),
        },
        {
          path: 'oauth',
          name: 'oauth',
          component: () => import('@/components/signup-components/LoginOauth.vue'),
        },
      ],
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
      component: () => import('@/views/FriendsListView.vue'),
    },
  ],
});

export default router;
