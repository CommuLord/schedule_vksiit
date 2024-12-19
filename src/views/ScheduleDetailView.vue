<template>
    <div>
      <HeaderComponent />
      <main>
        <div v-if="loading" class="loading">
          <p class="h2">Загрузка...</p>
        </div>
        <div v-else-if="schedule" class="schedule-detail-container">
          <h1>Расписание</h1>
          <p>Дата создания: {{ formatDate(schedule.creationDate) }}</p>
          <p>Создатель: {{ schedule.creatorLogin }}</p>
          <div v-for="(blocks, date) in groupedScheduleBlocks" :key="date" class="day-change-div">
            <div class="day-change">
              <p class="h0">{{ date }}</p>
            </div>
            <div class="dropdown-content">
              <div class="main-main">
                <div v-for="(block, blockIndex) in blocks" :key="blockIndex" class="card-container">
                  <div class="card-main">
                    <div v-for="(lesson, lessonIndex) in block.scheduleLessons" :key="lessonIndex">
                      <p class="h4">{{ formatTime(lesson.startLesson) }} - {{ formatTime(lesson.endLesson) }}</p>
                      <p class="h4">{{ getTeacherSubjectName(lesson.teacherSubjectId) }}</p>
                      <p class="h4">Кабинет: {{ getCabinetName(lesson.cabinetId) }}</p>
                    </div>
                    <p class="card-top-text">{{ getGroupName(block.groupId) }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="error">
          <p class="h2">Ошибка загрузки расписания.</p>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  import HeaderComponent from '@/components/HeaderComponent.vue';
  import { useScheduleStore } from '@/stores/schedule';
  import { useGroupsStore } from '@/stores/groups';
  import { useTeacherSubjectStore } from '@/stores/teacherSubject';
  import { useCabinetsStore } from '@/stores/cabinets';
  import { onMounted, computed, ref } from 'vue';
  import { useRoute } from 'vue-router';
  
  export default {
    name: 'ScheduleDetailView',
    components: { HeaderComponent },
    setup() {
      const scheduleStore = useScheduleStore();
      const groupsStore = useGroupsStore();
      const teacherSubjectStore = useTeacherSubjectStore();
      const cabinetsStore = useCabinetsStore();
      const route = useRoute();
      const scheduleId = computed(() => route.params.id);
      const schedule = ref(null);
      const loading = ref(true);
  
      const formatDate = (date) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(date).toLocaleDateString('ru-RU', options).replace(/\./g, '.');
      };
  
      const formatTime = (time) => {
        if (!time) return 'Неизвестное время';
        try {
          const [hours, minutes] = time.split(':');
          return `${hours}:${minutes}`;
        } catch (error) {
          console.error('Ошибка при форматировании времени:', error);
          return 'Неизвестное время';
        }
      };
  
      const getGroupName = (groupId) => {
        const group = groupsStore.groups.find(group => group.id === groupId);
        return group ? group.name : 'Неизвестная группа';
      };
  
      const getTeacherSubjectName = (teacherSubjectId) => {
        const teacherSubject = teacherSubjectStore.teacherSubjects.find(ts => ts.id === teacherSubjectId);
        if (teacherSubject) {
          const teacher = teacherSubjectStore.teachers.find(t => t.id === teacherSubject.teacherId);
          const subject = teacherSubjectStore.subjects.find(s => s.id === teacherSubject.subjectId);
          return teacher && subject ? `${teacher.lastName} ${teacher.firstName.charAt(0)}.${teacher.middleName.charAt(0)}. - ${subject.name}` : 'Неизвестный преподаватель';
        }
        return 'Неизвестный преподаватель';
      };
  
      const getCabinetName = (cabinetId) => {
        const cabinet = cabinetsStore.cabinets.find(cabinet => cabinet.id === cabinetId);
        return cabinet ? cabinet.name : 'Неизвестный кабинет';
      };
  
      const groupedScheduleBlocks = computed(() => {
        if (schedule.value) {
          return scheduleStore.groupScheduleBlocksByDate(schedule.value);
        }
        return {};
      });
  
      onMounted(async () => {
        try {
          schedule.value = await scheduleStore.fetchScheduleById(scheduleId.value);
          console.log('Fetched schedule:', schedule.value);
          await groupsStore.fetchGroups();
          await teacherSubjectStore.fetchTeacherSubjects();
          await teacherSubjectStore.fetchTeachers();
          await teacherSubjectStore.fetchSubjects();
          await cabinetsStore.fetchCabinets();
        } catch (error) {
          console.error('Ошибка при загрузке расписания:', error);
        } finally {
          loading.value = false;
        }
      });
  
      return {
        schedule,
        loading,
        formatDate,
        formatTime,
        getGroupName,
        getTeacherSubjectName,
        getCabinetName,
        groupedScheduleBlocks,
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
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  
  .card-container {
    border: 1px solid #d9d9d9;
    display: flex;
    flex-direction: column;
    padding: 10px;
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
  
  .day-change-div {
    display: flex;
    flex-direction: column;
    cursor: pointer;
  }
  
  .day-change {
    display: flex;
    align-items: center;
  }
  
  .h0 {
    font-size: 40px;
    margin: 2px 0 2px 0;
    margin-right: 8px;
    font-weight: bold;
  }
  
  .dropdown-content {
    margin-top: 10px;
  }
  
  .arrow-icon {
    transition: transform 0.3s ease;
  }
  
  .rotate {
    transform: rotate(180deg);
  }
  
  .dropdown-enter-active,
  .dropdown-leave-active {
    transition: opacity 0.3s, transform 0.3s;
  }
  
  .dropdown-enter,
  .dropdown-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }
  
  .dropdown-enter-to,
  .dropdown-leave {
    opacity: 1;
    transform: translateY(0);
  }
  
  .card-enter-active,
  .card-leave-active {
    transition: all 0.1s ease;
  }
  
  .card-enter,
  .card-leave-to {
    opacity: 0;
    transform: translateY(10px);
  }
  
  .card-enter-to,
  .card-leave {
    opacity: 1;
    transform: translateY(0);
  }
  
  .week-menu-wrapper {
    position: absolute;
    margin-top: 8px;
    background-color: #333;
    border-radius: 8px;
    color: white;
    width: 200px;
  }
  
  .week-menu-wrapper img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
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
  
  .calendar-wrapper {
    position: absolute;
    left: 133px;
    margin-top: 8px;
    background-color: #333;
    border-radius: 8px;
    color: white;
  }
  </style>
  