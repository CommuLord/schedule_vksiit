<!-- src/views/HomeView.vue -->
<template>
  <div>
    <HeaderComponent />
    <main>
      <div class="main-top">
        <div class="button-container">
          <button class="main-button margin-button" @click.stop="toggleWeekMenu">
            <div class="button-content">
              <p class="h4 button-text">Неделя</p>
              <img :class="['save-icon', { 'rotate': isWeekMenuOpen }]" src="/src/assets/arrowd.svg" alt="save">
            </div>
          </button>
          <button class="main-button" @click.stop="toggleCalendar">
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
      <transition name="fade">
        <div v-if="isWeekMenuOpen" class="week-menu-wrapper" @click.stop>
          <div class="stroke-wrapper" @click="setWeekDays(5)">
            <img class="img-menu" src="@/assets/calendar.svg" alt="5 days">
            <p class="h4">5 дней</p>
          </div>
          <div class="stroke-wrapper" @click="setWeekDays(6)">
            <img class="img-menu" src="@/assets/calendar.svg" alt="6 days">
            <p class="h4">6 дней</p>
          </div>
        </div>
      </transition>
      <transition name="fade">
        <div v-if="isCalendarOpen" class="calendar-wrapper" @click.stop>
          <v-calendar :attributes="attrs" @dayclick="onDayClick" />
        </div>
      </transition>
      <div v-for="(day, index) in weekDays" :key="index" class="day-change-div">
        <div class="day-change" @click="toggleDropdown(index)">
          <p class="h0">{{ day.name }} - {{ day.date }}</p>
          <img :class="['arrow-icon', { 'rotate': isDropdownOpen[index] }]" src="/src/assets/chedowntitle.svg" alt="chedown">
        </div>
        <transition name="dropdown">
          <div v-show="isDropdownOpen[index]" class="dropdown-content">
            <transition-group name="card" tag="div" class="main-main">
              <ScheduleCard v-for="card in day.cards" :key="card.id" @delete="removeCard(index, card.id)" @click.stop />
            </transition-group>
            <div class="new-day-container">
              <button class="main-button" @click.stop="addCard(index)">
                <div class="button-content">
                  <img src="/src/assets/new.svg" alt="new" class="new-icon">
                  <p class="h4 button-text">Добавить группу</p>
                </div>
              </button>
            </div>
          </div>
        </transition>
      </div>
    </main>
  </div>
</template>

<script>
import { reactive, ref, onMounted, onBeforeUnmount } from 'vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
import ScheduleCard from '@/components/ScheduleCard.vue';
import { Calendar } from 'v-calendar';
import 'v-calendar/dist/style.css'; // Импорт стилей v-calendar

export default {
  name: 'HomeView',
  components: {
    HeaderComponent,
    ScheduleCard,
    'v-calendar': Calendar
  },
  setup() {
    const weekDays = reactive([]);
    const isDropdownOpen = reactive([]);
    const isWeekMenuOpen = ref(false);
    const isCalendarOpen = ref(false);
    const selectedDate = ref(null);

    const initializeWeekDays = (daysCount, startDate = new Date()) => {
      const startOfWeek = getStartOfWeek(startDate);
      const daysOfWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

      weekDays.length = 0; // Clear the array
      weekDays.push(...daysOfWeek.slice(0, daysCount).map((dayName, index) => {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + index);
        return {
          name: dayName,
          date: date.toLocaleDateString(),
          cards: []
        };
      }));

      isDropdownOpen.length = 0; // Clear the array
      isDropdownOpen.push(...new Array(weekDays.length).fill(false));
    };

    const getStartOfWeek = (date) => {
      const day = date.getDay();
      const diff = date.getDate() - day + (day === 0 ? -6 : 1);
      return new Date(date.setDate(diff));
    };

    const addCard = (index) => {
      weekDays[index].cards.push({ id: Date.now() });
    };

    const removeCard = (index, id) => {
      weekDays[index].cards = weekDays[index].cards.filter(card => card.id !== id);
    };

    const toggleDropdown = (index) => {
      isDropdownOpen[index] = !isDropdownOpen[index];
    };

    const toggleWeekMenu = () => {
      isWeekMenuOpen.value = !isWeekMenuOpen.value;
    };

    const toggleCalendar = () => {
      isCalendarOpen.value = !isCalendarOpen.value;
    };

    const setWeekDays = (daysCount) => {
      initializeWeekDays(daysCount);
      isWeekMenuOpen.value = false;
    };

    const onDayClick = (day) => {
      selectedDate.value = day.date;
      initializeWeekDays(weekDays.length, day.date);
      isCalendarOpen.value = false;
    };

    const closeWeekMenu = (event) => {
      if (!event.target.closest('.week-menu-wrapper')) {
        isWeekMenuOpen.value = false;
      }
    };

    const closeCalendar = (event) => {
      if (!event.target.closest('.calendar-wrapper')) {
        isCalendarOpen.value = false;
      }
    };

    onMounted(() => {
      document.addEventListener('click', closeWeekMenu);
      document.addEventListener('click', closeCalendar);
    });

    onBeforeUnmount(() => {
      document.removeEventListener('click', closeWeekMenu);
      document.removeEventListener('click', closeCalendar);
    });

    initializeWeekDays(5); // Initialize with 5 days by default

    return {
      weekDays,
      isDropdownOpen,
      isWeekMenuOpen,
      isCalendarOpen,
      addCard,
      removeCard,
      toggleDropdown,
      toggleWeekMenu,
      toggleCalendar,
      setWeekDays,
      onDayClick
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

.dropdown-enter-active, .dropdown-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.dropdown-enter, .dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.dropdown-enter-to, .dropdown-leave {
  opacity: 1;
  transform: translateY(0);
}

.card-enter-active, .card-leave-active {
  transition: all 0.1s ease;
}

.card-enter, .card-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.card-enter-to, .card-leave {
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

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.1s;
}

.fade-enter, .fade-leave-to {
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
