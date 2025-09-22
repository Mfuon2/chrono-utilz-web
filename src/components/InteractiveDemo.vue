<template>
  <div class="w-full">
    <!-- Clear All Button -->
    <div class="flex justify-end mb-4" v-if="hasAnyResults">
      <button
        @click="clearAllResults"
        class="bg-gray-500 text-white px-4 py-2 rounded text-sm hover:bg-gray-600 transition flex items-center gap-2"
      >
        Clear All Results
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
      <div
        v-for="func in functions"
        :key="func.name"
        :id="`demo-${func.name}`"
        class="border rounded-lg p-4 transition-all duration-300 scroll-mt-8"
      >
      <div class="flex items-center justify-between mb-2">
        <h4 class="font-semibold">{{ func.name }}</h4>
        <div class="flex gap-2">
          <button
            @click="executeDemo(func)"
            class="bg-indigo-600 text-white px-3 py-1 rounded text-sm hover:bg-indigo-700 transition"
          >
            Try it
          </button>
          <button
            v-if="results[func.name] !== null && results[func.name] !== undefined || errors[func.name]"
            @click="clearResult(func.name)"
            class="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600 transition"
            title="Clear result"
          >
            ×
          </button>
        </div>
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

        <!-- Array-based date functions -->
        <div v-else-if="func.needsCustom && (func.name === 'minDate' || func.name === 'maxDate') && functionSettings[func.name]" class="space-y-2">
          <label class="block text-xs font-medium text-gray-600 mb-1">Date Array (finds {{ func.name === 'minDate' ? 'earliest' : 'latest' }} date):</label>
          <div v-for="(dateInput, index) in functionSettings[func.name].dateInputs" :key="index" class="space-y-1">
            <label class="block text-xs text-gray-500">Date {{ index + 1 }}:</label>
            <input
              v-model="functionSettings[func.name].dateInputs[index]"
              type="datetime-local"
              class="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        <!-- Find closest date function -->
        <div v-else-if="func.needsCustom && func.name === 'findClosestDate' && functionSettings[func.name]" class="space-y-2">
          <div>
            <label class="block text-xs font-medium text-gray-600 mb-1">Target Date:</label>
            <input
              v-model="functionSettings[func.name].targetDate"
              type="datetime-local"
              class="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <label class="block text-xs font-medium text-gray-600 mb-1">Date Array (finds closest to target):</label>
          <div v-for="(dateInput, index) in functionSettings[func.name].dateInputs" :key="index" class="space-y-1">
            <label class="block text-xs text-gray-500">Option {{ index + 1 }}:</label>
            <input
              v-model="functionSettings[func.name].dateInputs[index]"
              type="datetime-local"
              class="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        <!-- Benchmark function -->
        <div v-else-if="func.needsCustom && func.name === 'benchmark'" class="text-xs text-gray-500 italic">
          This function benchmarks a sample date operation (new Date().getTime() x1000)
        </div>

        <!-- Configure Working Days -->
        <div v-else-if="func.needsCustom && func.name === 'configureWorkingDays' && functionSettings[func.name]" class="space-y-2">
          <label class="block text-xs font-medium text-gray-600 mb-1">Working Days (1=Monday, 7=Sunday):</label>
          <div class="grid grid-cols-7 gap-1">
            <label v-for="day in 7" :key="day" class="flex items-center space-x-1">
              <input
                type="checkbox"
                :value="day"
                v-model="functionSettings[func.name].workingDays"
                class="rounded"
              />
              <span class="text-xs">{{ ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][day-1] }}</span>
            </label>
          </div>
        </div>

        <!-- Configure Holidays -->
        <div v-else-if="func.needsCustom && func.name === 'configureHolidays' && functionSettings[func.name]" class="space-y-2">
          <label class="block text-xs font-medium text-gray-600 mb-1">Holiday Dates:</label>
          <div v-for="(holiday, index) in functionSettings[func.name].holidays" :key="index" class="flex gap-2 items-center">
            <input
              v-model="functionSettings[func.name].holidays[index]"
              type="date"
              class="flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <button
              @click="removeHoliday(func.name, index)"
              class="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
            >
              ×
            </button>
          </div>
          <button
            @click="addHoliday(func.name)"
            class="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
          >
            + Add Holiday
          </button>
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

        <!-- Date input with number and unit (for getDateArray) -->
        <div v-else-if="func.needsDateInput && func.needsNumberInput && func.needsUnit && functionSettings[func.name]" class="space-y-2">
          <div>
            <label class="block text-xs font-medium text-gray-600 mb-1">Start Date:</label>
            <input
              v-model="functionSettings[func.name].dateValue"
              type="datetime-local"
              class="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-600 mb-1">Count:</label>
            <input
              v-model="functionSettings[func.name].numberValue"
              type="number"
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

        <!-- Date input with number (for getRetirementDate) -->
        <div v-else-if="func.needsDateInput && func.needsNumberInput && functionSettings[func.name]" class="space-y-2">
          <div>
            <label class="block text-xs font-medium text-gray-600 mb-1">{{ func.name === 'getRetirementDate' ? 'Birth Date' : 'Date' }}:</label>
            <input
              v-model="functionSettings[func.name].dateValue"
              type="datetime-local"
              class="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-600 mb-1">{{ func.name === 'getRetirementDate' ? 'Retirement Age' : 'Number' }}:</label>
            <input
              v-model="functionSettings[func.name].numberValue"
              type="number"
              class="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
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

        <!-- Date input with multiple numbers (for setTime) -->
        <div v-else-if="func.needsDateInput && func.needsMultiNumber && functionSettings[func.name]" class="space-y-2">
          <div>
            <label class="block text-xs font-medium text-gray-600 mb-1">Date:</label>
            <input
              v-model="functionSettings[func.name].dateValue"
              type="datetime-local"
              class="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
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

        <!-- Multiple date inputs with unit -->
        <div v-else-if="func.needsDateInputs && func.needsUnit && functionSettings[func.name]" class="space-y-2">
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
      
      <div v-if="results[func.name] !== null && results[func.name] !== undefined" class="mt-3 p-3 rounded" :class="getResultClasses(results[func.name])">
        <strong :class="getResultTextClasses(results[func.name])">Result:</strong>
        <span class="ml-2" :class="getResultValueClasses(results[func.name])">{{ formatResult(results[func.name]) }}</span>
      </div>
      
      <div v-if="errors[func.name]" class="mt-3 p-3 bg-red-50 rounded">
        <strong class="text-red-800">Error:</strong>
        <span class="ml-2 text-red-700">{{ errors[func.name] }}</span>
      </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
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

    } else if (func.needsCustom && (func.name === 'minDate' || func.name === 'maxDate' || func.name === 'sortDates' || func.name === 'removeDuplicateDates' || func.name === 'getEarliestDate' || func.name === 'getLatestDate')) {
      // Array-based date functions
      const now = new Date().toISOString().slice(0, 16)
      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().slice(0, 16)
      const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 16)
      functionSettings.value[func.name] = {
        dateInputs: [yesterday, now, tomorrow]
      }

    } else if (func.needsCustom && func.name === 'findClosestDate') {
      // Find closest date function needs a target date and array of dates
      const now = new Date().toISOString().slice(0, 16)
      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().slice(0, 16)
      const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 16)
      const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16)
      functionSettings.value[func.name] = {
        targetDate: now,
        dateInputs: [yesterday, tomorrow, nextWeek]
      }

    } else if (func.needsCustom && func.name === 'benchmark') {
      // Benchmark function needs no parameters
      functionSettings.value[func.name] = {}

    } else if (func.needsCustom && func.name === 'configureWorkingDays') {
      // Working days configuration - array of working days (1=Mon, 7=Sun)
      functionSettings.value[func.name] = {
        workingDays: [1, 2, 3, 4, 5] // Default: Monday to Friday
      }

    } else if (func.needsCustom && func.name === 'configureHolidays') {
      // Holiday configuration - array of holiday dates
      functionSettings.value[func.name] = {
        holidays: ['2024-12-25', '2024-01-01'] // Default: Christmas and New Year
      }
      
    } else if (func.needsTimeUnit) {
      const amount = func.unitType === 'businessDays' ? 5 : func.unitType === 'workingHours' ? 8 : 7
      functionSettings.value[func.name] = { amount, unit: 'day' }
      
    } else if (func.needsMultiNumber) {
      functionSettings.value[func.name] = {
        numberInputs: Array.isArray(func.needsMultiNumber) ? [...func.needsMultiNumber] : [0, 0, 0]
      }

    } else if (func.needsDateInput && func.needsMultiNumber) {
      // Functions that need both date and multiple numbers (like setTime)
      functionSettings.value[func.name] = {
        dateValue: new Date().toISOString().slice(0, 16),
        numberInputs: Array.isArray(func.needsMultiNumber) ? [...func.needsMultiNumber] : [12, 30, 0]
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
        stringValue: func.defaultStringValue || getDefaultStringValue(func.name),
        dateValue: new Date().toISOString().slice(0, 16)
      }

    } else if (func.needsDateInput && func.needsNumberInput && func.needsUnit) {
      // Functions like getDateArray that need date, number, and unit
      functionSettings.value[func.name] = {
        dateValue: new Date().toISOString().slice(0, 16),
        numberValue: func.defaultNumberValue || 5,
        unit: 'day'
      }

    } else if (func.needsDateInput && func.needsNumberInput) {
      // Functions like getRetirementDate that need date and number
      functionSettings.value[func.name] = {
        dateValue: new Date().toISOString().slice(0, 16),
        numberValue: func.defaultNumberValue || 65
      }

    } else if (func.needsStringInput) {
      functionSettings.value[func.name] = {
        stringValue: func.defaultStringValue || getDefaultStringValue(func.name)
      }

    } else if (func.needsNumberInput) {
      functionSettings.value[func.name] = {
        numberValue: func.defaultNumberValue || getDefaultNumberValue(func.name)
      }
      
    } else if (func.needsDateInput) {
      functionSettings.value[func.name] = { 
        dateValue: new Date().toISOString().slice(0, 16)
      }
      
    } else if (func.needsDateInputs && func.needsUnit) {
      // Functions like generateDateRange that need multiple dates and unit
      const now = new Date().toISOString().slice(0, 16)
      const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 16)
      const dayAfter = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString().slice(0, 16)

      functionSettings.value[func.name] = {
        dateInputs: func.needsDateInputs === 2 ? [now, tomorrow] : [now, tomorrow, dayAfter],
        unit: 'day'
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
    smartParse: '2024-01-15',
    parseNaturalLanguage: 'next Monday',
    validateDateFormat: '2024-01-01',
    // Timezone functions
    convertTimezone: 'America/New_York',
    getTimezoneOffset: 'America/Chicago',
    getTimezoneInfo: 'Australia/Sydney',
    getTimezonesByRegion: 'America',
    searchTimezones: 'New_York',
    configureTimezone: 'America/New_York',
    getTimezoneString: 'Asia/Tokyo',
    formatCustom: 'YYYY-MM-DD HH:mm',
    formatDate: 'MM/DD/YYYY',
    // Validation functions
    isValidDate: '2024-01-01'
  }
  return defaults[funcName] || ''
}

const getDefaultNumberValue = (funcName) => {
  const defaults = {
    isLeapYear: new Date().getFullYear(),
    formatDuration: 3661000, // 1 hour, 1 minute, 1 second in milliseconds
    humanizeDuration: 3661000, // 1 hour, 1 minute, 1 second in milliseconds
    fromTimestamp: Date.now(),
    getMonthsInQuarter: 1,
    // Timezone functions
    getTimezonesByOffset: -5,
    // Validation functions
    isLeapYear: 2024
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
    compareDetailed: ['First Date', 'Second Date'],
    isBetweenDates: ['Check Date', 'Start Date', 'End Date'],
    isWithinRange: ['Check Date', 'Start Date', 'End Date'],
    isSameDay: ['First Date', 'Second Date'],
    isSameWeek: ['First Date', 'Second Date'],
    isSameMonth: ['First Date', 'Second Date'],
    isSameYear: ['First Date', 'Second Date'],
    isValidRange: ['Start Date', 'End Date']
  }
  return labels[funcName]?.[index] || `Date ${index + 1}`
}

const getResultClasses = (result) => {
  if (typeof result === 'boolean') {
    return result ? 'bg-green-50 border border-green-200' : 'bg-orange-50 border border-orange-200'
  }
  return 'bg-blue-50 border border-blue-200'
}

const getResultTextClasses = (result) => {
  if (typeof result === 'boolean') {
    return result ? 'text-green-800' : 'text-orange-800'
  }
  return 'text-blue-800'
}

const getResultValueClasses = (result) => {
  if (typeof result === 'boolean') {
    return result ? 'text-green-700 font-semibold' : 'text-orange-700 font-semibold'
  }
  return 'text-blue-700'
}

const formatResult = (result) => {
  if (typeof result === 'boolean') {
    return result ? '✓ true' : '✗ false'
  }
  if (result instanceof Date) {
    return result.toLocaleString()
  }
  if (Array.isArray(result)) {
    return JSON.stringify(result, null, 2)
  }
  if (typeof result === 'object' && result !== null) {
    return JSON.stringify(result, null, 2)
  }
  return String(result)
}

const getMissingFunctionFallback = (funcName) => {
  // Provide fallback implementations for missing functions
  const fallbacks = {
    // Age functions - use calculateAge as base
    getAgeInYears: (birthDate) => {
      try {
        // Handle datetime-local input format (YYYY-MM-DDTHH:mm)
        let dateString = birthDate
        if (birthDate instanceof Date) {
          dateString = birthDate.toISOString().split('T')[0]
        } else if (typeof birthDate === 'string' && birthDate.includes('T')) {
          dateString = birthDate.split('T')[0]
        }

        // calculateAge returns a simple number (years)
        return chronoUtilz.value.calculateAge(dateString) || 0
      } catch (error) {
        // Fallback calculation
        const birth = new Date(birthDate)
        const now = new Date()
        return Math.floor((now - birth) / (365.25 * 24 * 60 * 60 * 1000))
      }
    },
    getAgeInMonths: (birthDate) => {
      try {
        // Handle datetime-local input format
        let dateString = birthDate
        if (birthDate instanceof Date) {
          dateString = birthDate.toISOString().split('T')[0]
        } else if (typeof birthDate === 'string' && birthDate.includes('T')) {
          dateString = birthDate.split('T')[0]
        }

        // calculateAge returns years, so multiply by 12 for approximate months
        const ageInYears = chronoUtilz.value.calculateAge(dateString) || 0
        const birth = new Date(dateString)
        const now = new Date()

        // More accurate month calculation
        let months = (now.getFullYear() - birth.getFullYear()) * 12
        months += now.getMonth() - birth.getMonth()
        if (now.getDate() < birth.getDate()) {
          months--
        }
        return months
      } catch (error) {
        // Fallback calculation
        const birth = new Date(birthDate)
        const now = new Date()
        const diffInMs = now - birth
        return Math.floor(diffInMs / (30.44 * 24 * 60 * 60 * 1000)) // Average month length
      }
    },
    getAgeInDays: (birthDate) => {
      const birth = new Date(birthDate)
      const now = new Date()
      return Math.floor((now - birth) / (24 * 60 * 60 * 1000))
    },
    getBirthYear: (age) => new Date().getFullYear() - age,
    getRetirementDate: (birthDate, retirementAge = 65) => {
      const birth = new Date(birthDate)
      return new Date(birth.getFullYear() + retirementAge, birth.getMonth(), birth.getDate())
    },

    // Time difference functions - use getDateDiff as base, return absolute values
    daysBetween: (date1, date2) => Math.abs(chronoUtilz.value.getDateDiff(date1, date2, 'day')),
    weeksBetween: (date1, date2) => Math.abs(chronoUtilz.value.getDateDiff(date1, date2, 'week')),
    monthsBetween: (date1, date2) => Math.abs(chronoUtilz.value.getDateDiff(date1, date2, 'month')),
    yearsBetween: (date1, date2) => Math.abs(chronoUtilz.value.getDateDiff(date1, date2, 'year')),
    hoursBetween: (date1, date2) => Math.abs(chronoUtilz.value.getDateDiff(date1, date2, 'hour')),
    minutesBetween: (date1, date2) => Math.abs(chronoUtilz.value.getDateDiff(date1, date2, 'minute')),
    secondsBetween: (date1, date2) => Math.abs(chronoUtilz.value.getDateDiff(date1, date2, 'second')),

    // Date operations using addTime/subtractTime
    addDays: (date, days) => chronoUtilz.value.addTime(date, days, 'day'),
    subtractDays: (date, days) => chronoUtilz.value.subtractTime(date, days, 'day'),

    // Date array generation
    getDateArray: (startDate, count, unit) => {
      const dates = []
      const numCount = parseInt(count) || 0

      for (let i = 0; i < numCount; i++) {
        const newDate = chronoUtilz.value.addTime(startDate, i, unit)
        dates.push(newDate)
      }

      return dates
    },
    getDatesBetween: (startDate, endDate) => {
      return chronoUtilz.value.generateDateRange({
        start: startDate,
        end: endDate,
        unit: 'day'
      })
    },

    // Month/Year ranges
    generateMonthRange: (year, startMonth, endMonth) => {
      const months = []
      for (let month = startMonth; month <= endMonth; month++) {
        months.push(new Date(year, month - 1, 1))
      }
      return months
    },
    generateYearRange: (startYear, endYear) => {
      const years = []
      for (let year = startYear; year <= endYear; year++) {
        years.push(year)
      }
      return years
    },

    // Timestamp operations
    getUnixTimestamp: (date) => Math.floor(chronoUtilz.value.getTimestamp(date) / 1000),
    fromUnixTimestamp: (timestamp) => chronoUtilz.value.fromTimestamp(timestamp * 1000),
    timestampToDate: (timestamp) => chronoUtilz.value.fromTimestamp(timestamp),
    dateToTimestamp: (date) => chronoUtilz.value.getTimestamp(date),

    // Date component functions
    getFirstDayOfMonth: (date) => new Date(date.getFullYear(), date.getMonth(), 1),
    getLastDayOfMonth: (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0),
    getDayOfWeek: (date) => date.getDay(),

    // Next/Previous weekday
    getNextWeekday: (date, weekday) => {
      const result = new Date(date)
      const currentDay = result.getDay()
      const daysUntilTarget = (weekday - currentDay + 7) % 7
      result.setDate(result.getDate() + (daysUntilTarget || 7))
      return result
    },
    getPreviousWeekday: (date, weekday) => {
      const result = new Date(date)
      const currentDay = result.getDay()
      const daysSinceTarget = (currentDay - weekday + 7) % 7
      result.setDate(result.getDate() - (daysSinceTarget || 7))
      return result
    },

    // Utility functions
    benchmark: () => {
      // Benchmark a simple date operation for demonstration
      const start = performance.now()

      // Run a sample operation multiple times
      for (let i = 0; i < 1000; i++) {
        new Date().getTime()
      }

      const end = performance.now()
      return {
        operation: 'new Date().getTime() x1000',
        executionTime: `${(end - start).toFixed(3)}ms`,
        iterations: 1000
      }
    }
  }

  return fallbacks[funcName] || null
}

const hasAnyResults = computed(() => {
  return Object.keys(results.value).some(key =>
    results.value[key] !== null && results.value[key] !== undefined
  ) || Object.keys(errors.value).some(key =>
    errors.value[key] !== null && errors.value[key] !== undefined
  )
})

const clearResult = (funcName) => {
  results.value[funcName] = null
  errors.value[funcName] = null
}

const clearAllResults = () => {
  results.value = {}
  errors.value = {}
}

const addHoliday = (funcName) => {
  if (!functionSettings.value[funcName].holidays) {
    functionSettings.value[funcName].holidays = []
  }
  functionSettings.value[funcName].holidays.push('2024-12-25')
}

const removeHoliday = (funcName, index) => {
  functionSettings.value[funcName].holidays.splice(index, 1)
}

const executeDemo = (func) => {
  if (!chronoUtilz.value) return

  // Clear previous results
  results.value[func.name] = null
  errors.value[func.name] = null

  try {
    let libraryFunc = chronoUtilz.value[func.name]

    // Handle missing functions with fallback implementations
    if (!libraryFunc) {
      libraryFunc = getMissingFunctionFallback(func.name)
      if (!libraryFunc) {
        throw new Error(`Function ${func.name} not found in library`)
      }
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

    } else if (func.needsCustom && (func.name === 'minDate' || func.name === 'maxDate')) {
      // Array-based date functions - pass individual dates using spread operator
      const dates = settings.dateInputs.map(dateStr => new Date(dateStr))
      result = libraryFunc(...dates)

    } else if (func.needsCustom && (func.name === 'sortDates' || func.name === 'removeDuplicateDates' || func.name === 'getEarliestDate' || func.name === 'getLatestDate')) {
      // Array-based utility functions - pass array of dates
      const dates = settings.dateInputs.map(dateStr => new Date(dateStr))
      result = libraryFunc(dates)

    } else if (func.needsCustom && func.name === 'findClosestDate') {
      // Find closest date function - needs target date and array of dates
      const targetDate = new Date(settings.targetDate)
      const dates = settings.dateInputs.map(dateStr => new Date(dateStr))
      result = libraryFunc(targetDate, dates)

    } else if (func.needsCustom && func.name === 'benchmark') {
      // Benchmark function - no parameters needed
      result = libraryFunc()

    } else if (func.needsCustom && func.name === 'configureWorkingDays') {
      // Configure working days - pass array of working days
      result = libraryFunc(settings.workingDays)

    } else if (func.needsCustom && func.name === 'configureHolidays') {
      // Configure holidays - convert date strings to Date objects
      const holidayDates = settings.holidays.map(dateStr => new Date(dateStr))
      result = libraryFunc(holidayDates)

    } else if (func.name === 'generateRecurringDates') {
      // Special handling for generateRecurringDates
      const dates = settings.dateInputs.map(dateStr => new Date(dateStr))
      result = libraryFunc(dates[0], dates[1], 'weekly')
      
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

    } else if (func.needsDateInput && func.needsMultiNumber) {
      // Functions that need a date input and multiple numbers (like setTime)
      const dateValue = settings.dateValue ? new Date(settings.dateValue) : new Date()
      result = libraryFunc(dateValue, ...settings.numberInputs)
      
    } else if (func.needsUnit) {
      // Functions like startOf, endOf, truncateToUnit
      const dateValue = settings.dateValue ? new Date(settings.dateValue) : new Date()
      if (func.name === 'generateDateRange') {
        // Special case for generateDateRange which needs options object
        const endDate = new Date(dateValue.getTime() + 30 * 24 * 60 * 60 * 1000) // 30 days later
        result = libraryFunc({
          start: dateValue,
          end: endDate,
          unit: settings.unit
        })
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

    } else if (func.needsDateInput && func.needsNumberInput && func.needsUnit) {
      // Functions like getDateArray that need date, number, and unit
      const dateValue = settings.dateValue ? new Date(settings.dateValue) : new Date()
      const numberValue = parseInt(settings.numberValue) || 0
      result = libraryFunc(dateValue, numberValue, settings.unit)

    } else if (func.needsDateInput && func.needsNumberInput) {
      // Functions like getRetirementDate that need date and number
      const dateValue = settings.dateValue ? new Date(settings.dateValue) : new Date()
      result = libraryFunc(dateValue, settings.numberValue)
      
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
      
    } else if (func.needsDateInputs && func.needsUnit) {
      // Functions like generateDateRange and getDateDiff that need multiple dates and unit
      const dates = settings.dateInputs.map(dateStr => new Date(dateStr))
      if (func.name === 'generateDateRange') {
        result = libraryFunc({
          start: dates[0],
          end: dates[1],
          unit: settings.unit
        })
      } else if (func.name === 'getDateDiff') {
        // getDateDiff takes (date1, date2, unit)
        result = libraryFunc(dates[0], dates[1], settings.unit)
      } else {
        result = libraryFunc(...dates, settings.unit)
      }

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