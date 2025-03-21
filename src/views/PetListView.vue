<script setup>
import { ref, computed, onMounted } from 'vue';
import { db } from '../configs/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import PetCard from '../components/PetCard.vue';

// State for pets data and UI states
const pets = ref([]);
const loading = ref(true);
const error = ref(null);

// Filter state
const filterAdopted = ref('all');
const filterType = ref('all');

// Fetch pets from Firestore
const fetchPets = async () => {
    loading.value = true;
    error.value = null;

    try {
        // Create query to get pets ordered by creation date
        const petQuery = query(collection(db, 'pets'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(petQuery);

        // Process the snapshot into usable data
        const petsData = [];
        querySnapshot.forEach((doc) => {
            petsData.push({
                id: doc.id,
                ...doc.data()
            });
        });

        // Update state with fetched data
        pets.value = petsData;
    } catch (err) {
        console.error('Error fetching pets: ', err);
        error.value = 'Failed to load pets. Please try again later.';
    } finally {
        loading.value = false;
    }
};

// Computed property for filtered pets based on selected filters
const filteredPets = computed(() => {
    // Start with all pets
    let result = [...pets.value];

    // Apply adoption status filter
    if (filterAdopted.value !== 'all') {
        const isAdopted = filterAdopted.value === 'adopted';
        result = result.filter(pet => pet.adopted === isAdopted);
    }

    // Apply pet type filter
    if (filterType.value !== 'all') {
        result = result.filter(pet => pet.type === filterType.value);
    }

    return result;
});

// Fetch pets when component is mounted
onMounted(fetchPets);
</script>

<template>
    <div class="pet-list-container">
        <!-- Page header -->
        <h1>Available Pets</h1>

        <!-- Filter controls -->
        <div class="filters">
            <div class="filter-group">
                <label for="filterAdopted">Show:</label>
                <select id="filterAdopted" v-model="filterAdopted">
                    <option value="all">All Pets</option>
                    <option value="available">Available Pets Only</option>
                    <option value="adopted">Adopted Pets Only</option>
                </select>
            </div>

            <div class="filter-group">
                <label for="filterType">Type:</label>
                <select id="filterType" v-model="filterType">
                    <option value="all">All Types</option>
                    <option value="dog">Dogs</option>
                    <option value="cat">Cats</option>
                    <option value="rabbit">Rabbits</option>
                    <option value="bird">Birds</option>
                    <option value="other">Other</option>
                </select>
            </div>
        </div>

        <!-- Loading state -->
        <div v-if="loading" class="status-message loading">
            <p>Loading pets...</p>
        </div>

        <!-- Error state -->
        <div v-else-if="error" class="status-message error">
            <p>{{ error }}</p>
        </div>

        <!-- Empty state -->
        <div v-else-if="filteredPets.length === 0" class="status-message empty">
            <p>No pets found matching your filters.</p>
        </div>

        <!-- Pet grid -->
        <div v-else class="pets-grid">
            <PetCard v-for="pet in filteredPets" :key="pet.id" :pet="pet" />
        </div>
    </div>
</template>

<style scoped>
.pet-list-container {
    max-width: 1200px;
    margin: 0 auto;
}

h1 {
    margin-bottom: 20px;
    text-align: center;
    color: #333;
}

/* Filter styles */
.filters {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 30px;
    flex-wrap: wrap;
}

.filter-group {
    display: flex;
    align-items: center;
}

.filter-group label {
    margin-right: 10px;
    font-weight: bold;
}

.filter-group select {
    width: auto;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ddd;
}

/* Status message styles */
.status-message {
    text-align: center;
    padding: 40px;
    background-color: #f9f9f9;
    border-radius: 8px;
    margin-top: 20px;
}

.status-message.error {
    color: #f44336;
    background-color: #ffebee;
}

.status-message.empty {
    color: #607d8b;
    background-color: #f5f5f5;
}

/* Pet grid styles */
.pets-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .pets-grid {
        grid-template-columns: 1fr;
    }

    .filters {
        flex-direction: column;
        align-items: center;
    }
}
</style>