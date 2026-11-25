import {transform} from 'sucrase';
import * as exported from './generated/chrono-utilz.mjs';

// Runs inside a dedicated worker created by public/sandbox.html for each run.
// The sandbox page applies a network-denying CSP; this file removes the remaining
// escape hatches and keeps output small and free of library source code.

const MAX_CODE = 20000, MAX_LINES = 100, MAX_LINE = 2000, MAX_TOTAL = 50000;

const send = globalThis.postMessage.bind(globalThis);
for (const key of ['fetch', 'XMLHttpRequest', 'WebSocket', 'WebTransport', 'EventSource', 'importScripts', 'Worker', 'SharedWorker',
  'BroadcastChannel', 'indexedDB', 'caches', 'WebAssembly', 'postMessage', 'close']) {
  try { Object.defineProperty(globalThis, key, {value: undefined, writable: false, configurable: false}); } catch {}
}

// Library functions and class methods print as native code, never as their minified source.
const hidden = new WeakSet(), names = new WeakMap();
const {default: _default, ...library} = exported;
for (const [exportName, value] of Object.entries(library)) {
  if (typeof value !== 'function') continue;
  hidden.add(value);
  names.set(value, exportName);
  for (const target of [value, value.prototype]) {
    if (!target) continue;
    for (const name of Object.getOwnPropertyNames(target)) {
      const descriptor = Object.getOwnPropertyDescriptor(target, name);
      for (const fn of [descriptor.value, descriptor.get, descriptor.set]) if (typeof fn === 'function' && fn !== value) { hidden.add(fn); if (!names.has(fn)) names.set(fn, name); }
    }
  }
}
const nativeToString = Function.prototype.toString;
const nameOf = fn => names.get(fn) || fn.name || 'anonymous';
Object.defineProperty(Function.prototype, 'toString', {
  value: function toString() { return hidden.has(this) ? `function ${nameOf(this)}() { [native code] }` : nativeToString.call(this); },
  writable: false, configurable: false,
});
Object.freeze(library);

const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const dateFormat = (() => {
  try { return new Intl.DateTimeFormat('en-CA', {timeZone, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23', timeZoneName: 'shortOffset'}); }
  catch { return new Intl.DateTimeFormat('en-CA', {timeZone, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23', timeZoneName: 'short'}); }
})();
const showDate = date => {
  if (Number.isNaN(date.getTime())) return 'Invalid Date';
  const part = Object.fromEntries(dateFormat.formatToParts(date).map(p => [p.type, p.value]));
  return `${part.year}-${part.month}-${part.day} ${part.hour}:${part.minute}:${part.second} ${part.timeZoneName}`;
};
const showFunction = fn => `[${/^class\b/.test(nativeToString.call(fn)) ? 'class' : 'Function'} ${nameOf(fn)}]`;

const serialize = value => {
  if (typeof value === 'string') return value;
  if (typeof value === 'bigint') return `${value}n`;
  if (typeof value === 'function') return showFunction(value);
  if (value === undefined) return 'undefined';
  if (value instanceof Date) return showDate(value);
  if (value instanceof Error) return errorText(value);
  const seen = new WeakSet();
  try {
    return JSON.stringify(value, function (key, item) {
      const raw = this[key];
      if (raw instanceof Date) return showDate(raw);
      if (typeof raw === 'function') return showFunction(raw);
      if (typeof raw === 'bigint') return `${raw}n`;
      if (raw instanceof Error) return `${raw.name}: ${raw.message}`;
      if (typeof item === 'object' && item !== null) { if (seen.has(item)) return '[Circular]'; seen.add(item); }
      return item;
    }, 2) ?? String(value);
  } catch { return Object.prototype.toString.call(value); }
};

const errorText = error => {
  if (error instanceof Error) return `${error.name}: ${String(error.message).replace(/^ChronoUtilz Error:\s*/, '')}`;
  return `Error: ${serialize(error)}`;
};

onmessage = async event => {
  const source = String(event.data?.code ?? '');
  if (source.length > MAX_CODE) { send({type: 'error', text: `Code is limited to ${MAX_CODE.toLocaleString('en')} characters.`}); return; }
  let lines = 0, total = 0, stopped = false;
  const write = level => (...values) => {
    if (stopped) return;
    let text = values.map(serialize).join(' ');
    if (text.length > MAX_LINE) text = `${text.slice(0, MAX_LINE)}… (truncated)`;
    total += text.length;
    if (++lines > MAX_LINES || total > MAX_TOTAL) { stopped = true; send({type: 'error', text: 'Output limit reached. Log less data per run.'}); return; }
    send({type: 'log', level, text});
  };
  const output = {};
  for (const level of ['log', 'info', 'warn', 'error', 'debug', 'table', 'dir']) output[level] = write(level === 'error' || level === 'warn' ? 'error' : 'log');
  try {
    const code = transform(source, {transforms: ['typescript', 'imports'], filePath: 'example.ts'}).code;
    const load = name => {
      if (name === '@mfuon2/chrono-utilz') return library;
      const prefix = '@mfuon2/chrono-utilz/';
      const key = name.startsWith(prefix) ? name.slice(prefix.length) : '';
      if (key && typeof library[key] === 'function') return {[key]: library[key]};
      throw new Error(`Only ChronoUtilz imports are available: ${name}`);
    };
    const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
    await new AsyncFunction('require', 'console', 'exports', 'module', code)(load, Object.freeze(output), {}, {exports: {}});
    send({type: 'done'});
  } catch (error) {
    send({type: 'error', text: errorText(error)});
  }
};
