<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h3 class="text-xl font-semibold mb-4">{{ title }}</h3>
    <div class="space-y-4">
      <div 
        v-for="(example, index) in examples" 
        :key="index"
        class="border-l-4 border-indigo-500 pl-4"
      >
        <code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">{{ example.code }}</code>
        <p class="text-gray-600 text-sm mt-1">{{ example.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  examples: Array
})
</script>