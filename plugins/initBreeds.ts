import { useMyDogsStore } from '@/store/dogs';

export default defineNuxtPlugin(async () => {
  const store = useMyDogsStore();
  store.initializeFavourites();
  if (!store.breeds.length) {
    await store.fetchBreeds();
  }
});

// Получаю список пород, до загрузки приложения, 1 раз.
// Для корректной работы middeleware
