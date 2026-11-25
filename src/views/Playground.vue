<script setup>
import {ref,computed,onMounted,onUnmounted,watch} from 'vue';
import {useRoute} from 'vue-router';
import examples from '../generated/examples.json';
import manifest from '../generated/api.json';
import release from '../generated/release.json';
import {highlight} from '../lib/highlight';
import {apiExample} from '../lib/api-examples';

const MAX_CODE=20000,MAX_LINES=100,TIMEOUT=2000,COOLDOWN=500,RUNS_PER_MINUTE=20;
const GUIDE_LABELS={'business-days':'Business days','timezone':'Timezones','iso':'ISO parsing','calendar':'Month-end clamp','recurrence':'Recurring dates','working-hours':'Working hours','natural-language':'Natural language','formatting':'Custom formats','fiscal':'Fiscal quarters','duration':'Durations','holidays':'Holidays','typescript':'TypeScript'};
const guides=examples.map(e=>({value:e.id,label:GUIDE_LABELS[e.id]||e.title,code:e.code}));
const functions=manifest.api.map(entry=>({value:`api:${entry.name}`,label:entry.name,code:apiExample(entry)})).sort((a,b)=>a.label.localeCompare(b.label));
const options=new Map([...guides,...functions].map(o=>[o.value,o]));

const route=useRoute(),frame=ref(null),code=ref(''),selected=ref('business-days'),output=ref([]),running=ref(false),ready=ref(false),status=ref('Ready');
const zone=Intl.DateTimeFormat().resolvedOptions().timeZone;
let timer,token=0,lastRun=0;const recentRuns=[];
const layer=ref(null);
const highlighted=computed(()=>highlight(code.value)+'\n');
function syncScroll(event){if(layer.value){layer.value.scrollTop=event.target.scrollTop;layer.value.scrollLeft=event.target.scrollLeft;}}
function loadExample(){code.value=(options.get(selected.value)||guides[0]).code;output.value=[];}
function loadRoute(){
  if(route.query.example&&options.has(String(route.query.example)))selected.value=String(route.query.example);
  else if(route.query.api&&options.has(`api:${route.query.api}`))selected.value=`api:${route.query.api}`;
  loadExample();
}
function stop(message='Stopped'){clearTimeout(timer);frame.value?.contentWindow?.postMessage({type:'stop'},'*');running.value=false;status.value=message;}
function refuse(message){output.value=[{level:'error',text:message}];status.value='Not run';}
function run(){
  if(!ready.value||running.value)return;
  const now=Date.now();
  while(recentRuns.length&&now-recentRuns[0]>60000)recentRuns.shift();
  if(now-lastRun<COOLDOWN)return refuse('Please wait a moment between runs.');
  if(recentRuns.length>=RUNS_PER_MINUTE)return refuse(`Run limit reached. Try again in ${Math.ceil((60000-(now-recentRuns[0]))/1000)} seconds.`);
  if(code.value.length>MAX_CODE)return refuse(`Code is limited to ${MAX_CODE.toLocaleString('en')} characters.`);
  lastRun=now;recentRuns.push(now);
  output.value=[];running.value=true;status.value='Running';token++;
  frame.value.contentWindow.postMessage({type:'run',code:code.value,token},'*');
  timer=setTimeout(()=>{stop('Timed out');output.value.push({level:'error',text:'Stopped after 2 seconds.'});},TIMEOUT);
}
function receive(event){
  if(event.source!==frame.value?.contentWindow||!event.data||typeof event.data!=='object')return;
  const data=event.data;
  if(data.type==='ready'){ready.value=true;return;}
  if(data.token!==token||!running.value)return;
  if(data.type==='log'&&output.value.length<MAX_LINES)output.value.push({level:data.level==='error'?'error':'log',text:String(data.text)});
  if(data.type==='error'){output.value.push({level:'error',text:String(data.text)});stop('Error');}
  if(data.type==='done')stop('Complete');
}
onMounted(()=>{loadRoute();window.addEventListener('message',receive);});
onUnmounted(()=>{stop();window.removeEventListener('message',receive);});
watch(()=>route.query,loadRoute);
</script>
<template><section class="page playground"><div class="eyebrow">PLAYGROUND / v{{release.version}}</div><h1>Try it. Change it. Run it.</h1><p class="lead">Pick an example or write your own. Each run starts fresh.</p><div class="play-toolbar"><label for="example-select">Example</label><select id="example-select" v-model="selected" @change="loadExample"><optgroup label="Guides"><option v-for="option in guides" :key="option.value" :value="option.value">{{option.label}}</option></optgroup><optgroup :label="`Functions (${functions.length})`"><option v-for="option in functions" :key="option.value" :value="option.value">{{option.label}}</option></optgroup></select><span class="run-status" role="status">{{status}}</span><button class="button" @click="run" :disabled="!ready||running">Run code</button><button class="button secondary" @click="stop()" :disabled="!running">Stop</button></div><div class="editor-grid"><div><label class="panel-heading" for="code-editor">CODE</label><div class="code-editor"><pre ref="layer" class="code-layer" aria-hidden="true"><code class="hljs" v-html="highlighted"></code></pre><textarea id="code-editor" v-model="code" :maxlength="MAX_CODE" spellcheck="false" autocapitalize="off" autocomplete="off" aria-label="Code" @scroll="syncScroll"></textarea></div></div><div class="output-panel"><div class="panel-heading">OUTPUT</div><div class="console" aria-live="polite"><p v-if="!output.length" class="console-empty">Run your code to see results.</p><pre v-for="(line,index) in output" :key="index" :class="{error:line.level==='error'}">{{line.text}}</pre></div><p v-if="output.length" class="console-note">Dates shown in {{zone}}. Use <code>.toISOString()</code> for UTC.</p></div></div><p class="muted">Runs offline in an isolated sandbox. Only ChronoUtilz imports work. Limits: 2 seconds per run, 20 runs a minute, 100 output lines.</p><iframe ref="frame" src="/sandbox.html" sandbox="allow-scripts" title="Isolated code runner" hidden></iframe></section></template>
