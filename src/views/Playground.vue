<template>
  <div class="container mx-auto px-4 py-8">
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">ChronoUtilz Playground</h1>
      <p class="text-lg text-gray-600">Interactive demo for all 136+ ChronoUtilz functions</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Function Explorer -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded-lg shadow-md p-6 sticky top-4">
          <h2 class="text-xl font-semibold mb-4">Functions Explorer</h2>
          
          <div class="mb-4">
            <input 
              v-model="searchQuery"
              placeholder="Search functions..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div class="space-y-2 max-h-96 overflow-y-auto">
            <button
              v-for="func in filteredFunctions"
              :key="func.name"
              @click="selectFunction(func)"
              :class="[
                'w-full text-left px-3 py-2 rounded-md text-sm transition-colors',
                selectedFunc?.name === func.name 
                  ? 'bg-indigo-100 text-indigo-800' 
                  : 'hover:bg-gray-100'
              ]"
            >
              <div class="font-medium">{{ func.name }}</div>
              <div class="text-gray-500 text-xs">{{ func.signature }}</div>
            </button>
          </div>
        </div>
      </div>

      <!-- Interactive Console -->
      <div class="lg:col-span-2">
        <div class="bg-white rounded-lg shadow-md">
          <div class="border-b border-gray-200 p-6">
            <h2 class="text-xl font-semibold">Interactive Console</h2>
          </div>
          
          <div class="p-6">
            <FunctionTester 
              v-if="selectedFunc"
              :function="selectedFunc"
              :chronoUtilz="chronoUtilz"
            />
            
            <div v-else class="text-center text-gray-500 py-8">
              Select a function from the explorer to get started
            </div>
          </div>
        </div>

        <!-- Recent Results -->
        <div v-if="recentResults.length > 0" class="mt-6 bg-white rounded-lg shadow-md">
          <div class="border-b border-gray-200 p-6">
            <h2 class="text-xl font-semibold">Recent Results</h2>
          </div>
          <div class="p-6">
            <div 
              v-for="(result, index) in recentResults" 
              :key="index"
              class="mb-4 p-4 bg-gray-50 rounded-md"
            >
              <div class="font-mono text-sm text-indigo-700 mb-2">{{ result.call }}</div>
              <div class="font-mono text-sm text-gray-700">{{ result.output }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, provide } from 'vue'
import { useChronoUtilz } from '../composables/useChronoUtilz'
import FunctionTester from '../components/FunctionTester.vue'

const { getFunctions, getLibrary } = useChronoUtilz()

const functions = ref([])
const chronoUtilz = ref(null)
const searchQuery = ref('')
const selectedFunc = ref(null)
const recentResults = ref([])

const filteredFunctions = computed(() => {
  if (!searchQuery.value) return functions.value
  return functions.value.filter(func => 
    func.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const selectFunction = (func) => {
  selectedFunc.value = func
}

const addResult = (call, output) => {
  recentResults.value.unshift({ call, output })
  if (recentResults.value.length > 5) {
    recentResults.value.pop()
  }
}

provide('addResult', addResult)

onMounted(() => {
  const functionsData = getFunctions()
  functions.value = functionsData.functions || []
  chronoUtilz.value = getLibrary()
})
</script>