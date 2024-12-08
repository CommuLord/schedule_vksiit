// src/stores/userStore.js
import { defineStore } from 'pinia';
import apiClient from '../api';
import jwtDecode from 'jwt-decode'; // Импортируем как именованный экспорт

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    token: null,
  }),
  actions: {
    async login(credentials) {
      try {
        const response = await apiClient.post('/auth/login', credentials);
        this.token = response.data.access_token;
        this.user = jwtDecode(this.token); // Используйте функцию jwtDecode для декодирования токена
      } catch (error) {
        console.error('Login error:', error);
        throw error;
      }
    },
    async fetchUserData() {
      try {
        const response = await apiClient.get('/auth/profile', {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        this.user = response.data;
      } catch (error) {
        console.error('Fetch user data error:', error);
      }
    },
  },
});
