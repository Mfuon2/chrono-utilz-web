// Runs every playground API example (as the sandbox does) against a fresh copy of the library.
import fs from 'node:fs';
import {pathToFileURL} from 'node:url';
import {transform} from 'sucrase';
import {apiExample} from '../src/lib/api-examples.js';

const {api}=JSON.parse(fs.readFileSync('src/generated/api.json','utf8'));
const libraryUrl=pathToFileURL('src/generated/chrono-utilz.mjs').href;
const AsyncFunction=Object.getPrototypeOf(async()=>{}).constructor;
const failures=[];
for(const entry of api){
  const library=await import(`${libraryUrl}?${entry.name}`);
  const code=transform(apiExample(entry),{transforms:['typescript','imports']}).code;
  const output=[];
  try {
    await new AsyncFunction('require','console','exports','module',code)(()=>library,{log:(...values)=>output.push(values.map(String).join(' '))},{}, {exports:{}});
    const text=output.join('\n');
    if(!output.length||/^(null|undefined)$/.test(text)||/Invalid Date|NaN|=>|\{\s*\[native code\]/.test(text)) failures.push(`${entry.name}: unhelpful output "${text}"`);
  } catch(error) { failures.push(`${entry.name}: ${error.message}`); }
}
if(failures.length){console.error(failures.join('\n'));process.exit(1);}
console.log(`All ${api.length} API playground examples run and print a result.`);
