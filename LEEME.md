# Mi Estudio: Moodle + Classroom + Electude en una sola app

**Web:** https://kamaleon69.github.io/mi-estudio/

Reúne en una lista las tareas pendientes de **Moodle** (Jesuïtes Educació), **Google Classroom** y **Electude**, ordenadas por fecha. Incluye un asistente con **Claude, Gemini u OpenAI / ChatGPT** y una herramienta tipo **Lens** para preguntar sobre cualquier parte de la pantalla.

Funciona en **Android, iPhone/iPad, Windows y Mac**. Los datos de la app se guardan en tu dispositivo. Si activas los avisos push, se envían al servicio de avisos los títulos y fechas de las tareas pendientes y la suscripción del navegador. Las consultas de IA se envían al proveedor que selecciones.

Consulta la [guía de activación y primera prueba](ayuda/activar-extension.html) para instalar, conceder permisos y probar la sincronización, Lens, Electude y los documentos.

## Preparación inicial e informes de error · 1.15.0

La extensión abre **Preparación y estado de Mi Estudio** al instalarse si faltan permisos. Pulsa **Conceder permisos iniciales** y luego **Comenzar**. La solicitud necesita un clic por las reglas del navegador. Se prepara el acceso a sitios para lectura/capturas y conexión local, y la escritura en el portapapeles para copiar informes; no se lee el portapapeles. Antes de capturar, consultar la IA, verificar selecciones, sincronizar o autocompletar se comprueba el acceso. Retirar permisos pausa esas acciones. Puedes volver a esta pantalla desde Opciones de la extensión o el botón de preparación de la web.

Mientras pruebas Electude, pulsa **La respuesta es errónea / Informar de un fallo** si ves una respuesta incorrecta, un error de lectura, un clic equivocado o un fallo de API. El botón pausa ese ejercicio, prepara los datos del análisis y abre una página para revisar el informe. Añade qué ocurrió y la respuesta correcta si la sabes. La captura usada por la IA es opcional y se puede revisar antes de incluirla.

Pulsa **Descargar informe** y adjunta el JSON en este chat para que pueda analizar lo ocurrido. También puedes copiar el texto, sin imagen, o compartir el archivo desde el sistema si el navegador lo admite. No se envía nada automáticamente ni se consume otra consulta de IA por generar el informe. Las claves guardadas se excluyen y se ocultan correos, credenciales y parámetros privados de las direcciones. El borrador deja de abrirse pasadas 24 horas y se sustituye si creas otro.

## Lectura y autocompletado de Electude · 1.14.0

Abre **Lectura del ejercicio → Leer de nuevo** para comprobar el enunciado y el número de controles sin gastar API. El lector incluye los campos fuera de pantalla y evita los iframes ocultos. Si el texto no corresponde a la pregunta, vuelve a leerla antes de pulsar Analizar. Ese botón solicita una respuesta nueva; no hace falta mantener Mayús para repetir una consulta.

Con **Autocompletar ON**, el modo Preciso o Rápido elegido se aplica después del intervalo guardado. Se espera la actualización de los controles antes de confirmar el clic. En los controles que no exponen su estado se intenta una lectura visual local; si no puede verificarse se muestra el motivo. Se conservan las cancelaciones por edición real y por cambio de pregunta. Tab, Escape o un clic fuera de las respuestas no detienen la cuenta. Las sugerencias de fiabilidad media o baja se dejan para revisión. Sigue comprobando tú la respuesta en Electude; en los dibujos se hace clic manualmente.

La extensión tiene una página **Estado de Mi Estudio** accesible desde sus **Opciones** en el administrador de extensiones. Permite revisar el permiso de acceso a Electude y si hay una clave configurada. Muestra si está instalada temporalmente y permite solicitar el acceso a sitios que falta.

Para **Zen**, usa la [guía de instalación](ayuda/instalar-zen.html) desde la web o el paquete. La vía inmediata es cargar `mi-estudio-extension-firefox.zip` con **Cargar complemento temporal** en `about:debugging#/runtime/this-firefox`; no selecciones `mi-estudio.zip`. Para que se mantenga después de reiniciar, el propietario firma cada versión en Mozilla y comparte el XPI firmado. El ZIP de esta entrega está preparado para esa firma, pero no está firmado. Requiere una base Firefox 140 o posterior en escritorio, y 142 en Android; actualiza Zen si informa de incompatibilidad.

Al autocompletar una tarea de la web, **Deshacer autocompletado** restaura el texto previo si no has hecho ediciones posteriores. El borrador se guarda también al deshacer.

## Avisos al móvil y Autocompletar · 1.13.0

En el detalle de una tarea pendiente, pulsa **Autocompletar**, elige **Castellano** o **Català** y revisa el texto añadido a tu borrador. El idioma queda recordado. La generación usa el proveedor y la clave de API guardados en Ajustes → Asistentes IA. Si la tarea se importó por QR y no incluye enunciado, pégalo o adjunta una captura; el título por sí solo no activa una consulta. La respuesta amplía el borrador y no entrega la tarea. Cancelar, editar el borrador, cambiar el idioma o cerrar la tarea impide aplicar respuestas antiguas. Funciona también en el ordenador y en el editor de texto en línea de Moodle.

En **Ajustes → Avisos de tareas** puedes recibir una notificación en ese móvil cuando queden **ocho horas** para la entrega. Antes hay que publicar una vez el servicio incluido y conectar su dirección: [guía de configuración](notificaciones/README.md). La guía también se abre desde la «i» dentro de la web. **GitHub Pages por sí solo no envía avisos con la app cerrada; el servicio no está desplegado en esta entrega.**

Después de configurarlo, abre Mi Estudio en cada móvil, actualiza/importa tus tareas, pulsa **Activar en este dispositivo** y permite las notificaciones. En iPhone/iPad añade la web a la pantalla de inicio y ábrela desde el icono. Usa **Enviar aviso de prueba** para comprobar la recepción. Actualizar las tareas cambia o cancela las alarmas; no se avisa de tareas entregadas, calificadas, hechas, eliminadas, vencidas o sin fecha. Si ya quedan menos de ocho horas al activar, el aviso se programa para el siguiente envío. El servicio usa las últimas fechas y estados sincronizados: después de entregar en Moodle o Classroom, actualiza la lista o marca la tarea como entregada aquí.

Las alarmas se mantienen en el servicio para funcionar con la app cerrada. La conexión y los ajustes del móvil pueden retrasar la entrega. Puedes desactivar este canal desde Ajustes. No se envían al servicio de avisos borradores ni claves de IA.

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

**Zen / Firefox:** consulta la [guía con las dos vías de instalación](ayuda/instalar-zen.html). Para una instalación permanente se necesita una firma de Mozilla:

1. Descarga `mi-estudio-extension-firefox.zip` desde Ajustes, abriendo la app en Zen. No lo descomprimas.
2. Entra en https://addons.mozilla.org/developers/addon/submit/distribution, elige **On your own** (no se publica) y sube el zip. Cuando termine la validación/firma podrás descargar el **.xpi firmado**; puede requerir revisión.
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

**💡 Ayuda dentro de Electude (extensión v2.1.0):** con la extensión instalada, en cualquier página de Electude aparece un botón **💡** abajo a la derecha.
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
- **Autocompletar: ON / OFF (nuevo):** viene apagado. Al activarlo, analiza cada ejercicio y rellena los controles compatibles: opciones únicas, varias casillas, verdadero/falso, números, texto y desplegables. En **Mínimo** y **Máximo** eliges el intervalo de espera, **7–15 segundos por defecto**. Admite de 0 a 3600 segundos, decimales y un tiempo fijo poniendo el mismo valor en ambos campos. El tiempo se elige de nuevo para cada ejercicio y empieza cuando llega la respuesta **final** de la IA; el tiempo de análisis se suma a esa espera. Autocompletar funciona en **Preciso y Rápido**. Al activarlo conserva el modo elegido; puedes cambiarlo con ON. Cambiar de modo cancela el resultado pendiente y vuelve a analizar. Al acabar la espera, hace clic en la opción de Electude. Si falla un modo, no se sustituye silenciosamente por el otro. Los ajustes se recuerdan en el navegador.
- **Cancelar esta respuesta:** detiene la cuenta atrás del ejercicio actual. También se cancela al apagar ON/OFF, cambiar de pregunta, ocultar la pestaña o intervenir manualmente. Si regresas a la pestaña sin cambiar de ejercicio, puede empezar una nueva cuenta completa. Una intervención manual impide que la IA sobrescriba esa respuesta hasta que vuelvas a pulsar Analizar.
- **Pasar solo (interruptor del panel):** tú pulsas **Comprovar** después de revisar la respuesta. Si sale «Correcte», a los 0,50 segundos pasa a la siguiente pregunta (puedes **Cancelar** en el aviso de abajo). Si sale «Incorrecte», no pasa. Autocompletar no pulsa **Comprovar**.
- **Dibujos y otras actividades:** se detectan puntos reales dentro de las figuras. La IA recibe sus referencias H y debe escogerlas en el orden solicitado. Sobre el dibujo aparecen únicamente números pequeños, sin nombres; los nombres permanecen en el panel. Las marcas se anclan a la figura o al control real y siguen el desplazamiento y el tamaño. Se omiten referencias desconocidas, repetidas, ambiguas o con fiabilidad baja. Esto valida la posición del marcador, no garantiza que la IA haya identificado correctamente cada pieza. Las marcas se mantienen como ayuda manual. El autocompletado no hace clic en el dibujo ni arrastra piezas. Si los controles están en un iframe de otro origen o en un lienzo sin controles accesibles, hay que responder manualmente.
- **Automático al navegar:** detecta cambios en el recuadro activo y en el indicador de pregunta, observa cambios de estilo y comprueba periódicamente el estado. Las animaciones de la teoría no reinician sin fin el temporizador. Cambiar de ejercicio cancela la petición anterior cuando sea posible y descarta su resultado.
- **Ahorrar cuota:** si ya hay una respuesta marcada, todos los campos están rellenados, todas las filas de verdadero/falso están respondidas o aparece «Correcte/Incorrecte», no se vuelve a analizar ni se hace otra petición. Se aplica tanto a respuestas tuyas como a las del autocompletado. Una petición que ya estaba en curso cuando respondiste puede haber consumido cuota; se descarta su resultado.
- **Preguntas con números en la imagen:** necesitan una captura y utilizan el modo elegido. Los números del dibujo son etiquetas; el valor se propone para el campo numérico, sin resaltar la etiqueta como opción de test.
- **Cuota de Gemini:** si se agota un límite diario o temporal, la extensión pausa ese modelo y muestra el próximo reintento cuando Google lo informa. Puedes elegir la clave alternativa manualmente. Dos claves del mismo proyecto comparten cuota.
- **Respuestas incompletas:** si faltan afirmaciones, campos o grupos de opciones, hay IDs desconocidos, o la IA declara poca fiabilidad, no se rellena la actividad. El panel explica el motivo. Esto valida la estructura; no garantiza que el contenido técnico de la respuesta sea correcto.
- **⚡ IA de tu ordenador:** el panel tiene **Configurar / descargar IA local**. Puedes usar **Ollama** o **Gemini Nano de Chrome**. Primero descarga/prepara, después prueba una respuesta y finalmente pulsa **Usar en Electude · Rápido**. Así seleccionas de forma explícita el motor local y el modo Rápido. Funciona también con Autocompletar ON. Preciso sigue usando tu API. Si falla el motor local, se muestra el motivo y no se consulta la nube automáticamente. Los dibujos necesitan un modelo local con visión, y continúan siendo de clic manual.

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


## Nuevos ajustes de IA en 1.12.0

En **Ajustes → Asistentes IA** tienes:

- **Gemini principal** y **Gemini alternativa**, con el selector **Clave de Gemini activa**. Puedes poner una clave de otra cuenta/proyecto tuyo. El cambio es manual; pulsa **Guardar** después de seleccionar la que quieres usar. Las cuotas son del proyecto, no del correo ni de la clave individual.
- **OpenAI / ChatGPT**: pega una clave de OpenAI Platform, elige el modelo (por defecto `gpt-5.5`) y selecciona OpenAI en **Proveedor para el asistente y Electude**. Funciona en el chat, Lens y la ayuda de Electude con texto e imágenes.
- **Claude** mantiene sus ajustes.

Abre Mi Estudio y guarda los cambios para sincronizarlos con la extensión. Las claves nuevas tampoco se incluyen en los enlaces para compañeros ni para transferir tareas.

Después de actualizar, recarga la extensión y Electude. El encabezado del panel debe mostrar **v2.1.0**. Si no aparece ese número, todavía está abierto un panel de la versión anterior.


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


Desde 1.12.0, Autocompletar permite también Rápido. Mantiene el intervalo editable (7–15 s por defecto), las cancelaciones y la omisión de respuestas completadas. Los dibujos siguen siendo de clic manual.


## Cierto/falso: más contexto y comprobaciones

El enunciado común se envía junto con cada afirmación, conservando su idioma, sus negaciones y los comparativos. Una frase como «Más eficiente» se interpreta respecto al sujeto de la pregunta. No se exige una mezcla de V/F: todas pueden ser verdaderas o todas falsas.

Se incluye teoría del mismo contexto de lección, también texto desplazado fuera de la pantalla verticalmente. Los bloques ocultos y las diapositivas fuera del área horizontal se excluyen. La selección del contexto da prioridad a párrafos relevantes completos; el texto no se corta simplemente por el principio. Se recuerda contexto durante esta sesión dentro de la misma página y encabezado de lección, sin mezclar respuestas del recuadro.

Por cada fila se pide una justificación breve, una cita literal de la teoría recibida y confianza. **Autocompletar exige que la cita exista en el texto enviado y que la confianza sea alta en todas las filas.** Si falta apoyo, hay referencias inventadas o confianza insuficiente, conserva la sugerencia para revisión manual y explica el motivo. La ausencia de información no debe convertirse en Falso.

Se han reforzado los controles de las parejas F/V y su correspondencia con cada fila. Después de pulsar se comprueba la selección mediante el estado del control o, si es un control dibujado sin estado accesible, mediante una captura local de los círculos. Esta captura no se envía a una segunda IA. Si no se puede confirmar el resultado, no se anuncia como rellenado correctamente.

Los resúmenes «Has avaluat correctament 1 de les 3 afirmacions» cuentan como intento corregido: no se vuelve a analizar. Solo se pasa a la siguiente automáticamente cuando todas son correctas.

Estas comprobaciones validan el contexto, las citas y los botones; **no prueban que una deducción técnica del modelo sea correcta**. No se garantiza un porcentaje de acierto.

## Descargar y usar IA local

### Ollama

1. Abre **Configurar / descargar IA local** y selecciona Ollama.
2. [Descarga Ollama](https://ollama.com/download), instálalo y deja el programa abierto en el ordenador.
3. Pulsa **Conectar y comprobar** y acepta el permiso de la extensión para conectar con `127.0.0.1`. Se comprueba el servidor local del puerto 11434.
4. Selecciona el modelo. El inicial es **gemma3:4b**, que admite texto e imágenes; la descarga ocupa varios GB. Si no está instalado, pulsa **Preparar / descargar**. El porcentaje corresponde a la capa que se está descargando.
5. Pulsa **Probar el modelo**. Debe aparecer una respuesta real y el tiempo que ha tardado. Si falla, se muestra el error y no se habilita el uso.
6. Pulsa **Usar en Electude · Rápido**. Vuelve a Electude: la respuesta indicará «Ollama · modelo» y «en tu ordenador». Puedes cerrar la página de configuración, pero deja Ollama abierto.

Si no conecta, comprueba que Ollama esté ejecutándose. Si devuelve 403, copia el origen de la extensión que muestra la pantalla y configura `OLLAMA_ORIGINS`; reinicia Ollama. La ayuda enlaza las instrucciones oficiales para cada sistema operativo. No es necesario exponer Ollama a otros equipos ni cambiar su dirección de escucha. Puedes activar `OLLAMA_NO_CLOUD=1` para deshabilitar las funciones en la nube de Ollama. Esta integración usa el servidor de loopback y rechaza nombres de modelos cloud o modelos que el servidor identifica como remotos.

El consumo de RAM/VRAM y la velocidad dependen del modelo, del tamaño del contexto y del equipo. Un modelo instalado no se considera probado hasta que responde. Los errores de memoria, conexión, permisos y respuestas incompletas se muestran en la pantalla.

### Gemini Nano

Selecciona Gemini Nano, pulsa **Preparar**, espera a que Chrome cree una sesión, ejecuta **Probar** y pulsa **Usar en Electude · Rápido**. Mantén esa pestaña abierta. Chrome necesita cumplir sus [requisitos](https://developer.chrome.com/docs/ai/get-started); no está disponible en todos los equipos ni en Firefox. Esta integración de Nano es de texto. Si Chrome no lo ofrece, utiliza Ollama o tu API.

## Guía visual de instalación

En **Ajustes → i Cómo instalarla · guía con imágenes** hay cinco ilustraciones ampliables: extraer el ZIP, activar el modo desarrollador, cargar la carpeta con `manifest.json`, probar temporalmente en Firefox/Zen y usar el XPI firmado para una instalación permanente. Las imágenes son orientativas y se incluyen en la web para abrirlas sin depender de enlaces externos.
