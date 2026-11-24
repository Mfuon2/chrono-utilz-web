<script setup>
import {ref,computed} from 'vue';
import {RouterLink,useRoute} from 'vue-router';
import manifest from '../generated/api.json';
const route=useRoute();const search=ref(route.query.q || '');
const filtered=computed(()=>manifest.api.filter(item=>(item.name+' '+item.summary).toLowerCase().includes(search.value.toLowerCase())));
</script>
<template><section class="page docs-page"><div class="eyebrow">REFERENCE / v{{manifest.version}}</div><h1>Every exported API.</h1><p class="lead">Generated from the shipped TypeScript exports. {{manifest.api.length}} callable APIs, with signatures and behavior.</p><label class="search-label" for="api-search">Find a function</label><input id="api-search" class="search" v-model="search" placeholder="Search names or behavior…"><p class="muted">{{filtered.length}} results · <RouterLink to="/documentation">Read date semantics and limitations</RouterLink></p><article class="api-entry" v-for="item in filtered" :key="item.name" :id="item.name"><h2>{{item.name}} <small>{{item.kind}}</small></h2><p>{{item.summary}}</p><pre><code>{{item.signature}}</code></pre><RouterLink :to="{path:'/playground',query:{api:item.name}}">Use in playground →</RouterLink></article><p v-if="!filtered.length">No matching APIs.</p><details class="types"><summary>Public TypeScript types ({{manifest.types.length}})</summary><article v-for="type in manifest.types" :key="type.name"><h3>{{type.name}}</h3><pre><code>{{type.declaration}}</code></pre></article></details></section></template>
