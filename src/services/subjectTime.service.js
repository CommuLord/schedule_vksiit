import apiClient from '@/axios';

export const SubjectTimeService = {
  getAll() {
    return apiClient.get('/subject-time');
  },
  getSubjects() {
    return apiClient.get('/subjects');
  },
  create(data) {
    return apiClient.post('/subject-time', data);
  },
  update(studyYear, data) {
    return apiClient.patch(`/subject-time/${studyYear}`, data);
  },
  delete(studyYear) {
    return apiClient.delete(`/subject-time/${studyYear}`);
  },
};
