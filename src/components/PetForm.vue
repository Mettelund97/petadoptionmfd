<script setup>
import { ref } from 'vue';
import { db } from '../configs/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const emit = defineEmits(['pet-added', 'error']);

const name = ref('');
const type = ref('');
const gender = ref('');
const age = ref('');
const description = ref('');
const imageBase64 = ref('');
const imageName = ref('');

const submitting = ref(false);
const errors = ref({});

const petTypes = [
    { value: 'hund', label: 'Hund' },
    { value: 'kat', label: 'Kat' },
    { value: 'kanin', label: 'Kanin' },
    { value: 'fugl', label: 'Fugl' },
    { value: 'gnaver', label: 'Gnaver' },
    { value: 'firben', label: 'Firben' },
    { value: 'andet', label: 'Andet' }
];

const genderOptions = [
    { value: 'han', label: 'Han' },
    { value: 'hun', label: 'Hun' },
    { value: 'ukendt', label: 'Ukendt' }
];

const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
        errors.value.image = 'Filen skal være et billede (jpg, png, etc.)';
        return;
    }

    if (file.size > 1 * 1024 * 1024) {
        errors.value.image = 'Billedet må ikke være større end 1MB';
        return;
    }

    errors.value.image = '';

    imageName.value = file.name;

    const reader = new FileReader();
    reader.onload = (e) => {
        imageBase64.value = e.target.result;
    };
    reader.readAsDataURL(file);
};

const validateForm = () => {
    errors.value = {};
    let isValid = true;

    if (!name.value.trim()) {
        errors.value.name = 'Navn er påkrævet';
        isValid = false;
    }

    if (!type.value) {
        errors.value.type = 'Type er påkrævet';
        isValid = false;
    }

    if (!age.value) {
        errors.value.age = 'Alder er påkrævet';
        isValid = false;
    }

    if (!gender.value) {
        errors.value.gender = 'Køn er påkrævet';
        isValid = false;
    }

    if (!description.value.trim()) {
        errors.value.description = 'Beskrivelse er påkrævet';
        isValid = false;
    }

    if (!imageBase64.value) {
        errors.value.image = 'Billede er påkrævet';
        isValid = false;
    }

    return isValid;
};

const handleSubmit = async () => {
    if (!validateForm()) {
        return;
    }

    submitting.value = true;

    try {
        const petData = {
            name: name.value,
            type: type.value,
            gender: gender.value,
            age: age.value,
            description: description.value,
            imageUrl: imageBase64.value,
            imageName: imageName.value,
            adopted: false,
            createdAt: serverTimestamp()
        };

        const docRef = await addDoc(collection(db, 'pets'), petData);

        const newPet = {
            id: docRef.id,
            ...petData,
            createdAt: new Date()
        };

        emit('pet-added', newPet);

        resetForm();
    } catch (error) {
        console.error('Error adding pet:', error);
        emit('error', error.message || 'Failed to add pet');
    } finally {
        submitting.value = false;
    }
};

const resetForm = () => {
    name.value = '';
    type.value = '';
    gender.value = '';
    age.value = '';
    description.value = '';
    imageBase64.value = '';
    imageName.value = '';
    errors.value = {};
};
</script>

<template>
    <form @submit.prevent="handleSubmit" class="pet-form">
        <div class="form-group">
            <label for="name">Navn *</label>
            <input type="text" id="name" v-model="name" placeholder="Indtast dyrets navn"
                :class="{ 'error-input': errors.name }">
            <span v-if="errors.name" class="error-text">{{ errors.name }}</span>
        </div>

        <div class="form-row">
            <div class="form-group">
                <label for="type">Type *</label>
                <select id="type" v-model="type" :class="{ 'error-input': errors.type }">
                    <option value="" disabled selected>Vælg dyretype</option>
                    <option v-for="petType in petTypes" :key="petType.value" :value="petType.value">
                        {{ petType.label }}
                    </option>
                </select>
                <span v-if="errors.type" class="error-text">{{ errors.type }}</span>
            </div>

            <div class="form-group">
                <label for="gender">Køn *</label>
                <select id="gender" v-model="gender" :class="{ 'error-input': errors.gender }">
                    <option value="" disabled selected>Vælg køn</option>
                    <option v-for="option in genderOptions" :key="option.value" :value="option.value">
                        {{ option.label }}
                    </option>
                </select>
                <span v-if="errors.gender" class="error-text">{{ errors.gender }}</span>
            </div>
        </div>

        <div class="form-group">
            <label for="age">Alder *</label>
            <input type="text" id="age" v-model="age" placeholder="F.eks. '2 år' eller '6 måneder'"
                :class="{ 'error-input': errors.age }">
            <span v-if="errors.age" class="error-text">{{ errors.age }}</span>
        </div>

        <div class="form-group">
            <label for="description">Beskrivelse *</label>
            <textarea id="description" v-model="description" rows="4"
                placeholder="Beskriv dyrets personlighed, baggrund, og hvorfor det søger et nyt hjem"
                :class="{ 'error-input': errors.description }"></textarea>
            <span v-if="errors.description" class="error-text">{{ errors.description }}</span>
        </div>

        <div class="form-group">
            <label for="image">Billede *</label>
            <div class="image-upload-container" :class="{ 'error-input': errors.image }">
                <div class="image-upload-area" @click="$refs.imageInput.click()"
                    :class="{ 'has-preview': imageBase64 }">
                    <input type="file" ref="imageInput" id="image" @change="handleImageChange" accept="image/*"
                        class="hidden-input">
                    <div v-if="!imageBase64" class="upload-placeholder">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                            <circle cx="8.5" cy="8.5" r="1.5"></circle>
                            <polyline points="21 15 16 10 5 21"></polyline>
                        </svg>
                        <span>Klik for at uploade et billede</span>
                    </div>
                    <img v-else :src="imageBase64" alt="Preview" class="image-preview">
                </div>
                <div v-if="imageName" class="file-name">
                    <span>{{ imageName }}</span>
                </div>
            </div>
            <span v-if="errors.image" class="error-text">{{ errors.image }}</span>
            <p class="helper-text">
                Upload et billede af kæledyret. Max 1MB, kun billeder (jpg, png, etc.).
            </p>
        </div>

        <div class="form-actions">
            <button type="button" @click="resetForm" class="btn-secondary">Nulstil</button>
            <button type="submit" class="btn-primary" :disabled="submitting">
                {{ submitting ? 'Tilføjer...' : 'Tilføj Kæledyr' }}
            </button>
        </div>
    </form>
</template>

<style scoped>
.pet-form {
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
    padding: 30px;
}

.form-group {
    margin-bottom: 20px;
}

.form-row {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
}

.form-row .form-group {
    flex: 1;
    margin-bottom: 0;
}

label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #4a6572;
}

input,
select,
textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 1rem;
    color: #333;
    transition: border-color 0.2s, box-shadow 0.2s;
}

input:focus,
select:focus,
textarea:focus {
    outline: none;
    border-color: #4a6572;
    box-shadow: 0 0 0 2px rgba(74, 101, 114, 0.2);
}

.error-input {
    border-color: #e74c3c;
}

.error-text {
    display: block;
    color: #e74c3c;
    font-size: 0.9rem;
    margin-top: 5px;
}

.helper-text {
    font-size: 0.9rem;
    color: #666;
    margin-top: 5px;
}

.image-upload-container {
    width: 100%;
}

.hidden-input {
    display: none;
}

.image-upload-area {
    border: 2px dashed #ddd;
    border-radius: 6px;
    padding: 30px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s;
    background-color: #f9f9f9;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
}

.image-upload-area:hover {
    border-color: #4a6572;
    background-color: #f0f0f0;
}

.upload-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    color: #666;
}

.upload-placeholder svg {
    width: 40px;
    height: 40px;
    color: #999;
}

.image-preview {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}

.has-preview {
    padding: 0;
}

.file-name {
    margin-top: 10px;
    font-size: 0.9rem;
    color: #666;
}

.form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 15px;
    margin-top: 30px;
}

.btn-primary,
.btn-secondary {
    padding: 12px 24px;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    border: none;
}

.btn-primary {
    background-color: #4a6572;
    color: white;
}

.btn-primary:hover {
    background-color: #3a505b;
    transform: translateY(-2px);
}

.btn-primary:disabled {
    background-color: #99aab5;
    cursor: not-allowed;
    transform: none;
}

.btn-secondary {
    background-color: #f5f5f5;
    color: #4a6572;
    border: 1px solid #ddd;
}

.btn-secondary:hover {
    background-color: #eeeeee;
}

@media (max-width: 768px) {
    .form-row {
        flex-direction: column;
        gap: 20px;
    }

    .pet-form {
        padding: 20px;
    }

    .image-upload-area {
        height: 150px;
    }
}
</style>