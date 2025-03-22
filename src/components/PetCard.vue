<script setup>
import { ref } from 'vue';

const props = defineProps({
    pet: {
        type: Object,
        required: true
    }
});


const emit = defineEmits(['click']);

const getPetImage = () => {
    if (props.pet.imageUrl) {
        if (props.pet.imageUrl.startsWith('data:')) {
            return props.pet.imageUrl;
        } else {
            try {
                return new URL(`../assets/pet-images/${props.pet.imageUrl}`, import.meta.url).href;
            } catch (error) {
                console.error('Image error:', error);
                return '/placeholder.jpg';
            }
        }
    }
    return '/placeholder.jpg';
};

</script>

<template>
    <div class="pet-card" :class="{ 'adopted': pet.adopted }" @click="$emit('click')">
        <div class="pet-image">
            <img :src="getPetImage()" :alt="pet.name">
            <div class="status-badge" :class="{ 'adopted': pet.adopted }">
                {{ pet.adopted ? 'Adopteret' : 'Tilgængelig' }}
            </div>
        </div>
        <div class="pet-info">
            <h3>{{ pet.name }}</h3>

            <div class="info-grid">
                <div class="info-item">
                    <span class="info-icon">🐾</span>
                    <span>{{ pet.type }}</span>
                </div>
                <div class="info-item">
                    <span class="info-icon">⏳</span>
                    <span>{{ pet.age }}</span>
                </div>
            </div>

            <p v-if="pet.description" class="pet-description">{{ pet.description }}</p>
        </div>
        <div class="pet-actions">
            <button class="details-button" @click.stop="$emit('click')">
                Se detaljer
            </button>
        </div>
    </div>
</template>

<style scoped>
.pet-card {
    border: 1px solid #ddd;
    border-radius: 10px;
    overflow: hidden;
    background-color: white;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
    height: 100%;
}

.pet-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

.pet-card.adopted {
    opacity: 0.85;
    background-color: #f9f9f9;
}

.pet-image {
    height: 250px;
    overflow: hidden;
    position: relative;
}

.pet-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s;
}

.pet-card:hover .pet-image img {
    transform: scale(1.05);
}

.status-badge {
    position: absolute;
    top: 12px;
    right: 12px;
    background-color: #4CAF50;
    color: white;
    padding: 5px 12px;
    border-radius: 15px;
    font-size: 0.8rem;
    font-weight: 600;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.status-badge.adopted {
    background-color: #9e9e9e;
}

.pet-info {
    padding: 20px;
    flex-grow: 1;
}

.pet-info h3 {
    margin: 0 0 10px 3px;
    color: #4a6572;
    font-size: 1.5rem;
    font-weight: 600;
}

.info-grid {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
}

.info-item {
    display: flex;
    align-items: center;
    background-color: #f5f7f8;
    padding: 6px 12px;
    border-radius: 6px;
}

.info-icon {
    margin-right: 6px;
    font-size: 1.1rem;
}

.pet-description {
    color: #666;
    margin: 12px 0 0 3px;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    font-size: 14px;
}

.pet-actions {
    padding: 0 20px 20px;
    display: flex;
    justify-content: flex-end;
}

.details-button {
    display: inline-block;
    padding: 10px 18px;
    background-color: #4a6572;
    color: white;
    text-decoration: none;
    border-radius: 6px;
    font-weight: 500;
    transition: background-color 0.2s ease, transform 0.2s ease;
}

.details-button:hover {
    background-color: #3a505b;
    transform: translateY(-2px);
}
</style>