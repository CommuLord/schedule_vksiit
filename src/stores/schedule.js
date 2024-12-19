// src/stores/schedule.js
import { defineStore } from 'pinia';
import apiClient from '@/axios';

export const useScheduleStore = defineStore('schedule', {
  state: () => ({
    schedules: [],
    loading: false,
  }),
  actions: {
    async fetchSchedules() {
      this.loading = true;
      try {
        const response = await apiClient.get('/schedule');
        this.schedules = response.data;
      } catch (error) {
        console.error('Ошибка при загрузке расписаний:', error);
      } finally {
        this.loading = false;
      }
    },
    async fetchScheduleById(id) {
      this.loading = true;
      try {
        console.log(`Fetching schedule with ID: ${id}`);
        const response = await apiClient.get(`/schedule/${id}`, {
          params: {
            relations: ['scheduleBlocks', 'scheduleBlocks.scheduleLessons']
          }
        });
        console.log('Fetched schedule:', response.data);
        return response.data;
      } catch (error) {
        console.error('Ошибка при загрузке расписания:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    }
    ,
    groupSchedules() {
      const grouped = {};
      this.schedules.forEach(schedule => {
        const date = new Date(schedule.creationDate).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
        if (!grouped[date]) {
          grouped[date] = [];
        }
        grouped[date].push(schedule);
      });
      return grouped;
    },
    groupScheduleBlocksByDate(schedule) {
      const grouped = {};
      schedule.scheduleBlocks.forEach(block => {
        const date = new Date(block.scheduleDate).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
        if (!grouped[date]) {
          grouped[date] = [];
        }
        grouped[date].push(block);
      });
      return grouped;
    },
  },
  getters: {
    getScheduleById: (state) => (id) => {
      return state.schedules.find(schedule => schedule.id === id);
    },
  },
});
