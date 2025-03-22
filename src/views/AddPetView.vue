<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import PetForm from '../components/PetForm.vue';

const router = useRouter();
const successMessage = ref('');
const errorMessage = ref('');

const handlePetAdded = (newPet) => {
    successMessage.value = `Successfully added ${newPet.name} to the database!`;

    setTimeout(() => {
        successMessage.value = '';
        router.push('/pets');
    }, 3000);
};

const handleError = (error) => {
    errorMessage.value = `Error: ${error}`;

    setTimeout(() => {
        errorMessage.value = '';
    }, 5000);
};
</script>

<template>
    <div class="add-pet-container">
        <div class="page-header">
            <h1>Opret en adoption</h1>
            <div class="header-line"></div>
        </div>

        <div v-if="successMessage" class="success-message">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            {{ successMessage }}
        </div>

        <div v-if="errorMessage" class="error-message">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            {{ errorMessage }}
        </div>

        <div class="intro-card">
            <h2>Hjælp et kæledyr med at finde et hjem</h2>
            <p>
                Udfyld formularen nedenfor for at tilføje et nyt kæledyr til vores adoptionsdatabase. Giv detaljerede
                oplysninger for at hjælpe potentielle nye hjem med at finde deres perfekte match. Klare billeder og
                grundige beskrivelser øger chancen for adoption betydeligt!
            </p>
        </div>

        <div class="form-container">
            <PetForm @pet-added="handlePetAdded" @error="handleError" />
        </div>
    </div>
</template>

<style scoped>
.add-pet-container {
    max-width: 800px;
    margin: 0 auto;
}

.page-header {
    margin-bottom: 30px;
    text-align: center;
}

.page-header h1 {
    color: var(--text-dark);
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 10px;
}

.header-line {
    height: 4px;
    width: 100px;
    background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
    margin: 0 auto;
    border-radius: 2px;
}

.intro-card {
    background-color: white;
    border-radius: 8px;
    padding: 25px;
    margin-bottom: 30px;
    box-shadow: var(--shadow);
    border-left: 5px solid var(--primary-color);
    transition: transform 0.3s ease;
}

.intro-card:hover {
    transform: translateY(-5px);
}

.intro-card h2 {
    color: var(--primary-dark);
    margin-bottom: 15px;
    font-size: 1.5rem;
}

.intro-card p {
    color: var(--text-dark);
    line-height: 1.7;
}

.form-container {
    background-color: white;
    border-radius: 8px;
    box-shadow: var(--shadow);
    overflow: hidden;
}

.success-message,
.error-message {
    display: flex;
    align-items: center;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 20px;
    font-weight: 500;
}

.success-message {
    background-color: #d4edda;
    color: #155724;
}

.error-message {
    background-color: #f8d7da;
    color: #721c24;
}

.success-message svg,
.error-message svg {
    margin-right: 10px;
    flex-shrink: 0;
}

@media (max-width: 768px) {
    .page-header h1 {
        font-size: 2rem;
    }

    .intro-card {
        padding: 20px;
    }
}
</style>