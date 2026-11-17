# Actualizar Mi Estudio y la extensión

Web: **2026.11.17.9** · Extensión: **1.11.1**

## Subir la web a GitHub

1. Descomprime el ZIP completo.
2. Abre tu repositorio `kamaleon69/mi-estudio`.
3. Sube el contenido de la carpeta en la raíz del repositorio, donde ya está `index.html`, reemplazando los archivos existentes. No metas toda la web dentro de una subcarpeta adicional.
4. Incluye `ai-providers.js`, `device.js`, `index.html`, `version.json`, `mi-estudio-extension.zip` y `mi-estudio-extension-firefox.zip`. Son necesarios para publicar la actualización y ofrecer las descargas nuevas. Los iconos, `manifest.json` y `sw.js` también están incluidos.
5. Las carpetas `extension-chrome` y `extension-firefox` contienen el código editable. `tests` contiene las pruebas y `tools` el empaquetador. Puedes subirlas también.
6. Confirma los cambios y espera a que termine GitHub Pages. Recarga Mi Estudio con Ctrl+Mayús+R.

Publicar la web no actualiza por sí solo una extensión instalada manualmente.

## Actualizar Chrome o Edge

1. Descomprime `mi-estudio-extension.zip` en la misma carpeta que ya cargaste como extensión, reemplazando los archivos. También puedes usar directamente `extension-chrome`.
2. Abre `chrome://extensions` o `edge://extensions` y pulsa el botón de recarga de Mi Estudio.
3. Recarga Mi Estudio y Electude. En el encabezado del panel de Electude debe aparecer **v1.11.1**. Si no aparece, ese panel todavía es de una versión anterior.
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

Se han ejecutado 102 pruebas automáticas, incluidas la reproducción del fallo del temporizador y la aplicación mediante clic de una respuesta precisa con controles simulados. La prueba visual no se pudo ejecutar en el entorno de preparación y no se ha accedido a tu sesión de Electude; comprueba primero un ejercicio conocido.


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
- IA local: **Preparar / probar IA local** → **Preparar / descargar** → **Probar el modelo**. Mantén abierta su pestaña. Se usa en modo Rápido para texto sencillo; los ejercicios precisos usan la API.
- Web adaptada a móvil: selector de API, botones táctiles, navegación y ajuste del chat al teclado. Aviso de que el ayudante integrado de Electude no funciona en móvil; ese aviso no se muestra en ordenador.

La prueba de navegador no pudo ejecutarse por restricciones del entorno. Las pruebas automáticas utilizan controles y proveedores simulados; no se ha verificado esta entrega con tu sesión real de Electude, tokens reales ni una descarga real de Gemini Nano.


En 1.11.1, selecciona Rápido y activa Autocompletar. Cambiar de modo durante una cuenta atrás cancela esa respuesta y vuelve a analizar con el nuevo modo.
