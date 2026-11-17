// Protocolo y validación del autocompletado. También se prueba con node:test.
((scope) => {
  'use strict';
  const DEFAULTS = Object.freeze({enabled: false, min: 7, max: 15});
  const normalize = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[«»"“”.,;:¿?¡!()]/g, '').replace(/\s+/g, ' ').trim();
  function range(min, max){
    if(String(min).trim() === '' || String(max).trim() === '') return {error: 'Indica el tiempo mínimo y el máximo.'};
    const lo = Number(min), hi = Number(max);
    if(!Number.isFinite(lo) || !Number.isFinite(hi) || lo < 0 || hi > 3600 || lo > hi) return {error: 'Usa tiempos de 0 a 3600 segundos y un mínimo que no supere el máximo.'};
    return {min: lo, max: hi};
  }
  function settings(value){
    const v = value && typeof value === 'object' ? value : {};
    const r = range(v.min ?? DEFAULTS.min, v.max ?? DEFAULTS.max);
    return {enabled: v.enabled === true, min: r.error ? DEFAULTS.min : r.min, max: r.error ? DEFAULTS.max : r.max};
  }
  const delay = (value, random = Math.random) => {
    const s = settings(value), n = Math.max(0, Math.min(1, random()));
    return Math.round((s.min + (s.max - s.min) * n) * 1000);
  };
  function reference(value){
    const text = String(value).trim();
    const m = text.match(/^\[?([OVC]\d+)\]?(?:\s*[|:]\s*|\s+)?(.*)$/i);
    return m ? {id: m[1].toUpperCase(), text: m[2].trim()} : {id: '', text};
  }
  function parse(value){
    const text = String(value || '').replace(/\*\*/g, '');
    const result = {answers: [], vfs: [], fields: [], visual: false, lowConfidence: /^\s*FIABILIDAD\s*:\s*BAJA\b/im.test(text)};
    for(const raw of text.split('\n')){
      const line = raw.trim().replace(/^[-*]\s+/, '');
      let m;
      if((m = line.match(/^RESPUESTA\s*:\s*(.+)$/i))) result.answers.push(reference(m[1]));
      else if((m = line.match(/^VF\s*:\s*(.+?)\s*=>?\s*(VERDADERO|FALSO|V|F)\b(?:\s*[|–-]\s*(.*))?$/i))) result.vfs.push({...reference(m[1]), value: /^V/i.test(m[2]), why: m[3] || ''});
      else if((m = line.match(/^CAMPO\s*:\s*\[?(C\d+)\]?\s*=>\s*(.+)$/i))) result.fields.push({id: m[1].toUpperCase(), value: m[2].trim()});
      else if(/^PUNTO\s*:|^ACCI[OÓ]N\s*:/i.test(line)) result.visual = true;
    }
    return result;
  }
  function resolve(ref, targets){
    if(ref.id) return targets.find(t => t.id === ref.id) || null;
    const matches = targets.filter(t => normalize(t.text) === normalize(ref.text));
    return matches.length === 1 ? matches[0] : null;
  }
  function plan(answer, registry){
    const fail = reason => ({ok: false, reason, actions: []});
    if(answer.lowConfidence) return fail('La IA indica poca fiabilidad. Revisa la sugerencia antes de responder.');
    if(answer.visual) return fail('Esta actividad requiere una acción en el dibujo o una acción manual. Sigue las indicaciones del panel.');
    const {choices = [], vfs = [], fields = []} = registry;
    if(!choices.length && !vfs.length && !fields.length) return fail('No he identificado controles de respuesta que pueda rellenar. Sigue la sugerencia del panel.');
    const actions = [], selected = new Set();
    for(const ref of answer.answers){
      const target = resolve(ref, choices);
      if(!target || selected.has(target.id)) return fail('La respuesta no coincide de forma única con las opciones del ejercicio.');
      selected.add(target.id);
    }
    const groups = new Map();
    for(const target of choices){
      if(!groups.has(target.group)) groups.set(target.group, []);
      groups.get(target.group).push(target);
    }
    for(const targets of groups.values()){
      const picked = targets.filter(t => selected.has(t.id));
      const multiple = targets.every(t => t.kind === 'checkbox');
      if(!picked.length || (!multiple && picked.length !== 1)) return fail('Falta una elección o hay varias respuestas para una pregunta de opción única.');
      for(const target of targets) if(multiple || selected.has(target.id)) actions.push({type: 'choice', id: target.id, value: selected.has(target.id)});
    }
    if(answer.vfs.length !== vfs.length) return fail('La respuesta de verdadero/falso está incompleta. Vuelve a analizarla.');
    const seenVF = new Set();
    for(const ref of answer.vfs){
      const target = resolve(ref, vfs);
      if(!target || seenVF.has(target.id)) return fail('Hay una afirmación repetida o que no pertenece a este ejercicio.');
      seenVF.add(target.id); actions.push({type: 'vf', id: target.id, value: ref.value});
    }
    if(answer.fields.length !== fields.length) return fail('La IA no ha dado un valor para cada campo. Revisa los campos pendientes.');
    const seenFields = new Set();
    for(const ref of answer.fields){
      const target = fields.find(t => t.id === ref.id);
      if(!target || seenFields.has(target.id)) return fail('Hay un campo repetido o desconocido en la respuesta.');
      seenFields.add(target.id); actions.push({type: 'field', id: target.id, value: ref.value});
    }
    return actions.length ? {ok: true, actions} : fail('No hay una respuesta completa para rellenar.');
  }
  // Mantiene el formato del panel anterior, sustituyendo referencias por el texto real.
  function display(value, registry){
    return String(value || '').replace(/^(\s*RESPUESTA\s*:\s*)(.+)$/gim, (line, prefix, content) => {
      const t = resolve(reference(content), registry.choices || []); return t ? prefix + t.text : line;
    }).replace(/^(\s*VF\s*:\s*)(.+?)(\s*=>?\s*(?:VERDADERO|FALSO|V|F)\b.*)$/gim, (line, prefix, content, tail) => {
      const t = resolve(reference(content), registry.vfs || []); return t ? prefix + t.text + tail : line;
    });
  }
  const isPrecise = result => !!(result && result.precise === true && result.model && !/lite|haiku|nano/i.test(result.model));
  class Countdown {
    // Las funciones nativas de Window necesitan conservar su receptor.
    constructor({now = Date.now, every = (...args) => scope.setInterval(...args), clear = id => scope.clearInterval(id)} = {}){
      Object.assign(this, {now, every, clear, timer: null, job: null});
    }
    cancel(reason){
      if(this.timer !== null) this.clear(this.timer);
      const job = this.job; this.timer = null; this.job = null;
      if(job && job.onCancel) job.onCancel(reason);
    }
    start(job){
      this.cancel('replaced'); this.job = job;
      const end = this.now() + job.delay;
      const tick = () => {
        if(this.job !== job) return;
        if(!job.valid()){ this.cancel('stale'); return; }
        const left = Math.max(0, end - this.now());
        job.onTick(Math.ceil(left / 1000));
        if(left > 0) return;
        this.clear(this.timer); this.timer = null; this.job = null; job.run();
      };
      try{ this.timer = this.every(tick, 250); tick(); }
      catch(error){ this.cancel('error'); throw error; }
    }
  }
  const exported = {DEFAULTS, normalize, range, settings, delay, reference, parse, resolve, plan, display, isPrecise, Countdown};
  scope.MiEstudioElectude = exported;
  if(typeof module !== 'undefined' && module.exports) module.exports = exported;
})(globalThis);
