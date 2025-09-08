<template>
  <div class="container mx-auto px-4 py-8">
    <div class="text-center mb-8">
      <div class="inline-flex items-center mb-4">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Formatting & Parsing</h1>
          <p class="text-lg text-gray-600">Date formatting and parsing functions</p>
        </div>
      </div>
      <LibraryStatus />
    </div>
    
    <CategoryNavigation current="Formatting & Parsing" />
    
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
      <h2 class="text-2xl font-semibold mb-4">Try Formatting & Parsing</h2>
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
    name: 'Date Formatting',
    functions: [
      { name: 'formatISO', description: 'Format date in ISO 8601 format' },
      { name: 'formatCustom', description: 'Format date with custom pattern' },
      { name: 'formatLocalized', description: 'Format date with locale-specific formatting' },
      { name: 'formatCalendar', description: 'Format date in calendar format' },
      { name: 'formatTimezone', description: 'Format date with timezone' },
      { name: 'formatRelativeLocalized', description: 'Format relative time with localization' },
      { name: 'toISOString', description: 'Convert date to ISO string' },
      { name: 'formatDate', description: 'Format date with specified pattern' }
    ]
  },
  {
    name: 'Date Parsing',
    functions: [
      { name: 'parseISO', description: 'Parse ISO 8601 date string' },
      { name: 'parseMultipleFormats', description: 'Parse date with multiple format attempts' },
      { name: 'smartParse', description: 'Intelligently parse various date formats' },
      { name: 'parseNaturalLanguage', description: 'Parse natural language date expressions' },
      { name: 'parseDate', description: 'Parse date string with format' },
      { name: 'validateDateFormat', description: 'Validate date format string' }
    ]
  },
  {
    name: 'Duration & Time Formatting',
    functions: [
      { name: 'formatDuration', description: 'Format duration in human-readable format' },
      { name: 'humanizeDuration', description: 'Humanize duration in readable format' },
      { name: 'formatTime', description: 'Format time component' },
      { name: 'getRelativeTime', description: 'Get relative time representation' },
      { name: 'formatElapsed', description: 'Format elapsed time' }
    ]
  }
]

const demoFunctions = [
  // Date Formatting Functions (ACTUAL library functions only)
  {
    name: 'formatISO',
    example: 'formatISO(new Date())',
    description: 'Format date in ISO 8601 format',
    needsDateInput: true
  },
  {
    name: 'formatCustom',
    example: 'formatCustom(new Date(), "YYYY-MM-DD HH:mm:ss")',
    description: 'Format date with custom pattern',
    needsDateInput: true,
    needsFormat: true
  },
  {
    name: 'formatLocalized',
    example: 'formatLocalized(new Date(), "en-US", {})',
    description: 'Format date with locale-specific formatting',
    needsDateInput: true,
    needsStringInput: true
  },
  {
    name: 'formatDate',
    example: 'formatDate(new Date(), "YYYY-MM-DD")',
    description: 'Format date with specified pattern',
    needsDateInput: true,
    needsFormat: true
  },
  {
    name: 'formatCalendar',
    example: 'formatCalendar(new Date())',
    description: 'Format date in calendar format',
    needsDateInput: true
  },
  {
    name: 'formatTimezone',
    example: 'formatTimezone(new Date(), "America/New_York")',
    description: 'Format date with timezone',
    needsDateInput: true,
    needsStringInput: true
  },
  {
    name: 'formatRelativeLocalized',
    example: 'formatRelativeLocalized(new Date(), new Date(), "en-US")',
    description: 'Format relative time with localization',
    needsDateInputs: 2,
    needsStringInput: true
  },

  // Date Parsing Functions (ACTUAL library functions only)
  {
    name: 'parseISO',
    example: 'parseISO("2024-01-01T10:30:00Z")',
    description: 'Parse ISO 8601 date string',
    needsStringInput: true
  },
  {
    name: 'parseMultipleFormats',
    example: 'parseMultipleFormats("01/15/2024", ["MM/DD/YYYY", "DD/MM/YYYY"])',
    description: 'Parse date with multiple format attempts',
    needsStringInput: true,
    needsCustom: true
  },
  {
    name: 'smartParse',
    example: 'smartParse("January 15th, 2024")',
    description: 'Intelligently parse various date formats',
    needsStringInput: true
  },
  {
    name: 'parseNaturalLanguage',
    example: 'parseNaturalLanguage("next Monday")',
    description: 'Parse natural language date expressions',
    needsStringInput: true
  },
  {
    name: 'parseDate',
    example: 'parseDate("2024-01-01", "YYYY-MM-DD")',
    description: 'Parse date string with format',
    needsStringInput: true,
    needsFormat: true
  },
  {
    name: 'validateDateFormat',
    example: 'validateDateFormat("2024-01-01", "YYYY-MM-DD")',
    description: 'Validate if date matches format',
    needsStringInput: true,
    needsFormat: true
  },

  // Duration & Time Formatting (ACTUAL library functions only)
  {
    name: 'formatDuration',
    example: 'formatDuration(3661000)',
    description: 'Format duration in milliseconds to human-readable',
    needsNumberInput: true
  },
  {
    name: 'humanizeDuration',
    example: 'humanizeDuration(3661000)',
    description: 'Humanize duration in milliseconds',
    needsNumberInput: true
  },
  {
    name: 'getRelativeTime',
    example: 'getRelativeTime(new Date(), new Date())',
    description: 'Get relative time between dates',
    needsDateInputs: 2
  },
]
</script>