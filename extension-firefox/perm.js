const api = (typeof browser !== 'undefined' && browser.runtime) ? browser : chrome;
document.getElementById('b').onclick = async () => {
  const r = document.getElementById('r');
  try{
    const ok = await api.permissions.request({origins: ['<all_urls>']});
    r.className = 'm ' + (ok ? 'ok' : 'no');
    r.textContent = ok ? '✅ Listo. Vuelve a Electude y pulsa 🔍 Analizar la pregunta. Puedes cerrar esta pestaña.' : 'No se ha dado el permiso. Puedes usar el icono de la extensión en la pestaña de Electude.';
    if(ok) setTimeout(() => window.close(), 2500);
  }catch(e){ r.className = 'm no'; r.textContent = 'Error: ' + e.message; }
};
