<template>
  <div>
    <p class="text-white-200">✓ {{ totalFunctions }} functions loaded</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useChronoUtilz } from '../composables/useChronoUtilz'

const { getFunctions } = useChronoUtilz()
const totalFunctions = ref(0)

onMounted(() => {
  const data = getFunctions()
  totalFunctions.value = data.totalFunctions
})
</script>