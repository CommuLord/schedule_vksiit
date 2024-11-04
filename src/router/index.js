// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import EnterView from '../views/EnterView.vue';
import ArchiveView from '../views/ArchiveView.vue';
import SourceDataView from '../views/SourceDataView.vue';

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/',
    name: 'register',
    component: EnterView
  },
  {
    path: '/archive',
    name: 'archive',
    component: ArchiveView
  },
  {
    path: '/source-data',
    name: 'source-data',
    component: SourceDataView
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
