import { defineStore } from 'pinia';
import axios from 'axios';

export const useMyDogsStore = defineStore('myDogs', {
  state: () => ({
    dogs: [] as string[],
    breeds: [] as string[],
    favourites: localStorage.getItem('favourites') ? (JSON.parse(localStorage.getItem('favourites') as string) as string[]) : ([] as string[]),
  }),
  getters: {
    getDogs: (state) => state.dogs,
    getBreeds: (state) => state.breeds,
  },
  actions: {
    async fetchBreeds() {
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
      } catch (error) {
        console.error(error);
      }
    },
    async fetchBreedDogs(breed: string) {
      try {
        const response = await axios.get(`https://dog.ceo/api/breed/${breed}/images`);
        this.dogs = [...this.dogs, ...response.data.message];
      } catch (error) {
        console.error(error);
      }
    },
    async addToFavourites(dog: string) {
      this.favourites.push(dog);
      localStorage.setItem('favourites', JSON.stringify(this.favourites));
    },
    async removeFromFavourites(dog: string) {
      this.favourites = this.favourites.filter((fav: string) => fav !== dog);
      localStorage.setItem('favourites', JSON.stringify(this.favourites));
    },
  },
});
