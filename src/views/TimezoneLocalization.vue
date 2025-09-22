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
      <h2 class="text-2xl font-semibold mb-6">Try Timezone & Localization</h2>
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
      { name: 'convertTimezone', description: 'Convert date to specific timezone' },
      { name: 'toUTC', description: 'Convert local time to UTC' },
      { name: 'getTimezoneOffset', description: 'Get timezone offset in minutes' },
      { name: 'getUserTimezone', description: 'Get user timezone' }
    ]
  },
  {
    name: 'Timezone Formatting',
    functions: [
      { name: 'formatTimezone', description: 'Format date in specific timezone' },
      { name: 'formatLocalized', description: 'Format date with locale' },
      { name: 'formatRelativeLocalized', description: 'Format relative time with locale' },
      { name: 'getTimezoneString', description: 'Get timezone string representation' },
      { name: 'formatCustom', description: 'Format date with custom pattern' },
      { name: 'formatISO', description: 'Format date in ISO format' }
    ]
  },
  {
    name: 'Timezone Information',
    functions: [
      { name: 'listTimezones', description: 'Get list of available timezones' },
      { name: 'getTimezoneInfo', description: 'Get detailed timezone information' },
      { name: 'getTimezonesByRegion', description: 'Get timezones by region' },
      { name: 'getTimezonesByOffset', description: 'Get timezones by offset' },
      { name: 'searchTimezones', description: 'Search timezones by name' },
      { name: 'configureTimezone', description: 'Configure timezone settings' },
      { name: 'getTimezoneConfig', description: 'Get current timezone configuration' }
    ]
  }
]

const demoFunctions = [
  // Timezone Conversion Functions
  {
    name: 'convertTimezone',
    example: 'convertTimezone(new Date(), "America/New_York")',
    description: 'Convert date to specific timezone',
    needsDateInput: true,
    needsStringInput: true,
    defaultStringValue: 'America/New_York'
  },
  {
    name: 'toUTC',
    example: 'toUTC(new Date())',
    description: 'Convert local time to UTC',
    needsDateInput: true
  },
  {
    name: 'getTimezoneOffset',
    example: 'getTimezoneOffset(new Date(), "America/Chicago")',
    description: 'Get timezone offset in minutes',
    needsDateInput: true,
    needsStringInput: true,
    defaultStringValue: 'America/Chicago'
  },
  {
    name: 'getUserTimezone',
    example: 'getUserTimezone()',
    description: 'Get user timezone',
    needsNothing: true
  },

  // Timezone Formatting Functions
  {
    name: 'formatTimezone',
    example: 'formatTimezone(new Date(), "America/Los_Angeles")',
    description: 'Format date in specific timezone',
    needsDateInput: true,
    needsStringInput: true,
    defaultStringValue: 'America/Los_Angeles'
  },
  {
    name: 'formatLocalized',
    example: 'formatLocalized(new Date(), "en-US")',
    description: 'Format date with locale',
    needsDateInput: true,
    needsStringInput: true,
    defaultStringValue: 'en-US'
  },
  {
    name: 'formatRelativeLocalized',
    example: 'formatRelativeLocalized(new Date(), "fr-FR")',
    description: 'Format relative time with locale',
    needsDateInput: true,
    needsStringInput: true,
    defaultStringValue: 'fr-FR'
  },
  {
    name: 'getTimezoneString',
    example: 'getTimezoneString(new Date(), "Asia/Tokyo")',
    description: 'Get timezone string representation',
    needsDateInput: true,
    needsStringInput: true,
    defaultStringValue: 'Asia/Tokyo'
  },

  // Timezone Information Functions
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
    needsStringInput: true,
    defaultStringValue: 'Australia/Sydney'
  },
  {
    name: 'getTimezonesByRegion',
    example: 'getTimezonesByRegion("America")',
    description: 'Get timezones by region',
    needsStringInput: true,
    defaultStringValue: 'America'
  },
  {
    name: 'searchTimezones',
    example: 'searchTimezones("New_York")',
    description: 'Search timezones by name',
    needsStringInput: true,
    defaultStringValue: 'New_York'
  },

  // Additional Formatting Functions
  {
    name: 'formatCustom',
    example: 'formatCustom(new Date(), "YYYY-MM-DD HH:mm")',
    description: 'Format date with custom pattern',
    needsDateInput: true,
    needsStringInput: true,
    defaultStringValue: 'YYYY-MM-DD HH:mm'
  },
  {
    name: 'formatISO',
    example: 'formatISO(new Date())',
    description: 'Format date in ISO format',
    needsDateInput: true
  },
  {
    name: 'formatDate',
    example: 'formatDate(new Date(), "MM/DD/YYYY")',
    description: 'Format date with pattern',
    needsDateInput: true,
    needsStringInput: true,
    defaultStringValue: 'MM/DD/YYYY'
  },

  // Timezone Configuration
  {
    name: 'configureTimezone',
    example: 'configureTimezone({timezone: "America/New_York"})',
    description: 'Configure timezone settings',
    needsStringInput: true,
    defaultStringValue: 'America/New_York'
  },
  {
    name: 'getTimezoneConfig',
    example: 'getTimezoneConfig()',
    description: 'Get current timezone configuration',
    needsNothing: true
  },
  {
    name: 'getTimezonesByOffset',
    example: 'getTimezonesByOffset(-5)',
    description: 'Get timezones by offset',
    needsNumberInput: true,
    defaultNumberValue: -5
  }
]
</script>