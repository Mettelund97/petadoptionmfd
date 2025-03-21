<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { db } from '../configs/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const props = defineProps({
    id: {
        type: String,
        required: true
    }
});

const router = useRouter();
const pet = ref(null);
const loading = ref(true);
const error = ref(null);
const isUpdating = ref(false);

const fetchPet = async () => {
    loading.value = true;
    error.value = null;

    try {
        const docRef = doc(db, 'pets', props.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            pet.value = {
                id: docSnap.id,
                ...docSnap.data()
            };
        } else {
            error.value = 'Pet not found';
        }
    } catch (err) {
        console.error('Error fetching pet: ', err);
        error.value = 'Failed to load pet details. Please try again later.';
    } finally {
        loading.value = false;
    }
};

const markAsAdopted = async () => {
    if (!pet.value || pet.value.adopted) return;

    isUpdating.value = true;

    try {
        const petRef = doc(db, 'pets', props.id);
        await updateDoc(petRef, {
            adopted: true
        });

        // Update local pet data
        pet.value.adopted = true;
    } catch (err) {
        console.error('Error updating pet: ', err);
        alert('Failed to mark pet as adopted. Please try again.');
    } finally {
        isUpdating.value = false;
    }
};

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

// Fetch pet data when component is mounted
onMounted(fetchPet);
</script>

<template>
    <div class="pet-detail">
        <div v-if="loading" class="loading">
            <p>Loading pet details...</p>
        </div>

        <div v-else-if="error" class="error">
            <p>{{ error }}</p>
            <router-link to="/pets" class="back-link">Back to pet list</router-link>
        </div>

        <div v-else-if="pet" class="pet-container">
            <div class="pet-header">
                <h1>{{ pet.name }}</h1>
                <span class="status-badge" :class="pet.adopted ? 'adopted' : 'available'">
                    {{ pet.adopted ? 'Adopted' : 'Available for Adoption' }}
                </span>
            </div>

            <div class="pet-body">
                <div class="pet-image">
                    <!-- Placeholder for pet image -->
                    <div class="image-placeholder">
                        <span>{{ pet.type.charAt(0).toUpperCase() }}</span>
                    </div>
                </div>

                <div class="pet-info">
                    <div class="info-item">
                        <h3>Type</h3>
                        <p>{{ capitalizeFirstLetter(pet.type) }}</p>
                    </div>

                    <div class="info-item">
                        <h3>Age</h3>
                        <p>{{ pet.age }} {{ pet.age === 1 ? 'year' : 'years' }}</p>
                    </div>

                    <div class="info-item description">
                        <h3>Description</h3>
                        <p>{{ pet.description }}</p>
                    </div>

                    <div v-if="!pet.adopted" class="adopt-section">
                        <button @click="markAsAdopted" :disabled="isUpdating" class="adopt-button">
                            {{ isUpdating ? 'Processing...' : 'Mark as Adopted' }}
                        </button>
                    </div>
                </div>
            </div>

            <div class="actions">
                <router-link to="/pets" class="back-button">
                    Back to Pet List
                </router-link>
            </div>
        </div>
    </div>
</template>

<style scoped>
.pet-detail {
    max-width: 900px;
    margin: 0 auto;
}

.pet-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.status-badge {
    padding: 6px 12px;
    border-radius: 20px;
    font-weight: 500;
    font-size: 14px;
}

.status-badge.adopted {
    background-color: #f44336;
    color: white;
}

.status-badge.available {
    background-color: #4CAF50;
    color: white;
}

.pet-body {
    display: flex;
    gap: 30px;
    background-color: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.pet-image {
    flex: 0 0 300px;
}

.image-placeholder {
    background-color: #f1f1f1;
    width: 100%;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.image-placeholder span {
    font-size: 72px;
    color: #666;
}

.pet-info {
    flex: 1;
    padding: 20px;
}

.info-item {
    margin-bottom: 20px;
}

.info-item h3 {
    margin-bottom: 5px;
    color: #555;
    font-size: 18px;
}

.info-item.description p {
    line-height: 1.6;
}

.adopt-section {
    margin-top: 30px;
}

.adopt-button {
    padding: 12px 24px;
    background-color: #FF5722;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
}

.adopt-button:hover {
    background-color: #e64a19;
}

.adopt-button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
}

.actions {
    margin-top: 30px;
    display: flex;
    justify-content: flex-start;
}

.back-button,
.back-link {
    display: inline-block;
    padding: 10px 20px;
    background-color: #2196F3;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    font-weight: 500;
}

.back-button:hover,
.back-link:hover {
    background-color: #0b7dda;
}

.loading,
.error {
    text-align: center;
    padding: 40px;
    background-color: #f9f9f9;
    border-radius: 8px;
    margin-top: 20px;
}

.error {
    color: #f44336;
}

@media (max-width: 768px) {
    .pet-body {
        flex-direction: column;
    }

    .pet-image {
        flex: 0 0 auto;
    }
}
</style>