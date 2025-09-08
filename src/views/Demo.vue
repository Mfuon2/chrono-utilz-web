<template>
  <div class="container mx-auto px-4 py-8">
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">ChronoUtilz Demo</h1>
      <p class="text-lg text-gray-600">Interactive demonstration of ChronoUtilz capabilities</p>
    </div>
    
    <div class="bg-white rounded-lg shadow-md p-6">
      <QuickDemo />
    </div>
  </div>
</template>

<script setup>
import QuickDemo from '../components/QuickDemo.vue'
</script>