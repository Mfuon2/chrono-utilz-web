import {chromium,firefox,webkit} from '@playwright/test';
import {strict as assert} from 'node:assert';
import {spawn} from 'node:child_process';
import fs from 'node:fs';
const base=process.env.TEST_URL || 'http://127.0.0.1:4173';
const server=process.env.TEST_URL?null:spawn(process.execPath,['node_modules/vite/bin/vite.js','preview','--host','127.0.0.1','--port','4173'],{stdio:'pipe'});
try {
 for(let attempt=0;attempt<100;attempt++) {try {if((await fetch(base)).ok)break;}catch{}await new Promise(resolve=>setTimeout(resolve,100));}
 for(const [name,engine] of Object.entries({chromium,firefox,webkit}).filter(([name])=>!process.env.BROWSERS||process.env.BROWSERS.split(',').includes(name))){
  const browser=await engine.launch();
  try {
   const context=await browser.newContext({timezoneId:'Africa/Nairobi'}),page=await context.newPage();
   const failures=[];page.on('pageerror',e=>failures.push(e.message));
   await page.goto(base+'/playground');
   const run=page.getByRole('button',{name:'Run code',exact:true});await run.waitFor();
   await page.waitForFunction(()=>!document.querySelector('.play-toolbar button').disabled);
   for(const example of JSON.parse(fs.readFileSync('src/generated/examples.json'))){
    await page.selectOption('#example-select',example.id);await run.click();
    await page.waitForFunction(()=>document.querySelector('[role=status]').textContent!=='Running');
    assert.equal(await page.locator('[role=status]').innerText(),'Complete',`${name}: ${example.id}: ${await page.locator('.console').innerText()}`);
    assert.equal((await page.locator('.console').innerText()).trim(),example.output,`${name}: ${example.id}`);
   }
   const execute=async code=>{await page.fill('#code-editor',code);await run.click();await page.waitForFunction(()=>document.querySelector('[role=status]').textContent!=='Running');return page.locator('.console').innerText();};
   assert.match(await execute("import { missing } from 'other-package'; console.log(missing);"),/Only ChronoUtilz imports/);
   assert.match(await execute('throw new Error("test failure")'),/test failure/);
   assert.match(await execute('const x: = ;'),/Error|Unexpected/);
   assert.match(await execute('while(true) {}'),/timed out/);
   await page.fill('#code-editor','await new Promise(()=>{});');await run.click();await page.getByRole('button',{name:'Stop',exact:true}).click();assert.equal(await page.locator('[role=status]').innerText(),'Stopped');
   assert.match(await execute("console.log(typeof fetch, typeof XMLHttpRequest, typeof WebSocket); try { console.log(parent.document); } catch(e) { console.log('isolated'); }"),/undefined undefined undefined[\s\S]*isolated/);
   await page.goto(base+'/api-docs');await page.locator('.api-entry').first().waitFor();assert.equal(await page.locator('.api-entry').count(),136);
   await page.fill('#api-search','convertTimezone');assert.equal(await page.locator('.api-entry').count(),1);
   await page.getByRole('link',{name:'Use in playground'}).click();await page.waitForURL('**/playground?api=convertTimezone');assert.match(await page.inputValue('#code-editor'),/import \{ convertTimezone \}/);
   await page.goto(base+'/documentation');await page.getByRole('link',{name:'Open in playground'}).first().waitFor();assert.equal(await page.getByRole('link',{name:'Open in playground'}).count(),12);
   await page.goto(base+'/demo');await page.waitForURL('**/playground');
   for(const route of ['/documentation','/api-docs','/playground']) {
    const response=await page.goto(base+route);assert.equal(response.status(),200,`${name}: direct ${route}`);await page.locator('main h1').waitFor();
    const refreshed=await page.reload();assert.equal(refreshed.status(),200,`${name}: refresh ${route}`);await page.locator('main h1').waitFor();
   }
   await page.setViewportSize({width:390,height:844});await page.goto(base+'/');
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
   if(name==='chromium')await page.screenshot({path:'test-results/home-mobile.png',fullPage:true});
   await page.setViewportSize({width:1440,height:1000});
   if(name==='chromium'){await page.screenshot({path:'test-results/home-desktop.png',fullPage:true});await page.goto(base+'/playground');await page.screenshot({path:'test-results/playground-desktop.png',fullPage:true});}
   assert.deepEqual(failures,[],`${name}: page errors`);
   console.log(`${name}: 12 runnable examples, JS/TS, error handling, timeout/stop, isolation, API search, links and responsive layout passed.`);
  } finally {await browser.close();}
 }
} finally {server?.kill();}
