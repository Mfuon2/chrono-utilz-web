<template>
  <div class="container mx-auto px-4 py-8">
    <div class="text-center mb-8">
      <div class="inline-flex items-center mb-4">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Business Utilities</h1>
          <p class="text-lg text-gray-600">Working days, fiscal periods, and business logic</p>
        </div>
      </div>
      <LibraryStatus />
    </div>
    
    <CategoryNavigation current="Business Utilities" />
    
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
      <h2 class="text-2xl font-semibold mb-4">Try Business Utilities</h2>
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
    name: 'Business Day Configuration',
    functions: [
      { name: 'configureWorkingDays', description: 'Configure which days are working days' },
      { name: 'configureHolidays', description: 'Configure holiday dates' },
      { name: 'getBusinessDayConfig', description: 'Get current business day configuration' },
      { name: 'resetBusinessDayConfig', description: 'Reset business day configuration to defaults' }
    ]
  },
  {
    name: 'Basic Business Day Functions',
    functions: [
      { name: 'isWeekend', description: 'Check if date is weekend' },
      { name: 'isWeekday', description: 'Check if date is weekday' },
      { name: 'isBusinessDay', description: 'Check if date is business day' },
      { name: 'addBusinessDays', description: 'Add business days to date' },
      { name: 'subtractBusinessDays', description: 'Subtract business days from date' },
      { name: 'getNextBusinessDay', description: 'Get next business day' },
      { name: 'getPreviousBusinessDay', description: 'Get previous business day' }
    ]
  },
  {
    name: 'Advanced Business Logic',
    functions: [
      { name: 'businessDaysInMonth', description: 'Count business days in month' },
      { name: 'differenceInBusinessDays', description: 'Get business days between dates' },
      { name: 'getBusinessDays', description: 'Get business days in range' },
      { name: 'isFirstBusinessDayOfMonth', description: 'Check if first business day of month' },
      { name: 'isLastBusinessDayOfMonth', description: 'Check if last business day of month' },
      { name: 'getBusinessDaysInMonth', description: 'Get all business days in month' },
      { name: 'calculateBusinessDaysAdvanced', description: 'Advanced business day calculation' },
      { name: 'calculateBusinessDaysCustom', description: 'Custom business day calculation' }
    ]
  },
  {
    name: 'Holiday Management',
    functions: [
      { name: 'isHoliday', description: 'Check if date is holiday' },
      { name: 'getHolidays', description: 'Get holidays for date range' },
      { name: 'addHolidayRules', description: 'Add holiday calculation rules' },
      { name: 'getNextHoliday', description: 'Get next holiday date' },
      { name: 'addCustomHolidays', description: 'Add custom holiday dates' }
    ]
  },
  {
    name: 'Working Hours & Payroll',
    functions: [
      { name: 'getWorkingHoursBetween', description: 'Calculate working hours between dates' },
      { name: 'addWorkingHours', description: 'Add working hours to date' },
      { name: 'isWorkingHours', description: 'Check if within working hours' },
      { name: 'getNextWorkingHour', description: 'Get next working hour' },
      { name: 'generatePayrollPeriods', description: 'Generate payroll periods' },
      { name: 'calculateOvertime', description: 'Calculate overtime hours' },
      { name: 'generateShiftSchedule', description: 'Generate shift schedules' }
    ]
  },
  {
    name: 'Project & Calendar Management',
    functions: [
      { name: 'calculateProjectMilestones', description: 'Calculate project milestone dates' },
      { name: 'generateBusinessCalendar', description: 'Generate business calendar' },
      { name: 'calculateSLACompliance', description: 'Calculate SLA compliance dates' },
      { name: 'getNthWeekdayOfMonth', description: 'Get Nth weekday of month' },
      { name: 'getFiscalPeriodAdvanced', description: 'Get advanced fiscal period info' },
      { name: 'calculateWorkingHours', description: 'Calculate total working hours' }
    ]
  }
]

const demoFunctions = [
  // Basic Business Day Functions
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
    name: 'addBusinessDays',
    example: 'addBusinessDays(new Date(), 5)',
    description: 'Add business days to date',
    needsTimeUnit: true,
    unitType: 'businessDays'
  },
  {
    name: 'subtractBusinessDays',
    example: 'subtractBusinessDays(new Date(), 3)',
    description: 'Subtract business days from date',
    needsTimeUnit: true,
    unitType: 'businessDays'
  },
  {
    name: 'getNextBusinessDay',
    example: 'getNextBusinessDay(new Date())',
    description: 'Get next business day',
    needsDateInput: true
  },
  {
    name: 'getPreviousBusinessDay',
    example: 'getPreviousBusinessDay(new Date())',
    description: 'Get previous business day',
    needsDateInput: true
  },

  // Advanced Business Logic
  {
    name: 'businessDaysInMonth',
    example: 'businessDaysInMonth(new Date())',
    description: 'Count business days in month',
    needsDateInput: true
  },
  {
    name: 'differenceInBusinessDays',
    example: 'differenceInBusinessDays(startDate, endDate)',
    description: 'Calculate business days between dates',
    needsDateInputs: 2
  },
  {
    name: 'isFirstBusinessDayOfMonth',
    example: 'isFirstBusinessDayOfMonth(new Date())',
    description: 'Check if first business day of month',
    needsDateInput: true
  },
  {
    name: 'isLastBusinessDayOfMonth',
    example: 'isLastBusinessDayOfMonth(new Date())',
    description: 'Check if last business day of month',
    needsDateInput: true
  },
  {
    name: 'getBusinessDaysInMonth',
    example: 'getBusinessDaysInMonth(new Date())',
    description: 'Get array of business days in month',
    needsDateInput: true
  },

  // Age Calculation
  {
    name: 'calculateAge',
    example: 'calculateAge("1990-01-01")',
    description: 'Calculate age from birth date',
    needsStringInput: true
  },

  // Holiday Functions
  {
    name: 'isHoliday',
    example: 'isHoliday(new Date())',
    description: 'Check if date is a holiday',
    needsDateInput: true
  },
  {
    name: 'getHolidays',
    example: 'getHolidays(startDate, endDate)',
    description: 'Get holidays in date range',
    needsDateInputs: 2
  },
  {
    name: 'getNextHoliday',
    example: 'getNextHoliday(new Date())',
    description: 'Get next holiday from date',
    needsDateInput: true
  },

  // Working Hours
  {
    name: 'getWorkingHoursBetween',
    example: 'getWorkingHoursBetween(startDate, endDate)',
    description: 'Calculate working hours between dates',
    needsDateInputs: 2
  },
  {
    name: 'addWorkingHours',
    example: 'addWorkingHours(new Date(), 8)',
    description: 'Add working hours to date',
    needsTimeUnit: true,
    unitType: 'workingHours'
  },
  {
    name: 'isWorkingHours',
    example: 'isWorkingHours(new Date())',
    description: 'Check if within working hours',
    needsDateInput: true
  },
  {
    name: 'getNextWorkingHour',
    example: 'getNextWorkingHour(new Date())',
    description: 'Get next working hour',
    needsDateInput: true
  },

  // Business Day Operations
  {
    name: 'getBusinessDays',
    example: 'getBusinessDays(startDate, endDate)',
    description: 'Get business days in range',
    needsDateInputs: 2
  },

  // Configuration Functions
  {
    name: 'getBusinessDayConfig',
    example: 'getBusinessDayConfig()',
    description: 'Get current business day configuration',
    needsNothing: true
  },
  {
    name: 'resetBusinessDayConfig',
    example: 'resetBusinessDayConfig()',
    description: 'Reset business day config to defaults',
    needsNothing: true
  },

  // Advanced Functions
  {
    name: 'getNthWeekdayOfMonth',
    example: 'getNthWeekdayOfMonth(year, month, n, weekday)',
    description: 'Get Nth occurrence of weekday in month',
    needsMultiNumber: [2024, 1, 2, 1], // year, month, nth, weekday (1=Monday)
    needsCustom: true
  },
  {
    name: 'calculateBusinessDaysAdvanced',
    example: 'calculateBusinessDaysAdvanced(startDate, endDate)',
    description: 'Advanced business days calculation',
    needsDateInputs: 2
  }
]
</script>