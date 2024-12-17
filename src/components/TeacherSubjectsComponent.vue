<!-- src/components/TeacherSubjectsComponent.vue -->
<template>
  <div>
    <main>
      <div class="source-container">
        <div class="select-container">
          <select v-model="selectedTeacher" class="source-add">
            <option value="" disabled>Выберите учителя</option>
            <option v-for="teacher in teachers" :key="teacher.id" :value="teacher.id">
              {{ teacher.firstName }} {{ teacher.lastName }} {{ teacher.middleName ? teacher.middleName : '' }}
            </option>
          </select>
          <select v-model="selectedSubject" class="source-add">
            <option value="" disabled>Выберите предмет</option>
            <option v-for="subject in subjects" :key="subject.id" :value="subject.id">{{ subject.name }}</option>
          </select>
        </div>
        <div class="button-container">
          <button class="accept-button" @click="addTeacherSubject">
            <p class="h4 button-text">Добавить</p>
          </button>
        </div>
        <div class="table-cells">
          <div v-for="ts in teacherSubjects" :key="ts.id" class="cell">
            <div class="cell-text">
              <p class="h4">{{ ts.teacher?.firstName }} {{ ts.teacher?.lastName }} - {{ ts.subject?.name }}</p>
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
  width: 100%;
}

.select-container {
  display: flex;
  justify-content: flex-start; /* Выравнивание по левому краю */
  gap: 10px; /* Добавим небольшой отступ между полями */
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
  border-bottom: #D9D9D9 1px dotted;
  color: #1E1E1E;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  margin-top: 20px;
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
  padding: 10px 0; /* Добавим паддинг для кнопки */
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
