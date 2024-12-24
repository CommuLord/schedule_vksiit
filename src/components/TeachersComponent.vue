<!-- src/components/TeachersComponent.vue -->
<template>
  <div>
    <main>
      <div class="source-container">
        <input
          type="text"
          v-model="newTeacherName"
          placeholder="Добавить учителя"
          class="source-add"
          @keyup.enter="addTeacher"
        />
        <div class="table-cells" v-if="teachers.length > 0">
          <div
            class="cell"
            v-for="(teacher, index) in teachers"
            :key="teacher.id"
            :class="{ 'no-border': index === teachers.length - 1 }"
          >
            <div class="cell-text">
              <p class="h4">{{ teacher.firstName }} {{ teacher.lastName }} {{ teacher.middleName }}</p>
            </div>
            <div class="buttons">
              <div class="buttons-wrapper">
                <img
                  src="/src/assets/Edit.svg"
                  alt="edit"
                  class="button"
                  @click="startEdit(teacher)"
                />
                <img
                  src="/src/assets/Trash.svg"
                  alt="delete"
                  class="button"
                  @click="deleteTeacher(teacher.id)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { useTeachersStore } from '@/stores/teachers';

export default {
  name: 'TeachersComponent',
  data() {
    return {
      newTeacherName: '',
      editingTeacher: null,
    };
  },
  computed: {
    teachers() {
      return useTeachersStore().teachers;
    },
  },
  methods: {
    addTeacher() {
      if (this.newTeacherName.trim()) {
        const parts = this.newTeacherName.trim().split(' ');
        if (parts.length < 2) {
          alert('Введите имя и фамилию учителя.');
          return;
        }
        const firstName = parts[0];
        const lastName = parts[1];
        const middleName = parts[2] || null;
        useTeachersStore().addTeacher(firstName, lastName, middleName);
        this.newTeacherName = '';
      }
    },
    startEdit(teacher) {
      this.editingTeacher = teacher;
      this.newTeacherName = `${teacher.firstName} ${teacher.lastName} ${teacher.middleName || ''}`;
    },
    updateTeacher() {
      if (this.editingTeacher && this.newTeacherName.trim()) {
        const parts = this.newTeacherName.trim().split(' ');
        if (parts.length < 2) {
          alert('Введите имя и фамилию учителя.');
          return;
        }
        const firstName = parts[0];
        const lastName = parts[1];
        const middleName = parts[2] || null;
        useTeachersStore().updateTeacher(this.editingTeacher.id, firstName, lastName, middleName);
        this.editingTeacher = null;
        this.newTeacherName = '';
      }
    },
    deleteTeacher(id) {
      useTeachersStore().deleteTeacher(id);
    },
  },
  mounted() {
    useTeachersStore().fetchTeachers();
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

input {
  padding: 8px;
  border: 2px solid #2C2C2C;
  border-radius: 8px;
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
</style>
