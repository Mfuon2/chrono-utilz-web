<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <AppHeader />
    <main>
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
</script>

<style>
/* Custom styles for dropdown */
.group:hover .group-hover\:block {
  display: block;
}
</style>