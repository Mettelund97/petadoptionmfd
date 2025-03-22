<script setup>
import AppHeader from './components/AppHeader.vue';
</script>

<template>
  <div class="app">
    <AppHeader />
    <main class="container">
      <router-view />
    </main>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --primary-color: #4CAF50;
  --primary-dark: #388E3C;
  --secondary-color: #2196F3;
  --secondary-dark: #1976D2;
  --accent-color: #FF5722;
  --light-bg: #ffffff;
  --dark-bg: #343a40;
  --text-dark: #212529;
  --text-light: #f8f9fa;
  --border-color: #dee2e6;
  --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

body {
  font-family: 'Poppins', sans-serif;
  line-height: 1.6;
  color: var(--text-dark);
  background-color: var(--light-bg);
  min-height: 100vh;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

main.container {
  flex: 1;
  padding-top: 30px;
  padding-bottom: 50px;
}

.footer {
  background-color: var(--dark-bg);
  color: var(--text-light);
  padding: 20px 0;
  text-align: center;
  margin-top: auto;
}

button {
  cursor: pointer;
  padding: 10px 20px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  transition: background-color 0.2s, transform 0.1s;
}

button:hover {
  background-color: var(--primary-dark);
  transform: translateY(-2px);
}

button:active {
  transform: translateY(0);
}

input,
select,
textarea {
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: var(--secondary-color);
  box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.3);
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin-bottom: 1rem;
  font-weight: 600;
  line-height: 1.2;
}

h1 {
  font-size: 2.5rem;
}

h2 {
  font-size: 2rem;
}

h3 {
  font-size: 1.75rem;
}

.card {
  background-color: white;
  border-radius: 8px;
  box-shadow: var(--shadow);
  padding: 20px;
  margin-bottom: 20px;
}

.error {
  color: #dc3545;
  margin-top: 5px;
  font-size: 14px;
}

.success-message {
  background-color: #d4edda;
  color: #155724;
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 20px;
  text-align: center;
}

.error-message {
  background-color: #f8d7da;
  color: #721c24;
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 20px;
  text-align: center;
}
</style>
