# Mi Estudio: Moodle + Classroom + Electude en una sola app

**Web:** https://kamaleon69.github.io/mi-estudio/

Reúne en una lista las tareas pendientes de **Moodle** (Jesuïtes Educació), **Google Classroom** y **Electude**, ordenadas por fecha. Incluye un asistente con **Claude o Gemini** y una herramienta tipo **Lens** para preguntar sobre cualquier parte de la pantalla.

Funciona en **Android, iPhone/iPad, Windows y Mac**. Tus datos se guardan solo en tu dispositivo: en la web no hay nada tuyo.

---

## 1. Instalar la app

Abre la web y pulsa el botón azul **⬇ Añadir** de arriba. Te dará los pasos exactos para tu dispositivo:

- **Android** (Chrome): menú ⋮ → **Instalar aplicación**.
- **iPhone / iPad** (Safari): **Compartir** (□↑) → **Añadir a pantalla de inicio**.
- **Windows** (Chrome o Edge): icono de **instalar** en la barra de direcciones. Marca «crear acceso directo en el escritorio».
- **Mac**: en Safari, **Archivo → Añadir al Dock**. En Chrome o Edge, icono de instalar en la barra de direcciones.

## 2. Tus plataformas (solo las direcciones)

En **Ajustes → 🔗 Tus plataformas** pon la dirección de cada web y pulsa **Guardar**. La app **no pide usuario, contraseña ni token**: entras en cada plataforma como siempre.

- **Moodle:** `https://moodle4.net.fje.edu` (copia la barra de direcciones hasta antes de `/my`).
- **Classroom:** `https://classroom.google.com`. Si tienes varias cuentas de Google, copia hasta el `/u/1` o `/u/2` de tu cuenta **@fje.edu**, por ejemplo `https://classroom.google.com/u/2`, para que los enlaces abran directamente con la cuenta del centro.
- **Electude:** `https://clotfje.electude.eu/srestore`.

Comprueba con los enlaces «Abrir ↗» que cada uno lleva a su sitio.

## 3. Conectar Moodle y Classroom (marcador ⚡)

La app usa un **marcador**: lee tus tareas con la sesión que ya tienes abierta en el navegador. No pide ni guarda contraseñas.

**Guardar el marcador (solo la primera vez, en el ordenador)**

1. En la app, ve a **Ajustes → ⚡ Conectar Moodle y Classroom**.
2. Pulsa **Ctrl + Shift + B** (en Mac **⌘ + Shift + B**) para ver la barra de marcadores.
3. **Arrastra** el botón azul **⚡ Sincronizar Mi Estudio** hasta esa barra. No hagas clic en él.

**Moodle**

1. Abre tu Moodle (enlace «Abrir Moodle ↗» en Ajustes) y entra con tu cuenta de Microsoft del centro, como siempre.
2. En el «Tauler de control», pulsa el marcador **⚡ Sincronizar Mi Estudio**.
3. Se abre Mi Estudio con «✅ Moodle sincronizado».

**Classroom**

1. Abre Classroom → **Pendents** (enlace en la ⓘ del marcador) con tu cuenta **@fje.edu**. Si sale tu Gmail personal, pulsa tu foto (arriba a la derecha) y elige la cuenta del centro.
2. En **Pendents**, pulsa el marcador. La página pasa sola a «Sense entregar» y vuelve, porque lee también las tareas vencidas. Espera unos segundos.
3. Se abre Mi Estudio con «✅ Classroom sincronizado».

**Para actualizar**, pulsa **↻ Actualizar** en la app. Verás cuándo sincronizaste cada plataforma por última vez y botones para abrir Moodle o Classroom (y allí pulsas el marcador ⚡) o para pegar una sincronización.

> Con el marcador **ves** las tareas, fechas y cursos. Para **entregar**, pulsa «Abrir en Moodle» o «Abrir en Classroom» en cada tarea.

## 4. Electude

- El botón **Abrir Electude** abre `https://clotfje.electude.eu/srestore`. En el PC se abre en una ventana lateral para usarlo junto a la app.
- Electude no deja que otras apps lean tus tareas. Apúntalas en la pestaña **Electude** con título y fecha, y aparecerán en «Pendientes» junto al resto.

## 5. Sincronizar el móvil (con un QR)

En el móvil **no hace falta el marcador**:

1. En el **ordenador**, sincroniza Moodle y Classroom con el marcador (paso 3).
2. En **Ajustes → 📱 Sincronizar el móvil**, pulsa **📱 Mostrar QR**.
3. En el **móvil**, abre la **cámara**, apunta al QR y toca el enlace. Se abre Mi Estudio con todas tus tareas.

- **iPhone con la app instalada:** la cámara abre Safari, no la app. En Safari pulsa **📋 Copiar para la app instalada**, abre la app y pulsa **📋 Pegar sincronización**.
- **Android:** la app instalada comparte los datos con Chrome, así que no hace falta nada más.
- **Si no puedes escanear:** usa **💬 Enviar por WhatsApp** (envíatelo a ti mismo) o **🔗 Copiar enlace**, y abre el enlace en el móvil.

Repítelo cuando vuelvas a sincronizar en el ordenador. El enlace no lleva contraseñas ni claves, pero sí tu lista de tareas: envíatelo solo a ti.

*(Avanzado: también puedes usar el marcador directamente en el móvil; las instrucciones están en la ⓘ del marcador.)*

## 6. Asistente IA y Lens

- **✳ Claude** (abajo a la derecha) o **✳ Ayuda** dentro de una tarea: abre un chat. Desde una tarea, la IA ya sabe cuál es. Con «Pegar en mi borrador» guardas la respuesta en tus notas de esa tarea.
- **🔍 Lens**: arrastra sobre una zona de la pantalla y elige **Claude** o **Gemini**. Con **📷 Foto** envías una foto de tu libreta o tu libro.

Escribe tu pregunta y pulsa **➤**. Tu mensaje se queda en el chat:

- **Con una clave de API**, la respuesta llega dentro de la app. La de **Gemini es gratis**: dentro del chat pulsa **🔑 Chatear aquí**, abre https://aistudio.google.com/apikey con tu Gmail personal, pulsa *Create API key*, pégala y pulsa **Guardar y enviar**. La de Claude se crea en https://console.anthropic.com/settings/keys y se paga por uso, aparte de Claude Pro. Ambas se pueden poner también en **Ajustes → Asistentes IA**.
- **Sin clave**, pulsa **↗ Enviar con mi cuenta**. Se abre la app o la web de Claude con tu pregunta ya escrita, o Gemini con la pregunta copiada para pegarla. Si hay una imagen, se copia para pegarla allí. El menú «Compartir» solo aparece si el móvil no deja copiar la imagen.

## 7. Compartir con compañeros

**Ajustes → Compartir con compañeros → Copiar enlace**. Tu compañero abre el enlace, ve la app vacía (nada tuyo), la instala con **⬇ Añadir** y sigue el paso 3 con **sus** cuentas.

## 8. Problemas frecuentes

- **No veo los últimos cambios:** pulsa **Ctrl + Shift + R**.
- **El marcador dice «abre Moodle, Classroom o Electude»:** lo has pulsado en otra página. Ábrelo dentro de Moodle o de Classroom → Pendents.
- **Classroom no carga tareas:** comprueba que estás con la cuenta **@fje.edu** y en la página **Pendents**.
- **Al pulsar el marcador no se abre la app:** el navegador ha bloqueado la ventana. Permite las ventanas emergentes para Moodle y Classroom, o pulsa el marcador otra vez.
- **En el móvil no aparece nada:** cada dispositivo (y en el iPhone, la app instalada) guarda sus datos aparte. Sincroniza con el marcador del móvil o usa «📲 Pasar a otro dispositivo» y «📋 Pegar sincronización».

---

### Actualizar la web (solo el propietario)

Sube los archivos nuevos a https://github.com/kamaleon69/mi-estudio con **Add file → Upload files** y pulsa **Commit changes**. En un par de minutos estará en la web.
