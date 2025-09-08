<template>
  <div class="container mx-auto px-4 py-8">
    <div class="text-center mb-8">
      <div class="inline-flex items-center mb-4">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Utility Functions</h1>
          <p class="text-lg text-gray-600">Helper functions and advanced utilities</p>
        </div>
      </div>
      <LibraryStatus />
    </div>
    
    <CategoryNavigation current="Utility Functions" />
    
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
      <h2 class="text-2xl font-semibold mb-4">Try Utility Functions</h2>
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
    name: 'Age & Life Calculations',
    functions: [
      { name: 'calculateAge', description: 'Calculate age from birth date' },
      { name: 'getAgeInYears', description: 'Get age in years' },
      { name: 'getAgeInMonths', description: 'Get age in months' },
      { name: 'getAgeInDays', description: 'Get age in days' },
      { name: 'getBirthYear', description: 'Get birth year from age' },
      { name: 'getRetirementDate', description: 'Calculate retirement date' }
    ]
  },
  {
    name: 'Date Range Generation',
    functions: [
      { name: 'generateDateRange', description: 'Generate array of dates in range' },
      { name: 'randomDate', description: 'Generate random date between two dates' },
      { name: 'getDateArray', description: 'Get array of dates' },
      { name: 'generateMonthRange', description: 'Generate months in range' },
      { name: 'generateYearRange', description: 'Generate years in range' },
      { name: 'getDatesBetween', description: 'Get all dates between two dates' }
    ]
  },
  {
    name: 'Time Differences',
    functions: [
      { name: 'getDateDiff', description: 'Get difference between dates' },
      { name: 'daysBetween', description: 'Calculate days between dates' },
      { name: 'weeksBetween', description: 'Calculate weeks between dates' },
      { name: 'monthsBetween', description: 'Calculate months between dates' },
      { name: 'yearsBetween', description: 'Calculate years between dates' },
      { name: 'hoursBetween', description: 'Calculate hours between dates' },
      { name: 'minutesBetween', description: 'Calculate minutes between dates' },
      { name: 'secondsBetween', description: 'Calculate seconds between dates' }
    ]
  },
  {
    name: 'Special Dates & Events',
    functions: [
      { name: 'getEasterDate', description: 'Calculate Easter date for year' },
      { name: 'getMothersDayDate', description: 'Calculate Mother\'s Day date' },
      { name: 'getFathersDayDate', description: 'Calculate Father\'s Day date' },
      { name: 'getThanksgivingDate', description: 'Calculate Thanksgiving date' },
      { name: 'getMemorialDayDate', description: 'Calculate Memorial Day date' },
      { name: 'getLaborDayDate', description: 'Calculate Labor Day date' }
    ]
  },
  {
    name: 'Timestamp Operations',
    functions: [
      { name: 'getTimestamp', description: 'Get timestamp from date' },
      { name: 'fromTimestamp', description: 'Create date from timestamp' },
      { name: 'getUnixTimestamp', description: 'Get Unix timestamp' },
      { name: 'fromUnixTimestamp', description: 'Create date from Unix timestamp' },
      { name: 'timestampToDate', description: 'Convert timestamp to date' },
      { name: 'dateToTimestamp', description: 'Convert date to timestamp' }
    ]
  },
  {
    name: 'Utility Helpers',
    functions: [
      { name: 'sleep', description: 'Pause execution for specified time' },
      { name: 'retry', description: 'Retry operation with delays' },
      { name: 'debounce', description: 'Debounce function calls' },
      { name: 'throttle', description: 'Throttle function calls' },
      { name: 'memoize', description: 'Cache function results' },
      { name: 'benchmark', description: 'Measure execution time' }
    ]
  },
  {
    name: 'Date Operations',
    functions: [
      { name: 'addDays', description: 'Add days to date' },
      { name: 'subtractDays', description: 'Subtract days from date' },
      { name: 'getNextWeekday', description: 'Get next occurrence of weekday' },
      { name: 'getPreviousWeekday', description: 'Get previous occurrence of weekday' },
      { name: 'getFirstDayOfMonth', description: 'Get first day of month' },
      { name: 'getLastDayOfMonth', description: 'Get last day of month' },
      { name: 'getDayOfWeek', description: 'Get day of week from date' }
    ]
  }
]

const demoFunctions = [
  // Age & Life Calculations
  {
    name: 'calculateAge',
    example: 'calculateAge("1990-01-01")',
    description: 'Calculate age from birth date',
    needsStringInput: true
  },
  {
    name: 'getAgeInYears',
    example: 'getAgeInYears(birthDate)',
    description: 'Get age in years',
    needsDateInput: true
  },
  {
    name: 'getAgeInMonths',
    example: 'getAgeInMonths(birthDate)',
    description: 'Get age in months',
    needsDateInput: true
  },
  {
    name: 'getAgeInDays',
    example: 'getAgeInDays(birthDate)',
    description: 'Get age in days',
    needsDateInput: true
  },
  {
    name: 'getBirthYear',
    example: 'getBirthYear(25)',
    description: 'Get birth year from age',
    needsNumberInput: true
  },
  {
    name: 'getRetirementDate',
    example: 'getRetirementDate(birthDate, 65)',
    description: 'Calculate retirement date',
    needsDateInput: true,
    needsNumberInput: true
  },

  // Date Range Generation
  {
    name: 'generateDateRange',
    example: 'generateDateRange(startDate, endDate, "day")',
    description: 'Generate array of dates in range',
    needsDateInputs: 2,
    needsUnit: true
  },
  {
    name: 'randomDate',
    example: 'randomDate(startDate, endDate)',
    description: 'Generate random date between two dates',
    needsDateInputs: 2
  },
  {
    name: 'getDateArray',
    example: 'getDateArray(startDate, count, "day")',
    description: 'Get array of dates',
    needsDateInput: true,
    needsNumberInput: true,
    needsUnit: true
  },
  {
    name: 'generateMonthRange',
    example: 'generateMonthRange(2024, 1, 12)',
    description: 'Generate months in range',
    needsMultiNumber: [2024, 1, 12]
  },
  {
    name: 'generateYearRange',
    example: 'generateYearRange(2020, 2024)',
    description: 'Generate years in range',
    needsMultiNumber: [2020, 2024]
  },
  {
    name: 'getDatesBetween',
    example: 'getDatesBetween(startDate, endDate)',
    description: 'Get all dates between two dates',
    needsDateInputs: 2
  },

  // Time Differences
  {
    name: 'daysBetween',
    example: 'daysBetween(startDate, endDate)',
    description: 'Calculate days between dates',
    needsDateInputs: 2
  },
  {
    name: 'weeksBetween',
    example: 'weeksBetween(startDate, endDate)',
    description: 'Calculate weeks between dates',
    needsDateInputs: 2
  },
  {
    name: 'monthsBetween',
    example: 'monthsBetween(startDate, endDate)',
    description: 'Calculate months between dates',
    needsDateInputs: 2
  },
  {
    name: 'yearsBetween',
    example: 'yearsBetween(startDate, endDate)',
    description: 'Calculate years between dates',
    needsDateInputs: 2
  },
  {
    name: 'hoursBetween',
    example: 'hoursBetween(startDate, endDate)',
    description: 'Calculate hours between dates',
    needsDateInputs: 2
  },
  {
    name: 'minutesBetween',
    example: 'minutesBetween(startDate, endDate)',
    description: 'Calculate minutes between dates',
    needsDateInputs: 2
  },
  {
    name: 'secondsBetween',
    example: 'secondsBetween(startDate, endDate)',
    description: 'Calculate seconds between dates',
    needsDateInputs: 2
  },

  // Special Dates & Events
  {
    name: 'getEasterDate',
    example: 'getEasterDate(2024)',
    description: 'Calculate Easter date for year',
    needsNumberInput: true
  },
  {
    name: 'getMothersDayDate',
    example: 'getMothersDayDate(2024)',
    description: 'Calculate Mother\'s Day date',
    needsNumberInput: true
  },
  {
    name: 'getFathersDayDate',
    example: 'getFathersDayDate(2024)',
    description: 'Calculate Father\'s Day date',
    needsNumberInput: true
  },
  {
    name: 'getThanksgivingDate',
    example: 'getThanksgivingDate(2024)',
    description: 'Calculate Thanksgiving date',
    needsNumberInput: true
  },
  {
    name: 'getMemorialDayDate',
    example: 'getMemorialDayDate(2024)',
    description: 'Calculate Memorial Day date',
    needsNumberInput: true
  },
  {
    name: 'getLaborDayDate',
    example: 'getLaborDayDate(2024)',
    description: 'Calculate Labor Day date',
    needsNumberInput: true
  },

  // Timestamp Operations
  {
    name: 'getTimestamp',
    example: 'getTimestamp(new Date())',
    description: 'Get timestamp from date',
    needsDateInput: true
  },
  {
    name: 'fromTimestamp',
    example: 'fromTimestamp(1640995200000)',
    description: 'Create date from timestamp',
    needsNumberInput: true
  },
  {
    name: 'getUnixTimestamp',
    example: 'getUnixTimestamp(new Date())',
    description: 'Get Unix timestamp (seconds)',
    needsDateInput: true
  },
  {
    name: 'fromUnixTimestamp',
    example: 'fromUnixTimestamp(1640995200)',
    description: 'Create date from Unix timestamp',
    needsNumberInput: true
  },
  {
    name: 'timestampToDate',
    example: 'timestampToDate(1640995200000)',
    description: 'Convert timestamp to date',
    needsNumberInput: true
  },
  {
    name: 'dateToTimestamp',
    example: 'dateToTimestamp(new Date())',
    description: 'Convert date to timestamp',
    needsDateInput: true
  },

  // Utility Helpers
  {
    name: 'sleep',
    example: 'sleep(1000)',
    description: 'Pause execution for milliseconds',
    needsNumberInput: true
  },
  {
    name: 'benchmark',
    example: 'benchmark(() => someFunction())',
    description: 'Measure execution time',
    needsCustom: true
  },

  // Additional Utility Functions
  {
    name: 'getDateDiff',
    example: 'getDateDiff(date1, date2, "days")',
    description: 'Get difference between dates in units',
    needsDateInputs: 2,
    needsUnit: true
  },
  {
    name: 'addDays',
    example: 'addDays(new Date(), 7)',
    description: 'Add days to date',
    needsDateInput: true,
    needsNumberInput: true
  },
  {
    name: 'subtractDays',
    example: 'subtractDays(new Date(), 7)',
    description: 'Subtract days from date',
    needsDateInput: true,
    needsNumberInput: true
  },
  {
    name: 'getNextWeekday',
    example: 'getNextWeekday(new Date(), 1)',
    description: 'Get next occurrence of weekday',
    needsDateInput: true,
    needsNumberInput: true
  },
  {
    name: 'getPreviousWeekday',
    example: 'getPreviousWeekday(new Date(), 1)',
    description: 'Get previous occurrence of weekday',
    needsDateInput: true,
    needsNumberInput: true
  },
  {
    name: 'getLastDayOfMonth',
    example: 'getLastDayOfMonth(new Date())',
    description: 'Get last day of month',
    needsDateInput: true
  },
  {
    name: 'getFirstDayOfMonth',
    example: 'getFirstDayOfMonth(new Date())',
    description: 'Get first day of month',
    needsDateInput: true
  },
  {
    name: 'getDayOfWeek',
    example: 'getDayOfWeek(new Date())',
    description: 'Get day of week (0-6)',
    needsDateInput: true
  }
]
</script>