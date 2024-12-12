<!-- src/components/ClassesComponent.vue-->
<template>
  <div>
    <main>
      <div class="source-container">
        <input type="text" placeholder="Добавить Класс/Группу" class="source-add">
        <div class="table-cells">
          <div class="cell">
            <div class="cell-text">
              <p class="h4">Англечанин</p>
            </div>
            <div class="buttons">
              <div class="buttons-wrapper">
                <img src="/src/assets/Edit.svg" alt="edit" class="button">
                <img src="/src/assets/Trash.svg" alt="delete" class="button">
              </div>
            </div>
          </div>
          <div class="cell">
            <div class="cell-text">
              <p class="h4">Англечанин</p>
            </div>
            <div class="buttons">
              <div class="buttons-wrapper">
                <img src="/src/assets/Edit.svg" alt="edit" class="button">
                <img src="/src/assets/Trash.svg" alt="delete" class="button">
              </div>
            </div>
          </div>
          <div class="cell">
            <div class="cell-text">
              <p class="h4">Англечанин</p>
            </div>
            <div class="buttons">
              <div class="buttons-wrapper">
                <img src="/src/assets/Edit.svg" alt="edit" class="button">
                <img src="/src/assets/Trash.svg" alt="delete" class="button">
              </div>
            </div>
          </div>
          <div class="cell">
            <div class="cell-text">
              <p class="h4">Англечанин</p>
            </div>
            <div class="buttons">
              <div class="buttons-wrapper">
                <img src="/src/assets/Edit.svg" alt="edit" class="button">
                <img src="/src/assets/Trash.svg" alt="delete" class="button">
              </div>
            </div>
          </div>
          <div class="cell">
            <div class="cell-text">
              <p class="h4">Англечанин</p>
            </div>
            <div class="buttons">
              <div class="buttons-wrapper">
                <img src="/src/assets/Edit.svg" alt="edit" class="button">
                <img src="/src/assets/Trash.svg" alt="delete" class="button">
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'ClassesComponent'
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

.source-add {
  font-size: 16px;
  transition: all 0.1s ease-in-out;
}

input {
  padding: 10px;
  border: 2px solid #303030;
  border-radius: 8px;
}

.source-add:focus {
  outline: none;
  border-color: #2c2c2c;
  box-shadow: 0 0 0 0.25rem rgba(194, 194, 194, 0.25);
}

.source-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.table-cells {
  margin-top: 16px;
  border: 2px solid #D9D9D9;
  border-radius: 16px;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 8px;
}

.cell {
  border-bottom: #D9D9D9 1px dotted;
  color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cell p {
  font-weight: 500;
}

.buttons-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  margin-left: 8px;
  transition: all 0.1s ease-in-out;
  margin-top: 5px;
}

.button:hover {
  transform: translateY(-2px);
}

.button:active {
  transform: translateY(2px);
  box-shadow: none;
}
  </style>