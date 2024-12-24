<template>
  <div>
    <main>
      <div class="source-container">
        <div class="select-container">
          <div class="select-wrapper">
            <select v-model="selectedTeacher" class="source-add" @focus="isTeacherMenuOpen = true" @blur="isTeacherMenuOpen = false" @change="isTeacherMenuOpen = false">
              <option value="" disabled>Выберите учителя</option>
              <option v-for="teacher in teachers" :key="teacher.id" :value="teacher.id">
                {{ teacher.firstName }} {{ teacher.lastName }} {{ teacher.middleName ? teacher.middleName : '' }}
              </option>
            </select>
            <img :class="['save-icon', { 'rotate': isTeacherMenuOpen }]" src="/src/assets/chedown.svg" alt="ched">
          </div>
          <div class="select-wrapper">
            <select v-model="selectedSubject" class="source-add" @focus="isSubjectMenuOpen = true" @blur="isSubjectMenuOpen = false" @change="isSubjectMenuOpen = false">
              <option value="" disabled>Выберите предмет</option>
              <option v-for="subject in subjects" :key="subject.id" :value="subject.id">{{ subject.name }}</option>
            </select>
            <img :class="['save-icon', { 'rotate': isSubjectMenuOpen }]" src="/src/assets/chedown.svg" alt="ched">
          </div>
        </div>
        <div class="button-container">
          <button class="accept-button" @click="addTeacherSubject">
            <p class="h4 button-text">Добавить</p>
          </button>
        </div>
        <div class="table-cells" v-if="teacherSubjects.length > 0">
          <div
            v-for="(ts, index) in teacherSubjects"
            :key="ts.id"
            class="cell"
            :class="{ 'no-border': index === teacherSubjects.length - 1 }"
          >
            <div class="cell-text">
              <p class="h4">
                {{ getTeacherName(ts.teacherId) }} - {{ getSubjectName(ts.subjectId) }}
              </p>
            </div>
            <div class="buttons">
              <div class="buttons-wrapper">
                <img src="/src/assets/Edit.svg" alt="edit" class="button" @click="editTeacherSubject(ts)">
                <img src="/src/assets/Trash.svg" alt="delete" class="button" @click="deleteTeacherSubject(ts.id)">
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { useTeacherSubjectStore } from '@/stores/teacherSubject';

export default {
  name: 'TeacherSubjectsComponent',
  data() {
    return {
      selectedTeacher: '',
      selectedSubject: '',
      isTeacherMenuOpen: false,
      isSubjectMenuOpen: false,
    };
  },
  computed: {
    teacherSubjects() {
      return this.teacherSubjectStore.teacherSubjects;
    },
    teachers() {
      return this.teacherSubjectStore.teachers;
    },
    subjects() {
      return this.teacherSubjectStore.subjects;
    },
  },
  created() {
    this.teacherSubjectStore.fetchTeacherSubjects();
    this.teacherSubjectStore.fetchTeachers();
    this.teacherSubjectStore.fetchSubjects();
  },
  methods: {
    async addTeacherSubject() {
      if (this.selectedTeacher && this.selectedSubject) {
        try {
          await this.teacherSubjectStore.addTeacherSubject({
            teacherId: this.selectedTeacher,
            subjectId: this.selectedSubject,
          });
          this.selectedTeacher = '';
          this.selectedSubject = '';
          this.teacherSubjectStore.fetchTeacherSubjects();
        } catch (error) {
          if (error.response && error.response.status === 409) {
            alert('Relation already exists');
          } else {
            alert('An error occurred');
          }
        }
      }
    },
    getTeacherName(teacherId) {
      const teacher = this.teachers.find(t => t.id === teacherId);
      return teacher ? `${teacher.firstName} ${teacher.lastName} ${teacher.middleName ? teacher.middleName : ''}` : '';
    },
    getSubjectName(subjectId) {
      const subject = this.subjects.find(s => s.id === subjectId);
      return subject ? subject.name : '';
    },
    editTeacherSubject(ts) {
      // Логика редактирования
    },
    deleteTeacherSubject(id) {
      this.teacherSubjectStore.deleteTeacherSubject(id);
    },
  },
  setup() {
    const teacherSubjectStore = useTeacherSubjectStore();
    return {
      teacherSubjectStore,
    };
  },
};
</script>

<style scoped>
@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter-Regular.woff2') format('woff2'),
       url('/fonts/Inter-Regular.woff') format('woff');
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter-Bold.woff2') format('woff2'),
       url('/fonts/Inter-Bold.woff') format('woff');
  font-weight: 700;
  font-style: normal;
}

body {
  font-family: 'Inter', sans-serif;
  margin: 0;
}

body, p, .h1, .h2, .h3, .h4 {
  font-family: 'Inter', sans-serif;
}

/* Стили для заголовков */
.h1 {
  font-size: 32px;
  margin: 2px 0 2px 0;
}

.h2 {
  font-size: 24px;
  margin: 2px 0 2px 0;
}

.h3 {
  font-size: 18px;
  margin: 2px 0 2px 0;
}

.h4 {
  font-size: 16px;
  margin: 8px 0 8px 0;
}

.source-add {
  font-size: 16px;
  transition: all 0.1s ease-in-out;
  width: 100%;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background: none;
  padding-right: 30px; /* Добавим отступ для стрелочки */
}

select {
  padding: 8px;
  border: 2px solid #1E1E1E;
  border-radius: 8px;
  margin-right: 10px; /* Уменьшим отступ между полями */
}

.source-add:focus {
  outline: none;
  border-color: #2C2C2C;
  box-shadow: 0 0 0 0.25rem rgba(194, 194, 194, 0.25);
}

.source-container {
  display: flex;
  flex-direction: column;
  width: 877px;
}

.select-container {
  display: flex;
  justify-content: flex-start;
  gap: 8px;
}

.select-wrapper {
  position: relative;
  width: 100%;
}

.save-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  transition: transform 0.1s ease-in-out;
}

.rotate {
  transform: translateY(-50%) rotate(180deg);
}

.table-cells {
  margin-top: 16px;
  border: 2px solid #D9D9D9;
  border-radius: 16px;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 8px;
}

.cell {
  margin-top: 8px;
  border-bottom: #D9D9D9 1px dotted;
  color: #1E1E1E;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.no-border {
  border-bottom: none;
}

.cell p {
  font-weight: 500;
}

.buttons-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  margin-left: 8px;
  transition: all 0.1s ease-in-out;
  margin-top: 4px;
}

.button:hover {
  transform: translateY(-2px);
}

.button:active {
  transform: translateY(2px);
  box-shadow: none;
}

.button-container {
  margin-top: 12px;
  display: flex;
  justify-content: center;
}

.accept-button {
  width: 100%;
  background-color: #2c2c2c;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  padding: 8px 0;
}

.accept-button:hover {
  background-color: #333;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.accept-button:active {
  transform: translateY(2px);
  box-shadow: none;
}

.button-text {
  color: white;
  margin: 0;
}
</style>
