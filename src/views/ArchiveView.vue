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
    <div class="archive-section">
      <p class="h0 section-title">Январь 2025</p>
      <div v-if="loading" class="loading">
        <p class="h2">Загрузка...</p>
      </div>
      <div v-else class="archive-items">
        <button v-for="(schedule, index) in schedules" :key="schedule.id" class="archive-item">
          <p class="h2 archive-item-id">#{{ index + 1 }}</p>
          <p class="h2 archive-item-date">{{ formatDate(schedule.creationDate) }}</p>
        </button>
      </div>
    </div>
    <button class="main-button show-more-button">
      <div class="button-content">
        <p class="h4 button-text">Показать ещё</p>
      </div>
    </button>
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

    const formatDate = (date) => {
      const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
      return new Date(date).toLocaleDateString('ru-RU', options).replace(/\./g, '.');
    };

    return {
      schedules,
      loading,
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
  font-size: 24px;
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
  background-color: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  text-align: center;
  font-size: 16px;
  box-sizing: border-box;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  flex: 1 1 auto; /* Изменяем ширину через медиазапросы */
}

.archive-item:hover {
  background-color: #f0f0f0;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.archive-item:active {
  background-color: #e0e0e0;
  transform: translateY(2px);
  box-shadow: none;
}

.archive-item-id {
  font-weight: bold;
  margin-bottom: 5px;
}

.archive-item-date {
  font-size: 14px;
  color: #333;
}

/* Медиазапросы для адаптивного количества элементов в строке */
@media (min-width: 1920px) {
  .archive-item {
    flex: 1 1 calc(14.2857% - 20px); /* 7 элементов в строке */
  }
}

@media (min-width: 1200px) and (max-width: 1919px) {
  .archive-item {
    flex: 1 1 calc(25% - 20px); /* 4 элемента в строке */
  }
}

@media (min-width: 992px) and (max-width: 1199px) {
  .archive-item {
    flex: 1 1 calc(33.333% - 20px); /* 3 элемента в строке */
  }
}

@media (max-width: 991px) {
  .archive-item {
    flex: 1 1 calc(50% - 20px); /* 2 элемента в строке */
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
</style>
