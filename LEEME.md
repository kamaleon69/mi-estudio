# Mi Estudio: Moodle + Classroom + Electude en una sola app

**Web:** https://kamaleon69.github.io/mi-estudio/

Reúne en una lista las tareas pendientes de **Moodle** (Jesuïtes Educació), **Google Classroom** y **Electude**, ordenadas por fecha. Incluye un asistente con **Claude, Gemini u OpenAI / ChatGPT** y una herramienta tipo **Lens** para preguntar sobre cualquier parte de la pantalla.

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

Con la extensión, pulsa **↻ Actualizar**: verás cuánto hace de la última sincronización de cada plataforma y un único botón, **⚡ Sincronizar**. Al pulsarlo se abre una ventanita con Moodle y Classroom unos segundos, se leen tus tareas con tu sesión y se muestran en la app. Si la sesión ha caducado, inicias sesión en esa ventanita y continúa sola.

La extensión tiene permisos para Moodle, Classroom, Mi Estudio, los subdominios de `electude.eu` y las APIs de Gemini, Claude y OpenAI. Puede solicitar de forma opcional acceso a todos los sitios para la captura de pantalla. No guarda ni envía contraseñas. El enunciado y, si la captura está autorizada, la imagen se envían al proveedor de IA que hayas configurado.

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

**💡 Ayuda dentro de Electude (extensión v1.11.0):** con la extensión instalada, en cualquier página de Electude aparece un botón **💡** abajo a la derecha.
1. Ábrelo: sale un panel lateral **Ayuda IA**.
2. Pulsa **🔍 Analizar la pregunta**. La IA lee el enunciado y te muestra la **opción sugerida** con la explicación. Además, la opción se **marca en verde** en la página.
3. Léete la explicación y marca tú la respuesta, o activa **Autocompletar: ON**. La IA puede equivocarse; revisa lo rellenado antes de comprobarlo.
- Sabe responder:
  - **Tipo test:** resalta en verde la opción correcta.
  - **Verdadero/falso (✗ / ✓):** marca cada afirmación con su botón, verde ✓ o rojo ✗.
  - **Hacer clic o localizar piezas en el dibujo:** pone un círculo verde con el nombre de la pieza donde hay que hacer clic. Si pide localizar una lista de componentes, los numera todos a la vez en el orden de la lista (1, 2, 3…): haz clic en el 1, luego en el 2… Los círculos no bloquean el clic.
- Para las preguntas del dibujo, la IA tiene que **ver la pantalla**. La primera vez el panel te ofrece **«Permitir que vea la pantalla de Electude»**: acéptalo una vez y ya funciona siempre. Si prefieres no darlo, pulsa el icono de la extensión en la pestaña de Electude cada vez que la abras.
- **🎯 Preciso / ⚡ Rápido:** en «Preciso» se hace una única consulta al modelo preciso, sin gastar otra petición en una respuesta rápida provisional. En «Rápido» solo se usa el modelo ligero: responde enseguida pero falla más en verdadero/falso y en el dibujo. Las preguntas ya analizadas salen al instante (Mayús + clic en Analizar para repetir).
- **Automático (interruptor del panel):** si lo activas, el 💡 se abre y analiza solo cada vez que cambias de ejercicio, sin pulsar nada. El botón 💡 muestra una «A» verde mientras está activado. Se recuerda aunque cierres Electude; para apagarlo, vuelve a pulsar el interruptor.
- **Autocompletar: ON / OFF (nuevo):** viene apagado. Al activarlo, analiza cada ejercicio y rellena los controles compatibles: opciones únicas, varias casillas, verdadero/falso, números, texto y desplegables. En **Mínimo** y **Máximo** eliges el intervalo de espera, **7–15 segundos por defecto**. Admite de 0 a 3600 segundos, decimales y un tiempo fijo poniendo el mismo valor en ambos campos. El tiempo se elige de nuevo para cada ejercicio y empieza cuando llega la respuesta **final** de la IA; el tiempo de análisis se suma a esa espera. Autocompletar usa siempre **Preciso**: al activarlo se selecciona ese modo y se deshabilita Rápido. Al acabar la espera, hace clic en la opción de Electude. Si la respuesta precisa falla, no se rellena con una rápida. Los ajustes se recuerdan en el navegador.
- **Cancelar esta respuesta:** detiene la cuenta atrás del ejercicio actual. También se cancela al apagar ON/OFF, cambiar de pregunta, ocultar la pestaña o intervenir manualmente. Si regresas a la pestaña sin cambiar de ejercicio, puede empezar una nueva cuenta completa. Una intervención manual impide que la IA sobrescriba esa respuesta hasta que vuelvas a pulsar Analizar.
- **Pasar solo (interruptor del panel):** tú pulsas **Comprovar** después de revisar la respuesta. Si sale «Correcte», a los 0,50 segundos pasa a la siguiente pregunta (puedes **Cancelar** en el aviso de abajo). Si sale «Incorrecte», no pasa. Autocompletar no pulsa **Comprovar**.
- **Dibujos y otras actividades:** se detectan puntos reales dentro de las figuras. La IA recibe sus referencias H y debe escogerlas en el orden solicitado. Sobre el dibujo aparecen únicamente números pequeños, sin nombres; los nombres permanecen en el panel. Las marcas se anclan a la figura o al control real y siguen el desplazamiento y el tamaño. Se omiten referencias desconocidas, repetidas, ambiguas o con fiabilidad baja. Esto valida la posición del marcador, no garantiza que la IA haya identificado correctamente cada pieza. Las marcas se mantienen como ayuda manual. El autocompletado no hace clic en el dibujo ni arrastra piezas. Si los controles están en un iframe de otro origen o en un lienzo sin controles accesibles, hay que responder manualmente.
- **Automático al navegar:** detecta cambios en el recuadro activo y en el indicador de pregunta, observa cambios de estilo y comprueba periódicamente el estado. Las animaciones de la teoría no reinician sin fin el temporizador. Cambiar de ejercicio cancela la petición anterior cuando sea posible y descarta su resultado.
- **Ahorrar cuota:** si ya hay una respuesta marcada, todos los campos están rellenados, todas las filas de verdadero/falso están respondidas o aparece «Correcte/Incorrecte», no se vuelve a analizar ni se hace otra petición. Se aplica tanto a respuestas tuyas como a las del autocompletado. Una petición que ya estaba en curso cuando respondiste puede haber consumido cuota; se descarta su resultado.
- **Preguntas con números en la imagen:** necesitan una captura y utilizan Preciso. Los números del dibujo son etiquetas; el valor se propone para el campo numérico, sin resaltar la etiqueta como opción de test.
- **Cuota de Gemini:** si se agota un límite diario o temporal, la extensión pausa ese modelo y muestra el próximo reintento cuando Google lo informa. Puedes elegir la clave alternativa manualmente. Dos claves del mismo proyecto comparten cuota.
- **Respuestas incompletas:** si faltan afirmaciones, campos o grupos de opciones, hay IDs desconocidos, o la IA declara poca fiabilidad, no se rellena la actividad. El panel explica el motivo. Esto valida la estructura; no garantiza que el contenido técnico de la respuesta sea correcto.
- **⚡ IA de tu ordenador (opcional, Chrome de escritorio):** pulsa **Preparar / probar IA local** en el panel. Se abre una página propia de la extensión: pulsa **Preparar / descargar**, espera a que aparezca **IA local lista** y pulsa **Probar el modelo** para comprobar una respuesta real en tu ordenador. La descarga muestra su progreso; el 100 % todavía puede necesitar preparación. Mantén esa pestaña abierta. Se utiliza en modo **Rápido**, solo para preguntas sencillas de texto. Preciso, dibujos, verdadero/falso, campos y Autocompletar usan la API. Si la sesión local no está lista o falla, el panel avisa y utiliza la API seleccionada. Firefox no ofrece esta API. Consulta los [requisitos de Chrome](https://developer.chrome.com/docs/ai/get-started) y el botón de diagnóstico de la página local; no se anuncia como activada una descarga que aún no ha terminado.

- Necesita una clave de IA en **Ajustes → Asistentes IA**. Puedes elegir Gemini, Groq, OpenRouter Free, Claude u OpenAI / ChatGPT. En el propio panel de Electude puedes cambiar el proveedor y la clave Gemini activa sin volver a Ajustes. Las opciones sin token aparecen deshabilitadas. Gemini permite guardar una clave principal y otra alternativa y seleccionar cuál se usa. Con la app abierta y la extensión instalada, la clave se pasa sola a la extensión y solo se guarda en tu navegador.

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


## Nuevos ajustes de IA en 1.11.0

En **Ajustes → Asistentes IA** tienes:

- **Gemini principal** y **Gemini alternativa**, con el selector **Clave de Gemini activa**. Puedes poner una clave de otra cuenta/proyecto tuyo. El cambio es manual; pulsa **Guardar** después de seleccionar la que quieres usar. Las cuotas son del proyecto, no del correo ni de la clave individual.
- **OpenAI / ChatGPT**: pega una clave de OpenAI Platform, elige el modelo (por defecto `gpt-5.5`) y selecciona OpenAI en **Proveedor para el asistente y Electude**. Funciona en el chat, Lens y la ayuda de Electude con texto e imágenes.
- **Claude** mantiene sus ajustes.

Abre Mi Estudio y guarda los cambios para sincronizarlos con la extensión. Las claves nuevas tampoco se incluyen en los enlaces para compañeros ni para transferir tareas.

Después de actualizar, recarga la extensión y Electude. El encabezado del panel debe mostrar **v1.11.0**. Si no aparece ese número, todavía está abierto un panel de la versión anterior.


## APIs con acceso gratuito

Se mantienen Gemini, Claude y OpenAI. Se añaden **Groq** y **OpenRouter Free**; no se añade Grok. Cada servicio requiere su propio token y aplica límites de disponibilidad y de solicitudes.

| Servicio | Configuración inicial | Crear token / límites |
| --- | --- | --- |
| Gemini | Clave principal o alternativa elegida manualmente | [AI Studio](https://aistudio.google.com/apikey) · [límites](https://ai.google.dev/gemini-api/docs/rate-limits) |
| Groq, plan Free | `qwen/qwen3.8-27b`, texto e imágenes; GPT OSS opcional solo para texto | [Crear token](https://console.groq.com/keys) · [cuotas](https://console.groq.com/docs/rate-limits) |
| OpenRouter Free | `openrouter/free`, elige un modelo gratuito compatible con texto o imágenes | [Crear token](https://openrouter.ai/settings/keys) · [modelos gratuitos](https://openrouter.ai/collections/free-models/) |

En Groq mantén el plan **Free** si quieres utilizar su cuota gratuita. Activar Developer implica tarifas de pago. En OpenRouter esta integración solo permite `openrouter/free` o IDs terminados en `:free`; no cambia a modelos de pago. Si escoges un modelo concreto, comprueba que admita imágenes para usar dibujos. Los límites de estos servicios pueden cambiar: los enlaces muestran las condiciones vigentes. No hay cambio automático a otro proveedor de pago.

## Uso en móvil

La navegación se adapta a pantallas pequeñas, los controles permiten pulsación táctil y el chat tiene un selector de API para móvil. La altura del chat se ajusta al teclado cuando el navegador informa de su tamaño.

En la pestaña Electude aparece **solo en móvil**: «El ayudante integrado de Electude no funciona en móvil». El panel lateral de la extensión, el automático, las marcas sobre Electude y Autocompletar requieren ordenador. Puedes seguir abriendo Electude y consultando capturas mediante el chat de la web. La subida de una captura no selecciona respuestas dentro de Electude.
