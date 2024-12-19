// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import EnterView from '../views/EnterView.vue';
import ArchiveView from '../views/ArchiveView.vue';
import SourceDataView from '../views/SourceDataView.vue';
import NotFoundView from '../views/NotFoundView.vue';
import { useAuthStore } from '@/stores/auth';
import ScheduleDetailView from '@/views/ScheduleDetailView.vue';

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true }
  },
  {
    path: '/',
    name: 'register',
    component: EnterView
  },
  {
    path: '/archive',
    name: 'archive',
    component: ArchiveView,
    meta: { requiresAuth: true }
  },
  {
    path: '/source-data',
    name: 'source-data',
    component: SourceDataView,
    meta: { requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView
  },
  {
    path: '/schedule/:id',
    name: 'ScheduleDetail',
    component: ScheduleDetailView,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!authStore.token) {
      next({ name: 'register' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
