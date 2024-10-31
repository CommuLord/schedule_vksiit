<template>
    <div class="card-container">
          <div class="card-top">
            <div class="card-left-top">

                <button class="white-button">
                    <div class="button-content">
                    <img src="/src/assets/blackcal.svg" alt="blckcl">
                    <p class="h4">12.48.2069</p>
                    </div>
                </button>

                <button class="white-button">
                    <div class="button-content">
                        <p class="h4 class-pad">Класс/Группа</p>
                        <img src="/src/assets/chedown.svg" alt="ched">
                    </div>
                </button>
            </div>
            <div class="card-delete">
                <button class="img-button">
                    <img class="img-delete" src="/src/assets/delete.svg" alt="delete">
                </button>
            </div>
          </div>
          <div class="card-main">
        <div class="table-container">
            <div class="table-row">
                <input type="text" class="table-cell" placeholder="Value">
                <input type="text" class="table-cell" placeholder="Value">
                <input type="text" class="table-cell" placeholder="Value">
                <input type="text" class="table-cell" placeholder="Value">
                <input type="text" class="table-cell" placeholder="Value">
            </div>
            <div class="table-row">
                <input type="text" class="table-cell" placeholder="Value">
                <input type="text" class="table-cell" placeholder="Value">
                <input type="text" class="table-cell" placeholder="Value">
                <input type="text" class="table-cell" placeholder="Value">
                <input type="text" class="table-cell" placeholder="Value">
            </div>
            <div class="table-row">
                <input type="text" class="table-cell" placeholder="Value">
                <input type="text" class="table-cell" placeholder="Value">
                <input type="text" class="table-cell" placeholder="Value">
                <input type="text" class="table-cell" placeholder="Value">
                <input type="text" class="table-cell" placeholder="Value">
            </div>
        </div>
    </div>
        </div>
</template>

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
  border: 2px solid #d9d9d9;
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
}

.card-left-top {
    display: flex;
    justify-content: space-between;
    width: 20%;
}

.class-pad {
    padding-right: 50px;
}

.table-container {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        .table-row {
            display: flex;
            gap: 10px;
        }
        .table-cell {
            flex: 1;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }

</style>
