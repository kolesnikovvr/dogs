<template>
  <div class="images_list">
    <ImageDog v-for="(src, index) in images" :key="index" :src="src" />
    <div ref="sentinel" class="sentinel"></div>
  </div>
</template>

<script setup lang="ts">
  import { useMyDogsStore } from '~/store/dogs';

  const sentinel = useTemplateRef<HTMLElement>('sentinel');
  const images = computed(() => store.dogs);
  const isLoading = ref(false);
  const store = useMyDogsStore();
  store.dogs = [];

  function noMoreContent() {
    return images.value.length >= 1000;
  }

  useInfiniteScroll(
    sentinel,
    async () => {
      if (isLoading.value) return;
      isLoading.value = true;
      try {
        await store.fetchRandomDogs();
      } finally {
        store.isSort = false;
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
