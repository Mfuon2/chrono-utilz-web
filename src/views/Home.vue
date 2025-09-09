<template>
  <div class="text-gray-800">
    <!-- Hero Section -->
    <section id="home" class="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-cyan-600/20"></div>
      <div class="container mx-auto px-4 text-center relative z-10">
        <!-- Main Logo -->
        <div class="flex justify-center mb-8">
          <ChronoUtilzLogo variant="full" size="large" :clickable="false" />
        </div>
        <h2 class="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent leading-tight">
          Simplify Date Operations
        </h2>
        <p class="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-slate-300 font-light">
          136+ powerful functions for date manipulation, business logic, formatting, and parsing
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4 max-w-lg mx-auto">
          <a href="#documentation" class="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-4 px-8 rounded-xl transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
            Get Started
          </a>
          <RouterLink to="/documentation" class="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-white/40 text-white font-semibold py-4 px-8 rounded-xl transition duration-300 flex items-center justify-center">
            Documentation
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">Three Pillars Architecture</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-gray-50 p-6 rounded-lg shadow-md">
            <div class="mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="url(#featureIconGradient1)">
                <defs>
                  <linearGradient id="featureIconGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#60a5fa;stop-opacity:1" />
                    <stop offset="50%" style="stop-color:#22d3ee;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:1" />
                  </linearGradient>
                </defs>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Core Operations</h3>
            <p class="text-gray-600">45+ functions for date manipulation and comparison including add/subtract time, date differences, and validation.</p>
          </div>
          <div class="bg-gray-50 p-6 rounded-lg shadow-md">
            <div class="mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="url(#featureIconGradient2)">
                <defs>
                  <linearGradient id="featureIconGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#60a5fa;stop-opacity:1" />
                    <stop offset="50%" style="stop-color:#22d3ee;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:1" />
                  </linearGradient>
                </defs>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Business Utilities</h3>
            <p class="text-gray-600">55+ functions for real-world business logic including working days, fiscal periods, payroll, and SLA compliance.</p>
          </div>
          <div class="bg-gray-50 p-6 rounded-lg shadow-md">
            <div class="mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="url(#featureIconGradient3)">
                <defs>
                  <linearGradient id="featureIconGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#60a5fa;stop-opacity:1" />
                    <stop offset="50%" style="stop-color:#22d3ee;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:1" />
                  </linearGradient>
                </defs>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Formatting & Parsing</h3>
            <p class="text-gray-600">35+ functions for advanced presentation including custom formatting, localization, and natural language parsing.</p>
          </div>
        </div>
      </div>
    </section>


    <!-- Documentation Section -->
    <section id="documentation" class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">Explore by Category</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CategoryCard 
            v-for="category in categories"
            :key="category.name"
            :category="category"
          />
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import CategoryCard from '../components/CategoryCard.vue'
import ChronoUtilzLogo from '../components/ChronoUtilzLogo.vue'

const categories = [
  {
    name: 'Core Operations',
    path: '/core-operations',
    description: 'Date arithmetic, comparisons, and basic operations',
    icon: '',
    color: 'bg-blue-100 text-blue-800'
  },
  {
    name: 'Business Utilities',
    path: '/business-utilities',
    description: 'Working days, fiscal periods, payroll calculations',
    icon: '',
    color: 'bg-green-100 text-green-800'
  },
  {
    name: 'Formatting & Parsing',
    path: '/formatting-parsing',
    description: 'Custom formats, localization, natural language',
    icon: '',
    color: 'bg-purple-100 text-purple-800'
  },
  {
    name: 'Timezone & Localization',
    path: '/timezone-localization',
    description: 'Multi-timezone support and internationalization',
    icon: '',
    color: 'bg-yellow-100 text-yellow-800'
  },
  {
    name: 'Comparison & Validation',
    path: '/comparison-validation',
    description: 'Date comparisons, range checks, validation rules',
    icon: '',
    color: 'bg-red-100 text-red-800'
  },
  {
    name: 'Utility Functions',
    path: '/utility-functions',
    description: 'Helper functions and advanced utilities',
    icon: '',
    color: 'bg-indigo-100 text-indigo-800'
  }
]
</script>