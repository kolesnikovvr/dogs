import { useMyDogsStore } from '@/store/dogs';

export default defineNuxtPlugin(async () => {
  const store = useMyDogsStore();

  if (!store.breeds.length) {
    await store.fetchBreeds();
  }
});
