<template>
    <footer class="footer">
      <p class="h4 footer-text">Кузнецов Т.Е. и Гусев И.Н. Все права защищены &copy;</p>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'FooterComponent'
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
  
  body,
  h4,
  .h1,
  .h2,
  .h3,
  .h4 {
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
    color: #757575;
    font-size: 16px;
    margin: 10px 0 10px 0;
  }
  
  /* Стили для футера */
  .footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: var(--bg-color);
    padding: 10px 0;
    text-align: center;
  }
  
  .footer-text {
    font-weight: normal;
    color: var(--text-color);
  }
  </style>
  