// src/stores/schedule.js
import { defineStore } from 'pinia';
import apiClient from '@/axios';

export const useScheduleStore = defineStore('schedule', {
  state: () => ({
    schedules: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchSchedules() {
      this.loading = true;
      this.error = null;
      try {
        const response = await apiClient.get('/schedule');
        this.schedules = response.data;
        console.log('Schedules loaded:', this.schedules); // Добавлен консольный лог
      } catch (error) {
        this.error = error;
        console.error('Error loading schedules:', error); // Добавлен консольный лог
      } finally {
        this.loading = false;
      }
    },
  },
});
