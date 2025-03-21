<script setup>
import { ref } from 'vue';
import { db } from '../configs/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const emit = defineEmits(['pet-added', 'error']);

const form = ref({
    name: '',
    type: '',
    age: '',
    description: ''
});

const isSubmitting = ref(false);

const submitForm = async () => {
    isSubmitting.value = true;

    try {
        // Create a new pet object
        const newPet = {
            ...form.value,
            adopted: false,
            createdAt: serverTimestamp()
        };

        // Add to Firestore
        const docRef = await addDoc(collection(db, 'pets'), newPet);

        // Reset form
        form.value = {
            name: '',
            type: '',
            age: '',
            description: ''
        };

        // Emit success event with the new document ID
        emit('pet-added', { id: docRef.id, ...newPet });

    } catch (error) {
        console.error('Error adding pet: ', error);
        emit('error', error.message);
    } finally {
        isSubmitting.value = false;
    }
};
</script>

<template>
    <form @submit.prevent="submitForm" class="pet-form">
        <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="form.name" required>
        </div>

        <div class="form-group">
            <label for="type">Type:</label>
            <select id="type" v-model="form.type" required>
                <option value="">Select pet type</option>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
                <option value="rabbit">Rabbit</option>
                <option value="bird">Bird</option>
                <option value="other">Other</option>
            </select>
        </div>

        <div class="form-group">
            <label for="age">Age (years):</label>
            <input type="number" id="age" v-model.number="form.age" min="0" required>
        </div>

        <div class="form-group">
            <label for="description">Description:</label>
            <textarea id="description" v-model="form.description" rows="5" required></textarea>
        </div>

        <div class="form-actions">
            <button type="submit" :disabled="isSubmitting">
                {{ isSubmitting ? 'Saving...' : 'Save Pet' }}
            </button>
        </div>
    </form>
</template>

<style scoped>
.pet-form {
    max-width: 600px;
    margin: 0 auto;
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-actions {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
}

button[type="submit"] {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
}

button[type="submit"]:hover {
    background-color: #45a049;
}

button[type="submit"]:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
}
</style>