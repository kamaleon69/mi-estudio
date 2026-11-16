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

## 2. Conectar Moodle y Classroom (marcador ⚡)

En Jesuïtes Educació, Moodle y Google bloquean las apps externas. Por eso la app usa un **marcador**: lee tus tareas con la sesión que ya tienes abierta en el navegador. No usa contraseñas.

**Guardar el marcador (solo la primera vez, en el ordenador)**

1. En la app, ve a **Ajustes → ⚡ Conectar Moodle y Classroom**.
2. Pulsa **Ctrl + Shift + B** (en Mac **⌘ + Shift + B**) para ver la barra de marcadores.
3. **Arrastra** el botón azul **⚡ Sincronizar Mi Estudio** hasta esa barra. No hagas clic en él.

**Moodle**

1. Abre https://moodle4.net.fje.edu y entra con tu cuenta de Microsoft del centro, como siempre.
2. En el «Tauler de control», pulsa el marcador **⚡ Sincronizar Mi Estudio**.
3. Se abre Mi Estudio con «✅ Moodle sincronizado».

**Classroom**

1. Abre https://classroom.google.com/a/not-turned-in/all con tu cuenta **@fje.edu**. Si sale tu Gmail personal, pulsa tu foto (arriba a la derecha) y elige la cuenta del centro.
2. En **Pendents**, pulsa el marcador. La página pasa sola a «Sense entregar» y vuelve, porque lee también las tareas vencidas. Espera unos segundos.
3. Se abre Mi Estudio con «✅ Classroom sincronizado».

**Para actualizar**, repite lo de Moodle o Classroom cuando quieras, por ejemplo una vez al día.

> Con el marcador **ves** las tareas, fechas y cursos. Para **entregar**, pulsa «Abrir en Moodle» o «Abrir en Classroom» en cada tarea.

## 3. Electude

- El botón **Abrir Electude** abre `https://clotfje.electude.eu/srestore`. En el PC se abre en una ventana lateral para usarlo junto a la app.
- Electude no deja que otras apps lean tus tareas. Apúntalas en la pestaña **Electude** con título y fecha, y aparecerán en «Pendientes» junto al resto.

## 4. Tenerlo también en el móvil (o en otro ordenador)

Cada dispositivo guarda sus datos aparte. Lo más fácil es sincronizar en el PC y enviar las tareas al móvil:

1. En el PC, sincroniza con el marcador (paso 2).
2. Ve a **Ajustes → 📲 Pasar a otro dispositivo** y pulsa **Enviar a otro dispositivo**. Se copia un enlace.
3. Mándatelo a ti mismo (WhatsApp, Telegram o correo) y ábrelo en el móvil. Las tareas aparecen solas.

El enlace no lleva contraseñas, tokens ni claves de IA, pero sí tu lista de tareas: envíatelo solo a ti.

Si prefieres usar el marcador directamente en el móvil, las instrucciones para Android y iPhone están en la ⓘ de **⚡ Conectar Moodle y Classroom**.

## 5. Asistente IA y Lens

- **✳ Claude** (abajo a la derecha) o **✳ Ayuda** dentro de una tarea: abre un chat. Desde una tarea, la IA ya sabe cuál es. Con «Pegar en mi borrador» guardas la respuesta en tus notas de esa tarea.
- **🔍 Lens**: arrastra sobre una zona de la pantalla y elige **Claude** o **Gemini**. Con **📷 Foto** envías una foto de tu libreta o tu libro.

Dos formas de usarlo:

- **Con tu cuenta normal, sin configurar nada:** se abre claude.ai o Gemini con tu pregunta. En el móvil, a través de «Compartir».
- **Chat dentro de la app:** pon una clave en **Ajustes → Asistentes IA**. La de Gemini es gratis en https://aistudio.google.com/apikey con tu Gmail personal. La de Claude se crea en https://console.anthropic.com/settings/keys y se paga por uso, aparte de Claude Pro.

## 6. Compartir con compañeros

**Ajustes → Compartir con compañeros → Copiar enlace**. Tu compañero abre el enlace, ve la app vacía (nada tuyo), la instala con **⬇ Añadir** y sigue el paso 2 con **sus** cuentas.

## 7. Problemas frecuentes

- **No veo los últimos cambios:** pulsa **Ctrl + Shift + R**.
- **El marcador dice «abre Moodle, Classroom o Electude»:** lo has pulsado en otra página. Ábrelo dentro de Moodle o de Classroom → Pendents.
- **Classroom no carga tareas:** comprueba que estás con la cuenta **@fje.edu** y en la página **Pendents**.
- **Al pulsar el marcador no se abre la app:** el navegador ha bloqueado la ventana. Permite las ventanas emergentes para Moodle y Classroom, o pulsa el marcador otra vez.
- **En el móvil no aparece nada:** cada dispositivo es independiente. Usa «📲 Pasar a otro dispositivo» desde el PC.

---

### Conexión directa (avanzado, desactivada en tu centro)

La app también puede conectarse directamente a Moodle (usuario y contraseña o token) y a Classroom (Google Cloud). Con eso se podría entregar desde la app. En Jesuïtes Educació está bloqueada: Moodle responde «Plugin no habilitat» y Classroom necesita la aprobación del administrador. Si algún día la activan, se configura en **Ajustes → 🔧 Conexión directa**.

### Actualizar la web (solo el propietario)

Sube los archivos nuevos a https://github.com/kamaleon69/mi-estudio con **Add file → Upload files** y pulsa **Commit changes**. En un par de minutos estará en la web.
