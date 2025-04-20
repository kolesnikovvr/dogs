<template>
  <div class="layout">
    <header class="layout__header">
      <nav class="layout__nav">
        <NuxtLink to="/" class="layout__link">Home</NuxtLink>
        <NuxtLink to="/favourites" class="layout__link">Favourites</NuxtLink>
      </nav>

      <!-- <div class="layout__breed-selector">
        <select v-model="selectedBreed" class="layout__select" @change="handleBreedChange">
          <option value="">All Breeds</option>
          <option v-for="breed in breeds" :key="breed" :value="breed">
            {{ breed }}
          </option>
        </select>
      </div> -->
    </header>

    <main class="layout__main">
      <slot />
    </main>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
  .layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;

    &__header {
      background: white;
      padding: 20px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__nav {
      display: flex;
      gap: 20px;
    }

    &__link {
      color: #333;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s ease;

      &:hover {
        color: #4caf50;
      }
    }

    &__breed-selector {
      position: relative;
    }

    &__select {
      padding: 8px 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 16px;
      min-width: 200px;
      cursor: pointer;
      outline: none;
      transition: border-color 0.3s ease;

      &:focus {
        border-color: #4caf50;
      }
    }

    &__main {
      flex: 1;
      padding: 20px;
      background: #f5f5f5;
    }
  }
</style>
