<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <h3 class="text-lg font-semibold mb-4 text-gray-900">{{ group.name }}</h3>
    <div class="space-y-3">
      <div 
        v-for="func in group.functions"
        :key="func.name"
        class="border-l-4 border-indigo-500 pl-3 cursor-pointer hover:bg-gray-50 transition-colors duration-200 rounded-r-md p-2 -ml-2"
        @click="scrollToFunction(func.name)"
      >
        <div class="font-mono text-sm text-indigo-700">{{ func.name }}</div>
        <div class="text-gray-600 text-sm">{{ func.description }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  group: Object
})

const scrollToFunction = (functionName) => {
  // Find the function demo element by its ID
  const element = document.getElementById(`demo-${functionName}`)
  if (element) {
    // Smooth scroll to the element with some offset for better visibility
    element.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'center'
    })
    
    // Add a temporary highlight effect
    element.classList.add('ring-2', 'ring-indigo-400', 'ring-opacity-75')
    setTimeout(() => {
      element.classList.remove('ring-2', 'ring-indigo-400', 'ring-opacity-75')
    }, 2000)
  }
}
</script>