// Reads only the selected file. DOCX extraction runs locally and ignores embedded files.
((scope) => {
  const maxFile = 8 * 1024 * 1024;
  const maxXml = 2 * 1024 * 1024;
  const maxText = 24000;
  const decoder = new TextDecoder();
  function base64(bytes) {
    let binary = '';
    for (let i = 0; i < bytes.length; i += 16384) binary += String.fromCharCode(...bytes.subarray(i, i + 16384));
    return btoa(binary);
  }

  async function wordXml(bytes) {
    const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    const u16 = offset => view.getUint16(offset, true);
    const u32 = offset => view.getUint32(offset, true);
    let end = bytes.length - 22;
    const bottom = Math.max(0, end - 65535);
    while (end >= bottom && (u32(end) !== 0x06054b50 || end + 22 + u16(end + 20) !== bytes.length)) end--;
    if (end < bottom || u16(end + 4) || u16(end + 6)) throw new Error('El DOCX no tiene un archivo ZIP válido.');
    const count = u16(end + 10);
    let cursor = u32(end + 16);
    for (let i = 0; i < count && cursor + 46 <= end; i++) {
      if (u32(cursor) !== 0x02014b50) break;
      const length = u16(cursor + 28);
      const name = decoder.decode(bytes.subarray(cursor + 46, cursor + 46 + length));
      if (name !== 'word/document.xml') {
        cursor += 46 + length + u16(cursor + 30) + u16(cursor + 32);
        continue;
      }
      const offset = u32(cursor + 42), packed = u32(cursor + 20), unpacked = u32(cursor + 24);
      const method = u16(cursor + 10);
      if (offset + 30 > bytes.length || u32(offset) !== 0x04034b50 || unpacked > maxXml || (u16(cursor + 8) & 1)) break;
      const start = offset + 30 + u16(offset + 26) + u16(offset + 28);
      if (start + packed > bytes.length) break;
      const entry = bytes.subarray(start, start + packed);
      if (method === 0 && packed === unpacked) return decoder.decode(entry);
      if (method !== 8) break;
      const reader = new Blob([entry]).stream().pipeThrough(new DecompressionStream('deflate-raw')).getReader();
      let total = 0, xml = '';
      const utf = new TextDecoder();
      try {
        for (;;) {
          const chunk = await reader.read();
          if (chunk.done) break;
          total += chunk.value.length;
          if (total > unpacked || total > maxXml) throw new Error('El DOCX supera el límite de lectura.');
          xml += utf.decode(chunk.value, {stream: true});
        }
        if (total !== unpacked) break;
        return xml + utf.decode();
      } finally { await reader.cancel().catch(() => {}); }
    }
    throw new Error('No se encontró texto de Word legible. Guarda el documento como PDF.');
  }

  function wordText(xml) {
    if (/<!DOCTYPE|<!ENTITY/i.test(xml)) throw new Error('El DOCX contiene XML incompatible.');
    const doc = new DOMParser().parseFromString(xml, 'application/xml');
    if (doc.querySelector('parsererror')) throw new Error('El texto del DOCX está dañado.');
    const ns = doc.documentElement.namespaceURI;
    return [...doc.getElementsByTagNameNS(ns, 'p')].map(p =>
      [...p.getElementsByTagNameNS(ns, '*')].map(node => {
        if (node.localName === 't') return node.textContent;
        if (node.localName === 'tab') return '\t';
        if (node.localName === 'br') return '\n';
        return '';
      }).join('')
    ).filter(line => line.trim()).join('\n');
  }

  async function read(file) {
    const name = String(file.name).slice(0, 160);
    const ext = name.split('.').at(-1).toLowerCase();
    if (!['pdf', 'docx', 'txt', 'md', 'csv'].includes(ext)) throw new Error('Usa un PDF, DOCX, TXT, MD, CSV o una imagen.');
    if (!file.size || file.size > maxFile) throw new Error('El archivo debe tener contenido y pesar como máximo 8 MB.');
    const bytes = new Uint8Array(await file.arrayBuffer());
    if (ext === 'pdf') {
      if (!decoder.decode(bytes.subarray(0, 1024)).includes('%PDF-')) throw new Error('El archivo no parece un PDF válido.');
      return {name, pdf: base64(bytes)};
    }
    const text = (ext === 'docx' ? wordText(await wordXml(bytes)) : decoder.decode(bytes)).trim();
    if (!text || text.includes('\0')) throw new Error('No se encontró texto legible. Prueba con un PDF o una captura.');
    if (text.length > maxText) throw new Error('El documento supera 24.000 caracteres de texto. Divide el material en partes.');
    return {name, text};
  }
  scope.MiEstudioDocument = {read};
  if (typeof module !== 'undefined') module.exports = scope.MiEstudioDocument;
})(globalThis);
