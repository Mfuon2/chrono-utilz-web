<template>
  <div class="container mx-auto px-4 py-8">
    <div class="text-center mb-8">
      <div class="inline-flex items-center mb-4">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Comparison & Validation</h1>
          <p class="text-lg text-gray-600">Date comparison and validation functions</p>
        </div>
      </div>
      <LibraryStatus />
    </div>
    
    <CategoryNavigation current="Comparison & Validation" />
    
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
      <h2 class="text-2xl font-semibold mb-4">Try Comparison & Validation</h2>
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
    name: 'Date Comparison',
    functions: [
      { name: 'isEqual', description: 'Check if two dates are equal' },
      { name: 'isAfter', description: 'Check if date is after another date' },
      { name: 'isBefore', description: 'Check if date is before another date' },
      { name: 'isBetween', description: 'Check if date is between two dates' },
      { name: 'isWithinRange', description: 'Check if date is within specified range' },
      { name: 'isInRange', description: 'Check if date is in range' },
      { name: 'compareDates', description: 'Compare two dates and return result' },
      { name: 'closestTo', description: 'Find closest date from array of dates' },
      { name: 'min', description: 'Get minimum date from array' },
      { name: 'max', description: 'Get maximum date from array' }
    ]
  },
  {
    name: 'Same Period Checks',
    functions: [
      { name: 'isSameDay', description: 'Check if dates are on same day' },
      { name: 'isSameWeek', description: 'Check if dates are in same week' },
      { name: 'isSameMonth', description: 'Check if dates are in same month' },
      { name: 'isSameYear', description: 'Check if dates are in same year' },
      { name: 'isSameQuarter', description: 'Check if dates are in same quarter' },
      { name: 'isSameHour', description: 'Check if dates are in same hour' }
    ]
  },
  {
    name: 'Relative Time Checks',
    functions: [
      { name: 'isToday', description: 'Check if date is today' },
      { name: 'isTomorrow', description: 'Check if date is tomorrow' },
      { name: 'isYesterday', description: 'Check if date is yesterday' },
      { name: 'isThisWeek', description: 'Check if date is in this week' },
      { name: 'isThisMonth', description: 'Check if date is in this month' },
      { name: 'isThisYear', description: 'Check if date is in this year' },
      { name: 'isFuture', description: 'Check if date is in the future' },
      { name: 'isPast', description: 'Check if date is in the past' }
    ]
  },
  {
    name: 'Date Type Validation',
    functions: [
      { name: 'isValidDate', description: 'Check if input is a valid date' },
      { name: 'isValidTimestamp', description: 'Check if input is a valid timestamp' },
      { name: 'isDateString', description: 'Check if input is a date string' },
      { name: 'isTimeString', description: 'Check if input is a time string' },
      { name: 'isLeapYear', description: 'Check if year is a leap year' },
      { name: 'isWeekend', description: 'Check if date falls on weekend' },
      { name: 'isWeekday', description: 'Check if date falls on weekday' },
      { name: 'isBusinessDay', description: 'Check if date is a business day' },
      { name: 'isHoliday', description: 'Check if date is a holiday' }
    ]
  }
]

const demoFunctions = [
  // Date Comparison Functions
  {
    name: 'isEqual',
    example: 'isEqual(date1, date2)',
    description: 'Check if two dates are equal',
    needsDateInputs: 2
  },
  {
    name: 'isAfter',
    example: 'isAfter(date1, date2)',
    description: 'Check if first date is after second date',
    needsDateInputs: 2
  },
  {
    name: 'isBefore',
    example: 'isBefore(date1, date2)',
    description: 'Check if first date is before second date',
    needsDateInputs: 2
  },
  {
    name: 'isBetween',
    example: 'isBetween(date, startDate, endDate)',
    description: 'Check if date is between two dates',
    needsDateInputs: 3
  },
  {
    name: 'compareDates',
    example: 'compareDates(date1, date2)',
    description: 'Compare two dates and return -1, 0, or 1',
    needsDateInputs: 2
  },
  {
    name: 'closestTo',
    example: 'closestTo(targetDate, [date1, date2, date3])',
    description: 'Find closest date from array of dates',
    needsDateInput: true,
    needsCustom: true
  },

  // Same Period Checks
  {
    name: 'isSameDay',
    example: 'isSameDay(date1, date2)',
    description: 'Check if dates are on same day',
    needsDateInputs: 2
  },
  {
    name: 'isSameWeek',
    example: 'isSameWeek(date1, date2)',
    description: 'Check if dates are in same week',
    needsDateInputs: 2
  },
  {
    name: 'isSameMonth',
    example: 'isSameMonth(date1, date2)',
    description: 'Check if dates are in same month',
    needsDateInputs: 2
  },
  {
    name: 'isSameYear',
    example: 'isSameYear(date1, date2)',
    description: 'Check if dates are in same year',
    needsDateInputs: 2
  },
  {
    name: 'isSameQuarter',
    example: 'isSameQuarter(date1, date2)',
    description: 'Check if dates are in same quarter',
    needsDateInputs: 2
  },
  {
    name: 'isSameHour',
    example: 'isSameHour(date1, date2)',
    description: 'Check if dates are in same hour',
    needsDateInputs: 2
  },

  // Relative Time Checks
  {
    name: 'isToday',
    example: 'isToday(new Date())',
    description: 'Check if date is today',
    needsDateInput: true
  },
  {
    name: 'isTomorrow',
    example: 'isTomorrow(new Date())',
    description: 'Check if date is tomorrow',
    needsDateInput: true
  },
  {
    name: 'isYesterday',
    example: 'isYesterday(new Date())',
    description: 'Check if date is yesterday',
    needsDateInput: true
  },
  {
    name: 'isThisWeek',
    example: 'isThisWeek(new Date())',
    description: 'Check if date is in this week',
    needsDateInput: true
  },
  {
    name: 'isThisMonth',
    example: 'isThisMonth(new Date())',
    description: 'Check if date is in this month',
    needsDateInput: true
  },
  {
    name: 'isThisYear',
    example: 'isThisYear(new Date())',
    description: 'Check if date is in this year',
    needsDateInput: true
  },
  {
    name: 'isFuture',
    example: 'isFuture(new Date())',
    description: 'Check if date is in the future',
    needsDateInput: true
  },
  {
    name: 'isPast',
    example: 'isPast(new Date())',
    description: 'Check if date is in the past',
    needsDateInput: true
  },

  // Date Type Validation
  {
    name: 'isValidDate',
    example: 'isValidDate("2024-01-01")',
    description: 'Check if input is a valid date',
    needsStringInput: true
  },
  {
    name: 'isLeapYear',
    example: 'isLeapYear(2024)',
    description: 'Check if year is a leap year',
    needsNumberInput: true
  },
  {
    name: 'isWeekend',
    example: 'isWeekend(new Date())',
    description: 'Check if date falls on weekend',
    needsDateInput: true
  },
  {
    name: 'isWeekday',
    example: 'isWeekday(new Date())',
    description: 'Check if date falls on weekday',
    needsDateInput: true
  },
  {
    name: 'isBusinessDay',
    example: 'isBusinessDay(new Date())',
    description: 'Check if date is a business day',
    needsDateInput: true
  },
  {
    name: 'isHoliday',
    example: 'isHoliday(new Date())',
    description: 'Check if date is a holiday',
    needsDateInput: true
  },

  // Advanced Validation
  {
    name: 'isWithinRange',
    example: 'isWithinRange(date, startDate, endDate)',
    description: 'Check if date is within range (inclusive)',
    needsDateInputs: 3
  },
  {
    name: 'isValidTimestamp',
    example: 'isValidTimestamp(1640995200000)',
    description: 'Check if timestamp is valid',
    needsNumberInput: true
  },
  {
    name: 'isDateString',
    example: 'isDateString("2024-01-01")',
    description: 'Check if string is a date string',
    needsStringInput: true
  },
  {
    name: 'isTimeString',
    example: 'isTimeString("14:30:00")',
    description: 'Check if string is a time string',
    needsStringInput: true
  },

  // Range Comparisons
  {
    name: 'isInRange',
    example: 'isInRange(date, min, max)',
    description: 'Check if date is in range',
    needsDateInputs: 3
  },
  {
    name: 'min',
    example: 'min([date1, date2, date3])',
    description: 'Find minimum (earliest) date',
    needsCustom: true
  },
  {
    name: 'max',
    example: 'max([date1, date2, date3])',
    description: 'Find maximum (latest) date',
    needsCustom: true
  }
]
</script>