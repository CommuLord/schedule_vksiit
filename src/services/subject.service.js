// src/services/subject.service.js
import apiClient from '@/axios';

export const SubjectService = {
  getAll() {
    return apiClient.get('/subjects');
  },
};
