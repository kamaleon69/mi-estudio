// Detección del dispositivo; un ordenador táctil no se considera móvil solo por tener pantalla táctil.
((scope) => {
  const isMobile = (nav = scope.navigator || {}) => nav.userAgentData?.mobile === true || /Android|iPhone|iPad|iPod/i.test(nav.userAgent || '') || /Mac/i.test(nav.platform || '') && Number(nav.maxTouchPoints) > 1;
  const exported = {isMobile}; scope.MiEstudioDevice = exported;
  if(typeof module !== 'undefined' && module.exports) module.exports = exported;
})(globalThis);
