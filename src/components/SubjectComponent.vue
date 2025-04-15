<!-- src/components/SubjectComponent.vue -->
<template>
  <div>
    <main>
      <div class="source-container">
        <input
          type="text"
          v-model="newSubjectName"
          placeholder="Добавить предмет"
          class="source-add"
          @keyup.enter="addSubject"
        />
        <div class="table-cells" v-if="subjects.length > 0">
          <div
            class="cell"
            v-for="(subject, index) in subjects"
            :key="subject.id"
            :class="{ 'no-border': index === subjects.length - 1 }"
          >
            <div class="cell-text">
              <p class="h4">{{ subject.name }}</p>
            </div>
            <div class="buttons">
              <div class="buttons-wrapper">
                <img
                  :src="currentEdit"
                  alt="edit"
                  class="button"
                  @click="startEdit(subject)"
                />
                <img
                  :src="currentTrash"
                  alt="delete"
                  class="button"
                  @click="deleteSubject(subject.id)"
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
import { useSubjectsStore } from '@/stores/subjects';
import { useThemeStore } from '@/stores/theme'
import TrashLight from '@/assets/Trash.svg'
import TrashDark from '@/assets/Trash-dark.svg'
import EditLight from '@/assets/Edit.svg'
import EditDark from '@/assets/Edit-dark.svg'

export default {
  name: 'SubjectComponent',
  data() {
    return {
      newSubjectName: '',
      editingSubject: null,
    };
  },
  setup() {
    const themeStore = useThemeStore()
    return { themeStore }
  },
  computed: {
    currentTrash() {
      return this.themeStore.isDark ? TrashDark : TrashLight
    },
    currentEdit() {
      return this.themeStore.isDark ? EditDark : EditLight
    },
    subjects() {
      return useSubjectsStore().subjects;
    }
  },
  methods: {
    addSubject() {
      if (this.newSubjectName.trim()) {
        useSubjectsStore().addSubject(this.newSubjectName, 0);
        this.newSubjectName = '';
      }
    },
    startEdit(subject) {
      this.editingSubject = subject;
      this.newSubjectName = subject.name;
    },
    updateSubject() {
      if (this.editingSubject && this.newSubjectName.trim()) {
        useSubjectsStore().updateSubject(this.editingSubject.id, this.newSubjectName, 0);
        this.editingSubject = null;
        this.newSubjectName = '';
      }
    },
    deleteSubject(id) {
      useSubjectsStore().deleteSubject(id);
    },
  },
  mounted() {
    useSubjectsStore().fetchSubjects();
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
  background-color: var(--bg-color);
  border-color: var(--border-color);
  font-size: 16px;
  transition: all 0.1s ease-in-out;
  color: var(--text-color);
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
  border: 2px solid var(--border-color);
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

.cell-text {
  color: var(--text-color);
}
</style>
