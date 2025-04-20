<template>
  <div>{{ dogs }}</div>
</template>

<script lang="ts" setup>
  import { useMyDogsStore } from '~/store/dogs';

  definePageMeta({
    middleware: ['breed'],
  });

  const store = useMyDogsStore();
  const dogs = computed(() => store.dogs);
</script>

<style></style>
