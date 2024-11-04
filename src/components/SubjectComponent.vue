<!-- src/components/SubjectComponent.vue-->
<template>
  <div>
    <main>
      <div class="source-container">
        <input type="text" placeholder="Добавить предмет" class="source-add">
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'SubjectComponent'
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

.source-add {
  font-size: 16px;
  transition: all 0.1s ease-in-out;
  width: 100%;
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
}
  </style>
  