<script setup>
// No additional script needed for basic home view
</script>

<template>
  <div class="home">
    <div class="hero">
      <h1>Find Your Perfect Companion</h1>
      <p>Adopt a pet and give them a forever home</p>
    </div>

    <div class="content">
      <div class="intro">
        <h2>Welcome to Our Pet Adoption Portal</h2>
        <p>
          We are a local animal shelter dedicated to finding loving homes for our animals.
          Browse our available pets and help give these animals a second chance at happiness.
        </p>
        <p>
          Our mission is to connect animals in need with loving families. Every pet deserves
          a caring home, and every home is made better with the love of a pet.
        </p>
      </div>

      <div class="actions">
        <router-link to="/pets" class="action-button browse">
          Browse Available Pets
        </router-link>
        <router-link to="/add" class="action-button add">
          Add a Pet for Adoption
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  text-align: center;
}

.hero {
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://source.unsplash.com/random/1200x400/?pets');
  background-size: cover;
  background-position: center;
  color: white;
  padding: 80px 20px;
  margin-bottom: 40px;
  border-radius: 8px;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 16px;
}

.hero p {
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
}

.content {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.intro {
  margin-bottom: 40px;
}

.intro h2 {
  margin-bottom: 20px;
  color: #333;
}

.intro p {
  margin-bottom: 16px;
  line-height: 1.6;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
}

.action-button {
  display: inline-block;
  padding: 16px 30px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: bold;
  font-size: 18px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.action-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.browse {
  background-color: #2196F3;
  color: white;
}

.browse:hover {
  background-color: #0b7dda;
}

.add {
  background-color: #4CAF50;
  color: white;
}

.add:hover {
  background-color: #45a049;
}
</style>
