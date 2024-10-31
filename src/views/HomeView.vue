<!-- src/views/HomeView.vue -->
<template>
  <div>
    <HeaderComponent />
    <main>
      <div class="main-top">

        <div class="button-container">
          
          <button class="main-button margin-button">
            <div class="button-content">
              <p class="h4 button-text">Неделя</p>
              <img src="/src/assets/arrowd.svg" alt="save" class="save-icon">
            </div>
          </button>

          <button class="main-button">
            <div class="button-content">
              <img src="@/assets/Calendar.svg" alt="calendar" class="calendar-icon">
              <p class="h4 button-text">Стартовая дата</p>
            </div>
          </button>

        </div>

        <div class="button-container-end">

          <button class="main-button margin-button">
            <div class="button-content">
              <img src="/src/assets/Save.svg" alt="download" class="download-icon">
              <p class="h4 button-text">Сохранить</p>
            </div>
          </button>

          <button class="main-button">
            <div class="button-content">
              <img src="@/assets/Download.svg" alt="download" class="download-icon">
              <p class="h4 button-text">Сохранить и Экспортировать</p>
            </div>
          </button>

        </div>

      </div>
      <div class="main-main">

        <ScheduleCard />

      </div>
      <div class="new-day-container">
        <button class="main-button">
          <div class="button-content">
            <img src="/src/assets/new.svg" alt="new" class="new-icon">
            <p class="h4 button-text">Добавить день</p>
          </div>
        </button>
      </div>
    </main>
  </div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue';
import ScheduleCard from '@/components/ScheduleCard.vue';

export default {
  name: 'HomeView',
  components: {
    HeaderComponent,
    ScheduleCard
  }
};
</script>

<style scoped>
/* Общие стили для текста */
body,
p,
.h1,
.h2,
.h3,
.h4 {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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

</style>
