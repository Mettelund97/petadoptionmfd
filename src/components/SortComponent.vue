<script setup>
import { ref } from 'vue';

const props = defineProps({
    modelValue: {
        type: String,
        default: 'newest'
    }
});

const emit = defineEmits(['update:modelValue']);

const sortOptions = [
    { label: 'Nyeste først', value: 'newest' },
    { label: 'Ældste først', value: 'oldest' },
    { label: 'Længst tid hos Pet Adoption', value: 'longest-stay' },
    { label: 'Navn A-Z', value: 'name-asc' }
];

const showSortOptions = ref(false);

const selectSortOption = (sortValue) => {
    emit('update:modelValue', sortValue);
    showSortOptions.value = false;
};
</script>

<template>
    <div class="sort-container">
        <button class="sort-button" @click="showSortOptions = !showSortOptions">
            <span>SORTÉR</span>
            <span class="sort-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 16l5 5 5-5M7 8l5-5 5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
            </span>
        </button>

        <div class="sort-options" v-if="showSortOptions">
            <button v-for="option in sortOptions" :key="option.value" class="sort-option"
                :class="{ active: modelValue === option.value }" @click="selectSortOption(option.value)">
                {{ option.label }}
            </button>
        </div>
    </div>
</template>

<style scoped>
.sort-container {
    position: relative;
    display: inline-block;
    margin-left: 15px;
}

.sort-button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 28px;
    border: 2px solid #4a6572;
    background-color: transparent;
    color: #4a6572;
    font-weight: 400;
    font-size: 16px;
    cursor: pointer;
    width: 150px;
    margin-bottom: 30px;
    border-radius: 0;
    transition: background-color 0.2s;
}

.sort-button:hover {
    background-color: rgba(0, 0, 0, 0.05);
}

.sort-icon {
    display: flex;
    align-items: center;
    padding-left: 5px;
}

.sort-options {
    position: absolute;
    top: calc(100% + 5px);
    left: 0;
    width: 230px;
    background-color: white;
    color: #4a6572;
    border: 2px solid #4a6572;
    border-radius: 4px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    z-index: 100;
    overflow: hidden;
}

.sort-option {
    width: 100%;
    padding: 12px 16px;
    text-align: left;
    color: #4a6572;
    background: none;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s;
    font-size: 14px;
}

.sort-option:not(:last-child) {
    border-bottom: 1px solid #f0f0f0;
}

.sort-option:hover {
    background-color: #f5f5f5;
}

.sort-option.active {
    background-color: #f0f0f0;
    font-weight: 600;
}
</style>