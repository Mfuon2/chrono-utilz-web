<script setup>
import {RouterLink,RouterView} from 'vue-router';
import release from './generated/release.json';
</script>
<template>
  <header class="site-header"><RouterLink to="/" class="wordmark"><span class="brand-mark">C</span>ChronoUtilz</RouterLink><nav aria-label="Main navigation"><RouterLink to="/documentation">Documentation</RouterLink><RouterLink to="/api-docs">API reference</RouterLink><RouterLink to="/playground">Playground</RouterLink><a href="https://github.com/Mfuon2/chrono-utilz">GitHub ↗</a></nav><span class="version">v{{release.version}}</span></header>
  <main><RouterView /></main>
  <footer><span>ChronoUtilz · MIT license</span><span>Zero runtime dependencies. Explicit date behavior.</span></footer>
</template>
