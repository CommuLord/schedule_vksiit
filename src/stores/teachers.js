// src/stores/teachers.js
import { defineStore } from 'pinia';
import apiClient from '@/axios';

export const useTeachersStore = defineStore('teachers', {
  state: () => ({
    teachers: [],
    error: null,
  }),
  actions: {
    async fetchTeachers() {
      try {
        const response = await apiClient.get('/teachers');
        this.teachers = response.data;
      } catch (error) {
        this.error = error;
      }
    },
    async addTeacher(firstName, lastName, middleName) {
      try {
        const response = await apiClient.post('/teachers', { firstName, lastName, middleName });
        this.teachers.push(response.data);
      } catch (error) {
        this.error = error;
      }
    },
    async updateTeacher(id, firstName, lastName, middleName) {
      try {
        const response = await apiClient.patch(`/teachers/${id}`, { firstName, lastName, middleName });
        const index = this.teachers.findIndex(teacher => teacher.id === id);
        if (index !== -1) {
          this.teachers[index] = response.data;
        }
      } catch (error) {
        this.error = error;
      }
    },
    async deleteTeacher(id) {
      try {
        await apiClient.delete(`/teachers/${id}`);
        this.teachers = this.teachers.filter(teacher => teacher.id !== id);
      } catch (error) {
        this.error = error;
      }
    },
  },
});
