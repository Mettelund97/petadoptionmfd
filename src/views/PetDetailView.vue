<script setup>
import { ref, onMounted, watch } from 'vue';
import { db } from '../configs/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const props = defineProps({
    petId: {
        type: String,
        default: null
    },
    show: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['close', 'pet-updated']);

const pet = ref(null);
const loading = ref(true);
const error = ref(null);
const imageError = ref(false);

const fetchPet = async () => {
    if (!props.petId) return;

    loading.value = true;
    error.value = null;

    try {
        const docRef = doc(db, 'pets', props.petId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            pet.value = {
                id: docSnap.id,
                ...docSnap.data()
            };
        } else {
            error.value = 'Kæledyr ikke fundet';
        }
    } catch (err) {
        console.error('Error fetching pet: ', err);
        error.value = 'Kunne ikke hente detaljer. Prøv igen senere.';
    } finally {
        loading.value = false;
    }
};


const closeOverlay = () => {
    emit('close');
};

const getPetImage = () => {
    if (!pet.value || !pet.value.imageUrl) return null;

    if (pet.value.imageUrl.startsWith('data:')) {
        return pet.value.imageUrl;
    } else {
        try {
            return new URL(`../assets/pet-images/${pet.value.imageUrl}`, import.meta.url).href;
        } catch (error) {
            console.error('Billedfejl:', error);
            return null;
        }
    }
};

const handleImageError = () => {
    imageError.value = true;
};

const capitalizeFirstLetter = (string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const getTimeAtShelter = () => {
    if (!pet.value || !pet.value.createdAt) return { text: 'Ukendt tid', class: '' };

    const createdDate = pet.value.createdAt?.toDate
        ? pet.value.createdAt.toDate()
        : new Date(pet.value.createdAt);

    const now = new Date();
    const diffTime = Math.abs(now - createdDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    let timeClass = 'time-short';

    if (diffDays > 60) {
        timeClass = 'time-long';
    } else if (diffDays > 30) {
        timeClass = 'time-medium';
    }

    let text = '';
    if (diffDays === 0) text = 'Mindre end 1 dag';
    else if (diffDays === 1) text = '1 dag';
    else if (diffDays < 7) text = `${diffDays} dage`;
    else {
        const diffWeeks = Math.floor(diffDays / 7);
        if (diffWeeks === 1) text = '1 uge';
        else if (diffWeeks < 4) text = `${diffWeeks} uger`;
        else {
            const diffMonths = Math.floor(diffDays / 30);
            if (diffMonths === 1) text = '1 måned';
            else if (diffMonths < 12) text = `${diffMonths} måneder`;
            else {
                const diffYears = Math.floor(diffDays / 365);
                if (diffYears === 1) text = '1 år';
                else text = `${diffYears} år`;
            }
        }
    }

    return { text, class: timeClass };
};

watch(() => props.petId, (newId) => {
    if (newId) {
        pet.value = null;
        imageError.value = false;
        fetchPet();
    }
});

watch(() => props.show, (newShow) => {
    if (newShow) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = ''; 
    }
});

onMounted(() => {
    if (props.petId) {
        fetchPet();
    }
});
</script>

<template>
    <div v-if="show" class="overlay" @click.self="closeOverlay">
        <div class="overlay-content">
            <button class="close-button" @click="closeOverlay">
                &times;
            </button>

            <div v-if="loading" class="loading">
                <p>Indlæser kæledyrsdetaljer...</p>
            </div>

            <div v-else-if="error" class="error">
                <p>{{ error }}</p>
            </div>

            <div v-else-if="pet" class="pet-container">
                <div class="pet-header">
                    <h1>{{ pet.name }}</h1>
                    <span class="status-badge" :class="pet.adopted ? 'adopted' : 'available'">
                        {{ pet.adopted ? 'Adopteret' : 'Tilgængelig' }}
                    </span>
                </div>

                <div class="pet-body">
                    <div class="pet-image">
                        <img v-if="getPetImage() && !imageError" :src="getPetImage()" :alt="pet.name"
                            @error="handleImageError" class="pet-img">
                        <div v-else class="image-placeholder">
                            <span>{{ pet.type.charAt(0).toUpperCase() }}</span>
                        </div>
                    </div>

                    <div class="pet-info">
                        <div class="info-group">
                            <div class="info-item">
                                <h3>Type</h3>
                                <p>{{ capitalizeFirstLetter(pet.type) }}</p>
                            </div>

                            <div class="info-item">
                                <h3>Alder</h3>
                                <p>{{ pet.age }}</p>
                            </div>

                            <div class="info-item">
                                <h3>Køn</h3>
                                <p>{{ capitalizeFirstLetter(pet.gender) }}</p>
                            </div>
                        </div>

                        <div class="info-item description">
                            <h3>Beskrivelse</h3>
                            <p>{{ pet.description }}</p>
                        </div>
                        <div class="info-item">
                            <h3>Tid hos os</h3>
                            <p>
                                <span :class="['time-indicator', getTimeAtShelter().class]">
                                    {{ getTimeAtShelter().text }}
                                </span>
                            </p>
                        </div>
                        <div class="adopt-section">
                            <button v-if="!pet.adopted" class="adopt-button">
                                Adopter {{ pet.name }}
                            </button>
                            <p v-else class="already-adopted">
                                Dette kæledyr er allerede blevet adopteret.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    overflow-y: auto;
    padding: 20px;
    box-sizing: border-box;
}

.overlay-content {
    background-color: white;
    border-radius: 12px;
    width: 100%;
    max-width: 900px;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    padding: 30px;
    box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
}

.close-button {
    position: absolute;
    top: 15px;
    right: 15px;
    background-color: rgba(255, 255, 255, 0.8);
    border: none;
    cursor: pointer;
    width: 40px;
    height: 40px;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #333;
    border-radius: 50%;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    z-index: 1010;
}

.close-button:hover {
    background-color: rgba(0, 0, 0, 0.05);
    color: #333;
}

.pet-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
    padding-right: 40px;
}

.pet-header h1 {
    font-size: 2.2rem;
    color: #4a6572;
    margin: 0;
}

.status-badge {
    padding: 8px 16px;
    border-radius: 20px;
    font-weight: 600;
    font-size: 14px;
}

.status-badge.adopted {
    background-color: #9e9e9e;
    color: white;
}

.status-badge.available {
    background-color: #4CAF50;
    color: white;
}

.pet-body {
    display: flex;
    gap: 30px;
}

.pet-image {
    flex: 0 0 350px;
    height: 350px;
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
}

.pet-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.image-placeholder {
    background-color: #f1f1f1;
    width: 100%;
    height: 100%;
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
    display: flex;
    flex-direction: column;
}

.info-group {
    display: flex;
    gap: 30px;
    margin-bottom: 20px;
}

.info-item {
    margin-bottom: 20px;
}

.info-item h3 {
    margin-bottom: 8px;
    color: #4a6572;
    font-size: 18px;
    font-weight: 600;
}

.info-item p {
    color: #333;
    font-size: 16px;
}

.info-item.description {
    flex-grow: 1;
}

.info-item.description p {
    line-height: 1.7;
}

.adopt-section {
    margin-top: auto;
    padding-top: 20px;
}

.adopt-button {
    padding: 12px 24px;
    background-color: #4a6572;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
}

.adopt-button:hover {
    background-color: #364d58;
    transform: translateY(-2px);
}

.adopt-button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
    transform: none;
}

.loading,
.error {
    text-align: center;
    padding: 40px;
}

.error {
    color: #f44336;
}

.time-indicator {
    padding: 5px 10px;
    border-radius: 4px;
    display: inline-block;
    font-weight: 500;
}

.time-short {
    background-color: #e6f7ee;
    color: #28a745;
}

.time-medium {
    background-color: #fff8e6;
    color: #ffc107;
}

.time-long {
    background-color: #ffebee;
    color: #dc3545;
}

.adopt-section {
    margin-top: auto;
    padding-top: 20px;
}

.adopt-button {
    padding: 12px 24px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
}

.adopt-button:hover {
    background-color: #45a049;
    transform: translateY(-2px);
}

.adopt-button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
    transform: none;
}

.already-adopted {
    color: #9e9e9e;
    font-style: italic;
}

@media (max-width: 768px) {
    .overlay-content {
        padding: 20px;
    }

    .pet-body {
        flex-direction: column;
    }

    .pet-image {
        flex: 0 0 auto;
        height: 250px;
    }

    .info-group {
        flex-direction: column;
        gap: 10px;
    }

    .pet-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
    }
}
</style>