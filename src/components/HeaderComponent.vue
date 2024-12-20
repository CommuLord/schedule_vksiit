<template>
  <header>
    <div class="top-header">
      <div class="header-logo-container">
        <img src="@/assets/logo.svg" alt="Logo" class="logo-img-header">
        <p class="header-logo-text h2">Менеджер<br>расписания</p>
      </div>
      <div class="header-icons">
        <img src="@/assets/User.svg" alt="User" class="header-icon" @click="toggleUser">
        <img src="@/assets/sun.svg" alt="Settings" class="header-icon header-icon-right" @click="toggleMenu">
      </div>
    </div>
    <div class="bottom-header">
      <div class="tab-container">
        <button @click="selectTab(0)"
          :class="{ 'tab-button': true, 'first-tab': true, 'active': activeTabIndex === 0 }">Расписание</button>
        <button @click="selectTab(1)"
          :class="{ 'tab-button': true, 'second-tab': true, 'active': activeTabIndex === 1 }">Архив</button>
        <button @click="selectTab(2)"
          :class="{ 'tab-button': true, 'third-tab': true, 'active': activeTabIndex === 2 }">Исходные данные</button>
      </div>
    </div>
    <transition name="fade">
      <div v-if="isMenuVisible" class="menu-wrapper" @click.stop>
        <div class="stroke-wrapper" @click="showThemeChangeNotification">
          <img class="img-menu" src="@/assets/wsun.svg" alt="sun">
          <p class="h4">Всегда светлый</p>
        </div>
        <div class="stroke-wrapper" @click="showThemeChangeNotification">
          <img class="img-menu" src="@/assets/moon.svg" alt="sun">
          <p class="h4">Всегда темный</p>
        </div>
        <div class="stroke-wrapper" @click="showThemeChangeNotification">
          <img class="img-menu" src="@/assets/monitor.svg" alt="sun">
          <p class="h4">Как в системе</p>
        </div>
      </div>
    </transition>

    <transition name="fade">
      <div v-if="isUserVisible" class="user-wrapper" @click.stop>
        <div class="stroke-wrapper" @click="logout">
          <img class="img-menu" src="@/assets/logout.svg" alt="lo">
          <p class="h4">Выйти</p>
        </div>
      </div>
    </transition>

    <transition name="notification-fade">
      <div v-if="showNotification" class="notification">
        Смена цветовой темы ещё не готова
        <div class="notification-bar"></div>
      </div>
    </transition>
  </header>
</template>

<script>
import { useAuthStore } from '@/stores/auth';

export default {
  name: 'HeaderComponent',
  data() {
    return {
      activeTabIndex: 0,
      isMenuVisible: false,
      isUserVisible: false,
      showNotification: false
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
          this.activeTabIndex = 0;
      }
    },
    toggleMenu(event) {
      event.stopPropagation();
      this.isMenuVisible = !this.isMenuVisible;
      if (this.isMenuVisible) {
        this.isUserVisible = false;
      }
    },
    toggleUser(event) {
      event.stopPropagation();
      this.isUserVisible = !this.isUserVisible;
      if (this.isUserVisible) {
        this.isMenuVisible = false;
      }
    },
    closeMenus() {
      this.isMenuVisible = false;
      this.isUserVisible = false;
    },
    logout() {
      const authStore = useAuthStore();
      authStore.clearToken();
      this.$router.push('/');
    },
    showThemeChangeNotification() {
      this.showNotification = true;
      this.$nextTick(() => {
        const notificationBar = document.querySelector('.notification-bar');
        if (notificationBar) {
          notificationBar.style.width = '100%';
          notificationBar.style.transition = 'width 1s linear';
          setTimeout(() => {
            notificationBar.style.width = '0%';
            setTimeout(() => {
              this.showNotification = false;
            }, 1000);
          }, 0);
        }
      });
    }


  },
  watch: {
    '$route': function () {
      this.updateActiveTab();
    }
  },
  mounted() {
    this.updateActiveTab();
    document.addEventListener('click', this.closeMenus);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeMenus);
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

body,
p,
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
  font-size: 16px;
  margin: 10px 0 10px 0;
}

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
  padding: 5px 20px;
}

.header-logo-container {
  display: flex;
  align-items: center;
}

.logo-img-header {
  width: 35px;
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
  color: #2C2C2C;
  font-weight: bold;
  line-height: 20px;
}

.header-icons {
  display: flex;
  justify-content: space-between;
}

.header-icon {
  width: 40px;
  height: auto;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
}

.header-icon-right {
  margin-left: 24px;
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
  padding: 12px 18px;
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

.tab-button.active {
  color: #2C2C2C;
}

.menu-wrapper {
  position: absolute;
  top: 60px;
  right: 20px;
  background-color: #333;
  border-radius: 20px;
  padding: 16px;
  color: white;
  font-family: Arial, sans-serif;
  z-index: 1000;
  width: 272px;
}

.menu-wrapper img {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

.stroke-wrapper {
  padding-left: 12px;
  display: flex;
  align-items: center;
  cursor: pointer;
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
  width: 272px;
  padding: 16px;
  color: white;
  font-family: Arial, sans-serif;
  z-index: 1000;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.notification {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #333;
  color: white;
  padding: 10px 20px;
  border-radius: 10px;
  z-index: 2000;
  font-family: 'Inter', sans-serif;
  overflow: hidden;
}

.notification-bar {
  height: 4px;
  background-color: #fff;
  width: 100%;
  transition: width 1s linear;
}

.notification-fade-enter-active,
.notification-fade-leave-active {
  transition: opacity 0.1s, transform 0.1s;
}

.notification-fade-enter,
.notification-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
