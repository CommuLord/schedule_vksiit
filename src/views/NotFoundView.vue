<!-- src/views/NotFoundView.vue -->
<template>
    <div class="not-found-container">
      <main>
        <section id="not-found">
          <div class="logo-container">
            <img src="@/assets/logo.svg" alt="Logo" class="logo-img" id="logo-img">
            <div class="h1">
              <span class="span-top">Менеджер</span>
              <span>расписания</span>
            </div>
          </div>
          <div class="not-found-inner-container">
            <div class="not-found-message">
              <h2 class="h2">404</h2>
              <p class="p1">Страница не найдена</p>
              <button class="accept-button" @click="goHome">
                <p class="h4 button-text">Вернуться на главную</p>
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NotFoundView',
    methods: {
      goHome() {
        this.$router.push('/');
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
  
  main {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-height: 80vh;
    color: #1E1E1E;
  }
  
  #not-found {
    display: flex;
    flex-direction: column;
  }
  
  .logo-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    font-weight: 500;
  }
  
  .logo-img {
    width: 65px;
    height: auto;
    margin-right: 4px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
  }
  
  .logo-img:hover {
    transform: translateY(-2px);
  }
  
  .logo-img:active {
    transform: translateY(2px);
  }
  
  .not-found-inner-container {
    padding: 16px;
    border-radius: 8px;
    border: none;
    min-width: 320px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  
  .not-found-message {
    text-align: center;
  }
  
  .h1 { font-size: 32px; margin: 2px 0 2px 0; }
  .h2 { font-size: 24px; margin: 2px 0 2px 0;}
  .h3 { font-size: 18px; margin: 2px 0 2px 0; }
  .h4 { font-size: 16px; margin: 10px 0 10px 0; }
  
  .button-text {
    color: white;
    margin: 8px;
  }
  
  .accept-button {
    width: 100%;
    background-color: #2c2c2c;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.1s ease-in-out;
  }
  
  .accept-button:hover {
    background-color: #333;
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .accept-button:active {
    transform: translateY(2px);
    box-shadow: none;
  }
  
  .p1 { line-height: 1.5; margin-bottom: 18px; }
  .p2 { line-height: 1.3; margin-bottom: 12px; }
  .p3 { line-height: 1.2; margin-bottom: 10px; }
  
  .span-top {
    display: block;
    margin-bottom: -8px;
  }
  </style>
  