<template>
  <div>
    <div class="mb-4">
      <h3 class="text-lg font-semibold text-gray-900">{{ props.function.name }}</h3>
      <code class="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">{{ props.function.signature }}</code>
    </div>

    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-2">Parameters:</label>
      
      <!-- Smart parameter inputs based on function type -->
      <div class="space-y-3">
        
        <!-- Time unit functions (addTime) -->
        <div v-if="isTimeUnitFunction(props.function.name)" class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-medium text-gray-600 mb-1">Amount:</label>
            <input
              v-model="timeAmount"
              type="number"
              placeholder="7"
              class="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-600 mb-1">Time Unit:</label>
            <select 
              v-model="timeUnit"
              class="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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

        <!-- String input functions -->
        <div v-else-if="isStringInputFunction(props.function.name)">
          <label class="block text-xs font-medium text-gray-600 mb-1">{{ getStringInputLabel(props.function.name) }}:</label>
          <input
            v-model="stringInput"
            type="text"
            :placeholder="getStringPlaceholder(props.function.name)"
            class="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <!-- Number input functions -->
        <div v-else-if="isNumberInputFunction(props.function.name)">
          <label class="block text-xs font-medium text-gray-600 mb-1">{{ getNumberInputLabel(props.function.name) }}:</label>
          <input
            v-model="numberInput"
            type="number"
            :placeholder="getNumberPlaceholder(props.function.name)"
            class="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <!-- Date input functions -->
        <div v-else-if="isDateInputFunction(props.function.name)">
          <label class="block text-xs font-medium text-gray-600 mb-1">Date:</label>
          <input
            v-model="dateInput"
            type="datetime-local"
            class="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <!-- Multiple date input functions -->
        <div v-else-if="isMultiDateFunction(props.function.name)" class="space-y-3">
          <div v-for="(dateValue, index) in multipleDates" :key="index">
            <label class="block text-xs font-medium text-gray-600 mb-1">
              {{ getMultiDateLabel(props.function.name, index) }}:
            </label>
            <input
              v-model="multipleDates[index]"
              type="datetime-local"
              class="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        <!-- Default parameter inputs -->
        <div v-else class="space-y-2">
          <input
            v-for="(param, index) in parameters"
            :key="index"
            v-model="parameters[index]"
            :placeholder="`Parameter ${index + 1}`"
            class="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

      </div>
    </div>

    <div class="mb-4 flex space-x-2">
      <button
        @click="executeFunction(); analytics.trackButtonClick('test_function', `function_tester_${props.function.name}`)"
        class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300"
      >
        Execute
      </button>
      <button
        @click="addParameter"
        class="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300"
      >
        Add Parameter
      </button>
      <button
        v-if="parameters.length > 1"
        @click="removeParameter"
        class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300"
      >
        Remove Parameter
      </button>
    </div>

    <div v-if="result !== null" class="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
      <h4 class="font-medium text-green-900 mb-2">Result:</h4>
      <pre class="text-sm text-green-700 whitespace-pre-wrap">{{ result }}</pre>
    </div>

    <div v-if="error" class="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
      <h4 class="font-medium text-red-900 mb-2">Error:</h4>
      <p class="text-sm text-red-700">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue'
import { useAnalytics } from '../composables/useAnalytics.js'

const props = defineProps({
  function: Object,
  chronoUtilz: Object
})

const addResult = inject('addResult')

// Initialize analytics
const analytics = useAnalytics()

const parameters = ref([''])
const timeAmount = ref(7)
const timeUnit = ref('day')
const stringInput = ref('')
const numberInput = ref(new Date().getFullYear())
const dateInput = ref(new Date().toISOString().slice(0, 16))
const multipleDates = ref([])
const result = ref(null)
const error = ref(null)

onMounted(() => {
  initializeFunctionInputs()
})

const addParameter = () => {
  parameters.value.push('')
}

const removeParameter = () => {
  if (parameters.value.length > 1) {
    parameters.value.pop()
  }
}

// Initialize function-specific inputs based on function type
const initializeFunctionInputs = () => {
  const funcName = props.function.name
  
  if (isStringInputFunction(funcName)) {
    stringInput.value = getDefaultStringValue(funcName)
  }
  
  if (isMultiDateFunction(funcName)) {
    const now = new Date().toISOString().slice(0, 16)
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 16)
    const dayAfter = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString().slice(0, 16)
    
    const dateCount = getDateInputCount(funcName)
    multipleDates.value = dateCount === 2 ? [now, tomorrow] : [now, tomorrow, dayAfter]
  }
}

// Function type checkers
const isTimeUnitFunction = (name) => ['addTime'].includes(name)
const isStringInputFunction = (name) => ['createDate', 'isValidDate', 'calculateAge'].includes(name)
const isNumberInputFunction = (name) => ['isLeapYear'].includes(name)
const isDateInputFunction = (name) => ['cloneDate', 'isWeekend', 'isWeekday'].includes(name)
const isMultiDateFunction = (name) => ['isAfter', 'isBefore', 'compareDates', 'copyTime', 'isBetweenDates'].includes(name)

// Helper functions for labels and placeholders
const getStringInputLabel = (name) => {
  const labels = {
    createDate: 'Date String',
    isValidDate: 'Date to Validate',
    calculateAge: 'Birth Date'
  }
  return labels[name] || 'Input'
}

const getStringPlaceholder = (name) => {
  const placeholders = {
    createDate: '2024-01-01 or MM/DD/YYYY',
    isValidDate: 'Enter date to validate',
    calculateAge: 'YYYY-MM-DD'
  }
  return placeholders[name] || 'Enter value'
}

const getDefaultStringValue = (name) => {
  const defaults = {
    createDate: '2024-01-01',
    isValidDate: '2024-01-01',
    calculateAge: '1990-01-01'
  }
  return defaults[name] || ''
}

const getNumberInputLabel = (name) => {
  const labels = {
    isLeapYear: 'Year'
  }
  return labels[name] || 'Number'
}

const getNumberPlaceholder = (name) => {
  const placeholders = {
    isLeapYear: new Date().getFullYear().toString()
  }
  return placeholders[name] || '0'
}

const getMultiDateLabel = (name, index) => {
  const labels = {
    copyTime: ['Source Date', 'Target Date'],
    isAfter: ['First Date', 'Second Date'],
    isBefore: ['First Date', 'Second Date'],
    compareDates: ['First Date', 'Second Date'],
    isBetweenDates: ['Check Date', 'Start Date', 'End Date']
  }
  return labels[name]?.[index] || `Date ${index + 1}`
}

const getDateInputCount = (name) => {
  const counts = {
    copyTime: 2,
    isAfter: 2,
    isBefore: 2,
    compareDates: 2,
    isBetweenDates: 3
  }
  return counts[name] || 2
}

const executeFunction = () => {
  if (!props.chronoUtilz || !props.function) return

  result.value = null
  error.value = null

  // Track function testing attempt
  const startTime = performance.now()

  try {
    const func = props.chronoUtilz[props.function.name]
    if (!func) {
      throw new Error(`Function ${props.function.name} not found`)
    }

    let processedParams = []
    const funcName = props.function.name
    
    // Handle different function types with their specific inputs
    if (isTimeUnitFunction(funcName)) {
      processedParams = [new Date(), timeAmount.value || 7, timeUnit.value || 'day']
      
    } else if (isStringInputFunction(funcName)) {
      processedParams = [stringInput.value || getDefaultStringValue(funcName)]
      
    } else if (isNumberInputFunction(funcName)) {
      processedParams = [numberInput.value || new Date().getFullYear()]
      
    } else if (isDateInputFunction(funcName)) {
      const dateValue = dateInput.value ? new Date(dateInput.value) : new Date()
      processedParams = [dateValue]
      
    } else if (isMultiDateFunction(funcName)) {
      processedParams = multipleDates.value.map(dateStr => new Date(dateStr))
      
    } else {
      // Process parameters with smart defaults for other functions
      processedParams = parameters.value
        .filter(p => p.trim() !== '')
        .map((param, index) => {
          // Smart parameter processing based on function and position
          if (param.toLowerCase() === 'new date()' || param === '') {
            return new Date()
          }
          
          // Try to parse as JSON first, then as string
          try {
            return JSON.parse(param)
          } catch {
            // Handle date strings and other special cases
            if (param.match(/^\d{4}-\d{2}-\d{2}/)) {
              return new Date(param)
            }
            // Handle numeric strings
            if (!isNaN(param) && !isNaN(parseFloat(param))) {
              return parseFloat(param)
            }
            return param
          }
        })

      // Add default parameters for common functions if none provided
      if (processedParams.length === 0) {
        if (props.function.name.includes('Date') || 
            props.function.name.includes('Weekend') || 
            props.function.name.includes('Business')) {
          processedParams.push(new Date())
        }
      }
    }

    const output = func(...processedParams)
    result.value = typeof output === 'object' ? JSON.stringify(output, null, 2) : String(output)
    
    // Add to recent results
    const call = `${props.function.name}(${processedParams.map(p => {
      if (p instanceof Date) return 'new Date()'
      return typeof p === 'string' ? `"${p}"` : p
    }).join(', ')})`
    
    addResult?.(call, result.value)
    
    // Track successful function execution
    const executionTime = performance.now() - startTime
    analytics.trackFunctionDemo(
      props.function.name,
      props.function.category || 'Unknown',
      processedParams.length > 0 ? { paramCount: processedParams.length } : {},
      result.value
    )
    analytics.trackPerformanceMetric('function_execution_time', Math.round(executionTime), 'ms')
    
  } catch (err) {
    error.value = err.message
    
    // Track function execution error
    const executionTime = performance.now() - startTime
    analytics.trackFunctionDemo(
      props.function.name,
      props.function.category || 'Unknown',
      processedParams?.length > 0 ? { paramCount: processedParams.length } : {},
      null,
      err
    )
    analytics.trackAPIError('function_execution', 'execution_error', err.message)
  }
}
</script>