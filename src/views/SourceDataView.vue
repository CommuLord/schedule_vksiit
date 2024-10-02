<!-- src/views/SourceDataView.vue -->
<template>
    <div>
      <HeaderComponent />
      <main>
        <h1>Исходные данные</h1>
        <p>Здесь будут отображаться исходные данные.</p>
      </main>
    </div>
  </template>
  
  <script>
  import HeaderComponent from '@/components/HeaderComponent.vue';
  
  export default {
    name: 'SourceDataView',
    components: {
      HeaderComponent
    }
  };
  </script>
  
  <style scoped>
  /* Стили для основного контента */
  main {
    padding: 20px;
  }
  </style>
  