import { useMyDogsStore } from '@/store/dogs';

export default defineNuxtRouteMiddleware((to) => {
  const store = useMyDogsStore();
  const breeds = store.getBreeds;

  if (!breeds.includes(to.params.breed as string)) {
    return navigateTo('/', { replace: true });
  } else {
    store.dogs = [];
    store.fetchBreedDogs(to.params.breed as string);
  }
});
