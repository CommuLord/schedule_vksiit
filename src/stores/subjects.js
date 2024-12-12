// src/stores/subjects.js
import { defineStore } from 'pinia';
import apiClient from '@/axios';

export const useSubjectsStore = defineStore('subjects', {
  state: () => ({
    subjects: [],
    error: null,
  }),
  actions: {
    async fetchSubjects() {
      try {
        const response = await apiClient.get('/subjects');
        this.subjects = response.data;
      } catch (error) {
        this.error = error;
      }
    },
    async addSubject(name, complexity) {
      try {
        const response = await apiClient.post('/subjects', { name, complexity });
        this.subjects.push(response.data);
      } catch (error) {
        this.error = error;
      }
    },
    async updateSubject(id, name, complexity) {
      try {
        const response = await apiClient.patch(`/subjects/${id}`, { name, complexity });
        const index = this.subjects.findIndex(subject => subject.id === id);
        if (index !== -1) {
          this.subjects[index] = response.data;
        }
      } catch (error) {
        this.error = error;
      }
    },
    async deleteSubject(id) {
      try {
        await apiClient.delete(`/subjects/${id}`);
        this.subjects = this.subjects.filter(subject => subject.id !== id);
      } catch (error) {
        this.error = error;
      }
    },
  },
});
