<template>
  <div class="adsense-container">
    <!-- Auto Ads (managed by AdSense) - no manual placement needed -->
    
    <!-- Manual Display Ad Example (requires ad slot ID) -->
    <div 
      v-if="showDisplayAd && adSlotId" 
      class="ad-section my-6"
    >
      <div class="text-xs text-gray-500 mb-2 text-center">Advertisement</div>
      <ins 
        class="adsbygoogle"
        style="display:block"
        :data-ad-client="adSenseClient"
        :data-ad-slot="adSlotId"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
    
    <!-- In-Article Ad Example -->
    <div 
      v-if="showInArticleAd && inArticleSlotId" 
      class="ad-section my-6"
    >
      <div class="text-xs text-gray-500 mb-2 text-center">Advertisement</div>
      <ins 
        class="adsbygoogle"
        style="display:block; text-align:center;"
        :data-ad-client="adSenseClient"
        :data-ad-slot="inArticleSlotId"
        data-ad-format="fluid"
        data-ad-layout="in-article"
      ></ins>
    </div>
    
    <!-- Multiplex Ad Example -->
    <div 
      v-if="showMultiplexAd && multiplexSlotId" 
      class="ad-section my-6"
    >
      <div class="text-xs text-gray-500 mb-2 text-center">Advertisement</div>
      <ins 
        class="adsbygoogle"
        style="display:block"
        :data-ad-client="adSenseClient"
        :data-ad-slot="multiplexSlotId"
        data-ad-format="autorelaxed"
      ></ins>
    </div>
  </div>
</template>

<script setup>
import { onMounted, nextTick } from 'vue'
import { useAdSense } from '../composables/useAdSense.js'
import { useAnalytics } from '../composables/useAnalytics.js'

// Props for customization
const props = defineProps({
  showDisplayAd: {
    type: Boolean,
    default: false
  },
  showInArticleAd: {
    type: Boolean,
    default: false
  },
  showMultiplexAd: {
    type: Boolean,
    default: false
  },
  adSlotId: {
    type: String,
    default: ''
  },
  inArticleSlotId: {
    type: String,
    default: ''
  },
  multiplexSlotId: {
    type: String,
    default: ''
  }
})

// Use composables
const { 
  adSenseClient, 
  pushAd, 
  loadAdsInContainer, 
  checkAdSenseAvailability 
} = useAdSense()

const { trackAdInteraction, trackAdImpression } = useAnalytics()

// Load ads after component mounts
onMounted(() => {
  nextTick(() => {
    if (checkAdSenseAvailability()) {
      // Load any manual ads in this component
      const adElements = document.querySelectorAll('.adsbygoogle[data-ad-client]')
      adElements.forEach((ad, index) => {
        if (!ad.dataset.adsbygoogleStatus) {
          pushAd(ad)
          
          // Track ad impression
          const adSlot = ad.dataset.adSlot || `unknown_${index}`
          const adFormat = ad.dataset.adFormat || 'auto'
          trackAdImpression(adSlot, adFormat)
          
          // Track ad interaction when clicked
          ad.addEventListener('click', () => {
            trackAdInteraction('display_ad', 'click', adSenseClient)
          })
        }
      })
      
      console.log(`Loaded ${adElements.length} manual ads in AdSense component`)
    } else {
      console.warn('AdSense not available in AdSense component')
    }
  })
})
</script>

<style scoped>
.adsense-container {
  width: 100%;
}

.ad-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 50px;
  margin: 1.5rem 0;
}

.adsbygoogle {
  margin: 0 auto;
  max-width: 100%;
}

/* Responsive ad sizes */
@media (max-width: 768px) {
  .adsbygoogle {
    max-width: 320px;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .adsbygoogle {
    max-width: 728px;
  }
}

@media (min-width: 1025px) {
  .adsbygoogle {
    max-width: 970px;
  }
}
</style>