<script setup>
import {RouterLink} from 'vue-router';
import examples from '../generated/examples.json';
import release from '../generated/release.json';
</script>
<template>
<section class="hero page"><div class="eyebrow">DATE UTILITIES / JAVASCRIPT + TYPESCRIPT</div><h1>Dates you can<br>build on.</h1><p class="lead">Precise date utilities, from everyday calculations to business scheduling. Import what you need. Keep your application lean.</p><div class="actions"><RouterLink class="button" to="/documentation">Get started →</RouterLink><RouterLink class="button secondary" to="/playground">Try the playground</RouterLink></div><div class="install"><span>npm install @mfuon2/chrono-utilz</span><small>v{{release.version}}</small></div></section>
<section class="page intro-grid"><div><div class="eyebrow">SMALL IMPORTS. USEFUL RESULTS.</div><h2>A working-day deadline,<br>in two functions.</h2><p>Skip weekends and configured holidays. Format the result. Use the same focused helpers in Node.js and the browser.</p><RouterLink :to="{path:'/playground',query:{example:'business-days'}}">Run this example →</RouterLink></div><pre><code v-highlight="examples[0].code+'\n// '+examples[0].output"></code></pre></section>
<section class="page feature-grid"><article><span>01 / CALENDAR</span><h3>Predictable arithmetic</h3><p>Clamped month ends, ISO weeks, calendar boundaries and recurring dates with explicit rules.</p></article><article><span>02 / BUSINESS</span><h3>Schedules that add up</h3><p>Working days, overnight intervals, fiscal quarters, payroll periods and project milestones.</p></article><article><span>03 / TIMEZONES</span><h3>The right clock time</h3><p>Preserve instants, display IANA timezones and handle ambiguous local times explicitly.</p></article></section>
<section class="page closing"><h2>Understand every result.</h2><p>Typed APIs, executable examples and documented edge cases.</p><RouterLink to="/api-docs">Explore the API reference →</RouterLink></section>
</template>
