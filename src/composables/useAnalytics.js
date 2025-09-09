import { getCurrentInstance } from 'vue'

export function useAnalytics() {
    const instance = getCurrentInstance()
    
    if (!instance) {
        console.warn('useAnalytics must be called within a component setup')
        return createMockAnalytics()
    }

    const gtag = instance.appContext.config.globalProperties.$gtag
    const trackEvent = instance.appContext.config.globalProperties.$trackEvent
    const trackFunctionUsage = instance.appContext.config.globalProperties.$trackFunctionUsage
    const trackCategoryNavigation = instance.appContext.config.globalProperties.$trackCategoryNavigation
    const trackDocumentationView = instance.appContext.config.globalProperties.$trackDocumentationView
    const trackDemoInteraction = instance.appContext.config.globalProperties.$trackDemoInteraction

    return {
        // Core tracking functions
        trackEvent,
        trackFunctionUsage,
        trackCategoryNavigation,
        trackDocumentationView,
        trackDemoInteraction,

        // Specific tracking methods for ChronoUtilz app
        trackButtonClick: (buttonName, location = '') => {
            trackEvent('button_click', {
                category: 'UI Interaction',
                label: buttonName,
                button_location: location
            })
        },

        trackFunctionDemo: (functionName, category, inputValues = {}, result = null, error = null) => {
            trackEvent('function_demo', {
                category: 'Function Demo',
                label: functionName,
                function_category: category,
                function_name: functionName,
                demo_interaction: error ? 'error' : 'success',
                input_complexity: Object.keys(inputValues).length,
                has_error: !!error,
                error_type: error?.name || null
            })
        },

        trackCodeCopy: (functionName, codeType = 'example') => {
            trackEvent('code_copy', {
                category: 'Code Interaction',
                label: functionName,
                function_name: functionName,
                code_type: codeType
            })
        },

        trackSearchUsage: (searchTerm, resultsCount = 0) => {
            trackEvent('search', {
                category: 'Search',
                label: searchTerm,
                search_term: searchTerm,
                results_count: resultsCount
            })
        },

        trackTabChange: (fromTab, toTab, context = '') => {
            trackEvent('tab_change', {
                category: 'Navigation',
                label: `${fromTab} -> ${toTab}`,
                from_tab: fromTab,
                to_tab: toTab,
                context: context
            })
        },

        trackModalOpen: (modalType, trigger = '') => {
            trackEvent('modal_open', {
                category: 'Modal Interaction',
                label: modalType,
                modal_type: modalType,
                trigger: trigger
            })
        },

        trackModalClose: (modalType, method = '') => {
            trackEvent('modal_close', {
                category: 'Modal Interaction',
                label: modalType,
                modal_type: modalType,
                close_method: method
            })
        },

        trackFormSubmission: (formType, success = true, errors = []) => {
            trackEvent('form_submit', {
                category: 'Form Interaction',
                label: formType,
                form_type: formType,
                success: success,
                error_count: errors.length,
                errors: errors.join(', ')
            })
        },

        trackExternalLink: (url, linkText = '') => {
            trackEvent('external_link', {
                category: 'External Navigation',
                label: url,
                link_url: url,
                link_text: linkText
            })
        },

        trackDownload: (fileName, fileType = '') => {
            trackEvent('file_download', {
                category: 'Download',
                label: fileName,
                file_name: fileName,
                file_type: fileType
            })
        },

        trackUserPreference: (preferenceType, value) => {
            trackEvent('user_preference', {
                category: 'User Preferences',
                label: `${preferenceType}: ${value}`,
                preference_type: preferenceType,
                preference_value: value
            })
        },

        trackAPIError: (endpoint, errorCode, errorMessage = '') => {
            trackEvent('api_error', {
                category: 'API Error',
                label: endpoint,
                api_endpoint: endpoint,
                error_code: errorCode,
                error_message: errorMessage.substring(0, 100)
            })
        },

        trackPerformanceMetric: (metricName, value, unit = 'ms') => {
            trackEvent('performance_metric', {
                category: 'Performance',
                label: metricName,
                metric_name: metricName,
                metric_value: value,
                metric_unit: unit,
                value: value
            })
        },

        trackAdInteraction: (adType, action, adClient = 'ca-pub-4915550631846848') => {
            trackEvent('ad_interaction', {
                category: 'AdSense',
                label: `${adType}_${action}`,
                ad_type: adType,
                ad_action: action,
                ad_client: adClient
            })
        },

        trackAdImpression: (adSlot, adFormat = 'auto') => {
            trackEvent('ad_impression', {
                category: 'AdSense',
                label: adSlot,
                ad_slot: adSlot,
                ad_format: adFormat,
                ad_client: 'ca-pub-4915550631846848'
            })
        },

        trackAdRevenue: (value, currency = 'USD', adSlot = '') => {
            if (gtag) {
                gtag('event', 'ad_impression', {
                    currency: currency,
                    value: value,
                    ad_slot: adSlot,
                    ad_client: 'ca-pub-4915550631846848'
                })
            }
        },

        // Enhanced conversion tracking
        trackGoalCompletion: (goalType, value = 1) => {
            if (gtag) {
                gtag('event', 'conversion', {
                    send_to: 'G-JBMP2VX5L8',
                    event_category: 'Goal',
                    event_label: goalType,
                    value: value
                })
            }
        },

        // Custom dimensions and metrics
        setCustomDimension: (index, value) => {
            if (gtag) {
                gtag('config', 'G-JBMP2VX5L8', {
                    [`custom_parameter_${index}`]: value
                })
            }
        },

        // User identification (for logged-in users)
        setUserId: (userId) => {
            if (gtag) {
                gtag('config', 'G-JBMP2VX5L8', {
                    user_id: userId
                })
            }
        },

        // Direct gtag access for advanced users
        gtag
    }
}

// Mock analytics for when component instance is not available
function createMockAnalytics() {
    const noop = () => {}
    
    return {
        trackEvent: noop,
        trackFunctionUsage: noop,
        trackCategoryNavigation: noop,
        trackDocumentationView: noop,
        trackDemoInteraction: noop,
        trackButtonClick: noop,
        trackFunctionDemo: noop,
        trackCodeCopy: noop,
        trackSearchUsage: noop,
        trackTabChange: noop,
        trackModalOpen: noop,
        trackModalClose: noop,
        trackFormSubmission: noop,
        trackExternalLink: noop,
        trackDownload: noop,
        trackUserPreference: noop,
        trackAPIError: noop,
        trackPerformanceMetric: noop,
        trackAdInteraction: noop,
        trackAdImpression: noop,
        trackAdRevenue: noop,
        trackGoalCompletion: noop,
        setCustomDimension: noop,
        setUserId: noop,
        gtag: noop
    }
}