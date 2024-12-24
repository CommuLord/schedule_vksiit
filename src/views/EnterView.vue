<template>
  <div>
    <main>
      <section id="enter">
        <div class="logo-container">
          <img src="@/assets/logo.svg" alt="Logo" class="logo-img" id="logo-img">
          <div class="h2 title-text">
            <span class="span-top">Менеджер</span>
            <span>расписания</span>
          </div>
        </div>
        <div class="enter-inner-container">
          <div class="login-menu">
            <div class="login-container">
              <p class="h4 login-text">Логин</p>
              <input type="text" v-model="login" placeholder="Введите логин" class="login-input">
            </div>
            <div class="pass-container">
              <p class="h4 pass-text">Пароль</p>
              <input type="password" v-model="password" placeholder="Введите пароль" class="pass-input">
            </div>
            <div class="button-container">
              <button class="accept-button" @click="signIn">
                <p class="h4 button-text">Вход</p>
              </button>
            </div>
            <div v-if="error" class="error-message">
              <p class="h4">{{ error }}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
    <FooterComponent />
  </div>
</template>

<script>
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import FooterComponent from '@/components/FooterComponent.vue';

export default {
  name: 'EnterView',
  components: {
    FooterComponent
  },
  data() {
    return {
      login: '',
      password: '',
      error: ''
    };
  },
  methods: {
    async signIn() {
      try {
        console.log('Sending login request with:', { login: this.login, password: this.password });
        const response = await axios.post('/api/auth/login', {
          login: this.login,
          password: this.password
        });
        console.log('Server response:', response.data);
        if (response.data.access_token) {
          const authStore = useAuthStore();
          authStore.setToken(response.data.access_token);
          this.$router.push('/home');
        } else {
          this.error = 'Ошибка авторизации';
        }
      } catch (error) {
        console.error('Error during login:', error);
        this.error = 'Неверный логин или пароль';
      }
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

body,
p,
.h1,
.h2,
.h3,
.h4 {
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

input {
  padding: 10px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
}

#enter {
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
  width: 40px;
  height: auto;
  margin-right: 5px;
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

.enter-inner-container {
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #d9d9d9;
  min-width: 320px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.login-menu {
  width: 100%;
}

.login-container {
  display: flex;
  flex-direction: column;
}

.pass-container {
  display: flex;
  flex-direction: column;
}

.button-text {
  color: white;
  margin: 9px;
}

.login-input,
.pass-input {
  font-size: 16px;
  transition: all 0.1s ease-in-out;
}

.login-input:focus,
.pass-input:focus {
  outline: none;
  border-color: #2c2c2c;
  box-shadow: 0 0 0 0.25rem rgba(194, 194, 194, 0.25);
}

.button-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
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

.a1 {
  font-weight: bold;
  color: #0066cc;
  text-decoration: none;
}

.a2 {
  font-weight: bold;
  color: #ff6600;
  text-decoration: underline;
}

.a3 {
  font-style: italic;
  color: #0066cc;
  text-decoration: none;
}

.p1 {
  line-height: 1.5;
  margin-bottom: 18px;
}

.p2 {
  line-height: 1.3;
  margin-bottom: 12px;
}

.p3 {
  line-height: 1.2;
  margin-bottom: 10px;
}

.span-top {
  display: block;
  margin-bottom: -10px;
}

.error-message {
  text-align: center;
  color: red;
  margin-top: 16px;
}

.title-text {
  font-weight: 600;
}
</style>
