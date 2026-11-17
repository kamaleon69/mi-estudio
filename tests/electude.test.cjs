const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const C = require('../extension-chrome/electude-core.js');
const radio = {choices: [
  {id: 'O1', text: 'La tensión aumenta', kind: 'radio', group: 'G1'},
  {id: 'O2', text: 'La tensión disminuye', kind: 'radio', group: 'G1'}
]};
const vfs = {vfs: [{id: 'V1', text: 'El circuito está abierto'}, {id: 'V2', text: 'Hay corriente'}]};

test('7–15 segundos por defecto y rango editable, incluidos decimales y tiempo fijo', () => {
  assert.deepEqual(C.settings(), {enabled: false, min: 7, max: 15});
  assert.deepEqual(C.range('2.5', '40'), {min: 2.5, max: 40});
  assert.deepEqual(C.range(0, 0), {min: 0, max: 0});
  assert.deepEqual(C.range(25, 25), {min: 25, max: 25});
  for(const values of [['', 10], [10, 4], [-1, 5], [4, 3601], ['no', 15], [7, Infinity]]) assert.ok(C.range(...values).error);
  assert.equal(C.settings({enabled: true, min: -1, max: 5}).min, 7);
});
test('los límites y todos los tiempos elegidos respetan el intervalo', () => {
  assert.equal(C.delay(undefined, () => 0), 7000);
  assert.equal(C.delay(undefined, () => 1), 15000);
  assert.equal(C.delay({min: 1.5, max: 2.5}, () => 0.5), 2000);
  for(let i = 0; i <= 100; i++){
    const n = C.delay({min: 19, max: 47}, () => i / 100);
    assert.ok(n >= 19000 && n <= 47000);
  }
});
test('elige IDs reales y muestra los textos correspondientes', () => {
  assert.deepEqual(C.plan(C.parse('ANÁLISIS: evidencia\nRESPUESTA: [O2]\nPOR QUÉ: teoría'), radio).actions, [{type: 'choice', id: 'O2', value: true}]);
  assert.equal(C.display('RESPUESTA: [O2]', radio), 'RESPUESTA: La tensión disminuye');
});
test('rechaza IDs inventados, duplicados y dos selecciones en un radio', () => {
  for(const text of ['RESPUESTA: [O9]', 'RESPUESTA: [O1]\nRESPUESTA: [O1]', 'RESPUESTA: [O1]\nRESPUESTA: [O2]']) assert.equal(C.plan(C.parse(text), radio).ok, false);
});
test('las coincidencias literales son exactas y unívocas; no admite fragmentos de teoría', () => {
  assert.equal(C.plan(C.parse('RESPUESTA: La tensión aumenta.'), radio).ok, true);
  assert.equal(C.plan(C.parse('RESPUESTA: tensión'), radio).ok, false);
  assert.equal(C.plan(C.parse('RESPUESTA: La tensión aumenta'), {choices: [radio.choices[0], {...radio.choices[1], text: radio.choices[0].text}]}).ok, false);
});
test('admite varias casillas y desmarca las que no corresponden', () => {
  const r = {choices: [...radio.choices, {id: 'O3', text: 'Otra', group: 'G1'}].map(t => ({...t, kind: 'checkbox'}))};
  assert.deepEqual(C.plan(C.parse('RESPUESTA: [O1]\nRESPUESTA: [O3]'), r).actions.map(a => a.value), [true, false, true]);
});
test('exige una respuesta en cada grupo independiente', () => {
  const r = {choices: [...radio.choices, {id: 'O3', text: 'Otro grupo', kind: 'radio', group: 'G2'}]};
  assert.equal(C.plan(C.parse('RESPUESTA: [O1]'), r).ok, false);
  assert.equal(C.plan(C.parse('RESPUESTA: [O1]\nRESPUESTA: [O3]'), r).ok, true);
});
test('verdadero/falso completo, incluyendo F sin convertirlo en una selección positiva', () => {
  const text = 'VF: [V1] => V | circuito\nVF: [V2] => F | circuito abierto';
  assert.deepEqual(C.plan(C.parse(text), vfs).actions.map(a => a.value), [true, false]);
  assert.match(C.display(text, vfs), /VF: Hay corriente => F/);
  assert.equal(C.plan(C.parse('VF: [V1] => V'), vfs).ok, false);
  assert.equal(C.plan(C.parse('VF: [V1] => V\nVF: [V1] => F'), vfs).ok, false);
});
test('campos y desplegables requieren un valor por cada ID', () => {
  const registry = {fields: [{id: 'C1'}, {id: 'C2'}]};
  const output = C.parse('CAMPO: C1 => 12.5\nCAMPO: [C2] => serie');
  assert.deepEqual(C.plan(output, registry).actions.map(a => a.value), ['12.5', 'serie']);
  assert.equal(C.plan(C.parse('CAMPO: C1 => 12'), registry).ok, false);
  assert.equal(C.plan(C.parse('CAMPO: C1 => 12\nCAMPO: C8 => x'), registry).ok, false);
});
test('no automatiza dibujos, instrucciones manuales ni resultados de baja fiabilidad', () => {
  for(const text of ['RESPUESTA: [O1]\nFIABILIDAD: BAJA', 'PUNTO: válvula | x=100 y=200', 'ACCIÓN: mueve el mando']) assert.equal(C.plan(C.parse(text), radio).ok, false);
});
function clock(){
  let now = 0, id = 0;
  const timers = new Map(), ticks = [], cancellations = [];
  const counter = new C.Countdown({now: () => now, every: fn => { timers.set(++id, fn); return id; }, clear: n => timers.delete(n)});
  return {counter, ticks, cancellations, advance: ms => {now += ms; for(const fn of [...timers.values()]) fn();}, job: overrides => ({delay: 7000, valid: () => true, onTick: n => ticks.push(n), onCancel: r => cancellations.push(r), ...overrides})};
}
function browserTimers(){
  const context = vm.createContext({});
  vm.runInContext([
    "globalThis.elapsed = 0; globalThis.calls = []; globalThis.callbacks = new Map(); globalThis.sequence = 0;",
    "globalThis.setInterval = function(callback, delay){",
    "  'use strict';",
    "  if(this !== globalThis) throw new TypeError('Illegal invocation');",
    "  const id = ++globalThis.sequence;",
    "  globalThis.callbacks.set(id, callback); globalThis.calls.push(['start', delay]); return id;",
    "};",
    "globalThis.clearInterval = function(id){",
    "  'use strict';",
    "  if(this !== globalThis) throw new TypeError('Illegal invocation');",
    "  globalThis.calls.push(['clear', id]); globalThis.callbacks.delete(id);",
    "};",
    "Date.now = () => globalThis.elapsed;"
  ].join('\n'), context);
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../extension-chrome/electude-core.js'), 'utf8'), context);
  return context;
}
test('temporizadores del navegador: iniciar y terminar conservan el receptor Window', () => {
  const b = browserTimers();
  vm.runInContext([
    "globalThis.runs = 0;",
    "globalThis.countdown = new MiEstudioElectude.Countdown();",
    "countdown.start({delay: 7000, valid: () => true, onTick(){}, run(){globalThis.runs++;}});",
    "globalThis.elapsed = 7000;",
    "for(const callback of [...callbacks.values()]) callback();"
  ].join('\n'), b);
  assert.equal(b.runs, 1);
  assert.equal(b.callbacks.size, 0);
});
test('temporizadores del navegador: OFF conserva el receptor Window al cancelar', () => {
  const b = browserTimers();
  vm.runInContext([
    "globalThis.runs = 0;",
    "const countdown = new MiEstudioElectude.Countdown();",
    "countdown.start({delay: 15000, valid: () => true, onTick(){}, run(){globalThis.runs++;}});",
    "countdown.cancel('off');"
  ].join('\n'), b);
  assert.equal(b.runs, 0);
  assert.equal(b.callbacks.size, 0);
});
function contentFunction(start, end){
  const source = fs.readFileSync(path.join(__dirname, '../extension-chrome/electude.js'), 'utf8');
  const from = source.indexOf(start), to = source.indexOf(end, from + start.length);
  assert.ok(from >= 0 && to > from, 'No se encontró el bloque del panel: ' + start);
  return source.slice(from, to);
}
function autoClick(){
  const b = browserTimers(), events = [], state = [false, false], clicks = [0, 0];
  const inputs = state.map((_, index) => {
    const el = {
      tagName: 'INPUT', type: 'radio', isConnected: true, disabled: false, form: null, labels: [],
      ownerDocument: {defaultView: {MouseEvent: class {constructor(type, init){this.type = type; Object.assign(this, init);}}}},
      getAttribute: () => null, closest: () => null, getBoundingClientRect: () => ({left: 10, top: 20, width: 24, height: 24}),
      dispatchEvent: event => {events.push(event); return true;},
      click(){state.fill(false); state[index] = true; clicks[index]++;}
    };
    Object.defineProperty(el, 'checked', {get: () => state[index], set(){throw new Error('Las opciones se deben pulsar, no asignar checked');}});
    return el;
  });
  Object.assign(b, {
    registry: {choices: radio.choices.map((target, i) => ({...target, el: inputs[i], click: inputs[i], row: inputs[i]})), vfs: [], fields: []},
    document: {hidden: false}, own: () => false, shown: () => true,
    activityBox: () => ({}), statusText: '', cancelButton: {hidden: true}, scheduled: 0
  });
  vm.runInContext([
    "var Core = MiEstudioElectude, fillClock = new Core.Countdown();",
    "var fillSettings = {enabled: true, min: 7, max: 7}, rangeReady = true;",
    "var lastFinal = null, filledSig = '', cancelledSig = '', applying = false, lastSig = '';",
    "var currentSignature = 'question-1';",
    "function current(ctx){return ctx.signature === currentSignature;}",
    "function registryFor(){return registry;}",
    "function $(selector){return cancelButton;}",
    "function fillStatus(message){globalThis.statusText = message;}",
    "function scheduleAuto(){globalThis.scheduled++;}"
  ].join('\n'), b);
  for(const [start, end] of [
    ['  function registryPrompt(', '\n  let fillSettings'],
    ['  function cancelFill(', '\n  function selected('],
    ['  function selected(', '\n  function usable('],
    ['  function usable(', '\n  function clickAnswer('],
    ['  function clickAnswer(', '\n  function fieldValue('],
    ['  function prepareActions(', '\n  function applyAnswer('],
    ['  function applyAnswer(', '\n  function queueFill('],
    ['  function queueFill(', '\n  function setFill(']
  ]) vm.runInContext(contentFunction(start, end), b);
  b.result = {text: 'RESPUESTA: [O2]', model: 'claude-sonnet-5-5', precise: true};
  b.context = {registry: b.registry, signature: 'question-1', useMode: 'precise', requirePrecise: true};
  return {b, state, clicks, events, start: () => vm.runInContext('queueFill(result, context)', b), advance(ms){b.elapsed = ms; vm.runInContext('for(const callback of [...callbacks.values()]) callback();', b);}};
}
test('integración: la respuesta precisa hace clic en O2 una sola vez después de la espera', () => {
  const t = autoClick();
  t.start(); t.advance(6999);
  assert.deepEqual(t.clicks, [0, 0]);
  t.advance(7000);
  assert.deepEqual(t.clicks, [0, 1]);
  assert.deepEqual(t.state, [false, true]);
  assert.match(t.b.statusText, /rellenada/);
  t.advance(15000); assert.deepEqual(t.clicks, [0, 1]);
});
test('integración: una respuesta rápida o sin confirmación precisa nunca produce un clic', () => {
  for(const response of [
    {model: 'gemini-3.5-flash-lite', precise: false},
    {model: 'gemini-3.5-flash-lite', precise: true},
    {model: 'claude-haiku-5-5', precise: true},
    {model: 'claude-sonnet-5-5'}
  ]){
    const t = autoClick(); Object.assign(t.b.result, response);
    if(!('precise' in response)) delete t.b.result.precise;
    t.start(); t.advance(7000);
    assert.deepEqual(t.clicks, [0, 0]);
    assert.equal(t.b.callbacks.size, 0);
  }
});
test('integración: OFF y cambio de ejercicio cancelan el clic automático', () => {
  for(const action of ["fillSettings.enabled = false; cancelFill('off');", "currentSignature = 'question-2';"]){
    const t = autoClick(); t.start();
    vm.runInContext(action, t.b); t.advance(7000);
    assert.deepEqual(t.clicks, [0, 0]);
    assert.equal(t.b.callbacks.size, 0);
  }
});
test('integración: los controles SVG sin método click reciben el evento de clic', () => {
  const t = autoClick();
  t.b.svg = {tagName: 'circle', isConnected: true, disabled: false, getAttribute: () => null, closest: () => null,
    getBoundingClientRect: () => ({left: 10, top: 20, width: 24, height: 24}),
    ownerDocument: {defaultView: {MouseEvent: class {constructor(type, init){this.type = type; Object.assign(this, init);}}}},
    dispatchEvent: event => {t.events.push(event); return true;}
  };
  vm.runInContext('clickAnswer(svg);', t.b);
  assert.deepEqual(t.events.map(event => event.type), ['mousedown', 'mouseup', 'click']);
  assert.equal(t.events.at(-1).clientX, 22);
  assert.equal(t.events.at(-1).clientY, 32);
});
test('ON fuerza Preciso y deshabilita Rápido; OFF permite volver a elegirlo', () => {
  const buttons = ['precise', 'fast'].map(mode => ({dataset: {m: mode}, classList: {toggle(name, value){this[name] = value;}}, setAttribute(){}}));
  const b = vm.createContext({root: {querySelectorAll: () => buttons}, fillSettings: {enabled: true}});
  vm.runInContext("var mode = 'fast';", b);
  vm.runInContext(contentFunction('  const setMode = ', "\n  root.querySelectorAll('.mode button').forEach(b => b.onclick"), b);
  vm.runInContext("setMode('fast', false);", b);
  assert.equal(b.mode, 'precise');
  assert.equal(buttons[0].classList.on, true);
  assert.equal(buttons[1].disabled, true);
  b.fillSettings.enabled = false;
  vm.runInContext("setMode('fast', false);", b);
  assert.equal(b.mode, 'fast');
  assert.equal(buttons[1].disabled, false);
});
test('el temporizador no rellena antes del plazo y ejecuta solo una vez', () => {
  const t = clock(); let runs = 0;
  t.counter.start(t.job({run: () => runs++}));
  t.advance(6999); assert.equal(runs, 0);
  t.advance(1); assert.equal(runs, 1);
  t.advance(100000); assert.equal(runs, 1);
});
test('OFF y Cancelar impiden cualquier rellenado pendiente', () => {
  const t = clock(); let runs = 0;
  t.counter.start(t.job({run: () => runs++})); t.advance(1000);
  t.counter.cancel('off'); t.advance(20000);
  assert.equal(runs, 0); assert.equal(t.cancellations.at(-1), 'off');
});
test('cambiar de pregunta o de pestaña descarta la respuesta antigua', () => {
  const t = clock(); let valid = true, runs = 0;
  t.counter.start(t.job({valid: () => valid, run: () => runs++}));
  valid = false; t.advance(7000);
  assert.equal(runs, 0); assert.equal(t.cancellations.at(-1), 'stale');
});
test('cambiar el intervalo sustituye la cuenta anterior; cero segundos es válido', () => {
  const t = clock(); let runs = 0;
  t.counter.start(t.job({run: () => runs++})); t.advance(1000);
  t.counter.start(t.job({delay: 20000, run: () => runs++}));
  t.advance(6000); assert.equal(runs, 0);
  t.advance(14000); assert.equal(runs, 1);
  t.counter.start(t.job({delay: 0, run: () => runs++}));
  assert.equal(runs, 2);
});

function background({ai = {}, tabs = [], fetchImpl} = {}){
  const calls = [], captures = [];
  let queryIndex = 0;
  const listener = {addListener(){}};
  const context = {setTimeout, clearTimeout, AbortController, URL, console, Uint8Array, btoa, encodeURIComponent,
    chrome: {runtime: {onMessage: listener, onInstalled: listener, onStartup: listener, getManifest: () => ({version: '1.9.1'})},
      action: {onClicked: listener},
      storage: {local: {get: async () => ({ai})}},
      tabs: {query: async () => tabs[Math.min(queryIndex++, tabs.length - 1)] || [], captureVisibleTab: async (...args) => {captures.push(args); return 'data:image/jpeg;base64,test';}} },
    fetch: async (url, options) => {calls.push({url, options}); return fetchImpl(url, options, calls.length);}
  };
  const script = fs.readFileSync(path.join(__dirname, '../extension-chrome/background.js'), 'utf8');
  vm.runInNewContext(script + '\nglobalThis.exposed = {elecAsk, elecShot};', context);
  return {api: context.exposed, calls, captures};
}
test('no captura otra pestaña si Electude ha dejado de estar activo', async () => {
  const b = background({tabs: [[{id: 2, url: 'https://example.com/'}]]});
  const r = await b.api.elecShot({id: 1, windowId: 1, url: 'https://centro.electude.eu/'});
  assert.equal(r.dataUrl, null); assert.equal(b.captures.length, 0);
});
test('descarta la captura si se cambia de pestaña mientras se captura', async () => {
  const current = {id: 1, url: 'https://centro.electude.eu/'};
  const b = background({tabs: [[current], [{id: 2}]]});
  const r = await b.api.elecShot({...current, windowId: 1});
  assert.equal(r.dataUrl, null); assert.equal(b.captures.length, 1);
});
test('modo preciso respeta el modelo potente elegido y el inventario no se trunca por detrás', async () => {
  const b = background({ai: {geminiKey: 'test-key', geminiModel: 'gemini-3.8-flash'}, fetchImpl: async () => ({ok: true, status: 200, json: async () => ({candidates: [{content: {parts: [{text: 'RESPUESTA: [O1]'}]}}]})})});
  const r = await b.api.elecAsk({text: 'INVENTARIO C1 O1\n' + 'x'.repeat(17000), mode: 'precise'});
  assert.equal(r.model, 'gemini-3.8-flash');
  const body = JSON.parse(b.calls[0].options.body);
  assert.match(body.contents[0].parts[0].text, /INVENTARIO C1 O1/);
  assert.ok(b.calls[0].options.signal);
});
test('Claude rápido y preciso usan modelos distintos y rechazan respuestas incompletas', async () => {
  const b = background({ai: {claudeKey: 'test-key', aiProvider: 'claude'}, fetchImpl: async () => ({ok: true, status: 200, json: async () => ({stop_reason: 'max_tokens', content: [{type: 'text', text: 'VF: [V1] => V'}]})})});
  assert.ok((await b.api.elecAsk({mode: 'fast'})).error);
  assert.equal(JSON.parse(b.calls[0].options.body).model, 'claude-haiku-5-5');
  await b.api.elecAsk({mode: 'precise'});
  assert.equal(JSON.parse(b.calls[1].options.body).model, 'claude-sonnet-5-5');
});
test('autocompletar exige Gemini preciso y no prueba modelos Lite cuando falla', async () => {
  const b = background({ai: {geminiKey: 'test-key', geminiModel: 'gemini-3.5-flash-lite'}, fetchImpl: async () => ({ok: false, status: 503, json: async () => ({error: {message: 'Modelo preciso no disponible'}})})});
  const result = await b.api.elecAsk({mode: 'precise', requirePrecise: true});
  assert.ok(result.error);
  assert.ok(b.calls.length);
  assert.ok(b.calls.every(call => !/lite/i.test(call.url)));
});
test('autocompletar con Claude usa Sonnet aunque estuviera guardado Haiku', async () => {
  const b = background({ai: {claudeKey: 'test-key', claudeModel: 'claude-haiku-5-5'}, fetchImpl: async () => ({ok: true, status: 200, json: async () => ({content: [{type: 'text', text: 'RESPUESTA: [O2]'}]})})});
  const result = await b.api.elecAsk({mode: 'fast', requirePrecise: true});
  assert.equal(result.model, 'claude-sonnet-5-5');
  assert.equal(result.precise, true);
});
test('los dos paquetes cargan el núcleo antes del panel y conservan el mismo código', () => {
  for(const browser of ['chrome', 'firefox']){
    const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, '../extension-' + browser + '/manifest.json')));
    assert.deepEqual(manifest.content_scripts[1].js, ['electude-core.js', 'electude.js']);
    assert.equal(manifest.version, '1.9.1');
  }
  for(const filename of ['electude.js', 'electude-core.js', 'background.js']) assert.equal(fs.readFileSync(path.join(__dirname, '../extension-chrome', filename), 'utf8'), fs.readFileSync(path.join(__dirname, '../extension-firefox', filename), 'utf8'));
});
