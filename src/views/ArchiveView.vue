<!-- src/views/ArchiveView.vue -->
<template>
  <HeaderComponent />
  <div class="archive-container">
    <button class="main-button-denied">
      <div class="button-content">
        <img src="@/assets/Calendar-denied.svg" alt="calendar" class="calendar-icon">
        <p class="h4 button-text-denied">Выберите период</p>
      </div>
    </button>
    <div v-if="loading" class="loading">
      <p class="h2">Загрузка...</p>
    </div>
    <div v-else>
      <div v-for="(group, key) in groupedSchedules" :key="key" class="archive-section">
        <p class="h0 section-title">{{ key }}</p>
        <div class="archive-items">
          <router-link
            v-for="(schedule, index) in group"
            :key="schedule.id"
            :to="{ name: 'ScheduleDetail', params: { id: schedule.id } }"
            class="archive-item"
          >
            <p class="h2 archive-item-id">#{{ index + 1 }}</p>
            <p class="h2 archive-item-date">{{ formatDate(schedule.creationDate) }}</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue';
import { useScheduleStore } from '@/stores/schedule';
import { onMounted, computed } from 'vue';

export default {
  name: 'ArchiveView',
  components: {
    HeaderComponent
  },
  setup() {
    const scheduleStore = useScheduleStore();

    onMounted(() => {
      scheduleStore.fetchSchedules();
    });

    const schedules = computed(() => scheduleStore.schedules);
    const loading = computed(() => scheduleStore.loading);
    const groupedSchedules = computed(() => scheduleStore.groupSchedules());

    const formatDate = (date) => {
      const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
      return new Date(date).toLocaleDateString('ru-RU', options).replace(/\./g, '.');
    };

    return {
      schedules,
      loading,
      groupedSchedules,
      formatDate
    };
  }
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
.h0 {
  font-size: 40px;
  margin: 2px 0 2px 0;
  font-weight: 600;
}

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

.archive-container {
  padding: 20px;
}

.period-selector {
  margin-bottom: 20px;
}

.archive-section {
  margin-top: 20px;
}

.section-title {
  margin-bottom: 10px;
}

.archive-items {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.archive-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  background-color: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  text-align: center;
  font-size: 16px;
  box-sizing: border-box;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  width: calc(14.2857% - 20px);
}

.archive-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.archive-item:active {
  transform: translateY(2px);
  box-shadow: none;
}

.archive-item-id {
  font-weight: bold;
  margin-bottom: 5px;
  color: var(--text-color);
}

.archive-item-date {
  font-size: 14px;
  color: var(--text-color);
}

@media (min-width: 1920px) {
  .archive-item {
    width: calc(14.2857% - 20px);
  }
}

@media (min-width: 1200px) and (max-width: 1919px) {
  .archive-item {
    width: calc(25% - 20px);
  }
}

@media (min-width: 992px) and (max-width: 1199px) {
  .archive-item {
    width: calc(33.333% - 20px);
  }
}

@media (max-width: 991px) {
  .archive-item {
    width: calc(50% - 20px);
  }
}

.show-more-button {
  display: block;
  margin: 20px auto;
}

.show-more-button:hover {
  background-color: #555;
}

.button-text {
  color: white;
  margin: 9px;
}

.button-text-denied {
  color: #B3B3B3;
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

.main-button-denied {
  background-color: #D9D9D9;
  border: 1px solid #B3B3B3;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  display: flex;
}

.main-button-denied:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.main-button-denied:active {
  transform: translateY(2px);
  box-shadow: none;
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

a:link, a:visited, a:hover, a:active {
  text-decoration: none;
}
</style>
