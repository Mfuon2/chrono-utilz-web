<template>
  <header class="bg-slate-900 text-white shadow-xl border-b border-slate-700/50">
    <div class="container mx-auto px-4 py-6">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">ChronoUtilz</h1>
          <div class="mt-2 text-sm">
            <LibraryStatus />
          </div>
        </div>
        <nav class="mt-4 md:mt-0">
          <ul class="flex flex-wrap space-x-4 text-sm">
            <li><RouterLink to="/" class="hover:text-cyan-400 transition-colors duration-200">Home</RouterLink></li>
            <li><RouterLink to="/documentation" class="hover:text-cyan-400 transition-colors duration-200">Documentation</RouterLink></li>
            <li><RouterLink to="/api-docs" class="hover:text-cyan-400 transition-colors duration-200">API Docs</RouterLink></li>
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