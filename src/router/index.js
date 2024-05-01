import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  // const isAuthenticated = true;
  // if (to.name !== 'Login' && !isAuthenticated) {
  //   return { name: 'Login' };
  // }
});

export default router;
