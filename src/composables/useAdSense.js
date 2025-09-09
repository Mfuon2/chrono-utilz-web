import { ref, onMounted, nextTick } from 'vue'

export function useAdSense() {
    const isAdSenseLoaded = ref(false)
    const adSenseClient = 'ca-pub-4915550631846848'
    
    // Check if AdSense is available
    const checkAdSenseAvailability = () => {
        return typeof window !== 'undefined' && window.adsbygoogle
    }
    
    // Initialize AdSense auto ads
    const initializeAutoAds = () => {
        if (!checkAdSenseAvailability()) {
            console.warn('AdSense not available yet, retrying in 1 second...')
            setTimeout(initializeAutoAds, 1000)
            return
        }
        
        try {
            // Enable auto ads
            (window.adsbygoogle = window.adsbygoogle || []).push({
                google_ad_client: adSenseClient,
                enable_page_level_ads: true,
                overlays: {bottom: true}
            })
            
            isAdSenseLoaded.value = true
            console.log('AdSense Auto Ads initialized successfully')
        } catch (error) {
            console.error('Error initializing AdSense:', error)
        }
    }
    
    // Create a responsive display ad
    const createDisplayAd = (slotId, options = {}) => {
        if (!checkAdSenseAvailability()) {
            console.warn('AdSense not available for display ad')
            return null
        }
        
        const adConfig = {
            google_ad_client: adSenseClient,
            google_ad_slot: slotId,
            google_ad_format: options.format || 'auto',
            google_full_width_responsive: options.responsive !== false,
            ...options
        }
        
        return adConfig
    }
    
    // Push ad to AdSense queue
    const pushAd = (adElement) => {
        if (!checkAdSenseAvailability()) {
            console.warn('AdSense not available for pushing ad')
            return
        }
        
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({})
            console.log('Ad pushed to AdSense queue')
        } catch (error) {
            console.error('Error pushing ad:', error)
        }
    }
    
    // Refresh ads on a page (useful for SPA navigation)
    const refreshAds = () => {
        if (!checkAdSenseAvailability()) {
            console.warn('AdSense not available for refreshing')
            return
        }
        
        try {
            // Clear existing ads
            const existingAds = document.querySelectorAll('.adsbygoogle')
            existingAds.forEach(ad => {
                if (ad.dataset.adsbygoogleStatus) {
                    delete ad.dataset.adsbygoogleStatus
                }
            })
            
            // Re-initialize ads
            (window.adsbygoogle = window.adsbygoogle || []).push({})
            console.log('Ads refreshed')
        } catch (error) {
            console.error('Error refreshing ads:', error)
        }
    }
    
    // Load ads for a specific container
    const loadAdsInContainer = (containerId) => {
        if (!checkAdSenseAvailability()) {
            console.warn('AdSense not available for container ads')
            return
        }
        
        nextTick(() => {
            try {
                const container = document.getElementById(containerId)
                if (container) {
                    const ads = container.querySelectorAll('.adsbygoogle[data-ad-client]')
                    ads.forEach(() => {
                        (window.adsbygoogle = window.adsbygoogle || []).push({})
                    })
                    console.log(`Loaded ${ads.length} ads in container: ${containerId}`)
                }
            } catch (error) {
                console.error('Error loading container ads:', error)
            }
        })
    }
    
    // Create an in-article ad configuration
    const createInArticleAd = (options = {}) => {
        return {
            google_ad_client: adSenseClient,
            google_ad_format: 'fluid',
            google_ad_layout: 'in-article',
            google_ad_slot: options.slot || '',
            ...options
        }
    }
    
    // Create a multiplex ad configuration  
    const createMultiplexAd = (options = {}) => {
        return {
            google_ad_client: adSenseClient,
            google_ad_format: 'autorelaxed',
            google_ad_slot: options.slot || '',
            ...options
        }
    }
    
    // Track ad performance with Google Analytics
    const trackAdPerformance = (adType, action) => {
        if (window.gtag) {
            window.gtag('event', 'ad_interaction', {
                event_category: 'AdSense',
                event_label: adType,
                ad_action: action,
                ad_client: adSenseClient
            })
        }
    }
    
    // Initialize AdSense when composable is used
    onMounted(() => {
        // Delay initialization to ensure AdSense script is loaded
        setTimeout(initializeAutoAds, 500)
    })
    
    return {
        // State
        isAdSenseLoaded,
        adSenseClient,
        
        // Methods
        initializeAutoAds,
        createDisplayAd,
        createInArticleAd,
        createMultiplexAd,
        pushAd,
        refreshAds,
        loadAdsInContainer,
        trackAdPerformance,
        checkAdSenseAvailability
    }
}