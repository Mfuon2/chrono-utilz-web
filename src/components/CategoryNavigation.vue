<template>
  <nav class="mb-8">
    <div class="bg-white rounded-lg shadow-md p-4">
      <div class="flex flex-wrap items-center justify-center space-x-4 text-sm">
        <RouterLink to="/" class="text-indigo-600 hover:text-indigo-800 transition">← Home</RouterLink>
        <RouterLink 
          v-for="category in categories"
          :key="category.path"
          :to="category.path"
          :class="[
            'px-3 py-1 rounded-md transition',
            category.name === current 
              ? 'bg-indigo-100 text-indigo-800 font-semibold' 
              : 'hover:bg-gray-100 text-gray-700'
          ]"
        >
          {{ category.name }}
        </RouterLink>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  current: String
})

const categories = [
  { name: 'Core Operations', path: '/core-operations' },
  { name: 'Business Utilities', path: '/business-utilities' },
  { name: 'Formatting & Parsing', path: '/formatting-parsing' },
  { name: 'Timezone & Localization', path: '/timezone-localization' },
  { name: 'Comparison & Validation', path: '/comparison-validation' },
  { name: 'Utility Functions', path: '/utility-functions' },
]
</script>