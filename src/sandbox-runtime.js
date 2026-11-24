import {transform} from 'sucrase';
import * as library from './generated/chrono-utilz.mjs';

// The sandbox also applies a network-denying CSP. Each run gets a new worker.
for(const key of ['fetch','XMLHttpRequest','WebSocket','EventSource','importScripts','Worker','SharedWorker']) {
  Object.defineProperty(globalThis,key,{value:undefined,writable:false,configurable:false});
}
const send=globalThis.postMessage.bind(globalThis);
const serialize=value=>{
  if(typeof value==='string') return value;
  if(typeof value==='bigint') return `${value}n`;
  if(value===undefined) return 'undefined';
  if(value instanceof Error) return `${value.name}: ${value.message}`;
  const seen=new WeakSet();
  try {return JSON.stringify(value,(_,item)=>{if(typeof item==='bigint')return `${item}n`;if(typeof item==='object'&&item!==null){if(seen.has(item))return '[Circular]';seen.add(item);}return item;},2) ?? String(value);}
  catch {return String(value);}
};
onmessage=async event=>{
  try {
    const code=transform(event.data.code,{transforms:['typescript','imports'],filePath:'example.ts'}).code;
    let lines=0;const output={};for(const level of ['log','info','warn','error','debug','table']) output[level]=(...values)=>{if(lines++>=100)throw Error('Console output limit reached');send({type:'log',level,text:values.map(serialize).join(' ').slice(0,20000)});};
    const load=name=>{
      if(name==='@mfuon2/chrono-utilz') return library;
      const prefix='@mfuon2/chrono-utilz/';
      const key=name.startsWith(prefix)?name.slice(prefix.length):'';
      if(key&&typeof library[key]==='function') return {[key]:library[key]};
      throw Error(`Only ChronoUtilz imports are available: ${name}`);
    };
    const AsyncFunction=Object.getPrototypeOf(async function(){}).constructor;
    await new AsyncFunction('require','console','exports','module',code)(load,Object.freeze(output),{}, {exports:{}});
    send({type:'done'});
  } catch(error) {send({type:'error',text:serialize(error)});}
};
