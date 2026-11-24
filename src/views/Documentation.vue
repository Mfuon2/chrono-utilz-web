<script setup>
import {RouterLink} from 'vue-router';
import examples from '../generated/examples.json';
import behavior from '../generated/behavior.md?raw';
import MarkdownIt from 'markdown-it';
import {highlight} from '../lib/highlight';
const guidance=new MarkdownIt({html:false,highlight:(code,lang)=>`<pre><code class="hljs">${highlight(code,lang||'typescript')}</code></pre>`}).render(behavior.replace(/^# [^\n]+\n/,''));
</script>
<template><section class="page docs-page"><div class="eyebrow">GUIDE / GET STARTED</div><h1>Make time explicit.</h1><p class="lead">Install the package, choose a focused import and run an example.</p><pre><code v-highlight="{code:'npm install @mfuon2/chrono-utilz',lang:'bash'}"></code></pre><p>Node.js 22+ and modern browsers with Intl. No runtime dependencies. CommonJS, ES modules and TypeScript declarations are included. For the smallest imports, use named exports or a subpath such as <code>@mfuon2/chrono-utilz/addTime</code>.</p><div class="guide-nav"><RouterLink to="/api-docs">API reference →</RouterLink><RouterLink to="/playground">Open playground →</RouterLink></div><h2>Executable examples</h2><article class="api-entry" v-for="example in examples" :key="example.id"><h3>{{example.title}}</h3><pre><code v-highlight="example.code"></code></pre><p class="expected">Output: {{example.output}}</p><RouterLink :to="{path:'/playground',query:{example:example.id}}">Open in playground →</RouterLink></article><h2>Behavior and migration</h2><div class="guidance" v-html="guidance"></div></section></template>
