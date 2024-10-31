<!-- src/views/ArchiveView.vue -->
<template>
    <div>
      <HeaderComponent />
      <main>
        <p class="h1">Архив</p>
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
  </style>
  