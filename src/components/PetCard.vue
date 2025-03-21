<script setup>
const props = defineProps({
    pet: {
        type: Object,
        required: true
    }
});
</script>

<template>
    <div class="pet-card" :class="{ 'adopted': pet.adopted }">
        <div class="pet-info">
            <h3>{{ pet.name }}</h3>
            <p><strong>Type:</strong> {{ pet.type }}</p>
            <p><strong>Age:</strong> {{ pet.age }} {{ pet.age === 1 ? 'year' : 'years' }}</p>
            <p v-if="pet.adopted" class="adopted-badge">Adopted</p>
            <p v-else class="available-badge">Available</p>
        </div>
        <div class="pet-actions">
            <router-link :to="`/pets/${pet.id}`" class="details-button">
                View Details
            </router-link>
        </div>
    </div>
</template>

<style scoped>
.pet-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 16px;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.pet-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.pet-card.adopted {
    opacity: 0.7;
    background-color: #f9f9f9;
}

.pet-info h3 {
    margin-bottom: 10px;
    color: #333;
}

.pet-actions {
    margin-top: 15px;
    display: flex;
    justify-content: flex-end;
}

.details-button {
    display: inline-block;
    padding: 8px 16px;
    background-color: #2196F3;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    font-weight: 500;
}

.details-button:hover {
    background-color: #0b7dda;
}

.adopted-badge {
    display: inline-block;
    padding: 4px 8px;
    background-color: #f44336;
    color: white;
    border-radius: 4px;
    font-size: 14px;
}

.available-badge {
    display: inline-block;
    padding: 4px 8px;
    background-color: #4CAF50;
    color: white;
    border-radius: 4px;
    font-size: 14px;
}
</style>