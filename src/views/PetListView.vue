<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { db } from '../configs/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import FilterComponent from '../components/FilterComponent.vue';
import SortComponent from '../components/SortComponent.vue';
import PetCard from '../components/PetCard.vue';
import PetDetailView from '../views/PetDetailView.vue';

const loading = ref(true);
const error = ref(null);
const sortOption = ref('newest');

const pets = ref([]);

const filters = ref({
    status: {
        notAdopted: false
    },
    types: {
        dog: false,
        cat: false,
        rabbit: false,
        bird: false,
        rodent: false,
        other: false
    },
    gender: {
        male: false,
        female: false,
        unknown: false
    },
    age: {
        baby: false,
        young: false,
        adult: false,
        senior: false
    }
});

const fetchPets = async () => {
    loading.value = true;
    error.value = null;

    try {
        console.log("Fetching pets...");
        const petQuery = query(collection(db, 'pets'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(petQuery);

        console.log("Got query snapshot:", querySnapshot);
        const petsData = [];
        querySnapshot.forEach((doc) => {
            console.log("Processing doc:", doc.id, doc.data());
            petsData.push({
                id: doc.id,
                ...doc.data()
            });
        });

        console.log("Processed pets data:", petsData);
        pets.value = petsData;
    } catch (err) {
        console.error('Error fetching pets: ', err);
        error.value = 'Failed to load pets. Please try again later.';
    } finally {
        loading.value = false;
    }
};

const applyFilters = () => {
    console.log('Filters applied');
};

const filteredPets = computed(() => {
    let result = [...pets.value];

    if (filters.value.status && filters.value.status.notAdopted) {
        result = result.filter(pet => !pet.adopted);
    }

    const selectedTypes = Object.entries(filters.value.types)
        .filter(([_, selected]) => selected)
        .map(([type]) => type);

    if (selectedTypes.length > 0) {
        result = result.filter(pet => {
            const typeMap = {
                dog: 'hund',
                cat: 'kat',
                rabbit: 'kanin',
                bird: 'fugl',
                rodent: 'gnaver'
            };

            if (selectedTypes.includes('other')) {
                const petTypeLC = pet.type.toLowerCase();
                const isKnownType = Object.values(typeMap).includes(petTypeLC);

                if (!isKnownType) {
                    return true;
                }
            }

            return selectedTypes.includes(pet.type) ||
                selectedTypes.some(t => typeMap[t] === pet.type.toLowerCase());
        });
    }

    const selectedGenders = Object.entries(filters.value.gender)
        .filter(([_, selected]) => selected)
        .map(([gender]) => gender);

    if (selectedGenders.length > 0) {
        result = result.filter(pet => {
            const genderMap = {
                male: 'han',
                female: 'hun',
                unknown: 'ukendt'
            };

            return selectedGenders.some(g => genderMap[g] === pet.gender);
        });
    }

    const selectedAges = Object.entries(filters.value.age)
        .filter(([_, selected]) => selected)
        .map(([age]) => age);

    if (selectedAges.length > 0) {
        result = result.filter(pet => {
            const ageInYears = pet.ageYears || 0;

            if (selectedAges.includes('baby') && ageInYears < 1) return true;
            if (selectedAges.includes('young') && ageInYears >= 1 && ageInYears < 3) return true;
            if (selectedAges.includes('adult') && ageInYears >= 3 && ageInYears < 8) return true;
            if (selectedAges.includes('senior') && ageInYears >= 8) return true;

            return false;
        });
    }

    return result;
});


const filteredAndSortedPets = computed(() => {
    const filtered = [...filteredPets.value];

    switch (sortOption.value) {
        case 'newest':
            return filtered.sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt);
            });

        case 'oldest':
            return filtered.sort((a, b) => {
                return new Date(a.createdAt) - new Date(b.createdAt);
            });

        case 'longest-stay':
            return filtered.sort((a, b) => {
                return new Date(a.createdAt) - new Date(b.createdAt);
            });

        case 'name-asc':
            return filtered.sort((a, b) => {
                return a.name.localeCompare(b.name);
            });

        default:
            return filtered;
    }
});


const selectedPetId = ref(null);
const showPetDetail = ref(false);


const openPetDetails = (petId) => {
    selectedPetId.value = petId;
    showPetDetail.value = true;
};

const closePetDetails = () => {
    showPetDetail.value = false;
};

const handlePetUpdated = (updatedPet) => {

    const index = pets.value.findIndex(pet => pet.id === updatedPet.id);
    if (index !== -1) {
        pets.value[index] = { ...pets.value[index], ...updatedPet };
    }
};


onMounted(fetchPets);
</script>

<template>
    <div class="pet-listing">
        <h1 class="page-title">Kæledyr til adoption</h1>

        
        <div class="controls">
            <FilterComponent v-model:filters="filters" @apply-filters="applyFilters" />

            <SortComponent v-model="sortOption" />
        </div>

        
        <div v-if="error" class="error-message">
            {{ error }}
        </div>

        <div v-else-if="loading" class="loading-message">
            Indlæser kæledyr...
        </div>

        <div v-else-if="filteredAndSortedPets.length === 0" class="empty-state">
            Ingen kæledyr matcher dine filtre.
        </div>

        <div v-else class="pets-grid">
            <PetCard v-for="pet in filteredAndSortedPets" :key="pet.id" :pet="pet" @click="openPetDetails(pet.id)" />
        </div>

        
        <PetDetailView :petId="selectedPetId" :show="showPetDetail" @close="closePetDetails"
            @pet-updated="handlePetUpdated" />
    </div>
</template>

<style scoped>
.pet-listing {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.page-title {
    font-size: 2.5rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: #4a6572;
}

.controls {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 20px;
}


.error-message {
    text-align: center;
    padding: 40px;
    color: #e74c3c;
    font-size: 1.1rem;
}

.loading-message,
.empty-state {
    text-align: center;
    padding: 40px;
    color: #666;
    font-size: 1.1rem;
}


.pets-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 30px;
    margin-top: 20px;
}

@media (max-width: 768px) {
    .controls {
        flex-direction: column;
        align-items: flex-start;
    }

    .sort-container {
        margin-left: 0;
        margin-top: 10px;
    }

    .pets-grid {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
}

@media (max-width: 480px) {
    .page-title {
        font-size: 2rem;
    }

    .pets-grid {
        grid-template-columns: 1fr;
    }
}
</style>