<template>
  <div class="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-2">Try a function:</label>
      <select 
        v-model="selectedFunction" 
        class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value="">Select a function to try...</option>
        <option value="addTime">addTime(date, amount, unit)</option>
        <option value="isWeekend">isWeekend(date)</option>
        <option value="calculateAge">calculateAge(birthDate)</option>
        <option value="formatDate">formatDate(date)</option>
        <option value="isLeapYear">isLeapYear(year)</option>
        <option value="getDaysInMonth">getDaysInMonth(date)</option>
        <option value="isBusinessDay">isBusinessDay(date)</option>
      </select>
    </div>
    
    <div v-if="selectedFunction" class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-2">Input:</label>
      
      <!-- Special handling for addTime function -->
      <div v-if="selectedFunction === 'addTime'" class="space-y-3">
        <div>
          <label class="block text-xs font-medium text-gray-600 mb-1">Amount:</label>
          <input 
            v-model="timeAmount"
            type="number"
            placeholder="7"
            class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-600 mb-1">Time Unit:</label>
          <select 
            v-model="timeUnit"
            class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="second">Second</option>
            <option value="minute">Minute</option>
            <option value="hour">Hour</option>
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
            <option value="year">Year</option>
          </select>
        </div>
      </div>
      
      <!-- Regular input for other functions -->
      <input 
        v-else
        v-model="inputValue"
        :placeholder="getPlaceholder(selectedFunction)"
        class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>

    <button 
      @click="executeFunction"
      :disabled="!selectedFunction || (selectedFunction !== 'addTime' && !inputValue)"
      class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-300"
    >
      Execute Function
    </button>

    <div v-if="result !== null" class="mt-4 p-4 bg-gray-50 rounded-md">
      <h4 class="font-medium text-gray-900 mb-2">Result:</h4>
      <pre class="text-sm text-gray-700">{{ result }}</pre>
    </div>

    <div v-if="error" class="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
      <h4 class="font-medium text-red-900 mb-2">Error:</h4>
      <p class="text-sm text-red-700">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useChronoUtilz } from '../composables/useChronoUtilz'

const { getLibrary } = useChronoUtilz()

const selectedFunction = ref('')
const inputValue = ref('')
const timeAmount = ref(7)
const timeUnit = ref('day')
const result = ref(null)
const error = ref(null)
const chronoUtilz = ref(null)

onMounted(() => {
  chronoUtilz.value = getLibrary()
})

const getPlaceholder = (func) => {
  const placeholders = {
    'addTime': '7,day (adds 7 days to today)',
    'isWeekend': 'leave empty (checks today)',
    'calculateAge': '1990-05-15',
    'formatDate': 'leave empty (formats today)',
    'isLeapYear': '2024',
    'getDaysInMonth': 'leave empty (current month)',
    'isBusinessDay': 'leave empty (checks today)'
  }
  return placeholders[func] || ''
}

const executeFunction = () => {
  if (!chronoUtilz.value || !selectedFunction.value) return
  
  error.value = null
  result.value = null

  try {
    let output
    const func = chronoUtilz.value[selectedFunction.value]
    
    if (!func) {
      throw new Error(`Function ${selectedFunction.value} not found`)
    }

    switch (selectedFunction.value) {
      case 'addTime':
        output = func(new Date(), timeAmount.value || 7, timeUnit.value || 'day')
        break
      case 'isWeekend':
        output = func(new Date())
        break
      case 'calculateAge':
        output = func(inputValue.value || '1990-05-15')
        break
      case 'formatDate':
        output = func(new Date())
        break
      case 'isLeapYear':
        output = func(parseInt(inputValue.value) || new Date().getFullYear())
        break
      case 'getDaysInMonth':
        output = func(new Date())
        break
      case 'isBusinessDay':
        output = func(new Date())
        break
      default:
        output = func(inputValue.value)
    }

    result.value = output
  } catch (err) {
    error.value = err.message
  }
}
</script>