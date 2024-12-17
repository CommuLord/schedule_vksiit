// src/services/teacher.service.js
import apiClient from '@/axios';

export const TeacherService = {
  getAll() {
    return apiClient.get('/teachers');
  },
};
