<script setup>
import { ref, reactive, watch, toRaw } from 'vue';

const props = defineProps({
    filters: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(['update:filters', 'apply-filters']);

const showFilters = ref(false);
const localFilters = reactive(JSON.parse(JSON.stringify(props.filters)));

watch(() => props.filters, (newFilters) => {

    if (JSON.stringify(localFilters) !== JSON.stringify(newFilters)) {

        Object.keys(localFilters).forEach(category => {
            Object.keys(localFilters[category]).forEach(key => {
                localFilters[category][key] = newFilters[category][key];
            });
        });
    }
}, { deep: true });


const applyFilters = () => {
    emit('update:filters', toRaw(localFilters));
    emit('apply-filters');
    showFilters.value = false;
};
</script>

<template>
    <div class="filter-container">
        <!-- Filter knap -->
        <button class="filter-button" @click="showFilters = true">
            <span>FILTRER</span>
            <span class="filter-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 8H20M8 16H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                </svg>
            </span>
        </button>

        <!-- Filter overlay -->
        <div v-if="showFilters" class="filter-overlay">
            <div class="filter-header">
                <h2>FILTRÉR EFTER</h2>
                <button class="close-button" @click="showFilters = false">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                    </svg>
                </button>
            </div>

            <div class="filter-section">
                <h3>Status</h3>
                <div class="checkbox-group">
                    <label class="checkbox-container">
                        <input type="checkbox" v-model="localFilters.status.notAdopted">
                        <span class="checkbox"></span>
                        <span>Vis kun tilgængelige dyr</span>
                    </label>
                </div>
            </div>

            <div class="filter-section">
                <h3>Art</h3>
                <div class="checkbox-group">
                    <label class="checkbox-container">
                        <input type="checkbox" v-model="localFilters.types.dog">
                        <span class="checkbox"></span>
                        <span>Hund</span>
                    </label>
                    <label class="checkbox-container">
                        <input type="checkbox" v-model="localFilters.types.cat">
                        <span class="checkbox"></span>
                        <span>Kat</span>
                    </label>
                    <label class="checkbox-container">
                        <input type="checkbox" v-model="localFilters.types.rabbit">
                        <span class="checkbox"></span>
                        <span>Kanin</span>
                    </label>
                    <label class="checkbox-container">
                        <input type="checkbox" v-model="localFilters.types.bird">
                        <span class="checkbox"></span>
                        <span>Fugl</span>
                    </label>
                    <label class="checkbox-container">
                        <input type="checkbox" v-model="localFilters.types.rodent">
                        <span class="checkbox"></span>
                        <span>Gnaver</span>
                    </label>
                    <label class="checkbox-container">
                        <input type="checkbox" v-model="localFilters.types.other">
                        <span class="checkbox"></span>
                        <span>Øvrige</span>
                    </label>
                </div>
            </div>

            <div class="filter-section">
                <h3>Køn</h3>
                <div class="checkbox-group">
                    <label class="checkbox-container">
                        <input type="checkbox" v-model="localFilters.gender.male">
                        <span class="checkbox"></span>
                        <span>Han</span>
                    </label>
                    <label class="checkbox-container">
                        <input type="checkbox" v-model="localFilters.gender.female">
                        <span class="checkbox"></span>
                        <span>Hun</span>
                    </label>
                    <label class="checkbox-container">
                        <input type="checkbox" v-model="localFilters.gender.unknown">
                        <span class="checkbox"></span>
                        <span>Ukendt</span>
                    </label>
                </div>
            </div>

            <div class="filter-section">
                <h3>Alder</h3>
                <div class="checkbox-group">
                    <label class="checkbox-container">
                        <input type="checkbox" v-model="localFilters.age.baby">
                        <span class="checkbox"></span>
                        <span>Hvalp/Killing (0-1 år)</span>
                    </label>
                    <label class="checkbox-container">
                        <input type="checkbox" v-model="localFilters.age.young">
                        <span class="checkbox"></span>
                        <span>Ung (1-3 år)</span>
                    </label>
                    <label class="checkbox-container">
                        <input type="checkbox" v-model="localFilters.age.adult">
                        <span class="checkbox"></span>
                        <span>Voksen (3-8 år)</span>
                    </label>
                    <label class="checkbox-container">
                        <input type="checkbox" v-model="localFilters.age.senior">
                        <span class="checkbox"></span>
                        <span>Senior (8+ år)</span>
                    </label>
                </div>
            </div>

            <button class="submit-button" @click="applyFilters">
                VIS DYRENE <span class="arrow">→</span>
            </button>
        </div>
    </div>
</template>

<style scoped>

.filter-button {
    display: inline-flex;
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

.filter-button:hover {
    background-color: rgba(0, 0, 0, 0.05);
}

.filter-icon {
    display: flex;
    align-items: center;
}


.filter-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 30%;
    height: 100%;
    background-color: #ffffff;
    z-index: 1000;
    overflow-y: auto;
    padding: 20px;
    padding-bottom: 80px;
}

.filter-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0 20px;
    margin-bottom: 20px;
}

.filter-header h2 {
    font-size: 22px;
    font-weight: 700;
    color: #4a6572;
}

.close-button {
    background: none;
    border: none;
    cursor: pointer;
    color: #4a6572;
    padding: 5px;
}


.filter-section {
    margin-bottom: 30px;
}

.filter-section h3 {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 15px;
    color: #4a6572;
}


.checkbox-group {
    display: flex;
    flex-direction: column;
    gap: 15px;
}


.checkbox-container {
    display: flex;
    align-items: center;
    position: relative;
    padding-left: 35px;
    cursor: pointer;
    font-size: 16px;
    user-select: none;
}

.checkbox-container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
}

.checkbox {
    position: absolute;
    left: 0;
    height: 24px;
    width: 24px;
    border: 1px solid #4a6572;
    background-color: transparent;
}

.checkbox-container:hover input~.checkbox {
    background-color: rgba(0, 0, 0, 0.05);
}

.checkbox-container input:checked~.checkbox {
    background-color: #4a6572;
}

.checkbox:after {
    content: "";
    position: absolute;
    display: none;
}

.checkbox-container input:checked~.checkbox:after {
    display: block;
}

.checkbox-container .checkbox:after {
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
}


.submit-button {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 30%;
    padding: 16px;
    background-color: #4a6572;
    color: white;
    border: none;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}

.arrow {
    margin-left: 8px;
}
</style>