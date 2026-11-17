// Mi Estudio · Ayuda IA en Electude: panel lateral que analiza el enunciado visible y señala la opción que la IA cree correcta.
// Autocompletado opcional con intervalo configurable. La comprobación la hace el alumno.
(() => {
  if(window.__msElec) return; window.__msElec = true;
  const api = (typeof browser !== 'undefined' && browser.runtime) ? browser : chrome;
  const Core = globalThis.MiEstudioElectude;
  if(!Core) return;
  const host = document.createElement('div'); host.id = '__msElecHost';
  host.style.cssText = 'all:initial;position:fixed;z-index:2147483647;top:0;right:0;';
  const root = host.attachShadow({mode: 'open'});
  root.innerHTML = `<style>
    *{box-sizing:border-box;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif}
    .fab{position:fixed;right:16px;bottom:16px;touch-action:none;width:52px;height:52px;border-radius:50%;border:0;background:#2563eb;color:#fff;font-size:24px;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,.3)}
    .fab:hover{background:#1d4ed8}
    .panel{position:fixed;top:0;right:0;width:min(380px,100vw);height:100vh;background:#fff;color:#111827;border-left:1px solid #d1d5db;box-shadow:-6px 0 24px rgba(0,0,0,.18);display:none;flex-direction:column}
    .panel.on{display:flex}
    .h{display:flex;align-items:center;justify-content:space-between;padding:12px 14px;border-bottom:1px solid #e5e7eb;font-weight:700;font-size:15px}
    .x{border:1px solid #d1d5db;background:#fff;border-radius:8px;width:30px;height:30px;cursor:pointer;font-size:14px}
    .b{padding:14px;overflow:auto;flex:1;font-size:14px;line-height:1.5}
    .go{width:100%;padding:12px;border:0;border-radius:10px;background:#2563eb;color:#fff;font-size:15px;font-weight:600;cursor:pointer}
    .go:disabled{opacity:.6;cursor:wait}
    .ans{margin-top:14px;border-radius:16px;overflow:hidden;background:#fff;box-shadow:0 6px 20px rgba(16,185,129,.18),0 0 0 1px rgba(16,185,129,.35)}
    .ans .top{display:flex;align-items:center;gap:8px;padding:9px 14px;background:linear-gradient(135deg,#10b981,#059669);color:#fff;font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase}
    .ans .pick{display:flex;align-items:flex-start;gap:12px;padding:14px;background:linear-gradient(180deg,#ecfdf5,#fff);font-size:18px;font-weight:800;line-height:1.3;color:#064e3b}
    .ans .ck{flex:none;width:30px;height:30px;border-radius:50%;background:#10b981;color:#fff;display:flex;align-items:center;justify-content:center;font-size:17px;box-shadow:0 2px 6px rgba(16,185,129,.4)}
    .ans .why{margin:0 14px 14px;padding:10px 12px;border-radius:10px;background:#f8fafc;border:1px solid #e2e8f0;color:#334155;font-size:13.5px;line-height:1.55;white-space:pre-wrap}
    .ans .why i{display:block;font-style:normal;font-weight:700;font-size:11.5px;color:#64748b;text-transform:uppercase;letter-spacing:.05em;margin-bottom:4px}
    .why{white-space:pre-wrap;color:#374151;margin-top:10px}
    .upd .warn{margin:0 0 10px}
    .loc{margin-top:8px;font-size:12.5px;color:#475569}
    .auto{display:flex;align-items:center;gap:10px;margin-top:10px;font-size:13.5px;color:#334155;cursor:pointer;user-select:none}
    .auto input{display:none}
    .sw{position:relative;flex:none;width:40px;height:22px;border-radius:11px;background:#cbd5e1;transition:background .2s}
    .sw::after{content:'';position:absolute;left:3px;top:3px;width:16px;height:16px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.3);transition:left .2s}
    .auto input:checked + .sw{background:#10b981} .auto input:checked + .sw::after{left:21px}
    .cd{position:fixed;left:50%;bottom:24px;transform:translateX(-50%);display:none;align-items:center;gap:12px;padding:10px 14px;border-radius:12px;background:#0f172a;color:#fff;font-size:14px;box-shadow:0 8px 24px rgba(0,0,0,.3)}
    .cd.on{display:flex} .cd button{border:0;border-radius:8px;padding:6px 12px;background:#fff;color:#0f172a;font-weight:700;cursor:pointer}
    .fab.auto::after{content:'A';position:absolute;right:-2px;top:-2px;width:18px;height:18px;border-radius:50%;background:#10b981;color:#fff;font:700 11px/18px system-ui,sans-serif;text-align:center;box-shadow:0 0 0 2px #fff}
    .chip{display:inline-flex;align-items:center;gap:6px;padding:4px 10px;border-radius:999px;border:1px solid #cbd5e1;background:#f8fafc;cursor:pointer;font-size:12.5px}
    .chip.on{background:#ecfdf5;border-color:#10b981;color:#065f46;font-weight:700}
    .ask{margin-top:8px;padding:10px 12px;border-radius:10px;background:#eff6ff;border:1px solid #93c5fd;color:#1e3a8a;line-height:1.45}
    .ask .row .sm:first-child{background:#2563eb;color:#fff;border:0;font-weight:700}
    .vf{padding:10px 14px;display:flex;flex-direction:column;gap:8px}
    .an{margin-top:12px;border:1px solid #e2e8f0;border-radius:10px;padding:8px 12px;background:#f8fafc;font-size:13px;color:#334155} .an summary{cursor:pointer;font-weight:700;color:#475569} .an div{margin-top:6px;white-space:pre-wrap;line-height:1.5}
    .vw{display:block;margin-top:2px;font-weight:400;font-size:12.5px;color:#475569}
    .mode{display:flex;gap:6px;margin-top:10px} .mode button{flex:1;padding:7px;border:1px solid #cbd5e1;background:#fff;border-radius:8px;cursor:pointer;font-size:12.5px} .mode button.on{background:#0f172a;color:#fff;border-color:#0f172a;font-weight:700}
    .mode button:disabled{opacity:.5;cursor:not-allowed}
    .fill{margin-top:14px;padding:12px;border:1px solid #cbd5e1;border-radius:12px;background:#f8fafc}
    .fillToggle{width:100%;padding:10px;border:1px solid #94a3b8;border-radius:8px;background:#fff;color:#334155;font-size:14px;font-weight:750;cursor:pointer}
    .fillToggle[aria-pressed=true]{background:#047857;color:#fff;border-color:#047857}
    .times{display:flex;gap:10px;margin-top:10px}.times label{flex:1;min-width:0;font-size:12px;color:#475569}.times input{display:block;width:100%;margin-top:4px;padding:8px;border:1px solid #94a3b8;border-radius:7px;font-size:14px;background:#fff;color:#111827}
    .fillStatus{margin-top:8px;font-size:12.5px;color:#475569;line-height:1.45}.fillStatus.error{color:#b91c1c}
    .fillCancel{margin-top:8px;padding:6px 10px;background:#fff;border:1px solid #94a3b8;border-radius:7px;color:#334155;cursor:pointer}
    .auto input{display:block;position:absolute;opacity:0;width:1px;height:1px}.auto:focus-within .sw{outline:2px solid #2563eb;outline-offset:3px}
    .vfr{display:flex;align-items:flex-start;gap:10px;font-size:14.5px;font-weight:600;color:#0f172a;line-height:1.35}
    .pill{flex:none;min-width:44px;text-align:center;padding:3px 8px;border-radius:999px;color:#fff;font-size:12.5px;font-weight:800}
    .pill.v{background:linear-gradient(135deg,#22c55e,#059669)} .pill.f{background:linear-gradient(135deg,#f87171,#dc2626)}
    .ans + .ans{margin-top:12px}
    .warn{margin-top:12px;padding:10px 12px;border-radius:10px;background:#fffbeb;border:1px solid #fcd34d;color:#78350f;font-size:13px;line-height:1.45;display:flex;flex-direction:column;gap:8px}
    .warn .sm{background:#f59e0b;color:#fff;border:0;font-weight:700}
    .note{margin-top:12px;font-size:12.5px;color:#6b7280}
    .err{margin-top:14px;border:1px solid #fca5a5;background:#fef2f2;border-radius:10px;padding:10px 12px;color:#991b1b}
    .row{display:flex;gap:8px;margin-top:10px}
    .sm{flex:1;padding:8px;border:1px solid #d1d5db;background:#fff;border-radius:8px;cursor:pointer;font-size:13px}
    .spin{display:inline-block;width:14px;height:14px;border:2px solid #fff;border-top-color:transparent;border-radius:50%;animation:s .8s linear infinite;vertical-align:-2px;margin-right:6px}
    @keyframes s{to{transform:rotate(360deg)}}
  </style>
  <button class="fab" title="Ayuda IA (Mi Estudio) · arrástrame si tapo algo">💡</button>
  <div class="cd"><span class="cdt"></span><button class="cdx">Cancelar</button></div>
  <div class="panel"><div class="h"><span>💡 Ayuda IA · Mi Estudio</span><button class="x" title="Cerrar">✕</button></div>
  <div class="b"><div class="upd"></div><button class="go">🔍 Analizar la pregunta</button><div class="mode"><button data-m="precise" title="Usa un modelo más potente: tarda unos segundos más">🎯 Preciso</button><button data-m="fast" title="Modelo ligero: más rápido, se equivoca más">⚡ Rápido</button></div><label class="auto"><input type="checkbox" class="autoChk"><span class="sw"></span><span><b>Automático:</b> analizar cada vez que cambie el ejercicio</span></label>
  <div class="fill"><button type="button" class="fillToggle" aria-pressed="false">Autocompletar: OFF</button><div class="times"><label>Mínimo (segundos)<input class="fillMin" type="number" min="0" max="3600" step="0.1" value="7"></label><label>Máximo (segundos)<input class="fillMax" type="number" min="0" max="3600" step="0.1" value="15"></label></div><div class="fillStatus" role="status" aria-live="polite">Desactivado. Por defecto: entre 7 y 15 segundos.</div><button class="fillCancel" type="button" hidden>Cancelar esta respuesta</button></div>
  <label class="auto"><input type="checkbox" class="nextChk"><span class="sw"></span><span><b>Pasar solo:</b> cuando compruebes tu respuesta y salga «Correcte», ir a la siguiente</span></label><div class="loc"></div><div class="out"></div>
  <div class="note">Autocompletar usa siempre la respuesta precisa y hace clic en la opción de Electude; también rellena campos compatibles. El intervalo empieza al recibir esa respuesta; después pulsa tú «Comprovar». Los dibujos se señalan para que hagas clic tú. La IA puede equivocarse.</div><div class="note"><a href="#" class="diag">🛠 Copiar diagnóstico</a> (si algo no se marca bien, pégamelo)</div></div></div>`;
  const $ = s => root.querySelector(s);
  const panel = $('.panel'), fab = $('.fab'), go = $('.go'), out = $('.out');
  const open = v => { panel.classList.toggle('on', v); fab.style.display = v ? 'none' : ''; };
  // botón movible (arrástralo si tapa algo de Electude); recuerda dónde lo dejas
  let drag = null, moved = false;
  const place = (x, y) => { x = Math.max(4, Math.min(innerWidth - 56, x)); y = Math.max(4, Math.min(innerHeight - 56, y)); fab.style.left = x + 'px'; fab.style.top = y + 'px'; fab.style.right = 'auto'; fab.style.bottom = 'auto'; return [x, y]; };
  try{ const p = JSON.parse(localStorage.getItem('__msElecFab') || 'null'); if(p) place(p[0], p[1]); else { fab.style.bottom = '90px'; } }catch(e){ fab.style.bottom = '90px'; }
  fab.addEventListener('pointerdown', e => { const r = fab.getBoundingClientRect(); drag = [e.clientX - r.left, e.clientY - r.top, e.clientX, e.clientY]; moved = false; fab.setPointerCapture(e.pointerId); });
  fab.addEventListener('pointermove', e => { if(!drag) return; if(Math.abs(e.clientX - drag[2]) + Math.abs(e.clientY - drag[3]) > 6) moved = true; if(moved) place(e.clientX - drag[0], e.clientY - drag[1]); });
  fab.addEventListener('pointerup', e => { if(drag && moved){ const r = fab.getBoundingClientRect(); try{ localStorage.setItem('__msElecFab', JSON.stringify([r.left, r.top])); }catch(_){} } drag = null; });
  fab.onclick = () => { if(moved){ moved = false; return; } open(true); };
  $('.x').onclick = () => { open(false); };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]));

  // documentos accesibles (la página y sus iframes del mismo origen)
  // documentos y zonas accesibles: la página, sus iframes del mismo origen y los «shadow DOM» abiertos
  function docs(d = document, acc = []){
    acc.push(d);
    const root = d.body || d;
    for(const el of root.querySelectorAll('*')){
      if(el.id === '__msElecHost' || el.id === '__msElecPins') continue;
      if(el.shadowRoot) docs(el.shadowRoot, acc);
      if(el.tagName === 'IFRAME' || el.tagName === 'FRAME'){ try{ if(el.contentDocument && el.contentDocument.body) docs(el.contentDocument, acc); }catch(e){} }
    }
    return acc;
  }
  const rootOf = d => d.body || d;
  // ¿se ve de verdad en pantalla? (descarta los ejercicios anteriores que Electude deja escondidos o fuera del carrusel)
  function shown(el){
    if(!el || !el.getBoundingClientRect) return false;
    const w = (el.ownerDocument && el.ownerDocument.defaultView) || window, r = el.getBoundingClientRect();
    if(r.width < 2 || r.height < 2 || r.bottom < 0 || r.right < 0 || r.top > w.innerHeight || r.left > w.innerWidth) return false;
    try{ if(el.checkVisibility && !el.checkVisibility({opacityProperty: true, visibilityProperty: true})) return false; }catch(e){}
    for(let n = el.parentElement, k = 0; n && k < 15; n = n.parentElement, k++){
      const cs = w.getComputedStyle(n);
      if(cs.overflow !== 'visible' || cs.overflowX !== 'visible' || cs.overflowY !== 'visible'){
        const p = n.getBoundingClientRect();
        if(r.right <= p.left + 1 || r.left >= p.right - 1 || r.bottom <= p.top + 1 || r.top >= p.bottom - 1) return false;
      }
    }
    return true;
  }
  function visibleText(scope, exclude){
    const out = [], cache = new Map();
    const ok = el => { if(cache.has(el)) return cache.get(el); const v = shown(el); cache.set(el, v); return v; };
    for(const d of scope ? [scope] : docs()){
      const root = scope || rootOf(d), doc = d.ownerDocument || d;
      const tw = doc.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      let lastBlock = null, line = '';
      for(let n = tw.nextNode(); n; n = tw.nextNode()){
        const t = n.textContent.replace(/\s+/g, ' '); if(!t.trim()) continue;
        const p = n.parentElement; if(!p || (exclude && exclude.contains(p)) || /^(SCRIPT|STYLE|NOSCRIPT)$/.test(p.tagName) || (p.closest && p.closest('#__msElecHost,#__msElecPins,[data-ms-elec-mark]'))) continue;
        if(!ok(p)) continue;
        let b = p; while(b && b !== root && /^(inline|inline-block|contents)$/.test((doc.defaultView || window).getComputedStyle(b).display)) b = b.parentElement;
        if(b !== lastBlock){ if(line.trim()) out.push(line.trim()); line = ''; lastBlock = b; }
        line += t;
      }
      if(line.trim()) out.push(line.trim());
    }
    return out.join('\n');
  }
  function pageText(){
    let box = null; try{ box = activityBox(); }catch(e){}
    let t = ''; try{ t = visibleText(null, box); }catch(e){}
    if(!t && !box) t = docs().map(d => { try{ return d.body ? d.body.innerText : [...d.children].map(c => c.innerText || '').join('\n'); }catch(e){ return ''; } }).join('\n');
    t = t.replace(/✓ (Respuesta IA|Verdadero)|✗ Falso/g, '').replace(/\n{3,}/g, '\n\n').trim();
    const act = box ? visibleText(box) : '';
    if(act && act.length > 10){
      const theory = t.trim();
      return ('--- TEORÍA (solo para razonar; NO son las opciones) ---\n' + theory.slice(0, 6000) + '\n\n--- ACTIVIDAD ACTIVA (el recuadro gris: las opciones a responder están SOLO aquí) ---\n' + act.slice(0, 4500));
    }
    return t.slice(0, 9000);
  }
  // marcas en la página
  let marks = [];
  function clearMarks(){ marks.forEach(([el, o, b]) => { Object.assign(el.style, o); if(b) b.remove(); }); marks = []; clearPins(); }
  const norm = s => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/^[\s(]*([a-h]|\d{1,2})[).:\-]\s+/, '').replace(/[«»"'.,;:¿?¡!()]/g, '').replace(/\s+/g, ' ').trim();
  // fila de opción: un bloque con hermanos parecidos (lista de respuestas), mejor si tiene casilla/tick
  function optionRow(el){
    let n = el;
    for(let k = 0; k < 5 && n && n.parentElement && n.tagName !== 'BODY'; k++, n = n.parentElement){
      const p = n.parentElement, sib = [...p.children].filter(c => c !== n && c.tagName === n.tagName && (c.className || '') === (n.className || '') && (c.innerText || '').trim());
      if(sib.length >= 1 && (n.innerText || '').trim().length < 300) return n;
    }
    return null;
  }
  const hasControl = el => !!el.querySelector('input[type=radio],input[type=checkbox],[role=radio],[role=checkbox],[role=option],svg,img,i[class*=icon],span[class*=check],div[class*=check]') || /^(radio|checkbox|option)$/.test(el.getAttribute('role') || '');
  const isHeading = el => !!el.closest('h1,h2,h3,h4,h5,h6,header,[role=heading],strong,b') || parseInt(getComputedStyle(el).fontWeight, 10) >= 600;
  function findOption(answer, scope){
    const want = norm(answer); if(want.length < 1) return null;
    const cands = [];
    for(const d of docs()){
      if(scope && !(d === scope.ownerDocument || d.contains && d.contains(scope) || (scope.getRootNode && scope.getRootNode() === d))) continue;
      const qEls = [...rootOf(d).querySelectorAll('p,div,span,h1,h2,h3,h4,label')].filter(x => /\?\s*$/.test((x.innerText || '').trim()) && (x.innerText || '').length < 400);
      for(const el of rootOf(d).querySelectorAll('label,li,td,button,span,div,p,a,option')){
        if(el.closest && el.closest('#__msElecHost')) continue;
        if(scope && !scope.contains(el)) continue;
        if(!shown(el)) continue;
        const t = norm(el.innerText || ''); if(!t || t.length > want.length * 3 + 40) continue;
        if(!(t === want || (want.length > 3 && (t.includes(want) || (t.length > 3 && want.includes(t) && t.length > want.length * 0.6))))) continue;
        const row = optionRow(el);
        let score = 0;
        if(row){ score += 50; if(hasControl(row)) score += 60; }
        if(t === want) score += 15;
        if(t.length > want.length * 1.25 + 8) score -= 45;   // párrafo que solo contiene la frase (texto de la lección)
        if(isHeading(el)) score -= 70;
        if(qEls.some(q => q.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING)) score += 25;
        cands.push({el, row, score, len: t.length});
      }
    }
    if(!cands.length) return null;
    cands.sort((a, b) => b.score - a.score || a.len - b.len);
    const best = cands[0];
    return best.row || best.el.closest('label,li,tr,button') || best.el;
  }
  function mark(answer){
    const target = findOption(answer, curBox) || (curBox ? null : findOption(answer)); if(!target) return false;
    styleRow(target, '✓ Respuesta IA', '#10b981');
    return true;
  }
  function styleRow(target, label, color, icon){
    const doc = target.ownerDocument;
    const rgb = color === '#ef4444' ? '239,68,68' : '16,185,129';
    const badge = doc.createElement('span');
    badge.dataset.msElecMark = 'true';
    badge.textContent = label;
    const grad = color === '#ef4444' ? '#f87171,#dc2626' : '#22c55e,#059669';
    badge.style.cssText = `all:initial;display:inline-flex;align-items:center;margin-left:12px;padding:4px 12px;border-radius:999px;background:linear-gradient(135deg,${grad});color:#fff;font:700 13px system-ui,-apple-system,sans-serif;letter-spacing:.02em;vertical-align:middle;box-shadow:0 3px 10px rgba(${rgb},.35);white-space:nowrap`;
    const st = target.style;
    marks.push([target, {outline: st.outline, outlineOffset: st.outlineOffset, background: st.background, boxShadow: st.boxShadow, borderRadius: st.borderRadius, transition: st.transition}, badge]);
    st.transition = 'box-shadow .5s ease, background .5s ease';
    st.outline = `2px solid ${color}`; st.outlineOffset = '2px'; st.borderRadius = '10px';
    st.background = `linear-gradient(90deg, rgba(${rgb},.22), rgba(${rgb},.08))`;
    const sh1 = `0 0 0 6px rgba(${rgb},.18), 0 4px 14px rgba(${rgb},.25)`, sh2 = `0 0 0 12px rgba(${rgb},.30), 0 4px 18px rgba(${rgb},.35)`;
    st.boxShadow = sh1;
    if(icon){ const is = icon.style; marks.push([icon, {outline: is.outline, outlineOffset: is.outlineOffset, borderRadius: is.borderRadius, boxShadow: is.boxShadow}]); is.outline = `3px solid ${color}`; is.outlineOffset = '3px'; is.borderRadius = '50%'; is.boxShadow = `0 0 0 7px rgba(${rgb},.3)`; }
    (target.querySelector('span,p,div,label') && target.children.length === 1 ? target.children[0] : target).appendChild(badge);
    let n = 0; const pulse = setInterval(() => { st.boxShadow = (n++ % 2) ? sh1 : sh2; if(n > 5){ clearInterval(pulse); st.boxShadow = sh1; } }, 500);
  }
  // verdadero/falso: marca la fila y el botón ✓ o ✗ que toca
  function markVF(stmt, isTrue){
    const row = findOption(stmt, curBox) || (curBox ? null : findOption(stmt)); if(!row) return false;
    const controls = vfControls(row), icon = controls ? (isTrue ? controls.yes : controls.no) : null;
    styleRow(row, isTrue ? '✓ Verdadero' : '✗ Falso', isTrue ? '#10b981' : '#ef4444', icon);
    return true;
  }
  // puntos sobre el dibujo (coordenadas 0-1000 de la captura)
  let pinHost = null;
  function clearPins(){ if(pinHost){ pinHost.remove(); pinHost = null; } }
  function snapHotspot(x, y, used = []){
    let best = null, bd = 1e9;
    for(let r = 0; r <= 48; r += 8) for(let a = 0; a < (r ? 12 : 1); a++){
      const px = x + r * Math.cos(a * Math.PI / 6), py = y + r * Math.sin(a * Math.PI / 6);
      for(const el of document.elementsFromPoint(px, py)){
        if(el.closest('#__msElecHost,#__msElecPins')) continue;
        const b = el.getBoundingClientRect(); if(b.width < 6 || b.height < 6 || b.width > 70 || b.height > 70) continue;
        const cs = getComputedStyle(el);
        if(!(cs.cursor === 'pointer' || /circle|button|hotspot|point|dot|marker/i.test((el.getAttribute('class') || '') + el.tagName) || el.getAttribute('role') === 'button')) continue;
        const cx = b.left + b.width / 2, cy = b.top + b.height / 2, d = Math.hypot(cx - x, cy - y);
        if(used.some(u => Math.hypot(u[0] - cx, u[1] - cy) < 6)) continue;
        if(d < bd){ bd = d; best = [cx, cy]; }
      }
    }
    return best;
  }
  function drawPins(points){
    clearPins();
    pinHost = document.createElement('div'); pinHost.id = '__msElecPins';
    pinHost.style.cssText = 'all:initial;position:absolute;left:0;top:0;width:0;height:0;z-index:2147483646;pointer-events:none';
    const sr = pinHost.attachShadow({mode: 'open'});
    sr.innerHTML = `<style>
      .pin{position:absolute;width:46px;height:46px;margin:-23px 0 0 -23px;border-radius:50%;border:3px solid #10b981;background:rgba(16,185,129,.18);box-shadow:0 0 0 4px rgba(255,255,255,.85),0 4px 14px rgba(0,0,0,.3);animation:p 1.1s ease-in-out 4}
      .pin::after{content:'';position:absolute;left:50%;top:50%;width:8px;height:8px;margin:-4px 0 0 -4px;border-radius:50%;background:#059669}
      .num{position:absolute;left:50%;top:50%;width:26px;height:26px;margin:-13px 0 0 -13px;border-radius:50%;background:linear-gradient(135deg,#22c55e,#059669);color:#fff;font:800 15px/26px system-ui,sans-serif;text-align:center;box-shadow:0 0 0 2px #fff,0 2px 6px rgba(0,0,0,.35);z-index:1}
      .pin.multi::after{display:none}
      .n{position:absolute;left:30px;top:-14px;min-width:22px;height:22px;padding:0 6px;border-radius:11px;background:linear-gradient(135deg,#22c55e,#059669);color:#fff;font:700 12px/22px system-ui,sans-serif;text-align:center;box-shadow:0 2px 6px rgba(0,0,0,.3);white-space:nowrap}
      @keyframes p{50%{transform:scale(1.35);box-shadow:0 0 0 10px rgba(16,185,129,.25),0 4px 14px rgba(0,0,0,.3)}}
    </style>`;
    const used = [], multi = points.length > 1;
    points.forEach((p, i) => {
      let x = p.x / 1000 * innerWidth, y = p.y / 1000 * innerHeight;
      const s = snapHotspot(x, y, used); if(s){ x = s[0]; y = s[1]; used.push(s); }
      const d = document.createElement('div'); d.className = 'pin' + (multi ? ' multi' : ''); d.style.left = (x + scrollX) + 'px'; d.style.top = (y + scrollY) + 'px';
      d.innerHTML = `${multi ? `<span class="num">${i + 1}</span>` : ''}<span class="n">${multi ? (i + 1) + ' · ' : ''}${esc(p.label || 'Aquí').slice(0, 40)}</span>`;
      sr.appendChild(d);
    });
    document.documentElement.appendChild(pinHost);
  }
  const send = m => new Promise(res => {
    let settled = false;
    const done = result => { if(settled) return; settled = true; clearTimeout(timeout); res(result); };
    const timeout = setTimeout(() => done({error: 'La extensión ha tardado demasiado. Vuelve a analizar la pregunta.'}), m.type === 'elecAsk' ? 65000 : 20000);
    try{
      if(typeof browser !== 'undefined' && browser.runtime){ Promise.resolve(api.runtime.sendMessage(m)).then(done, e => done({error: e.message})); }
      else { const p = api.runtime.sendMessage(m, result => { const error = api.runtime.lastError; done(error ? {error: error.message} : result); }); if(p && p.then) p.then(done, e => done({error: e.message})); }
    }catch(e){ done({error: e.message}); }
  });
  // ---------- IA en tu propio ordenador (Gemini Nano de Chrome), solo si aceptas ----------
  const LM = globalThis.LanguageModel;
  const LM_OPTS = {expectedInputs: [{type: 'text', languages: ['es', 'en']}], expectedOutputs: [{type: 'text', languages: ['es']}]};
  let localOn = false, localPoll = null;
  const loc = $('.loc');
  async function lmAvail(){ try{ return await LM.availability(LM_OPTS); }catch(e){ try{ return await LM.availability(); }catch(_){ return 'unavailable'; } } }
  async function renderLocal(msg){
    if(!LM){ loc.innerHTML = ''; return; }
    const av = await lmAvail();
    if(av === 'unavailable'){ loc.innerHTML = localOn ? '<div class="note">⚡ Tu ordenador o tu Chrome no pueden usar la IA local; uso la de la nube.</div>' : ''; return; }
    const st = av === 'available' ? 'lista' : av === 'downloading' ? 'descargando…' : 'sin descargar';
    loc.innerHTML = `<span class="chip ${localOn ? 'on' : ''}" title="Usa la IA que trae Chrome, ejecutada en tu ordenador">⚡ IA de tu ordenador: ${localOn ? 'activada' : 'desactivada'} · ${st}</span>${msg ? `<div class="note">${msg}</div>` : ''}`;
    loc.querySelector('.chip').onclick = () => {
      if(localOn){ localOn = false; api.storage.local.set({localAI: false}); clearInterval(localPoll); renderLocal(); return; }
      loc.innerHTML = `<div class="ask"><b>¿Usar la potencia de tu ordenador?</b><br>Chrome ejecutará su IA (Gemini Nano) en este ordenador. ${av === 'available' ? 'Ya está descargada.' : 'Primero tiene que <b>descargar el modelo (unos 2-4 GB)</b>: puede tardar de 5 a 30 minutos y necesita unos 22 GB libres en el disco y una tarjeta gráfica o 16 GB de RAM.'}<br><small>⚠️ Es bastante <b>menos precisa</b> que Gemini o Claude en la nube: úsala solo si te importa más la velocidad. Las preguntas de verdadero/falso y del dibujo siempre van a la nube.</small><div class="row"><button class="sm" data-y>Aceptar</button><button class="sm" data-n>No, gracias</button></div><div class="dl note"></div></div>`;
      loc.querySelector('[data-n]').onclick = () => renderLocal();
      loc.querySelector('[data-y]').onclick = async () => {
        const dl = loc.querySelector('.dl');
        dl.textContent = 'Pidiendo a Chrome que prepare la IA local…';
        localOn = true; api.storage.local.set({localAI: true});
        let started = Date.now(), last = -1;
        const slow = setTimeout(() => { if(last < 0) dl.innerHTML = 'Chrome está descargando el modelo en segundo plano (la primera vez tarda). <b>Puedes seguir usando la IA en la nube</b>: la local se usará sola cuando esté lista. Para ver el progreso abre <code>chrome://on-device-internals</code>.'; }, 15000);
        try{
          const s = await LM.create(Object.assign({}, LM_OPTS, {monitor(m){ m.addEventListener('downloadprogress', ev => { last = ev.loaded || 0; dl.textContent = 'Descargando el modelo… ' + Math.round(last * 100) + '%'; }); }}));
          clearTimeout(slow); try{ s.destroy(); }catch(e){}
          renderLocal('✅ IA local lista' + (Date.now() - started > 5000 ? ' (descarga terminada)' : '') + '.');
        }catch(err){
          clearTimeout(slow);
          const m = /user activation|gesture/i.test(err.message) ? 'Chrome pide que lo actives con un clic: vuelve a pulsar Aceptar.' : /space|disk/i.test(err.message) ? 'No hay espacio suficiente en el disco para el modelo.' : 'Chrome no ha podido prepararla: ' + err.message;
          dl.textContent = m;
          // si sigue descargándose, comprueba cada 30 s y avisa cuando esté
          clearInterval(localPoll); localPoll = setInterval(async () => { const a = await lmAvail(); if(a === 'available'){ clearInterval(localPoll); renderLocal('✅ IA local lista.'); } else if(a === 'unavailable'){ clearInterval(localPoll); renderLocal(); } }, 30000);
        }
      };
    };
  }
  try{ const g = api.storage.local.get('localAI'); if(g && g.then) g.then(r => { localOn = !!r.localAI; renderLocal(); }); else api.storage.local.get('localAI', r => { localOn = !!r.localAI; renderLocal(); }); }catch(e){}
  async function askLocal(text, dataUrl){
    const {prompt} = await send({type: 'elecPrompt'});
    let s = null;
    try{
      if(await lmAvail() !== 'available') return null;   // aún descargando: nube
      const content = [{type: 'text', value: prompt + '\n\n--- TEXTO DE LA PÁGINA ---\n' + text}];
      if(dataUrl){ try{ s = await LM.create({expectedInputs: [{type: 'text', languages: ['es', 'en']}, {type: 'image'}], expectedOutputs: LM_OPTS.expectedOutputs}); content.push({type: 'image', value: await (await fetch(dataUrl)).blob()}); }catch(e){ s = null; content.length = 1; } }
      if(!s) s = await LM.create(LM_OPTS);
      const out = await s.prompt([{role: 'user', content}]);
      return {text: out, local: true, model: 'Gemini Nano'};
    }finally{ try{ s && s.destroy(); }catch(e){} }
  }
  // filas con dos botones (✗ y ✓): son preguntas de «cert o fals» para CADA fila, puede haber varias correctas
  const isIconish = el => { if(!el.getBoundingClientRect) return false; const r = el.getBoundingClientRect(); return r.width >= 10 && r.height >= 10 && r.width <= 50 && r.height <= 50 && Math.abs(r.width - r.height) < 14 && (el.innerText || el.textContent || '').trim().length <= 2; };
  function rowIcons(row){
    const all = [...row.querySelectorAll('*')].filter(x => isIconish(x) && shown(x));
    const top = all.filter(x => !all.some(y => y !== x && y.contains(x)));
    // solo los que están a la izquierda del texto (o en línea con él)
    return top.sort((a, b) => a.getBoundingClientRect().left - b.getBoundingClientRect().left);
  }
  function vfRows(){ return vfRowEls().map(cleanT); }
  function vfRowEls(){
    const rows = new Set();
    // Parejas de radios etiquetados: sus etiquetas pueden ser más anchas que un icono.
    for(const d of docs()){
      const groups = new Map();
      for(const el of rootOf(d).querySelectorAll('input[type=radio]')){
        if(!el.name || own(el) || (!shown(el) && ![...(el.labels || [])].some(shown))) continue;
        if(!groups.has(el.name)) groups.set(el.name, []); groups.get(el.name).push(el);
      }
      for(const controls of groups.values()){
        if(controls.length !== 2 || !controls.some(el => truthValue(el) === true) || !controls.some(el => truthValue(el) === false)) continue;
        let row = controls[0].parentElement;
        while(row && !row.contains(controls[1])) row = row.parentElement;
        if(row && !/^(BODY|HTML)$/.test(row.tagName) && (row.innerText || '').length < 350) rows.add(row);
      }
    }
    for(const d of docs()) for(const ic of rootOf(d).querySelectorAll('*')){
      if(!isIconish(ic) || (ic.closest && ic.closest('#__msElecHost,#__msElecPins'))) continue;
      const row = optionRow(ic); if(!row || rows.has(row)) continue;
      const t = (row.innerText || '').trim();
      if(rowIcons(row).length >= 2 && t.length >= 2 && t.length < 300 && shown(row)) rows.add(row);
    }
    return [...rows].filter(r => ![...rows].some(o => o !== r && o.contains(r)));
  }
  const cleanT = el => {
    const copy = el.cloneNode(true); copy.querySelectorAll('[data-ms-elec-mark]').forEach(n => n.remove());
    return (copy.textContent || '').replace(/\s+/g, ' ').trim();
  };
  // el recuadro de la actividad (el gris con las opciones y el botón Comprovar)
  function activityBox(){
    const rows = vfRowEls();
    const btns = [];
    for(const d of docs()) for(const b of rootOf(d).querySelectorAll('button,a,[role=button],input[type=button],input[type=submit],div,span')){
      if(b.closest && b.closest('#__msElecHost')) continue;
      const t = (b.innerText || b.value || '').trim();
      if(t.length < 25 && /^(comprovar|comprobar|check|corregir|enviar|validar|submit)$/i.test(t) && b.children.length <= 2 && shown(b)) btns.push(b);
    }
    const seeds = btns.length ? btns : rows.slice(0, 1);
    for(const s of seeds){
      for(let n = s.parentElement, k = 0; n && k < 8; n = n.parentElement || (n.getRootNode && n.getRootNode().host), k++){
        const t = (n.innerText || '').trim();
        const hasAnswers = n.querySelector('input:not([type=button]):not([type=submit]):not([type=hidden]),select,textarea,[role=radio],[role=checkbox]') || rows.some(r => n.contains(r)) || [...n.querySelectorAll('*')].some(el => isIconish(el) && shown(el));
        if(t.length > 20 && hasAnswers && n.getBoundingClientRect().height > 60 && !/^(BODY|HTML)$/.test(n.tagName)) return n;
      }
    }
    if(rows.length >= 2){ let n = rows[0].parentElement; while(n && !rows.every(r => n.contains(r))) n = n.parentElement; return n; }
    return null;
  }
  // Referencias a controles reales: la IA elige IDs y nunca selectores ni código.
  const own = el => !!(el && el.closest && el.closest('#__msElecHost,#__msElecPins,[data-ms-elec-mark]'));
  const rowText = el => visibleText(el).replace(/\s+/g, ' ').trim();
  const controlHint = el => ['aria-label', 'title', 'alt', 'class', 'data-value', 'value'].map(a => el.getAttribute(a) || '').join(' ').toLowerCase() + ' ' + (el.textContent || '').trim();
  function truthValue(el){
    const values = ['data-value', 'value', 'aria-label', 'title', 'alt'].map(a => el.getAttribute(a) || '').concat([...(el.labels || [])].map(l => (l.innerText || '').trim()));
    for(const value of values){
      if(/^(false|falso|fals|incorrecte?|no|✗|✕|×)$/i.test(value.trim())) return false;
      if(/^(true|verdadero|vertader|verdader|cert|correcte?|yes|si|sí|✓|✔)$/i.test(value.trim())) return true;
    }
    return null;
  }
  function vfControls(row){
    const native = [...row.querySelectorAll('input[type=radio]')];
    const icons = native.length === 2 ? native : rowIcons(row); if(icons.length !== 2) return null;
    const negative = x => /false|incorrect|wrong|fals|cross|close|cancel|\b(no|0|x)\b|[✗✕✖×]/i.test(controlHint(x));
    const positive = x => !negative(x) && /true|correct|cert|vertader|verdader|check|tick|\b(ok|yes|si|sí|1|v)\b|[✓✔]/i.test(controlHint(x));
    let yes = icons.find(x => truthValue(x) === true) || icons.find(positive), no = icons.find(x => truthValue(x) === false) || icons.find(negative);
    if(!yes && no) yes = icons.find(x => x !== no);
    if(!no && yes) no = icons.find(x => x !== yes);
    // Electude presenta sus parejas sin etiquetas en orden ✗, ✓.
    return {no: no || icons[0], yes: yes || icons[1]};
  }
  function labelFor(el){
    const labels = [...(el.labels || [])].map(rowText).filter(Boolean);
    if(labels.length) return labels.join(' ');
    const ids = (el.getAttribute('aria-labelledby') || '').split(/\s+/).filter(Boolean);
    const labelled = ids.map(id => { const n = el.getRootNode().getElementById(id); return n ? rowText(n) : ''; }).filter(Boolean).join(' ');
    if(labelled) return labelled;
    const named = el.getAttribute('aria-label') || el.getAttribute('placeholder'); if(named) return named;
    const row = el.closest('label,li,tr,[role=option]') || optionRow(el) || el.parentElement;
    const text = row ? rowText(row) : '';
    return text.length < 350 ? text : '';
  }
  function registryFor(box){
    const registry = {choices: [], vfs: [], fields: []}; if(!box) return registry;
    const vfEls = vfRowEls().filter(r => box.contains(r));
    for(const row of vfEls){
      const controls = vfControls(row), text = rowText(row);
      if(controls && text) registry.vfs.push({id: 'V' + (registry.vfs.length + 1), text, row, ...controls});
    }
    const inVF = el => registry.vfs.some(v => v.row.contains(el));
    const seen = new Set(), groups = new Map();
    const groupId = key => { if(!groups.has(key)) groups.set(key, 'G' + (groups.size + 1)); return groups.get(key); };
    for(const el of box.querySelectorAll('input[type=radio],input[type=checkbox],[role=radio],[role=checkbox]')){
      if(own(el) || inVF(el)) continue;
      const label = [...(el.labels || [])].find(shown), row = label || el.closest('label,li,tr') || optionRow(el) || el;
      if(!shown(el) && !shown(row)) continue;
      const text = labelFor(el); if(!text) continue;
      const kind = el.type === 'checkbox' || el.getAttribute('role') === 'checkbox' ? 'checkbox' : 'radio';
      const group = el.name ? kind + ':' + el.name : el.closest('[role=radiogroup]') || kind;
      registry.choices.push({id: 'O' + (registry.choices.length + 1), text, kind, group: groupId(group), el, click: shown(el) ? el : row, row});
      seen.add(row);
    }
    // Controles dibujados por Electude: una fila repetida con un único círculo/casilla.
    for(const el of box.querySelectorAll('*')){
      if(!isIconish(el) || !shown(el) || own(el) || inVF(el)) continue;
      const row = optionRow(el);
      if(!row || !box.contains(row) || seen.has(row) || row.querySelector('input,select,textarea,[role=radio],[role=checkbox]')) continue;
      const icons = rowIcons(row), text = rowText(row);
      if(icons.length !== 1 || !text || text.length > 350) continue;
      const icon = icons[0], ancestor = icon.closest('button,[role=button],[onclick]'), clickable = ancestor && row.contains(ancestor) ? ancestor : icon;
      if(clickable.form && clickable.type === 'submit') continue;
      const kind = /checkbox|multi/i.test(controlHint(icon)) ? 'checkbox' : 'radio';
      registry.choices.push({id: 'O' + (registry.choices.length + 1), text, kind, group: groupId('custom'), el: icon, click: clickable, row}); seen.add(row);
    }
    for(const el of box.querySelectorAll('input,textarea,select')){
      if(own(el) || inVF(el) || !shown(el) || el.disabled || el.readOnly || el.closest('fieldset[disabled]')) continue;
      if(el.tagName === 'INPUT' && !['text', 'number', 'tel'].includes(el.type)) continue;
      const field = {id: 'C' + (registry.fields.length + 1), text: labelFor(el) || 'Campo ' + (registry.fields.length + 1), type: el.tagName === 'SELECT' ? 'select' : el.type || 'text', el};
      if(el.tagName === 'SELECT') field.options = [...el.options].filter(o => !o.disabled && !o.parentElement.disabled && o.value !== '').map(o => ({value: o.value, text: o.textContent.trim()}));
      registry.fields.push(field);
    }
    return registry;
  }
  function registryPrompt(registry){
    const printable = list => list.map(({id, text, kind, group, type, options}) => ({id, text, kind, group, type, options}));
    return '--- CONTROLES DE LA ACTIVIDAD ACTIVA (referencias exactas) ---\n' + JSON.stringify({opciones: printable(registry.choices), verdaderoFalso: printable(registry.vfs), campos: printable(registry.fields)}) + '\nUsa RESPUESTA: [O1] para elegir; VF: [V1] => V o F para CADA afirmación; CAMPO: C1 => valor para CADA campo. No inventes IDs. Si no hay controles identificados, usa el formato de ayuda manual.\n\n';
  }
  let fillSettings = Core.settings(), rangeReady = true, lastFinal = null, filledSig = '', cancelledSig = '', applying = false;
  const fillClock = new Core.Countdown();
  function fillStatus(message, error = false){ const el = $('.fillStatus'); el.textContent = message; el.classList.toggle('error', error); }
  const current = ctx => ctx.runId === analysisSeq && ctx.url === location.href && ctx.signature === sig();
  function cancelFill(reason){ fillClock.cancel(reason); $('.fillCancel').hidden = true; }
  function selected(el){
    if('checked' in el) return el.checked;
    const aria = el.getAttribute('aria-checked') ?? el.getAttribute('aria-selected') ?? el.getAttribute('data-selected');
    if(aria !== null) return aria === 'true' || aria === '1';
    if(/\b(selected|checked|active)\b/.test(el.getAttribute('class') || '')) return true;
    return null;
  }
  function usable(el){ return el && el.isConnected && !el.disabled && el.getAttribute('aria-disabled') !== 'true' && !el.closest('fieldset[disabled]') && !own(el); }
  function clickAnswer(el){
    if(!usable(el) || (!shown(el) && ![...(el.labels || [])].some(shown))) throw new Error('Un control ha dejado de estar disponible.');
    if(el.tagName === 'A' || (el.form && el.type === 'submit')) throw new Error('Este control puede enviar o cambiar la actividad; selecciónalo tú.');
    const w = el.ownerDocument.defaultView, rect = el.getBoundingClientRect();
    const init = {bubbles: true, cancelable: true, composed: true, view: w, clientX: rect.left + rect.width / 2, clientY: rect.top + rect.height / 2, button: 0};
    for(const type of ['mousedown', 'mouseup']) el.dispatchEvent(new w.MouseEvent(type, {...init, buttons: type === 'mousedown' ? 1 : 0}));
    if(typeof el.click === 'function') el.click();
    else el.dispatchEvent(new w.MouseEvent('click', {...init, buttons: 0}));
  }
  function fieldValue(field, raw){
    const el = field.el; let value = String(raw).trim();
    if(field.type === 'select'){
      const exact = field.options.filter(o => o.value === value);
      const byText = field.options.filter(o => Core.normalize(o.text) === Core.normalize(value));
      const matches = exact.length ? exact : byText;
      if(matches.length !== 1) throw new Error('El valor no coincide con una opción del desplegable.');
      value = matches[0].value;
    }
    if(field.type === 'number'){
      value = value.replace(',', '.');
      if(!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i.test(value) || !Number.isFinite(Number(value))) throw new Error('El campo numérico necesita un número, sin unidades.');
    }
    const probe = el.cloneNode(true); probe.value = value;
    if(probe.value !== value || (probe.checkValidity && !probe.checkValidity())) throw new Error('El valor no cumple el formato o los límites del campo.');
    return value;
  }
  function writeField(field, value){
    const el = field.el, w = el.ownerDocument.defaultView;
    if(!usable(el) || el.readOnly) throw new Error('El campo ya no es editable.');
    const proto = el.tagName === 'SELECT' ? w.HTMLSelectElement.prototype : el.tagName === 'TEXTAREA' ? w.HTMLTextAreaElement.prototype : w.HTMLInputElement.prototype;
    Object.getOwnPropertyDescriptor(proto, 'value').set.call(el, value);
    el.dispatchEvent(new w.Event('input', {bubbles: true, composed: true}));
    el.dispatchEvent(new w.Event('change', {bubbles: true, composed: true}));
    if(el.value !== value) throw new Error('Electude no ha aceptado el valor del campo.');
  }
  function prepareActions(plan, registry){
    return plan.actions.map(action => {
      const list = action.type === 'vf' ? registry.vfs : action.type === 'choice' ? registry.choices : registry.fields;
      const target = list.find(t => t.id === action.id);
      if(!target) throw new Error('La estructura de la pregunta ha cambiado. Vuelve a analizarla.');
      if(action.type === 'field') return {...action, value: fieldValue(target, action.value)};
      const control = action.type === 'vf' ? (action.value ? target.yes : target.no) : target.click;
      if(!usable(control) || (action.type === 'choice' && !usable(target.el))) throw new Error('Hay un control de respuesta desactivado.');
      if(action.type === 'choice' && action.value === false && selected(target.el) === null) throw new Error('No puedo comprobar qué casillas están marcadas en este ejercicio.');
      return action;
    });
  }
  function applyAnswer(r, ctx){
    if(!fillSettings.enabled || !rangeReady || !Core.isPrecise(r) || ctx.useMode !== 'precise' || document.hidden || !current(ctx) || cancelledSig === ctx.signature) return;
    let count = 0;
    try{
      const registry = registryFor(activityBox()), plan = Core.plan(Core.parse(r.text), registry);
      if(!plan.ok) throw new Error(plan.reason);
      const actions = prepareActions(plan, registry);
      applying = true;
      for(const action of actions){
        if(!fillSettings.enabled || document.hidden || !current(ctx)) throw new Error('Ha cambiado la pregunta; se ha detenido el autocompletado.');
        // Resuelve de nuevo cada ID por si Electude ha recreado una fila al marcar otra.
        const fresh = registryFor(activityBox());
        if(registryPrompt(fresh) !== registryPrompt(registry)) throw new Error('La estructura de la actividad ha cambiado.');
        const list = action.type === 'vf' ? fresh.vfs : action.type === 'choice' ? fresh.choices : fresh.fields;
        const target = list.find(t => t.id === action.id);
        if(action.type === 'field') writeField(target, action.value);
        else if(action.type === 'vf'){
          const control = action.value ? target.yes : target.no;
          if(selected(control) !== true) clickAnswer(control);
          if(selected(control) === false) throw new Error('Electude no ha confirmado la selección de verdadero/falso.');
        }else{
          if(selected(target.el) !== action.value) clickAnswer(target.click);
          if(selected(target.el) !== null && selected(target.el) !== action.value) throw new Error('Electude no ha aceptado una opción.');
        }
        count++;
      }
      filledSig = ctx.signature;
      fillStatus('✓ Respuesta rellenada. Revisa la explicación y pulsa «Comprovar».');
    }catch(e){
      cancelledSig = ctx.signature;
      fillStatus((count ? 'Se han aplicado ' + count + ' controles. ' : '') + e.message, true);
    }finally{ applying = false; $('.fillCancel').hidden = true; }
  }
  function queueFill(r, ctx){
    if(ctx.provisional || !r || r.error || !current(ctx)) return;
    lastFinal = {r, ctx};
    if(!fillSettings.enabled || !rangeReady || document.hidden || filledSig === ctx.signature || cancelledSig === ctx.signature) return;
    cancelFill('replaced');
    if(ctx.useMode !== 'precise' || !Core.isPrecise(r)){
      fillStatus('Autocompletar espera una respuesta del modo Preciso. No se aplicará la respuesta rápida.');
      if(!ctx.requirePrecise){ lastSig = ''; scheduleAuto(500); }
      return;
    }
    const plan = Core.plan(Core.parse(r.text), ctx.registry);
    if(!plan.ok){ fillStatus(plan.reason, true); return; }
    $('.fillCancel').hidden = false;
    try{
      fillClock.start({delay: Core.delay(fillSettings), valid: () => fillSettings.enabled && rangeReady && !document.hidden && cancelledSig !== ctx.signature && current(ctx),
        onTick: left => fillStatus('Respuesta precisa · clic automático en ' + left + ' s · intervalo ' + fillSettings.min + '–' + fillSettings.max + ' s.'),
        onCancel: reason => { $('.fillCancel').hidden = true; if(reason === 'stale') fillStatus('Autocompletado cancelado: cambió la pregunta o la pestaña.'); },
        run: () => applyAnswer(r, ctx)});
    }catch(error){
      cancelFill('error');
      fillStatus('No se ha podido iniciar el clic automático: ' + error.message + '. La sugerencia se conserva; pulsa Analizar para repetir.', true);
    }
  }
  function setFill(value, save){
    cancelFill('settings'); fillSettings = Core.settings(value); rangeReady = true;
    $('.fillToggle').setAttribute('aria-pressed', String(fillSettings.enabled));
    $('.fillToggle').textContent = 'Autocompletar: ' + (fillSettings.enabled ? 'ON' : 'OFF');
    $('.fillMin').value = fillSettings.min; $('.fillMax').value = fillSettings.max;
    fab.classList.toggle('auto', autoOn || fillSettings.enabled);
    fillStatus(fillSettings.enabled ? 'Activado · modo Preciso · clic automático entre ' + fillSettings.min + ' y ' + fillSettings.max + ' s después de su respuesta.' : 'Desactivado. Intervalo guardado: ' + fillSettings.min + '–' + fillSettings.max + ' s.');
    if(save) api.storage.local.set({elecFill: fillSettings}).catch(() => fillStatus('El ajuste está activo, pero no se ha podido guardar.', true));
    setMode(mode, fillSettings.enabled && mode !== 'precise');
    if(fillSettings.enabled){ if(lastFinal && current(lastFinal.ctx)) queueFill(lastFinal.r, lastFinal.ctx); else scheduleAuto(300); }
  }
  $('.fillToggle').onclick = () => {
    const next = !fillSettings.enabled, r = Core.range($('.fillMin').value, $('.fillMax').value);
    if(next && r.error){ fillStatus(r.error, true); return; }
    cancelledSig = ''; filledSig = ''; setFill({...fillSettings, ...(r.error ? {} : r), enabled: next}, true);
  };
  const updateRange = () => {
    cancelFill('settings'); const r = Core.range($('.fillMin').value, $('.fillMax').value);
    rangeReady = !r.error;
    if(r.error){ fillStatus(r.error, true); return; }
    setFill({...fillSettings, ...r}, true);
  };
  for(const s of ['.fillMin', '.fillMax']) $(s).addEventListener('input', updateRange);
  $('.fillCancel').onclick = () => { cancelledSig = lastFinal ? lastFinal.ctx.signature : sig(); cancelFill('user'); fillStatus('Esta respuesta se ha cancelado. Puedes rellenarla tú o volver a analizarla.'); };
  api.storage.local.get('elecFill').then(r => setFill(r.elecFill)).catch(() => {});
  if(api.storage.onChanged) api.storage.onChanged.addListener((changes, area) => {
    if(area === 'local' && changes.elecFill && JSON.stringify(Core.settings(changes.elecFill.newValue)) !== JSON.stringify(fillSettings)) setFill(changes.elecFill.newValue);
  });
  const hash = s => { let h = 5381; for(let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0; return (h >>> 0).toString(36) + s.length; };
  // respuestas guardadas: si vuelves a la misma pregunta, sale al instante
  async function cacheGet(k){ try{ const r = await api.storage.local.get('ansCache'); const c = (r && r.ansCache) || {}; return c[k] ? Object.assign({}, c[k].r) : null; }catch(e){ return null; } }
  async function cacheSet(k, v){ try{ const r = await api.storage.local.get('ansCache'); const c = (r && r.ansCache) || {}; c[k] = {t: Date.now(), r: {text: v.text, model: v.model, secs: v.secs, precise: v.precise === true}}; const ks = Object.keys(c).sort((a, b) => c[b].t - c[a].t); ks.slice(150).forEach(x => delete c[x]); await api.storage.local.set({ansCache: c}); }catch(e){} }
  function render(r, ctx){
    const {vr, shot, single} = ctx;
    if(!current(ctx)) return;
    answeredSig = ctx.signature;
    try{
      if(!r || r.error){
        lastFinal = null; cancelFill('error');
        if(fillSettings.enabled) fillStatus('No se ha podido obtener una respuesta final. Revisa el error y vuelve a analizar.', true);
        out.innerHTML = `<div class="err">${esc(r && r.error || 'No se pudo contactar con la IA.')}</div>` + (r && r.nokey ? '<div class="row"><button class="sm" data-cl>✳ Preguntar en Claude</button><button class="sm" data-app>🔑 Añadir clave</button></div>' : '');
        const b = out.querySelector('[data-app]'); if(b) b.onclick = () => send({type: 'openApp'});
        const c = out.querySelector('[data-cl]'); if(c) c.onclick = () => send({type: 'openClaude', q: r.prompt || ''});
        return;
      }
      const txt = Core.display(r.text, ctx.registry).replace(/\*\*/g, '').trim();
      const analysis = (txt.match(/AN[AÁ]LISIS\s*:\s*([\s\S]*?)(?=^\s*(RESPUESTA|VF|CAMPO|PUNTO|ACCI[OÓ]N|FIABILIDAD|POR QU[EÉ])\s*:)/im) || [])[1];
      const body = analysis ? txt.slice(txt.indexOf(analysis) + analysis.length) : txt;
      const why = (body.match(/POR QU[EÉ]\s*:\s*([\s\S]+)/i) || [])[1];
      const answers = [...body.matchAll(/^\s*RESPUESTA\s*:\s*(.+)$/gim)].map(m => m[1].trim());
      const vfs = [...body.matchAll(/^\s*VF\s*:\s*(.+?)\s*=>?\s*(V|F|VERDADERO|FALSO)\b\s*(?:[|\-–:]\s*(.+))?$/gim)].map(m => ({s: m[1].replace(/^["«]|["»]$/g, '').trim(), t: /^V/i.test(m[2]), why: (m[3] || '').trim()}));
      const pins = [...body.matchAll(/^\s*PUNTO\s*:\s*(.*?)\s*\|?\s*x\s*=\s*(\d+(?:\.\d+)?)\s*[,;]?\s*y\s*=\s*(\d+(?:\.\d+)?)/gim)].map(m => ({label: m[1].replace(/[|:\-\s]+$/, '').trim(), x: Math.min(1000, +m[2]), y: Math.min(1000, +m[3])}));
      const acts = [...body.matchAll(/^\s*ACCI[OÓ]N\s*:\s*(.+)$/gim)].map(m => m[1].trim());
      const fields = Core.parse(r.text).fields;
      clearMarks();
      if(single && vfs.length && !answers.length){ vfs.filter(v => v.t).forEach(v => answers.push(v.s)); vfs.length = 0; }
      let html = '', notes = [];
      if(vr.length >= 2 && vfs.length){
        const rowsN = vr.map(norm), ok = v => { const n = norm(v.s); return rowsN.some(r => r === n || (n.length > 5 && (r.includes(n) || n.includes(r)) && Math.min(n.length, r.length) / Math.max(n.length, r.length) > 0.8)); };
        const bad = vfs.filter(v => !ok(v));
        if(bad.length){ for(const b of bad) vfs.splice(vfs.indexOf(b), 1); notes.push('⚠️ La IA ha respondido ' + bad.length + ' frase(s) que no están en el recuadro gris; las he quitado.' + (vfs.length < vr.length ? ' Vuelve a pulsar Analizar con Mayús para repetir.' : '')); }
      }
      if(answers.length){
        let ok = 0; answers.forEach(a => { if(mark(a)) ok++; });
        html += `<div class="ans"><div class="top">💡 Respuesta sugerida</div>${answers.map(a => `<div class="pick"><span class="ck">✓</span><span>${esc(a.replace(/[.\s]+$/, ''))}</span></div>`).join('')}</div>`;
        notes.push(ok ? '✓ La opción está resaltada en verde en la página.' : 'No he encontrado la opción en la página para señalarla; mírala arriba.');
      }
      if(vfs.length){
        let ok = 0; vfs.forEach(v => { if(markVF(v.s, v.t)) ok++; });
        html += `<div class="ans"><div class="top">⚖️ Verdadero o falso</div><div class="vf">${vfs.map(v => `<div class="vfr"><span class="pill ${v.t ? 'v' : 'f'}">${v.t ? '✓ V' : '✗ F'}</span><span>${esc(v.s.replace(/[.\s]+$/, ''))}${v.why ? `<small class="vw">${esc(v.why)}</small>` : ''}</span></div>`).join('')}</div></div>`;
        notes.push(ok ? `✓ He marcado en la página ${ok === vfs.length ? 'cada afirmación' : ok + ' de ' + vfs.length + ' afirmaciones'} con el botón que toca (verde ✓ verdadero, rojo ✗ falso).` : 'No he encontrado las afirmaciones en la página; míralas arriba.');
      }
      if(pins.length){
        if(shot && shot.dataUrl){ notes.push(pins.length > 1 ? '📍 He numerado en el dibujo cada componente en el orden de la lista: haz clic en el 1, luego en el 2…' : '📍 He puesto un círculo verde en el dibujo donde hay que hacer clic.'); }
        html += `<div class="ans"><div class="top">📍 ${pins.length > 1 ? 'Orden de clics en el dibujo' : 'Haz clic en el dibujo'}</div><div class="vf">${pins.map((p, i) => `<div class="vfr"><span class="pill v">${pins.length > 1 ? i + 1 : '📍'}</span><span>${esc(p.label || 'Punto señalado')}</span></div>`).join('')}</div></div>`;
      }
      if(acts.length) html += `<div class="ans"><div class="top">👆 Qué hacer</div><div class="vf">${acts.map(a => `<div class="vfr"><span>${esc(a)}</span></div>`).join('')}</div></div>`;
      if(fields.length) html += `<div class="ans"><div class="top">✍️ Valores sugeridos</div><div class="vf">${fields.map(f => `<div class="vfr"><span>${esc((ctx.registry.fields.find(t => t.id === f.id) || {}).text || f.id)}: <b>${esc(f.value)}</b></span></div>`).join('')}</div></div>`;
      if(why && html) html = html.replace(/<\/div>$/, `<div class="why"><i>Por qué</i>${esc(why.trim())}</div></div>`);
      if(analysis && analysis.trim()) html += `<details class="an"><summary>🧠 Ver cómo lo ha razonado</summary><div>${esc(analysis.trim())}</div></details>`;
      if(shot && shot.dataUrl && pins.length) drawPins(pins);
      out.innerHTML = html || `<div class="why">${esc(txt)}</div>`;
      (ctx.pre || []).forEach(n => notes.unshift(n));
      if(r.model) notes.push((r.cached ? '⚡ Respuesta guardada (ya la habías analizado) · ' : '') + 'Modelo: ' + esc(r.model) + (r.local ? ' (en tu ordenador)' : '') + (r.secs ? ' · ' + r.secs + ' s' : ''));
      notes.forEach(n => out.insertAdjacentHTML('beforeend', `<div class="note">${n}</div>`));
      if(!(shot && shot.dataUrl)){
        out.insertAdjacentHTML('beforeend', '<div class="warn"><span>📸 <b>La IA no ha podido ver la pantalla</b>, solo el texto. Para preguntas sobre el dibujo (hacer clic, localizar piezas) necesita verla.</span><button class="sm" data-perm>Permitir que vea la pantalla de Electude</button><span>o pulsa una vez el icono de la extensión 🧩 en esta pestaña.</span></div>');
        const p = out.querySelector('[data-perm]'); if(p) p.onclick = () => send({type: 'askPerm'});
      }
      if(!ctx.provisional) queueFill(r, ctx);
    }catch(e){ out.innerHTML = `<div class="err">${esc(e.message)}</div>`; }
  }
  let curBox = null, answeredSig = '', analysisSeq = 0, analysisSig = '';
  let staleT = null;
  function checkStale(){
    clearTimeout(staleT);
    staleT = setTimeout(() => {
      if(!answeredSig && !analysisSig && !lastFinal) return;
      let s = ''; try{ s = sig(); }catch(e){ return; }
      const previous = analysisSig || answeredSig || (lastFinal && lastFinal.ctx.signature);
      if(s && s !== previous){
        answeredSig = ''; lastFinal = null; cancelFill('stale'); clearMarks();
        fillStatus(fillSettings.enabled ? 'Ha cambiado la pregunta. Esperando su análisis…' : 'Autocompletar desactivado.');
        if(!autoOn && !fillSettings.enabled) out.innerHTML = '<div class="note">↪️ Ha cambiado la pregunta. Pulsa <b>🔍 Analizar la pregunta</b>.</div>';
      }
    }, 900);
  }
  async function analyze(force){
    if(busy || document.hidden) return;
    busy = true; cancelFill('analysis'); lastFinal = null; filledSig = ''; cancelledSig = '';
    clearMarks(); answeredSig = '';
    const runId = ++analysisSeq, initialSig = sig(), requirePrecise = fillSettings.enabled, useMode = requirePrecise ? 'precise' : mode;
    analysisSig = initialSig; lastSig = initialSig;
    go.disabled = true; go.innerHTML = '<span class="spin"></span> Analizando…'; out.innerHTML = '';
    if(fillSettings.enabled) fillStatus('Esperando la respuesta final de la IA…');
    let tick = null;
    try{
      curBox = activityBox();
      const registry = registryFor(curBox), vr = registry.vfs.map(v => v.text);
      const ctx = {vr, registry, single: registry.choices.length > 0 && !vr.length, signature: initialSig, runId, url: location.href, useMode, requirePrecise};
      host.style.visibility = 'hidden'; await new Promise(r => setTimeout(r, 150));
      const shot = await send({type: 'elecShot'});
      host.style.visibility = ''; ctx.shot = shot;
      if(!current(ctx)) return;
      const ptxt = registryPrompt(registry) + pageText(), img = shot && shot.dataUrl || null;
      const key = 'q3_' + hash(location.href + '|' + ptxt + '|' + useMode + '|' + requirePrecise + '|' + (img ? hash(img) : 'text'));
      if(force !== true){ const c = await cacheGet(key); if(c){ render({...c, cached: true}, ctx); return; } }
      let r = null;
      const hard = vr.length > 0 || registry.fields.length > 0 || /clica|localitza|localiza|haz clic|fes clic|dibujo|imatge/i.test(ptxt);
      if(localOn && LM && !hard && !fillSettings.enabled){
        go.innerHTML = '<span class="spin"></span> Analizando en tu ordenador…';
        try{ r = await Promise.race([askLocal(ptxt, img), new Promise(res => setTimeout(() => res(null), 30000))]); if(r && !/(RESPUESTA|VF|PUNTO|CAMPO|ACCI[OÓ]N)\s*:/i.test(r.text || '')) r = null; }catch(e){ r = null; }
        if(r){ render(r, ctx); return; }
      }
      if(!current(ctx)) return;
      const t0 = Date.now(), secs = () => Math.round((Date.now() - t0) / 100) / 10;
      let phase = useMode === 'precise' ? 'Pensando' : 'Analizando';
      tick = setInterval(() => { if(runId === analysisSeq) go.innerHTML = `<span class="spin"></span> ${phase}… ${Math.round((Date.now() - t0) / 1000)} s`; }, 400);
      const ask = m => send({type: 'elecAsk', text: ptxt, image: img, url: ctx.url, mode: m, requirePrecise: requirePrecise && m === 'precise'});
      const save = result => { if(result && !result.error && current(ctx)){ result.secs = secs(); cacheSet(key, result); } };
      if(useMode === 'fast'){
        r = await ask('fast'); save(r);
        if(hard) ctx.pre = ['⚡ Modo rápido: en verdadero/falso y en el dibujo puede fallar más. Si dudas, usa 🎯 Preciso.'];
        render(r, ctx);
      }else if(requirePrecise){
        r = await ask('precise'); save(r);
        ctx.pre = ['🎯 Autocompletar usa solo la respuesta precisa.'];
        render(r, ctx);
      }else{
        const pFast = ask('fast'), pPrec = ask('precise');
        let done = false, provisional = null;
        const answerKey = t => JSON.stringify(Core.parse(t));
        pFast.then(rf => {
          if(done || !rf || rf.error || !current(ctx)) return;
          provisional = rf; rf.secs = secs(); phase = 'Comprobando con el modelo preciso';
          render(rf, {...ctx, provisional: true, pre: ['⏳ <b>Respuesta rápida provisional</b>: esperando al modelo preciso antes de autocompletar…']});
        });
        const rp = await pPrec; done = true;
        if(rp && !rp.error){
          save(rp);
          const pre = /lite/.test(rp.model || '') ? ['⚠️ El modelo preciso no está disponible ahora; he usado el rápido.'] : provisional ? [answerKey(provisional.text) === answerKey(rp.text) ? '🎯 <b>Confirmada</b> por el modelo preciso.' : '🎯 <b>Corregida</b>: el modelo preciso ha cambiado la respuesta rápida.'] : [];
          render(rp, {...ctx, pre});
        }else{
          const rf = await pFast;
          if(rf && !rf.error){ rf.secs = secs(); render(rf, {...ctx, pre: ['⚠️ El modelo preciso no respondió; esta es la respuesta rápida final.']}); }
          else render(rp || rf, ctx);
        }
      }
    }catch(e){ if(runId === analysisSeq && sig() === initialSig) out.innerHTML = `<div class="err">${esc(e.message)}</div>`; }
    finally{
      clearInterval(tick); host.style.visibility = ''; busy = false; analysisSig = '';
      go.disabled = false; go.textContent = '🔍 Analizar la pregunta';
      if(autoOn || fillSettings.enabled){ if(sig() !== initialSig || runId !== analysisSeq){ lastSig = ''; scheduleAuto(500); } }
    }
  }
  go.onclick = ev => analyze(ev && ev.shiftKey);
  let mode = 'precise';
  const setMode = (m, save) => {
    mode = !fillSettings.enabled && m === 'fast' ? 'fast' : 'precise';
    root.querySelectorAll('.mode button').forEach(b => {
      b.classList.toggle('on', b.dataset.m === mode);
      b.setAttribute('aria-pressed', String(b.dataset.m === mode));
      b.disabled = fillSettings.enabled && b.dataset.m === 'fast';
      if(b.dataset.m === 'fast') b.title = fillSettings.enabled ? 'Autocompletar usa siempre el modo Preciso' : 'Modelo ligero: más rápido, se equivoca más';
    });
    if(save){ api.storage.local.set({elecMode: mode}); analysisSeq++; cancelFill('mode'); lastFinal = null; lastSig = ''; scheduleAuto(300); }
  };
  root.querySelectorAll('.mode button').forEach(b => b.onclick = () => setMode(b.dataset.m, true));
  setMode('precise');
  try{ const g = api.storage.local.get('elecMode'); if(g && g.then) g.then(r => setMode(r.elecMode || 'precise')); else api.storage.local.get('elecMode', r => setMode(r.elecMode || 'precise')); }catch(e){}
  let updChecked = false;
  async function showUpdate(){
    if(updChecked) return; updChecked = true;
    const u = await send({type: 'checkUpdate'});
    if(u && u.newer){
      $('.upd').innerHTML = `<div class="warn"><span>🆕 <b>Hay una versión nueva de la extensión</b> (tienes la v${esc(u.mine)}, nueva v${esc(u.latest)}).</span><button class="sm" data-u>Cómo actualizarla</button></div>`;
      $('.upd [data-u]').onclick = () => send({type: 'openUpdate'});
      fab.title = 'Hay una versión nueva de la extensión';
    }
  }
  setTimeout(showUpdate, 1500);
  $('.diag').onclick = async ev => {
    ev.preventDefault();
    const D = docs(), path = el => { const p = []; for(let n = el, k = 0; n && k < 6 && n.tagName; n = n.parentElement || (n.getRootNode && n.getRootNode().host), k++) p.unshift(n.tagName.toLowerCase() + (n.id ? '#' + n.id : '') + (typeof n.className === 'string' && n.className ? '.' + n.className.trim().split(/\s+/).slice(0, 2).join('.') : '')); return p.join(' > '); };
    const ifr = [...document.querySelectorAll('iframe')].map(f => { let same = false; try{ same = !!f.contentDocument; }catch(e){} return (f.src || '').replace(/\?.*/, '').slice(0, 80) + (same ? ' (accesible)' : ' (otro origen)'); });
    const icons = []; for(const d of D) for(const el of rootOf(d).querySelectorAll('*')) if(isIconish(el) && !(el.closest && el.closest('#__msElecHost'))) icons.push(path(el));
    const info = {v: api.runtime.getManifest().version, url: location.href.replace(/\?.*/, ''), zonas: D.length, iframes: ifr, filasVF: vfRows(), iconos: icons.slice(0, 12), texto: pageText().slice(0, 600)};
    const s = JSON.stringify(info, null, 1);
    try{ await navigator.clipboard.writeText(s); ev.target.textContent = '✅ Copiado: pégalo en el chat'; }catch(e){ out.innerHTML = '<div class="why" style="font-size:11px">' + esc(s) + '</div>'; }
  };
  // ---------- pasar a la siguiente después de que TÚ compruebes y salga «Correcte» ----------
  // No elige ni comprueba respuestas: solo pulsa la flecha de «siguiente» por ti.
  let nextOn = false, fbWas = false, cdTimer = null;
  const OKFB = /^\s*(correcte|correcto|correct|ben fet|molt bé|muy bien)\b/i;
  const visible = el => { const r = el.getBoundingClientRect(); const cs = el.ownerDocument.defaultView.getComputedStyle(el); return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none'; };
  const disabled = el => el.disabled || el.getAttribute('aria-disabled') === 'true' || /disabled|inactive/i.test(el.getAttribute('class') || '') || parseFloat(el.ownerDocument.defaultView.getComputedStyle(el).opacity) < 0.6;
  function okFeedback(){
    const box = activityBox(), registry = registryFor(box), rows = [...registry.choices.map(t => t.row), ...registry.vfs.map(t => t.row)];
    for(const d of docs()) for(const el of rootOf(d).querySelectorAll('div,p,span,section')){
      if(el.closest('#__msElecHost')) continue;
      if(rows.some(row => row === el || row.contains(el)) || el.closest('label,button,[role=radio],[role=checkbox]')) continue;
      if(box && !box.contains(el) && !el.closest('[role=status],[role=alert],[class*=feedback],[class*=result],[class*=success]')) continue;
      const t = (el.innerText || '').trim(); if(t.length > 400 || !OKFB.test(t)) continue;
      if(shown(el)) return el;
    }
    return null;
  }
  function findNext(near){
    const all = [];
    for(const d of docs()) all.push(...d.querySelectorAll('button,a,[role=button],[onclick]'));
    const c = all.filter(el => !el.closest('#__msElecHost') && shown(el) && !disabled(el));
    const hint = el => ((el.getAttribute('aria-label') || '') + ' ' + (el.getAttribute('title') || '') + ' ' + (el.getAttribute('class') || '') + ' ' + (el.id || '') + ' ' + (el.innerText || '')).toLowerCase();
    const named = c.filter(el => /(next|seg[uü]ent|siguiente|endavant|forward|chevron-right|arrow-right|continua|continuar)/.test(hint(el)) && !/(prev|anterior|back|enrere|left)/.test(hint(el)));
    if(named.length) return named.sort((a, b) => b.getBoundingClientRect().left - a.getBoundingClientRect().left)[0];
    // flechas sin nombre: botones pequeños sin texto, debajo del recuadro de la respuesta; la de más a la derecha
    const nb = near ? near.getBoundingClientRect() : null;
    const icons = c.filter(el => { const r = el.getBoundingClientRect(); return !(el.innerText || '').trim() && r.width <= 70 && r.height <= 70 && (!nb || (r.top >= nb.top - 10 && r.top - nb.bottom < 200)); });
    if(icons.length >= 2) return icons.sort((a, b) => b.getBoundingClientRect().left - a.getBoundingClientRect().left)[0];
    return null;
  }
  function cancelCd(){ clearInterval(cdTimer); cdTimer = null; $('.cd').classList.remove('on'); }
  $('.cdx').onclick = cancelCd;
  function startCd(fb){
    if(cdTimer) return;
    let n = 2; const cd = $('.cd'), t = $('.cdt'), question = sig();
    t.textContent = '✅ Correcte · paso a la siguiente en ' + n + '…'; cd.classList.add('on');
    cdTimer = setInterval(() => {
      n--; if(n > 0){ t.textContent = '✅ Correcte · paso a la siguiente en ' + n + '…'; return; }
      cancelCd();
      if(!nextOn || document.hidden || sig() !== question || !okFeedback()) return;
      const nx = findNext(fb);
      if(nx){ nx.click(); } else { t.textContent = 'No encuentro el botón de siguiente: pásalo tú.'; cd.classList.add('on'); setTimeout(() => cd.classList.remove('on'), 2500); }
    }, 1000);
  }
  function checkNext(){
    if(!nextOn) return;
    const fb = okFeedback(), now = !!fb;
    if(now && !fbWas) startCd(fb);
    if(!now && cdTimer) cancelCd();
    fbWas = now;
  }
  function setNext(v, save){ nextOn = v; $('.nextChk').checked = v; fbWas = !!okFeedback(); if(save) api.storage.local.set({elecNext: v}); if(!v) cancelCd(); }
  $('.nextChk').onchange = ev => setNext(ev.target.checked, true);
  try{ const g = api.storage.local.get('elecNext'); if(g && g.then) g.then(r => setNext(!!r.elecNext)); else api.storage.local.get('elecNext', r => setNext(!!r.elecNext)); }catch(e){}
  // ---------- modo automático: analiza solo cuando cambia el ejercicio ----------
  let autoOn = false, lastSig = '', autoTimer = null, busy = false, lastRun = 0;
  const FEED = /^(correcte|incorrecte|correcto|incorrecto|torna-ho a provar|vuelve a intentarlo|ben fet|molt bé|muy bien|resposta correcta|respuesta correcta)\b.*$/gim;
  const sig = () => location.href + '\n' + pageText().replace(/✓ Respuesta IA|✓ Verdadero|✗ Falso/g, '').replace(FEED, '').replace(/\s+/g, ' ').trim();
  const looksLikeTask = t => /\?|clica|haz clic|fes clic|localitza|localiza|selecciona|marca|indica|mou |mueve|arrossega|arrastra|escriu|escribe|tria|elige|verdader|vertader|fals[oe]?\b/i.test(t);
  function setAuto(v, save){
    autoOn = v; $('.autoChk').checked = v; fab.classList.toggle('auto', v || fillSettings.enabled);
    if(save) api.storage.local.set({elecAuto: v});
    if(v){ lastSig = ''; scheduleAuto(300); } else if(!fillSettings.enabled) clearTimeout(autoTimer);
  }
  function scheduleAuto(ms = 1200){
    if(!autoOn && !fillSettings.enabled) return;
    clearTimeout(autoTimer);
    autoTimer = setTimeout(async () => {
      if((!autoOn && !fillSettings.enabled) || busy || document.hidden) return;
      const s = sig(), r = registryFor(activityBox()), hasControls = r.choices.length || r.vfs.length || r.fields.length;
      if(!s || s === lastSig || (!hasControls && !looksLikeTask(pageText())) || okFeedback()) return;
      if(Date.now() - lastRun < 3000){ scheduleAuto(3000); return; }
      lastSig = s; lastRun = Date.now();
      open(true); await analyze();
    }, ms);
  }
  $('.autoChk').onchange = ev => setAuto(ev.target.checked, true);
  try{ const g = api.storage.local.get('elecAuto'); if(g && g.then) g.then(r => setAuto(!!r.elecAuto)); else api.storage.local.get('elecAuto', r => setAuto(!!r.elecAuto)); }catch(e){}
  const watched = new WeakSet(), linkedFrames = new WeakSet(); let nextCheck = null;
  function manualChange(event){
    if(!event.isTrusted || applying || own(event.target)) return;
    const box = activityBox();
    if((box && box.contains(event.target)) || (fillSettings.enabled && (fillClock.job || busy))){
      cancelledSig = sig(); cancelFill('user');
      if(fillSettings.enabled) fillStatus('Has intervenido en la respuesta. Autocompletado cancelado para este ejercicio; pulsa Analizar para reactivarlo.');
    }
  }
  const watch = d => {
    if(!d || watched.has(d)) return; watched.add(d);
    try{
      for(const type of ['pointerdown', 'input', 'change', 'keydown']) d.addEventListener(type, manualChange, true);
      new MutationObserver(muts => {
        const relevant = muts.some(m => !own(m.target) && !(m.addedNodes.length && !m.removedNodes.length && [...m.addedNodes].every(n => n.nodeType === 1 && own(n))));
        if(!relevant) return;
        if(nextOn){ clearTimeout(nextCheck); nextCheck = setTimeout(checkNext, 250); }
        checkStale(); startWatch();
        if((autoOn || fillSettings.enabled) && !busy) scheduleAuto();
      }).observe(d.body || d.documentElement || d, {childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['class', 'hidden', 'aria-hidden', 'src', 'aria-current']});
    }catch(e){}
  };
  const startWatch = () => {
    const all = docs(); all.forEach(watch);
    for(const d of all) for(const f of rootOf(d).querySelectorAll('iframe,frame')){
      if(linkedFrames.has(f)) continue; linkedFrames.add(f);
      f.addEventListener('load', () => { startWatch(); cancelFill('stale'); scheduleAuto(); });
    }
  };
  if(document.body) startWatch(); else document.addEventListener('DOMContentLoaded', startWatch);
  document.addEventListener('visibilitychange', () => {
    if(document.hidden){ cancelFill('stale'); cancelCd(); }
    else { if(lastFinal) queueFill(lastFinal.r, lastFinal.ctx); scheduleAuto(600); }
  });
  api.runtime.onMessage.addListener(m => { if(m && m.type === 'MS_ELEC_OPEN'){ open(true); if(m.analyze) analyze(); } });
  const mount = () => { if(!document.getElementById('__msElecHost')) (document.body || document.documentElement).appendChild(host); };
  if(document.body) mount(); else document.addEventListener('DOMContentLoaded', mount);
  new MutationObserver(() => { if(!host.isConnected) mount(); }).observe(document.documentElement, {childList: true, subtree: false});
})();
