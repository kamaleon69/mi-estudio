# Análisis y cambios

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
