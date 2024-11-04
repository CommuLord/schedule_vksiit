<template>
  <header>
    <div class="top-header">
      <div class="header-logo-container">
        <img src="@/assets/logo.svg" alt="Logo" class="logo-img-header">
        <p class="header-logo-text h3">Менеджер расписания</p>
      </div>
      <div class="header-icons">
        <img src="@/assets/User.svg" alt="User" class="header-icon" @click="toggleUser">
        <img src="/src/assets/sun.svg" alt="Settings" class="header-icon" @click="toggleMenu">
      </div>
    </div>
    <div class="bottom-header">
      <div class="tab-container">
        <button @click="selectTab(0)" :class="{ 'tab-button': true, 'first-tab': true, 'active': activeTabIndex === 0 }">Расписание</button>
        <button @click="selectTab(1)" :class="{ 'tab-button': true, 'second-tab': true, 'active': activeTabIndex === 1 }">Архив</button>
        <button @click="selectTab(2)" :class="{ 'tab-button': true, 'third-tab': true, 'active': activeTabIndex === 2 }">Исходные данные</button>
      </div>
    </div>
    <div v-if="isMenuVisible" class="menu-wrapper">
      <div class="stroke-wrapper">
        <img class="img-menu" src="/src/assets/wsun.svg" alt="sun">
      <p class="h4">Всегда светлый</p>
      </div>
      <div class="stroke-wrapper">
        <img class="img-menu" src="/src/assets/moon.svg" alt="sun">
      <p class="h4">Всегда темный</p>
      </div>
      <div class="stroke-wrapper">
        <img class="img-menu" src="/src/assets/monitor.svg" alt="sun">
      <p class="h4">Как в системе</p>
      </div>
    </div>

    <div v-if="isUserVisible" class="user-wrapper">
      <div class="stroke-wrapper">
        <img class="img-menu" src="/src/assets/logout.svg" alt="lo">
      <p class="h4">Выйти</p>
      </div>
    </div>

  </header>
</template>

<script>
export default {
  name: 'HeaderComponent',
  data() {
    return {
      activeTabIndex: 0,
      isMenuVisible: false,
      isUserVisible: false
    }
  },
  methods: {
    selectTab(index) {
      this.activeTabIndex = index;
      if (index === 0) {
        this.$router.push('/home');
      } else if (index === 1) {
        this.$router.push('/archive');
      } else if (index === 2) {
        this.$router.push('/source-data');
      }
    },
    updateActiveTab() {
      const path = this.$route.path;
      switch (path) {
        case '/home':
          this.activeTabIndex = 0;
          break;
        case '/archive':
          this.activeTabIndex = 1;
          break;
        case '/source-data':
          this.activeTabIndex = 2;
          break;
        default:
          this.activeTabIndex = 0; // или любое другое значение по умолчанию
      }
    },
    toggleMenu() {
  this.isMenuVisible = !this.isMenuVisible;
  if (this.isMenuVisible) {
    this.isUserVisible = false;
  }
},
toggleUser() {
  this.isUserVisible = !this.isUserVisible;
  if (this.isUserVisible) {
    this.isMenuVisible = false;
  }
}

  },
  watch: {
    '$route': function() {
      this.updateActiveTab();
    }
  },
  mounted() {
    this.updateActiveTab();
  }
};
</script>

<style scoped>
/* Общие стили для текста */
body, p, .h1, .h2, .h3, .h4 {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

/* Стили для заголовков */
.h1 { font-size: 32px; margin: 2px 0 2px 0; }
.h2 { font-size: 24px; margin: 2px 0 2px 0;}
.h3 { font-size: 18px; margin: 2px 0 2px 0; }
.h4 { font-size: 16px; margin: 10px 0 10px 0; }

/* Стили для хедера */
header {
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #ffffff;
}

.top-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}

.header-logo-container {
  display: flex;
  align-items: center;
}

.logo-img-header {
  width: 28px;
  height: auto;
  transition: all 0.3s ease-in-out;
}

.logo-img-header:hover {
  transform: translateY(-2px);
}

.logo-img-header:active {
  transform: translateY(2px);
}

.header-logo-text {
  font-weight: bold;
}

.header-icons {
  display: flex;
  justify-content: space-between;
  width: 5%;
}

.header-icon {
  width: 28px;
  height: auto;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
}

.header-icon:hover {
  transform: translateY(-2px);
}

.header-icon:active {
  transform: translateY(2px);
}

.bottom-header {
  display: flex;
  justify-content: flex-start;
  padding: 10px 18px;
  border-bottom: 1px solid #d9d9d9;
}

.tab-container {
  display: flex;
  justify-content: flex-start;
  width: 50%;
}

.tab-button {
  background: none;
  border: none;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  color: #757575;
  transition: all 0.1s ease-in-out;
}

.tab-button:hover {
  color: #000000;
}

.tab-button.active {
  color: #000000;
}

.menu-wrapper {
  position: absolute;
  top: 60px;
  right: 20px;
  background-color: #333;
  border-radius: 20px;
  padding: 10px;
  color: white;
  font-family: Arial, sans-serif;
  z-index: 1000;
}

.menu-wrapper img {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

.stroke-wrapper {
  display: flex;
  align-items: center;
}

.img-menu {
  margin-right: 8px;
}

.user-wrapper {
  position: absolute;
  top: 60px;
  right: 90px;
  background-color: #333;
  border-radius: 20px;
  padding: 10px;
  color: white;
  font-family: Arial, sans-serif;
  z-index: 1000;
}

</style>
