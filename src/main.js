import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import routes from './router/routes.js'
import './assets/css/style.css'
import { createGtag } from 'vue-gtag'

const router = createRouter({
    history: createWebHistory(),
    routes
})

const app = createApp(App)

app.use(router)

// Enhanced Google Analytics 4 Configuration
app.use(createGtag({
    tagId: 'G-JBMP2VX5L8',
    appName: 'ChronoUtilz Documentation',
    config: {
        // Enhanced ecommerce and user engagement
        send_page_view: true,
        anonymize_ip: true,
        allow_google_signals: true,
        allow_ad_personalization_signals: false,
        // Custom parameters for ChronoUtilz tracking
        custom_map: {
            custom_parameter_1: 'function_category',
            custom_parameter_2: 'function_name',
            custom_parameter_3: 'demo_interaction'
        },
        // Debug mode (set to false in production)
        debug_mode: process.env.NODE_ENV === 'development',
        // Cookie settings
        cookie_expires: 63072000, // 2 years
        cookie_update: true,
        cookie_flags: 'SameSite=None;Secure'
    },
    pageTracker: {
        router: router,
        sendPageView: true,
        useScreenview: false
    }
}))

// Custom event tracking helpers available globally
app.config.globalProperties.$trackEvent = (eventName, parameters = {}) => {
    if (app.config.globalProperties.$gtag) {
        app.config.globalProperties.$gtag('event', eventName, {
            event_category: parameters.category || 'User Interaction',
            event_label: parameters.label || '',
            value: parameters.value || 1,
            custom_parameter_1: parameters.function_category || '',
            custom_parameter_2: parameters.function_name || '',
            custom_parameter_3: parameters.demo_interaction || '',
            ...parameters
        })
    }
}

// Track function usage specifically for ChronoUtilz
app.config.globalProperties.$trackFunctionUsage = (functionName, category = 'Unknown', result = 'success') => {
    app.config.globalProperties.$trackEvent('function_test', {
        category: 'Function Usage',
        label: functionName,
        function_category: category,
        function_name: functionName,
        demo_interaction: result,
        test_result: result
    })
}

// Track navigation between function categories
app.config.globalProperties.$trackCategoryNavigation = (fromCategory, toCategory) => {
    app.config.globalProperties.$trackEvent('category_navigation', {
        category: 'Navigation',
        label: `${fromCategory} -> ${toCategory}`,
        from_category: fromCategory,
        to_category: toCategory
    })
}

// Track user engagement with documentation
app.config.globalProperties.$trackDocumentationView = (section, subsection = '') => {
    app.config.globalProperties.$trackEvent('documentation_view', {
        category: 'Documentation',
        label: section,
        documentation_section: section,
        documentation_subsection: subsection
    })
}

// Track demo interactions
app.config.globalProperties.$trackDemoInteraction = (interactionType, details = {}) => {
    app.config.globalProperties.$trackEvent('demo_interaction', {
        category: 'Demo Usage',
        label: interactionType,
        demo_interaction: interactionType,
        ...details
    })
}

// Enhanced error tracking
app.config.errorHandler = (error, instance, info) => {
    console.error('Vue Error:', error, info)
    
    // Track errors in Google Analytics
    if (app.config.globalProperties.$gtag) {
        app.config.globalProperties.$gtag('event', 'exception', {
            description: error.message || 'Unknown error',
            fatal: false,
            error_component: instance?.$options?.name || 'Unknown',
            error_info: info,
            error_stack: error.stack?.substring(0, 500) // Limit stack trace length
        })
    }
}

// Track performance metrics
const trackPerformance = () => {
    if ('performance' in window) {
        const navigation = performance.getEntriesByType('navigation')[0]
        if (navigation && app.config.globalProperties.$gtag) {
            app.config.globalProperties.$gtag('event', 'timing_complete', {
                name: 'page_load',
                value: Math.round(navigation.loadEventEnd - navigation.loadEventStart)
            })
        }
    }
}

// Track performance after app mounts
app.mount('#app')

// Initialize Google AdSense Auto Ads
const initializeAdSense = () => {
    if (typeof window !== 'undefined' && window.adsbygoogle) {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({
                google_ad_client: 'ca-pub-4915550631846848',
                enable_page_level_ads: true,
                overlays: {bottom: true}
            })
            console.log('AdSense Auto Ads initialized globally')
        } catch (error) {
            console.error('Error initializing AdSense:', error)
        }
    } else {
        // Retry if AdSense script hasn't loaded yet
        setTimeout(initializeAdSense, 1000)
    }
}

// Initialize AdSense after a brief delay
setTimeout(initializeAdSense, 1000)

// Initialize performance tracking
if (document.readyState === 'complete') {
    trackPerformance()
} else {
    window.addEventListener('load', trackPerformance)
}

// Track user engagement time
let startTime = Date.now()
let isActive = true

const trackEngagement = () => {
    if (isActive && app.config.globalProperties.$gtag) {
        const engagementTime = Math.round((Date.now() - startTime) / 1000)
        if (engagementTime > 10) { // Only track meaningful engagement
            app.config.globalProperties.$gtag('event', 'user_engagement', {
                engagement_time_msec: engagementTime * 1000
            })
        }
    }
}

// Track visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
        trackEngagement()
        isActive = false
    } else {
        startTime = Date.now()
        isActive = true
    }
})

// Track engagement before page unload
window.addEventListener('beforeunload', trackEngagement)

// Track scroll depth for longer pages
let maxScrollDepth = 0
const trackScrollDepth = () => {
    const scrollDepth = Math.round((window.scrollY + window.innerHeight) / document.body.scrollHeight * 100)
    if (scrollDepth > maxScrollDepth && scrollDepth <= 100) {
        maxScrollDepth = scrollDepth
        if (scrollDepth >= 25 && scrollDepth % 25 === 0) {
            if (app.config.globalProperties.$gtag) {
                app.config.globalProperties.$gtag('event', 'scroll', {
                    event_category: 'Engagement',
                    event_label: `${scrollDepth}%`,
                    value: scrollDepth
                })
            }
        }
    }
}

let scrollTimeout
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout)
    scrollTimeout = setTimeout(trackScrollDepth, 100)
})