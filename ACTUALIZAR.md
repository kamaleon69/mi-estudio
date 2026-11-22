# Actualizar Mi Estudio y la extensión

Web **2026.11.22.1** · Extensión **2.1.0**

Si ya configuraste los avisos al móvil, conserva la URL `serviceUrl` de tu archivo `notifications-config.json` al sustituir los archivos.

## Novedades de la versión 2.1.0

- **Sincronización.** Moodle y Classroom se leen a la vez en pestañas de fondo. Si se necesita iniciar sesión, «Actualizar» muestra un botón para abrir la plataforma. Puedes cancelar la lectura. Si falla una plataforma, se conserva su lista anterior y se pueden importar los resultados de la otra. Las lecturas parciales conservan entradas anteriores.
- **Lens en otras webs.** Pulsa el icono de Mi Estudio en una página web o usa el menú contextual. Selecciona una zona con la lupa y revisa el recorte antes de preguntar. Se envía la pregunta y el recorte al proveedor configurado. El navegador restringe la inyección en páginas internas y en algunos visores.
- **Tareas con documentos.** Autocompletar admite PDF, DOCX, TXT, MD, CSV e imágenes. Los PDF se envían a un modelo compatible de Gemini, Claude u OpenAI. Word se lee localmente y se envía el texto extraído. Usa PDF si el diseño o los diagramas son importantes. Máximo de 8 MB por documento y 24.000 caracteres de texto extraído. La respuesta se añade al borrador editable, conservando lo que ya habías escrito y el idioma escogido.
- **Electude.** Se mantiene el panel anterior con selección de API, informes, Preciso y Rápido. El análisis automático deja cerrado el panel y evita la captura en ejercicios de texto. Autocompletar comprueba otra vez el contexto y respeta los campos y selecciones que ya tengan respuesta. Se mantiene el intervalo editable.
- **Activación.** En Ajustes tienes una [guía de instalación, permisos y primera prueba](ayuda/activar-extension.html). El menú contextual de Lens forma parte de la actualización. Tras actualizar la extensión, recarga Mi Estudio y las páginas donde estés probando.

Se ejecutaron 238 pruebas con proveedores y controles simulados. Se verificaron el empaquetado y las referencias locales. La prueba en navegador queda pendiente porque el entorno no permitió iniciar Chromium.


## Cambios de esta entrega · 1.15.0

### Permisos al principio

Al instalar o actualizar esta versión, si faltan permisos se abre **Preparación y estado de Mi Estudio**. Pulsa **Conceder permisos iniciales**, acepta el aviso del navegador y después **Comenzar / volver a la tarea**. El navegador exige ese clic del usuario; la extensión no puede aceptar el aviso por él.

El permiso de sitios incluye las capturas automáticas de Electude y la conexión a Ollama; el de escritura en el portapapeles sirve para los botones de copiar. No se solicita lectura del portapapeles. La petición se hace desde esta pantalla inicial. Las opciones antiguas para permitir captura llevan también a ella.

Antes de consultar a la IA, capturar, verificar una selección, sincronizar o abrir la configuración local se comprueba que los permisos estén concedidos. Autocompletar los vuelve a comprobar antes del clic. Si se retiran, se cancelan la consulta y el rellenado pendientes, y se detiene el avance automático. El estado de la web muestra **Preparar permisos y comenzar** en lugar de iniciar la sincronización sin acceso.

### Compartir fallos durante las pruebas

En el panel de Electude hay un botón **La respuesta es errónea / Informar de un fallo**.

1. Púlsalo al detectar el problema. Se pausa la respuesta y el avance de ese ejercicio antes de abrir el informe.
2. Elige el tipo de fallo y explica qué pasó. Si conoces la respuesta correcta, escríbela en **Respuesta correcta o comportamiento esperado**.
3. Si hace falta el dibujo, marca **Incluir la captura que usó la IA** y revisa la imagen. Esa captura puede ser anterior a la corrección de Electude. Si quieres mostrar la corrección posterior, puedes adjuntar una captura aparte en el chat.
4. Pulsa **Descargar informe** y adjunta el archivo JSON en este chat. También puedes copiar el texto o usar Compartir archivo si el navegador lo permite. La copia de texto no incluye la imagen.

El informe conserva el enunciado, controles y selecciones, contexto enviado, respuesta original del modelo aunque se haya rechazado, modelo/proveedor/modo, estado del autocompletado, tiempos, mensajes y último error. Las claves de API guardadas, cabeceras de autenticación, correos y parámetros de direcciones se eliminan antes de guardarlo. No incluye una captura en el archivo sin marcar la opción.

**No se envía automáticamente al desarrollador ni a ChatGPT.** El informe se prepara en tu navegador y lo compartes tú adjuntando el archivo o pegando el texto aquí. El borrador puede abrirse durante 24 horas y se sustituye al crear otro. Generarlo no realiza otra consulta de IA.

Para seguir probando después, vuelve a Electude y pulsa **Analizar**. Una respuesta ya completada se sigue omitiendo para ahorrar cuota.

### Validación de esta versión

**232 pruebas automáticas aprobadas**, 35 más que en la entrega anterior: bloqueo antes de permisos, instalación inicial, doble apertura, retirada de permisos, escritura en el portapapeles, exportación, eliminación de claves, captura opcional y pausa del ejercicio. Sintaxis de 58 scripts, HTML, referencias y copias Chrome/Firefox comprobadas. Las pruebas utilizan controles y proveedores simulados; falta comprobar la instalación real y el informe en tu sesión de Electude.

Los ZIP de las dos extensiones están actualizados. Para una instalación permanente en Zen/Firefox debes volver a firmar esta versión en Mozilla; el paquete sigue incluyendo el código sin firmar y la guía de carga temporal.

## Cambios anteriores · 1.14.0

- **Lectura del ejercicio** en el panel de Electude: permite leer de nuevo sin consultar la API y comprobar el texto y cuántas opciones, afirmaciones y campos se han detectado.
- Se leen también los controles que quedan debajo del viewport. Se excluyen iframes ocultos y diapositivas recortadas; el contexto de teoría se selecciona por relevancia y se distingue por dirección del módulo.
- Los clics de controles dibujados llevan las coordenadas de su centro y eventos de puntero cuando están disponibles. Los campos y radios nativos mantienen su activación propia. Los controles fuera de pantalla se desplazan a la vista cuando hace falta.
- Se espera hasta un segundo a que Electude confirme una selección tardía, sin repetir clics a ciegas. Si el control no expone estado, se intenta la comprobación visual local de los círculos. No consume una segunda consulta a la IA. Una selección que no se puede verificar se señala para revisión.
- La identidad de la pregunta conserva sus opciones y campos, sin depender de la instancia del nodo, del valor escrito ni del bloqueo posterior. Un cambio de índice o de contenido sigue cancelando las respuestas anteriores. Tab, Escape, desplazamiento y clics fuera de las respuestas no cancelan el autocompletado.
- Se admiten listas de IDs en una línea, CERT/FALS y TRUE/FALSE, flechas y valores entre comillas. Se descartan estados de API no finalizados y las respuestas de fiabilidad media o baja quedan para revisión manual. La caché anterior no se reutiliza; las consultas manuales de Analizar solicitan una respuesta nueva y las guardadas caducan a los siete días.
- Se conservan ON/OFF, Preciso/Rápido, intervalo editable 7–15 s por defecto, exclusión de intentos completados, cancelaciones, dibujos de clic manual y avance de 0,50 s solo después de Correcte.
- En las tareas de la web, **Deshacer autocompletado** recupera el borrador anterior y respeta las ediciones posteriores. Se mantienen català/castellano y los avisos push de la entrega anterior.
- Nueva página **Estado de Mi Estudio** en Opciones de la extensión: muestra carga temporal, permisos de sitios y API configurada sin enseñar la clave. Se puede solicitar el acceso que falta desde su botón.

### Zen: cómo instalar esta versión

El ZIP de Firefox/Zen incluido **no está firmado**. Puedes usarlo ahora temporalmente: abre `about:debugging#/runtime/this-firefox` → **Cargar complemento temporal…** → selecciona **`mi-estudio-extension-firefox.zip`**, no el ZIP completo de la web. También puedes elegir su `manifest.json` después de extraerlo. Recarga Mi Estudio y Electude. La carga temporal termina al reiniciar Zen.

Para conservarla instalada, el propietario debe enviar cada versión de ese ZIP a Mozilla, distribución **On your own**, descargar el **XPI firmado** e instalarlo desde `about:addons`. No se ha firmado ni publicado el complemento desde esta entrega: requiere la cuenta de Mozilla del propietario. La guía está en **Ajustes → i de instalación → Guía de Zen** y en `ayuda/instalar-zen.html`.

El manifiesto mantiene el ID del complemento, usa los scripts de fondo propios de Firefox y declara el contenido web y las credenciales de API que se envían al proveedor elegido. Requiere una base Firefox **140+ en escritorio** y **142+ en Android** para ese consentimiento. Si Zen dice incompatible, actualízalo. La página `privacidad.html` está incluida para la ficha de firma.

### Comprobaciones

**197 pruebas automáticas aprobadas**, incluidas 26 nuevas sobre lectura, clics, actualizaciones tardías, recreación del DOM, estados finales de API, permisos y deshacer. Se validaron sintaxis, HTML, recursos, manifiestos y coincidencia de los dos paquetes. Las pruebas usan controles y proveedores simulados. No se ha verificado esta versión en tu sesión real de Electude, con tus claves ni con un Zen real; el entorno no permitió la prueba de navegador. No se garantiza un porcentaje de acierto académico.

La página `tests/browser/index.html` añade casos manuales para controles fuera de pantalla y selección con 200 ms de retraso. Abre esa página en un navegador y ejecuta sus pruebas de integración. No necesita una API.

Referencias: [complementos de Zen](https://docs.zen-browser.app/user-manual/extensions), [carga temporal](https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox/), [firma de Mozilla](https://www.extensionworkshop.com/documentation/publish/signing-and-distribution-overview/) y [declaración de datos](https://www.extensionworkshop.com/documentation/develop/firefox-builtin-data-consent/).

## Funciones de 1.13.0 incluidas: avisos al móvil y autocompletar tareas

- Al abrir una tarea pendiente aparece **Autocompletar tarea**, con selector **Castellano / Català**. Se usa la API elegida en Ajustes → Asistentes IA y el texto se añade al borrador conservando lo escrito. Si el enunciado no llegó por QR, pégalo o adjunta una captura. Puedes cancelar; editar el texto, cambiar el idioma o cerrar la tarea descarta las respuestas pendientes. No se entrega automáticamente.
- En **Ajustes → Avisos de tareas** puedes activar notificaciones **ocho horas antes** en cada móvil, enviar una prueba y desactivarlas. Las tareas completadas, eliminadas, vencidas o sin fecha se excluyen. Cambiar la fecha actualiza el aviso; sincronizar una fecha ya avisada no lo repite.
- **Los avisos con la app cerrada requieren publicar una vez el servicio incluido en `notificaciones`. Subir la web a GitHub no basta.** La «i» enlaza una guía paso a paso. Publica el Worker con tu cuenta de Cloudflare, guarda su URL en `notifications-config.json` o en Ajustes y activa el permiso en cada móvil. No hay ningún servicio desplegado por esta entrega.
- En iPhone/iPad, abre la app desde su icono de pantalla de inicio para activar Web Push. Los avisos usan las últimas tareas sincronizadas en ese móvil: actualiza Mi Estudio después de entregar fuera de la app. La conexión y los ajustes del sistema pueden retrasarlos.

Archivos nuevos: `task-autofill.js`, `reminders-core.js`, `reminders-store.js`, `reminders-client.js`, `notifications-config.json`, carpeta `notificaciones` y tres suites de pruebas. `sw.js` actualiza su caché y recibe los avisos. Las extensiones del paquete se mantienen sincronizadas y llevan la versión 1.13.0.

**Validación:** 171 pruebas aprobadas con controles, APIs y alarmas simulados; cifrado Web Push comprobado con el vector del RFC 8291 y un receptor independiente, y firma VAPID verificada. Queda pendiente probar una notificación en un móvil real después de desplegar el servicio. No se han usado tus claves de API ni tu sesión de Electude.

## Subir la web a GitHub

1. Descomprime el ZIP completo.
2. Abre tu repositorio `kamaleon69/mi-estudio`.
3. Sube el contenido de la carpeta en la raíz del repositorio, donde ya está `index.html`, reemplazando los archivos existentes. No metas toda la web dentro de una subcarpeta adicional.
4. Incluye `ai-providers.js`, `device.js`, `index.html`, `version.json`, `mi-estudio-extension.zip` y `mi-estudio-extension-firefox.zip`. Son necesarios para publicar la actualización y ofrecer las descargas nuevas. Incluye también la carpeta `ayuda` con las cinco imágenes de instalación, los iconos, `manifest.json` y `sw.js`.
5. Las carpetas `extension-chrome` y `extension-firefox` contienen el código editable. `tests` contiene las pruebas y `tools` el empaquetador. Puedes subirlas también.
6. Confirma los cambios y espera a que termine GitHub Pages. Recarga Mi Estudio con Ctrl+Mayús+R.

Publicar la web no actualiza por sí solo una extensión instalada manualmente.

## Actualizar Chrome o Edge

1. Descomprime `mi-estudio-extension.zip` en la misma carpeta que ya cargaste como extensión, reemplazando los archivos. También puedes usar directamente `extension-chrome`.
2. Abre `chrome://extensions` o `edge://extensions` y pulsa el botón de recarga de Mi Estudio.
3. Recarga Mi Estudio y Electude. En el encabezado del panel de Electude debe aparecer **v2.1.0**. Si no aparece, ese panel todavía es de una versión anterior.
4. Abre Mi Estudio y guarda los ajustes de IA para sincronizar las claves de Gemini, Groq, OpenRouter Free, Claude u OpenAI con la extensión. El navegador puede pedir permiso para los nuevos dominios `api.groq.com` y `openrouter.ai`.

## Actualizar Firefox o Zen

Para una instalación permanente, vuelve a firmar `mi-estudio-extension-firefox.zip` en Mozilla e instala el XPI firmado. Se conserva el identificador del complemento.

Para una prueba temporal: `about:debugging#/runtime/this-firefox` → Cargar complemento temporal → el `manifest.json` de `extension-firefox`.

## Usar el nuevo autocompletado

1. Dentro de Electude abre el botón 💡.
2. Activa **Autocompletar: ON**. Inicialmente está en **OFF**. Al activarlo se conserva el modo elegido: **Preciso o Rápido**. Puedes cambiarlo con ON.
3. Ajusta **Mínimo** y **Máximo**. Por defecto son **7 y 15 segundos**. Puedes elegir entre 0 y 3600 segundos, usar decimales o fijar ambos al mismo número.
4. La extensión pide la respuesta del **modo elegido**, espera su resultado y después comienza la cuenta atrás. Al terminar, **hace clic en la opción real de Electude**. Si falla el modo elegido, no cambia silenciosamente al otro.
5. Puedes pulsar **Cancelar esta respuesta** o poner el botón en **OFF**.
6. Revisa la respuesta rellenada y pulsa tú **Comprovar**.

El intervalo se aplica a cada ejercicio: sus opciones, afirmaciones o campos se rellenan juntos al terminar la espera. El tiempo que tarde la IA se suma al intervalo elegido.

Los dibujos y arrastres siguen siendo manuales. Los controles dentro de un iframe de otro origen o de un lienzo pueden no estar disponibles para el autocompletado. Si una actividad no se reconoce, el panel explica que debes seguir la sugerencia manual.

## Comprobaciones incluidas

- `node --test tests/*.test.cjs`: pruebas de rangos, formatos, cancelación, respuestas incompletas, capturas y proveedores simulados.
- `tests/browser/index.html`: abre este archivo en el navegador y pulsa **Ejecutar pruebas de integración**. Utiliza respuestas simuladas y no necesita una clave de IA. También permite comprobar ON/OFF y Cancelar manualmente.
- `python3 tools/empaquetar.py`: regenera los ZIP de las dos extensiones y el ZIP completo a partir del código editable.

Se han ejecutado 171 pruebas automáticas, incluidas la reproducción del fallo del temporizador y la aplicación mediante clic de una respuesta precisa con controles simulados. La prueba visual no se pudo ejecutar en el entorno de preparación y no se ha accedido a tu sesión de Electude; comprueba primero un ejercicio conocido.


## Clave alternativa de Gemini y OpenAI

En Mi Estudio → Ajustes → Asistentes IA:

1. Guarda la clave Gemini principal y, si quieres, una alternativa de otra cuenta/proyecto tuyo.
2. En **Clave de Gemini activa**, elige **Principal** o **Alternativa** y pulsa **Guardar**. El cambio no es automático. Dos claves del mismo proyecto comparten los límites de Google.
3. Para OpenAI, pega tu clave en **Clave de API de OpenAI / ChatGPT**. El modelo inicial es `gpt-5.5`; puedes escribir otro ID compatible con texto e imágenes.
4. En **Proveedor para el asistente y Electude**, elige OpenAI / ChatGPT, Gemini o Claude y guarda.

Las preguntas respondidas o corregidas se omiten antes de capturar o consultar la IA. Esto incluye respuestas hechas sin ayuda.

Una consulta que ya había empezado antes de tu respuesta puede haber consumido cuota; su resultado no se aplica. No se promete una tasa de acierto: los fallos de la IA siguen siendo posibles.


## Novedades de esta entrega

- Selección directa de API y de clave Gemini desde el panel de Electude. La selección se conserva al abrir de nuevo la web; Guardar en Ajustes permite volver a cambiarla.
- Groq y OpenRouter Free: pega los tokens en Ajustes y guarda. En OpenRouter solo se admiten modelos gratuitos; en Groq conserva el plan Free.
- Sobre los dibujos solo aparecen números anclados a puntos detectados. Si una ubicación no se puede vincular, no se dibuja una marca aproximada. La identificación técnica sigue dependiendo de la respuesta de la IA.
- Automático observa el cambio de pregunta, también con estilos y animaciones. Las respuestas de preguntas anteriores se descartan y sus solicitudes se cancelan cuando es posible.
- Pasar solo espera **0,50 segundos** desde que detecta «Correcte». Puedes cancelarlo; no avanza si cambia la pregunta o deja de aparecer la confirmación correcta.
- IA local: **Configurar / descargar IA local** → elige motor → **Conectar / Preparar** → **Probar el modelo** → **Usar en Electude · Rápido**. Ollama requiere instalar y mantener abierto su programa; Nano necesita mantener su pestaña abierta. Autocompletar ON es compatible con el uso local en Rápido.
- Web adaptada a móvil: selector de API, botones táctiles, navegación y ajuste del chat al teclado. Aviso de que el ayudante integrado de Electude no funciona en móvil; ese aviso no se muestra en ordenador.

La prueba de navegador no pudo ejecutarse por restricciones del entorno. Las pruebas automáticas utilizan controles y proveedores simulados; no se ha verificado esta entrega con tu sesión real de Electude, tokens reales ni una descarga real de Gemini Nano.


En 1.12.0, selecciona Rápido y activa Autocompletar. Cambiar de modo durante una cuenta atrás cancela esa respuesta y vuelve a analizar con el nuevo modo.


## Cambios 1.12.0

- Cierto/falso recibe la pregunta común, las filas exactas y teoría relevante. Autocompletar exige justificación, cita verificable y confianza alta por fila. Se rechazan metadatos incompletos o de otra fila. Se confirma qué botones se han seleccionado; si no se puede comprobar, se pide revisión manual.
- La mejora no necesita dos llamadas a la IA. Puede realizar una captura adicional local para verificar controles dibujados.
- Reconoce resúmenes de puntuación de varias afirmaciones como intentos terminados y no vuelve a analizarlos.
- IA local utilizable en Rápido con Autocompletar ON. Ollama como alternativa a Chrome: descarga visible, diagnóstico de conexión/permisos, prueba y activación explícita. No hay sustitución silenciosa por una API si falla la IA local.
- Cinco imágenes ampliables dentro de la «i» de instalación, para Chrome/Edge y Firefox/Zen.

Se ejecutaron 128 pruebas con controles y proveedores simulados. Se comprobó también que la lectura visual de la captura adjunta distingue sus selecciones F/V/F; esto no evalúa la verdad técnica de esas frases. Las ilustraciones se han revisado renderizadas. No se ha probado una descarga real de modelo ni esta entrega en tu sesión real de Electude.
