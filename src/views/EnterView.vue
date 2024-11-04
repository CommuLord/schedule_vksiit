<!-- src/views/EnterView.vue -->
<template>
  <div>
    <main>
      <section id="enter">
        <div class="logo-container">
          <img src="@/assets/logo.svg" alt="Logo" class="logo-img" id="logo-img">
          <div class="h1">
            <span class="span-top">Менеджер</span>
            <span>расписания</span>
          </div>
        </div>
        <div class="enter-inner-container">
          <div class="login-menu">
            <div class="login-container">
              <p class="h4 login-text">Логин</p>
              <input type="text" placeholder="Введите логин" class="login-input">
            </div>
            <div class="pass-container">
              <p class="h4 pass-text">Пароль</p>
              <input type="password" placeholder="Введите пароль" class="pass-input">
            </div>
            <div class="button-container">
              <button class="accept-button" @click="redirectMain">
                <p class="h4 button-text">Войти</p>
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: 'EnterView',
  methods: {
    redirectMain() {
      this.$router.push('/home');
    }
  }
};
</script>

<style scoped>
body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  margin: 0;
}

body, p, .h1, .h2, .h3, .h4 {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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
  width: 65px;
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

.login-input, .pass-input {
  font-size: 16px;
  transition: all 0.1s ease-in-out;
}

.login-input:focus, .pass-input:focus {
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

.h1 { font-size: 32px; margin: 2px 0 2px 0; }
.h2 { font-size: 24px; margin: 2px 0 2px 0;}
.h3 { font-size: 18px; margin: 2px 0 2px 0; }
.h4 { font-size: 16px; margin: 10px 0 10px 0; }

.a1 { font-weight: bold; color: #0066cc; text-decoration: none; }
.a2 { font-weight: bold; color: #ff6600; text-decoration: underline; }
.a3 { font-style: italic; color: #0066cc; text-decoration: none; }

.p1 { line-height: 1.5; margin-bottom: 18px; }
.p2 { line-height: 1.3; margin-bottom: 12px; }
.p3 { line-height: 1.2; margin-bottom: 10px; }


.span-top {
  display: block;
  margin-bottom: -10px;
}
</style>
