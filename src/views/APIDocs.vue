<template>
  <div class="api-docs-container">
    <!-- Header -->
    <div class="api-header bg-white shadow-sm py-6">
      <div class="container mx-auto px-4">
        <h1 class="text-3xl font-bold text-gray-900">API Documentation</h1>
        <p class="text-gray-600 mt-2">Detailed reference for all ChronoUtilz functions, parameters, types, and units.</p>
      </div>
    </div>

    <div class="container mx-auto px-4 py-8 flex flex-col md:flex-row">
      <!-- Sidebar Navigation -->
      <div class="w-full md:w-1/4 lg:w-1/5 pr-0 md:pr-8 mb-6 md:mb-0">
        <div class="bg-white rounded-lg shadow-sm p-4 sticky top-4">
          <!-- Search Box -->
          <div class="mb-6">
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Search API docs..." 
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <!-- Navigation -->
          <nav>
            <ul class="space-y-1">
              <li v-for="category in filteredCategories" :key="category.id">
                <div class="flex items-center">
                  <a 
                    href="#" 
                    @click.prevent="setCurrentCategory(category.id)"
                    :class="[
                      'flex-1 px-4 py-2 rounded-lg transition-colors',
                      currentCategory === category.id 
                        ? 'bg-blue-100 text-blue-700 font-medium' 
                        : 'text-gray-700 hover:bg-gray-100'
                    ]"
                  >
                    {{ category.name }}
                  </a>
                  <button
                    @click.prevent="toggleCategoryExpansion(category.id)"
                    class="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                    :class="{ 'text-blue-600': expandedCategories.has(category.id) }"
                  >
                    <svg 
                      class="w-4 h-4 transition-transform"
                      :class="{ 'rotate-90': expandedCategories.has(category.id) }"
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </button>
                </div>
                
                <!-- Sub-items -->
                <ul 
                  v-if="expandedCategories.has(category.id)" 
                  class="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 pl-4"
                >
                  <li v-for="item in category.items" :key="item.id">
                    <a 
                      href="#" 
                      @click.prevent="scrollToSection(item.id)"
                      class="block px-4 py-2 text-sm rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                    >
                      {{ item.name }}
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <!-- Main Content -->
      <div class="w-full md:w-3/4 lg:w-4/5">
        <div class="bg-white rounded-lg shadow-sm p-6">
          <!-- Introduction -->
          <section id="introduction" class="mb-12">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">API Reference Overview</h2>
            <p class="text-gray-700 mb-4">
              This comprehensive API documentation provides detailed information about all ChronoUtilz functions, 
              including parameters, return types, and usage examples. Each function is categorized according to 
              the Three Pillars Architecture.
            </p>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div class="border border-gray-200 rounded-lg p-4">
                <h3 class="font-semibold text-lg mb-2">45+ Core Operations</h3>
                <p class="text-gray-600 text-sm">Date manipulation & comparison functions</p>
              </div>
              <div class="border border-gray-200 rounded-lg p-4">
                <h3 class="font-semibold text-lg mb-2">55+ Business Utilities</h3>
                <p class="text-gray-600 text-sm">Real-world business logic functions</p>
              </div>
              <div class="border border-gray-200 rounded-lg p-4">
                <h3 class="font-semibold text-lg mb-2">35+ Formatting & Parsing</h3>
                <p class="text-gray-600 text-sm">Advanced presentation functions</p>
              </div>
            </div>
          </section>

          <!-- Type Definitions -->
          <section id="types" class="mb-12">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Type Definitions</h2>
            
            <div class="mb-8">
              <h3 class="text-xl font-semibold text-gray-900 mb-4">DateFormat</h3>
              <p class="text-gray-700 mb-4">Supported date format patterns:</p>
              <div class="bg-gray-50 rounded-lg p-4">
                <pre class="text-sm"><code>'YYYY-MM-DD' | 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD HH:mm:ss' | 'DD MMM YYYY' | 'MMM DD, YYYY' | 'HH:mm:ss' | 'hh:mm A'</code></pre>
              </div>
            </div>
            
            <div class="mb-8">
              <h3 class="text-xl font-semibold text-gray-900 mb-4">TimeUnit</h3>
              <p class="text-gray-700 mb-4">Units of time for duration calculations:</p>
              <div class="bg-gray-50 rounded-lg p-4">
                <pre class="text-sm"><code>'millisecond' | 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year'</code></pre>
              </div>
            </div>
            
            <div class="mb-8">
              <h3 class="text-xl font-semibold text-gray-900 mb-4">IANATimezone</h3>
              <p class="text-gray-700 mb-4">IANA Timezone identifiers - Complete standardized list:</p>
              <div class="bg-gray-50 rounded-lg p-4">
                <pre class="text-sm"><code>// Examples of valid IANA timezone identifiers
'America/New_York' | 'Europe/London' | 'Asia/Tokyo' | 'Australia/Sydney' | 'UTC' | ...</code></pre>
              </div>
            </div>
          </section>

          <!-- Categories Content -->
          <div v-for="category in categories" :key="category.id">
            <section 
              :id="category.id" 
              class="mb-12"
              :class="{ 'hidden': currentCategory !== category.id }"
            >
              <h2 class="text-2xl font-bold text-gray-900 mb-6">{{ category.name }}</h2>
              
              <div v-for="item in category.items" :key="item.id" class="mb-10">
                <div :id="item.id" class="border-b border-gray-200 pb-4 mb-6">
                  <h3 class="text-xl font-semibold text-gray-900">{{ item.name }}</h3>
                  <p class="text-gray-600 mt-2">{{ item.description }}</p>
                </div>
                
                <div class="bg-gray-50 rounded-lg p-4 mb-4">
                  <h4 class="font-medium text-gray-900 mb-2">Signature</h4>
                  <pre class="bg-gray-900 text-green-200 p-4 rounded-lg overflow-x-auto font-mono">
                    <code>{{ item.signature }}</code>
                  </pre>
                </div>
                
                <div v-if="item.parameters && item.parameters.length > 0" class="mb-4">
                  <h4 class="font-medium text-gray-900 mb-2">Parameters</h4>
                  <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                      <thead class="bg-gray-100">
                        <tr>
                          <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                          <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                          <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Required</th>
                          <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        </tr>
                      </thead>
                      <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="param in item.parameters" :key="param.name">
                          <td class="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{{ param.name }}</td>
                          <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                            <span class="font-mono">{{ param.type }}</span>
                          </td>
                          <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                            <span :class="param.required ? 'text-red-600' : 'text-green-600'">
                              {{ param.required ? 'Yes' : 'No' }}
                            </span>
                          </td>
                          <td class="px-4 py-2 text-sm text-gray-500">{{ param.description }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div v-if="item.returns" class="mb-4">
                  <h4 class="font-medium text-gray-900 mb-2">Returns</h4>
                  <div class="bg-gray-50 rounded-lg p-4">
                    <p class="text-gray-700">
                      <span class="font-semibold">Type:</span> 
                      <span class="font-mono">{{ item.returns.type }}</span>
                    </p>
                    <p class="text-gray-700 mt-2">{{ item.returns.description }}</p>
                  </div>
                </div>
                
                <div v-if="item.exceptions && item.exceptions.length > 0" class="mb-4">
                  <h4 class="font-medium text-gray-900 mb-2">Exceptions</h4>
                  <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                      <thead class="bg-gray-100">
                        <tr>
                          <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exception</th>
                          <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Condition</th>
                        </tr>
                      </thead>
                      <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="exception in item.exceptions" :key="exception.type">
                          <td class="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                            <span class="font-mono">{{ exception.type }}</span>
                          </td>
                          <td class="px-4 py-2 text-sm text-gray-500">{{ exception.condition }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div v-if="item.example" class="bg-blue-50 rounded-lg p-4">
                  <h4 class="font-medium text-gray-900 mb-2">Example</h4>
                  <pre class="bg-gray-900 text-green-200 p-4 rounded-lg overflow-x-auto font-mono">
                    <code>{{ item.example }}</code>
                  </pre>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Current active category
const currentCategory = ref('core')

// Search query
const searchQuery = ref('')

// Expanded categories for dropdown
const expandedCategories = ref(new Set(['core'])) // Default to core expanded

// Toggle category expansion
const toggleCategoryExpansion = (categoryId) => {
  if (expandedCategories.value.has(categoryId)) {
    expandedCategories.value.delete(categoryId)
  } else {
    expandedCategories.value.add(categoryId)
  }
}

// Set current category
const setCurrentCategory = (categoryId) => {
  currentCategory.value = categoryId
  // Expand the category when selected
  expandedCategories.value.add(categoryId)
}

// Scroll to section
const scrollToSection = (sectionId) => {
  // Find which category this section belongs to
  const targetCategory = categories.value.find(category => 
    category.items.some(item => item.id === sectionId)
  )
  
  // Switch to the correct category first
  if (targetCategory && currentCategory.value !== targetCategory.id) {
    setCurrentCategory(targetCategory.id)
  }
  
  // Small delay to ensure DOM is updated after category switch
  setTimeout(() => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, 100)
}

// Categories data
const categories = ref([
  {
    id: 'core',
    name: 'Core Operations',
    items: [
      {
        id: 'parseDate',
        name: 'parseDate',
        description: 'Safely parses a date string or timestamp into a Date object',
        signature: 'parseDate(input: string | number | Date, options?: DateParseOptions): Date | null',
        parameters: [
          { 
            name: 'input', 
            type: 'string | number | Date', 
            required: true,
            description: 'The input to parse as a date. Can be a date string, timestamp number, or Date object.' 
          },
          { 
            name: 'options', 
            type: 'DateParseOptions', 
            required: false,
            description: 'Optional parsing options to control behavior when parsing fails.' 
          }
        ],
        returns: {
          type: 'Date | null',
          description: 'A Date object if parsing succeeds, or null if parsing fails and throwError is false in options.'
        },
        exceptions: [
          {
            type: 'ChronoUtilzError',
            condition: 'Thrown when the date is invalid and throwError is true in options.'
          }
        ],
        example: `// Parse a date string
const date = parseDate('2025-01-15');

// Parse with options
const date = parseDate('invalid-date', { 
  throwError: false, 
  fallback: new Date() 
});`
      },
      {
        id: 'formatDate',
        name: 'formatDate',
        description: 'Formats a date according to the specified format pattern',
        signature: 'formatDate(date: Date | string | number, format?: DateFormat, timezone?: IANATimezone): string',
        parameters: [
          { 
            name: 'date', 
            type: 'Date | string | number', 
            required: true,
            description: 'The date to format. Can be a Date object, date string, or timestamp number.' 
          },
          { 
            name: 'format', 
            type: 'DateFormat', 
            required: false,
            description: 'The format pattern to use. Defaults to a standard format if not provided.' 
          },
          { 
            name: 'timezone', 
            type: 'IANATimezone', 
            required: false,
            description: 'Optional timezone identifier for timezone-aware formatting.' 
          }
        ],
        returns: {
          type: 'string',
          description: 'Formatted date string according to the specified format and timezone.'
        },
        example: `// Format a date
const formatted = formatDate(new Date(), 'YYYY-MM-DD');

// Format with timezone
const formatted = formatDate(new Date(), 'MMM DD, YYYY HH:mm:ss', 'America/New_York');`
      },
      {
        id: 'addTime',
        name: 'addTime',
        description: 'Adds the specified amount of time to a date',
        signature: 'addTime(date: Date | string | number, amount: number, unit: TimeUnit, timezone?: IANATimezone): Date',
        parameters: [
          { 
            name: 'date', 
            type: 'Date | string | number', 
            required: true,
            description: 'The base date to which time will be added.' 
          },
          { 
            name: 'amount', 
            type: 'number', 
            required: true,
            description: 'The amount of time to add. Can be positive or negative.' 
          },
          { 
            name: 'unit', 
            type: 'TimeUnit', 
            required: true,
            description: 'The time unit for the amount (e.g., \'day\', \'hour\', \'minute\').' 
          },
          { 
            name: 'timezone', 
            type: 'IANATimezone', 
            required: false,
            description: 'Optional timezone for timezone-aware calculations.' 
          }
        ],
        returns: {
          type: 'Date',
          description: 'A new Date object with the specified time added.'
        },
        example: `// Add 5 days to a date
const newDate = addTime(new Date(), 5, 'day');

// Add 2 hours in a specific timezone
const newDate = addTime(new Date(), 2, 'hour', 'Europe/London');`
      },
      {
        id: 'subtractTime',
        name: 'subtractTime',
        description: 'Subtracts time from a date',
        signature: 'subtractTime(date: Date | string | number, amount: number, unit: TimeUnit, timezone?: IANATimezone): Date',
        parameters: [
          { name: 'date', type: 'Date | string | number', required: true, description: 'The base date' },
          { name: 'amount', type: 'number', required: true, description: 'The amount to subtract' },
          { name: 'unit', type: 'TimeUnit', required: true, description: 'The time unit' },
          { name: 'timezone', type: 'IANATimezone', required: false, description: 'Optional timezone' }
        ],
        returns: { type: 'Date', description: 'A new Date with the subtracted time' },
        example: `// Subtract 3 months
const newDate = subtractTime(new Date(), 3, 'month');`
      },
      {
        id: 'getDateDiff',
        name: 'getDateDiff',
        description: 'Gets the difference between two dates in the specified unit',
        signature: 'getDateDiff(date1: Date | string | number, date2: Date | string | number, unit: TimeUnit, timezone?: IANATimezone): number',
        parameters: [
          { name: 'date1', type: 'Date | string | number', required: true, description: 'The first date' },
          { name: 'date2', type: 'Date | string | number', required: true, description: 'The second date' },
          { name: 'unit', type: 'TimeUnit', required: true, description: 'The time unit' },
          { name: 'timezone', type: 'IANATimezone', required: false, description: 'Optional timezone' }
        ],
        returns: { type: 'number', description: 'The difference in the specified unit' },
        example: `// Get difference in days
const diff = getDateDiff(new Date('2025-01-15'), new Date('2025-01-20'), 'day');`
      },
      {
        id: 'startOf',
        name: 'startOf',
        description: 'Returns the start of a time period',
        signature: 'startOf(date: Date | string | number, unit: TimeUnit, timezone?: IANATimezone): Date',
        parameters: [
          { name: 'date', type: 'Date | string | number', required: true, description: 'The input date' },
          { name: 'unit', type: 'TimeUnit', required: true, description: 'The time unit to get start of' },
          { name: 'timezone', type: 'IANATimezone', required: false, description: 'Optional timezone' }
        ],
        returns: { type: 'Date', description: 'A new Date at the start of the specified unit' },
        example: `const startOfDay = startOf(new Date(), 'day');`
      },
      {
        id: 'endOf',
        name: 'endOf',
        description: 'Returns the end of a time period',
        signature: 'endOf(date: Date | string | number, unit: TimeUnit, timezone?: IANATimezone): Date',
        parameters: [
          { name: 'date', type: 'Date | string | number', required: true, description: 'The input date' },
          { name: 'unit', type: 'TimeUnit', required: true, description: 'The time unit to get end of' },
          { name: 'timezone', type: 'IANATimezone', required: false, description: 'Optional timezone' }
        ],
        returns: { type: 'Date', description: 'A new Date at the end of the specified unit' },
        example: `const endOfDay = endOf(new Date(), 'day');`
      },
      {
        id: 'createDate',
        name: 'createDate',
        description: 'Creates a new Date with specified components',
        signature: 'createDate(year: number, month: number, day: number, hour?: number, minute?: number, second?: number, millisecond?: number, timezone?: IANATimezone): Date',
        parameters: [
          { name: 'year', type: 'number', required: true, description: 'The year' },
          { name: 'month', type: 'number', required: true, description: 'The month (1-12)' },
          { name: 'day', type: 'number', required: true, description: 'The day of month' },
          { name: 'hour', type: 'number', required: false, description: 'The hour (0-23)' },
          { name: 'minute', type: 'number', required: false, description: 'The minute (0-59)' },
          { name: 'second', type: 'number', required: false, description: 'The second (0-59)' },
          { name: 'millisecond', type: 'number', required: false, description: 'The millisecond (0-999)' },
          { name: 'timezone', type: 'IANATimezone', required: false, description: 'Optional timezone' }
        ],
        returns: { type: 'Date', description: 'A new Date object with specified components' },
        example: `const date = createDate(2025, 1, 15, 10, 30, 0, 0);`
      },
      {
        id: 'utcNow',
        name: 'utcNow',
        description: 'Gets the current date and time in UTC',
        signature: 'utcNow(): Date',
        parameters: [],
        returns: { type: 'Date', description: 'Current Date in UTC' },
        example: `const now = utcNow();`
      },
      {
        id: 'toUTC',
        name: 'toUTC',
        description: 'Converts a date to UTC timezone',
        signature: 'toUTC(date: Date | string | number, fromTimezone?: IANATimezone): Date',
        parameters: [
          { name: 'date', type: 'Date | string | number', required: true, description: 'The date to convert' },
          { name: 'fromTimezone', type: 'IANATimezone', required: false, description: 'Source timezone' }
        ],
        returns: { type: 'Date', description: 'Date converted to UTC' },
        example: `const utcDate = toUTC(new Date(), 'America/New_York');`
      },
      {
        id: 'generateDateRange',
        name: 'generateDateRange',
        description: 'Generates an array of dates between start and end dates',
        signature: 'generateDateRange(startDate: Date | string | number, endDate: Date | string | number, interval: number, unit: TimeUnit): Date[]',
        parameters: [
          { name: 'startDate', type: 'Date | string | number', required: true, description: 'Start of range' },
          { name: 'endDate', type: 'Date | string | number', required: true, description: 'End of range' },
          { name: 'interval', type: 'number', required: true, description: 'Interval between dates' },
          { name: 'unit', type: 'TimeUnit', required: true, description: 'Unit for interval' }
        ],
        returns: { type: 'Date[]', description: 'Array of Date objects' },
        example: `const dates = generateDateRange('2025-01-01', '2025-01-07', 1, 'day');`
      },
      {
        id: 'getQuarter',
        name: 'getQuarter',
        description: 'Gets the quarter (1-4) for a given date',
        signature: 'getQuarter(date: Date | string | number): number',
        parameters: [
          { name: 'date', type: 'Date | string | number', required: true, description: 'The input date' }
        ],
        returns: { type: 'number', description: 'Quarter number (1-4)' },
        example: `const quarter = getQuarter(new Date('2025-03-15')); // 1`
      },
      {
        id: 'getDayOfYear',
        name: 'getDayOfYear',
        description: 'Gets the day of year (1-366) for a given date',
        signature: 'getDayOfYear(date: Date | string | number): number',
        parameters: [
          { name: 'date', type: 'Date | string | number', required: true, description: 'The input date' }
        ],
        returns: { type: 'number', description: 'Day of year number (1-366)' },
        example: `const dayOfYear = getDayOfYear(new Date('2025-01-01')); // 1`
      },
      {
        id: 'getWeekOfYear',
        name: 'getWeekOfYear',
        description: 'Gets the week number of the year for a given date',
        signature: 'getWeekOfYear(date: Date | string | number): number',
        parameters: [
          { name: 'date', type: 'Date | string | number', required: true, description: 'The input date' }
        ],
        returns: { type: 'number', description: 'Week number of year' },
        example: `const week = getWeekOfYear(new Date('2025-01-15')); // 3`
      },
      {
        id: 'getDaysInMonth',
        name: 'getDaysInMonth',
        description: 'Gets the number of days in a month for a given date',
        signature: 'getDaysInMonth(date: Date | string | number): number',
        parameters: [
          { name: 'date', type: 'Date | string | number', required: true, description: 'The input date' }
        ],
        returns: { type: 'number', description: 'Number of days in the month' },
        example: `const days = getDaysInMonth(new Date('2025-02-15')); // 28`
      },
      {
        id: 'isLeapYear',
        name: 'isLeapYear',
        description: 'Checks if a given year is a leap year',
        signature: 'isLeapYear(date: Date | string | number | year: number): boolean',
        parameters: [
          { name: 'date', type: 'Date | string | number', required: true, description: 'The input date or year' }
        ],
        returns: { type: 'boolean', description: 'True if leap year, false otherwise' },
        example: `const isLeap = isLeapYear(2024); // true`
      },
      {
        id: 'getRelativeTime',
        name: 'getRelativeTime',
        description: 'Gets relative time string (e.g., "2 hours ago", "in 3 days")',
        signature: 'getRelativeTime(date: Date | string | number, referenceDate?: Date | string | number): string',
        parameters: [
          { name: 'date', type: 'Date | string | number', required: true, description: 'The target date' },
          { name: 'referenceDate', type: 'Date | string | number', required: false, description: 'Reference date (defaults to now)' }
        ],
        returns: { type: 'string', description: 'Relative time string' },
        example: `const relative = getRelativeTime(new Date('2025-01-01'));`
      },
      {
        id: 'cloneDate',
        name: 'cloneDate',
        description: 'Creates a copy of a Date object',
        signature: 'cloneDate(date: Date): Date',
        parameters: [
          { name: 'date', type: 'Date', required: true, description: 'The date to clone' }
        ],
        returns: { type: 'Date', description: 'A new Date object copy' },
        example: `const clone = cloneDate(new Date());`
      },
      {
        id: 'getTimestamp',
        name: 'getTimestamp',
        description: 'Gets the timestamp (milliseconds since epoch) for a date',
        signature: 'getTimestamp(date: Date | string | number): number',
        parameters: [
          { name: 'date', type: 'Date | string | number', required: true, description: 'The input date' }
        ],
        returns: { type: 'number', description: 'Timestamp in milliseconds' },
        example: `const timestamp = getTimestamp(new Date());`
      },
      {
        id: 'fromTimestamp',
        name: 'fromTimestamp',
        description: 'Creates a Date from a timestamp',
        signature: 'fromTimestamp(timestamp: number): Date',
        parameters: [
          { name: 'timestamp', type: 'number', required: true, description: 'Timestamp in milliseconds' }
        ],
        returns: { type: 'Date', description: 'Date object from timestamp' },
        example: `const date = fromTimestamp(1735689600000);`
      },
      {
        id: 'randomDate',
        name: 'randomDate',
        description: 'Generates a random date between two dates',
        signature: 'randomDate(startDate: Date | string | number, endDate: Date | string | number): Date',
        parameters: [
          { name: 'startDate', type: 'Date | string | number', required: true, description: 'Start of range' },
          { name: 'endDate', type: 'Date | string | number', required: true, description: 'End of range' }
        ],
        returns: { type: 'Date', description: 'Random Date within range' },
        example: `const random = randomDate('2025-01-01', '2025-12-31');`
      }
    ]
  },
  {
    id: 'business',
    name: 'Business Utilities',
    items: [
      {
        id: 'getBusinessDays',
        name: 'getBusinessDays',
        description: 'Calculates the number of business days between two dates, excluding weekends and optionally holidays',
        signature: 'getBusinessDays(startDate: Date | string, endDate: Date | string, holidays?: (Date | string)[]): number',
        parameters: [
          { 
            name: 'startDate', 
            type: 'Date | string', 
            required: true,
            description: 'The start date for the calculation.' 
          },
          { 
            name: 'endDate', 
            type: 'Date | string', 
            required: true,
            description: 'The end date for the calculation.' 
          },
          { 
            name: 'holidays', 
            type: '(Date | string)[]', 
            required: false,
            description: 'Optional array of holiday dates to exclude from business days.' 
          }
        ],
        returns: {
          type: 'number',
          description: 'The number of business days between the start and end dates.'
        },
        example: `// Calculate business days between two dates
const workDays = getBusinessDays('2025-05-01', '2025-05-15');

// With holidays
const workDays = getBusinessDays('2025-05-01', '2025-05-15', ['2025-05-05']);`
      },
      {
        id: 'addBusinessDays',
        name: 'addBusinessDays',
        description: 'Adds the specified number of business days to a date',
        signature: 'addBusinessDays(date: Date | string | number, businessDays: number, timezone?: IANATimezone): Date',
        parameters: [
          { 
            name: 'date', 
            type: 'Date | string | number', 
            required: true,
            description: 'The starting date for the calculation.' 
          },
          { 
            name: 'businessDays', 
            type: 'number', 
            required: true,
            description: 'The number of business days to add. Can be positive or negative.' 
          },
          { 
            name: 'timezone', 
            type: 'IANATimezone', 
            required: false,
            description: 'Optional timezone for timezone-aware calculations.' 
          }
        ],
        returns: {
          type: 'Date',
          description: 'A new Date object with the specified business days added.'
        },
        example: `// Add 5 business days to Friday, Jan 5, 2024
const newDate = addBusinessDays(new Date('2024-01-05'), 5);
// Returns: Friday, Jan 12, 2024 (skips weekends)`
      },
      {
        id: 'calculateAge',
        name: 'calculateAge',
        description: 'Calculates age in years from a birth date',
        signature: 'calculateAge(birthDate: Date | string | number, referenceDate?: Date | string | number): number',
        parameters: [
          { name: 'birthDate', type: 'Date | string | number', required: true, description: 'The birth date' },
          { name: 'referenceDate', type: 'Date | string | number', required: false, description: 'Reference date (defaults to today)' }
        ],
        returns: { type: 'number', description: 'Age in years' },
        example: `const age = calculateAge('1990-05-15');`
      },
      {
        id: 'configureWorkingDays',
        name: 'configureWorkingDays',
        description: 'Configures which days are considered working days',
        signature: 'configureWorkingDays(workingDays: number[]): WorkingDayConfig',
        parameters: [
          { name: 'workingDays', type: 'number[]', required: true, description: 'Array of working day numbers (0=Sunday, 1=Monday, etc.)' }
        ],
        returns: { type: 'WorkingDayConfig', description: 'Configuration object' },
        example: `configureWorkingDays([1, 2, 3, 4, 5]);`
      },
      {
        id: 'configureHolidays',
        name: 'configureHolidays',
        description: 'Configures holiday dates for business day calculations',
        signature: 'configureHolidays(holidays: (Date | string)[]): HolidayConfig',
        parameters: [
          { name: 'holidays', type: '(Date | string)[]', required: true, description: 'Array of holiday dates' }
        ],
        returns: { type: 'HolidayConfig', description: 'Configuration object' },
        example: `configureHolidays(['2025-01-01', '2025-07-04', '2025-12-25']);`
      },
      {
        id: 'isWeekend',
        name: 'isWeekend',
        description: 'Checks if a date falls on a weekend',
        signature: 'isWeekend(date: Date | string | number): boolean',
        parameters: [
          { name: 'date', type: 'Date | string | number', required: true, description: 'The date to check' }
        ],
        returns: { type: 'boolean', description: 'True if weekend, false otherwise' },
        example: `const weekend = isWeekend(new Date('2025-01-11')); // true`
      },
      {
        id: 'isWeekday',
        name: 'isWeekday',
        description: 'Checks if a date falls on a weekday',
        signature: 'isWeekday(date: Date | string | number): boolean',
        parameters: [
          { name: 'date', type: 'Date | string | number', required: true, description: 'The date to check' }
        ],
        returns: { type: 'boolean', description: 'True if weekday, false otherwise' },
        example: `const weekday = isWeekday(new Date('2025-01-13')); // true`
      },
      {
        id: 'isBusinessDay',
        name: 'isBusinessDay',
        description: 'Checks if a date is a business day (weekday and not a holiday)',
        signature: 'isBusinessDay(date: Date | string | number): boolean',
        parameters: [
          { name: 'date', type: 'Date | string | number', required: true, description: 'The date to check' }
        ],
        returns: { type: 'boolean', description: 'True if the date is a business day' },
        example: `const isWorkDay = isBusinessDay(new Date('2024-01-08'));`
      },
      {
        id: 'subtractBusinessDays',
        name: 'subtractBusinessDays',
        description: 'Subtracts business days from a date',
        signature: 'subtractBusinessDays(date: Date | string | number, businessDays: number, timezone?: IANATimezone): Date',
        parameters: [
          { name: 'date', type: 'Date | string | number', required: true, description: 'The starting date' },
          { name: 'businessDays', type: 'number', required: true, description: 'Number of business days to subtract' },
          { name: 'timezone', type: 'IANATimezone', required: false, description: 'Optional timezone' }
        ],
        returns: { type: 'Date', description: 'Date with business days subtracted' },
        example: `const newDate = subtractBusinessDays(new Date('2025-01-15'), 5);`
      },
      {
        id: 'getNextBusinessDay',
        name: 'getNextBusinessDay',
        description: 'Gets the next business day after a given date',
        signature: 'getNextBusinessDay(date: Date | string | number, timezone?: IANATimezone): Date',
        parameters: [
          { name: 'date', type: 'Date | string | number', required: true, description: 'The reference date' },
          { name: 'timezone', type: 'IANATimezone', required: false, description: 'Optional timezone' }
        ],
        returns: { type: 'Date', description: 'Next business day' },
        example: `const nextBD = getNextBusinessDay(new Date('2025-01-10'));`
      },
      {
        id: 'getPreviousBusinessDay',
        name: 'getPreviousBusinessDay',
        description: 'Gets the previous business day before a given date',
        signature: 'getPreviousBusinessDay(date: Date | string | number, timezone?: IANATimezone): Date',
        parameters: [
          { name: 'date', type: 'Date | string | number', required: true, description: 'The reference date' },
          { name: 'timezone', type: 'IANATimezone', required: false, description: 'Optional timezone' }
        ],
        returns: { type: 'Date', description: 'Previous business day' },
        example: `const prevBD = getPreviousBusinessDay(new Date('2025-01-13'));`
      },
      {
        id: 'businessDaysInMonth',
        name: 'businessDaysInMonth',
        description: 'Calculates the total number of business days in a given month',
        signature: 'businessDaysInMonth(year: number, month: number, timezone?: IANATimezone): number',
        parameters: [
          { name: 'year', type: 'number', required: true, description: 'The year' },
          { name: 'month', type: 'number', required: true, description: 'The month (1-12)' },
          { name: 'timezone', type: 'IANATimezone', required: false, description: 'Optional timezone' }
        ],
        returns: { type: 'number', description: 'Number of business days in the month' },
        example: `const businessDays = businessDaysInMonth(2025, 1);`
      },
      {
        id: 'differenceInBusinessDays',
        name: 'differenceInBusinessDays',
        description: 'Calculates the difference in business days between two dates',
        signature: 'differenceInBusinessDays(startDate: Date | string | number, endDate: Date | string | number, timezone?: IANATimezone): number',
        parameters: [
          { name: 'startDate', type: 'Date | string | number', required: true, description: 'The start date' },
          { name: 'endDate', type: 'Date | string | number', required: true, description: 'The end date' },
          { name: 'timezone', type: 'IANATimezone', required: false, description: 'Optional timezone' }
        ],
        returns: { type: 'number', description: 'Difference in business days' },
        example: `const diff = differenceInBusinessDays('2025-01-01', '2025-01-15');`
      },
      {
        id: 'isFirstBusinessDayOfMonth',
        name: 'isFirstBusinessDayOfMonth',
        description: 'Checks if a given date is the first business day of the month',
        signature: 'isFirstBusinessDayOfMonth(date: Date | string | number, timezone?: IANATimezone): boolean',
        parameters: [
          { name: 'date', type: 'Date | string | number', required: true, description: 'The date to check' },
          { name: 'timezone', type: 'IANATimezone', required: false, description: 'Optional timezone' }
        ],
        returns: { type: 'boolean', description: 'True if it is the first business day' },
        example: `const isFirst = isFirstBusinessDayOfMonth(new Date('2025-01-02'));`
      },
      {
        id: 'isLastBusinessDayOfMonth',
        name: 'isLastBusinessDayOfMonth',
        description: 'Checks if a given date is the last business day of the month',
        signature: 'isLastBusinessDayOfMonth(date: Date | string | number, timezone?: IANATimezone): boolean',
        parameters: [
          { name: 'date', type: 'Date | string | number', required: true, description: 'The date to check' },
          { name: 'timezone', type: 'IANATimezone', required: false, description: 'Optional timezone' }
        ],
        returns: { type: 'boolean', description: 'True if it is the last business day' },
        example: `const isLast = isLastBusinessDayOfMonth(new Date('2025-01-31'));`
      },
      {
        id: 'getFirstBusinessDayOfMonth',
        name: 'getFirstBusinessDayOfMonth',
        description: 'Gets the first business day of a given month',
        signature: 'getFirstBusinessDayOfMonth(year: number, month: number, timezone?: IANATimezone): Date',
        parameters: [
          { name: 'year', type: 'number', required: true, description: 'The year' },
          { name: 'month', type: 'number', required: true, description: 'The month (1-12)' },
          { name: 'timezone', type: 'IANATimezone', required: false, description: 'Optional timezone' }
        ],
        returns: { type: 'Date', description: 'First business day of the month' },
        example: `const firstBD = getFirstBusinessDayOfMonth(2025, 1);`
      },
      {
        id: 'getLastBusinessDayOfMonth',
        name: 'getLastBusinessDayOfMonth',
        description: 'Gets the last business day of a given month',
        signature: 'getLastBusinessDayOfMonth(year: number, month: number, timezone?: IANATimezone): Date',
        parameters: [
          { name: 'year', type: 'number', required: true, description: 'The year' },
          { name: 'month', type: 'number', required: true, description: 'The month (1-12)' },
          { name: 'timezone', type: 'IANATimezone', required: false, description: 'Optional timezone' }
        ],
        returns: { type: 'Date', description: 'Last business day of the month' },
        example: `const lastBD = getLastBusinessDayOfMonth(2025, 1);`
      },
      {
        id: 'getBusinessDaysInRange',
        name: 'getBusinessDaysInRange',
        description: 'Gets all business days within a date range',
        signature: 'getBusinessDaysInRange(startDate: Date | string | number, endDate: Date | string | number, timezone?: IANATimezone): Date[]',
        parameters: [
          { name: 'startDate', type: 'Date | string | number', required: true, description: 'The start date' },
          { name: 'endDate', type: 'Date | string | number', required: true, description: 'The end date' },
          { name: 'timezone', type: 'IANATimezone', required: false, description: 'Optional timezone' }
        ],
        returns: { type: 'Date[]', description: 'Array of business days in range' },
        example: `const businessDays = getBusinessDaysInRange('2025-01-01', '2025-01-15');`
      },
      {
        id: 'calculateWorkingHours',
        name: 'calculateWorkingHours',
        description: 'Calculates working hours between two dates based on business configuration',
        signature: 'calculateWorkingHours(startDate: Date | string | number, endDate: Date | string | number, timezone?: IANATimezone): number',
        parameters: [
          { name: 'startDate', type: 'Date | string | number', required: true, description: 'The start date/time' },
          { name: 'endDate', type: 'Date | string | number', required: true, description: 'The end date/time' },
          { name: 'timezone', type: 'IANATimezone', required: false, description: 'Optional timezone' }
        ],
        returns: { type: 'number', description: 'Total working hours' },
        example: `const hours = calculateWorkingHours('2025-01-13 09:00', '2025-01-15 17:00');`
      },
      {
        id: 'addBusinessHours',
        name: 'addBusinessHours',
        description: 'Adds business hours to a date, respecting working hours configuration',
        signature: 'addBusinessHours(date: Date | string | number, hours: number, timezone?: IANATimezone): Date',
        parameters: [
          { name: 'date', type: 'Date | string | number', required: true, description: 'The start date/time' },
          { name: 'hours', type: 'number', required: true, description: 'Number of business hours to add' },
          { name: 'timezone', type: 'IANATimezone', required: false, description: 'Optional timezone' }
        ],
        returns: { type: 'Date', description: 'Date after adding business hours' },
        example: `const result = addBusinessHours('2025-01-13 09:00', 16);`
      },
      {
        id: 'subtractBusinessHours',
        name: 'subtractBusinessHours',
        description: 'Subtracts business hours from a date, respecting working hours configuration',
        signature: 'subtractBusinessHours(date: Date | string | number, hours: number, timezone?: IANATimezone): Date',
        parameters: [
          { name: 'date', type: 'Date | string | number', required: true, description: 'The start date/time' },
          { name: 'hours', type: 'number', required: true, description: 'Number of business hours to subtract' },
          { name: 'timezone', type: 'IANATimezone', required: false, description: 'Optional timezone' }
        ],
        returns: { type: 'Date', description: 'Date after subtracting business hours' },
        example: `const result = subtractBusinessHours('2025-01-13 17:00', 8);`
      },
      {
        id: 'isBusinessHour',
        name: 'isBusinessHour',
        description: 'Checks if a given date/time falls within configured business hours',
        signature: 'isBusinessHour(date: Date | string | number, timezone?: IANATimezone): boolean',
        parameters: [
          { name: 'date', type: 'Date | string | number', required: true, description: 'The date/time to check' },
          { name: 'timezone', type: 'IANATimezone', required: false, description: 'Optional timezone' }
        ],
        returns: { type: 'boolean', description: 'True if within business hours' },
        example: `const isBizHour = isBusinessHour('2025-01-13 14:30');`
      },
      {
        id: 'getQuarterStart',
        name: 'getQuarterStart',
        description: 'Gets the start date of the quarter for a given date',
        signature: 'getQuarterStart(date: Date | string | number, timezone?: IANATimezone): Date',
        parameters: [
          { name: 'date', type: 'Date | string | number', required: true, description: 'The reference date' },
          { name: 'timezone', type: 'IANATimezone', required: false, description: 'Optional timezone' }
        ],
        returns: { type: 'Date', description: 'Start of the quarter' },
        example: `const qStart = getQuarterStart(new Date('2025-05-15'));`
      },
      {
        id: 'getQuarterEnd',
        name: 'getQuarterEnd',
        description: 'Gets the end date of the quarter for a given date',
        signature: 'getQuarterEnd(date: Date | string | number, timezone?: IANATimezone): Date',
        parameters: [
          { name: 'date', type: 'Date | string | number', required: true, description: 'The reference date' },
          { name: 'timezone', type: 'IANATimezone', required: false, description: 'Optional timezone' }
        ],
        returns: { type: 'Date', description: 'End of the quarter' },
        example: `const qEnd = getQuarterEnd(new Date('2025-05-15'));`
      },
      {
        id: 'getFiscalYear',
        name: 'getFiscalYear',
        description: 'Gets the fiscal year for a given date based on configuration',
        signature: 'getFiscalYear(date: Date | string | number, fiscalStartMonth?: number, timezone?: IANATimezone): number',
        parameters: [
          { name: 'date', type: 'Date | string | number', required: true, description: 'The reference date' },
          { name: 'fiscalStartMonth', type: 'number', required: false, description: 'Fiscal year start month (1-12)' },
          { name: 'timezone', type: 'IANATimezone', required: false, description: 'Optional timezone' }
        ],
        returns: { type: 'number', description: 'Fiscal year' },
        example: `const fiscalYear = getFiscalYear(new Date('2025-05-15'), 4);`
      },
      {
        id: 'getFiscalQuarter',
        name: 'getFiscalQuarter',
        description: 'Gets the fiscal quarter for a given date based on configuration',
        signature: 'getFiscalQuarter(date: Date | string | number, fiscalStartMonth?: number, timezone?: IANATimezone): number',
        parameters: [
          { name: 'date', type: 'Date | string | number', required: true, description: 'The reference date' },
          { name: 'fiscalStartMonth', type: 'number', required: false, description: 'Fiscal year start month (1-12)' },
          { name: 'timezone', type: 'IANATimezone', required: false, description: 'Optional timezone' }
        ],
        returns: { type: 'number', description: 'Fiscal quarter (1-4)' },
        example: `const fiscalQ = getFiscalQuarter(new Date('2025-05-15'), 4);`
      },
      {
        id: 'calculatePayrollPeriod',
        name: 'calculatePayrollPeriod',
        description: 'Calculates payroll period information for a given date',
        signature: 'calculatePayrollPeriod(date: Date | string | number, frequency: PayrollFrequency, timezone?: IANATimezone): PayrollPeriod',
        parameters: [
          { name: 'date', type: 'Date | string | number', required: true, description: 'The reference date' },
          { name: 'frequency', type: 'PayrollFrequency', required: true, description: 'Payroll frequency (weekly, biweekly, monthly, etc.)' },
          { name: 'timezone', type: 'IANATimezone', required: false, description: 'Optional timezone' }
        ],
        returns: { type: 'PayrollPeriod', description: 'Payroll period information' },
        example: `const payroll = calculatePayrollPeriod(new Date(), 'biweekly');`
      },
      {
        id: 'getPayrollDates',
        name: 'getPayrollDates',
        description: 'Gets all payroll dates for a given year and frequency',
        signature: 'getPayrollDates(year: number, frequency: PayrollFrequency, timezone?: IANATimezone): Date[]',
        parameters: [
          { name: 'year', type: 'number', required: true, description: 'The year' },
          { name: 'frequency', type: 'PayrollFrequency', required: true, description: 'Payroll frequency' },
          { name: 'timezone', type: 'IANATimezone', required: false, description: 'Optional timezone' }
        ],
        returns: { type: 'Date[]', description: 'Array of payroll dates' },
        example: `const payrollDates = getPayrollDates(2025, 'biweekly');`
      },
      {
        id: 'calculateSLADeadline',
        name: 'calculateSLADeadline',
        description: 'Calculates SLA deadline based on business days/hours configuration',
        signature: 'calculateSLADeadline(startDate: Date | string | number, slaHours: number, timezone?: IANATimezone): Date',
        parameters: [
          { name: 'startDate', type: 'Date | string | number', required: true, description: 'SLA start date/time' },
          { name: 'slaHours', type: 'number', required: true, description: 'SLA duration in business hours' },
          { name: 'timezone', type: 'IANATimezone', required: false, description: 'Optional timezone' }
        ],
        returns: { type: 'Date', description: 'SLA deadline date/time' },
        example: `const deadline = calculateSLADeadline(new Date(), 48);`
      },
      {
        id: 'isSLAMet',
        name: 'isSLAMet',
        description: 'Checks if an SLA was met based on start date, completion date, and SLA duration',
        signature: 'isSLAMet(startDate: Date | string | number, completionDate: Date | string | number, slaHours: number, timezone?: IANATimezone): boolean',
        parameters: [
          { name: 'startDate', type: 'Date | string | number', required: true, description: 'SLA start date/time' },
          { name: 'completionDate', type: 'Date | string | number', required: true, description: 'Task completion date/time' },
          { name: 'slaHours', type: 'number', required: true, description: 'SLA duration in business hours' },
          { name: 'timezone', type: 'IANATimezone', required: false, description: 'Optional timezone' }
        ],
        returns: { type: 'boolean', description: 'True if SLA was met' },
        example: `const met = isSLAMet(startDate, completionDate, 24);`
      },
      {
        id: 'calculateSLACompliance',
        name: 'calculateSLACompliance',
        description: 'Calculates SLA compliance percentage for a set of tasks',
        signature: 'calculateSLACompliance(tasks: SLATask[], timezone?: IANATimezone): SLACompliance',
        parameters: [
          { name: 'tasks', type: 'SLATask[]', required: true, description: 'Array of SLA task objects' },
          { name: 'timezone', type: 'IANATimezone', required: false, description: 'Optional timezone' }
        ],
        returns: { type: 'SLACompliance', description: 'SLA compliance statistics' },
        example: `const compliance = calculateSLACompliance(taskArray);`
      }
    ]
  },
  {
    id: 'formatting',
    name: 'Formatting & Parsing',
    items: [
      {
        id: 'formatDuration',
        name: 'formatDuration',
        description: 'Converts milliseconds into a human-readable duration string',
        signature: 'formatDuration(milliseconds: number, options?: DurationDisplayOptions): string',
        parameters: [
          { 
            name: 'milliseconds', 
            type: 'number', 
            required: true,
            description: 'The duration in milliseconds to format.' 
          },
          { 
            name: 'options', 
            type: 'DurationDisplayOptions', 
            required: false,
            description: 'Optional formatting options to customize the output.' 
          }
        ],
        returns: {
          type: 'string',
          description: 'A human-readable duration string (e.g., "2 days, 4 hours, 30 minutes").'
        },
        example: `// "2 days, 4 hours, 30 minutes"
const duration = formatDuration(189000000);

// With options
const duration = formatDuration(189000000, { 
  longFormat: true, 
  maxUnits: 2 
});`
      },
      {
        id: 'parseNaturalLanguage',
        name: 'parseNaturalLanguage',
        description: 'Parses natural language time expressions into dates',
        signature: 'parseNaturalLanguage(expression: NaturalTimeExpression, options?: NaturalLanguageOptions): Date | null',
        parameters: [
          { 
            name: 'expression', 
            type: 'NaturalTimeExpression', 
            required: true,
            description: 'Natural language expression to parse (e.g., "tomorrow", "next Friday").' 
          },
          { 
            name: 'options', 
            type: 'NaturalLanguageOptions', 
            required: false,
            description: 'Optional parsing options to customize behavior.' 
          }
        ],
        returns: {
          type: 'Date | null',
          description: 'Parsed Date object or null if the expression could not be parsed.'
        },
        example: `const tomorrow = parseNaturalLanguage('tomorrow');
// Returns: Date object for tomorrow at 00:00:00

const nextFriday = parseNaturalLanguage('next friday');
// Returns: Date object for next Friday at 00:00:00`
      },
      {
        id: 'formatISO',
        name: 'formatISO',
        description: 'Formats a date in ISO 8601 format',
        signature: 'formatISO(date: Date | string | number, timezone?: IANATimezone): string',
        parameters: [
          { name: 'date', type: 'Date | string | number', required: true, description: 'The date to format' },
          { name: 'timezone', type: 'IANATimezone', required: false, description: 'Optional timezone' }
        ],
        returns: { type: 'string', description: 'ISO 8601 formatted date string' },
        example: `const iso = formatISO(new Date());`
      },
      {
        id: 'formatRelative',
        name: 'formatRelative',
        description: 'Formats a date as relative time (e.g., "2 hours ago", "in 3 days")',
        signature: 'formatRelative(date: Date | string | number, baseDate?: Date | string | number, options?: RelativeFormatOptions): string',
        parameters: [
          { name: 'date', type: 'Date | string | number', required: true, description: 'The date to format' },
          { name: 'baseDate', type: 'Date | string | number', required: false, description: 'Base date for comparison (defaults to now)' },
          { name: 'options', type: 'RelativeFormatOptions', required: false, description: 'Formatting options' }
        ],
        returns: { type: 'string', description: 'Relative time string' },
        example: `const rel = formatRelative(new Date('2025-01-10'));`
      },
      {
        id: 'formatCustom',
        name: 'formatCustom',
        description: 'Formats a date using a custom format string',
        signature: 'formatCustom(date: Date | string | number, format: string, timezone?: IANATimezone): string',
        parameters: [
          { name: 'date', type: 'Date | string | number', required: true, description: 'The date to format' },
          { name: 'format', type: 'string', required: true, description: 'Custom format string (e.g., "YYYY-MM-DD HH:mm:ss")' },
          { name: 'timezone', type: 'IANATimezone', required: false, description: 'Optional timezone' }
        ],
        returns: { type: 'string', description: 'Custom formatted date string' },
        example: `const custom = formatCustom(new Date(), 'YYYY-MM-DD HH:mm:ss');`
      },
      {
        id: 'parseCustomFormat',
        name: 'parseCustomFormat',
        description: 'Parses a date string using a specified custom format',
        signature: 'parseCustomFormat(dateString: string, format: string, timezone?: IANATimezone): Date | null',
        parameters: [
          { name: 'dateString', type: 'string', required: true, description: 'The date string to parse' },
          { name: 'format', type: 'string', required: true, description: 'Expected format string' },
          { name: 'timezone', type: 'IANATimezone', required: false, description: 'Optional timezone' }
        ],
        returns: { type: 'Date | null', description: 'Parsed Date object or null if parsing failed' },
        example: `const date = parseCustomFormat('2025-01-15 14:30:00', 'YYYY-MM-DD HH:mm:ss');`
      },
      {
        id: 'formatLocalized',
        name: 'formatLocalized',
        description: 'Formats a date using locale-specific formatting',
        signature: 'formatLocalized(date: Date | string | number, locale: string, options?: Intl.DateTimeFormatOptions): string',
        parameters: [
          { name: 'date', type: 'Date | string | number', required: true, description: 'The date to format' },
          { name: 'locale', type: 'string', required: true, description: 'Locale string (e.g., "en-US", "fr-FR")' },
          { name: 'options', type: 'Intl.DateTimeFormatOptions', required: false, description: 'Intl formatting options' }
        ],
        returns: { type: 'string', description: 'Localized date string' },
        example: `const localized = formatLocalized(new Date(), 'fr-FR');`
      },
      {
        id: 'formatDistance',
        name: 'formatDistance',
        description: 'Formats the distance between two dates in words',
        signature: 'formatDistance(dateLeft: Date | string | number, dateRight: Date | string | number, options?: DistanceFormatOptions): string',
        parameters: [
          { name: 'dateLeft', type: 'Date | string | number', required: true, description: 'First date' },
          { name: 'dateRight', type: 'Date | string | number', required: true, description: 'Second date' },
          { name: 'options', type: 'DistanceFormatOptions', required: false, description: 'Formatting options' }
        ],
        returns: { type: 'string', description: 'Distance in words (e.g., "2 months")' },
        example: `const distance = formatDistance(new Date(), new Date('2025-03-15'));`
      },
      {
        id: 'formatDistanceStrict',
        name: 'formatDistanceStrict',
        description: 'Formats distance between dates with strict unit precision',
        signature: 'formatDistanceStrict(dateLeft: Date | string | number, dateRight: Date | string | number, options?: StrictDistanceOptions): string',
        parameters: [
          { name: 'dateLeft', type: 'Date | string | number', required: true, description: 'First date' },
          { name: 'dateRight', type: 'Date | string | number', required: true, description: 'Second date' },
          { name: 'options', type: 'StrictDistanceOptions', required: false, description: 'Strict formatting options' }
        ],
        returns: { type: 'string', description: 'Precise distance string' },
        example: `const strict = formatDistanceStrict(new Date(), new Date('2025-03-15'));`
      },
      {
        id: 'parseISO',
        name: 'parseISO',
        description: 'Parses an ISO 8601 date string',
        signature: 'parseISO(isoString: string, timezone?: IANATimezone): Date | null',
        parameters: [
          { name: 'isoString', type: 'string', required: true, description: 'ISO 8601 date string' },
          { name: 'timezone', type: 'IANATimezone', required: false, description: 'Optional timezone' }
        ],
        returns: { type: 'Date | null', description: 'Parsed Date object or null' },
        example: `const date = parseISO('2025-01-15T14:30:00Z');`
      },
      {
        id: 'parseTimestamp',
        name: 'parseTimestamp',
        description: 'Parses a Unix timestamp (seconds or milliseconds)',
        signature: 'parseTimestamp(timestamp: number, isSeconds?: boolean): Date',
        parameters: [
          { name: 'timestamp', type: 'number', required: true, description: 'Unix timestamp' },
          { name: 'isSeconds', type: 'boolean', required: false, description: 'Whether timestamp is in seconds (default: false, milliseconds)' }
        ],
        returns: { type: 'Date', description: 'Date object from timestamp' },
        example: `const date = parseTimestamp(1705312200, true);`
      },
      {
        id: 'toTimestamp',
        name: 'toTimestamp',
        description: 'Converts a date to Unix timestamp',
        signature: 'toTimestamp(date: Date | string | number, inSeconds?: boolean): number',
        parameters: [
          { name: 'date', type: 'Date | string | number', required: true, description: 'The date to convert' },
          { name: 'inSeconds', type: 'boolean', required: false, description: 'Return seconds instead of milliseconds' }
        ],
        returns: { type: 'number', description: 'Unix timestamp' },
        example: `const timestamp = toTimestamp(new Date());`
      },
      {
        id: 'formatTimeAgo',
        name: 'formatTimeAgo',
        description: 'Formats how long ago a date was (e.g., "5 minutes ago")',
        signature: 'formatTimeAgo(date: Date | string | number, options?: TimeAgoOptions): string',
        parameters: [
          { name: 'date', type: 'Date | string | number', required: true, description: 'The past date' },
          { name: 'options', type: 'TimeAgoOptions', required: false, description: 'Formatting options' }
        ],
        returns: { type: 'string', description: 'Time ago string' },
        example: `const ago = formatTimeAgo(new Date('2025-01-01'));`
      },
      {
        id: 'formatCalendar',
        name: 'formatCalendar',
        description: 'Formats a date in calendar format (Today, Yesterday, Tomorrow, or date)',
        signature: 'formatCalendar(date: Date | string | number, referenceDate?: Date | string | number): string',
        parameters: [
          { name: 'date', type: 'Date | string | number', required: true, description: 'The date to format' },
          { name: 'referenceDate', type: 'Date | string | number', required: false, description: 'Reference date (default: today)' }
        ],
        returns: { type: 'string', description: 'Calendar format string' },
        example: `const cal = formatCalendar(new Date());`
      },
      {
        id: 'parseStringWithFormats',
        name: 'parseStringWithFormats',
        description: 'Attempts to parse a date string using multiple format patterns',
        signature: 'parseStringWithFormats(dateString: string, formats: string[], timezone?: IANATimezone): Date | null',
        parameters: [
          { name: 'dateString', type: 'string', required: true, description: 'The date string to parse' },
          { name: 'formats', type: 'string[]', required: true, description: 'Array of format patterns to try' },
          { name: 'timezone', type: 'IANATimezone', required: false, description: 'Optional timezone' }
        ],
        returns: { type: 'Date | null', description: 'Parsed Date object or null' },
        example: `const date = parseStringWithFormats('01/15/2025', ['MM/DD/YYYY', 'DD/MM/YYYY']);`
      },
      {
        id: 'formatHumanReadable',
        name: 'formatHumanReadable',
        description: 'Formats a date in a human-friendly readable format',
        signature: 'formatHumanReadable(date: Date | string | number, options?: HumanReadableOptions): string',
        parameters: [
          { name: 'date', type: 'Date | string | number', required: true, description: 'The date to format' },
          { name: 'options', type: 'HumanReadableOptions', required: false, description: 'Formatting options' }
        ],
        returns: { type: 'string', description: 'Human readable date string' },
        example: `const readable = formatHumanReadable(new Date());`
      },
      {
        id: 'parseFlexible',
        name: 'parseFlexible',
        description: 'Flexibly parses various date string formats',
        signature: 'parseFlexible(dateString: string, timezone?: IANATimezone): Date | null',
        parameters: [
          { name: 'dateString', type: 'string', required: true, description: 'Date string in various formats' },
          { name: 'timezone', type: 'IANATimezone', required: false, description: 'Optional timezone' }
        ],
        returns: { type: 'Date | null', description: 'Parsed Date object or null' },
        example: `const date = parseFlexible('Jan 15, 2025');`
      },
      {
        id: 'formatAge',
        name: 'formatAge',
        description: 'Formats a person\'s age from birthdate',
        signature: 'formatAge(birthDate: Date | string | number, options?: AgeFormatOptions): string',
        parameters: [
          { name: 'birthDate', type: 'Date | string | number', required: true, description: 'Birth date' },
          { name: 'options', type: 'AgeFormatOptions', required: false, description: 'Age formatting options' }
        ],
        returns: { type: 'string', description: 'Formatted age string' },
        example: `const age = formatAge(new Date('1990-05-15'));`
      },
      {
        id: 'formatMonth',
        name: 'formatMonth',
        description: 'Formats month name in various styles',
        signature: 'formatMonth(date: Date | string | number, style?: MonthStyle, locale?: string): string',
        parameters: [
          { name: 'date', type: 'Date | string | number', required: true, description: 'The date' },
          { name: 'style', type: 'MonthStyle', required: false, description: 'Month style (long, short, narrow, numeric)' },
          { name: 'locale', type: 'string', required: false, description: 'Locale for formatting' }
        ],
        returns: { type: 'string', description: 'Formatted month string' },
        example: `const month = formatMonth(new Date(), 'long', 'en-US');`
      },
      {
        id: 'formatWeekday',
        name: 'formatWeekday',
        description: 'Formats weekday name in various styles',
        signature: 'formatWeekday(date: Date | string | number, style?: WeekdayStyle, locale?: string): string',
        parameters: [
          { name: 'date', type: 'Date | string | number', required: true, description: 'The date' },
          { name: 'style', type: 'WeekdayStyle', required: false, description: 'Weekday style (long, short, narrow)' },
          { name: 'locale', type: 'string', required: false, description: 'Locale for formatting' }
        ],
        returns: { type: 'string', description: 'Formatted weekday string' },
        example: `const weekday = formatWeekday(new Date(), 'long', 'en-US');`
      },
      {
        id: 'formatOrdinal',
        name: 'formatOrdinal',
        description: 'Formats day with ordinal suffix (1st, 2nd, 3rd, etc.)',
        signature: 'formatOrdinal(date: Date | string | number, locale?: string): string',
        parameters: [
          { name: 'date', type: 'Date | string | number', required: true, description: 'The date' },
          { name: 'locale', type: 'string', required: false, description: 'Locale for ordinal rules' }
        ],
        returns: { type: 'string', description: 'Day with ordinal suffix' },
        example: `const ordinal = formatOrdinal(new Date());`
      },
      {
        id: 'parseAndValidate',
        name: 'parseAndValidate',
        description: 'Parses a date string and validates it against constraints',
        signature: 'parseAndValidate(dateString: string, constraints?: DateConstraints): ParseResult',
        parameters: [
          { name: 'dateString', type: 'string', required: true, description: 'Date string to parse' },
          { name: 'constraints', type: 'DateConstraints', required: false, description: 'Validation constraints' }
        ],
        returns: { type: 'ParseResult', description: 'Parse result with validation info' },
        example: `const result = parseAndValidate('2025-01-15', { minDate: '2025-01-01' });`
      },
      {
        id: 'formatRange',
        name: 'formatRange',
        description: 'Formats a date range in a localized, readable format',
        signature: 'formatRange(startDate: Date | string | number, endDate: Date | string | number, options?: RangeFormatOptions): string',
        parameters: [
          { name: 'startDate', type: 'Date | string | number', required: true, description: 'Start date of range' },
          { name: 'endDate', type: 'Date | string | number', required: true, description: 'End date of range' },
          { name: 'options', type: 'RangeFormatOptions', required: false, description: 'Range formatting options' }
        ],
        returns: { type: 'string', description: 'Formatted date range string' },
        example: `const range = formatRange('2025-01-01', '2025-01-31');`
      },
      {
        id: 'formatCompact',
        name: 'formatCompact',
        description: 'Formats a date in a compact, space-efficient format',
        signature: 'formatCompact(date: Date | string | number, options?: CompactFormatOptions): string',
        parameters: [
          { name: 'date', type: 'Date | string | number', required: true, description: 'The date to format' },
          { name: 'options', type: 'CompactFormatOptions', required: false, description: 'Compact formatting options' }
        ],
        returns: { type: 'string', description: 'Compact formatted date string' },
        example: `const compact = formatCompact(new Date());`
      },
      {
        id: 'parseWithFallback',
        name: 'parseWithFallback',
        description: 'Parses a date string with fallback to default value on failure',
        signature: 'parseWithFallback(dateString: string, fallback: Date | string | number, formats?: string[]): Date',
        parameters: [
          { name: 'dateString', type: 'string', required: true, description: 'Date string to parse' },
          { name: 'fallback', type: 'Date | string | number', required: true, description: 'Fallback date if parsing fails' },
          { name: 'formats', type: 'string[]', required: false, description: 'Optional format patterns to try' }
        ],
        returns: { type: 'Date', description: 'Parsed date or fallback date' },
        example: `const date = parseWithFallback('invalid', new Date());`
      },
      {
        id: 'formatJSON',
        name: 'formatJSON',
        description: 'Formats a date for JSON serialization',
        signature: 'formatJSON(date: Date | string | number): string',
        parameters: [
          { name: 'date', type: 'Date | string | number', required: true, description: 'The date to format' }
        ],
        returns: { type: 'string', description: 'JSON-safe date string' },
        example: `const json = formatJSON(new Date());`
      },
      {
        id: 'parseJSON',
        name: 'parseJSON',
        description: 'Parses a JSON date string back to Date object',
        signature: 'parseJSON(jsonString: string): Date | null',
        parameters: [
          { name: 'jsonString', type: 'string', required: true, description: 'JSON date string' }
        ],
        returns: { type: 'Date | null', description: 'Parsed Date object or null' },
        example: `const date = parseJSON('2025-01-15T14:30:00.000Z');`
      },
      {
        id: 'formatSmart',
        name: 'formatSmart',
        description: 'Intelligently formats dates based on context and proximity',
        signature: 'formatSmart(date: Date | string | number, options?: SmartFormatOptions): string',
        parameters: [
          { name: 'date', type: 'Date | string | number', required: true, description: 'The date to format' },
          { name: 'options', type: 'SmartFormatOptions', required: false, description: 'Smart formatting options' }
        ],
        returns: { type: 'string', description: 'Context-aware formatted date' },
        example: `const smart = formatSmart(new Date());`
      },
      {
        id: 'smartParse',
        name: 'smartParse',
        description: 'Intelligently parses various date formats using AI-like pattern recognition',
        signature: 'smartParse(input: string, options?: SmartParseOptions): Date | null',
        parameters: [
          { name: 'input', type: 'string', required: true, description: 'Input string to parse' },
          { name: 'options', type: 'SmartParseOptions', required: false, description: 'Smart parsing options' }
        ],
        returns: { type: 'Date | null', description: 'Intelligently parsed Date or null' },
        example: `const date = smartParse('next Tuesday at 3pm');`
      }
    ]
  },
  {
    id: 'timezone',
    name: 'Timezone & Localization',
    items: [
      {
        id: 'getTimezoneOffset',
        name: 'getTimezoneOffset',
        description: 'Gets the timezone offset for a specific timezone and date',
        signature: 'getTimezoneOffset(timezone: IANATimezone, date?: Date | string | number): number',
        parameters: [
          { name: 'timezone', type: 'IANATimezone', required: true, description: 'IANA timezone identifier' },
          { name: 'date', type: 'Date | string | number', required: false, description: 'Reference date (default: now)' }
        ],
        returns: { type: 'number', description: 'Timezone offset in minutes' },
        example: `const offset = getTimezoneOffset('America/New_York');`
      },
      {
        id: 'convertTimezone',
        name: 'convertTimezone',
        description: 'Converts a date from one timezone to another',
        signature: 'convertTimezone(date: Date | string | number, fromTimezone: IANATimezone, toTimezone: IANATimezone): Date',
        parameters: [
          { name: 'date', type: 'Date | string | number', required: true, description: 'The date to convert' },
          { name: 'fromTimezone', type: 'IANATimezone', required: true, description: 'Source timezone' },
          { name: 'toTimezone', type: 'IANATimezone', required: true, description: 'Target timezone' }
        ],
        returns: { type: 'Date', description: 'Date converted to target timezone' },
        example: `const converted = convertTimezone(new Date(), 'UTC', 'America/New_York');`
      },
      {
        id: 'formatInTimezone',
        name: 'formatInTimezone',
        description: 'Formats a date in a specific timezone',
        signature: 'formatInTimezone(date: Date | string | number, timezone: IANATimezone, format?: string): string',
        parameters: [
          { name: 'date', type: 'Date | string | number', required: true, description: 'The date to format' },
          { name: 'timezone', type: 'IANATimezone', required: true, description: 'Target timezone' },
          { name: 'format', type: 'string', required: false, description: 'Format string (default: ISO)' }
        ],
        returns: { type: 'string', description: 'Formatted date in timezone' },
        example: `const formatted = formatInTimezone(new Date(), 'Europe/London');`
      },
      {
        id: 'getTimezoneAbbreviation',
        name: 'getTimezoneAbbreviation',
        description: 'Gets the timezone abbreviation for a specific timezone and date',
        signature: 'getTimezoneAbbreviation(timezone: IANATimezone, date?: Date | string | number): string',
        parameters: [
          { name: 'timezone', type: 'IANATimezone', required: true, description: 'IANA timezone identifier' },
          { name: 'date', type: 'Date | string | number', required: false, description: 'Reference date (default: now)' }
        ],
        returns: { type: 'string', description: 'Timezone abbreviation (e.g., "EST", "PST")' },
        example: `const abbr = getTimezoneAbbreviation('America/New_York');`
      },
      {
        id: 'listTimezones',
        name: 'listTimezones',
        description: 'Gets a list of all available IANA timezones, optionally filtered by region',
        signature: 'listTimezones(region?: string): string[]',
        parameters: [
          { name: 'region', type: 'string', required: false, description: 'Optional region filter (e.g., "America", "Europe")' }
        ],
        returns: { type: 'string[]', description: 'Array of IANA timezone identifiers' },
        example: `const timezones = listTimezones('America');`
      }
    ]
  },
  {
    id: 'comparison',
    name: 'Comparison & Validation',
    items: [
      {
        id: 'isBetweenDates',
        name: 'isBetweenDates',
        description: 'Checks if a date falls between two other dates',
        signature: 'isBetweenDates(date: Date | string | number, startDate: Date | string | number, endDate: Date | string | number, inclusive?: boolean): boolean',
        parameters: [
          { name: 'date', type: 'Date | string | number', required: true, description: 'Date to check' },
          { name: 'startDate', type: 'Date | string | number', required: true, description: 'Start of range' },
          { name: 'endDate', type: 'Date | string | number', required: true, description: 'End of range' },
          { name: 'inclusive', type: 'boolean', required: false, description: 'Include boundaries (default: true)' }
        ],
        returns: { type: 'boolean', description: 'True if date is between start and end' },
        example: `const between = isBetweenDates('2025-01-15', '2025-01-01', '2025-01-31');`
      },
      {
        id: 'compareAsc',
        name: 'compareAsc',
        description: 'Compares two dates in ascending order',
        signature: 'compareAsc(dateLeft: Date | string | number, dateRight: Date | string | number): number',
        parameters: [
          { name: 'dateLeft', type: 'Date | string | number', required: true, description: 'First date' },
          { name: 'dateRight', type: 'Date | string | number', required: true, description: 'Second date' }
        ],
        returns: { type: 'number', description: '1 if left > right, -1 if left < right, 0 if equal' },
        example: `const result = compareAsc('2025-01-15', '2025-01-10');`
      },
      {
        id: 'compareDesc',
        name: 'compareDesc',
        description: 'Compares two dates in descending order',
        signature: 'compareDesc(dateLeft: Date | string | number, dateRight: Date | string | number): number',
        parameters: [
          { name: 'dateLeft', type: 'Date | string | number', required: true, description: 'First date' },
          { name: 'dateRight', type: 'Date | string | number', required: true, description: 'Second date' }
        ],
        returns: { type: 'number', description: '1 if left < right, -1 if left > right, 0 if equal' },
        example: `const result = compareDesc('2025-01-15', '2025-01-10');`
      },
      {
        id: 'isDateEqual',
        name: 'isDateEqual',
        description: 'Checks if two dates are exactly equal',
        signature: 'isDateEqual(dateLeft: Date | string | number, dateRight: Date | string | number): boolean',
        parameters: [
          { name: 'dateLeft', type: 'Date | string | number', required: true, description: 'First date' },
          { name: 'dateRight', type: 'Date | string | number', required: true, description: 'Second date' }
        ],
        returns: { type: 'boolean', description: 'True if dates are equal' },
        example: `const equal = isDateEqual('2025-01-15', new Date('2025-01-15'));`
      },
      {
        id: 'isDateBefore',
        name: 'isDateBefore',
        description: 'Checks if first date is before second date',
        signature: 'isDateBefore(date: Date | string | number, dateToCompare: Date | string | number): boolean',
        parameters: [
          { name: 'date', type: 'Date | string | number', required: true, description: 'Date to check' },
          { name: 'dateToCompare', type: 'Date | string | number', required: true, description: 'Date to compare against' }
        ],
        returns: { type: 'boolean', description: 'True if date is before dateToCompare' },
        example: `const before = isDateBefore('2025-01-10', '2025-01-15');`
      },
      {
        id: 'isDateAfter',
        name: 'isDateAfter',
        description: 'Checks if first date is after second date',
        signature: 'isDateAfter(date: Date | string | number, dateToCompare: Date | string | number): boolean',
        parameters: [
          { name: 'date', type: 'Date | string | number', required: true, description: 'Date to check' },
          { name: 'dateToCompare', type: 'Date | string | number', required: true, description: 'Date to compare against' }
        ],
        returns: { type: 'boolean', description: 'True if date is after dateToCompare' },
        example: `const after = isDateAfter('2025-01-20', '2025-01-15');`
      },
      {
        id: 'isWithinRange',
        name: 'isWithinRange',
        description: 'Checks if a date is within a specified range',
        signature: 'isWithinRange(date: Date | string | number, range: DateRange): boolean',
        parameters: [
          { name: 'date', type: 'Date | string | number', required: true, description: 'Date to check' },
          { name: 'range', type: 'DateRange', required: true, description: 'Date range object with start and end' }
        ],
        returns: { type: 'boolean', description: 'True if date is within range' },
        example: `const withinRange = isWithinRange('2025-01-15', { start: '2025-01-01', end: '2025-01-31' });`
      },
      {
        id: 'validateDateString',
        name: 'validateDateString',
        description: 'Validates if a string represents a valid date',
        signature: 'validateDateString(dateString: string, format?: string): ValidationResult',
        parameters: [
          { name: 'dateString', type: 'string', required: true, description: 'Date string to validate' },
          { name: 'format', type: 'string', required: false, description: 'Expected format (optional)' }
        ],
        returns: { type: 'ValidationResult', description: 'Validation result with details' },
        example: `const valid = validateDateString('2025-01-15');`
      },
      {
        id: 'isValidDate',
        name: 'isValidDate',
        description: 'Checks if a value represents a valid date',
        signature: 'isValidDate(date: any): boolean',
        parameters: [
          { name: 'date', type: 'any', required: true, description: 'Value to check' }
        ],
        returns: { type: 'boolean', description: 'True if valid date' },
        example: `const valid = isValidDate(new Date());`
      },
      {
        id: 'isLeapYear',
        name: 'isLeapYear',
        description: 'Checks if a given year is a leap year',
        signature: 'isLeapYear(year: number): boolean',
        parameters: [
          { name: 'year', type: 'number', required: true, description: 'Year to check' }
        ],
        returns: { type: 'boolean', description: 'True if leap year' },
        example: `const isLeap = isLeapYear(2024);`
      },
      {
        id: 'isDateInFuture',
        name: 'isDateInFuture',
        description: 'Checks if a date is in the future',
        signature: 'isDateInFuture(date: Date | string | number): boolean',
        parameters: [
          { name: 'date', type: 'Date | string | number', required: true, description: 'Date to check' }
        ],
        returns: { type: 'boolean', description: 'True if date is in the future' },
        example: `const inFuture = isDateInFuture('2025-12-31');`
      },
      {
        id: 'isDateInPast',
        name: 'isDateInPast',
        description: 'Checks if a date is in the past',
        signature: 'isDateInPast(date: Date | string | number): boolean',
        parameters: [
          { name: 'date', type: 'Date | string | number', required: true, description: 'Date to check' }
        ],
        returns: { type: 'boolean', description: 'True if date is in the past' },
        example: `const inPast = isDateInPast('2024-01-01');`
      },
      {
        id: 'isToday',
        name: 'isToday',
        description: 'Checks if a date is today',
        signature: 'isToday(date: Date | string | number, timezone?: IANATimezone): boolean',
        parameters: [
          { name: 'date', type: 'Date | string | number', required: true, description: 'Date to check' },
          { name: 'timezone', type: 'IANATimezone', required: false, description: 'Optional timezone' }
        ],
        returns: { type: 'boolean', description: 'True if date is today' },
        example: `const isCurrentDay = isToday(new Date());`
      },
      {
        id: 'isYesterday',
        name: 'isYesterday',
        description: 'Checks if a date was yesterday',
        signature: 'isYesterday(date: Date | string | number, timezone?: IANATimezone): boolean',
        parameters: [
          { name: 'date', type: 'Date | string | number', required: true, description: 'Date to check' },
          { name: 'timezone', type: 'IANATimezone', required: false, description: 'Optional timezone' }
        ],
        returns: { type: 'boolean', description: 'True if date was yesterday' },
        example: `const wasYesterday = isYesterday('2025-01-12');`
      },
      {
        id: 'isTomorrow',
        name: 'isTomorrow',
        description: 'Checks if a date is tomorrow',
        signature: 'isTomorrow(date: Date | string | number, timezone?: IANATimezone): boolean',
        parameters: [
          { name: 'date', type: 'Date | string | number', required: true, description: 'Date to check' },
          { name: 'timezone', type: 'IANATimezone', required: false, description: 'Optional timezone' }
        ],
        returns: { type: 'boolean', description: 'True if date is tomorrow' },
        example: `const willBeTomorrow = isTomorrow('2025-01-14');`
      },
      {
        id: 'isThisWeek',
        name: 'isThisWeek',
        description: 'Checks if a date falls within the current week',
        signature: 'isThisWeek(date: Date | string | number, timezone?: IANATimezone): boolean',
        parameters: [
          { name: 'date', type: 'Date | string | number', required: true, description: 'Date to check' },
          { name: 'timezone', type: 'IANATimezone', required: false, description: 'Optional timezone' }
        ],
        returns: { type: 'boolean', description: 'True if date is this week' },
        example: `const thisWeek = isThisWeek('2025-01-15');`
      },
      {
        id: 'isThisMonth',
        name: 'isThisMonth',
        description: 'Checks if a date falls within the current month',
        signature: 'isThisMonth(date: Date | string | number, timezone?: IANATimezone): boolean',
        parameters: [
          { name: 'date', type: 'Date | string | number', required: true, description: 'Date to check' },
          { name: 'timezone', type: 'IANATimezone', required: false, description: 'Optional timezone' }
        ],
        returns: { type: 'boolean', description: 'True if date is this month' },
        example: `const thisMonth = isThisMonth('2025-01-15');`
      },
      {
        id: 'isThisYear',
        name: 'isThisYear',
        description: 'Checks if a date falls within the current year',
        signature: 'isThisYear(date: Date | string | number, timezone?: IANATimezone): boolean',
        parameters: [
          { name: 'date', type: 'Date | string | number', required: true, description: 'Date to check' },
          { name: 'timezone', type: 'IANATimezone', required: false, description: 'Optional timezone' }
        ],
        returns: { type: 'boolean', description: 'True if date is this year' },
        example: `const thisYear = isThisYear('2025-01-15');`
      },
      {
        id: 'isSameDay',
        name: 'isSameDay',
        description: 'Checks if two dates are on the same day',
        signature: 'isSameDay(dateLeft: Date | string | number, dateRight: Date | string | number): boolean',
        parameters: [
          { name: 'dateLeft', type: 'Date | string | number', required: true, description: 'First date' },
          { name: 'dateRight', type: 'Date | string | number', required: true, description: 'Second date' }
        ],
        returns: { type: 'boolean', description: 'True if both dates are on the same day' },
        example: `const sameDay = isSameDay('2025-01-15 10:00', '2025-01-15 20:00');`
      },
      {
        id: 'isSameWeek',
        name: 'isSameWeek',
        description: 'Checks if two dates are in the same week',
        signature: 'isSameWeek(dateLeft: Date | string | number, dateRight: Date | string | number): boolean',
        parameters: [
          { name: 'dateLeft', type: 'Date | string | number', required: true, description: 'First date' },
          { name: 'dateRight', type: 'Date | string | number', required: true, description: 'Second date' }
        ],
        returns: { type: 'boolean', description: 'True if both dates are in the same week' },
        example: `const sameWeek = isSameWeek('2025-01-13', '2025-01-17');`
      },
      {
        id: 'isSameMonth',
        name: 'isSameMonth',
        description: 'Checks if two dates are in the same month',
        signature: 'isSameMonth(dateLeft: Date | string | number, dateRight: Date | string | number): boolean',
        parameters: [
          { name: 'dateLeft', type: 'Date | string | number', required: true, description: 'First date' },
          { name: 'dateRight', type: 'Date | string | number', required: true, description: 'Second date' }
        ],
        returns: { type: 'boolean', description: 'True if both dates are in the same month' },
        example: `const sameMonth = isSameMonth('2025-01-01', '2025-01-31');`
      },
      {
        id: 'isSameYear',
        name: 'isSameYear',
        description: 'Checks if two dates are in the same year',
        signature: 'isSameYear(dateLeft: Date | string | number, dateRight: Date | string | number): boolean',
        parameters: [
          { name: 'dateLeft', type: 'Date | string | number', required: true, description: 'First date' },
          { name: 'dateRight', type: 'Date | string | number', required: true, description: 'Second date' }
        ],
        returns: { type: 'boolean', description: 'True if both dates are in the same year' },
        example: `const sameYear = isSameYear('2025-01-01', '2025-12-31');`
      },
      {
        id: 'findEarliest',
        name: 'findEarliest',
        description: 'Finds the earliest date from an array of dates',
        signature: 'findEarliest(dates: (Date | string | number)[]): Date | null',
        parameters: [
          { name: 'dates', type: '(Date | string | number)[]', required: true, description: 'Array of dates to compare' }
        ],
        returns: { type: 'Date | null', description: 'Earliest date or null if array is empty' },
        example: `const earliest = findEarliest(['2025-01-15', '2025-01-10', '2025-01-20']);`
      },
      {
        id: 'findLatest',
        name: 'findLatest',
        description: 'Finds the latest date from an array of dates',
        signature: 'findLatest(dates: (Date | string | number)[]): Date | null',
        parameters: [
          { name: 'dates', type: '(Date | string | number)[]', required: true, description: 'Array of dates to compare' }
        ],
        returns: { type: 'Date | null', description: 'Latest date or null if array is empty' },
        example: `const latest = findLatest(['2025-01-15', '2025-01-10', '2025-01-20']);`
      },
      {
        id: 'findClosestDate',
        name: 'findClosestDate',
        description: 'Finds the date closest to a target date from an array',
        signature: 'findClosestDate(targetDate: Date | string | number, dates: (Date | string | number)[]): Date | null',
        parameters: [
          { name: 'targetDate', type: 'Date | string | number', required: true, description: 'Target date to find closest match for' },
          { name: 'dates', type: '(Date | string | number)[]', required: true, description: 'Array of dates to search' }
        ],
        returns: { type: 'Date | null', description: 'Closest date or null if array is empty' },
        example: `const closest = findClosestDate('2025-01-15', ['2025-01-10', '2025-01-20', '2025-01-12']);`
      }
    ]
  },
  {
    id: 'utilities',
    name: 'Utility Functions',
    items: [
      {
        id: 'getConfigs',
        name: 'getConfigs',
        description: 'Gets current ChronoUtilz configuration settings',
        signature: 'getConfigs(): ChronoUtilzConfig',
        parameters: [],
        returns: { type: 'ChronoUtilzConfig', description: 'Current configuration object' },
        example: `const config = getConfigs();`
      },
      {
        id: 'setConfigs',
        name: 'setConfigs',
        description: 'Updates ChronoUtilz configuration settings',
        signature: 'setConfigs(config: Partial<ChronoUtilzConfig>): void',
        parameters: [
          { name: 'config', type: 'Partial<ChronoUtilzConfig>', required: true, description: 'Configuration updates to apply' }
        ],
        returns: { type: 'void', description: 'No return value' },
        example: `setConfigs({ defaultTimezone: 'America/New_York' });`
      },
      {
        id: 'resetConfigs',
        name: 'resetConfigs',
        description: 'Resets all configuration settings to defaults',
        signature: 'resetConfigs(): void',
        parameters: [],
        returns: { type: 'void', description: 'No return value' },
        example: `resetConfigs();`
      },
      {
        id: 'getVersion',
        name: 'getVersion',
        description: 'Gets the current version of ChronoUtilz library',
        signature: 'getVersion(): string',
        parameters: [],
        returns: { type: 'string', description: 'Version string (e.g., "1.2.3")' },
        example: `const version = getVersion();`
      },
      {
        id: 'createDateRange',
        name: 'createDateRange',
        description: 'Creates a date range object with validation and utilities',
        signature: 'createDateRange(start: Date | string | number, end: Date | string | number): DateRange',
        parameters: [
          { name: 'start', type: 'Date | string | number', required: true, description: 'Start date of range' },
          { name: 'end', type: 'Date | string | number', required: true, description: 'End date of range' }
        ],
        returns: { type: 'DateRange', description: 'Date range object with utility methods' },
        example: `const range = createDateRange('2025-01-01', '2025-01-31');`
      },
      {
        id: 'cloneDate',
        name: 'cloneDate',
        description: 'Creates a deep copy of a Date object',
        signature: 'cloneDate(date: Date): Date',
        parameters: [
          { name: 'date', type: 'Date', required: true, description: 'Date to clone' }
        ],
        returns: { type: 'Date', description: 'Cloned Date object' },
        example: `const cloned = cloneDate(originalDate);`
      },
      {
        id: 'getQuarter',
        name: 'getQuarter',
        description: 'Gets the quarter (1-4) for a given date',
        signature: 'getQuarter(date: Date | string | number): number',
        parameters: [
          { name: 'date', type: 'Date | string | number', required: true, description: 'The date to get quarter for' }
        ],
        returns: { type: 'number', description: 'Quarter number (1-4)' },
        example: `const quarter = getQuarter(new Date('2025-07-15'));`
      },
      {
        id: 'getDaysInMonth',
        name: 'getDaysInMonth',
        description: 'Gets the number of days in a month for a given year',
        signature: 'getDaysInMonth(year: number, month: number): number',
        parameters: [
          { name: 'year', type: 'number', required: true, description: 'Year' },
          { name: 'month', type: 'number', required: true, description: 'Month (1-12)' }
        ],
        returns: { type: 'number', description: 'Number of days in the month' },
        example: `const days = getDaysInMonth(2025, 2);`
      },
      {
        id: 'getDaysInYear',
        name: 'getDaysInYear',
        description: 'Gets the number of days in a given year (365 or 366 for leap years)',
        signature: 'getDaysInYear(year: number): number',
        parameters: [
          { name: 'year', type: 'number', required: true, description: 'Year to check' }
        ],
        returns: { type: 'number', description: 'Number of days in the year' },
        example: `const daysInYear = getDaysInYear(2024);`
      },
      {
        id: 'getTimezonesByRegion',
        name: 'getTimezonesByRegion',
        description: 'Gets all timezones for a specific geographical region',
        signature: 'getTimezonesByRegion(region: string): IANATimezone[]',
        parameters: [
          { name: 'region', type: 'string', required: true, description: 'Region name (e.g., "America", "Europe", "Asia")' }
        ],
        returns: { type: 'IANATimezone[]', description: 'Array of IANA timezone identifiers for the region' },
        example: `const europeTimezones = getTimezonesByRegion('Europe');`
      }
    ]
  }
])

// Filtered categories based on search
const filteredCategories = computed(() => {
  if (!searchQuery.value) {
    return categories.value
  }
  
  const query = searchQuery.value.toLowerCase()
  return categories.value.map(category => {
    const filteredItems = category.items.filter(item => 
      item.name.toLowerCase().includes(query) || 
      item.description.toLowerCase().includes(query)
    )
    return {
      ...category,
      items: filteredItems
    }
  }).filter(category => category.items.length > 0)
})

// Set up scroll spy
onMounted(() => {
  // This would be implemented for real scroll spy functionality
  console.log('API Documentation view mounted')
})
</script>

<style scoped>
.api-docs-container {
  min-height: calc(100vh - 64px);
}

pre {
  font-family: 'Ubuntu Mono', 'Courier New', Courier, monospace;
  font-size: 0.9rem;
  line-height: 1.4;
}
</style>