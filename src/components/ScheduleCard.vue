<template>
  <div class="card-container">
    <div class="card-top">
      <div class="card-left-top">
        <button class="white-button" @click.stop="toggleGroupMenu">
          <div class="button-content">
            <p class="h4">{{ selectedGroup ? selectedGroup.name : 'Класс/Группа' }}</p>
            <img :class="['save-icon', { 'rotate': isGroupMenuOpen }]" src="/src/assets/chedown.svg" alt="ched">
          </div>
        </button>
        <transition name="fade">
          <div v-if="isGroupMenuOpen" class="group-menu-wrapper" @click.stop>
            <div class="stroke-wrapper" v-for="group in groups" :key="group.id" @click="selectGroup(group)">
              <p class="group-text h4">{{ group.name }}</p>
            </div>
          </div>
        </transition>
      </div>
      <div class="card-delete">
        <button class="img-button" @click="deleteCard">
          <img class="img-delete" src="/src/assets/delete.svg" alt="delete">
        </button>
      </div>
    </div>
    <div class="card-main">
      <div class="table-container">
        <div class="title-row">
          <p class="h2 title-cell">Начало</p>
          <p class="h2 title-cell">Конец</p>
          <p class="h2 title-cell">Преподаватель</p>
          <p class="h2 title-cell">Предмет</p>
          <p class="h2 title-cell">Кабинет</p>
        </div>
        <div class="table-row" v-for="(item, index) in schedule" :key="index">
          <input type="text" class="table-cell" v-model="item.start" @input="checkInput(index)">
          <input type="text" class="table-cell" v-model="item.end" @input="checkInput(index)">
          <div class="table-cell-dropdown">
            <button class="white-button" @click.stop="toggleTeacherMenu(index)">
              <div class="button-content">
                <p class="h4">{{ item.teacher ? formatTeacherName(item.teacher) : 'Преподаватель' }}</p>
                <img :class="['save-icon', { 'rotate': isTeacherMenuOpen[index] }]" src="/src/assets/chedown.svg"
                  alt="ched">
              </div>
            </button>
            <transition name="fade">
              <div v-if="isTeacherMenuOpen[index]" class="teacher-menu-wrapper" @click.stop>
                <div class="stroke-wrapper" v-for="teacher in teachers" :key="teacher.id"
                  @click="selectTeacher(teacher, index)">
                  <p class="h4">{{ formatTeacherName(teacher) }}</p>
                </div>
              </div>
            </transition>
          </div>
          <div class="table-cell-dropdown">
            <button class="white-button" @click.stop="toggleSubjectMenu(index)">
              <div class="button-content">
                <p class="h4">{{ item.subject ? item.subject.name : 'Предмет' }}</p>
                <img :class="['save-icon', { 'rotate': isSubjectMenuOpen[index] }]" src="/src/assets/chedown.svg"
                  alt="ched">
              </div>
            </button>
            <transition name="fade">
              <div v-if="isSubjectMenuOpen[index]" class="subject-menu-wrapper" @click.stop>
                <div class="stroke-wrapper" v-for="subject in getSubjectsByTeacher(item.teacher)" :key="subject.id"
                  @click="selectSubject(subject, index)">
                  <p class="h4">{{ subject.name }}</p>
                </div>
              </div>
            </transition>
          </div>
          <div class="table-cell-dropdown">
            <button class="white-button" @click.stop="toggleCabinetMenu(index)">
              <div class="button-content">
                <p class="h4">{{ item.room || 'Кабинет' }}</p>
                <img :class="['save-icon', { 'rotate': isCabinetMenuOpen[index] }]" src="/src/assets/chedown.svg"
                  alt="ched">
              </div>
            </button>
            <transition name="fade">
              <div v-if="isCabinetMenuOpen[index]" class="cabinet-menu-wrapper" @click.stop>
                <div class="stroke-wrapper" v-for="cabinet in cabinets" :key="cabinet.id"
                  @click="selectCabinet(cabinet, index)">
                  <p class="h4">{{ cabinet.name }}</p>
                </div>
              </div>
            </transition>
          </div>
          <button class="img-button"
            :class="{ 'hidden': index === 0 || (index === schedule.length - 1 && isLastRowEmpty(index)) }"
            @click="deleteRow(index)"
            :disabled="index === 0 || (index === schedule.length - 1 && isLastRowEmpty(index))">
            <img class="img-delete" src="/src/assets/Minus.svg" alt="delete">
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch, onMounted, computed } from 'vue';
import { useGroupsStore } from '@/stores/groups';
import { useSubjectsStore } from '@/stores/subjects';
import { useTeachersStore } from '@/stores/teachers';
import { useCabinetsStore } from '@/stores/cabinets';
import { useTeacherSubjectStore } from '@/stores/teacherSubject';

export default {
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  setup(props, { emit }) {
    const groupsStore = useGroupsStore();
    const subjectsStore = useSubjectsStore();
    const teachersStore = useTeachersStore();
    const cabinetsStore = useCabinetsStore();
    const teacherSubjectStore = useTeacherSubjectStore();

    const groups = ref(groupsStore.groups);
    const subjects = ref(subjectsStore.subjects);
    const teachers = ref(teachersStore.teachers);
    const cabinets = ref(cabinetsStore.cabinets);
    const teacherSubjects = ref(teacherSubjectStore.teacherSubjects);

    const selectedGroup = ref(null);
    const isGroupMenuOpen = ref(false);
    const isSubjectMenuOpen = ref([]);
    const isTeacherMenuOpen = ref([]);
    const isCabinetMenuOpen = ref([]);

    const schedule = ref([
      { start: '', end: '', subject: null, teacher: null, room: '', teacherSubjectId: null, cabinetId: null }
    ]);

    const toggleGroupMenu = () => {
      isGroupMenuOpen.value = !isGroupMenuOpen.value;
    };

    const toggleSubjectMenu = (index) => {
      isSubjectMenuOpen.value[index] = !isSubjectMenuOpen.value[index];
    };

    const toggleTeacherMenu = (index) => {
      isTeacherMenuOpen.value[index] = !isTeacherMenuOpen.value[index];
    };

    const toggleCabinetMenu = (index) => {
      isCabinetMenuOpen.value[index] = !isCabinetMenuOpen.value[index];
    };

    const selectGroup = (group) => {
      selectedGroup.value = group;
      isGroupMenuOpen.value = false;
    };

    const selectSubject = (subject, index) => {
      schedule.value[index].subject = subject;
      schedule.value[index].teacherSubjectId = teacherSubjects.value.find(ts => ts.subjectId === subject.id && ts.teacherId === schedule.value[index].teacher.id).id;
      isSubjectMenuOpen.value[index] = false;
      checkInput(index);
    };

    const selectTeacher = (teacher, index) => {
      schedule.value[index].teacher = teacher;
      schedule.value[index].subject = null; // Сброс предмета при выборе нового учителя
      isTeacherMenuOpen.value[index] = false;
      checkInput(index);
    };

    const selectCabinet = (cabinet, index) => {
      schedule.value[index].room = cabinet.name;
      schedule.value[index].cabinetId = cabinet.id; // Добавление cabinetId
      console.log(`Selected cabinet: ${cabinet.name}, cabinetId: ${cabinet.id}`); // Логирование
      isCabinetMenuOpen.value[index] = false;
      checkInput(index);
    };

    const checkInput = (index) => {
      const currentRow = schedule.value[index];
      const isFilled = Object.values(currentRow).some(value => value !== null && value !== '');
      if (isFilled && index === schedule.value.length - 1) {
        schedule.value.push({ start: '', end: '', subject: null, teacher: null, room: '', teacherSubjectId: null, cabinetId: null });
        isSubjectMenuOpen.value.push(false);
        isTeacherMenuOpen.value.push(false);
        isCabinetMenuOpen.value.push(false);
      } else if (!isFilled && index === schedule.value.length - 1 && schedule.value.length > 1) {
        schedule.value.pop();
        isSubjectMenuOpen.value.pop();
        isTeacherMenuOpen.value.pop();
        isCabinetMenuOpen.value.pop();
      }
    };

    const deleteRow = (index) => {
      schedule.value.splice(index, 1);
      isSubjectMenuOpen.value.splice(index, 1);
      isTeacherMenuOpen.value.splice(index, 1);
      isCabinetMenuOpen.value.splice(index, 1);
    };

    const deleteCard = () => {
      emit('delete', props.id);
    };

    const formatTeacherName = (teacher) => {
      return `${teacher.firstName} ${teacher.lastName ? teacher.lastName.charAt(0) + '.' : ''} ${teacher.middleName ? teacher.middleName.charAt(0) + '.' : ''}`.trim();
    };

    const isLastRowEmpty = (index) => {
      const lastRow = schedule.value[index];
      return Object.values(lastRow).every(value => value === null || value === '');
    };

    const getSubjectsByTeacher = computed(() => (teacher) => {
      if (!teacher) return [];
      return subjects.value.filter(subject => teacherSubjects.value.some(ts => ts.teacherId === teacher.id && ts.subjectId === subject.id));
    });

    watch(() => groupsStore.groups, (newGroups) => {
      groups.value = newGroups;
    });

    watch(() => subjectsStore.subjects, (newSubjects) => {
      subjects.value = newSubjects;
    });

    watch(() => teachersStore.teachers, (newTeachers) => {
      teachers.value = newTeachers;
    });

    watch(() => cabinetsStore.cabinets, (newCabinets) => {
      cabinets.value = newCabinets;
    });

    watch(() => teacherSubjectStore.teacherSubjects, (newTeacherSubjects) => {
      teacherSubjects.value = newTeacherSubjects;
    });

    onMounted(() => {
      subjectsStore.fetchSubjects();
      teachersStore.fetchTeachers();
      cabinetsStore.fetchCabinets();
      teacherSubjectStore.fetchTeacherSubjects();
    });

    watch(schedule, (newSchedule) => {
      emit('update:schedule', { id: props.id, selectedGroup: selectedGroup.value, schedule: newSchedule });
    }, { deep: true });

    return {
      groups,
      subjects,
      teachers,
      cabinets,
      teacherSubjects,
      selectedGroup,
      isGroupMenuOpen,
      isSubjectMenuOpen,
      isTeacherMenuOpen,
      isCabinetMenuOpen,
      schedule,
      toggleGroupMenu,
      toggleSubjectMenu,
      toggleTeacherMenu,
      toggleCabinetMenu,
      selectGroup,
      selectSubject,
      selectTeacher,
      selectCabinet,
      checkInput,
      deleteRow,
      deleteCard,
      formatTeacherName,
      isLastRowEmpty,
      getSubjectsByTeacher
    };
  }
};
</script>

<style scoped>
/* Общие стили для текста */
@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter-Regular.woff2') format('woff2'), url('/fonts/Inter-Regular.woff') format('woff');
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter-Bold.woff2') format('woff2'), url('/fonts/Inter-Bold.woff') format('woff');
  font-weight: 700;
  font-style: normal;
}

body {
  font-family: 'Inter', sans-serif;
  margin: 0;
}

body,
p,
.h1,
.h2,
.h3,
.h4 {
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
  margin: 10px 0 10px 0;
}

main {
  padding: 20px;
}

.main-top {
  display: flex;
  justify-content: space-between;
}

.button-text {
  color: white;
  margin: 9px;
}

.button-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-start;
  width: 30%;
}

.button-container-end {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  width: 30%;
}

.button-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-wrap: nowrap;
  width: 100%;
}

.main-button {
  background-color: #2c2c2c;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  display: flex;
}

.margin-button {
  margin-right: 8px;
}

.main-button:hover {
  background-color: #333;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.main-button:active {
  transform: translateY(2px);
  box-shadow: none;
}

.main-main {
  margin-top: 20px;
}

.card-container {
  border: 2px solid #d9d9d9;
  display: flex;
  flex-direction: column;
  padding: 16px;
  border-radius: 16px;
}

.card-main {
  display: flex;
  justify-content: space-between;
}

.card-top-text {
  font-weight: 500;
  text-decoration: underline;
}

.new-day-container {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 24px;
}

.img-button {
  background: none;
  border: none;
  transition: all 0.1s ease-in-out;
}

.img-button:hover {
  transform: translateY(-2px);
}

.img-button:active {
  transform: translateY(2px);
}

.card-top {
  display: flex;
  justify-content: space-between;
}

.white-button {
  background: none;
  border: 1px solid #D9D9D9;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  display: flex;
  width: 100%;
}

.white-button:hover {
  transform: translateY(-2px);
  background: none;
}

.white-button:active {
  transform: translateY(2px);
  box-shadow: none;
}

.card-left-top {
  display: flex;
  justify-content: flex-start;
  gap: 16px;
  width: 240px;
  margin-bottom: 16px;
}

.class-pad {
  padding-right: 50px;
}

.table-container {
  display: grid;
  width: 100%;
  gap: 16px;
}

.table-row {
  display: flex;
  gap: 18px;
}

.table-cell,
.table-cell-dropdown {
  flex: 1;
  border: 1px solid #D9D9D9;
  border-radius: 8px;
  transition: all 0.1s ease-in-out;
  width: calc(20% - 18px);
  box-sizing: border-box;
  padding: none;
  margin: 0 !important;
}

.table-cell-dropdown {
  border: none;
}

.table-cell:focus {
  outline: none;
  border-color: #2c2c2c;
  box-shadow: 0 0 0 0.25rem rgba(194, 194, 194, 0.25);
}

.title-row {
  width: 96%;
  gap: 24px;
  display: grid;
  grid-template-columns: repeat(5, 5fr);
}

.title-cell {
  box-sizing: border-box;
  text-align: left;
}

.group-menu-wrapper {
  margin-top: 45px;
  position: absolute;
  background-color: #333;
  border-radius: 8px;
  color: white;
  width: 238px;
  z-index: 100;
}

.teacher-menu-wrapper,
.subject-menu-wrapper,
.cabinet-menu-wrapper {
  position: absolute;
  background-color: #333;
  border-radius: 8px;
  color: white;
  width: 338px;
  z-index: 100;
}

.stroke-wrapper {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 8px;
}

.img-menu {
  margin-right: 8px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.rotate {
  transform: rotate(180deg);
}

.hidden {
  visibility: hidden;
  pointer-events: none;
}

.calendar-icon {
  margin-left: 12px;
}

.download-icon {
  margin-left: 12px;
}

.save-download-icon {
  margin-left: 12px;
}

.save-icon {
  margin-right: 4px;
}

.group-text {
  margin-left: 8px;
}
</style>
