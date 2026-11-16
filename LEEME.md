# Mi Estudio: Moodle + Google Classroom + Electude

Una web instalable (PWA) que funciona en el PC y en Android. Reúne en una sola lista
las tareas pendientes de las tres plataformas y te deja hacer esto:

| | Ver tareas y fechas | Ver material de estudio | Escribir | Entregar |
|---|---|---|---|---|
| **Moodle** | ✅ | ✅ (temas, archivos y enlaces de cada curso) | ✅ texto en línea | ✅ texto y archivos, desde la app |
| **Classroom** | ✅ | ✅ (materiales y adjuntos) | ✅ borrador para copiar | ↗ botón que abre la tarea en Classroom (Google no permite entregar desde apps externas) |
| **Electude** | ✅ las tareas que apuntes | ↗ acceso directo | ✅ notas | ↗ en Electude |

Todo se guarda solo en tu navegador: tokens, borradores y tareas de Electude. No hay ningún servidor intermedio.

---

## 1. Publicarla gratis con GitHub Pages (≈5 min)

Google solo permite iniciar sesión desde una dirección `https://` fija, así que la app necesita estar alojada en una web.

1. Crea una cuenta en <https://github.com> si no tienes.
2. Pulsa **New repository**, llámalo por ejemplo `mi-estudio` y márcalo como **Public**.
3. Pulsa **Add file → Upload files** y sube los 6 archivos de la carpeta: `index.html`, `sw.js`, `manifest.json`, `icon-192.png`, `icon-512.png` y este `LEEME.md`.
4. Ve a **Settings → Pages**, elige *Branch: main* y la carpeta `/ (root)`, y pulsa **Save**.
5. Al minuto tendrás la app en `https://TU-USUARIO.github.io/mi-estudio/`.

Los archivos no contienen ningún dato tuyo, así que puede ser un repositorio público.

## 2. Conectar Moodle

En la app, ve a **Ajustes → Moodle**:
- Pon la dirección de tu Moodle, por ejemplo `https://campus.tucentro.es`.
- Escribe tu usuario y contraseña y pulsa **Conectar Moodle**.

La app usa el mismo acceso que la app oficial de Moodle, que ya me has dicho que en tu centro funciona.

**Si sale «Inicio de sesión no válido»**, prueba el usuario **sin** el dominio (por ejemplo `447173.clot` en lugar de `447173.clot@fje.edu`). Escríbelo exactamente igual que en la app oficial de Moodle.

**Si entras a Moodle con el botón de Google o Microsoft, o el usuario y la contraseña siguen sin funcionar**, usa el método de la app oficial de Moodle:

1. En **Ajustes → Moodle**, escribe la dirección de tu Moodle y pulsa **🔐 Entrar con mi cuenta del centro**.
2. Pulsa **📋 Copiar enlace**.
3. Abre una **ventana privada**: Ctrl+Shift+P en Firefox o Zen, Ctrl+Shift+N en Chrome o Edge. Pega el enlace y pulsa Enter.
   Tiene que ser privada: Moodle solo entrega el token si **acabas** de iniciar sesión. Si ya tenías la sesión abierta, sale el error *«Plugin no habilitat o configurat»*.
4. Inicia sesión en Moodle como siempre.
5. Al terminar verás una página de error cuya dirección empieza por `moodlemobile://token=…`. Es normal. Si sale un aviso para «abrir Moodle», pulsa Cancelar.
6. Copia esa dirección entera desde la barra de direcciones (Ctrl+A, Ctrl+C), pégala en la app y pulsa **Conectar**.
   En Chrome a veces no se ve esa dirección; si te pasa, haz este paso en Firefox, Zen o Edge.

Otra opción, si tu centro la tiene activada: en Moodle, ve a *Preferencias → Claves de seguridad*, copia la clave de **Moodle mobile web service** y pégala en «Token manual». En el Moodle de Jesuïtes Educació esta página aparece vacía, así que allí usa el método anterior.

> El token es como una contraseña para la app: no se lo pases a nadie. Si alguna vez quieres anularlo, cierra la sesión de Moodle en todos los dispositivos o cambia tu contraseña.

## 3. Conectar Google Classroom (≈10 min, solo una vez)

Necesitas un "Client ID" gratuito de Google:

1. Entra en <https://console.cloud.google.com> y crea un proyecto nuevo (por ejemplo, "Mi Estudio").
   Si la cuenta del centro no te deja, usa tu Gmail personal: el proyecto puede ser de cualquier cuenta.
2. Ve a **APIs y servicios → Biblioteca**, busca **Google Classroom API** y pulsa **Habilitar**.
3. Ve a **APIs y servicios → Pantalla de consentimiento de OAuth** (o "Google Auth Platform"):
   - Tipo de usuario: **Externo**.
   - Nombre: Mi Estudio, y tu correo de contacto.
   - En **Usuarios de prueba** (Audience → Test users), añade **tu correo del centro**.
4. Ve a **Credenciales → Crear credenciales → ID de cliente de OAuth**:
   - Tipo: **Aplicación web**.
   - En **Orígenes de JavaScript autorizados**, añade `https://TU-USUARIO.github.io`, sin barra final ni `/mi-estudio`.
5. Copia el **ID de cliente** (termina en `.apps.googleusercontent.com`) y pégalo en la app, en **Ajustes → Google Classroom**.
6. Pulsa **Guardar y conectar** e inicia sesión con tu cuenta del centro.
   Google avisará de que la app "no está verificada". Es normal, porque la app es tuya: pulsa *Continuar*.

> ⚠️ Con cuentas de un centro educativo, el administrador puede tener bloqueadas las apps externas.
> Si al iniciar sesión sale *"Acceso bloqueado: tu administrador…"* o *"admin_policy_enforced"*, no hay nada que hacer desde tu lado.
> Tendrías que pedir al coordinador TIC que autorice la app (el Client ID). Moodle y Electude seguirán funcionando igual.

La sesión de Google dura una hora. Después, al pulsar «Actualizar», volverá a pedírtela con un clic.

## 4. Asistente IA y Lens (Claude y Gemini)

- **✳ Claude** (botón abajo a la derecha, o «✳ Ayuda» dentro de una tarea): abre un chat. Si lo abres desde una tarea, la IA ya conoce el enunciado y lo que llevas escrito. Con «Pegar en mi borrador» pasas la respuesta a tu entrega.
- **🔍 Lens**: oscurece la pantalla. Arrastra con el dedo o el ratón sobre la zona que quieras y elige **Claude** o **Gemini**. La zona se envía como imagen y como texto. Con **📷 Foto** puedes enviar una foto de tu libreta, de un libro o de la pizarra.

Hay dos formas de usarlo:

**A) Con tu cuenta normal, sin configurar nada.** La app no puede conectarse directamente a una suscripción de Claude ni de Gemini, así que les pasa tu pregunta:
- En el móvil se abre el menú **Compartir**. Elige la app de Claude o la de Gemini y entra con tu cuenta, con la imagen y el texto ya incluidos.
- En el PC se abre **claude.ai** con tu pregunta ya escrita, o **Gemini**, y la imagen queda copiada para pegarla con Ctrl+V.

**B) Chat dentro de la app, con clave de API.** Pon las claves en **Ajustes → Asistentes IA**:
- **Gemini (gratis):** entra en <https://aistudio.google.com> con tu Gmail personal y pulsa **Get API key → Create API key**. Las cuentas del centro suelen tener AI Studio bloqueado.
- **Claude:** entra en <https://console.anthropic.com>, ve a **API Keys → Create Key** y añade saldo. Se paga por uso (unos céntimos por pregunta) y es aparte de la suscripción Claude Pro.

Las claves se guardan solo en tu dispositivo y van directamente de tu navegador a Anthropic o Google. No las compartas con nadie.

## 5. Instalarla

- **Android (Chrome):** abre tu dirección de GitHub Pages, entra en el menú ⋮ y pulsa **Añadir a pantalla de inicio / Instalar app**. Tendrás un icono como si fuera una app.
- **PC (Chrome o Edge):** pulsa el icono de instalar que aparece en la barra de direcciones.

Los datos se guardan en cada dispositivo por separado, así que tendrás que conectarte una vez en el PC y otra en el móvil.

## Problemas frecuentes

- **Moodle: "Failed to fetch".** Revisa la dirección del Moodle (que empiece por `https://` y no termine en `/login`).
- **Moodle: "invalidlogin".** El usuario o la contraseña no son correctos, o tu centro usa inicio de sesión con Google (usa el token manual).
- **Classroom: "redirect_uri_mismatch" u "origin".** El origen autorizado del paso 3.4 no coincide exactamente con tu dirección de GitHub Pages.
- **Classroom: "access_denied".** No te añadiste como usuario de prueba en el paso 3.3.
