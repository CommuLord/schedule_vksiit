<template>
  <div class="card-container">
    <div class="card-top">
      <div class="card-left-top">
        <button class="white-button">
          <div class="button-content">
            <p class="h4">Класс/Группа</p>
            <img src="/src/assets/chedown.svg" alt="ched">
          </div>
        </button>
      </div>
      <div class="card-delete">
        <button class="img-button" @click="deleteCard">
          <img class="img-delete" src="/src/assets/delete.svg" alt="delete">
        </button>
      </div>
    </div>
    <div class="card-main">
      <div class="table-container">
        <div class="table-row">
          <p class="h2 title-cell">Начало</p>
          <p class="h2 title-cell">Конец</p>
          <p class="h2 title-cell">Предмет</p>
          <p class="h2 title-cell">Преподаватель</p>
          <p class="h2 title-cell">Кабинет</p>
        </div>
        <div class="table-row" v-for="(item, index) in schedule" :key="index">
          <input type="text" class="table-cell" v-model="item.start" @input="checkInput(index)">
          <input type="text" class="table-cell" v-model="item.end" @input="checkInput(index)">
          <input type="text" class="table-cell" v-model="item.subject" @input="checkInput(index)">
          <input type="text" class="table-cell" v-model="item.teacher" @input="checkInput(index)">
          <input type="text" class="table-cell" v-model="item.room" @input="checkInput(index)">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      schedule: [
        { start: '', end: '', subject: '', teacher: '', room: '' }
      ]
    };
  },
  methods: {
    checkInput(index) {
      const currentRow = this.schedule[index];
      const isFilled = Object.values(currentRow).some(value => value.trim() !== '');

      if (isFilled && index === this.schedule.length - 1) {
        this.schedule.push({ start: '', end: '', subject: '', teacher: '', room: '' });
      } else if (!isFilled && index === this.schedule.length - 1 && this.schedule.length > 1) {
        this.schedule.pop();
      }
    },
    deleteCard() {
      this.$emit('delete', this.id);
    }
  }
};
</script>

<style scoped>
/* Общие стили для текста */
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
  border: 1px solid black;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  display: flex;
  width: 100%;
}

.white-button:hover {
  transform: translateY(-2px);
  background: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: space-between;
  width: 100%;
}

.table-row {
  display: flex;
  gap: 36px;
}

.table-cell {
  flex: 1;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  transition: all 0.1s ease-in-out;
  width: calc(100% / 5 - 36px * 4 / 5);
}

.table-cell:focus {
  outline: none;
  border-color: #2c2c2c;
  box-shadow: 0 0 0 0.25rem rgba(194, 194, 194, 0.25);
}

.title-cell {
  flex: 1;
}
</style>
