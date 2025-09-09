<template>
  <div class="logo-demo-container p-8 space-y-8">
    <h2 class="text-3xl font-bold text-gray-900 mb-8">ChronoUtilz Logo Showcase</h2>
    
    <!-- Full Logo Variants -->
    <section class="space-y-4">
      <h3 class="text-xl font-semibold text-gray-700">Full Logo</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-white p-6 rounded-lg shadow-sm border">
          <h4 class="text-sm font-medium text-gray-600 mb-4">Small</h4>
          <ChronoUtilzLogo variant="full" size="small" />
        </div>
        <div class="bg-white p-6 rounded-lg shadow-sm border">
          <h4 class="text-sm font-medium text-gray-600 mb-4">Medium</h4>
          <ChronoUtilzLogo variant="full" size="medium" />
        </div>
      </div>
    </section>
    
    <!-- Horizontal Logo Variants -->
    <section class="space-y-4">
      <h3 class="text-xl font-semibold text-gray-700">Horizontal Logo</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-white p-6 rounded-lg shadow-sm border">
          <h4 class="text-sm font-medium text-gray-600 mb-4">Small</h4>
          <ChronoUtilzLogo variant="horizontal" size="small" />
        </div>
        <div class="bg-white p-6 rounded-lg shadow-sm border">
          <h4 class="text-sm font-medium text-gray-600 mb-4">Medium</h4>
          <ChronoUtilzLogo variant="horizontal" size="medium" />
        </div>
      </div>
    </section>
    
    <!-- Logo Mark Variants -->
    <section class="space-y-4">
      <h3 class="text-xl font-semibold text-gray-700">Logo Mark (Icon Only)</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-white p-4 rounded-lg shadow-sm border flex flex-col items-center">
          <h4 class="text-sm font-medium text-gray-600 mb-4">Small</h4>
          <ChronoUtilzLogo variant="mark" size="small" />
        </div>
        <div class="bg-white p-4 rounded-lg shadow-sm border flex flex-col items-center">
          <h4 class="text-sm font-medium text-gray-600 mb-4">Medium</h4>
          <ChronoUtilzLogo variant="mark" size="medium" />
        </div>
        <div class="bg-white p-4 rounded-lg shadow-sm border flex flex-col items-center">
          <h4 class="text-sm font-medium text-gray-600 mb-4">Large</h4>
          <ChronoUtilzLogo variant="mark" size="large" />
        </div>
        <div class="bg-white p-4 rounded-lg shadow-sm border flex flex-col items-center">
          <h4 class="text-sm font-medium text-gray-600 mb-4">XLarge</h4>
          <ChronoUtilzLogo variant="mark" size="xlarge" />
        </div>
      </div>
    </section>
    
    <!-- Text Logo Variants -->
    <section class="space-y-4">
      <h3 class="text-xl font-semibold text-gray-700">Text Only</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-white p-6 rounded-lg shadow-sm border">
          <h4 class="text-sm font-medium text-gray-600 mb-4">Medium</h4>
          <ChronoUtilzLogo variant="text" size="medium" />
        </div>
        <div class="bg-white p-6 rounded-lg shadow-sm border">
          <h4 class="text-sm font-medium text-gray-600 mb-4">Large</h4>
          <ChronoUtilzLogo variant="text" size="large" />
        </div>
      </div>
    </section>
    
    <!-- Usage Examples -->
    <section class="space-y-4">
      <h3 class="text-xl font-semibold text-gray-700">Usage Examples</h3>
      
      <!-- Header example -->
      <div class="bg-gray-50 p-4 rounded-lg">
        <h4 class="text-sm font-medium text-gray-600 mb-2">Navigation Header</h4>
        <nav class="flex items-center justify-between bg-white p-4 rounded border">
          <ChronoUtilzLogo variant="horizontal" size="small" />
          <div class="space-x-4">
            <button class="text-gray-600 hover:text-gray-900">Docs</button>
            <button class="text-gray-600 hover:text-gray-900">API</button>
            <button class="text-gray-600 hover:text-gray-900">Examples</button>
          </div>
        </nav>
      </div>
      
      <!-- Footer example -->
      <div class="bg-gray-50 p-4 rounded-lg">
        <h4 class="text-sm font-medium text-gray-600 mb-2">Footer</h4>
        <footer class="bg-gray-800 text-white p-6 rounded">
          <div class="flex items-center space-x-4">
            <ChronoUtilzLogo variant="mark" size="small" />
            <div>
              <ChronoUtilzLogo variant="text" size="small" />
              <p class="text-gray-400 text-sm mt-1">© 2024 ChronoUtilz. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </section>
    
    <!-- Color Guide -->
    <section class="space-y-4">
      <h3 class="text-xl font-semibold text-gray-700">Color Palette</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-red-500 h-16 rounded-lg flex items-center justify-center text-white font-medium">
          Red #ef4444
        </div>
        <div class="bg-red-600 h-16 rounded-lg flex items-center justify-center text-white font-medium">
          Dark Red #dc2626
        </div>
        <div class="bg-blue-400 h-16 rounded-lg flex items-center justify-center text-white font-medium">
          Blue #60a5fa
        </div>
        <div class="bg-blue-500 h-16 rounded-lg flex items-center justify-center text-white font-medium">
          Dark Blue #3b82f6
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import ChronoUtilzLogo from './ChronoUtilzLogo.vue'
</script>

<style scoped>
.logo-demo-container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>