import { defineStore } from 'pinia';
import axios from 'axios';

export const useMyDogsStore = defineStore('myDogs', {
  state: () => ({
    dogs: [] as string[],
    breeds: [] as string[],
    favourites: [] as string[],
    beforeSort: [] as string[],
    isSort: false,
  }),
  getters: {
    getDogs: (state) => state.dogs,
    getBreeds: (state) => state.breeds,
  },
  actions: {
    async fetchBreeds() {
      if (this.breeds.length) return;

      try {
        const response = await axios.get('https://dog.ceo/api/breeds/list/all');
        this.breeds = Object.keys(response.data.message);
      } catch (error) {
        console.error(error);
      }
    },
    async fetchRandomDogs() {
      try {
        const response = await axios.get('https://dog.ceo/api/breeds/image/random/20');
        this.dogs = [...this.dogs, ...response.data.message];
        return this.dogs;
      } catch (error) {
        console.error(error);
      }
    },
    async fetchBreedDogs(breed: string) {
      try {
        const response = await axios.get(`https://dog.ceo/api/breed/${breed}/images/random/20`);
        this.dogs = [...this.dogs, ...response.data.message];
      } catch (error) {
        console.error(error);
      }
    },
    addToFavourites(dog: string) {
      this.favourites.push(dog);
      if (import.meta.client) {
        localStorage.setItem('favourites', JSON.stringify(this.favourites));
      }
    },
    removeFromFavourites(dog: string) {
      this.favourites = this.favourites.filter((fav: string) => fav !== dog);
      if (import.meta.client) {
        localStorage.setItem('favourites', JSON.stringify(this.favourites));
      }
    },
    initializeFavourites() {
      if (import.meta.client) {
        this.favourites = JSON.parse(localStorage.getItem('favourites') || '[]');
      }
    },
    sortDogsBreed() {
      if (this.isSort) {
        this.beforeSort = [...this.dogs];
        this.dogs.sort((a, b) => {
          const partA = a.split('/')[4].split('-')[0];
          const partB = b.split('/')[4].split('-')[0];
          return partA.localeCompare(partB);
        });
      } else {
        this.dogs = [...this.beforeSort];
      }
    },
  },
});
