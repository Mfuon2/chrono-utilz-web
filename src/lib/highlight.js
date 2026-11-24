import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import bash from 'highlight.js/lib/languages/bash';
import json from 'highlight.js/lib/languages/json';
hljs.registerLanguage('javascript',javascript);hljs.registerLanguage('typescript',typescript);hljs.registerLanguage('bash',bash);hljs.registerLanguage('json',json);
const escape=text=>text.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function highlight(code,language='typescript'){
  return hljs.getLanguage(language)?hljs.highlight(String(code??''),{language,ignoreIllegals:true}).value:escape(String(code??''));
}
// v-highlight="code" or v-highlight="{code, lang}" renders highlighted HTML into <code>.
const apply=(el,{value})=>{const {code,lang}=typeof value==='object'&&value!==null?value:{code:value};el.classList.add('hljs');el.innerHTML=highlight(code,lang);};
export const vHighlight={mounted:apply,updated:apply};
