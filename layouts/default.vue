<template>
  <div class="layout">
    <header class="layout__header">
      <nav class="layout__nav">
        <NuxtLink to="/" class="layout__link main">ПЁСЕЛЬ</NuxtLink>
        <NuxtLink to="/favourites" class="layout__link favourites" :class="{ active: path === '/favourites' }">Избранные пёсели</NuxtLink>
      </nav>
      <USelectMenu
        v-model="value"
        placeholder="Все породы"
        :search-input="{
          placeholder: 'Поиск',
          icon: 'i-lucide-search',
        }"
        :items="items"
        class="layout__select w-full max-w-[500px]"
      />
    </header>
    <main class="layout__main">
      <slot />
    </main>
  </div>
</template>

<script setup>
  import { useMyDogsStore } from '~/store/dogs';

  const store = useMyDogsStore();
  const route = useRoute();
  const path = computed(() => route.path);
  const items = store.getBreeds;
  const value = ref(null);

  watch(value, (newValue) => {
    navigateTo(newValue);
  });

  watch(path, (newValue) => {
    if (newValue === '/') {
      value.value = null;
    }
  });

  function checkPath() {
    if (store.breeds.includes(path.value.slice(1))) {
      value.value = path.value.slice(1);
    }
  }

  checkPath();
</script>

<style lang="scss" scoped>
  .layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;

    .layout__header {
      display: flex;
      position: sticky;
      top: 0;
      flex-direction: column;
      align-items: flex-end;
      gap: 8px;
      z-index: 12;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      background: white;
      padding: 20px;
    }

    .layout__nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
      width: 100%;
    }

    .layout__link {
      transition: color 0.3s ease;
      text-decoration: none;

      &.main {
        color: var(--ui-primary);
        font-weight: 600;
        font-size: 27px;
      }

      &.favourites {
        color: #626262;

        &:hover {
          color: #000;
        }
      }
      &.active {
        color: #000;
      }
    }
  }
</style>
