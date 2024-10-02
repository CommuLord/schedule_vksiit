<!-- src/views/HomeView.vue -->
<template>
  <div>
    <HeaderComponent />
    <main>
      <div class="main-top">

        <div class="button-container">
          <button class="main-button">
            <div class="button-content">
              <p class="h4 button-text">30.09.2024 - 04.10.2024</p>
              <img src="@/assets/Calendar.svg" alt="calendar" class="calendar-icon">
            </div>
          </button>
        </div>

        <div class="button-container">
          <button class="main-button">
            <div class="button-content">
              <img src="@/assets/Download.svg" alt="calendar" class="calendar-icon">
              <p class="h4 button-text">Экспорт</p>
            </div>
          </button>
        </div>

      </div>
      <div class="main-main">

        <div class="card-container">
          <div class="card-top">
            <p class="h2 card-top-text">Понедельник - 30.09.2024</p>
          </div>
          <div class="card-main">
            <div class="time-card">
              <p class="h2 time-card-text">Время</p>
              <div class="time-card-time">
                <p class="h2 time-card-time-text">8:00-8:45</p>
                <p class="h2 time-card-time-text">9:00-9:45</p>
                <p class="h2 time-card-time-text">10:00-10:45</p>
                <p class="h2 time-card-time-text">11:00-11:45</p>
                <p class="h2 time-card-time-text">12:00-12:45</p>
              </div>
            </div>
            <div class="subject-card">
              <p class="h2 subject-card-text">Предмет</p>
              <p class="h2 subject-card-text">Математика</p>
              <p class="h2 subject-card-text">Физика</p>
              <p class="h2 subject-card-text">Химия</p>
              <p class="h2 subject-card-text">Биология</p>
              <p class="h2 subject-card-text">История</p>
            </div>
            <div class="teacher-card">
              <p class="h2 teacher-card-text">Преподаватель</p>
              <p class="h2 teacher-card-text">Иванов И.И.</p>
              <p class="h2 teacher-card-text">Петрова А.А.</p>
              <p class="h2 teacher-card-text">Сидоров С.С.</p>
              <p class="h2 teacher-card-text">Кузнецова Е.В.</p>
              <p class="h2 teacher-card-text">Николаев Н.М.</p>
            </div>
            <div class="cabinet-card">
              <p class="h2 cabinet-card-text">Кабинет</p>
              <p class="h2 cabinet-card-text">101</p>
              <p class="h2 cabinet-card-text">202</p>
              <p class="h2 cabinet-card-text">303</p>
              <p class="h2 cabinet-card-text">404</p>
              <p class="h2 cabinet-card-text">505</p>
            </div>
          </div>
        </div>


      </div>
    </main>
  </div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue';

export default {
  name: 'HomeView',
  components: {
    HeaderComponent
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
  justify-content: center;
}

.button-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.main-button {
  width: 100%;
  background-color: #2c2c2c;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  display: flex;
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

</style>
