// Utilidades compartidas por la web y la extensión. No contiene claves.
((scope) => {
  'use strict';
  const KEY_FIELDS = ['claudeKey', 'claudeModel', 'geminiKey', 'geminiKey2', 'geminiSlot', 'geminiModel', 'openaiKey', 'openaiModel', 'groqKey', 'groqModel', 'openrouterKey', 'openrouterModel', 'aiProvider'];
  const NAMES = {gemini: 'Gemini', claude: 'Claude', openai: 'OpenAI', groq: 'Groq · nivel gratuito', openrouter: 'OpenRouter Free'};
  const geminiKey = cfg => cfg.geminiSlot === 'secondary' ? cfg.geminiKey2 || '' : cfg.geminiKey || '';
  const hasKey = (cfg, provider) => !!(provider === 'gemini' ? geminiKey(cfg) : Object.hasOwn(NAMES, provider) ? cfg[provider + 'Key'] : '');
  const provider = cfg => ['gemini', 'groq', 'openrouter'].includes(cfg.aiProvider) || hasKey(cfg, cfg.aiProvider) ? cfg.aiProvider : ['gemini', 'groq', 'openrouter', 'claude', 'openai'].find(p => hasKey(cfg, p)) || cfg.aiProvider || 'gemini';
  function cleanKeys(source){
    const result = {};
    for(const field of KEY_FIELDS) if(typeof source[field] === 'string') result[field] = source[field].slice(0, /Key/.test(field) ? 1024 : 160);
    return result;
  }
  function fingerprint(value){
    let hash = 2166136261;
    for(const char of String(value || '')) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619);
    return (hash >>> 0).toString(36);
  }
  const quotaKey = (provider, key, model) => provider + ':' + fingerprint(key) + ':' + model;
  function seconds(value){
    const text = String(value || '').trim();
    if(/^\d+(?:\.\d+)?$/.test(text)) return Number(text);
    const matches = [...text.matchAll(/(\d+(?:\.\d+)?)\s*(h|m|s)/g)];
    return matches.reduce((sum, match) => sum + Number(match[1]) * ({h: 3600, m: 60, s: 1}[match[2]]), 0);
  }
  function nextDailyReset(now){
    const format = new Intl.DateTimeFormat('en-CA', {timeZone: 'America/Los_Angeles', year: 'numeric', month: '2-digit', day: '2-digit'});
    const today = format.format(new Date(now));
    let left = now, right = now + 27 * 3600000;
    while(right - left > 1){ const middle = Math.floor((left + right) / 2); if(format.format(new Date(middle)) === today) left = middle; else right = middle; }
    return right;
  }
  function quota(j, status, options = {}){
    const error = j && j.error || {}, source = JSON.stringify(error), now = options.now ?? Date.now();
    if(status !== 429 && status !== 402 && error.code !== 'insufficient_quota') return null;
    const billing = status === 402 || /insufficient_quota|billing|credit balance|prepay|payment_required/i.test(error.code || '');
    const daily = !billing && /perday|per day|daily|quota_exceeded/i.test(source);
    const details = error.details || [];
    const retry = details.find(detail => /RetryInfo/.test(detail['@type'] || ''));
    const retryHeader = options.retryAfter || '';
    const inMessage = (String(error.message || '').match(/(?:retry in|reset after)\s+([\d.hms\s]+)/i) || [])[1];
    let delay = seconds(retry && retry.retryDelay) || seconds(retryHeader) || seconds(inMessage);
    if(!delay && retryHeader && Number.isFinite(Date.parse(retryHeader))) delay = Math.max(0, (Date.parse(retryHeader) - now) / 1000);
    const retryAt = billing ? 0 : delay ? now + Math.max(1000, Math.ceil(delay * 1000)) : daily ? nextDailyReset(now) : now + 60000;
    const provider = options.provider || 'gemini', model = options.model || '';
    const name = NAMES[provider] || provider;
    const message = billing ? name + ': revisa el saldo o la facturación de tu API. No se harán reintentos automáticos.'
      : daily ? name + ': se ha agotado la cuota diaria de ' + model + '. Espera a que se restablezca o elige otra clave/proveedor que tenga disponibilidad en Ajustes.'
      : name + ': se ha alcanzado el límite temporal de solicitudes. El modelo queda en pausa hasta el próximo reintento permitido.';
    return {error: message, quota: true, provider, model, quotaKind: billing ? 'billing' : daily ? 'daily' : 'rate', retryAt, cooldownUntil: retryAt || now + 60000};
  }
  function openaiBody(turns, options = {}){
    return {model: options.model || 'gpt-5.5', instructions: options.instructions || '', store: false,
      max_output_tokens: options.maxOutputTokens || 4096, stream: options.stream === true,
      input: turns.map(turn => turn.role === 'assistant' ? {role: 'assistant', content: String(turn.text || '')} : {
        role: 'user', content: [{type: 'input_text', text: String(turn.text || '(imagen)')},
          ...(turn.images || []).map(image => ({type: 'input_image', image_url: image.url || 'data:' + image.mime + ';base64,' + image.data, detail: 'high'}))]
      })};
  }
  const outputText = response => (response.output || []).filter(item => item.type === 'message').flatMap(item => item.content || []).filter(part => part.type === 'output_text').map(part => part.text || '').join('\n');
  function chatConfig(cfg, p){
    if(p === 'openrouter'){
      const model = (cfg.openrouterModel || 'openrouter/free').trim();
      if(model !== 'openrouter/free' && !/^[a-z0-9._/-]+:free$/i.test(model)) throw new Error('OpenRouter: elige openrouter/free o un modelo terminado en :free. Los modelos de pago están desactivados.');
      return {url: 'https://openrouter.ai/api/v1/chat/completions', key: cfg.openrouterKey, model};
    }
    if(p === 'groq') return {url: 'https://api.groq.com/openai/v1/chat/completions', key: cfg.groqKey, model: cfg.groqModel || 'qwen/qwen3.8-27b'};
    throw new Error('Proveedor de chat no válido');
  }
  function chatBody(turns, options = {}){
    return {model: options.model, max_tokens: options.maxOutputTokens || 4096, stream: options.stream === true,
      messages: [...(options.instructions ? [{role: 'system', content: options.instructions}] : []), ...turns.map(turn => ({role: turn.role,
        content: turn.role === 'assistant' || !(turn.images || []).length ? String(turn.text || '') : [{type: 'text', text: String(turn.text || '(imagen)')},
          ...turn.images.map(image => ({type: 'image_url', image_url: {url: image.url || 'data:' + image.mime + ';base64,' + image.data}}))]
      }))]};
  }
  // Una selección hecha en Electude persiste al abrir la web con preferencias antiguas.
  function mergeSelection(incoming, override, explicit){
    const result = cleanKeys(incoming);
    if(!explicit && override && Object.hasOwn(NAMES, override.aiProvider)){
      const selected = {...result, aiProvider: override.aiProvider, geminiSlot: override.geminiSlot || result.geminiSlot};
      if(hasKey(selected, selected.aiProvider)) return selected;
    }
    return result;
  }
  const publicSettings = cfg => ({provider: provider(cfg), geminiSlot: cfg.geminiSlot || 'primary',
    available: Object.fromEntries(Object.keys(NAMES).map(p => [p, hasKey(cfg, p)])), primary: !!cfg.geminiKey, secondary: !!cfg.geminiKey2});
  const exported = {KEY_FIELDS, NAMES, geminiKey, hasKey, provider, cleanKeys, fingerprint, quotaKey, seconds, nextDailyReset, quota, openaiBody, outputText, chatConfig, chatBody, mergeSelection, publicSettings};
  scope.MiEstudioAI = exported;
  if(typeof module !== 'undefined' && module.exports) module.exports = exported;
})(globalThis);
