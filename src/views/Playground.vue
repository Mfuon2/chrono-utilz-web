<script setup>
import {ref,computed,onMounted,onUnmounted,watch} from 'vue';
import {useRoute} from 'vue-router';
import examples from '../generated/examples.json';
import manifest from '../generated/api.json';
import release from '../generated/release.json';
import {highlight} from '../lib/highlight';
const route=useRoute(),frame=ref(null),code=ref(''),selected=ref('business-days'),output=ref([]),running=ref(false),ready=ref(false),status=ref('Ready');
let timer,token=0;
const layer=ref(null);
const highlighted=computed(()=>highlight(code.value)+'\n');
function syncScroll(event){if(layer.value){layer.value.scrollTop=event.target.scrollTop;layer.value.scrollLeft=event.target.scrollLeft;}}
function loadExample(){code.value=(examples.find(e=>e.id===selected.value)||examples[0]).code;output.value=[];}
function loadRoute(){
  if(route.query.example){selected.value=String(route.query.example);loadExample();}
  else if(route.query.api && manifest.api.some(a=>a.name===route.query.api)){
    selected.value='';code.value=`import { ${route.query.api} } from '@mfuon2/chrono-utilz';\n\n// Add arguments using the API reference.\nconsole.log(${route.query.api});`;
  } else loadExample();
}
function stop(message='Stopped'){clearTimeout(timer);frame.value?.contentWindow?.postMessage({type:'stop'},'*');running.value=false;status.value=message;}
function run(){
  if(!ready.value)return;stop();output.value=[];running.value=true;status.value='Running';token++;
  frame.value.contentWindow.postMessage({type:'run',code:code.value,token},'*');
  timer=setTimeout(()=>{stop('Execution timed out after 2 seconds');output.value.push({level:'error',text:'Execution timed out after 2 seconds. The worker was terminated.'});},2000);
}
function receive(event){
  if(event.source!==frame.value?.contentWindow)return;
  if(event.data.type==='ready'){ready.value=true;return;}
  if(event.data.token!==token||!running.value)return;
  if(event.data.type==='log')output.value.push(event.data);
  if(event.data.type==='error'){output.value.push({level:'error',text:event.data.text});stop('Error');}
  if(event.data.type==='done')stop('Complete');
}
onMounted(()=>{loadRoute();window.addEventListener('message',receive);});
onUnmounted(()=>{stop();window.removeEventListener('message',receive);});
watch(()=>route.query,loadRoute);
</script>
<template><section class="page playground"><div class="eyebrow">PLAYGROUND / v{{release.version}}</div><h1>Try it. Change it. Run it.</h1><p class="lead">Paste JavaScript or TypeScript with ChronoUtilz imports. Every run starts with fresh library state.</p><div class="play-toolbar"><label for="example-select">Example</label><select id="example-select" v-model="selected" @change="loadExample"><option disabled value="">Custom code</option><option v-for="example in examples" :key="example.id" :value="example.id">{{example.title}}</option></select><span class="run-status" role="status">{{status}}</span><button class="button" @click="run" :disabled="!ready||running">Run code</button><button class="button secondary" @click="stop()" :disabled="!running">Stop</button></div><div class="editor-grid"><div><label class="panel-heading" for="code-editor">EXAMPLE CODE</label><div class="code-editor"><pre ref="layer" class="code-layer" aria-hidden="true"><code class="hljs" v-html="highlighted"></code></pre><textarea id="code-editor" v-model="code" spellcheck="false" autocapitalize="off" autocomplete="off" aria-label="Example code" @scroll="syncScroll"></textarea></div></div><div class="output-panel"><div class="panel-heading">CONSOLE OUTPUT</div><div class="console" aria-live="polite"><p v-if="!output.length" class="console-empty">Run your code to see results.</p><pre v-for="(line,index) in output" :key="index" :class="{error:line.level==='error'}">{{line.text}}</pre></div></div></div><p class="muted">TypeScript is transpiled without type checking. Only ChronoUtilz imports are available. Code runs in a sandboxed worker with network access blocked and a two-second execution limit.</p><iframe ref="frame" src="/sandbox.html" sandbox="allow-scripts" title="Isolated code runner" hidden></iframe></section></template>
