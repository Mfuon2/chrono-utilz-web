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
   let runs=0;
   const open=async(query='')=>{await page.goto(base+'/playground'+query);await page.waitForFunction(()=>document.querySelector('.play-toolbar button')?.disabled===false);runs=0;};
   const run=page.getByRole('button',{name:'Run code',exact:true});
   const press=async()=>{if(runs>=15)await open();runs++;await page.waitForTimeout(550);await run.click();await page.waitForFunction(()=>document.querySelector('[role=status]').textContent!=='Running');};
   await open();
   assert.equal(await page.locator('#example-select option').count(),12+136,`${name}: every guide and function is listed`);
   for(const example of JSON.parse(fs.readFileSync('src/generated/examples.json'))){
    await page.selectOption('#example-select',example.id);await press();
    assert.equal(await page.locator('[role=status]').innerText(),'Complete',`${name}: ${example.id}: ${await page.locator('.console').innerText()}`);
    assert.equal((await page.locator('.console').innerText()).trim(),example.output,`${name}: ${example.id}`);
   }
   const execute=async code=>{await page.fill('#code-editor',code);await press();return page.locator('.console').innerText();};
   // Function examples run and show local dates instead of library source.
   for(const fn of ['addBusinessDays','convertTimezone','generateDateRange','CalendarDate']){
    await page.selectOption('#example-select','api:'+fn);await press();
    assert.equal(await page.locator('[role=status]').innerText(),'Complete',`${name}: ${fn}: ${await page.locator('.console').innerText()}`);
   }
   await open('?api=addBusinessDays');assert.equal(await page.inputValue('#example-select'),'api:addBusinessDays');
   assert.equal((await execute("import { addBusinessDays } from '@mfuon2/chrono-utilz'; console.log(addBusinessDays('2025-01-03', 3));")).trim(),'2025-01-08 00:00:00 GMT+3');
   assert.match(await page.locator('.console-note').innerText(),/Africa\/Nairobi/);
   const leaked=await execute("import { addBusinessDays, CalendarDate } from '@mfuon2/chrono-utilz'; console.log(addBusinessDays); console.log(String(addBusinessDays)); console.log(Function.prototype.toString.call(CalendarDate.prototype.toString)); console.log({ fn: addBusinessDays });");
   assert.match(leaked,/\[Function addBusinessDays\]/);assert.match(leaked,/\[native code\]/);assert.doesNotMatch(leaked,/throw|return|=>|isSafeInteger/,`${name}: library source leaked`);
   assert.match(await execute("import { addBusinessDays } from '@mfuon2/chrono-utilz'; addBusinessDays('2025-01-03', 1e9);"),/^ChronoUtilzError: Business days must be an integer between/m);
   assert.match(await execute("import { missing } from 'other-package'; console.log(missing);"),/Only ChronoUtilz imports/);
   assert.match(await execute('throw new Error("test failure")'),/test failure/);
   assert.match(await execute('const x: = ;'),/Error|Unexpected/);
   assert.match(await execute('while(true) {}'),/Stopped after 2 seconds/);
   await page.fill('#code-editor','await new Promise(()=>{});');await page.waitForTimeout(550);await run.click();runs++;await page.getByRole('button',{name:'Stop',exact:true}).click();assert.equal(await page.locator('[role=status]').innerText(),'Stopped');
   assert.match(await execute("console.log(typeof fetch, typeof XMLHttpRequest, typeof WebSocket, typeof importScripts, typeof Worker, typeof WebAssembly); try { console.log(parent.document); } catch(e) { console.log('isolated'); }"),/undefined undefined undefined undefined undefined undefined[\s\S]*isolated/);
   assert.match(await execute("try { await import('https://example.com/x.js'); console.log('loaded'); } catch { console.log('blocked'); }"),/blocked/);
   // Floods are capped, whether through console or a spoofed postMessage.
   assert.match(await execute("for (let i = 0; i < 1e6; i++) console.log(i);"),/Output limit reached/);
   assert.match(await execute("let post = self.postMessage; for (let o = self; !post && o; o = Object.getPrototypeOf(o)) post = Object.getOwnPropertyDescriptor(o, 'postMessage')?.value; if (!post) console.log('no postMessage'); else for (let i = 0; i < 1e5; i++) post.call(self, { type: 'log', text: 'x'.repeat(1e5) });"),/Output limit reached|no postMessage/);
   assert.ok((await page.locator('.console pre').count())<=101,`${name}: output is capped`);
   assert.ok((await page.locator('.console').innerText()).length<300000,`${name}: output size is capped`);
   assert.match(await execute('// '+'x'.repeat(20001)),/limited to 20,000 characters|Run your code/);
   // Rapid repeated runs are refused.
   await page.fill('#code-editor','console.log(1)');await page.waitForTimeout(550);await run.click();await page.waitForFunction(()=>document.querySelector('[role=status]').textContent!=='Running');await run.click();runs+=2;
   assert.match(await page.locator('.console').innerText(),/wait a moment/);
   await open();
   for(let i=0;i<20;i++){await page.waitForTimeout(520);await run.click();await page.waitForFunction(()=>document.querySelector('[role=status]').textContent!=='Running');}
   await page.waitForTimeout(520);await run.click();
   assert.match(await page.locator('.console').innerText(),/Run limit reached/);
   await page.goto(base+'/api-docs');await page.locator('.api-entry').first().waitFor();assert.equal(await page.locator('.api-entry').count(),136);
   await page.fill('#api-search','convertTimezone');assert.equal(await page.locator('.api-entry').count(),1);
   await page.getByRole('link',{name:'Use in playground'}).click();await page.waitForURL('**/playground?api=convertTimezone');assert.match(await page.inputValue('#code-editor'),/import \{ convertTimezone \}/);
   await page.goto(base+'/documentation');await page.getByRole('link',{name:'Open in playground'}).first().waitFor();assert.equal(await page.getByRole('link',{name:'Open in playground'}).count(),12);
   await page.goto(base+'/demo');await page.waitForURL('**/playground');
   for(const route of ['/documentation','/api-docs','/playground']) {
    const response=await page.goto(base+route);assert([200,304].includes(response.status()),`${name}: direct ${route}`);await page.locator('main h1').waitFor();
    const refreshed=await page.reload();assert([200,304].includes(refreshed.status()),`${name}: refresh ${route}`);await page.locator('main h1').waitFor();
   }
   await page.setViewportSize({width:390,height:844});await page.goto(base+'/');
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
   if(name==='chromium')await page.screenshot({path:'test-results/home-mobile.png',fullPage:true});
   await page.setViewportSize({width:1440,height:1000});
   if(name==='chromium'){await page.screenshot({path:'test-results/home-desktop.png',fullPage:true});await page.goto(base+'/playground');await page.screenshot({path:'test-results/playground-desktop.png',fullPage:true});}
   assert.deepEqual(failures,[],`${name}: page errors`);
   console.log(`${name}: guides, function examples, local dates, no source leaks, error handling, timeout/stop, isolation, flood and rate limits, API search, links and responsive layout passed.`);
  } finally {await browser.close();}
 }
} finally {server?.kill();}
