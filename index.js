import { fetchBreeds, fetchBreedImages } from './dogApi.js';

document.addEventListener('DOMContentLoaded', async () => {
    const breedSelect = document.getElementById('breedSelect');
    const imageContainer = document.getElementById('imageContainer');

    // Load breeds
    try {
        const breeds = await fetchBreeds();
        breeds.forEach(breed => {
            const option = document.createElement('option');
            option.value = breed.id;
            option.textContent = breed.name;
            breedSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Failed to load breeds:', error);
    }

    // Handle breed selection
    breedSelect.addEventListener('change', async (e) => {
        const breedId = e.target.value;
        if (!breedId) return;

        try {
            imageContainer.innerHTML = '<p class="loading">Loading images...</p>';
            const images = await fetchBreedImages(breedId);
            imageContainer.innerHTML = '';
            
            images.forEach(image => {
                const img = document.createElement('img');
                img.src = image.url;
                img.alt = `${breedSelect.options[breedSelect.selectedIndex].text} image`;
                img.classList.add('dog-image');
                imageContainer.appendChild(img);
            });
        } catch (error) {
            imageContainer.innerHTML = '<p class="error">Failed to load images</p>';
            console.error('Image load error:', error);
        }
    });
});