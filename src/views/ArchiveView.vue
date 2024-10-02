<!-- src/views/ArchiveView.vue -->
<template>
    <div>
      <HeaderComponent />
      <main>
        <h1>Архив</h1>
        <p>Здесь будет отображаться архив.</p>
      </main>
    </div>
  </template>
  
  <script>
    import HeaderComponent from '@/components/HeaderComponent.vue';
  
  export default {
    name: 'ArchiveView',
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
  