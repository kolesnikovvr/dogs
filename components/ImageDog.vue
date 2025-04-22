<template>
  <div class="image">
    <USkeleton v-if="!isLoaded" class="image__skeleton" />
    <NuxtImg v-show="isLoaded" :src="props.src" alt="dog" class="image__content" @click="open = true" @load="isLoaded = true" />
    <div class="image__breed">{{ breed }}</div>
    <UIcon name="material-symbols:favorite-rounded" class="like" :class="{ active: likeActive }" @click="like" />

    <UModal v-model:open="open" :ui="{ content: 'rounded-none' }" class="modal">
      <template #content>
        <NuxtImg v-show="isLoaded" :src="props.src" alt="dog" class="modal__image" @click="open = true" @load="isLoaded = true" />
        <UIcon name="material-symbols:favorite-rounded" class="like" :class="{ active: likeActive }" @click="like" />

        <div class="modal__close-contain">
          <UIcon name="material-symbols:close-rounded" class="modal__close" @click="open = false" />
        </div>
      </template>
      <template #title></template>
      <template #description></template>
    </UModal>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useMyDogsStore } from '~/store/dogs';

  const props = defineProps({
    src: {
      type: String,
      required: true,
    },
  });

  const breed = capitalizeFirstLetter(props.src.split('/')[4].split('-')[0]);
  const store = useMyDogsStore();
  const isLoaded = ref(false);
  const open = ref(false);
  const likeActive = computed(() => store.favourites.includes(props.src));

  function like() {
    if (!likeActive.value) {
      store.addToFavourites(props.src);
    } else {
      store.removeFromFavourites(props.src);
    }
  }

  function capitalizeFirstLetter(val: string) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }
</script>

<style lang="scss" scoped>
  .image {
    position: relative;
    cursor: pointer;
    border-radius: 8px;
    aspect-ratio: 10 / 8;
    width: 100%;
    height: 100%;
    overflow: hidden;

    .image__content {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .image__breed {
      position: absolute;
      bottom: 10px;
      left: 10px;
      color: white;
      font-weight: 700;
    }
  }

  .like {
    position: absolute;
    right: 10px;
    bottom: 10px;
    transition: all 0.3s ease;
    cursor: pointer;
    width: 20px;
    height: 20px;
    color: white;

    &.active {
      color: #f80000;
    }
    &:hover {
      transform: scale(1.1);
      filter: brightness(0.9);
    }
  }

  .image__skeleton {
    width: 100%;
    height: 100%;
  }

  .modal {
    .modal__close-contain {
      display: flex;
      position: absolute;
      top: 15px;
      right: 15px;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      border-radius: 100%;
      background-color: #151419;
      width: 30px;
      height: 30px;
      color: #fff;

      .modal__close {
        width: 20px;
        height: 20px;
      }
    }

    .like {
      right: 15px;
      bottom: 15px;
      width: 30px;
      height: 30px;
    }
  }
</style>
