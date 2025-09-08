<template>
  <header class="bg-indigo-700 text-white shadow-lg">
    <div class="container mx-auto px-4 py-6">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold">ChronoUtilz</h1>
          <div class="mt-2 text-sm">
            <LibraryStatus />
          </div>
        </div>
        <nav class="mt-4 md:mt-0">
          <ul class="flex flex-wrap space-x-4 text-sm">
            <li><RouterLink to="/" class="hover:text-indigo-200 transition">Home</RouterLink></li>
            <li><RouterLink to="/documentation" class="hover:text-indigo-200 transition">Documentation</RouterLink></li>
            <li><RouterLink to="/api-docs" class="hover:text-indigo-200 transition">API Docs</RouterLink></li>
            <li class="relative group">
              <a href="#" class="hover:text-indigo-200 transition">Playgrounds ▾</a>
              <div class="absolute top-full left-0 bg-white text-gray-800 rounded-lg shadow-lg min-w-48 hidden group-hover:block z-10">
                <RouterLink to="/core-operations" class="block px-4 py-2 hover:bg-indigo-50">Core Operations</RouterLink>
                <RouterLink to="/business-utilities" class="block px-4 py-2 hover:bg-indigo-50">Business Utilities</RouterLink>
                <RouterLink to="/formatting-parsing" class="block px-4 py-2 hover:bg-indigo-50">Formatting & Parsing</RouterLink>
                <RouterLink to="/timezone-localization" class="block px-4 py-2 hover:bg-indigo-50">Timezone & Localization</RouterLink>
                <RouterLink to="/comparison-validation" class="block px-4 py-2 hover:bg-indigo-50">Comparison & Validation</RouterLink>
                <RouterLink to="/utility-functions" class="block px-4 py-2 hover:bg-indigo-50">Utility Functions</RouterLink>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import LibraryStatus from './LibraryStatus.vue'
</script>