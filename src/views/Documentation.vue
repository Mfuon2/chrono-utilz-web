<template>
  <div class="documentation-container">
    <!-- Header -->
    <div class="doc-header bg-white shadow-sm py-6">
      <div class="container mx-auto px-4">
        <h1 class="text-3xl font-bold text-gray-900">ChronoUtilz Documentation</h1>
        <p class="text-gray-600 mt-2">A comprehensive date utility library with 136+ functions for business logic, formatting, and parsing.</p>
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
              placeholder="Search documentation..." 
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
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
            <p class="text-gray-700 mb-4">
              ChronoUtilz is a comprehensive date utility library built on the Three Pillars Architecture with 136+ functions 
              spanning Core Operations, Business Utilities, and Formatting & Parsing. It's designed for serious date manipulation 
              needs in JavaScript and TypeScript applications.
            </p>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div class="border border-gray-200 rounded-lg p-4">
                <h3 class="font-semibold text-lg mb-2">Core Operations</h3>
                <p class="text-gray-600 text-sm">45+ functions for date manipulation & comparison</p>
              </div>
              <div class="border border-gray-200 rounded-lg p-4">
                <h3 class="font-semibold text-lg mb-2">Business Utilities</h3>
                <p class="text-gray-600 text-sm">55+ functions for real-world business logic</p>
              </div>
              <div class="border border-gray-200 rounded-lg p-4">
                <h3 class="font-semibold text-lg mb-2">Formatting & Parsing</h3>
                <p class="text-gray-600 text-sm">35+ functions for advanced presentation</p>
              </div>
            </div>
            
            <div class="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 class="font-semibold text-lg mb-2">API Documentation</h3>
              <p class="text-gray-700 mb-3">
                For detailed information about parameters, return types, and usage examples for all 136+ functions, 
                please refer to our comprehensive API documentation.
              </p>
              <RouterLink 
                to="/api-docs" 
                class="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                View Full API Documentation
              </RouterLink>
            </div>
          </section>

          <!-- Categories Content -->
          <div v-for="category in categories" :key="category.id">
            <section 
              v-if="currentCategory === category.id" 
              :id="category.id" 
              class="mb-12"
            >
              <h2 class="text-2xl font-bold text-gray-900 mb-6">{{ category.name }}</h2>
              
              <div v-for="item in category.items" :key="item.id" class="mb-10">
                <div :id="item.id" class="border-b border-gray-200 pb-4 mb-6">
                  <h3 class="text-xl font-semibold text-gray-900">{{ item.name }}</h3>
                  <p class="text-gray-600 mt-2">{{ item.description }}</p>
                </div>
                
                <div class="bg-gray-50 rounded-lg p-4 mb-4">
                  <h4 class="font-medium text-gray-900 mb-2">Usage</h4>
                  <pre class="bg-gray-900 text-green-200 p-4 rounded-lg overflow-x-auto font-mono">
                    <code>{{ item.usage }}</code>
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
                          <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        </tr>
                      </thead>
                      <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="param in item.parameters" :key="param.name">
                          <td class="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{{ param.name }}</td>
                          <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{{ param.type }}</td>
                          <td class="px-4 py-2 text-sm text-gray-500">{{ param.description }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div v-if="item.returns" class="mb-4">
                  <h4 class="font-medium text-gray-900 mb-2">Returns</h4>
                  <p class="text-gray-700">{{ item.returns }}</p>
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
import { RouterLink } from 'vue-router'

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
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
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
        usage: 'parseDate(input, options)',
        parameters: [
          { name: 'input', type: 'string | number | Date', description: 'The input to parse as a date' },
          { name: 'options', type: 'DateParseOptions', description: 'Parsing options' }
        ],
        returns: 'A Date object or null if invalid and throwError is false',
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
        description: 'Formats a date according to the specified format',
        usage: 'formatDate(date, format, timezone)',
        parameters: [
          { name: 'date', type: 'Date | string | number', description: 'The date to format' },
          { name: 'format', type: 'DateFormat', description: 'The format pattern' },
          { name: 'timezone', type: 'IANATimezone', description: 'Optional timezone' }
        ],
        returns: 'Formatted date string',
        example: `// Format a date
const formatted = formatDate(new Date(), 'YYYY-MM-DD');

// Format with timezone
const formatted = formatDate(new Date(), 'MMM DD, YYYY HH:mm:ss', 'America/New_York');`
      },
      {
        id: 'addTime',
        name: 'addTime',
        description: 'Adds time to a date',
        usage: 'addTime(date, amount, unit, timezone)',
        parameters: [
          { name: 'date', type: 'Date | string | number', description: 'The base date' },
          { name: 'amount', type: 'number', description: 'The amount to add' },
          { name: 'unit', type: 'TimeUnit', description: 'The time unit' },
          { name: 'timezone', type: 'IANATimezone', description: 'Optional timezone (defaults to user\'s timezone)' }
        ],
        returns: 'A new Date with the added time',
        example: `// Add 5 days to a date
const newDate = addTime(new Date(), 5, 'day');

// Add 2 hours in a specific timezone
const newDate = addTime(new Date(), 2, 'hour', 'Europe/London');`
      },
      {
        id: 'subtractTime',
        name: 'subtractTime',
        description: 'Subtracts time from a date',
        usage: 'subtractTime(date, amount, unit, timezone)',
        parameters: [
          { name: 'date', type: 'Date | string | number', description: 'The base date' },
          { name: 'amount', type: 'number', description: 'The amount to subtract' },
          { name: 'unit', type: 'TimeUnit', description: 'The time unit' },
          { name: 'timezone', type: 'IANATimezone', description: 'Optional timezone (defaults to user\'s timezone)' }
        ],
        returns: 'A new Date with the subtracted time',
        example: `// Subtract 3 months from a date
const newDate = subtractTime(new Date(), 3, 'month');

// Subtract 30 minutes
const newDate = subtractTime(new Date(), 30, 'minute');`
      },
      {
        id: 'getDateDiff',
        name: 'getDateDiff',
        description: 'Gets the difference between two dates in the specified unit',
        usage: 'getDateDiff(date1, date2, unit, timezone)',
        parameters: [
          { name: 'date1', type: 'Date | string | number', description: 'The first date' },
          { name: 'date2', type: 'Date | string | number', description: 'The second date' },
          { name: 'unit', type: 'TimeUnit', description: 'The time unit' },
          { name: 'timezone', type: 'IANATimezone', description: 'Optional timezone (defaults to user\'s timezone)' }
        ],
        returns: 'The difference in the specified unit',
        example: `// Get difference in days
const diff = getDateDiff(new Date('2025-01-15'), new Date('2025-01-20'), 'day'); // 5

// Get difference in hours
const diff = getDateDiff(new Date('2025-01-15T10:00:00'), new Date('2025-01-15T15:30:00'), 'hour'); // 5.5`
      },
      {
        id: 'startOf',
        name: 'startOf',
        description: 'Returns the start of a time period (day, week, month, year, etc.)',
        usage: 'startOf(date, unit, timezone)',
        parameters: [
          { name: 'date', type: 'Date | string | number', description: 'The input date' },
          { name: 'unit', type: 'TimeUnit', description: 'The time unit to get start of' },
          { name: 'timezone', type: 'IANATimezone', description: 'Optional timezone' }
        ],
        returns: 'A new Date at the start of the specified unit',
        example: `// Start of day
const startOfDay = startOf(new Date(), 'day');

// Start of month in timezone
const startOfMonth = startOf(new Date(), 'month', 'America/New_York');`
      },
      {
        id: 'endOf',
        name: 'endOf',
        description: 'Returns the end of a time period (day, week, month, year, etc.)',
        usage: 'endOf(date, unit, timezone)',
        parameters: [
          { name: 'date', type: 'Date | string | number', description: 'The input date' },
          { name: 'unit', type: 'TimeUnit', description: 'The time unit to get end of' },
          { name: 'timezone', type: 'IANATimezone', description: 'Optional timezone' }
        ],
        returns: 'A new Date at the end of the specified unit',
        example: `// End of day
const endOfDay = endOf(new Date(), 'day');

// End of year in timezone
const endOfYear = endOf(new Date(), 'year', 'Europe/London');`
      },
      {
        id: 'createDate',
        name: 'createDate',
        description: 'Creates a new Date with specified components',
        usage: 'createDate(year, month, day, hour, minute, second, millisecond, timezone)',
        parameters: [
          { name: 'year', type: 'number', description: 'The year' },
          { name: 'month', type: 'number', description: 'The month (1-12)' },
          { name: 'day', type: 'number', description: 'The day of month' },
          { name: 'hour', type: 'number', description: 'The hour (0-23)' },
          { name: 'minute', type: 'number', description: 'The minute (0-59)' },
          { name: 'second', type: 'number', description: 'The second (0-59)' },
          { name: 'millisecond', type: 'number', description: 'The millisecond (0-999)' },
          { name: 'timezone', type: 'IANATimezone', description: 'Optional timezone' }
        ],
        returns: 'A new Date object with specified components',
        example: `// Create specific date
const date = createDate(2025, 1, 15, 10, 30, 0, 0);

// Create with timezone
const date = createDate(2025, 12, 31, 23, 59, 59, 999, 'UTC');`
      },
      {
        id: 'utcNow',
        name: 'utcNow',
        description: 'Gets the current date and time in UTC',
        usage: 'utcNow()',
        parameters: [],
        returns: 'Current Date in UTC',
        example: `// Get current UTC time
const now = utcNow();`
      },
      {
        id: 'toUTC',
        name: 'toUTC',
        description: 'Converts a date to UTC timezone',
        usage: 'toUTC(date, fromTimezone)',
        parameters: [
          { name: 'date', type: 'Date | string | number', description: 'The date to convert' },
          { name: 'fromTimezone', type: 'IANATimezone', description: 'Source timezone' }
        ],
        returns: 'Date converted to UTC',
        example: `// Convert to UTC
const utcDate = toUTC(new Date(), 'America/New_York');`
      },
      {
        id: 'generateDateRange',
        name: 'generateDateRange',
        description: 'Generates an array of dates between start and end dates',
        usage: 'generateDateRange(startDate, endDate, interval, unit)',
        parameters: [
          { name: 'startDate', type: 'Date | string | number', description: 'Start of range' },
          { name: 'endDate', type: 'Date | string | number', description: 'End of range' },
          { name: 'interval', type: 'number', description: 'Interval between dates' },
          { name: 'unit', type: 'TimeUnit', description: 'Unit for interval' }
        ],
        returns: 'Array of Date objects',
        example: `// Generate daily range
const dates = generateDateRange('2025-01-01', '2025-01-07', 1, 'day');

// Generate weekly range
const dates = generateDateRange('2025-01-01', '2025-02-01', 1, 'week');`
      },
      {
        id: 'getQuarter',
        name: 'getQuarter',
        description: 'Gets the quarter (1-4) for a given date',
        usage: 'getQuarter(date)',
        parameters: [
          { name: 'date', type: 'Date | string | number', description: 'The input date' }
        ],
        returns: 'Quarter number (1-4)',
        example: `// Get quarter
const quarter = getQuarter(new Date('2025-03-15')); // 1
const quarter = getQuarter(new Date('2025-07-15')); // 3`
      },
      {
        id: 'getDayOfYear',
        name: 'getDayOfYear',
        description: 'Gets the day of year (1-366) for a given date',
        usage: 'getDayOfYear(date)',
        parameters: [
          { name: 'date', type: 'Date | string | number', description: 'The input date' }
        ],
        returns: 'Day of year number (1-366)',
        example: `// Get day of year
const dayOfYear = getDayOfYear(new Date('2025-01-01')); // 1
const dayOfYear = getDayOfYear(new Date('2025-12-31')); // 365`
      },
      {
        id: 'getWeekOfYear',
        name: 'getWeekOfYear',
        description: 'Gets the week number of the year for a given date',
        usage: 'getWeekOfYear(date)',
        parameters: [
          { name: 'date', type: 'Date | string | number', description: 'The input date' }
        ],
        returns: 'Week number of year',
        example: `// Get week of year
const week = getWeekOfYear(new Date('2025-01-15')); // 3`
      },
      {
        id: 'getDaysInMonth',
        name: 'getDaysInMonth',
        description: 'Gets the number of days in a month for a given date',
        usage: 'getDaysInMonth(date)',
        parameters: [
          { name: 'date', type: 'Date | string | number', description: 'The input date' }
        ],
        returns: 'Number of days in the month',
        example: `// Get days in month
const days = getDaysInMonth(new Date('2025-02-15')); // 28
const days = getDaysInMonth(new Date('2024-02-15')); // 29 (leap year)`
      },
      {
        id: 'isLeapYear',
        name: 'isLeapYear',
        description: 'Checks if a given year is a leap year',
        usage: 'isLeapYear(date)',
        parameters: [
          { name: 'date', type: 'Date | string | number', description: 'The input date or year' }
        ],
        returns: 'True if leap year, false otherwise',
        example: `// Check leap year
const isLeap = isLeapYear(2024); // true
const isLeap = isLeapYear(2025); // false`
      },
      {
        id: 'getRelativeTime',
        name: 'getRelativeTime',
        description: 'Gets relative time string (e.g., "2 hours ago", "in 3 days")',
        usage: 'getRelativeTime(date, referenceDate)',
        parameters: [
          { name: 'date', type: 'Date | string | number', description: 'The target date' },
          { name: 'referenceDate', type: 'Date | string | number', description: 'Reference date (defaults to now)' }
        ],
        returns: 'Relative time string',
        example: `// Get relative time
const relative = getRelativeTime(new Date('2025-01-01'));
// Output: "2 days ago" or "in 2 days"`
      },
      {
        id: 'cloneDate',
        name: 'cloneDate',
        description: 'Creates a copy of a Date object',
        usage: 'cloneDate(date)',
        parameters: [
          { name: 'date', type: 'Date', description: 'The date to clone' }
        ],
        returns: 'A new Date object copy',
        example: `// Clone a date
const original = new Date();
const clone = cloneDate(original);`
      },
      {
        id: 'getTimestamp',
        name: 'getTimestamp',
        description: 'Gets the timestamp (milliseconds since epoch) for a date',
        usage: 'getTimestamp(date)',
        parameters: [
          { name: 'date', type: 'Date | string | number', description: 'The input date' }
        ],
        returns: 'Timestamp in milliseconds',
        example: `// Get timestamp
const timestamp = getTimestamp(new Date());
const timestamp = getTimestamp('2025-01-15');`
      },
      {
        id: 'fromTimestamp',
        name: 'fromTimestamp',
        description: 'Creates a Date from a timestamp',
        usage: 'fromTimestamp(timestamp)',
        parameters: [
          { name: 'timestamp', type: 'number', description: 'Timestamp in milliseconds' }
        ],
        returns: 'Date object from timestamp',
        example: `// Create date from timestamp
const date = fromTimestamp(1735689600000);`
      },
      {
        id: 'randomDate',
        name: 'randomDate',
        description: 'Generates a random date between two dates',
        usage: 'randomDate(startDate, endDate)',
        parameters: [
          { name: 'startDate', type: 'Date | string | number', description: 'Start of range' },
          { name: 'endDate', type: 'Date | string | number', description: 'End of range' }
        ],
        returns: 'Random Date within range',
        example: `// Generate random date
const random = randomDate('2025-01-01', '2025-12-31');`
      },
      {
        id: 'copyTime',
        name: 'copyTime',
        description: 'Copies time from one date to another date',
        usage: 'copyTime(sourceDate, targetDate)',
        parameters: [
          { name: 'sourceDate', type: 'Date | string | number', description: 'Source date for time' },
          { name: 'targetDate', type: 'Date | string | number', description: 'Target date to copy time to' }
        ],
        returns: 'New Date with copied time',
        example: `// Copy time from one date to another
const result = copyTime('2025-01-01 15:30:00', '2025-12-31');
// Result: 2025-12-31 15:30:00`
      },
      {
        id: 'truncateToUnit',
        name: 'truncateToUnit',
        description: 'Truncates date to specified unit (removes smaller units)',
        usage: 'truncateToUnit(date, unit)',
        parameters: [
          { name: 'date', type: 'Date | string | number', description: 'The input date' },
          { name: 'unit', type: 'TimeUnit', description: 'Unit to truncate to' }
        ],
        returns: 'Date truncated to unit',
        example: `// Truncate to hour
const truncated = truncateToUnit(new Date(), 'hour');
// Removes minutes, seconds, milliseconds`
      },
      {
        id: 'setTime',
        name: 'setTime',
        description: 'Sets specific time components on a date',
        usage: 'setTime(date, hour, minute, second, millisecond)',
        parameters: [
          { name: 'date', type: 'Date | string | number', description: 'The input date' },
          { name: 'hour', type: 'number', description: 'Hour to set' },
          { name: 'minute', type: 'number', description: 'Minute to set' },
          { name: 'second', type: 'number', description: 'Second to set' },
          { name: 'millisecond', type: 'number', description: 'Millisecond to set' }
        ],
        returns: 'New Date with time set',
        example: `// Set time to 2:30 PM
const newDate = setTime(new Date(), 14, 30, 0, 0);`
      },
      {
        id: 'stripTime',
        name: 'stripTime',
        description: 'Removes time component from date (sets to 00:00:00.000)',
        usage: 'stripTime(date)',
        parameters: [
          { name: 'date', type: 'Date | string | number', description: 'The input date' }
        ],
        returns: 'Date with time stripped',
        example: `// Strip time component
const dateOnly = stripTime(new Date());
// Result: date at 00:00:00.000`
      },
      {
        id: 'getMidnight',
        name: 'getMidnight',
        description: 'Gets midnight (00:00:00) for a given date',
        usage: 'getMidnight(date, timezone)',
        parameters: [
          { name: 'date', type: 'Date | string | number', description: 'The input date' },
          { name: 'timezone', type: 'IANATimezone', description: 'Optional timezone' }
        ],
        returns: 'Date at midnight',
        example: `// Get midnight
const midnight = getMidnight(new Date());
const midnight = getMidnight(new Date(), 'America/New_York');`
      },
      {
        id: 'getNoon',
        name: 'getNoon',
        description: 'Gets noon (12:00:00) for a given date',
        usage: 'getNoon(date, timezone)',
        parameters: [
          { name: 'date', type: 'Date | string | number', description: 'The input date' },
          { name: 'timezone', type: 'IANATimezone', description: 'Optional timezone' }
        ],
        returns: 'Date at noon',
        example: `// Get noon
const noon = getNoon(new Date());
const noon = getNoon(new Date(), 'Europe/London');`
      },
      {
        id: 'mergeDateTime',
        name: 'mergeDateTime',
        description: 'Merges date from one Date and time from another',
        usage: 'mergeDateTime(dateSource, timeSource)',
        parameters: [
          { name: 'dateSource', type: 'Date | string | number', description: 'Source for date component' },
          { name: 'timeSource', type: 'Date | string | number', description: 'Source for time component' }
        ],
        returns: 'New Date with merged components',
        example: `// Merge date and time
const merged = mergeDateTime('2025-12-31', '15:30:00');
// Result: 2025-12-31 15:30:00`
      },
      {
        id: 'timeOfDay',
        name: 'timeOfDay',
        description: 'Gets time of day category (morning, afternoon, evening, night)',
        usage: 'timeOfDay(date)',
        parameters: [
          { name: 'date', type: 'Date | string | number', description: 'The input date' }
        ],
        returns: 'Time of day string',
        example: `// Get time of day
const tod = timeOfDay(new Date('2025-01-15 08:00:00')); // "morning"
const tod = timeOfDay(new Date('2025-01-15 15:00:00')); // "afternoon"`
      },
      {
        id: 'getISOWeek',
        name: 'getISOWeek',
        description: 'Gets ISO week number for a date',
        usage: 'getISOWeek(date)',
        parameters: [
          { name: 'date', type: 'Date | string | number', description: 'The input date' }
        ],
        returns: 'ISO week number',
        example: `// Get ISO week
const isoWeek = getISOWeek(new Date('2025-01-15'));`
      },
      {
        id: 'getWeekOfMonth',
        name: 'getWeekOfMonth',
        description: 'Gets week number within the month',
        usage: 'getWeekOfMonth(date)',
        parameters: [
          { name: 'date', type: 'Date | string | number', description: 'The input date' }
        ],
        returns: 'Week number within month',
        example: `// Get week of month
const week = getWeekOfMonth(new Date('2025-01-15')); // 3`
      },
      {
        id: 'getFiscalQuarter',
        name: 'getFiscalQuarter',
        description: 'Gets fiscal quarter for a date',
        usage: 'getFiscalQuarter(date, fiscalYearStart)',
        parameters: [
          { name: 'date', type: 'Date | string | number', description: 'The input date' },
          { name: 'fiscalYearStart', type: 'number', description: 'Fiscal year start month (1-12)' }
        ],
        returns: 'Fiscal quarter number',
        example: `// Get fiscal quarter (fiscal year starts in July)
const fiscalQ = getFiscalQuarter(new Date('2025-03-15'), 7); // Q3`
      },
      {
        id: 'getFiscalYear',
        name: 'getFiscalYear',
        description: 'Gets fiscal year for a date',
        usage: 'getFiscalYear(date, fiscalYearStart)',
        parameters: [
          { name: 'date', type: 'Date | string | number', description: 'The input date' },
          { name: 'fiscalYearStart', type: 'number', description: 'Fiscal year start month (1-12)' }
        ],
        returns: 'Fiscal year',
        example: `// Get fiscal year (fiscal year starts in July)
const fiscalYear = getFiscalYear(new Date('2025-03-15'), 7); // 2024`
      },
      {
        id: 'getPayPeriods',
        name: 'getPayPeriods',
        description: 'Generates pay periods for a date range',
        usage: 'getPayPeriods(startDate, endDate, frequency)',
        parameters: [
          { name: 'startDate', type: 'Date | string | number', description: 'Start date' },
          { name: 'endDate', type: 'Date | string | number', description: 'End date' },
          { name: 'frequency', type: 'string', description: 'Pay frequency (weekly, biweekly, monthly)' }
        ],
        returns: 'Array of pay period objects',
        example: `// Get biweekly pay periods
const periods = getPayPeriods('2025-01-01', '2025-12-31', 'biweekly');`
      },
      {
        id: 'getSeason',
        name: 'getSeason',
        description: 'Gets the season for a given date',
        usage: 'getSeason(date, hemisphere)',
        parameters: [
          { name: 'date', type: 'Date | string | number', description: 'The input date' },
          { name: 'hemisphere', type: 'string', description: 'Hemisphere (north/south)' }
        ],
        returns: 'Season name',
        example: `// Get season
const season = getSeason(new Date('2025-03-15'), 'north'); // "spring"
const season = getSeason(new Date('2025-03-15'), 'south'); // "autumn"`
      },
      {
        id: 'getMonthName',
        name: 'getMonthName',
        description: 'Gets month name for a date',
        usage: 'getMonthName(date, locale)',
        parameters: [
          { name: 'date', type: 'Date | string | number', description: 'The input date' },
          { name: 'locale', type: 'string', description: 'Locale for month name' }
        ],
        returns: 'Month name string',
        example: `// Get month name
const month = getMonthName(new Date('2025-03-15')); // "March"
const month = getMonthName(new Date('2025-03-15'), 'es'); // "marzo"`
      },
      {
        id: 'getMonthsInQuarter',
        name: 'getMonthsInQuarter',
        description: 'Gets array of months in a quarter',
        usage: 'getMonthsInQuarter(quarter)',
        parameters: [
          { name: 'quarter', type: 'number', description: 'Quarter number (1-4)' }
        ],
        returns: 'Array of month numbers',
        example: `// Get months in quarter
const months = getMonthsInQuarter(1); // [1, 2, 3] (Jan, Feb, Mar)`
      },
      {
        id: 'nextOccurrence',
        name: 'nextOccurrence',
        description: 'Finds next occurrence of a specific day/date pattern',
        usage: 'nextOccurrence(date, pattern)',
        parameters: [
          { name: 'date', type: 'Date | string | number', description: 'Reference date' },
          { name: 'pattern', type: 'string | object', description: 'Pattern to match (e.g., "friday", {day: 15})' }
        ],
        returns: 'Next matching date',
        example: `// Next Friday
const nextFri = nextOccurrence(new Date(), 'friday');

// Next 15th of month
const next15th = nextOccurrence(new Date(), {day: 15});`
      },
      {
        id: 'previousOccurrence',
        name: 'previousOccurrence',
        description: 'Finds previous occurrence of a specific day/date pattern',
        usage: 'previousOccurrence(date, pattern)',
        parameters: [
          { name: 'date', type: 'Date | string | number', description: 'Reference date' },
          { name: 'pattern', type: 'string | object', description: 'Pattern to match (e.g., "monday", {day: 1})' }
        ],
        returns: 'Previous matching date',
        example: `// Previous Monday
const prevMon = previousOccurrence(new Date(), 'monday');

// Previous 1st of month
const prev1st = previousOccurrence(new Date(), {day: 1});`
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
        description: 'Calculates business days between two dates (excluding weekends and optionally holidays)',
        usage: 'getBusinessDays(startDate, endDate, holidays)',
        parameters: [
          { name: 'startDate', type: 'Date | string', description: 'Start date' },
          { name: 'endDate', type: 'Date | string', description: 'End date' },
          { name: 'holidays', type: '(Date | string)[]', description: 'Optional array of holiday dates to exclude' }
        ],
        returns: 'Number of business days between dates',
        example: `// Calculate business days between two dates
const workDays = getBusinessDays('2025-05-01', '2025-05-15');

// With holidays
const workDays = getBusinessDays('2025-05-01', '2025-05-15', ['2025-05-05']);`
      },
      {
        id: 'addBusinessDays',
        name: 'addBusinessDays',
        description: 'Adds the specified number of business days to a date',
        usage: 'addBusinessDays(date, businessDays, timezone)',
        parameters: [
          { name: 'date', type: 'Date | string | number', description: 'The starting date' },
          { name: 'businessDays', type: 'number', description: 'Number of business days to add' },
          { name: 'timezone', type: 'IANATimezone', description: 'Optional timezone (defaults to user\'s timezone)' }
        ],
        returns: 'A new date with business days added',
        example: `// Add 5 business days to Friday, Jan 5, 2024
const newDate = addBusinessDays(new Date('2024-01-05'), 5);
// Returns: Friday, Jan 12, 2024 (skips weekends)`
      },
      {
        id: 'isBusinessDay',
        name: 'isBusinessDay',
        description: 'Checks if a date is a business day (weekday and not a holiday)',
        usage: 'isBusinessDay(date)',
        parameters: [
          { name: 'date', type: 'Date | string | number', description: 'The date to check' }
        ],
        returns: 'True if the date is a business day',
        example: `// Check if a date is a business day
const isWorkDay = isBusinessDay(new Date('2024-01-08')); // true (Monday, not holiday)
const isWorkDay = isBusinessDay(new Date('2024-01-01')); // false (New Year's Day)`
      },
      {
        id: 'calculateAge',
        name: 'calculateAge',
        description: 'Calculates age in years from a birth date',
        usage: 'calculateAge(birthDate, referenceDate)',
        parameters: [
          { name: 'birthDate', type: 'Date | string | number', description: 'The birth date' },
          { name: 'referenceDate', type: 'Date | string | number', description: 'Reference date (defaults to today)' }
        ],
        returns: 'Age in years',
        example: `// Calculate age
const age = calculateAge('1990-05-15'); // Age as of today
const age = calculateAge('1990-05-15', '2025-01-01'); // Age as of specific date`
      },
      {
        id: 'configureWorkingDays',
        name: 'configureWorkingDays',
        description: 'Configures which days are considered working days',
        usage: 'configureWorkingDays(workingDays)',
        parameters: [
          { name: 'workingDays', type: 'number[]', description: 'Array of working day numbers (0=Sunday, 1=Monday, etc.)' }
        ],
        returns: 'Configuration object',
        example: `// Configure working days (Monday-Friday)
configureWorkingDays([1, 2, 3, 4, 5]);

// Configure working days (Sunday-Thursday)
configureWorkingDays([0, 1, 2, 3, 4]);`
      },
      {
        id: 'configureHolidays',
        name: 'configureHolidays',
        description: 'Configures holiday dates for business day calculations',
        usage: 'configureHolidays(holidays)',
        parameters: [
          { name: 'holidays', type: '(Date | string)[]', description: 'Array of holiday dates' }
        ],
        returns: 'Configuration object',
        example: `// Configure holidays
configureHolidays([
  '2025-01-01', // New Year's Day
  '2025-07-04', // Independence Day
  '2025-12-25'  // Christmas
]);`
      },
      {
        id: 'getBusinessDayConfig',
        name: 'getBusinessDayConfig',
        description: 'Gets current business day configuration',
        usage: 'getBusinessDayConfig()',
        parameters: [],
        returns: 'Current business day configuration',
        example: `// Get configuration
const config = getBusinessDayConfig();
// Returns: { workingDays: [1,2,3,4,5], holidays: [...] }`
      },
      {
        id: 'resetBusinessDayConfig',
        name: 'resetBusinessDayConfig',
        description: 'Resets business day configuration to defaults',
        usage: 'resetBusinessDayConfig()',
        parameters: [],
        returns: 'Default configuration',
        example: `// Reset to defaults
resetBusinessDayConfig();`
      },
      {
        id: 'isWeekend',
        name: 'isWeekend',
        description: 'Checks if a date falls on a weekend',
        usage: 'isWeekend(date)',
        parameters: [
          { name: 'date', type: 'Date | string | number', description: 'The date to check' }
        ],
        returns: 'True if weekend, false otherwise',
        example: `// Check weekend
const weekend = isWeekend(new Date('2025-01-11')); // true (Saturday)
const weekend = isWeekend(new Date('2025-01-13')); // false (Monday)`
      },
      {
        id: 'isWeekday',
        name: 'isWeekday',
        description: 'Checks if a date falls on a weekday',
        usage: 'isWeekday(date)',
        parameters: [
          { name: 'date', type: 'Date | string | number', description: 'The date to check' }
        ],
        returns: 'True if weekday, false otherwise',
        example: `// Check weekday
const weekday = isWeekday(new Date('2025-01-13')); // true (Monday)
const weekday = isWeekday(new Date('2025-01-11')); // false (Saturday)`
      },
      {
        id: 'subtractBusinessDays',
        name: 'subtractBusinessDays',
        description: 'Subtracts business days from a date',
        usage: 'subtractBusinessDays(date, businessDays, timezone)',
        parameters: [
          { name: 'date', type: 'Date | string | number', description: 'The starting date' },
          { name: 'businessDays', type: 'number', description: 'Number of business days to subtract' },
          { name: 'timezone', type: 'IANATimezone', description: 'Optional timezone' }
        ],
        returns: 'Date with business days subtracted',
        example: `// Subtract 5 business days
const newDate = subtractBusinessDays(new Date('2025-01-15'), 5);`
      },
      {
        id: 'getNextBusinessDay',
        name: 'getNextBusinessDay',
        description: 'Gets the next business day after a given date',
        usage: 'getNextBusinessDay(date, timezone)',
        parameters: [
          { name: 'date', type: 'Date | string | number', description: 'The reference date' },
          { name: 'timezone', type: 'IANATimezone', description: 'Optional timezone' }
        ],
        returns: 'Next business day',
        example: `// Get next business day
const nextBD = getNextBusinessDay(new Date('2025-01-10')); // Friday -> Monday`
      },
      {
        id: 'getPreviousBusinessDay',
        name: 'getPreviousBusinessDay',
        description: 'Gets the previous business day before a given date',
        usage: 'getPreviousBusinessDay(date, timezone)',
        parameters: [
          { name: 'date', type: 'Date | string | number', description: 'The reference date' },
          { name: 'timezone', type: 'IANATimezone', description: 'Optional timezone' }
        ],
        returns: 'Previous business day',
        example: `// Get previous business day
const prevBD = getPreviousBusinessDay(new Date('2025-01-13')); // Monday -> Friday`
      },
      {
        id: 'businessDaysInMonth',
        name: 'businessDaysInMonth',
        description: 'Calculates total business days in a month',
        usage: 'businessDaysInMonth(date)',
        parameters: [
          { name: 'date', type: 'Date | string | number', description: 'Date in the target month' }
        ],
        returns: 'Number of business days in month',
        example: `// Business days in January 2025
const count = businessDaysInMonth(new Date('2025-01-15')); // 23`
      },
      {
        id: 'differenceInBusinessDays',
        name: 'differenceInBusinessDays',
        description: 'Calculates difference in business days between two dates',
        usage: 'differenceInBusinessDays(startDate, endDate)',
        parameters: [
          { name: 'startDate', type: 'Date | string | number', description: 'Start date' },
          { name: 'endDate', type: 'Date | string | number', description: 'End date' }
        ],
        returns: 'Difference in business days',
        example: `// Difference in business days
const diff = differenceInBusinessDays('2025-01-01', '2025-01-15'); // 10`
      },
      {
        id: 'isFirstBusinessDayOfMonth',
        name: 'isFirstBusinessDayOfMonth',
        description: 'Checks if date is the first business day of the month',
        usage: 'isFirstBusinessDayOfMonth(date)',
        parameters: [
          { name: 'date', type: 'Date | string | number', description: 'The date to check' }
        ],
        returns: 'True if first business day of month',
        example: `// Check first business day
const isFirst = isFirstBusinessDayOfMonth(new Date('2025-01-02')); // true`
      },
      {
        id: 'isLastBusinessDayOfMonth',
        name: 'isLastBusinessDayOfMonth',
        description: 'Checks if date is the last business day of the month',
        usage: 'isLastBusinessDayOfMonth(date)',
        parameters: [
          { name: 'date', type: 'Date | string | number', description: 'The date to check' }
        ],
        returns: 'True if last business day of month',
        example: `// Check last business day
const isLast = isLastBusinessDayOfMonth(new Date('2025-01-31')); // true`
      },
      {
        id: 'getBusinessDaysInMonth',
        name: 'getBusinessDaysInMonth',
        description: 'Gets array of all business days in a month',
        usage: 'getBusinessDaysInMonth(date)',
        parameters: [
          { name: 'date', type: 'Date | string | number', description: 'Date in the target month' }
        ],
        returns: 'Array of business day dates',
        example: `// Get all business days in month
const businessDays = getBusinessDaysInMonth(new Date('2025-01-15'));`
      },
      {
        id: 'isHoliday',
        name: 'isHoliday',
        description: 'Checks if a date is a configured holiday',
        usage: 'isHoliday(date)',
        parameters: [
          { name: 'date', type: 'Date | string | number', description: 'The date to check' }
        ],
        returns: 'True if holiday, false otherwise',
        example: `// Check if holiday
const holiday = isHoliday(new Date('2025-12-25')); // true (Christmas)`
      },
      {
        id: 'getHolidays',
        name: 'getHolidays',
        description: 'Gets list of configured holidays for a year',
        usage: 'getHolidays(year)',
        parameters: [
          { name: 'year', type: 'number', description: 'The target year' }
        ],
        returns: 'Array of holiday dates',
        example: `// Get holidays for 2025
const holidays = getHolidays(2025);`
      },
      {
        id: 'addHolidayRules',
        name: 'addHolidayRules',
        description: 'Adds recurring holiday rules',
        usage: 'addHolidayRules(rules)',
        parameters: [
          { name: 'rules', type: 'object[]', description: 'Array of holiday rule objects' }
        ],
        returns: 'Updated holiday configuration',
        example: `// Add holiday rules
addHolidayRules([
  { name: 'Christmas', month: 12, day: 25 },
  { name: 'New Year', month: 1, day: 1 }
]);`
      },
      {
        id: 'getNextHoliday',
        name: 'getNextHoliday',
        description: 'Gets the next holiday after a given date',
        usage: 'getNextHoliday(date)',
        parameters: [
          { name: 'date', type: 'Date | string | number', description: 'Reference date' }
        ],
        returns: 'Next holiday date and info',
        example: `// Get next holiday
const nextHoliday = getNextHoliday(new Date('2025-01-15'));`
      },
      {
        id: 'addCustomHolidays',
        name: 'addCustomHolidays',
        description: 'Adds custom holiday dates',
        usage: 'addCustomHolidays(holidays)',
        parameters: [
          { name: 'holidays', type: '(Date | string)[]', description: 'Array of custom holiday dates' }
        ],
        returns: 'Updated holiday list',
        example: `// Add custom holidays
addCustomHolidays(['2025-03-17', '2025-10-31']); // St. Patrick's, Halloween`
      },
      {
        id: 'calculateBusinessDaysCustom',
        name: 'calculateBusinessDaysCustom',
        description: 'Calculates business days with custom working days and holidays',
        usage: 'calculateBusinessDaysCustom(startDate, endDate, workingDays, holidays)',
        parameters: [
          { name: 'startDate', type: 'Date | string | number', description: 'Start date' },
          { name: 'endDate', type: 'Date | string | number', description: 'End date' },
          { name: 'workingDays', type: 'number[]', description: 'Custom working days array' },
          { name: 'holidays', type: '(Date | string)[]', description: 'Custom holidays array' }
        ],
        returns: 'Number of business days',
        example: `// Custom calculation
const days = calculateBusinessDaysCustom(
  '2025-01-01', '2025-01-31',
  [1, 2, 3, 4, 5], // Mon-Fri
  ['2025-01-01', '2025-01-20'] // Custom holidays
);`
      },
      {
        id: 'getWorkingHoursBetween',
        name: 'getWorkingHoursBetween',
        description: 'Calculates working hours between two dates',
        usage: 'getWorkingHoursBetween(startDate, endDate, hoursPerDay)',
        parameters: [
          { name: 'startDate', type: 'Date | string | number', description: 'Start date/time' },
          { name: 'endDate', type: 'Date | string | number', description: 'End date/time' },
          { name: 'hoursPerDay', type: 'number', description: 'Working hours per day (default 8)' }
        ],
        returns: 'Total working hours',
        example: `// Get working hours
const hours = getWorkingHoursBetween(
  '2025-01-01 09:00', '2025-01-05 17:00', 8
);`
      },
      {
        id: 'addWorkingHours',
        name: 'addWorkingHours',
        description: 'Adds working hours to a date',
        usage: 'addWorkingHours(date, hours, workingHours)',
        parameters: [
          { name: 'date', type: 'Date | string | number', description: 'Starting date/time' },
          { name: 'hours', type: 'number', description: 'Hours to add' },
          { name: 'workingHours', type: 'object', description: 'Working hours configuration' }
        ],
        returns: 'Date after adding working hours',
        example: `// Add 16 working hours
const result = addWorkingHours(
  '2025-01-01 09:00', 16,
  { start: 9, end: 17, daysPerWeek: 5 }
);`
      },
      {
        id: 'isWorkingHours',
        name: 'isWorkingHours',
        description: 'Checks if a time falls within working hours',
        usage: 'isWorkingHours(date, workingHours)',
        parameters: [
          { name: 'date', type: 'Date | string | number', description: 'Date/time to check' },
          { name: 'workingHours', type: 'object', description: 'Working hours configuration' }
        ],
        returns: 'True if within working hours',
        example: `// Check working hours
const isWorking = isWorkingHours(
  '2025-01-01 14:30',
  { start: 9, end: 17 }
); // true`
      },
      {
        id: 'getNextWorkingHour',
        name: 'getNextWorkingHour',
        description: 'Gets the next working hour after a given time',
        usage: 'getNextWorkingHour(date, workingHours)',
        parameters: [
          { name: 'date', type: 'Date | string | number', description: 'Reference date/time' },
          { name: 'workingHours', type: 'object', description: 'Working hours configuration' }
        ],
        returns: 'Next working hour date/time',
        example: `// Get next working hour
const nextWorking = getNextWorkingHour(
  '2025-01-01 18:00', // After hours
  { start: 9, end: 17 }
); // Next day at 9:00 AM`
      },
      {
        id: 'getWeekBoundaries',
        name: 'getWeekBoundaries',
        description: 'Gets start and end dates of the week containing a date',
        usage: 'getWeekBoundaries(date, startOfWeek)',
        parameters: [
          { name: 'date', type: 'Date | string | number', description: 'Date within the week' },
          { name: 'startOfWeek', type: 'number', description: 'Start of week (0=Sunday, 1=Monday)' }
        ],
        returns: 'Object with start and end dates',
        example: `// Get week boundaries
const week = getWeekBoundaries(new Date('2025-01-15'), 1); // Monday start
// Returns: { start: Date, end: Date }`
      },
      {
        id: 'getMonthBoundaries',
        name: 'getMonthBoundaries',
        description: 'Gets start and end dates of the month containing a date',
        usage: 'getMonthBoundaries(date)',
        parameters: [
          { name: 'date', type: 'Date | string | number', description: 'Date within the month' }
        ],
        returns: 'Object with start and end dates',
        example: `// Get month boundaries
const month = getMonthBoundaries(new Date('2025-01-15'));
// Returns: { start: '2025-01-01', end: '2025-01-31' }`
      },
      {
        id: 'getYearBoundaries',
        name: 'getYearBoundaries',
        description: 'Gets start and end dates of the year containing a date',
        usage: 'getYearBoundaries(date)',
        parameters: [
          { name: 'date', type: 'Date | string | number', description: 'Date within the year' }
        ],
        returns: 'Object with start and end dates',
        example: `// Get year boundaries
const year = getYearBoundaries(new Date('2025-06-15'));
// Returns: { start: '2025-01-01', end: '2025-12-31' }`
      },
      {
        id: 'getQuarterBoundaries',
        name: 'getQuarterBoundaries',
        description: 'Gets start and end dates of the quarter containing a date',
        usage: 'getQuarterBoundaries(date)',
        parameters: [
          { name: 'date', type: 'Date | string | number', description: 'Date within the quarter' }
        ],
        returns: 'Object with start and end dates',
        example: `// Get quarter boundaries
const quarter = getQuarterBoundaries(new Date('2025-02-15'));
// Returns: { start: '2025-01-01', end: '2025-03-31' } (Q1)`
      },
      {
        id: 'calculateBusinessDaysAdvanced',
        name: 'calculateBusinessDaysAdvanced',
        description: 'Advanced business days calculation with complex rules',
        usage: 'calculateBusinessDaysAdvanced(startDate, endDate, options)',
        parameters: [
          { name: 'startDate', type: 'Date | string | number', description: 'Start date' },
          { name: 'endDate', type: 'Date | string | number', description: 'End date' },
          { name: 'options', type: 'object', description: 'Advanced options (working days, holidays, partial days)' }
        ],
        returns: 'Detailed business days calculation',
        example: `// Advanced calculation
const result = calculateBusinessDaysAdvanced(
  '2025-01-01', '2025-01-31',
  {
    workingDays: [1, 2, 3, 4, 5],
    holidays: ['2025-01-01'],
    includePartialDays: true,
    workingHours: { start: 9, end: 17 }
  }
);`
      },
      {
        id: 'getNthWeekdayOfMonth',
        name: 'getNthWeekdayOfMonth',
        description: 'Gets the Nth occurrence of a weekday in a month',
        usage: 'getNthWeekdayOfMonth(year, month, weekday, occurrence)',
        parameters: [
          { name: 'year', type: 'number', description: 'The year' },
          { name: 'month', type: 'number', description: 'The month (1-12)' },
          { name: 'weekday', type: 'number', description: 'Weekday (0=Sunday, 1=Monday, etc.)' },
          { name: 'occurrence', type: 'number', description: 'Which occurrence (1st, 2nd, 3rd, etc.)' }
        ],
        returns: 'Date of Nth weekday occurrence',
        example: `// Get 2nd Monday of March 2025
const date = getNthWeekdayOfMonth(2025, 3, 1, 2);

// Get 3rd Friday of December 2025
const date = getNthWeekdayOfMonth(2025, 12, 5, 3);`
      },
      {
        id: 'getFiscalPeriodAdvanced',
        name: 'getFiscalPeriodAdvanced',
        description: 'Gets detailed fiscal period information',
        usage: 'getFiscalPeriodAdvanced(date, fiscalConfig)',
        parameters: [
          { name: 'date', type: 'Date | string | number', description: 'Date to analyze' },
          { name: 'fiscalConfig', type: 'object', description: 'Fiscal year configuration' }
        ],
        returns: 'Detailed fiscal period info',
        example: `// Get fiscal period info
const fiscal = getFiscalPeriodAdvanced(
  '2025-03-15',
  { yearStart: 7, quarters: 4 }
);
// Returns: { year, quarter, period, startDate, endDate }`
      },
      {
        id: 'calculateWorkingHours',
        name: 'calculateWorkingHours',
        description: 'Calculates working hours with detailed configuration',
        usage: 'calculateWorkingHours(startDate, endDate, config)',
        parameters: [
          { name: 'startDate', type: 'Date | string | number', description: 'Start date/time' },
          { name: 'endDate', type: 'Date | string | number', description: 'End date/time' },
          { name: 'config', type: 'object', description: 'Working hours configuration' }
        ],
        returns: 'Detailed working hours breakdown',
        example: `// Calculate working hours
const hours = calculateWorkingHours(
  '2025-01-01 09:00', '2025-01-05 17:00',
  {
    dailyHours: 8,
    workingDays: [1, 2, 3, 4, 5],
    breaks: [{ start: 12, end: 13 }]
  }
);`
      },
      {
        id: 'generatePayrollPeriods',
        name: 'generatePayrollPeriods',
        description: 'Generates payroll periods for a date range',
        usage: 'generatePayrollPeriods(startDate, endDate, frequency, options)',
        parameters: [
          { name: 'startDate', type: 'Date | string | number', description: 'Start date' },
          { name: 'endDate', type: 'Date | string | number', description: 'End date' },
          { name: 'frequency', type: 'string', description: 'Payroll frequency' },
          { name: 'options', type: 'object', description: 'Additional options' }
        ],
        returns: 'Array of payroll periods',
        example: `// Generate biweekly payroll
const periods = generatePayrollPeriods(
  '2025-01-01', '2025-12-31', 'biweekly',
  { adjustForHolidays: true }
);`
      },
      {
        id: 'calculateProjectMilestones',
        name: 'calculateProjectMilestones',
        description: 'Calculates project milestones based on business days',
        usage: 'calculateProjectMilestones(startDate, tasks, options)',
        parameters: [
          { name: 'startDate', type: 'Date | string | number', description: 'Project start date' },
          { name: 'tasks', type: 'object[]', description: 'Array of task objects with durations' },
          { name: 'options', type: 'object', description: 'Project options' }
        ],
        returns: 'Array of milestone dates',
        example: `// Calculate milestones
const milestones = calculateProjectMilestones(
  '2025-01-01',
  [
    { name: 'Design', duration: 10 },
    { name: 'Development', duration: 30 },
    { name: 'Testing', duration: 15 }
  ],
  { unit: 'business_days' }
);`
      },
      {
        id: 'generateBusinessCalendar',
        name: 'generateBusinessCalendar',
        description: 'Generates a business calendar with working days and holidays',
        usage: 'generateBusinessCalendar(year, options)',
        parameters: [
          { name: 'year', type: 'number', description: 'Calendar year' },
          { name: 'options', type: 'object', description: 'Calendar options' }
        ],
        returns: 'Business calendar object',
        example: `// Generate business calendar
const calendar = generateBusinessCalendar(2025, {
  workingDays: [1, 2, 3, 4, 5],
  holidays: 'US',
  includeObservedHolidays: true
});`
      },
      {
        id: 'calculateOvertime',
        name: 'calculateOvertime',
        description: 'Calculates overtime hours based on worked hours',
        usage: 'calculateOvertime(workedHours, standardHours, overtimeRules)',
        parameters: [
          { name: 'workedHours', type: 'number', description: 'Total hours worked' },
          { name: 'standardHours', type: 'number', description: 'Standard hours threshold' },
          { name: 'overtimeRules', type: 'object', description: 'Overtime calculation rules' }
        ],
        returns: 'Overtime breakdown',
        example: `// Calculate overtime
const overtime = calculateOvertime(45, 40, {
  dailyOvertimeAfter: 8,
  weeklyOvertimeAfter: 40,
  doubleTimeAfter: 12
});`
      },
      {
        id: 'generateShiftSchedule',
        name: 'generateShiftSchedule',
        description: 'Generates shift schedules for workers',
        usage: 'generateShiftSchedule(startDate, endDate, shifts, workers)',
        parameters: [
          { name: 'startDate', type: 'Date | string | number', description: 'Schedule start date' },
          { name: 'endDate', type: 'Date | string | number', description: 'Schedule end date' },
          { name: 'shifts', type: 'object[]', description: 'Shift definitions' },
          { name: 'workers', type: 'string[]', description: 'Worker list' }
        ],
        returns: 'Shift schedule object',
        example: `// Generate shift schedule
const schedule = generateShiftSchedule(
  '2025-01-01', '2025-01-31',
  [
    { name: 'Morning', start: 8, end: 16 },
    { name: 'Evening', start: 16, end: 24 }
  ],
  ['Alice', 'Bob', 'Charlie']
);`
      },
      {
        id: 'calculateSLACompliance',
        name: 'calculateSLACompliance',
        description: 'Calculates SLA compliance based on business hours',
        usage: 'calculateSLACompliance(createdDate, resolvedDate, slaHours, businessHours)',
        parameters: [
          { name: 'createdDate', type: 'Date | string | number', description: 'Issue creation date' },
          { name: 'resolvedDate', type: 'Date | string | number', description: 'Issue resolution date' },
          { name: 'slaHours', type: 'number', description: 'SLA target hours' },
          { name: 'businessHours', type: 'object', description: 'Business hours configuration' }
        ],
        returns: 'SLA compliance information',
        example: `// Calculate SLA compliance
const sla = calculateSLACompliance(
  '2025-01-01 10:00', '2025-01-02 14:00',
  24, // 24-hour SLA
  { workingDays: [1, 2, 3, 4, 5], dailyHours: 8 }
);`
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
        description: 'Gets a human-readable duration string from milliseconds',
        usage: 'formatDuration(milliseconds, options)',
        parameters: [
          { name: 'milliseconds', type: 'number', description: 'The duration in milliseconds' },
          { name: 'options', type: 'Object', description: 'Formatting options' }
        ],
        returns: 'A formatted duration string',
        example: `// "2 days, 4 hours, 30 minutes"
const duration = formatDuration(189000000);

// With options
const duration = formatDuration(189000000, { longFormat: true, maxUnits: 2 });`
      },
      {
        id: 'parseNaturalLanguage',
        name: 'parseNaturalLanguage',
        description: 'Parses natural language time expressions into dates',
        usage: 'parseNaturalLanguage(expression, options)',
        parameters: [
          { name: 'expression', type: 'NaturalTimeExpression', description: 'Natural language expression' },
          { name: 'options', type: 'NaturalLanguageOptions', description: 'Parsing options' }
        ],
        returns: 'Parsed date or null if invalid',
        example: `const tomorrow = parseNaturalLanguage('tomorrow');
// Returns: Date object for tomorrow at 00:00:00

const nextFriday = parseNaturalLanguage('next friday');
// Returns: Date object for next Friday at 00:00:00`
      },
      {
        id: 'formatISO',
        name: 'formatISO',
        description: 'Formats a date in ISO 8601 format',
        usage: 'formatISO(date, options)',
        parameters: [
          { name: 'date', type: 'Date | string | number', description: 'The date to format' },
          { name: 'options', type: 'object', description: 'Formatting options (includeTime, timezone, etc.)' }
        ],
        returns: 'ISO formatted date string',
        example: `// Basic ISO format
const iso = formatISO(new Date('2025-01-15T14:30:00'));
// Returns: "2025-01-15T14:30:00.000Z"

// Date only
const iso = formatISO(new Date('2025-01-15'), { includeTime: false });
// Returns: "2025-01-15"`
      },
      {
        id: 'formatCustom',
        name: 'formatCustom',
        description: 'Formats a date with custom format patterns',
        usage: 'formatCustom(date, pattern, options)',
        parameters: [
          { name: 'date', type: 'Date | string | number', description: 'The date to format' },
          { name: 'pattern', type: 'string', description: 'Custom format pattern' },
          { name: 'options', type: 'object', description: 'Additional formatting options' }
        ],
        returns: 'Custom formatted date string',
        example: `// Custom pattern
const custom = formatCustom(new Date('2025-01-15'), 'DD/MM/YYYY HH:mm');
// Returns: "15/01/2025 00:00"

// With options
const custom = formatCustom(new Date(), 'MMM Do, YYYY [at] h:mm A', {
  locale: 'en-US'
});`
      },
      {
        id: 'formatLocalized',
        name: 'formatLocalized',
        description: 'Formats a date using locale-specific formatting',
        usage: 'formatLocalized(date, locale, options)',
        parameters: [
          { name: 'date', type: 'Date | string | number', description: 'The date to format' },
          { name: 'locale', type: 'string', description: 'Locale identifier (e.g., "en-US", "fr-FR")' },
          { name: 'options', type: 'Intl.DateTimeFormatOptions', description: 'Intl formatting options' }
        ],
        returns: 'Localized formatted date string',
        example: `// US format
const us = formatLocalized(new Date('2025-01-15'), 'en-US');
// Returns: "1/15/2025"

// French format with options
const fr = formatLocalized(new Date('2025-01-15'), 'fr-FR', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});
// Returns: "mercredi 15 janvier 2025"`
      },
      {
        id: 'formatRelativeLocalized',
        name: 'formatRelativeLocalized',
        description: 'Formats relative time in localized format',
        usage: 'formatRelativeLocalized(date, locale, options)',
        parameters: [
          { name: 'date', type: 'Date | string | number', description: 'The target date' },
          { name: 'locale', type: 'string', description: 'Locale identifier' },
          { name: 'options', type: 'object', description: 'Relative formatting options' }
        ],
        returns: 'Localized relative time string',
        example: `// English relative time
const en = formatRelativeLocalized(new Date('2025-01-13'), 'en-US');
// Returns: "2 days ago" or "in 2 days"

// Spanish relative time
const es = formatRelativeLocalized(new Date('2025-01-13'), 'es-ES');
// Returns: "hace 2 días" or "en 2 días"`
      },
      {
        id: 'formatCalendar',
        name: 'formatCalendar',
        description: 'Formats date in calendar style (Today, Yesterday, Tomorrow, etc.)',
        usage: 'formatCalendar(date, referenceDate, options)',
        parameters: [
          { name: 'date', type: 'Date | string | number', description: 'The date to format' },
          { name: 'referenceDate', type: 'Date | string | number', description: 'Reference date (defaults to now)' },
          { name: 'options', type: 'object', description: 'Calendar formatting options' }
        ],
        returns: 'Calendar formatted string',
        example: `// Calendar format
const cal = formatCalendar(new Date('2025-01-15'));
// Returns: "Today", "Tomorrow", "Yesterday", "Last Monday", etc.

// With time
const cal = formatCalendar(new Date('2025-01-14'), new Date('2025-01-15'), {
  includeTime: true
});
// Returns: "Yesterday at 2:30 PM"`
      },
      {
        id: 'formatTimezone',
        name: 'formatTimezone',
        description: 'Formats date with timezone information',
        usage: 'formatTimezone(date, timezone, format)',
        parameters: [
          { name: 'date', type: 'Date | string | number', description: 'The date to format' },
          { name: 'timezone', type: 'IANATimezone', description: 'Target timezone' },
          { name: 'format', type: 'string', description: 'Format pattern' }
        ],
        returns: 'Timezone-aware formatted string',
        example: `// Format with timezone
const tz = formatTimezone(new Date(), 'America/New_York', 'YYYY-MM-DD HH:mm z');
// Returns: "2025-01-15 09:30 EST"

// Multiple timezones
const utc = formatTimezone(new Date(), 'UTC', 'HH:mm [UTC]');
const pst = formatTimezone(new Date(), 'America/Los_Angeles', 'HH:mm [PST]');`
      },
      {
        id: 'humanizeDuration',
        name: 'humanizeDuration',
        description: 'Converts duration to human-readable format',
        usage: 'humanizeDuration(duration, options)',
        parameters: [
          { name: 'duration', type: 'number', description: 'Duration in milliseconds' },
          { name: 'options', type: 'object', description: 'Humanization options' }
        ],
        returns: 'Human-readable duration string',
        example: `// Basic humanization
const human = humanizeDuration(90000); // 1.5 minutes
// Returns: "1 minute"

// With options
const human = humanizeDuration(3661000, {
  largest: 2,
  round: true,
  delimiter: ', '
});
// Returns: "1 hour, 1 minute"`
      },
      {
        id: 'parseISO',
        name: 'parseISO',
        description: 'Parses ISO 8601 date strings',
        usage: 'parseISO(isoString, options)',
        parameters: [
          { name: 'isoString', type: 'string', description: 'ISO 8601 date string' },
          { name: 'options', type: 'object', description: 'Parsing options' }
        ],
        returns: 'Parsed Date object',
        example: `// Parse ISO string
const date = parseISO('2025-01-15T14:30:00.000Z');

// Parse date-only ISO
const date = parseISO('2025-01-15');

// With timezone
const date = parseISO('2025-01-15T14:30:00+05:00');`
      },
      {
        id: 'parseMultipleFormats',
        name: 'parseMultipleFormats',
        description: 'Tries to parse date using multiple format patterns',
        usage: 'parseMultipleFormats(dateString, formats, options)',
        parameters: [
          { name: 'dateString', type: 'string', description: 'Date string to parse' },
          { name: 'formats', type: 'string[]', description: 'Array of format patterns to try' },
          { name: 'options', type: 'object', description: 'Parsing options' }
        ],
        returns: 'Parsed Date object or null',
        example: `// Try multiple formats
const date = parseMultipleFormats('15/01/2025', [
  'DD/MM/YYYY',
  'MM/DD/YYYY',
  'YYYY-MM-DD'
]);

// With more formats
const date = parseMultipleFormats('Jan 15, 2025', [
  'MMM DD, YYYY',
  'DD MMM YYYY',
  'MMMM D, YYYY'
]);`
      },
      {
        id: 'smartParse',
        name: 'smartParse',
        description: 'Intelligently parses various date formats automatically',
        usage: 'smartParse(input, options)',
        parameters: [
          { name: 'input', type: 'string', description: 'Date string in any common format' },
          { name: 'options', type: 'object', description: 'Smart parsing options' }
        ],
        returns: 'Parsed Date object or null',
        example: `// Smart parsing - various formats
const date1 = smartParse('2025-01-15');
const date2 = smartParse('January 15, 2025');
const date3 = smartParse('15/01/2025');
const date4 = smartParse('Jan 15 2025 2:30 PM');

// All return valid Date objects`
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
        description: 'Gets timezone offset in minutes for a specific timezone',
        usage: 'getTimezoneOffset(timezone, date)',
        parameters: [
          { name: 'timezone', type: 'IANATimezone', description: 'IANA timezone identifier' },
          { name: 'date', type: 'Date | string | number', description: 'Date to get offset for (defaults to now)' }
        ],
        returns: 'Offset in minutes from UTC',
        example: `// Get timezone offset
const offset = getTimezoneOffset('America/New_York');
// Returns: -300 (EST) or -240 (EDT)

// For specific date
const offset = getTimezoneOffset('Europe/London', new Date('2025-07-15'));`
      },
      {
        id: 'getTimezoneString',
        name: 'getTimezoneString',
        description: 'Gets human-readable timezone string',
        usage: 'getTimezoneString(timezone, date, format)',
        parameters: [
          { name: 'timezone', type: 'IANATimezone', description: 'IANA timezone identifier' },
          { name: 'date', type: 'Date | string | number', description: 'Reference date' },
          { name: 'format', type: 'string', description: 'Format type (long, short, offset)' }
        ],
        returns: 'Formatted timezone string',
        example: `// Different formats
const long = getTimezoneString('America/New_York', new Date(), 'long');
// Returns: "Eastern Standard Time"

const short = getTimezoneString('America/New_York', new Date(), 'short');
// Returns: "EST"

const offset = getTimezoneString('America/New_York', new Date(), 'offset');
// Returns: "GMT-5"`
      },
      {
        id: 'convertTimezone',
        name: 'convertTimezone',
        description: 'Converts date from one timezone to another',
        usage: 'convertTimezone(date, fromTimezone, toTimezone)',
        parameters: [
          { name: 'date', type: 'Date | string | number', description: 'Date to convert' },
          { name: 'fromTimezone', type: 'IANATimezone', description: 'Source timezone' },
          { name: 'toTimezone', type: 'IANATimezone', description: 'Target timezone' }
        ],
        returns: 'Date converted to target timezone',
        example: `// Convert between timezones
const nyTime = convertTimezone(
  new Date('2025-01-15 15:00'), 
  'America/New_York', 
  'America/Los_Angeles'
);
// Converts 3 PM EST to 12 PM PST

// Convert to UTC
const utc = convertTimezone(new Date(), 'America/New_York', 'UTC');`
      },
      {
        id: 'getTimezoneInfo',
        name: 'getTimezoneInfo',
        description: 'Gets comprehensive timezone information',
        usage: 'getTimezoneInfo(timezone, date)',
        parameters: [
          { name: 'timezone', type: 'IANATimezone', description: 'IANA timezone identifier' },
          { name: 'date', type: 'Date | string | number', description: 'Reference date' }
        ],
        returns: 'Detailed timezone information object',
        example: `// Get timezone info
const info = getTimezoneInfo('America/New_York', new Date());
// Returns: {
//   timezone: 'America/New_York',
//   offset: -300,
//   abbreviation: 'EST',
//   name: 'Eastern Standard Time',
//   isDST: false
// }`
      },
      {
        id: 'listTimezones',
        name: 'listTimezones',
        description: 'Lists available timezones with optional filtering',
        usage: 'listTimezones(filter)',
        parameters: [
          { name: 'filter', type: 'object', description: 'Filter options (region, offset, etc.)' }
        ],
        returns: 'Array of timezone objects',
        example: `// List all timezones
const all = listTimezones();

// Filter by region
const americas = listTimezones({ region: 'America' });

// Filter by offset
const utcPlus5 = listTimezones({ offset: 300 });`
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
        description: 'Checks if a date is between two other dates',
        usage: 'isBetweenDates(date, startDate, endDate, inclusive)',
        parameters: [
          { name: 'date', type: 'Date | string | number', description: 'Date to check' },
          { name: 'startDate', type: 'Date | string | number', description: 'Range start date' },
          { name: 'endDate', type: 'Date | string | number', description: 'Range end date' },
          { name: 'inclusive', type: 'boolean', description: 'Include boundary dates (default true)' }
        ],
        returns: 'True if date is within range',
        example: `// Check if date is in range
const inRange = isBetweenDates(
  new Date('2025-01-15'),
  new Date('2025-01-01'),
  new Date('2025-01-31')
); // true

// Exclusive check
const inRange = isBetweenDates(
  new Date('2025-01-01'),
  new Date('2025-01-01'),
  new Date('2025-01-31'),
  false
); // false`
      },
      {
        id: 'isValidDate',
        name: 'isValidDate',
        description: 'Validates if a value is a valid date',
        usage: 'isValidDate(value)',
        parameters: [
          { name: 'value', type: 'any', description: 'Value to validate' }
        ],
        returns: 'True if value is a valid date',
        example: `// Valid dates
const valid1 = isValidDate(new Date()); // true
const valid2 = isValidDate('2025-01-15'); // true
const valid3 = isValidDate(1735689600000); // true

// Invalid dates
const invalid1 = isValidDate('invalid'); // false
const invalid2 = isValidDate(new Date('invalid')); // false`
      },
      {
        id: 'validateDateFormat',
        name: 'validateDateFormat',
        description: 'Validates if a string matches a specific date format',
        usage: 'validateDateFormat(dateString, format)',
        parameters: [
          { name: 'dateString', type: 'string', description: 'Date string to validate' },
          { name: 'format', type: 'string', description: 'Expected format pattern' }
        ],
        returns: 'True if string matches format',
        example: `// Validate formats
const valid1 = validateDateFormat('2025-01-15', 'YYYY-MM-DD'); // true
const valid2 = validateDateFormat('15/01/2025', 'DD/MM/YYYY'); // true
const invalid = validateDateFormat('2025-01-15', 'DD/MM/YYYY'); // false`
      },
      {
        id: 'minDate',
        name: 'minDate',
        description: 'Finds the earliest date from an array of dates',
        usage: 'minDate(dates)',
        parameters: [
          { name: 'dates', type: '(Date | string | number)[]', description: 'Array of dates' }
        ],
        returns: 'Earliest date',
        example: `// Find minimum date
const earliest = minDate([
  new Date('2025-01-15'),
  new Date('2025-01-10'),
  new Date('2025-01-20')
]);
// Returns: 2025-01-10`
      },
      {
        id: 'maxDate',
        name: 'maxDate',
        description: 'Finds the latest date from an array of dates',
        usage: 'maxDate(dates)',
        parameters: [
          { name: 'dates', type: '(Date | string | number)[]', description: 'Array of dates' }
        ],
        returns: 'Latest date',
        example: `// Find maximum date
const latest = maxDate([
  new Date('2025-01-15'),
  new Date('2025-01-10'),
  new Date('2025-01-20')
]);
// Returns: 2025-01-20`
      },
      {
        id: 'roundToNearest',
        name: 'roundToNearest',
        description: 'Rounds date to nearest time unit',
        usage: 'roundToNearest(date, unit, precision)',
        parameters: [
          { name: 'date', type: 'Date | string | number', description: 'Date to round' },
          { name: 'unit', type: 'TimeUnit', description: 'Time unit to round to' },
          { name: 'precision', type: 'number', description: 'Precision value (e.g., 15 for 15-minute intervals)' }
        ],
        returns: 'Rounded date',
        example: `// Round to nearest 15 minutes
const rounded = roundToNearest(
  new Date('2025-01-15T14:23:00'),
  'minute',
  15
);
// Returns: 2025-01-15T14:30:00

// Round to nearest hour
const rounded = roundToNearest(new Date('2025-01-15T14:23:00'), 'hour');`
      },
      {
        id: 'compareDates',
        name: 'compareDates',
        description: 'Compares two dates and returns comparison result',
        usage: 'compareDates(date1, date2)',
        parameters: [
          { name: 'date1', type: 'Date | string | number', description: 'First date' },
          { name: 'date2', type: 'Date | string | number', description: 'Second date' }
        ],
        returns: 'Comparison result (-1, 0, 1)',
        example: `// Compare dates
const result = compareDates('2025-01-15', '2025-01-20');
// Returns: -1 (date1 is earlier)

const result = compareDates('2025-01-15', '2025-01-15');
// Returns: 0 (dates are equal)

const result = compareDates('2025-01-20', '2025-01-15');
// Returns: 1 (date1 is later)`
      },
      {
        id: 'compareDetailed',
        name: 'compareDetailed',
        description: 'Detailed comparison of two dates with breakdown',
        usage: 'compareDetailed(date1, date2)',
        parameters: [
          { name: 'date1', type: 'Date | string | number', description: 'First date' },
          { name: 'date2', type: 'Date | string | number', description: 'Second date' }
        ],
        returns: 'Detailed comparison object',
        example: `// Detailed comparison
const details = compareDetailed('2025-01-15', '2025-01-20');
// Returns: {
//   result: -1,
//   difference: 432000000, // milliseconds
//   humanDifference: '5 days',
//   isEarlier: true,
//   isLater: false,
//   isEqual: false
// }`
      },
      {
        id: 'isSameDay',
        name: 'isSameDay',
        description: 'Checks if two dates are on the same day',
        usage: 'isSameDay(date1, date2, timezone)',
        parameters: [
          { name: 'date1', type: 'Date | string | number', description: 'First date' },
          { name: 'date2', type: 'Date | string | number', description: 'Second date' },
          { name: 'timezone', type: 'IANATimezone', description: 'Optional timezone for comparison' }
        ],
        returns: 'True if same day',
        example: `// Same day check
const same = isSameDay(
  new Date('2025-01-15T09:00:00'),
  new Date('2025-01-15T18:00:00')
); // true

// Different days
const same = isSameDay('2025-01-15', '2025-01-16'); // false`
      },
      {
        id: 'isSameWeek',
        name: 'isSameWeek',
        description: 'Checks if two dates are in the same week',
        usage: 'isSameWeek(date1, date2, startOfWeek)',
        parameters: [
          { name: 'date1', type: 'Date | string | number', description: 'First date' },
          { name: 'date2', type: 'Date | string | number', description: 'Second date' },
          { name: 'startOfWeek', type: 'number', description: 'Start of week (0=Sunday, 1=Monday)' }
        ],
        returns: 'True if same week',
        example: `// Same week check (Monday start)
const same = isSameWeek('2025-01-13', '2025-01-17', 1); // true

// Different weeks
const same = isSameWeek('2025-01-13', '2025-01-20', 1); // false`
      },
      {
        id: 'isSameMonth',
        name: 'isSameMonth',
        description: 'Checks if two dates are in the same month and year',
        usage: 'isSameMonth(date1, date2)',
        parameters: [
          { name: 'date1', type: 'Date | string | number', description: 'First date' },
          { name: 'date2', type: 'Date | string | number', description: 'Second date' }
        ],
        returns: 'True if same month and year',
        example: `// Same month check
const same = isSameMonth('2025-01-15', '2025-01-31'); // true
const different = isSameMonth('2025-01-15', '2025-02-15'); // false`
      },
      {
        id: 'isSameYear',
        name: 'isSameYear',
        description: 'Checks if two dates are in the same year',
        usage: 'isSameYear(date1, date2)',
        parameters: [
          { name: 'date1', type: 'Date | string | number', description: 'First date' },
          { name: 'date2', type: 'Date | string | number', description: 'Second date' }
        ],
        returns: 'True if same year',
        example: `// Same year check
const same = isSameYear('2025-01-15', '2025-12-31'); // true
const different = isSameYear('2025-01-15', '2024-01-15'); // false`
      },
      {
        id: 'isAfter',
        name: 'isAfter',
        description: 'Checks if first date is after second date',
        usage: 'isAfter(date1, date2)',
        parameters: [
          { name: 'date1', type: 'Date | string | number', description: 'First date' },
          { name: 'date2', type: 'Date | string | number', description: 'Second date' }
        ],
        returns: 'True if date1 is after date2',
        example: `// After check
const after = isAfter('2025-01-20', '2025-01-15'); // true
const notAfter = isAfter('2025-01-15', '2025-01-20'); // false`
      },
      {
        id: 'isBefore',
        name: 'isBefore',
        description: 'Checks if first date is before second date',
        usage: 'isBefore(date1, date2)',
        parameters: [
          { name: 'date1', type: 'Date | string | number', description: 'First date' },
          { name: 'date2', type: 'Date | string | number', description: 'Second date' }
        ],
        returns: 'True if date1 is before date2',
        example: `// Before check
const before = isBefore('2025-01-15', '2025-01-20'); // true
const notBefore = isBefore('2025-01-20', '2025-01-15'); // false`
      },
      {
        id: 'isWithinRange',
        name: 'isWithinRange',
        description: 'Checks if date is within a specified range with tolerance',
        usage: 'isWithinRange(date, targetDate, range, unit)',
        parameters: [
          { name: 'date', type: 'Date | string | number', description: 'Date to check' },
          { name: 'targetDate', type: 'Date | string | number', description: 'Target date' },
          { name: 'range', type: 'number', description: 'Range tolerance' },
          { name: 'unit', type: 'TimeUnit', description: 'Unit for range' }
        ],
        returns: 'True if within range',
        example: `// Within range check
const within = isWithinRange(
  new Date('2025-01-17'),
  new Date('2025-01-15'),
  3,
  'day'
); // true (within 3 days)`
      },
      {
        id: 'isValidRange',
        name: 'isValidRange',
        description: 'Validates if a date range is valid (start <= end)',
        usage: 'isValidRange(startDate, endDate)',
        parameters: [
          { name: 'startDate', type: 'Date | string | number', description: 'Range start date' },
          { name: 'endDate', type: 'Date | string | number', description: 'Range end date' }
        ],
        returns: 'True if range is valid',
        example: `// Valid range
const valid = isValidRange('2025-01-01', '2025-01-31'); // true

// Invalid range
const invalid = isValidRange('2025-01-31', '2025-01-01'); // false`
      },
      {
        id: 'sortDates',
        name: 'sortDates',
        description: 'Sorts an array of dates in ascending or descending order',
        usage: 'sortDates(dates, order)',
        parameters: [
          { name: 'dates', type: '(Date | string | number)[]', description: 'Array of dates to sort' },
          { name: 'order', type: 'string', description: 'Sort order ("asc" or "desc")' }
        ],
        returns: 'Sorted array of dates',
        example: `// Sort dates ascending
const sorted = sortDates([
  new Date('2025-01-20'),
  new Date('2025-01-10'),
  new Date('2025-01-15')
], 'asc');

// Sort descending
const sorted = sortDates(dates, 'desc');`
      },
      {
        id: 'getEarliestDate',
        name: 'getEarliestDate',
        description: 'Finds the earliest date from multiple date arguments',
        usage: 'getEarliestDate(...dates)',
        parameters: [
          { name: '...dates', type: '(Date | string | number)[]', description: 'Multiple date arguments' }
        ],
        returns: 'Earliest date',
        example: `// Find earliest date
const earliest = getEarliestDate(
  new Date('2025-01-20'),
  new Date('2025-01-10'),
  new Date('2025-01-15'),
  '2025-01-05'
);
// Returns: 2025-01-05`
      },
      {
        id: 'getLatestDate',
        name: 'getLatestDate',
        description: 'Finds the latest date from multiple date arguments',
        usage: 'getLatestDate(...dates)',
        parameters: [
          { name: '...dates', type: '(Date | string | number)[]', description: 'Multiple date arguments' }
        ],
        returns: 'Latest date',
        example: `// Find latest date
const latest = getLatestDate(
  new Date('2025-01-20'),
  new Date('2025-01-10'),
  new Date('2025-01-15'),
  '2025-01-25'
);
// Returns: 2025-01-25`
      },
      {
        id: 'removeDuplicateDates',
        name: 'removeDuplicateDates',
        description: 'Removes duplicate dates from an array',
        usage: 'removeDuplicateDates(dates, precision)',
        parameters: [
          { name: 'dates', type: '(Date | string | number)[]', description: 'Array of dates' },
          { name: 'precision', type: 'TimeUnit', description: 'Precision level for comparison' }
        ],
        returns: 'Array with unique dates',
        example: `// Remove duplicates (exact match)
const unique = removeDuplicateDates([
  new Date('2025-01-15'),
  new Date('2025-01-15'),
  new Date('2025-01-20')
]);

// Remove duplicates by day
const unique = removeDuplicateDates([
  new Date('2025-01-15T10:00:00'),
  new Date('2025-01-15T15:00:00'),
  new Date('2025-01-20T12:00:00')
], 'day');`
      },
      {
        id: 'isFirstDayOfMonth',
        name: 'isFirstDayOfMonth',
        description: 'Checks if date is the first day of its month',
        usage: 'isFirstDayOfMonth(date)',
        parameters: [
          { name: 'date', type: 'Date | string | number', description: 'Date to check' }
        ],
        returns: 'True if first day of month',
        example: `// First day check
const isFirst = isFirstDayOfMonth(new Date('2025-01-01')); // true
const notFirst = isFirstDayOfMonth(new Date('2025-01-15')); // false`
      },
      {
        id: 'isLastDayOfMonth',
        name: 'isLastDayOfMonth',
        description: 'Checks if date is the last day of its month',
        usage: 'isLastDayOfMonth(date)',
        parameters: [
          { name: 'date', type: 'Date | string | number', description: 'Date to check' }
        ],
        returns: 'True if last day of month',
        example: `// Last day check
const isLast = isLastDayOfMonth(new Date('2025-01-31')); // true
const notLast = isLastDayOfMonth(new Date('2025-01-15')); // false`
      },
      {
        id: 'isFirstDayOfYear',
        name: 'isFirstDayOfYear',
        description: 'Checks if date is the first day of its year',
        usage: 'isFirstDayOfYear(date)',
        parameters: [
          { name: 'date', type: 'Date | string | number', description: 'Date to check' }
        ],
        returns: 'True if first day of year',
        example: `// First day of year check
const isFirst = isFirstDayOfYear(new Date('2025-01-01')); // true
const notFirst = isFirstDayOfYear(new Date('2025-01-02')); // false`
      },
      {
        id: 'isLastDayOfYear',
        name: 'isLastDayOfYear',
        description: 'Checks if date is the last day of its year',
        usage: 'isLastDayOfYear(date)',
        parameters: [
          { name: 'date', type: 'Date | string | number', description: 'Date to check' }
        ],
        returns: 'True if last day of year',
        example: `// Last day of year check
const isLast = isLastDayOfYear(new Date('2025-12-31')); // true
const notLast = isLastDayOfYear(new Date('2025-12-30')); // false`
      },
      {
        id: 'findClosestDate',
        name: 'findClosestDate',
        description: 'Finds the closest date to a target date from an array',
        usage: 'findClosestDate(targetDate, dates)',
        parameters: [
          { name: 'targetDate', type: 'Date | string | number', description: 'Target date' },
          { name: 'dates', type: '(Date | string | number)[]', description: 'Array of dates to search' }
        ],
        returns: 'Closest date to target',
        example: `// Find closest date
const closest = findClosestDate(new Date('2025-01-15'), [
  new Date('2025-01-10'),
  new Date('2025-01-20'),
  new Date('2025-01-12'),
  new Date('2025-01-18')
]);
// Returns: 2025-01-12 (3 days away)`
      }
    ]
  },
  {
    id: 'utility',
    name: 'Utility Functions',
    items: [
      {
        id: 'getConfigs',
        name: 'getConfigs',
        description: 'Gets current ChronoUtilz configuration settings',
        usage: 'getConfigs()',
        parameters: [],
        returns: 'Configuration object',
        example: `// Get current configs
const config = getConfigs();
// Returns: {
//   timezone: 'America/New_York',
//   locale: 'en-US',
//   workingDays: [1, 2, 3, 4, 5],
//   holidays: [...]
// }`
      },
      {
        id: 'getUserTimezone',
        name: 'getUserTimezone',
        description: 'Gets user\'s current timezone using browser API',
        usage: 'getUserTimezone()',
        parameters: [],
        returns: 'User\'s IANA timezone identifier',
        example: `// Get user's timezone
const userTz = getUserTimezone();
// Returns: "America/New_York" (or user's actual timezone)`
      },
      {
        id: 'searchTimezones',
        name: 'searchTimezones',
        description: 'Searches timezones by name or description',
        usage: 'searchTimezones(query)',
        parameters: [
          { name: 'query', type: 'string', description: 'Search query string' }
        ],
        returns: 'Array of matching timezone objects',
        example: `// Search timezones
const results = searchTimezones('new york');
// Returns: [{ id: 'America/New_York', offset: -300, description: '...' }]

const results = searchTimezones('UTC+5');
// Returns: timezones with UTC+5 offset`
      },
      {
        id: 'getTimezoneConfig',
        name: 'getTimezoneConfig',
        description: 'Gets current timezone configuration',
        usage: 'getTimezoneConfig()',
        parameters: [],
        returns: 'Timezone configuration object',
        example: `// Get timezone config
const config = getTimezoneConfig();
// Returns: {
//   defaultTimezone: 'UTC',
//   autoDetect: true,
//   currentEffectiveTimezone: 'America/New_York'
// }`
      },
      {
        id: 'getTimezonesByOffset',
        name: 'getTimezonesByOffset',
        description: 'Gets all timezones with a specific GMT offset',
        usage: 'getTimezonesByOffset(offset)',
        parameters: [
          { name: 'offset', type: 'number', description: 'GMT offset in hours' }
        ],
        returns: 'Array of timezone objects with specified offset',
        example: `// Get UTC+5 timezones
const utcPlus5 = getTimezonesByOffset(5);

// Get UTC-8 timezones  
const utcMinus8 = getTimezonesByOffset(-8);`
      },
      {
        id: 'getTimezonesByRegion',
        name: 'getTimezonesByRegion',
        description: 'Gets all timezones in a specific region',
        usage: 'getTimezonesByRegion(region)',
        parameters: [
          { name: 'region', type: 'string', description: 'Region name (e.g., "America", "Europe", "Asia")' }
        ],
        returns: 'Array of timezone objects in the region',
        example: `// Get American timezones
const americas = getTimezonesByRegion('America');

// Get European timezones
const europe = getTimezonesByRegion('Europe');

// Get Asian timezones
const asia = getTimezonesByRegion('Asia');`
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
  console.log('Documentation view mounted')
})
</script>

<style scoped>
.documentation-container {
  min-height: calc(100vh - 64px);
}

pre {
  font-family: 'Ubuntu Mono', 'Courier New', Courier, monospace;
  font-size: 0.9rem;
  line-height: 1.4;
}
</style>