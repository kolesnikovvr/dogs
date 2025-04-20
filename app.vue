<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
  import { useMyDogsStore } from './store/dogs';

  const store = useMyDogsStore();
</script>
