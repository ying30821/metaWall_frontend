import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Feed',
    alias: '/feed',
    component: () => import('../views/Feed.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
  },
  {
    path: '/new-post',
    name: 'newPost',
    component: () => import('../views/NewPost.vue'),
  },
  {
    path: '/follows',
    name: 'Follows',
    component: () => import('../views/Follows.vue'),
  },
  {
    path: '/likes',
    name: 'Likes',
    component: () => import('../views/Likes.vue'),
  },
  {
    path: '/500',
    name: '500',
    component: () => import('../views/500.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('../views/404.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {});

export default router;
