import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';

const routes = [
  {
    path: '/',
    name: 'Feed',
    alias: '/feed',
    component: () => import('@/views/Feed.vue'),
    meta: {
      layout: 'DefaultLayout',
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: {
      layout: 'AuthLayout',
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register.vue'),
    meta: {
      layout: 'AuthLayout',
    },
  },
  {
    path: '/new-post',
    name: 'newPost',
    component: () => import('@/views/NewPost.vue'),
    meta: {
      layout: 'DefaultLayout',
    },
  },
  {
    path: '/follows',
    name: 'Follows',
    component: () => import('@/views/Follows.vue'),
    meta: {
      layout: 'DefaultLayout',
    },
  },
  {
    path: '/likes',
    name: 'Likes',
    component: () => import('@/views/Likes.vue'),
    meta: {
      layout: 'DefaultLayout',
    },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/profile/Profile.vue'),
    redirect: { name: 'ProfileSettings' },
    children: [
      {
        path: 'settings',
        name: 'ProfileSettings',
        component: () => import('@/views/profile/ProfileSettings.vue'),
        meta: {
          layout: 'DefaultLayout',
        },
      },
      {
        path: 'password-modify',
        name: 'ProfilePwdModify',
        component: () => import('@/views/profile/ProfilePwdModify.vue'),
        meta: {
          layout: 'DefaultLayout',
        },
      },
    ],
  },
  {
    path: '/500',
    name: '500',
    component: () => import('@/views/errorPage/500.vue'),
    meta: {
      layout: 'AuthLayout',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/views/errorPage/404.vue'),
    meta: {
      layout: 'AuthLayout',
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const allowRoutes = ['Login', 'Register', '404', '500'];
  if (allowRoutes.some((route) => route === to.name)) {
    return next();
  }
  if (!store.state.isSignIn) return next('/login');
  if (!store.state.userInfo) store.dispatch('setUserInfo');
  next();
});

export default router;
