<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isMenuOpen = ref(false);
const scrolled = ref(false);

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};

const handleScroll = () => {
    scrolled.value = window.scrollY > 10;
};

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
    <header class="header" :class="{ 'scrolled': scrolled }">
        <div class="container">
            <div class="header-content">
                <a href="/" class="logo" @click.prevent="$router.push('/')">
                    <div class="logo-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path
                                d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 1 1.261-.472 1.96-1.45 2.344-2.5">
                            </path>
                            <path
                                d="M14.5 5.172c0-1.39 1.577-2.493 3.5-2.172 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.344-2.5">
                            </path>
                            <path d="M8 14v.5"></path>
                            <path d="M16 14v.5"></path>
                            <path d="M11.25 16.25h1.5L12 17l-.75-.75Z"></path>
                            <path
                                d="M4.42 11.247A13.152 13.152 0 0 0 4 14c0 4.418 3.582 8 8 8s8-3.582 8-8c0-1.167-.204-2.34-.6-3.484">
                            </path>
                        </svg>
                    </div>
                    <span>Pet Adoption</span>
                </a>

                <button class="menu-toggle" @click="toggleMenu" aria-label="Toggle Menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <nav class="nav" :class="{ 'active': isMenuOpen }">
                    <ul>
                        <li>
                            <router-link to="/" @click="isMenuOpen = false">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                </svg>
                                <span>Pet Adoption</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/pets" @click="isMenuOpen = false">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <rect x="3" y="3" width="18" height="18" rx="2"></rect>
                                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                    <path d="M20.4 14.5 16 10 4 20"></path>
                                </svg>
                                <span>Find dit nye kæledyr</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/add" @click="isMenuOpen = false">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path d="M12 5v14"></path>
                                    <path d="M5 12h14"></path>
                                </svg>
                                <span>Opret ny adoption</span>
                            </router-link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>
</template>

<style scoped>
.header {
    background-color: #4a6572;
    color: white;
    padding: 16px 0;
    position: sticky;
    top: 0;
    z-index: 100;
    transition: all 0.3s ease;
    border-bottom: 3px solid #60ad5e;
}

.header.scrolled {
    background-color: rgba(74, 101, 114, 0.95);
    padding: 10px 0;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

.header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: white;
    font-weight: 700;
    font-size: 1.5rem;
    transition: all 0.3s ease;
    letter-spacing: -0.5px;
}

.logo:hover {
    transform: translateY(-2px);
    color: #8bc34a;
}

.logo-icon {
    width: 38px;
    height: 38px;
    margin-right: 12px;
    color: #8bc34a;
    filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.2));
    transition: transform 0.3s ease;
}

.logo:hover .logo-icon {
    transform: rotate(-5deg);
}

.nav ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 10px;
}

.nav li {
    position: relative;
}

.nav a {
    display: flex;
    align-items: center;
    color: rgba(255, 255, 255, 0.9);
    text-decoration: none;
    font-weight: 600;
    padding: 10px 18px;
    border-radius: 8px;
    transition: all 0.3s ease;
    letter-spacing: 0.3px;
    position: relative;
    overflow: hidden;
}

.nav a::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0;
    background-color: rgba(139, 195, 74, 0.2);
    transition: height 0.3s ease;
    z-index: -1;
}

.nav a:hover::before {
    height: 100%;
}

.nav a svg {
    margin-right: 10px;
    transition: transform 0.3s ease;
}

.nav a:hover {
    color: white;
    transform: translateY(-2px);
}

.nav a:hover svg {
    transform: scale(1.2);
    color: #8bc34a;
}

.router-link-exact-active {
    background-color: #8bc34a !important;
    color: white !important;
    box-shadow: 0 4px 8px rgba(139, 195, 74, 0.3);
}

.router-link-exact-active svg {
    color: white !important;
}

.router-link-exact-active::before {
    display: none;
}

.menu-toggle {
    display: none;
    flex-direction: column;
    justify-content: space-around;
    width: 32px;
    height: 26px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 10;
}

.menu-toggle span {
    width: 32px;
    height: 3px;
    background-color: white;
    border-radius: 4px;
    transition: all 0.3s ease;
    transform-origin: 1px;
}

.menu-toggle:hover span {
    background-color: #8bc34a;
}

@media (max-width: 768px) {
    .menu-toggle {
        display: flex;
    }

    .menu-toggle:focus {
        outline: none;
    }

    .nav {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background-color: #4a6572;
        opacity: 0;
        visibility: hidden;
        transform: translateY(-10px);
        transition: all 0.3s ease;
        box-shadow: 0 10px 15px rgba(0, 0, 0, 0.15);
        border-bottom: 3px solid #8bc34a;
        padding: 0;
    }

    .nav.active {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }

    .nav ul {
        flex-direction: column;
        padding: 15px;
        gap: 8px;
    }

    .nav a {
        padding: 14px 20px;
        border-radius: 8px;
        justify-content: flex-start;
    }

    .nav a:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }

    .logo {
        font-size: 1.3rem;
    }

    .logo-icon {
        width: 32px;
        height: 32px;
    }
}

@media (max-width: 480px) {
    .logo span {
        font-size: 1.1rem;
    }

    .logo-icon {
        width: 28px;
        height: 28px;
        margin-right: 8px;
    }
}
</style>