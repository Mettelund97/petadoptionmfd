<script setup>
// No additional script needed for basic header
</script>

<template>
    <header class="header">
        <div class="container">
            <router-link to="/" class="logo">
                <h1>Pet Adoption Portal</h1>
            </router-link>
            <nav class="nav">
                <ul>
                    <li><router-link to="/">Home</router-link></li>
                    <li><router-link to="/pets">Available Pets</router-link></li>
                    <li><router-link to="/add">Add a Pet</router-link></li>
                </ul>
            </nav>
        </div>
    </header>
</template>

<style scoped>
.header {
    background-color: #333;
    color: white;
    padding: 10px 0;
}

.header .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    text-decoration: none;
    color: white;
}

.nav ul {
    display: flex;
    list-style: none;
}

.nav li {
    margin-left: 20px;
}

.nav a {
    color: white;
    text-decoration: none;
    font-weight: 500;
}

.nav a:hover {
    text-decoration: underline;
}

.router-link-active {
    font-weight: bold;
    border-bottom: 2px solid white;
}
</style>