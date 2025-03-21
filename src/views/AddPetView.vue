<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import PetForm from '../components/PetForm.vue';

const router = useRouter();
const successMessage = ref('');
const errorMessage = ref('');

const handlePetAdded = (newPet) => {
    successMessage.value = `Successfully added ${newPet.name} to the database!`;

    // Clear success message after 3 seconds
    setTimeout(() => {
        successMessage.value = '';
        // Redirect to pet list
        router.push('/pets');
    }, 3000);
};

const handleError = (error) => {
    errorMessage.value = `Error: ${error}`;

    // Clear error message after 5 seconds
    setTimeout(() => {
        errorMessage.value = '';
    }, 5000);
};
</script>

<template>
    <div class="add-pet">
        <h1>Add a Pet for Adoption</h1>

        <div v-if="successMessage" class="success-message">
            {{ successMessage }}
        </div>

        <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
        </div>

        <p class="intro">
            Fill out the form below to add a new pet to our adoption database.
            Be sure to provide detailed information to help potential adopters
            find their perfect match.
        </p>

        <PetForm @pet-added="handlePetAdded" @error="handleError" />
    </div>
</template>

<style scoped>
.add-pet {
    max-width: 800px;
    margin: 0 auto;
}

h1 {
    margin-bottom: 20px;
    text-align: center;
}

.intro {
    text-align: center;
    margin-bottom: 30px;
    color: #555;
}

.success-message {
    background-color: #dff0d8;
    color: #3c763d;
    padding: 15px;
    border-radius: 4px;
    margin-bottom: 20px;
    text-align: center;
}

.error-message {
    background-color: #f2dede;
    color: #a94442;
    padding: 15px;
    border-radius: 4px;
    margin-bottom: 20px;
    text-align: center;
}
</style>