# Análisis y cambios

## 2.1.0 · 22 de noviembre de 2026

- Conserva Electude de la versión anterior e incorpora el asistente Lens del ZIP aportado, con selección mediante puntero, recorte local y la API elegida en Ajustes.
- Sincronización por plataforma en pestañas de fondo, con acceso a la sesión, cancelación y conservación de listas anteriores ante fallos parciales.
- Borradores en castellano o català a partir de PDF, DOCX, texto o imágenes. Revisión humana antes de la entrega.
- Análisis de Electude sin apertura automática del panel. Captura reservada para ejercicios visuales y protección de respuestas parciales del usuario.
- Guía de activación con primera prueba para Chrome, Edge, Firefox y Zen.


## Versión 1.15.0 · web 2026.11.18.2

- Preparación de permisos al instalar/actualizar si hace falta, con un botón de concesión que conserva el gesto de usuario. Captura y escritura en el portapapeles se solicitan al principio. Los enlaces anteriores de permisos llevan a esa preparación.
- Comprobación previa en las rutas de consulta IA, captura, verificación, sincronización y configuración local. Comprobación adicional antes de rellenar. Retirar permisos cancela solicitudes, cuentas y avance. El estado inicial se refleja también en la web. No se han añadido permisos de lectura del portapapeles.
- Botón para informar de fallos en el panel: pausa la respuesta y el avance antes de abrir otro documento y guarda el estado del problema, incluida la respuesta original previa a validación, sin consultar otra vez la IA.
- Informe revisable con tipo de fallo, notas y respuesta esperada. Descarga de JSON, copia de texto y compartir mediante el sistema cuando está disponible. La imagen del análisis se incluye solo si se marca su casilla. Se aclara que no es necesariamente la captura de la corrección posterior.
- Exclusión de claves guardadas, cabeceras y credenciales; ocultación de correos y parámetros de direcciones. Borrador local único, apertura limitada a 24 horas, con respaldo sin imagen si falta espacio. No hay envío automático de informes ni un servidor de recepción.
- Historial acotado de eventos, mensajes del rellenado y errores, agrupando ticks repetidos. Datos de contexto y controles para reproducir lecturas y clics incorrectos.
- 232 pruebas aprobadas, 35 nuevas. Sintaxis, referencias y copias verificadas. No se ha probado en una instalación real de navegador, sesión real de Electude ni con claves reales. Los archivos de Firefox/Zen continúan sin firma de Mozilla.

Referencias: [permisos en Chrome](https://developer.chrome.com/docs/extensions/reference/api/permissions), [permisos en Firefox](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/permissions/request) e [instalación del complemento](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onInstalled).

## Versión 1.14.0 · web 2026.11.18.1

- Lectura de controles fuera de pantalla, exclusión de iframes ocultos y carruseles recortados, selección de teoría relevante y separación del contexto por documento/módulo.
- Vista de lectura y botón para releer sin API. Analizar manual vuelve a consultar; caché renovada, acotada a siete días y sin guardar resultados incompletos o de baja fiabilidad.
- Clic centrado con puntero/mouse en controles dibujados, activación nativa en inputs y desplazamiento de controles fuera de la vista. Espera de confirmación hasta un segundo y verificación visual local de selección cuando no hay estado DOM. No se repite el clic ante una selección incierta.
- Identidad basada en el contenido y la navegación; recrear un nodo, rellenar un campo o bloquearlo no equivale a cambiar de pregunta. Cancelaciones solo por intervención en la respuesta. Mantiene cambio de pregunta, ON/OFF, 7–15 s configurables, Preciso/Rápido y paso tras Correcte a los 0,50 s.
- Parser compatible con varios IDs en una línea, formatos numerados, CERT/FALS, TRUE/FALSE y valores entre comillas. Bloqueo de autocompletado ante fiabilidad media explícita. Estados finales de Gemini, Claude y OpenAI verificados antes de aceptar texto.
- Resaltados sin temporizadores de parpadeo; retirarlos conserva cambios de estilo posteriores hechos por Electude.
- Deshacer autocompletado en las tareas web con protección de las ediciones posteriores.
- Guía de Zen con carga temporal directa del ZIP y firma permanente por Mozilla, solución de errores, página de privacidad y manifiesto con declaración de datos y versiones mínimas compatibles. Se conserva el ID. No se incluye ni se promete una firma de Mozilla.
- Opciones de la extensión con estado de instalación, permisos y API. Empaquetado que sincroniza el código compartido entre navegadores antes de generar los ZIP.
- 197 pruebas aprobadas con controles y APIs simulados; validación de 49 scripts y comprobaciones de HTML, recursos y paquetes. Prueba manual de navegador ampliada. Pendiente validación en una sesión real de Electude y en Zen; no se han usado tokens reales ni se ha firmado/publicado en Mozilla.

Fuentes: [Zen](https://docs.zen-browser.app/user-manual/extensions), [instalación temporal de Firefox](https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox/), [firma y distribución](https://www.extensionworkshop.com/documentation/publish/signing-and-distribution-overview/) y [datos y consentimiento](https://www.extensionworkshop.com/documentation/develop/firefox-builtin-data-consent/).

## Versión 1.13.0 · web 2026.11.17.11

- Autocompletar dentro del detalle de las tareas, con selector persistente Castellano/Català, enunciado editable y captura opcional. Usa la API seleccionada y admite texto en línea de Moodle o borradores para copiar. Conserva el texto existente; cancela por edición, cambio de idioma o cierre y descarta respuestas antiguas. No entrega la tarea.
- Web Push real con service worker y servicio Cloudflare incluido: alarmas persistentes ocho horas antes de las tareas pendientes, una programación por tarea y fecha, cambio/cancelación al sincronizar y apertura directa de la tarea desde el aviso. Si ya faltan menos de ocho horas, se avisa en el siguiente envío.
- Activación por dispositivo desde Ajustes, permiso solicitado al pulsar, prueba de envío, sincronización, desactivación y guía de configuración adaptable a móvil dentro de la «i».
- GitHub Pages sigue alojando la web. El servicio push requiere publicación y URL por parte del propietario; no está desplegado en esta entrega. Usa las tareas sincronizadas, sin acceso al Moodle/Classroom cerrado. En iPhone/iPad requiere la app añadida a pantalla de inicio.
- Claves VAPID generadas y conservadas en el servicio, cifrado RFC 8291 y firma RFC 8292 sin dependencias. Token distinto por dispositivo en IndexedDB, exclusión de borradores y claves de IA, caducidad de mensajes, reintentos acotados por fecha y limpieza de suscripciones caducadas. Las solicitudes simultáneas y las renovaciones de endpoints no recuperan estados anteriores.
- Caché de la web actualizada con todos los módulos y la guía. Extensiones sincronizadas y empaquetadas como 1.13.0.
- 171 pruebas aprobadas: 128 anteriores y 43 nuevas sobre programación, estado del cliente, eventos del service worker, borradores, APIs e idiomas. Cifrado contrastado con el vector del RFC y descifrado independiente. No se ha publicado el Worker ni probado la recepción en un móvil real o con tokens reales de IA.

Referencias: [Web Push en WebKit](https://webkit.org/blog/13878/), [alarmas persistentes de Cloudflare](https://developers.cloudflare.com/durable-objects/api/alarms/), [disponibilidad y límites del almacenamiento SQLite](https://developers.cloudflare.com/durable-objects/platform/pricing/), [RFC 8291](https://www.rfc-editor.org/rfc/rfc8291) y [RFC 8292](https://www.rfc-editor.org/rfc/rfc8292).

## Versión 1.12.0 · web 2026.11.17.10

- Corregido el ámbito de cierto/falso: no basta con recoger la lista, el recuadro debe incluir la pregunta común. Se limpian los textos de las filas sin incluir las etiquetas de los botones.
- Enunciado, negaciones, comparaciones y sujeto explícitos en el prompt. Se prohíbe forzar reparto V/F o convertir ausencia de evidencia en Falso.
- Contexto de lección con párrafos completos relevantes y lectura vertical fuera de pantalla, excluyendo bloques ocultos. Citas y confianza por fila, comprobadas localmente antes de autocompletar.
- Parejas de controles con resolución por etiquetas; referencias contradictorias se rechazan. Se escoge el control de clic completo y se confirma la selección por estado o captura local, sin una segunda consulta al proveedor de IA.
- Resúmenes agregados de corrección detectados para evitar reanálisis y permitir avance solo con todas correctas.
- Nuevo motor local Ollama, descarga de modelo con progreso, prueba obligatoria antes de activar, diagnóstico de permisos y origen. Gemini Nano se mantiene como opción de texto. Rápido local admite Autocompletar ON; Preciso conserva la API. Fallos locales visibles sin cambio silencioso a la nube.
- Cinco ilustraciones ampliables en la información de instalación de Chrome/Edge y Firefox/Zen, incluidas en la caché de la web.
- 128 pruebas automáticas aprobadas con controles y servidores simulados. Lectura visual comprobada sobre la captura aportada e ilustraciones revisadas renderizadas. No se mide un porcentaje de acierto académico ni se ha utilizado una sesión real de Electude o una descarga real de modelo.

Fuentes: [API local de Ollama](https://docs.ollama.com/api/chat), [descarga de modelos](https://docs.ollama.com/api/pull), [configuración local](https://docs.ollama.com/faq), [Gemma 3](https://ollama.com/library/gemma3), [instalación en Chrome](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked) e [instalación temporal en Firefox](https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox/).

## Versión 1.11.1 · web 2026.11.17.9

- Autocompletar permite Preciso y Rápido, conserva el modo elegido al activar ON y deja ambos botones disponibles.
- Cambiar de modo cancela la cuenta o petición pendiente y analiza con el nuevo modo. Cada resultado debe corresponder al modo solicitado.
- Se mantiene la espera editable 7–15 s por defecto, la validación de respuestas completas y las cancelaciones por intervención manual o cambio de pregunta.
- Las preguntas visuales requieren captura en ambos modos; los dibujos conservan sus marcas numéricas y se pulsan manualmente.
- 102 pruebas automáticas aprobadas con controles y APIs simulados. Pendiente comprobar en una sesión real de Electude.

## Versión 1.11.0 · web 2026.11.17.8

- Dos nuevas APIs con nivel gratuito: Groq y OpenRouter Free. Tokens y modelos en Ajustes, chat y Lens compatibles, y selector de API directamente dentro de Electude. Se conserva la selección de la extensión al sincronizar la web. No se añade Grok ni se hace rotación automática de cuentas.
- OpenRouter solo admite el enrutador gratuito o variantes `:free`. Groq ofrece modelos de texto e imágenes; las preguntas visuales rechazan un modelo que solo admita texto.
- Puntos de dibujo: detección de centros de clic en figuras, inventario H y etiquetas H en la captura que recibe la IA. Marcadores visibles pequeños con solo números; anclajes al DOM/figura, escala de iframe y actualización con scroll/resize. Se rechazan IDs inventados, duplicados, destinos sin punto detectado y baja fiabilidad. No se garantiza que la IA identifique bien la pieza.
- Automático: temporizador que no se reinicia con cada animación, identidad centrada en la pregunta activa, observación de estilos y sondeo de cambios. Se abortan las solicitudes antiguas al navegar y se descartan respuestas obsoletas.
- Pasar solo: temporizador de 500 ms, con validación de pregunta y feedback antes del clic.
- IA local: nueva página de extensión para iniciar la descarga con un clic real, mostrar progreso, comprobar compatibilidad y probar el modelo. Sesiones independientes por consulta, cancelación y plazos. Se utiliza en Rápido para texto sencillo; Preciso y Autocompletar usan la API.
- Móvil: navegación y botones táctiles, selector de API, controles sin zoom al escribir y chat adaptado al teclado. Aviso de Electude integrado solo en Android/iPhone/iPad; se conserva la consulta manual de capturas.
- Se mantienen ON/OFF, intervalo predeterminado 7–15 s y omisión de respuestas ya completadas.

**98 pruebas automáticas aprobadas** con controles y APIs simulados. Sintaxis, HTML y manifiestos verificados. Prueba visual bloqueada por las restricciones del entorno; pendientes la comprobación en Electude real, las APIs con tokens reales y la descarga local en un equipo compatible.

Fuentes oficiales: [Groq: nivel gratuito y cuotas](https://console.groq.com/docs/rate-limits), [Groq: visión](https://console.groq.com/docs/vision), [OpenRouter Free](https://openrouter.ai/docs/guides/routing/routers/free-router), [OpenRouter: límites](https://openrouter.ai/docs/api-reference/limits), [Chrome: Prompt API](https://developer.chrome.com/docs/ai/prompt-api) y [requisitos locales](https://developer.chrome.com/docs/ai/get-started). Condiciones consultadas el 17 de noviembre de 2026.

## Versión 1.10.0

- Corregida la detección de cuestionarios con campo de respuesta y sin botón Comprovar.
- Eliminada la búsqueda global de opciones: las etiquetas numéricas de la figura no se resaltan como respuestas.
- Las preguntas de identificación en una imagen requieren captura y usan Preciso. Se conserva más resolución en la captura.
- Si una salida numérica corresponde a un único campo, se interpreta como valor del campo; se rechaza la repetición de un valor que ya recibió Incorrecte.
- Las preguntas completadas, marcadas o corregidas se omiten antes de capturar o consultar la IA.
- Una petición por análisis, sin respuesta rápida provisional paralela.
- Gestión de límites diarios, temporales y de facturación; pausa persistente por proveedor, clave y modelo.
- Gemini admite clave principal y alternativa con cambio manual.
- OpenAI / ChatGPT se incorpora al chat, Lens y Electude mediante Responses con texto e imágenes. Modelo inicial: gpt-5.5, editable.
- Las claves se sincronizan con la extensión y quedan fuera de los enlaces de transferencia.
- Encabezado con versión visible y diagnóstico de errores con etapa y traza.
- Web 2026.11.17.7 y extensión 1.10.0.

Se ejecutaron **56 pruebas automáticas** con proveedores, controles y respuestas simulados. La sintaxis y los paquetes también se validaron. La prueba visual y la comprobación dentro de una sesión real de Electude siguen pendientes; no se han utilizado claves reales ni medido un porcentaje de acierto de los modelos.

Referencias: [límites de Gemini](https://ai.google.dev/gemini-api/docs/rate-limits), [OpenAI Responses](https://developers.openai.com/api/reference/resources/responses/methods/create), [imágenes de OpenAI](https://developers.openai.com/api/docs/guides/images-vision) y [modelo GPT-5.5](https://developers.openai.com/api/docs/models/gpt-5.5).


## Corrección 1.9.1

- Corregido «Illegal invocation»: el temporizador nativo se invocaba con el objeto de la cuenta atrás como receptor. Ahora conserva el receptor del navegador al iniciar y cancelar. Se reprodujo el fallo antes de corregirlo y se añadieron pruebas de regresión.
- Autocompletar selecciona y mantiene Preciso. Rápido queda deshabilitado mientras esté en ON.
- La petición precisa del autocompletado no cambia a modelos ligeros si hay un error. El resultado debe estar confirmado como preciso antes de iniciar la cuenta y antes de hacer clic.
- Las opciones se pulsan mediante el control real; también se admiten controles SVG sin método click.
- Si un temporizador no se puede iniciar, se conserva la sugerencia y se muestra el error en el estado del autocompletado.
- Se incorporaron pruebas de aplicación mediante clic, modo Preciso obligatorio y cancelación con controles simulados.

## Qué había

La web es una aplicación estática con almacenamiento local, un service worker para abrir sin conexión y un puente de mensajes a la extensión. La extensión sincroniza Moodle/Classroom y consulta Gemini o Claude desde su proceso de fondo.

En Electude, el código original resaltaba sugerencias y dibujaba marcas sobre una captura. No seleccionaba opciones ni rellenaba campos. Ya existían interruptores para analizar al cambiar de ejercicio y pasar al siguiente después de que el usuario comprobara una respuesta correcta.

Al revisar el código se encontraron estos puntos:

- Las coincidencias de texto podían confundir una opción con una frase parecida de la teoría.
- Las respuestas llegadas después de cambiar de pregunta podían mostrarse en el ejercicio nuevo.
- El modo preciso manual puede mostrar primero una respuesta rápida provisional. Autocompletar solicita únicamente el resultado preciso.
- La selección del modelo preciso podía ignorar un modelo potente elegido en la web.
- Una captura podía corresponder a otra pestaña si el usuario cambiaba de pestaña durante la petición.
- El prompt incluía un ejemplo muy concreto de una lección, capaz de condicionar respuestas de otras actividades.

## Qué cambia en 1.9.1

| Cambio | Comportamiento |
| --- | --- |
| Autocompletar ON/OFF | Botón propio, apagado de inicio; el ajuste se guarda en el navegador. |
| Intervalo del usuario | Mínimo 7 s y máximo 15 s por defecto; editable entre 0 y 3600 s, con decimales o una espera fija. |
| Cuenta atrás | Empieza después de la respuesta final; se elige otro tiempo para cada ejercicio. |
| Cancelación | OFF, Cancelar, cambio de pregunta, pestaña oculta o intervención manual detienen el rellenado pendiente. |
| Opciones y campos | Soporte para radios, casillas, parejas verdadero/falso, texto, números y desplegables identificables en el DOM accesible. |
| Correspondencia | Se envían a la IA IDs de los controles reales. El autocompletado exige una respuesta completa y sin referencias desconocidas o repetidas. |
| Respuestas antiguas | Se comprueba la pregunta, la URL y la petición antes de presentar o aplicar el resultado. |
| Precisión | Autocompletar exige una respuesta precisa, sin sustitución por una rápida, y da prioridad a la evidencia de la lección. |
| Modelos | Se respeta el modelo potente seleccionado; Claude rápido y preciso utilizan peticiones diferenciadas. |
| Peticiones | Límite de tiempo y detección de salidas vacías o truncadas. |
| Capturas | Se comprueba que la pestaña solicitante siga activa antes y después de capturar. |
| Caché | Nueva clave que incorpora la URL, los controles, el modo y la imagen disponible. |
| Distribución | Web, versiones, ayuda y ZIP de Chrome/Edge y Firefox/Zen actualizados conjuntamente. |

El autocompletado selecciona controles y escribe valores. **Comprovar sigue siendo manual**. Se conserva la función opcional de pasar al siguiente después de una comprobación correcta.

## Archivos

| Archivo | Cambio |
| --- | --- |
| `index.html` | Ayuda de Electude y versión de la aplicación. |
| `version.json` | Web `2026.11.17.6`, extensión `1.9.1`. |
| `extension-*/electude-core.js` | Nuevo protocolo, validación de respuestas, rangos y temporizador cancelable. |
| `extension-*/electude.js` | Controles ON/OFF, inventario de opciones/campos, rellenado y protección frente a respuestas antiguas. |
| `extension-*/background.js` | Prompt, captura, selección de modelos, límites y manejo de errores. |
| `extension-*/manifest.json` | Versión y carga del núcleo antes del panel. |
| `extension-*/perm.html` y `LEEME.txt` | Ayuda coherente con los modos automáticos. |
| `mi-estudio-extension*.zip` | Paquetes regenerados con el código nuevo. |
| `ACTUALIZAR.md` y `LEEME.md` | Instalación, publicación, uso y límites. |
| `tests/` y `tools/` | Pruebas y empaquetado reproducible. |

## Validación y límites

Se ejecutaron 28 pruebas automáticas con Node y se comprobó la sintaxis de los scripts. Se usan proveedores simulados: no se ha utilizado una clave real ni se ha medido un porcentaje de acierto de la IA.

La vista previa del entorno no estaba disponible, por lo que la prueba visual queda pendiente. Se incluye una página de integración local para probar los controles con respuestas simuladas. No se ha accedido a una sesión real de Electude.

La validación comprueba que una respuesta se pueda aplicar a los controles identificados; no demuestra que la respuesta académica sea correcta. Los dibujos, arrastres, iframes de otro origen y controles sin correspondencia reconocible conservan la ayuda manual.

Las claves siguen guardadas en el navegador. Al consultar, el texto y la captura autorizada se envían al proveedor de IA configurado. Se conserva el permiso opcional amplio que utilizaba la versión original para capturar; no se añaden permisos.

Referencias técnicas consultadas: [capturas de pestañas de Chrome](https://developer.chrome.com/docs/extensions/reference/api/tabs/), [modelos de Gemini](https://ai.google.dev/gemini-api/docs/models) y [modelos de Claude](https://platform.claude.com/docs/en/models/overview).
