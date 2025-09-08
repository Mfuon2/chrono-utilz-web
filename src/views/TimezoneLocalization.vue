<template>
  <div class="container mx-auto px-4 py-8">
    <div class="text-center mb-8">
      <div class="inline-flex items-center mb-4">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Timezone & Localization</h1>
          <p class="text-lg text-gray-600">Multi-timezone and internationalization support</p>
        </div>
      </div>
      <LibraryStatus />
    </div>
    
    <CategoryNavigation current="Timezone & Localization" />
    
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
      <h2 class="text-2xl font-semibold mb-4">Try Timezone & Localization</h2>
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
    name: 'Timezone Conversion',
    functions: [
      { name: 'convertToTimezone', description: 'Convert date to specific timezone' },
      { name: 'convertFromTimezone', description: 'Convert date from specific timezone' },
      { name: 'toUTC', description: 'Convert local time to UTC' },
      { name: 'fromUTC', description: 'Convert UTC to local time' }
    ]
  },
  {
    name: 'Timezone Formatting',
    functions: [
      { name: 'formatInTimezone', description: 'Format date in specific timezone' },
      { name: 'formatToTimezone', description: 'Format date to timezone' },
      { name: 'formatWithTimezone', description: 'Format date with timezone display' },
      { name: 'formatUTC', description: 'Format date in UTC' }
    ]
  },
  {
    name: 'Timezone Information',
    functions: [
      { name: 'getTimezoneOffset', description: 'Get timezone offset in minutes' },
      { name: 'listTimezones', description: 'Get list of available timezones' },
      { name: 'getTimezoneInfo', description: 'Get detailed timezone information' },
      { name: 'isValidTimezone', description: 'Check if timezone is valid' }
    ]
  }
]

const demoFunctions = [
  // Timezone Conversion Functions
  {
    name: 'convertToTimezone',
    example: 'convertToTimezone(new Date(), "America/New_York")',
    description: 'Convert date to specific timezone',
    needsDateInput: true,
    needsStringInput: true
  },
  {
    name: 'convertFromTimezone',
    example: 'convertFromTimezone(date, "Europe/London")',
    description: 'Convert date from specific timezone',
    needsDateInput: true,
    needsStringInput: true
  },
  {
    name: 'toUTC',
    example: 'toUTC(new Date())',
    description: 'Convert local time to UTC',
    needsDateInput: true
  },
  {
    name: 'fromUTC',
    example: 'fromUTC(utcDate)',
    description: 'Convert UTC to local time',
    needsDateInput: true
  },

  // Timezone Formatting Functions
  {
    name: 'formatInTimezone',
    example: 'formatInTimezone(new Date(), "America/Los_Angeles")',
    description: 'Format date in specific timezone',
    needsDateInput: true,
    needsStringInput: true
  },
  {
    name: 'formatToTimezone',
    example: 'formatToTimezone(new Date(), "Asia/Tokyo")',
    description: 'Format date to timezone',
    needsDateInput: true,
    needsStringInput: true
  },
  {
    name: 'formatWithTimezone',
    example: 'formatWithTimezone(new Date(), "Europe/Paris")',
    description: 'Format date with timezone display',
    needsDateInput: true,
    needsStringInput: true
  },
  {
    name: 'formatUTC',
    example: 'formatUTC(new Date())',
    description: 'Format date in UTC',
    needsDateInput: true
  },

  // Timezone Information Functions
  {
    name: 'getTimezoneOffset',
    example: 'getTimezoneOffset("America/Chicago")',
    description: 'Get timezone offset in minutes',
    needsStringInput: true
  },
  {
    name: 'listTimezones',
    example: 'listTimezones()',
    description: 'Get list of available timezones',
    needsNothing: true
  },
  {
    name: 'getTimezoneInfo',
    example: 'getTimezoneInfo("Australia/Sydney")',
    description: 'Get detailed timezone information',
    needsStringInput: true
  },
  {
    name: 'isValidTimezone',
    example: 'isValidTimezone("Pacific/Auckland")',
    description: 'Check if timezone is valid',
    needsStringInput: true
  },

  // Locale-specific Functions
  {
    name: 'formatLocalized',
    example: 'formatLocalized(new Date(), "en-US")',
    description: 'Format date with locale-specific formatting',
    needsDateInput: true,
    needsStringInput: true
  },
  {
    name: 'formatLocalizedShort',
    example: 'formatLocalizedShort(new Date(), "de-DE")',
    description: 'Format in short localized format',
    needsDateInput: true,
    needsStringInput: true
  },
  {
    name: 'formatLocalizedLong',
    example: 'formatLocalizedLong(new Date(), "fr-FR")',
    description: 'Format in long localized format',
    needsDateInput: true,
    needsStringInput: true
  },

  // Advanced Timezone Operations
  {
    name: 'getTimezoneAbbreviation',
    example: 'getTimezoneAbbreviation("America/New_York")',
    description: 'Get timezone abbreviation (EST, PST, etc.)',
    needsStringInput: true
  },
  {
    name: 'isDaylightSaving',
    example: 'isDaylightSaving(new Date(), "America/New_York")',
    description: 'Check if date is in daylight saving time',
    needsDateInput: true,
    needsStringInput: true
  },
  {
    name: 'getTimezoneTransitions',
    example: 'getTimezoneTransitions("Europe/London", 2024)',
    description: 'Get DST transitions for timezone and year',
    needsStringInput: true,
    needsNumberInput: true
  }
]
</script>