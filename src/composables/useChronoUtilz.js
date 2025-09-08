import { ref } from 'vue'
import ChronoUtilz, * as ChronoUtilzExports from '@mfuon2/chrono-utilz'

export function useChronoUtilz() {
  const loading = ref(false)
  const error = ref(null)

  const getFunctions = () => {
    // Merge the default export with named exports for complete function access
    const allFunctions = { ...ChronoUtilz, ...ChronoUtilzExports }
    const functions = Object.getOwnPropertyNames(allFunctions)
      .filter(name => typeof allFunctions[name] === 'function')
      .map(name => ({
        name,
        signature: allFunctions[name].toString().split('{')[0].trim()
      }))
    
    return {
      totalFunctions: functions.length,
      functions
    }
  }

  const getLibrary = () => {
    // Return combined library with all functions
    return { ...ChronoUtilz, ...ChronoUtilzExports }
  }

  return {
    loading,
    error,
    getFunctions,
    getLibrary
  }
}