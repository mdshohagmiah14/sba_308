
// Fix 2: Replace with your actual API key from thedogapi.com
const API_KEY = 'https://api.thedogapi.com/v1/images/search'; 

export async function fetchBreeds() {
    try {
        const response = await fetch('https://api.thedogapi.com/v1/breeds', {
            headers: { 'x-api-key': API_KEY }
        });
        return await response.json();
    } catch (error) {
        console.error('Error fetching breeds:', error);
        return [];
    }
}

export async function fetchBreedImages(breedId) {
    try {
        const response = await fetch(
            `https://api.thedogapi.com/v1/images/search?breed_ids=${breedId}&limit=10`,
            { headers: { 'x-api-key': API_KEY } }
        );
        return await response.json();
    } catch (error) {
        console.error('Error fetching images:', error);
        return [];
    }
}