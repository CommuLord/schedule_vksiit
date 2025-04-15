<!-- src/App.vue -->
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style>
:root {
  --bg-color: #ffffff;
  --text-color: #2c2c2c;
  --imp-white-text: #ffffff;
  --border-color: #d9d9d9;
  --secondary-text: #757575;
  --menu-bg: #333;
  --notification-bg: #333;
}

.dark {
  --bg-color: #1a1a1a;
  --text-color: #ffffff;
  --border-color: #4d4d4d;
  --secondary-text: #a6a6a6;
  --menu-bg: #1a1a1a;
  --notification-bg: #4d4d4d;
}

body {
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.3s, color 0.3s;
}
</style>

<script>
export default {
  name: 'App'
};
</script>
