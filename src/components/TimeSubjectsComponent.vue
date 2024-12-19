<!-- src/components/TimeSubjectsComponent.vue -->
<template>
  <div>
    <main>
      <div class="source-container">
        <div class="input-an-wrapper">
          <div class="input-wrapper first-input">
            <select v-model="selectedTeacherSubject" class="source-add">
              <option value="" disabled>Выберите учителя и предмет</option>
              <option v-for="ts in teacherSubjects" :key="ts.id" :value="ts.id">
                {{ getTeacherName(ts.teacherId) }} - {{ getSubjectName(ts.subjectId) }}
              </option>
            </select>
          </div>
          <div class="input-wrapper second-input">
            <input v-model="subjectTime" type="number" placeholder="Время на предмет" class="source-add">
          </div>
          <div class="input-wrapper third-input">
            <input v-model="studyYear" type="number" placeholder="Учебный год" class="source-add">
          </div>
          <div class="button-container">
            <button class="accept-button" @click="addSubjectTime">
              <p class="h4 button-text">Добавить</p>
            </button>
          </div>
        </div>
        <div class="table-cells">
          <div v-for="st in subjectTimes" :key="st.studyYear" class="cell">
            <div class="cell-text">
              <p class="h4">{{ getTeacherSubjectName(st.teacherSubjectId) }} - {{ st.subjectTime }} часов в {{ st.studyYear }} году</p>
            </div>
            <div class="buttons">
              <div class="buttons-wrapper">
                <img src="/src/assets/Edit.svg" alt="edit" class="button" @click="editSubjectTime(st)">
                <img src="/src/assets/Trash.svg" alt="delete" class="button" @click="deleteSubjectTime(st.studyYear)">
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { useSubjectTimeStore } from '@/stores/subjectTime';
import { useTeacherSubjectStore } from '@/stores/teacherSubject';

export default {
  name: 'TimeSubjectsComponent',
  data() {
    return {
      selectedTeacherSubject: '',
      subjectTime: '',
      studyYear: '',
    };
  },
  computed: {
    subjectTimes() {
      return this.subjectTimeStore.subjectTimes;
    },
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
    this.subjectTimeStore.fetchSubjectTimes();
    this.teacherSubjectStore.fetchTeacherSubjects();
    this.teacherSubjectStore.fetchTeachers();
    this.teacherSubjectStore.fetchSubjects();
  },
  methods: {
    async addSubjectTime() {
      if (this.selectedTeacherSubject && this.subjectTime && this.studyYear) {
        try {
          await this.subjectTimeStore.addSubjectTime({
            studyYear: this.studyYear,
            teacherSubjectId: this.selectedTeacherSubject,
            subjectTime: this.subjectTime,
          });
          this.selectedTeacherSubject = '';
          this.subjectTime = '';
          this.studyYear = '';
          this.subjectTimeStore.fetchSubjectTimes();
        } catch (error) {
          alert('An error occurred');
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
    getTeacherSubjectName(teacherSubjectId) {
      const teacherSubject = this.teacherSubjects.find(ts => ts.id === teacherSubjectId);
      return teacherSubject ? `${this.getTeacherName(teacherSubject.teacherId)} - ${this.getSubjectName(teacherSubject.subjectId)}` : '';
    },
    editSubjectTime(st) {
      // Логика редактирования
    },
    deleteSubjectTime(studyYear) {
      this.subjectTimeStore.deleteSubjectTime(studyYear);
    },
  },
  setup() {
    const subjectTimeStore = useSubjectTimeStore();
    const teacherSubjectStore = useTeacherSubjectStore();
    return {
      subjectTimeStore,
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
  padding: 8px;
  border: 2px solid #1E1E1E;
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
}

.input-an-wrapper {
  display: flex;
  width: 100%;
  gap: 10px;
}

.input-wrapper {
  position: relative;
  margin-bottom: 10px;
}

.first-input {
  flex: 3;
}

.second-input {
  flex: 1;
}

.arrow-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  width: 20px;
  height: auto;
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
</style>
