<template>
  <header class="bg-slate-900 text-white shadow-xl border-b border-slate-700/50 relative">
    <!-- GitHub Badge -->
    <a href="https://github.com/Mfuon2/chrono-utilz"
       target="_blank"
       class="github-badge absolute top-4 right-4 z-20 flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 text-white hover:bg-white/20 transition-all duration-300"
       aria-label="View source on GitHub">
      <svg class="w-5 h-5 github-icon" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.205 11.387.6.111.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.744.083-.729.083-.729 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
      </svg>
      <span class="text-sm font-medium">GitHub</span>
    </a>

    <div class="container mx-auto px-4 py-6">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="flex items-center space-x-4">
          <ChronoUtilzLogo variant="horizontal" size="small" />
          <div class="text-sm">
            <LibraryStatus />
          </div>
        </div>
        <nav class="mt-4 md:mt-0">
          <ul class="flex flex-wrap space-x-4 text-sm">
            <li><RouterLink to="/" class="hover:text-cyan-400 transition-colors duration-200">Home</RouterLink></li>
            <li><RouterLink to="/documentation" class="hover:text-cyan-400 transition-colors duration-200">Documentation</RouterLink></li>
            <li><RouterLink to="/api-docs" class="hover:text-cyan-400 transition-colors duration-200">API Docs</RouterLink></li>
            <li class="relative group">
              <a href="#" class="hover:text-indigo-200 transition">Playgrounds ▾</a>
              <div class="absolute top-full left-0 bg-white text-gray-800 rounded-lg shadow-lg min-w-48 hidden group-hover:block z-10">
                <RouterLink to="/core-operations" class="block px-4 py-2 hover:bg-indigo-50">Core Operations</RouterLink>
                <RouterLink to="/business-utilities" class="block px-4 py-2 hover:bg-indigo-50">Business Utilities</RouterLink>
                <RouterLink to="/formatting-parsing" class="block px-4 py-2 hover:bg-indigo-50">Formatting & Parsing</RouterLink>
                <RouterLink to="/timezone-localization" class="block px-4 py-2 hover:bg-indigo-50">Timezone & Localization</RouterLink>
                <RouterLink to="/comparison-validation" class="block px-4 py-2 hover:bg-indigo-50">Comparison & Validation</RouterLink>
                <RouterLink to="/utility-functions" class="block px-4 py-2 hover:bg-indigo-50">Utility Functions</RouterLink>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import LibraryStatus from './LibraryStatus.vue'
import ChronoUtilzLogo from './ChronoUtilzLogo.vue'
</script>

<style scoped>
.github-badge {
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.github-badge:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.github-icon {
  background: linear-gradient(to right, #60a5fa 0%, #22d3ee 50%, #3b82f6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: all 0.3s ease;
}

.github-badge:hover .github-icon {
  background: linear-gradient(to right, #3b82f6 0%, #06b6d4 50%, #2563eb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transform: scale(1.1);
}

.github-badge span {
  background: linear-gradient(to right, #60a5fa 0%, #22d3ee 50%, #3b82f6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: all 0.3s ease;
}

.github-badge:hover span {
  background: linear-gradient(to right, #3b82f6 0%, #06b6d4 50%, #2563eb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Mobile responsiveness */
@media (max-width: 640px) {
  .github-badge {
    top: 2px;
    right: 2px;
    padding: 0.5rem;
  }

  .github-badge span {
    display: none;
  }
}
</style>