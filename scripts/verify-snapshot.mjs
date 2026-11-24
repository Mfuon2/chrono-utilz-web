import fs from 'node:fs';import {createHash} from 'node:crypto';import assert from 'node:assert/strict';
const release=JSON.parse(fs.readFileSync('src/generated/release.json'));
const api=JSON.parse(fs.readFileSync('src/generated/api.json'));
assert.equal(release.version,api.version);
assert.equal(createHash('sha256').update(fs.readFileSync('src/generated/chrono-utilz.mjs')).digest('hex'),release.integrity);
assert(api.api.length>0);assert(new Set(api.api.map(item=>item.name)).size===api.api.length);
for(const item of api.api)assert(item.signature.trim(),item.name);
console.log(`Verified pinned library snapshot ${release.version}, ${api.api.length} APIs and bundle integrity.`);

const library=await import('../src/generated/chrono-utilz.mjs');
assert.deepEqual(Object.keys(library).filter(name=>typeof library[name]==='function').sort(),api.api.map(item=>item.name).sort());
