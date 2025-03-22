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
    }, 3000);
};

const handleError = (error) => {
    errorMessage.value = `Error: ${error}`;

    setTimeout(() => {
        errorMessage.value = '';
    }, 5000);
};

const goToPetList = () => {
    router.push('/pets');
};
</script>

<template>
    <div class="admin-add-pet">
        <div class="admin-header">
            <h1>Admin: Add a Pet</h1>
            <button @click="goToPetList" class="view-list-button">View Pet List</button>
        </div>

        <div v-if="successMessage" class="success-message">
            {{ successMessage }}
        </div>

        <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
        </div>

        <div class="admin-instructions">
            <p>
                <strong>Admin View:</strong> Use this form to add new animals to the adoption database.
                This form bypasses the standard user interface for more efficient data entry.
            </p>
        </div>

        <PetForm @pet-added="handlePetAdded" @error="handleError" />
    </div>
</template>

<style scoped>
.admin-add-pet {
    max-width: 800px;
    margin: 0 auto;
}

.admin-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid #eee;
}

h1 {
    color: #333;
    margin: 0;
}

.admin-instructions {
    background-color: #f8f9fa;
    padding: 15px;
    border-left: 4px solid #17a2b8;
    margin-bottom: 20px;
}

.view-list-button {
    background-color: #17a2b8;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
}

.view-list-button:hover {
    background-color: #138496;
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