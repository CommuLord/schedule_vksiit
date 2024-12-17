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
        this.sortSchedules(); // Сортируем расписания по дате
        console.log('Schedules loaded:', this.schedules); // Добавлен консольный лог
      } catch (error) {
        this.error = error;
        console.error('Error loading schedules:', error); // Добавлен консольный лог
      } finally {
        this.loading = false;
      }
    },
    sortSchedules() {
      this.schedules.sort((a, b) => new Date(a.creationDate) - new Date(b.creationDate));
    },
    groupSchedules() {
      const grouped = {};
      this.schedules.forEach(schedule => {
        const date = new Date(schedule.creationDate);
        let month = date.toLocaleString('ru-RU', { month: 'long' });
        month = month.charAt(0).toUpperCase() + month.slice(1); // Преобразование первой буквы в верхний регистр
        const key = `${month} ${date.getFullYear()}`;
        if (!grouped[key]) {
          grouped[key] = [];
        }
        grouped[key].push(schedule);
      });
      return grouped;
    }
  },
});
