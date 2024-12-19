import { defineStore } from 'pinia';
import { SubjectTimeService } from '@/services/subjectTime.service';

export const useSubjectTimeStore = defineStore('subjectTime', {
  state: () => ({
    subjectTimes: [],
    subjects: [],
    error: null,
  }),
  actions: {
    async fetchSubjectTimes() {
      try {
        const response = await SubjectTimeService.getAll();
        this.subjectTimes = response.data;
      } catch (error) {
        this.error = error;
      }
    },
    async fetchSubjects() {
      try {
        const response = await SubjectTimeService.getSubjects();
        this.subjects = response.data;
      } catch (error) {
        this.error = error;
      }
    },
    async addSubjectTime(data) {
      try {
        const response = await SubjectTimeService.create(data);
        this.subjectTimes.push(response.data);
      } catch (error) {
        this.error = error;
        throw error;
      }
    },
    async updateSubjectTime(studyYear, data) {
      try {
        const response = await SubjectTimeService.update(studyYear, data);
        const index = this.subjectTimes.findIndex(st => st.studyYear === studyYear);
        if (index !== -1) {
          this.subjectTimes[index] = response.data;
        }
      } catch (error) {
        this.error = error;
      }
    },
    async deleteSubjectTime(studyYear) {
      try {
        await SubjectTimeService.delete(studyYear);
        this.subjectTimes = this.subjectTimes.filter(st => st.studyYear !== studyYear);
      } catch (error) {
        this.error = error;
      }
    },
  },
});
