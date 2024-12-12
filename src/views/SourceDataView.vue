<!-- src/views/SourceDataView.vue -->
<template>
  <div>
    <HeaderComponent />
    <main>
      <div class="buttons-source">
        <button @click="selectButton(0)" :class="{ 'subject-but': true, 'active': activeButtonIndex === 0 }">
          <p class="h4">Предметы</p>
        </button>
        <button @click="selectButton(1)" :class="{ 'teacher-but': true, 'active': activeButtonIndex === 1 }">
          <p class="h4">Учителя</p>
        </button>
        <button @click="selectButton(2)" :class="{ 'teacher-sub-but': true, 'active': activeButtonIndex === 2 }">
          <p class="h4">Предметы на учителей</p>
        </button>
        <button @click="selectButton(3)" :class="{ 'time-sub-but': true, 'active': activeButtonIndex === 3 }">
          <p class="h4">Время на предмет</p>
        </button>
        <button @click="selectButton(4)" :class="{ 'class-but': true, 'active': activeButtonIndex === 4 }">
          <p class="h4">Классы/Группы</p>
        </button>
        <button @click="selectButton(5)" :class="{ 'cabinet-but': true, 'active': activeButtonIndex === 5 }">
          <p class="h4">Кабинеты</p>
        </button>
      </div>
      <div class="margin-component">
        <component :is="currentComponent"></component>
      </div>
    </main>
  </div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue';
import SubjectComponent from '@/components/SubjectComponent.vue';
import TeachersComponent from '@/components/TeachersComponent.vue';
import TeacherSubjectsComponent from '@/components/TeacherSubjectsComponent.vue';
import TimeSubjectsComponent from '@/components/TimeSubjectsComponent.vue';
import ClassesComponent from '@/components/ClassesComponent.vue';
import CabinetsComponent from '@/components/CabinetsComponent.vue'; // Импортируем новый компонент

export default {
  name: 'SourceDataView',
  components: {
    HeaderComponent,
    SubjectComponent,
    TeachersComponent,
    TeacherSubjectsComponent,
    TimeSubjectsComponent,
    ClassesComponent,
    CabinetsComponent // Добавляем новый компонент
  },
  data() {
    return {
      activeButtonIndex: 0,
      currentComponent: 'SubjectComponent'
    };
  },
  methods: {
    selectButton(index) {
      this.activeButtonIndex = index;
      switch (index) {
        case 0:
          this.currentComponent = 'SubjectComponent';
          break;
        case 1:
          this.currentComponent = 'TeachersComponent';
          break;
        case 2:
          this.currentComponent = 'TeacherSubjectsComponent';
          break;
        case 3:
          this.currentComponent = 'TimeSubjectsComponent';
          break;
        case 4:
          this.currentComponent = 'ClassesComponent';
          break;
        case 5:
          this.currentComponent = 'CabinetsComponent'; // Обрабатываем новую кнопку
          break;
        default:
          this.currentComponent = 'SubjectComponent';
      }
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
  margin: 8px 0 8px 0; /* Изменено с 10px на 8px */
}

main {
  padding: 16px; /* Изменено с 20px на 16px */
  width: 900px;
}

.buttons-source {
  display: flex;
  justify-content: flex-start;
  width: 100%;
}

.buttons-source button {
  height: 40px;
  border: 2px solid #d9d9d9;
  border-radius: 8px;
  margin-right: 8px;
  padding: 12px;
  background: none;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  transition: all 0.1s ease-in-out;
  color: #757575; /* Минорный цвет */
}

.buttons-source button:hover {
  background-color: #e0e0e0;
}

.buttons-source button br {
  display: none;
}

.buttons-source button:hover {
  transform: translateY(-2px);
  background: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.buttons-source button:active {
  transform: translateY(2px);
  box-shadow: none;
}

/* Стили для активной кнопки */
.buttons-source button.active {
  color: #2C2C2C; /* Заголовочный цвет */
}

.margin-component {
  margin-top: 16px;
  width: 97%;
}
</style>
