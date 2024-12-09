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
              <img src="/src/assets/Download.svg" alt="download" class="download-icon">
              <p class="h4 button-text">Сохранить и Экспортировать</p>
            </div>
          </button>
        </div>
      </div>
      <div class="day-change-div">
        <div class="day-change">
          <p class="h0">Понедельник - 12.48.2069</p>
          <img src="/src/assets/chedowntitle.svg" alt="chedown">
        </div>
      </div>
      <div class="main-main">
        <ScheduleCard v-for="card in cards" :key="card.id" @delete="removeCard(card.id)" />
      </div>
      <div class="new-day-container">
        <button class="main-button" @click="addCard">
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
  },
  data() {
    return {
      cards: []
    };
  },
  methods: {
    addCard() {
      this.cards.push({ id: Date.now() }); // Используем текущее время как уникальный идентификатор
    },
    removeCard(id) {
      this.cards = this.cards.filter(card => card.id !== id);
    }
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
}

.day-change {
  display: flex;
}

.h0 {
  font-size: 40px;
  margin: 2px 0 2px 0;
  margin-right: 8px;
  font-weight: bold;
}

</style>
