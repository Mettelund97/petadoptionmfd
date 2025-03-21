<script setup>
import AppHeader from './components/AppHeader.vue';
</script>

<template>
  <div class="app">
    <AppHeader />
    <main class="container">
      <router-view />
    </main>
    <footer class="footer">
      <p>&copy; {{ new Date().getFullYear() }} Pet Adoption Portal</p>
    </footer>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f9f9f9;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  min-height: calc(100vh - 120px);
}

.footer {
  text-align: center;
  padding: 20px;
  background-color: #f5f5f5;
  margin-top: 20px;
}

button {
  cursor: pointer;
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
}

button:hover {
  background-color: #45a049;
}

input,
select,
textarea {
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.form-group {
  margin-bottom: 15px;
}

.error {
  color: red;
  margin-top: 5px;
}
</style>
