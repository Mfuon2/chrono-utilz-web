<template>
  <div class="chrono-utilz-logo" :class="logoClasses">
    <!-- Full Logo -->
    <img 
      v-if="variant === 'full'"
      :src="logoSrc"
      :alt="altText"
      :width="width"
      :height="height"
      :class="imageClasses"
      @click="handleClick"
    />
    
    <!-- Horizontal Logo -->
    <img 
      v-else-if="variant === 'horizontal'"
      :src="horizontalLogoSrc"
      :alt="altText"
      :width="width"
      :height="height"
      :class="imageClasses"
      @click="handleClick"
    />
    
    <!-- Logo Mark (icon only) -->
    <img 
      v-else-if="variant === 'mark'"
      :src="markLogoSrc"
      :alt="altText"
      :width="width"
      :height="height"
      :class="imageClasses"
      @click="handleClick"
    />
    
    <!-- Text-only version -->
    <div v-else-if="variant === 'text'" :class="textClasses" @click="handleClick">
      <span class="text-gradient-red">Chrono</span><span class="text-gradient-blue">Utilz</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAnalytics } from '../composables/useAnalytics.js'

const props = defineProps({
  variant: {
    type: String,
    default: 'full',
    validator: (value) => ['full', 'horizontal', 'mark', 'text'].includes(value)
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large', 'xlarge'].includes(value)
  },
  clickable: {
    type: Boolean,
    default: true
  },
  showSubtitle: {
    type: Boolean,
    default: true
  },
  customWidth: {
    type: [Number, String],
    default: null
  },
  customHeight: {
    type: [Number, String],
    default: null
  }
})

const router = useRouter()
const analytics = useAnalytics()

// Logo sources
const logoSrc = computed(() => '/logo.svg')
const horizontalLogoSrc = computed(() => '/logo-horizontal.svg')
const markLogoSrc = computed(() => '/logo-mark.svg')

// Size configurations
const sizeConfig = computed(() => {
  const sizes = {
    small: { 
      full: { width: 200, height: 60 },
      horizontal: { width: 150, height: 30 },
      mark: { width: 40, height: 40 },
      text: 'text-lg'
    },
    medium: { 
      full: { width: 400, height: 120 },
      horizontal: { width: 300, height: 60 },
      mark: { width: 80, height: 80 },
      text: 'text-2xl'
    },
    large: { 
      full: { width: 500, height: 150 },
      horizontal: { width: 375, height: 75 },
      mark: { width: 100, height: 100 },
      text: 'text-4xl'
    },
    xlarge: { 
      full: { width: 600, height: 180 },
      horizontal: { width: 450, height: 90 },
      mark: { width: 120, height: 120 },
      text: 'text-5xl'
    }
  }
  return sizes[props.size] || sizes.medium
})

// Computed properties
const width = computed(() => {
  if (props.customWidth) return props.customWidth
  if (props.variant === 'text') return 'auto'
  return sizeConfig.value[props.variant]?.width
})

const height = computed(() => {
  if (props.customHeight) return props.customHeight
  if (props.variant === 'text') return 'auto'
  return sizeConfig.value[props.variant]?.height
})

const altText = computed(() => 'ChronoUtilz - Date Utility Library')

const logoClasses = computed(() => [
  'inline-flex items-center',
  {
    'cursor-pointer hover:opacity-80 transition-opacity duration-200': props.clickable,
    'select-none': true
  }
])

const imageClasses = computed(() => [
  'max-w-full h-auto',
  {
    'drop-shadow-md': props.size === 'large' || props.size === 'xlarge'
  }
])

const textClasses = computed(() => [
  'font-bold tracking-tight',
  'font-nunito', // Use Nunito font
  sizeConfig.value.text,
  {
    'drop-shadow-sm': true
  }
])

// Click handler
const handleClick = () => {
  if (!props.clickable) return
  
  // Track logo click
  analytics.trackButtonClick('logo', `logo_${props.variant}_${props.size}`)
  
  // Navigate to home
  if (router.currentRoute.value.path !== '/') {
    router.push('/')
  }
}
</script>

<style scoped>
.chrono-utilz-logo {
  display: inline-flex;
  align-items: center;
}

.text-gradient-red {
  background: linear-gradient(to right, #60a5fa 0%, #22d3ee 50%, #3b82f6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.text-gradient-blue {
  background: linear-gradient(to right, #60a5fa 0%, #22d3ee 50%, #3b82f6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Hover effects for clickable logos */
.chrono-utilz-logo:hover .text-gradient-red {
  background: linear-gradient(to right, #3b82f6 0%, #06b6d4 50%, #2563eb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.chrono-utilz-logo:hover .text-gradient-blue {
  background: linear-gradient(to right, #3b82f6 0%, #06b6d4 50%, #2563eb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .chrono-utilz-logo img {
    max-width: 100%;
    height: auto;
  }
}

/* Print styles */
@media print {
  .chrono-utilz-logo {
    filter: grayscale(100%);
  }
}
</style>