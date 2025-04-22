<template>
  <ClientOnly>
    <div class="images_list">
      <ImageDog v-for="(src, index) in images" :key="index" :src="src" />
      <div ref="sentinel" class="sentinel"></div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
  import { useMyDogsStore } from '~/store/dogs';

  const store = useMyDogsStore();
  const sentinel = useTemplateRef<HTMLElement>('sentinel');
  const images = computed(() => store.favourites);
  const favourites = ref([] as string[]);
  const isLoading = ref(false);

  function noMoreContent() {
    return favourites.value.length === images.value.length;
  }

  function addImages() {
    if (favourites.value.length < images.value.length) {
      favourites.value = images.value.slice(favourites.value.length, favourites.value.length + 20);
    }
  }

  useInfiniteScroll(
    sentinel,
    async () => {
      if (isLoading.value) return;
      isLoading.value = true;
      try {
        addImages();
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
    gap: 20px;
    padding: 20px;
    grid-template-columns: 1fr;
    width: 100%;
    box-sizing: border-box;

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1024px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .sentinel {
    height: 1px;
    grid-column: 1 / -1;
  }
</style>
