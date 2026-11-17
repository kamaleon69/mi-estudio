# Análisis y cambios

## Qué había

La web es una aplicación estática con almacenamiento local, un service worker para abrir sin conexión y un puente de mensajes a la extensión. La extensión sincroniza Moodle/Classroom y consulta Gemini o Claude desde su proceso de fondo.

En Electude, el código original resaltaba sugerencias y dibujaba marcas sobre una captura. No seleccionaba opciones ni rellenaba campos. Ya existían interruptores para analizar al cambiar de ejercicio y pasar al siguiente después de que el usuario comprobara una respuesta correcta.

Al revisar el código se encontraron estos puntos:

- Las coincidencias de texto podían confundir una opción con una frase parecida de la teoría.
- Las respuestas llegadas después de cambiar de pregunta podían mostrarse en el ejercicio nuevo.
- El modo preciso mostraba primero una respuesta rápida provisional. Era necesario distinguirla del resultado final antes de añadir el rellenado.
- La selección del modelo preciso podía ignorar un modelo potente elegido en la web.
- Una captura podía corresponder a otra pestaña si el usuario cambiaba de pestaña durante la petición.
- El prompt incluía un ejemplo muy concreto de una lección, capaz de condicionar respuestas de otras actividades.

## Qué cambia en 1.9.0

| Cambio | Comportamiento |
| --- | --- |
| Autocompletar ON/OFF | Botón propio, apagado de inicio; el ajuste se guarda en el navegador. |
| Intervalo del usuario | Mínimo 7 s y máximo 15 s por defecto; editable entre 0 y 3600 s, con decimales o una espera fija. |
| Cuenta atrás | Empieza después de la respuesta final; se elige otro tiempo para cada ejercicio. |
| Cancelación | OFF, Cancelar, cambio de pregunta, pestaña oculta o intervención manual detienen el rellenado pendiente. |
| Opciones y campos | Soporte para radios, casillas, parejas verdadero/falso, texto, números y desplegables identificables en el DOM accesible. |
| Correspondencia | Se envían a la IA IDs de los controles reales. El autocompletado exige una respuesta completa y sin referencias desconocidas o repetidas. |
| Respuestas antiguas | Se comprueba la pregunta, la URL y la petición antes de presentar o aplicar el resultado. |
| Precisión | Se elimina el ejemplo sesgado del prompt, se da prioridad a la evidencia de la lección y se espera el resultado final del modo preciso. |
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
| `version.json` | Web `2026.11.17.5`, extensión `1.9.0`. |
| `extension-*/electude-core.js` | Nuevo protocolo, validación de respuestas, rangos y temporizador cancelable. |
| `extension-*/electude.js` | Controles ON/OFF, inventario de opciones/campos, rellenado y protección frente a respuestas antiguas. |
| `extension-*/background.js` | Prompt, captura, selección de modelos, límites y manejo de errores. |
| `extension-*/manifest.json` | Versión y carga del núcleo antes del panel. |
| `extension-*/perm.html` y `LEEME.txt` | Ayuda coherente con los modos automáticos. |
| `mi-estudio-extension*.zip` | Paquetes regenerados con el código nuevo. |
| `ACTUALIZAR.md` y `LEEME.md` | Instalación, publicación, uso y límites. |
| `tests/` y `tools/` | Pruebas y empaquetado reproducible. |

## Validación y límites

Se ejecutaron 19 pruebas automáticas con Node y se comprobó la sintaxis de los scripts. Se usan proveedores simulados: no se ha utilizado una clave real ni se ha medido un porcentaje de acierto de la IA.

La vista previa del entorno no estaba disponible, por lo que la prueba visual queda pendiente. Se incluye una página de integración local para probar los controles con respuestas simuladas. No se ha accedido a una sesión real de Electude.

La validación comprueba que una respuesta se pueda aplicar a los controles identificados; no demuestra que la respuesta académica sea correcta. Los dibujos, arrastres, iframes de otro origen y controles sin correspondencia reconocible conservan la ayuda manual.

Las claves siguen guardadas en el navegador. Al consultar, el texto y la captura autorizada se envían al proveedor de IA configurado. Se conserva el permiso opcional amplio que utilizaba la versión original para capturar; no se añaden permisos.

Referencias técnicas consultadas: [capturas de pestañas de Chrome](https://developer.chrome.com/docs/extensions/reference/api/tabs/), [modelos de Gemini](https://ai.google.dev/gemini-api/docs/models) y [modelos de Claude](https://platform.claude.com/docs/en/models/overview).
