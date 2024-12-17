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
  }),
  actions: {
    async fetchTeacherSubjects() {
      const response = await TeacherSubjectService.getAll();
      this.teacherSubjects = response.data;
    },
    async fetchTeachers() {
      const response = await TeacherService.getAll();
      this.teachers = response.data;
    },
    async fetchSubjects() {
      const response = await SubjectService.getAll();
      this.subjects = response.data;
    },
    async addTeacherSubject(data) {
      const response = await TeacherSubjectService.create(data);
      this.teacherSubjects.push(response.data);
    },
    async updateTeacherSubject(id, data) {
      const response = await TeacherSubjectService.update(id, data);
      const index = this.teacherSubjects.findIndex(ts => ts.id === id);
      if (index !== -1) {
        this.teacherSubjects[index] = response.data;
      }
    },
    async deleteTeacherSubject(id) {
      await TeacherSubjectService.delete(id);
      this.teacherSubjects = this.teacherSubjects.filter(ts => ts.id !== id);
    },
  },
});
