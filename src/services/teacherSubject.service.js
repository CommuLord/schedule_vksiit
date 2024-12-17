// src/services/teacherSubject.service.js
import apiClient from '@/axios';

export const TeacherSubjectService = {
  getAll() {
    return apiClient.get('/teacher-subject');
  },
  getByTeacher(teacherId) {
    return apiClient.get(`/teacher-subject/teacher/${teacherId}`);
  },
  getBySubject(subjectId) {
    return apiClient.get(`/teacher-subject/subject/${subjectId}`);
  },
  create(data) {
    return apiClient.post('/teacher-subject', data);
  },
  update(id, data) {
    return apiClient.patch(`/teacher-subject/${id}`, data);
  },
  delete(id) {
    return apiClient.delete(`/teacher-subject/${id}`);
  },
};
