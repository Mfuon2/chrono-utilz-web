import fs from 'node:fs';
import {build} from 'esbuild';

export const SANDBOX_CSP = "default-src 'none'; script-src 'unsafe-inline' 'unsafe-eval' blob:; worker-src blob:; connect-src 'none'; img-src 'none'; media-src 'none'; font-src 'none'; style-src 'none'; frame-src 'none'; child-src blob:; form-action 'none'; base-uri 'none'";

const {outputFiles}=await build({entryPoints:['src/sandbox-runtime.js'],bundle:true,write:false,minify:true,platform:'browser',format:'iife',target:'es2020'});
const source=JSON.stringify(outputFiles[0].text).replace(/</g,'\\u003c');

// Runs in the opaque-origin iframe. It starts one worker per run, forwards only
// well-formed messages, and caps what a run can send back to the page.
const bootstrap=`let worker,token,count=0;const source=${source};
function stop(){if(worker){worker.terminate();worker=null;}}
function forward(message){parent.postMessage({...message,token},'*');}
addEventListener('message',event=>{
 if(event.source!==parent||!event.data||typeof event.data!=='object')return;
 if(event.data.type==='stop'){stop();return;}
 if(event.data.type!=='run'||typeof event.data.code!=='string')return;
 stop();token=event.data.token;count=0;
 const url=URL.createObjectURL(new Blob([source],{type:'text/javascript'}));
 worker=new Worker(url);URL.revokeObjectURL(url);
 worker.onmessage=e=>{
  const data=e.data;if(!data||typeof data!=='object')return;
  if(data.type==='log'){if(++count>100){forward({type:'error',text:'Output limit reached. Log less data per run.'});stop();return;}forward({type:'log',level:data.level==='error'?'error':'log',text:String(data.text).slice(0,2100)});return;}
  if(data.type==='error'){forward({type:'error',text:String(data.text).slice(0,2100)});stop();return;}
  if(data.type==='done'){forward({type:'done'});stop();}
 };
 worker.onerror=e=>{e.preventDefault();forward({type:'error',text:String(e.message||'Error').replace(/^Uncaught /,'').slice(0,2100)});stop();};
 worker.postMessage({code:event.data.code});
});
parent.postMessage({type:'ready'},'*');`;

fs.writeFileSync('public/sandbox.html',`<!doctype html><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="${SANDBOX_CSP}"><script>${bootstrap}</script>`);
console.log(`Built isolated playground runtime: ${outputFiles[0].contents.length} bytes.`);
