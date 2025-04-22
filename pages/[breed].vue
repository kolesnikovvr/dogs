<template>
  <div class="images_list">
    <ImageDog v-for="(src, index) in images" :key="index" :src="src" />
    <div ref="sentinel" class="sentinel"></div>
  </div>
</template>

<script setup lang="ts">
  import { useMyDogsStore } from '~/store/dogs';

  definePageMeta({
    middleware: ['breed'],
  });

  const sentinel = useTemplateRef<HTMLElement>('sentinel');
  const images = computed(() => store.dogs);
  const isLoading = ref(false);
  const store = useMyDogsStore();
  const route = useRoute();
  const breed = route.params.breed as string;

  store.dogs = [];

  function noMoreContent() {
    if (images.value.length >= 1000) {
      return true;
    } else if (store.dogs.length < 20 && store.dogs.length > 0) {
      return false;
    }
    return false;
  }

  useInfiniteScroll(
    sentinel,
    async () => {
      if (isLoading.value) return;
      isLoading.value = true;
      try {
        await store.fetchBreedDogs(breed);
      } finally {
        setTimeout(() => (isLoading.value = false), 100);
      }
    },
    {
      distance: 100,
      canLoadMore: () => !noMoreContent() && !isLoading.value,
    },
  );
</script>

<style lang="scss" scoped>
  .images_list {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    box-sizing: border-box;
    padding: 20px;
    width: 100%;

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1024px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .sentinel {
    grid-column: 1 / -1;
    height: 1px;
  }
</style>
