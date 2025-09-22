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
      <h2 class="text-2xl font-semibold mb-6">Try Comparison & Validation</h2>
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
      { name: 'isAfter', description: 'Check if date is after another date' },
      { name: 'isBefore', description: 'Check if date is before another date' },
      { name: 'isBetweenDates', description: 'Check if date is between two dates' },
      { name: 'isWithinRange', description: 'Check if date is within specified range' },
      { name: 'compareDates', description: 'Compare two dates and return result' },
      { name: 'compareDetailed', description: 'Compare dates with detailed result' },
      { name: 'isValidRange', description: 'Check if date range is valid' },
      { name: 'findClosestDate', description: 'Find closest date from array of dates' },
      { name: 'minDate', description: 'Get minimum date from array' },
      { name: 'maxDate', description: 'Get maximum date from array' }
    ]
  },
  {
    name: 'Same Period Checks',
    functions: [
      { name: 'isSameDay', description: 'Check if dates are on same day' },
      { name: 'isSameWeek', description: 'Check if dates are in same week' },
      { name: 'isSameMonth', description: 'Check if dates are in same month' },
      { name: 'isSameYear', description: 'Check if dates are in same year' },
      { name: 'isFirstDayOfMonth', description: 'Check if date is first day of month' },
      { name: 'isLastDayOfMonth', description: 'Check if date is last day of month' },
      { name: 'isFirstDayOfYear', description: 'Check if date is first day of year' },
      { name: 'isLastDayOfYear', description: 'Check if date is last day of year' }
    ]
  },
  {
    name: 'Business Day Checks',
    functions: [
      { name: 'isBusinessDay', description: 'Check if date is a business day' },
      { name: 'isFirstBusinessDayOfMonth', description: 'Check if date is first business day of month' },
      { name: 'isLastBusinessDayOfMonth', description: 'Check if date is last business day of month' },
      { name: 'isWorkingHours', description: 'Check if time is within working hours' },
      { name: 'isHoliday', description: 'Check if date is a holiday' },
      { name: 'isWeekday', description: 'Check if date falls on weekday' },
      { name: 'isWeekend', description: 'Check if date falls on weekend' }
    ]
  },
  {
    name: 'Date Validation',
    functions: [
      { name: 'isValidDate', description: 'Check if input is a valid date' },
      { name: 'isValidRange', description: 'Check if date range is valid' },
      { name: 'isLeapYear', description: 'Check if year is a leap year' }
    ]
  }
]

const demoFunctions = [
  // Date Comparison Functions
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
    name: 'isBetweenDates',
    example: 'isBetweenDates(date, startDate, endDate)',
    description: 'Check if date is between two dates',
    needsDateInputs: 3
  },
  {
    name: 'compareDates',
    example: 'compareDates(date1, date2)',
    description: 'Compare two dates: returns -1 (first < second), 0 (equal), 1 (first > second)',
    needsDateInputs: 2
  },
  {
    name: 'compareDetailed',
    example: 'compareDetailed(date1, date2)',
    description: 'Compare dates with detailed result',
    needsDateInputs: 2
  },
  {
    name: 'findClosestDate',
    example: 'findClosestDate(targetDate, [date1, date2, date3])',
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
    name: 'isFirstDayOfMonth',
    example: 'isFirstDayOfMonth(new Date())',
    description: 'Check if date is first day of month',
    needsDateInput: true
  },
  {
    name: 'isLastDayOfMonth',
    example: 'isLastDayOfMonth(new Date())',
    description: 'Check if date is last day of month',
    needsDateInput: true
  },

  // Business Day Checks
  {
    name: 'isBusinessDay',
    example: 'isBusinessDay(new Date())',
    description: 'Check if date is a business day',
    needsDateInput: true
  },
  {
    name: 'isFirstBusinessDayOfMonth',
    example: 'isFirstBusinessDayOfMonth(new Date())',
    description: 'Check if date is first business day of month',
    needsDateInput: true
  },
  {
    name: 'isLastBusinessDayOfMonth',
    example: 'isLastBusinessDayOfMonth(new Date())',
    description: 'Check if date is last business day of month',
    needsDateInput: true
  },
  {
    name: 'isWorkingHours',
    example: 'isWorkingHours(new Date())',
    description: 'Check if time is within working hours',
    needsDateInput: true
  },
  {
    name: 'isHoliday',
    example: 'isHoliday(new Date())',
    description: 'Check if date is a holiday',
    needsDateInput: true
  },
  {
    name: 'isWeekday',
    example: 'isWeekday(new Date())',
    description: 'Check if date falls on weekday',
    needsDateInput: true
  },
  {
    name: 'isWeekend',
    example: 'isWeekend(new Date())',
    description: 'Check if date falls on weekend',
    needsDateInput: true
  },

  // Date Validation
  {
    name: 'isValidDate',
    example: 'isValidDate("2024-01-01")',
    description: 'Check if input is a valid date',
    needsStringInput: true,
    defaultStringValue: '2024-01-01'
  },
  {
    name: 'isLeapYear',
    example: 'isLeapYear(2024)',
    description: 'Check if year is a leap year',
    needsNumberInput: true,
    defaultNumberValue: 2024
  },
  {
    name: 'isValidRange',
    example: 'isValidRange(startDate, endDate)',
    description: 'Check if date range is valid',
    needsDateInputs: 2
  },

  // Range Operations
  {
    name: 'isWithinRange',
    example: 'isWithinRange(date, startDate, endDate)',
    description: 'Check if date is within range (inclusive)',
    needsDateInputs: 3
  },
  {
    name: 'minDate',
    example: 'minDate([date1, date2, date3])',
    description: 'Find minimum (earliest) date from array',
    needsCustom: true
  },
  {
    name: 'maxDate',
    example: 'maxDate([date1, date2, date3])',
    description: 'Find maximum (latest) date from array',
    needsCustom: true
  }
]
</script>