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
- **Classroom:** `https://classroom.google.com` y, en **Tu correo del centro**, tu cuenta del instituto (por ejemplo `447173.clot@fje.edu`). Así Classroom se abre **siempre con la cuenta del instituto**, aunque tu Gmail personal sea la principal del navegador.
- **Leer tareas desde:** por defecto el **1 de septiembre de 2026**. Las tareas con fecha anterior no se traen. Las que no tienen fecha se muestran siempre.
- **Electude:** `https://clotfje.electude.eu/srestore`.

Comprueba con los enlaces «Abrir ↗» que cada uno lleva a su sitio.

## 3. Sincronizar con 1 clic: extensión (recomendado)

Con la extensión, pulsa **↻ Actualizar**: verás cuánto hace de la última sincronización de cada plataforma y un único botón, **⚡ Sincronizar**. Al pulsarlo, Moodle se lee en segundo plano (sin abrir ventana) y Classroom en una ventanita unos segundos; tus tareas se leen con tu sesión y se muestran en la app. Si la sesión de Moodle ha caducado, también se abre la ventanita para que inicies sesión, y continúa sola. Además, la extensión actualiza Moodle sola cada 2 horas mientras el navegador está abierto.

La extensión solo tiene permiso para `moodle4.net.fje.edu`, `classroom.google.com` y la web de Mi Estudio. No guarda ni envía contraseñas.

**Chrome / Edge:**

1. En la app, ve a **Ajustes → 🧩 Sincronizar con 1 clic → ⬇ Descargar**. Descomprime el zip en una carpeta que no vayas a borrar.
2. Abre `chrome://extensions` (en Edge, `edge://extensions`) y activa **Modo de desarrollador**.
3. Pulsa **Cargar descomprimida** y elige la carpeta. Después recarga Mi Estudio.
4. Para actualizarla a una versión nueva, sustituye los archivos de la carpeta y pulsa ↻ en la tarjeta de la extensión.

**Zen / Firefox** (solo instalan extensiones firmadas por Mozilla; la firma es gratis):

1. Descarga `mi-estudio-extension-firefox.zip` desde Ajustes, abriendo la app en Zen. No lo descomprimas.
2. Entra en https://addons.mozilla.org/developers/addon/submit/distribution, elige **On your own** (no se publica) y sube el zip. En unos minutos podrás descargar el **.xpi firmado**.
3. En Zen, abre `about:addons` → ⚙ → **Instalar complemento desde archivo** → el .xpi, y acepta los permisos.
4. Para probarla sin firmar (se borra al cerrar el navegador): `about:debugging#/runtime/this-firefox` → **Cargar complemento temporal** → `manifest.json`.

## 3a. Sin ordenador: sincronizar desde el móvil

- **Android:** instala **Firefox** desde Google Play y la extensión firmada (.xpi). Para instalarla: en Firefox, ve a Ajustes → Acerca de Firefox y toca el logo 5 veces; vuelve a Ajustes → **Instalar complemento desde archivo**. Después, **↻ Actualizar → ⚡ Sincronizar** funciona igual que en el ordenador, pero en una pestaña.
- **iPhone/iPad:** Safari no admite extensiones propias. Usa el **marcador de Safari**: en Ajustes → 📱 Sincronizar el móvil → «¿No tienes ordenador?», toca **Copiar código del marcador** y sigue los 4 pasos.

## 3b. Alternativa sin extensión: el marcador ⚡


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

En la pantalla principal tienes tres pestañas:

- **📋 Pendientes:** lo que tienes que hacer, ordenado por fecha.
- **⚠️ No presentadas:** tareas vencidas que no entregaste, también las calificadas con 0.
- **✅ Entregadas:** primero las **calificadas, con su nota** (en rojo si es menor que la mitad) y luego las entregadas que aún no tienen nota.

- **🧹 Revisar:** muestra lo que puede estar **desfasado** (plataformas sin sincronizar hace más de un día, tareas vencidas hace poco que quizá entregaste, tareas de Electude vencidas sin marcar) y la lista completa de tareas con su estado. Desde aquí puedes sincronizar, marcar tareas como entregadas o eliminarlas.

**Eliminar o marcar una tarea:** abre la tarea y usa **🗑 Eliminar tarea** o **✓ Marcar como entregada**, que sirve si la entregaste en papel o por otra vía. Las tareas eliminadas no vuelven al sincronizar; se recuperan en 🧹 Revisar → **↩ Restaurar**. La marca de «entregada» desaparece sola cuando la plataforma confirma la entrega.

**Al abrir la app:** con la extensión, si la última sincronización es de hace más de 1 hora, se actualiza sola (se puede desactivar en Ajustes → 🧩). Sin extensión, verás un aviso si tus tareas son de hace más de un día.

Solo se muestran las tareas con fecha **desde el 1 de septiembre de 2026**, o desde la fecha que elijas. Puedes cambiarla en el propio panel **↻ Actualizar** (campo **📅 Sincronizar desde**, con el botón **Sept. 2026** para volver al valor por defecto) o en Ajustes → Tus plataformas.

En Moodle, el marcador revisa cada tarea de tus cursos y tarda unos segundos (verás «Leyendo tareas 12/32…»). En Classroom lee las pestañas «Assignat», «Sense entregar» y «Fet».

> Con el marcador **ves** las tareas, fechas y cursos. Para **entregar**, pulsa «Abrir en Moodle» o «Abrir en Classroom» en cada tarea.

## Actualizar la extensión

**No hace falta borrarla.** Cuando haya una versión nueva en GitHub, Mi Estudio te avisa con un aviso arriba y el panel 💡 de Electude también. El icono de la extensión muestra **NEW**. Pulsa **«Cómo actualizarla»** y sigue los pasos:
1. Descarga el zip nuevo (el botón ya trae el enlace).
2. Descomprímelo en la **misma carpeta** de antes y acepta reemplazar los archivos.
3. Abre `chrome://extensions` (o `edge://extensions`) y pulsa **↻** en «Mi Estudio · Sincronizar».
4. Recarga Mi Estudio y Electude (F5).

Si la app tiene una versión nueva, sale **«↻ Actualizar ahora»**.

**Para el propietario:** al publicar cambios, sube también `version.json` con los números nuevos (`app` y `extension`); así es como se detecta la versión nueva.

## 4. Electude

La pestaña **Electude** es solo un acceso directo a `https://clotfje.electude.eu/srestore`, que se cambia en Ajustes → Tus plataformas. Se abre en una pestaña nueva del navegador.

**🎓 Tutor dentro de Electude (extensión v1.9):** con la extensión instalada, en cualquier página de Electude aparece un botón **💡** abajo a la derecha (puedes arrastrarlo). Ábrelo y sale el panel **Tutor IA**. El tutor **no te da la respuesta**: te ayuda a razonarla.
1. **Intenta el ejercicio tú primero.** Si te atascas, pulsa **💡 Dame una pista**. Te explica qué concepto trabaja el ejercicio, dónde mirar en la teoría y te hace una pregunta para que pienses.
2. ¿Sigues atascado? Pulsa **💡 Otra pista, más concreta** (hay 2 pistas por ejercicio). Te da los pasos para razonarlo, pero el último lo das tú.
3. Marca tu respuesta y pulsa **Comprovar** en Electude:
   - Si sale **«Incorrecte»**, aparece **🤔 He fallado: ¿qué se me escapa?**. Te explica qué confusión suele llevar a fallar y qué repasar, sin decirte cuál es la buena.
   - Si sale **«Correcte»**, aparece **📘 Explícame por qué es correcta**. Te explica el porqué citando la lección, te da la idea clave para recordar y una pregunta parecida para practicar.
- La extensión no marca, no pulsa y no pasa ejercicios por ti. Si la IA se le escapa la respuesta en una pista, el panel quita esa frase.
- Para los ejercicios con dibujos, el tutor tiene que **ver la pantalla**. La primera vez el panel te ofrece **«Permitir que vea la pantalla de Electude»**: acéptalo una vez y ya funciona siempre.
- Necesita una clave de IA en **Ajustes → Asistentes IA** (la de Gemini es gratis). Con la app abierta y la extensión instalada, la clave se pasa sola a la extensión y solo se guarda en tu navegador.

**📸 Preguntar a la IA:** abre el enunciado en Electude y pulsa este botón. La captura se envía al asistente, que te dice cuál es la opción correcta y por qué. Las respuestas las marcas tú en Electude.
- **En el ordenador, desde la app:** el navegador te pide elegir la pestaña o ventana de Electude.
- **En el móvil:** haz una captura de pantalla del enunciado y elígela cuando la app te lo pida.

## 5. Pasar tus tareas al móvil (QR)

El móvil recibe las tareas desde el ordenador. No hay que configurar nada en el teléfono.

1. En el **ordenador**, después de sincronizar con el marcador, pulsa **📱 Al móvil** (arriba, junto a «Actualizar»), o el botón **📱 Pasar al móvil** del mensaje verde.
2. En el **móvil**: 📷 abre la **cámara**, 🎯 apunta al QR y 👆 toca el enlace. Se abre Mi Estudio con todas tus tareas.

- **Android:** listo, también si tienes la app instalada.
- **iPhone con la app instalada** (icono en la pantalla): la cámara abre Safari y la app guarda sus datos aparte. En Safari toca **📋 Copiar para la app**, abre la app desde su icono y toca **📋 Cargar las tareas copiadas**.
- **Sin cámara a mano:** en la ventana del QR pulsa **💬 Enviar por WhatsApp** (te lo mandas a ti mismo) y abre el enlace en el móvil.

Repítelo cada vez que sincronices en el ordenador. Si tienes muchas tareas, el QR lleva solo las pendientes y las sin presentar; las entregadas con nota pasan por WhatsApp.

**Pasar la app a un compañero:** en **Ajustes → Compartir con compañeros**, pulsa **📱 Mostrar QR** y que lo escanee. Le llega la app vacía, sin tus datos.

## 6. Asistente IA y Lens

- **✳ Claude** (abajo a la derecha) o **✳ Ayuda** dentro de una tarea: abre un chat. Desde una tarea, la IA ya sabe cuál es. Con «Pegar en mi borrador» guardas la respuesta en tus notas de esa tarea.
- **🔍 Lens**: arrastra sobre una zona de la pantalla y elige **Claude** o **Gemini**. Con **📷 Foto** envías una foto de tu libreta o tu libro.

Escribe tu pregunta y pulsa **➤**. Tu mensaje se queda en el chat:

- **Con una clave de API**, la respuesta llega dentro de la app. La de **Gemini es gratis**: dentro del chat pulsa **🔑 Chatear aquí**, abre https://aistudio.google.com/apikey con tu Gmail personal, pulsa *Create API key*, pégala y pulsa **Guardar y enviar**. La de Claude se crea en https://console.anthropic.com/settings/keys y se paga por uso, aparte de Claude Pro. Ambas se pueden poner también en **Ajustes → Asistentes IA**. Por defecto Gemini usa el modelo **rápido** (`gemini-3.5-flash-lite`, responde en 1 o 2 segundos). Los modelos «más potentes» pueden tardar más de un minuto con la clave gratuita. Si el elegido tarda más de 15 s o está saturado, la app pasa sola al rápido.
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
