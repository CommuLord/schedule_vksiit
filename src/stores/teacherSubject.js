// src/stores/teacherSubject.js
import { defineStore } from 'pinia';
import { TeacherSubjectService } from '@/services/teacherSubject.service';
import { TeacherService } from '@/services/teacher.service';
import { SubjectService } from '@/services/subject.service';

export const useTeacherSubjectStore = defineStore('teacherSubject', {
  state: () => ({
    teacherSubjects: [],
    teachers: [],
    subjects: [],
    error: null,
  }),
  actions: {
    async fetchTeacherSubjects() {
      try {
        const response = await TeacherSubjectService.getAll();
        this.teacherSubjects = response.data;
      } catch (error) {
        this.error = error;
      }
    },
    async fetchTeachers() {
      try {
        const response = await TeacherService.getAll();
        this.teachers = response.data;
      } catch (error) {
        this.error = error;
      }
    },
    async fetchSubjects() {
      try {
        const response = await SubjectService.getAll();
        this.subjects = response.data;
      } catch (error) {
        this.error = error;
      }
    },
    async addTeacherSubject(data) {
      try {
        const response = await TeacherSubjectService.create(data);
        this.teacherSubjects.push(response.data);
      } catch (error) {
        this.error = error;
        throw error;
      }
    },
    async updateTeacherSubject(id, data) {
      try {
        const response = await TeacherSubjectService.update(id, data);
        const index = this.teacherSubjects.findIndex(ts => ts.id === id);
        if (index !== -1) {
          this.teacherSubjects[index] = response.data;
        }
      } catch (error) {
        this.error = error;
      }
    },
    async deleteTeacherSubject(id) {
      try {
        await TeacherSubjectService.delete(id);
        this.teacherSubjects = this.teacherSubjects.filter(ts => ts.id !== id);
      } catch (error) {
        this.error = error;
      }
    },
  },
});
