<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Category Header -->
    <div class="text-center mb-8">
      <div class="inline-flex items-center mb-4">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Core Operations</h1>
          <p class="text-lg text-gray-600">Date manipulation & comparison functions</p>
        </div>
      </div>
      <LibraryStatus />
    </div>

    <!-- Navigation -->
    <CategoryNavigation current="Core Operations" />

    <!-- Function Categories -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <FunctionGroup
        v-for="group in functionGroups"
        :key="group.name"
        :group="group"
      />
    </div>

    <!-- Interactive Demo -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-2xl font-semibold mb-4">Try Core Operations</h2>
      <InteractiveDemo :functions="demoFunctions" />
    </div>
  </div>
</template>

<script setup>
import LibraryStatus from '../components/LibraryStatus.vue'
import CategoryNavigation from '../components/CategoryNavigation.vue'
import FunctionGroup from '../components/FunctionGroup.vue'
import InteractiveDemo from '../components/InteractiveDemo.vue'

const functionGroups = [
  {
    name: 'Date Arithmetic',
    functions: [
      { name: 'addTime', description: 'Add or subtract time from a date' },
      { name: 'cloneDate', description: 'Create a copy of a date' },
      { name: 'createDate', description: 'Create a new date object' },
      { name: 'copyTime', description: 'Copy time from one date to another' }
    ]
  },
  {
    name: 'Date Comparison', 
    functions: [
      { name: 'isAfter', description: 'Check if date is after another date' },
      { name: 'isBefore', description: 'Check if date is before another date' },
      { name: 'isBetweenDates', description: 'Check if date is between two dates' },
      { name: 'compareDates', description: 'Compare two dates' }
    ]
  },
  {
    name: 'Date Validation',
    functions: [
      { name: 'isValidDate', description: 'Validate if input is a valid date' },
      { name: 'isLeapYear', description: 'Check if year is a leap year' },
      { name: 'isWeekend', description: 'Check if date falls on weekend' },
      { name: 'isWeekday', description: 'Check if date falls on weekday' }
    ]
  }
]

const demoFunctions = [
  // Date Creation & Parsing
  {
    name: 'parseDate',
    example: 'parseDate("2024-01-01", "YYYY-MM-DD")',
    description: 'Parse date string with format',
    needsStringInput: true,
    needsFormat: true
  },
  {
    name: 'createDate',
    example: 'createDate("2024-01-01")',
    description: 'Create a new date object',
    needsStringInput: true
  },
  {
    name: 'CalendarDate',
    example: 'CalendarDate(2024, 1, 1)',
    description: 'Create calendar date',
    needsMultiNumber: [2024, 1, 1]
  },
  {
    name: 'utcNow',
    example: 'utcNow()',
    description: 'Get current UTC date',
    needsNothing: true
  },
  {
    name: 'cloneDate',
    example: 'cloneDate(new Date())',
    description: 'Create a copy of a date',
    needsDateInput: true
  },
  {
    name: 'randomDate',
    example: 'randomDate(startDate, endDate)',
    description: 'Generate random date between two dates',
    needsDateInputs: 2
  },
  {
    name: 'fromTimestamp',
    example: 'fromTimestamp(1640995200000)',
    description: 'Create date from timestamp',
    needsNumberInput: true
  },

  // Date Arithmetic
  {
    name: 'addTime',
    example: 'addTime(new Date(), 30, "day")',
    description: 'Add time to a date',
    needsTimeUnit: true
  },
  {
    name: 'subtractTime',
    example: 'subtractTime(new Date(), 30, "day")',
    description: 'Subtract time from a date',
    needsTimeUnit: true
  },
  {
    name: 'getDateDiff',
    example: 'getDateDiff(date1, date2, "days")',
    description: 'Get difference between dates',
    needsDateInputs: 2,
    needsUnit: true
  },
  {
    name: 'copyTime',
    example: 'copyTime(sourceDate, targetDate)',
    description: 'Copy time from one date to another',
    needsDateInputs: 2
  },

  // Date Manipulation
  {
    name: 'startOf',
    example: 'startOf(new Date(), "month")',
    description: 'Get start of time period',
    needsDateInput: true,
    needsUnit: true
  },
  {
    name: 'endOf',
    example: 'endOf(new Date(), "month")',
    description: 'Get end of time period',
    needsDateInput: true,
    needsUnit: true
  },
  {
    name: 'truncateToUnit',
    example: 'truncateToUnit(new Date(), "day")',
    description: 'Truncate date to unit',
    needsDateInput: true,
    needsUnit: true
  },
  {
    name: 'roundToNearest',
    example: 'roundToNearest(new Date(), 15, "minute")',
    description: 'Round to nearest time interval',
    needsDateInput: true,
    needsTimeUnit: true
  },
  {
    name: 'setTime',
    example: 'setTime(new Date(), 14, 30, 0)',
    description: 'Set time components (hour, minute, second)',
    needsDateInput: true,
    needsMultiNumber: [14, 30, 0]
  },

  // Time Operations
  {
    name: 'stripTime',
    example: 'stripTime(new Date())',
    description: 'Remove time component, keep date only',
    needsDateInput: true
  },
  {
    name: 'getMidnight',
    example: 'getMidnight(new Date())',
    description: 'Get midnight of given date',
    needsDateInput: true
  },
  {
    name: 'getNoon',
    example: 'getNoon(new Date())',
    description: 'Get noon of given date',
    needsDateInput: true
  },
  {
    name: 'mergeDateTime',
    example: 'mergeDateTime(dateComponent, timeComponent)',
    description: 'Merge date and time components',
    needsDateInputs: 2
  },
  {
    name: 'timeOfDay',
    example: 'timeOfDay(new Date())',
    description: 'Get time of day as milliseconds',
    needsDateInput: true
  },

  // Formatting & Display
  {
    name: 'formatDate',
    example: 'formatDate(new Date())',
    description: 'Format date to string',
    needsDateInput: true,
    needsFormat: true
  },
  {
    name: 'formatDuration',
    example: 'formatDuration(3661000)',
    description: 'Format duration in milliseconds',
    needsNumberInput: true
  },
  {
    name: 'getRelativeTime',
    example: 'getRelativeTime(new Date(), new Date())',
    description: 'Get relative time between dates',
    needsDateInputs: 2
  },

  // Date Information
  {
    name: 'getDayOfYear',
    example: 'getDayOfYear(new Date())',
    description: 'Get day of year (1-366)',
    needsDateInput: true
  },
  {
    name: 'getWeekOfYear',
    example: 'getWeekOfYear(new Date())',
    description: 'Get week of year',
    needsDateInput: true
  },
  {
    name: 'getISOWeek',
    example: 'getISOWeek(new Date())',
    description: 'Get ISO week number',
    needsDateInput: true
  },
  {
    name: 'getWeekOfMonth',
    example: 'getWeekOfMonth(new Date())',
    description: 'Get week of month',
    needsDateInput: true
  },
  {
    name: 'getDaysInMonth',
    example: 'getDaysInMonth(new Date())',
    description: 'Get number of days in month',
    needsDateInput: true
  },
  {
    name: 'getQuarter',
    example: 'getQuarter(new Date())',
    description: 'Get quarter (1-4)',
    needsDateInput: true
  },
  {
    name: 'getFiscalQuarter',
    example: 'getFiscalQuarter(new Date())',
    description: 'Get fiscal quarter',
    needsDateInput: true
  },
  {
    name: 'getFiscalYear',
    example: 'getFiscalYear(new Date())',
    description: 'Get fiscal year',
    needsDateInput: true
  },
  {
    name: 'getSeason',
    example: 'getSeason(new Date())',
    description: 'Get season name',
    needsDateInput: true
  },
  {
    name: 'getMonthName',
    example: 'getMonthName(new Date())',
    description: 'Get month name',
    needsDateInput: true
  },
  {
    name: 'getMonthsInQuarter',
    example: 'getMonthsInQuarter(1)',
    description: 'Get months in quarter',
    needsNumberInput: true
  },

  // Validation & Utilities
  {
    name: 'isValidDate',
    example: 'isValidDate("2024-01-01")',
    description: 'Validate if input is a valid date',
    needsStringInput: true
  },
  {
    name: 'isLeapYear',
    example: 'isLeapYear(2024)',
    description: 'Check if year is a leap year',
    needsNumberInput: true
  },
  {
    name: 'getTimestamp',
    example: 'getTimestamp(new Date())',
    description: 'Get timestamp from date',
    needsDateInput: true
  },

  // Range & Generation
  {
    name: 'generateDateRange',
    example: 'generateDateRange(startDate, endDate, "day")',
    description: 'Generate array of dates in range',
    needsDateInputs: 2,
    needsUnit: true
  },
  {
    name: 'getPayPeriods',
    example: 'getPayPeriods(new Date(), "biweekly")',
    description: 'Get pay periods',
    needsDateInput: true,
    needsStringInput: true
  },

  // UTC Operations
  {
    name: 'toUTC',
    example: 'toUTC(new Date())',
    description: 'Convert date to UTC',
    needsDateInput: true
  },

  // Occurrence Functions
  {
    name: 'nextOccurrence',
    example: 'nextOccurrence(new Date(), "monday")',
    description: 'Get next occurrence of weekday',
    needsDateInput: true,
    needsStringInput: true
  },
  {
    name: 'previousOccurrence',
    example: 'previousOccurrence(new Date(), "monday")',
    description: 'Get previous occurrence of weekday',
    needsDateInput: true,
    needsStringInput: true
  }
]
</script>