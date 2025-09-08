<template>
  <div class="space-y-4">
    <div 
      v-for="func in functions" 
      :key="func.name" 
      :id="`demo-${func.name}`"
      class="border rounded-lg p-4 transition-all duration-300 scroll-mt-8"
    >
      <div class="flex items-center justify-between mb-2">
        <h4 class="font-semibold">{{ func.name }}</h4>
        <button 
          @click="executeDemo(func)"
          class="bg-indigo-600 text-white px-3 py-1 rounded text-sm hover:bg-indigo-700 transition"
        >
          Try it
        </button>
      </div>
      <p class="text-gray-600 text-sm mb-2">{{ func.description }}</p>
      <code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">{{ func.example }}</code>
      
      <!-- Dynamic controls based on function requirements -->
      <div class="mt-3 space-y-3">
        
        <!-- Time unit selection -->
        <div v-if="func.needsTimeUnit && functionSettings[func.name]" class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-medium text-gray-600 mb-1">{{ getAmountLabel(func) }}:</label>
            <input 
              v-model="functionSettings[func.name].amount"
              type="number"
              class="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div v-if="!func.unitType">
            <label class="block text-xs font-medium text-gray-600 mb-1">Unit:</label>
            <select 
              v-model="functionSettings[func.name].unit"
              class="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
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
          <div v-else class="flex items-end">
            <span class="text-xs text-gray-500">{{ getUnitLabel(func.unitType) }}</span>
          </div>
        </div>

        <!-- Custom function inputs -->
        <div v-else-if="func.needsCustom && func.name === 'getNthWeekdayOfMonth' && functionSettings[func.name]" class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-medium text-gray-600 mb-1">Year:</label>
            <input 
              v-model="functionSettings[func.name].numberInputs[0]"
              type="number"
              min="1900"
              max="2100"
              class="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-600 mb-1">Month (1-12):</label>
            <input 
              v-model="functionSettings[func.name].numberInputs[1]"
              type="number"
              min="1"
              max="12"
              class="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-600 mb-1">Nth occurrence:</label>
            <input 
              v-model="functionSettings[func.name].numberInputs[2]"
              type="number"
              min="1"
              max="5"
              class="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-600 mb-1">Weekday:</label>
            <select 
              v-model="functionSettings[func.name].numberInputs[3]"
              class="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="1">Monday</option>
              <option value="2">Tuesday</option>
              <option value="3">Wednesday</option>
              <option value="4">Thursday</option>
              <option value="5">Friday</option>
              <option value="6">Saturday</option>
              <option value="0">Sunday</option>
            </select>
          </div>
        </div>

        <!-- Single string input -->
        <div v-else-if="func.needsStringInput && functionSettings[func.name]">
          <label class="block text-xs font-medium text-gray-600 mb-1">Input:</label>
          <input 
            v-model="functionSettings[func.name].stringValue"
            type="text"
            :placeholder="getPlaceholderForFunction(func.name)"
            class="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <!-- Single number input -->
        <div v-else-if="func.needsNumberInput && functionSettings[func.name]">
          <label class="block text-xs font-medium text-gray-600 mb-1">{{ getNumberInputLabel(func.name) }}:</label>
          <input 
            v-model="functionSettings[func.name].numberValue"
            type="number"
            :placeholder="getNumberPlaceholder(func.name)"
            class="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <!-- Multiple number inputs -->
        <div v-else-if="func.needsMultiNumber && functionSettings[func.name]" class="space-y-2">
          <div v-for="(value, index) in functionSettings[func.name].numberInputs" :key="index">
            <label class="block text-xs font-medium text-gray-600 mb-1">
              {{ getMultiNumberLabel(func.name, index) }}:
            </label>
            <input 
              v-model="functionSettings[func.name].numberInputs[index]"
              type="number"
              class="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        <!-- Unit selection (for startOf, endOf, etc.) -->
        <div v-else-if="func.needsUnit && functionSettings[func.name]" class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-medium text-gray-600 mb-1">Date:</label>
            <input 
              v-model="functionSettings[func.name].dateValue"
              type="datetime-local"
              class="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-600 mb-1">Unit:</label>
            <select 
              v-model="functionSettings[func.name].unit"
              class="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
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

        <!-- Format input (for parseDate, formatDate) -->
        <div v-else-if="func.needsFormat && functionSettings[func.name]" class="space-y-2">
          <div v-if="func.needsDateInput">
            <label class="block text-xs font-medium text-gray-600 mb-1">Date:</label>
            <input 
              v-model="functionSettings[func.name].dateValue"
              type="datetime-local"
              class="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div v-if="func.needsStringInput">
            <label class="block text-xs font-medium text-gray-600 mb-1">{{ getStringInputLabel(func.name) }}:</label>
            <input 
              v-model="functionSettings[func.name].stringValue"
              type="text"
              :placeholder="getPlaceholderForFunction(func.name)"
              class="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-600 mb-1">Format:</label>
            <select 
              v-model="functionSettings[func.name].format"
              class="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="YYYY-MM-DD HH:mm:ss">YYYY-MM-DD HH:mm:ss</option>
              <option value="MMM DD, YYYY">MMM DD, YYYY</option>
            </select>
          </div>
        </div>

        <!-- No inputs needed (for utcNow, etc.) -->
        <div v-else-if="func.needsNothing" class="text-xs text-gray-500 italic">
          This function takes no parameters
        </div>

        <!-- Single date input -->
        <div v-else-if="func.needsDateInput && functionSettings[func.name]">
          <label class="block text-xs font-medium text-gray-600 mb-1">Date:</label>
          <input 
            v-model="functionSettings[func.name].dateValue"
            type="datetime-local"
            class="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <!-- Multiple date inputs -->
        <div v-else-if="func.needsDateInputs && functionSettings[func.name]" class="space-y-2">
          <div v-for="(dateInput, index) in functionSettings[func.name].dateInputs" :key="index">
            <label class="block text-xs font-medium text-gray-600 mb-1">
              {{ getDateInputLabel(func.name, index) }}:
            </label>
            <input 
              v-model="functionSettings[func.name].dateInputs[index]"
              type="datetime-local"
              class="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

      </div>
      
      <div v-if="results[func.name]" class="mt-3 p-3 bg-green-50 rounded">
        <strong class="text-green-800">Result:</strong>
        <span class="ml-2 text-green-700">{{ results[func.name] }}</span>
      </div>
      
      <div v-if="errors[func.name]" class="mt-3 p-3 bg-red-50 rounded">
        <strong class="text-red-800">Error:</strong>
        <span class="ml-2 text-red-700">{{ errors[func.name] }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useChronoUtilz } from '../composables/useChronoUtilz'

const props = defineProps({
  functions: Array
})

const { getLibrary } = useChronoUtilz()

const chronoUtilz = ref(null)
const results = ref({})
const errors = ref({})
const functionSettings = ref({})

onMounted(() => {
  chronoUtilz.value = getLibrary()
  // Initialize settings for all functions
  initializeFunctionSettings()
})

const initializeFunctionSettings = () => {
  props.functions.forEach(func => {
    if (func.needsCustom && func.name === 'getNthWeekdayOfMonth') {
      functionSettings.value[func.name] = { 
        numberInputs: [...func.needsMultiNumber] // [year, month, nth, weekday]
      }
      
    } else if (func.needsCustom && func.name === 'parseMultipleFormats') {
      functionSettings.value[func.name] = { 
        stringValue: '01/15/2024'
      }
      
    } else if (func.name === 'formatLocalized') {
      functionSettings.value[func.name] = { 
        dateValue: new Date().toISOString().slice(0, 16),
        stringValue: 'en-US'
      }
      
    } else if (func.name === 'formatRelativeLocalized') {
      const now = new Date().toISOString().slice(0, 16)
      const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 16)
      functionSettings.value[func.name] = { 
        dateInputs: [now, tomorrow],
        stringValue: 'en-US'
      }
      
    } else if (func.name === 'remainingTime') {
      const now = new Date().toISOString().slice(0, 16)
      const futureDate = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString().slice(0, 16) // 2 hours later
      functionSettings.value[func.name] = { 
        dateInputs: [futureDate, now] // target date, reference date
      }
      
    } else if (func.needsTimeUnit) {
      const amount = func.unitType === 'businessDays' ? 5 : func.unitType === 'workingHours' ? 8 : 7
      functionSettings.value[func.name] = { amount, unit: 'day' }
      
    } else if (func.needsMultiNumber) {
      functionSettings.value[func.name] = { 
        numberInputs: Array.isArray(func.needsMultiNumber) ? [...func.needsMultiNumber] : [0, 0, 0]
      }
      
    } else if (func.needsUnit) {
      functionSettings.value[func.name] = { 
        dateValue: new Date().toISOString().slice(0, 16),
        unit: 'day'
      }
      
    } else if (func.needsFormat) {
      const settings = { format: 'YYYY-MM-DD' }
      if (func.needsStringInput) {
        settings.stringValue = getDefaultStringValue(func.name)
      }
      if (func.needsDateInput) {
        settings.dateValue = new Date().toISOString().slice(0, 16)
      }
      functionSettings.value[func.name] = settings
      
    } else if (func.needsNothing) {
      functionSettings.value[func.name] = {}
      
    } else if (func.needsStringInput && func.needsDateInput) {
      functionSettings.value[func.name] = { 
        stringValue: getDefaultStringValue(func.name),
        dateValue: new Date().toISOString().slice(0, 16)
      }
      
    } else if (func.needsStringInput) {
      functionSettings.value[func.name] = { 
        stringValue: getDefaultStringValue(func.name)
      }
      
    } else if (func.needsNumberInput) {
      functionSettings.value[func.name] = { 
        numberValue: getDefaultNumberValue(func.name)
      }
      
    } else if (func.needsDateInput) {
      functionSettings.value[func.name] = { 
        dateValue: new Date().toISOString().slice(0, 16)
      }
      
    } else if (func.needsDateInputs) {
      const now = new Date().toISOString().slice(0, 16)
      const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 16)
      const dayAfter = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString().slice(0, 16)
      
      functionSettings.value[func.name] = {
        dateInputs: func.needsDateInputs === 2 ? [now, tomorrow] : [now, tomorrow, dayAfter]
      }
    }
  })
}

const getDefaultStringValue = (funcName) => {
  const defaults = {
    createDate: '2024-01-01',
    isValidDate: '2024-01-01',
    calculateAge: '1990-01-01',
    parseDate: '2024-01-01',
    getPayPeriods: 'biweekly',
    nextOccurrence: 'monday',
    previousOccurrence: 'friday',
    formatLocalized: 'en-US',
    formatRelativeLocalized: 'en-US',
    formatTimezone: 'America/New_York',
    parseISO: '2024-01-01T10:30:00Z',
    parseMultipleFormats: '01/15/2024',
    smartParse: 'January 15th, 2024',
    parseNaturalLanguage: 'next Monday',
    validateDateFormat: '2024-01-01'
  }
  return defaults[funcName] || ''
}

const getDefaultNumberValue = (funcName) => {
  const defaults = {
    isLeapYear: new Date().getFullYear(),
    formatDuration: 3661000, // 1 hour, 1 minute, 1 second in milliseconds
    fromTimestamp: Date.now(),
    getMonthsInQuarter: 1
  }
  return defaults[funcName] || 0
}

const getNumberInputLabel = (funcName) => {
  const labels = {
    isLeapYear: 'Year',
    formatDuration: 'Duration (milliseconds)',
    fromTimestamp: 'Timestamp',
    getMonthsInQuarter: 'Quarter (1-4)'
  }
  return labels[funcName] || 'Value'
}

const getNumberPlaceholder = (funcName) => {
  const placeholders = {
    isLeapYear: new Date().getFullYear().toString(),
    formatDuration: '3661000',
    fromTimestamp: Date.now().toString(),
    getMonthsInQuarter: '1'
  }
  return placeholders[funcName] || '0'
}

const getStringInputLabel = (funcName) => {
  const labels = {
    createDate: 'Date String',
    isValidDate: 'Date to Validate', 
    calculateAge: 'Birth Date',
    parseDate: 'Date String',
    getPayPeriods: 'Period Type',
    nextOccurrence: 'Weekday',
    previousOccurrence: 'Weekday'
  }
  return labels[funcName] || 'Input'
}

const getPlaceholderForFunction = (funcName) => {
  const placeholders = {
    createDate: 'YYYY-MM-DD or MM/DD/YYYY',
    isValidDate: 'Enter date to validate',
    calculateAge: 'YYYY-MM-DD birth date',
    parseDate: '2024-01-01',
    getPayPeriods: 'weekly, biweekly, monthly',
    nextOccurrence: 'monday, tuesday, etc.',
    previousOccurrence: 'friday, saturday, etc.'
  }
  return placeholders[funcName] || 'Enter value'
}

const getMultiNumberLabel = (funcName, index) => {
  const labels = {
    CalendarDate: ['Year', 'Month (1-12)', 'Day'],
    setTime: ['Hour (0-23)', 'Minute (0-59)', 'Second (0-59)'],
    getNthWeekdayOfMonth: ['Year', 'Month (1-12)', 'Nth occurrence', 'Weekday (0=Sunday)']
  }
  return labels[funcName]?.[index] || `Value ${index + 1}`
}

const getAmountLabel = (func) => {
  if (func.unitType === 'businessDays') return 'Business Days'
  if (func.unitType === 'workingHours') return 'Working Hours'
  return 'Amount'
}

const getUnitLabel = (unitType) => {
  const labels = {
    businessDays: 'business days',
    workingHours: 'working hours'
  }
  return labels[unitType] || 'units'
}

const getDateInputLabel = (funcName, index) => {
  const labels = {
    copyTime: ['Source Date', 'Target Date'],
    isAfter: ['First Date', 'Second Date'], 
    isBefore: ['First Date', 'Second Date'],
    compareDates: ['First Date', 'Second Date'],
    isBetweenDates: ['Check Date', 'Start Date', 'End Date']
  }
  return labels[funcName]?.[index] || `Date ${index + 1}`
}

const executeDemo = (func) => {
  if (!chronoUtilz.value) return

  // Clear previous results
  results.value[func.name] = null
  errors.value[func.name] = null

  try {
    const libraryFunc = chronoUtilz.value[func.name]
    if (!libraryFunc) {
      throw new Error(`Function ${func.name} not found`)
    }

    // Execute the function based on its requirements
    let result
    const settings = functionSettings.value[func.name]
    
    if (func.needsNothing) {
      // Functions like utcNow that take no parameters
      result = libraryFunc()
      
    } else if (func.needsCustom && func.name === 'getNthWeekdayOfMonth') {
      // Special handling for getNthWeekdayOfMonth
      result = libraryFunc(...settings.numberInputs)
      
    } else if (func.needsCustom && func.name === 'parseMultipleFormats') {
      // Special handling for parseMultipleFormats - needs date string and formats array
      const formats = ['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD', 'MM-DD-YYYY']
      result = libraryFunc(settings.stringValue || '01/15/2024', formats)
      
    } else if (func.name === 'formatLocalized') {
      // Special handling for formatLocalized - needs date, locale, and options
      const dateValue = settings.dateValue ? new Date(settings.dateValue) : new Date()
      const locale = settings.stringValue || 'en-US'
      result = libraryFunc(dateValue, locale, {})
      
    } else if (func.name === 'formatRelativeLocalized') {
      // Special handling for formatRelativeLocalized - needs date, locale, baseDate
      const dates = settings.dateInputs.map(dateStr => new Date(dateStr))
      const locale = settings.stringValue || 'en-US'
      result = libraryFunc(dates[0], locale, dates[1]) // date, locale, baseDate
      
    } else if (func.name === 'remainingTime') {
      // Special handling for remainingTime - needs target date, unit, reference date
      const dates = settings.dateInputs.map(dateStr => new Date(dateStr))
      result = libraryFunc(dates[0], 'hour', dates[1]) // target, unit (singular!), reference
      
    } else if (func.needsTimeUnit) {
      // Functions like addTime, subtractTime, addBusinessDays, addWorkingHours
      if (func.unitType === 'businessDays' || func.unitType === 'workingHours') {
        // Business day or working hour functions
        result = libraryFunc(new Date(), settings.amount)
      } else {
        // Regular time functions
        result = libraryFunc(new Date(), settings.amount, settings.unit)
      }
      
    } else if (func.needsMultiNumber) {
      // Functions like CalendarDate, setTime
      if (func.name === 'setTime') {
        const dateValue = settings.dateValue ? new Date(settings.dateValue) : new Date()
        result = libraryFunc(dateValue, ...settings.numberInputs)
      } else {
        result = libraryFunc(...settings.numberInputs)
      }
      
    } else if (func.needsUnit) {
      // Functions like startOf, endOf, truncateToUnit
      const dateValue = settings.dateValue ? new Date(settings.dateValue) : new Date()
      if (func.name === 'generateDateRange') {
        // Special case for generateDateRange which needs 2 dates + unit
        const endDate = new Date(dateValue.getTime() + 30 * 24 * 60 * 60 * 1000) // 30 days later
        result = libraryFunc(dateValue, endDate, settings.unit)
      } else if (func.name === 'getDateDiff') {
        // Special case for getDateDiff which needs 2 dates + unit
        const endDate = new Date(dateValue.getTime() + 30 * 24 * 60 * 60 * 1000)
        result = libraryFunc(dateValue, endDate, settings.unit)
      } else {
        result = libraryFunc(dateValue, settings.unit)
      }
      
    } else if (func.needsFormat) {
      // Functions like parseDate, formatDate
      if (func.needsStringInput && func.needsDateInput) {
        // Mixed functions
        const dateValue = settings.dateValue ? new Date(settings.dateValue) : new Date()
        result = libraryFunc(dateValue, settings.stringValue, settings.format)
      } else if (func.needsStringInput) {
        // parseDate
        result = libraryFunc(settings.stringValue, settings.format)
      } else if (func.needsDateInput) {
        // formatDate
        const dateValue = settings.dateValue ? new Date(settings.dateValue) : new Date()
        result = libraryFunc(dateValue, settings.format)
      }
      
    } else if (func.needsStringInput && func.needsDateInput) {
      // Functions that need both string and date
      const dateValue = settings.dateValue ? new Date(settings.dateValue) : new Date()
      result = libraryFunc(dateValue, settings.stringValue)
      
    } else if (func.needsStringInput) {
      // Functions like createDate, isValidDate, calculateAge
      result = libraryFunc(settings.stringValue)
      
    } else if (func.needsNumberInput) {
      // Functions like isLeapYear, formatDuration, fromTimestamp
      result = libraryFunc(settings.numberValue)
      
    } else if (func.needsDateInput) {
      // Functions like cloneDate, isWeekend, isWeekday
      const dateValue = settings.dateValue ? new Date(settings.dateValue) : new Date()
      result = libraryFunc(dateValue)
      
    } else if (func.needsDateInputs) {
      // Functions like isAfter, isBefore, compareDates, copyTime, isBetweenDates
      const dates = settings.dateInputs.map(dateStr => new Date(dateStr))
      result = libraryFunc(...dates)
      
    } else {
      // Default: try with current date
      result = libraryFunc(new Date())
    }

    results.value[func.name] = result
  } catch (error) {
    errors.value[func.name] = error.message
  }
}
</script>