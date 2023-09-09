import { createRouter, createWebHistory } from 'vue-router';
import { useLoginStore } from '@/stores/login.store';
import { useModalStore } from '@/stores/modal.store';
import NotFound from '@/views/NotFoundView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
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
        {
          path: '2fa-auth',
          name: '2fa-auth',
          component: () => import('@/components/signin-components/TwoFactor.vue'),
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
      path: '/matching',
      name: 'matching',
      component: () => import('@/views/MatchingView.vue'),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/game',
      name: 'game',
      component: () => import('@/views/GameView.vue'),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('@/views/MyProfileView.vue'),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/users/:username',
      name: 'profile',
      component: () => import('@/views/ProfileView.vue'),
      props: route => ({ username: route.params.username }),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/chats',
      name: 'chats',
      component: () => import('@/views/ChatView.vue'),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/friends',
      name: 'friends',
      component: () => import('@/views/FriendsView.vue'),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/404',
      name: 'notFound',
      component: NotFound,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404',
    },
  ],
});

router.beforeEach((to, from, next) => {
  const loginStore = useLoginStore();
  const modalStore = useModalStore();

  const routerNotify = async (uri: string, message: string) => {
    await router.push(uri);
    modalStore.notify(message);
  };

  if (to.meta.requireAuth && !loginStore.isLogin) {
    routerNotify('/signin', '로그인이 필요합니다.');
  }
  next();
});

export default router;
