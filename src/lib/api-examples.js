// Builds a short, runnable playground snippet for each API entry.
// Hand-written calls cover functions whose arguments are objects or need a specific shape.
const CALLS = {
  CalendarDate: "new CalendarDate(2025, 1, 31).add(1, 'month').toString()",
  ChronoUtilzError: "new ChronoUtilzError('Something went wrong').message",
  addCustomHolidays: { uses: ['isHoliday'], code: "addCustomHolidays(['2025-12-26']);\nconsole.log(isHoliday('2025-12-26'));" },
  addHolidayRules: { uses: ['getHolidays'], code: "addHolidayRules('KE', [{ name: 'Jamhuri Day', date: '12-12' }]);\nconsole.log(getHolidays(2025, 'KE'));" },
  calculateBusinessDaysCustom: "calculateBusinessDaysCustom('2025-01-03', '2025-01-31', { workingDays: [1, 2, 3, 4, 5], holidays: ['2025-01-20'] })",
  calculateWorkingHours: "calculateWorkingHours('2025-01-13T08:00:00Z', '2025-01-14T17:00:00Z', { startHour: 9, endHour: 17, workingDays: [1, 2, 3, 4, 5], timezone: 'UTC' })",
  configureTimezone: { uses: ['getTimezoneConfig'], code: "configureTimezone({ defaultTimezone: 'Africa/Nairobi' });\nconsole.log(getTimezoneConfig());" },
  convertTimezone: "convertTimezone('2025-01-15T09:00:00Z', { from: 'UTC', to: 'Africa/Nairobi' })",
  generateDateRange: "generateDateRange({ start: '2025-01-01', end: '2025-01-05' })",
  generateRecurringDates: "generateRecurringDates('2025-01-01', { pattern: 'weekly', maxOccurrences: 3 })",
  generateShiftSchedule: "generateShiftSchedule('2025-01-01', [{ name: 'Day', startHour: 8, duration: 12, daysOn: 2, daysOff: 2 }])",
  getPayPeriods: "getPayPeriods('2025-01-01', '2025-03-31', 'monthly')",
  getWorkingHoursBetween: "getWorkingHoursBetween('2025-01-13T08:00:00Z', '2025-01-14T17:00:00Z', { start: '09:00', end: '17:00' })",
  parseDate: "parseDate('2025-01-15T12:00:00+03:00')",
  parseMultipleFormats: "parseMultipleFormats('15/01/2025', ['DD/MM/YYYY'])",
  parseNaturalLanguage: "parseNaturalLanguage('tomorrow', { baseDate: new Date('2025-01-15T09:00:00Z') })",
  validateDateFormat: "validateDateFormat('2025-01-15', 'YYYY-MM-DD')",
};

const SAMPLE_DATES = { start: "'2025-01-03'", from: "'2025-01-03'", end: "'2025-01-31'", to: "'2025-01-31'" };
const NUMBERS = {
  year: '2025', month: '1', day: '15', quarter: '1', dayofweek: '1', hours: '8', hoursworked: '40', slahours: '24',
  milliseconds: '3600000', timestamp: '1736935200000', monthnumber: '1', occurrence: '2', offset: '1',
};
const STRINGS = {
  pattern: "'YYYY-MM-DD'", format: "'YYYY-MM-DD'", country: "'US'", region: "'Africa'", query: "'Nairobi'",
  message: "'Example'", expression: "'next friday'",
};

function splitTopLevel(text) {
  const parts = [];
  let depth = 0, current = '';
  for (const ch of text) {
    if ('(<{['.includes(ch)) depth++;
    if (')>}]'.includes(ch)) depth--;
    if (ch === ',' && depth === 0) { parts.push(current); current = ''; } else current += ch;
  }
  if (current.trim()) parts.push(current);
  return parts.map((part) => part.trim()).filter(Boolean);
}

function parameters(signature) {
  const flat = signature.replace(/\s+/g, ' ');
  const open = flat.indexOf('(');
  if (open < 0) return null;
  let depth = 0, close = open;
  for (; close < flat.length; close++) {
    if ('(<{['.includes(flat[close])) depth++;
    if (')>}]'.includes(flat[close]) && --depth === 0) break;
  }
  return splitTopLevel(flat.slice(open + 1, close));
}

function sample(name, type) {
  const key = name.replace(/^\.\.\./, '').toLowerCase();
  const isDate = /Date\b/.test(type) && !/\[\]|Array</.test(type);
  if (/^'/.test(type)) return type.split('|')[0].trim();
  if (/TimeUnit/.test(type)) return "'day'";
  if (/IANATimezone/.test(type) || key === 'timezone') return "'Africa/Nairobi'";
  if (/(Date \| string \| number|Date \| string|string \| number \| Date)\)?\[\]|Array<Date/.test(type)) return "['2025-01-03', '2025-01-15']";
  if (/number\[\]/.test(type)) return key === 'tasks' ? '[2, 3]' : '[1, 5]';
  if (/string\[\]/.test(type)) return "['YYYY-MM-DD']";
  if (isDate || type === 'any') {
    if (key === 'year') return '2025';
    const hit = Object.keys(SAMPLE_DATES).find((prefix) => key.startsWith(prefix));
    return hit ? SAMPLE_DATES[hit] : key.includes('string') ? "'2025-01-15T09:00:00Z'" : "'2025-01-15'";
  }
  if (type === 'number' || type.startsWith('number')) return NUMBERS[key] ?? '3';
  if (type === 'string') return STRINGS[key] ?? "'2025-01-15T09:00:00Z'";
  return null;
}

export function apiCall(entry) {
  const custom = CALLS[entry.name];
  if (custom) return typeof custom === 'string' ? custom : null;
  const params = parameters(entry.signature);
  if (!params) return null;
  const args = [];
  for (const param of params) {
    if (/^\/\//.test(param)) continue;
    const [rawName, ...rest] = param.split(':');
    if (rawName.includes('?') || param.includes('=')) break;
    const value = sample(rawName.trim(), rest.join(':').trim());
    if (value === null) return null;
    args.push(rawName.trim().startsWith('...') ? value.replace(/^\[|\]$/g, '') : value);
  }
  return `${entry.name}(${args.join(', ')})`;
}

export function apiExample(entry) {
  const custom = CALLS[entry.name];
  if (custom && typeof custom === 'object') {
    return `import { ${[entry.name, ...custom.uses].join(', ')} } from '@mfuon2/chrono-utilz';\n\n${custom.code}\n`;
  }
  const call = apiCall(entry);
  const body = call
    ? `console.log(${call});`
    : `// See the signature in the API reference.\nconsole.log(${entry.name}(/* arguments */));`;
  return `import { ${entry.name} } from '@mfuon2/chrono-utilz';\n\n${body}\n`;
}
