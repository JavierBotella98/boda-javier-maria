# PRD — Web de la Boda de Javier y María

**Versión:** 1.0
**Fecha del documento:** 2026-07-06
**Fecha de la boda:** 10/04/2027, 13:00h
**Estado:** Aprobado para inicio de desarrollo

---

## 1. Resumen y objetivo

Web privada para gestionar la boda de Javier y María, con dos funciones principales:

1. **Informar a los ~150 invitados** de todos los detalles del evento (fecha, hora, ubicaciones, cómo llegar, alojamiento, transporte, vestimenta, lista de bodas, etc.).
2. **Recoger la confirmación de asistencia (RSVP)** de cada invitado, incluyendo acompañantes, menús, alergias/intolerancias y uso del servicio de autobuses.

Adicionalmente, servirá como repositorio temporal de las fotos del evento tras la boda, para que los invitados puedan descargarlas.

La web se difundirá mediante un **único enlace enviado por WhatsApp** a los ~150 invitados.

---

## 2. Usuarios y roles

| Rol | Descripción | Acceso |
|---|---|---|
| **Invitado** | Cualquier persona con el enlace de la web | Acceso público tras introducir la contraseña general del sitio |
| **Administradores (Javier y María)** | Gestión de invitados, contenido y fotos | Panel de administración con usuario/contraseña propio |

No existen otros roles (sin padrinos/organizadores con acceso especial).

---

## 3. Alcance funcional

### 3.1 Acceso al sitio
- Toda la web (información + formulario + galería) está protegida por **una contraseña única y sencilla** (p. ej. la fecha de la boda), compartida por WhatsApp junto con el enlace.
- No hay login individual por invitado ni enlaces personalizados: es un enlace público único para todos.
- Riesgo aceptado y asumido conscientemente: al no haber identificación individual, no hay control de aforo ni prevención de que alguien confirme en nombre de otro. Se mitiga con la comunicación por WhatsApp y el trato cercano con los invitados.

### 3.2 Contenido informativo
La web incluirá, organizada mediante un **menú de navegación** (no una única página larga):

- **Portada**: nombres, fecha, cuenta atrás hasta el 10/04/2027.
- **Información del evento**: fecha, hora (13:00h), iglesia, finca.
- **Cómo llegar**: direcciones + **mapa interactivo embebido** (Google Maps) con marcadores de iglesia, finca y hoteles.
- **Alojamiento**: hoteles recomendados cerca de la finca/iglesia.
- **Transporte (autobuses)**:
  - Autobús de ida: iglesia → finca.
  - Autobús de vuelta: finca → centro de la ciudad, con **3 franjas horarias** (justo después de la cena, algo más tarde, y al final de la boda). Horarios exactos pendientes de definir, editables desde configuración de contenido.
- **Código de vestimenta** (dress code).
- **Timeline del día** (horario: ceremonia, cóctel, banquete, fiesta...).
- **Lista de bodas**: número de cuenta bancaria.
- **Nuestra historia**: texto breve sobre la pareja.
- **Preguntas frecuentes (FAQ)**.
- **Botón "Añadir a mi calendario"** (Google Calendar / Apple Calendar) con la fecha/hora de la ceremonia.
- **Galería de fotos** (ver sección 3.4) — no disponible en el lanzamiento inicial, se activa unas semanas después de la boda.

No se requiere soporte multilenguaje: todos los invitados hablan español.

### 3.3 Formulario de confirmación de asistencia (RSVP)

Formulario público (sin login, buscándose el invitado por su propio nombre al rellenarlo) con los siguientes campos:

- **Nombre y apellidos** del invitado principal.
- **Confirmación de asistencia** (sí/no).
- **Número de acompañantes** que le acompañan.
- **Por cada acompañante** (subformulario repetido):
  - Nombre.
  - Tipo de menú: normal (adulto) o infantil.
  - Alergias/intolerancias (texto libre).
- **Menú y alergias/intolerancias propias** del invitado principal.
- **Uso del autobús**:
  - ¿Usará el autobús iglesia → finca? (sí/no)
  - ¿Usará el autobús de vuelta finca → ciudad? (sí/no) → si sí, selección de franja horaria (de las 3 disponibles).
- **Necesidades especiales** (campo de texto libre, ej. movilidad reducida, silla de bebé, etc.).
- **Casilla de consentimiento de privacidad** (obligatoria para enviar el formulario) — ver sección 6.

**Comportamiento:**
- No hay fecha límite de cierre automático del formulario (se gestionará con recordatorios manuales por WhatsApp, objetivo: todas las respuestas un mes antes de la boda).
- **No se permite editar una respuesta ya enviada.** Si un invitado necesita modificar su confirmación, lo comunicará directamente a los novios por otro medio (WhatsApp, llamada), y estos lo actualizarán manualmente desde el panel de administración si es necesario.
- Tras enviar el formulario, se muestra un **mensaje de confirmación** personalizado (ej. "¡Gracias, [Nombre]! Hemos recibido tu confirmación 🎉").
- El formulario incluye **protección básica anti-spam/bots** (invisible para el usuario), al ser un formulario público sin autenticación individual.

### 3.4 Galería de fotos (fase posterior a la boda)

- Se activa unas semanas después de la boda, cuando los novios reciban y seleccionen las fotos del fotógrafo.
- Estimación: ~300 fotos, entregadas optimizadas para web (no alta resolución) por el fotógrafo.
- Los novios suben las fotos desde el panel de administración.
- Los invitados pueden **ver y descargar las fotos de forma individual** (no es necesario un "descargar todo en ZIP" en el alcance inicial).
- Acceso protegido por la misma contraseña general del sitio (no requiere una contraseña adicional).

### 3.5 Panel de administración

Accesible mediante usuario/contraseña simple (compartido entre los dos novios). Incluye:

- **Listado completo de respuestas al formulario**: todos los invitados que han confirmado, con el detalle de acompañantes, menús y alergias por persona.
- **Exportación a Excel/CSV** del listado completo (para catering, empresa de autobuses, organización general).
- **Estadísticas rápidas**: total de asistentes confirmados, nº de menús infantiles vs. normales, nº de personas con alergias, nº de personas por franja de autobús, etc.
- **Gestión de la galería de fotos**: subida de fotos tras la boda.
- **Notificación automática por email** a los administradores cada vez que un invitado envía el formulario de confirmación.

**Edición de contenido informativo** (textos, horarios de autobús, datos de hoteles, dress code, etc.): **no** se construye un editor visual (CMS) dentro del panel. En su lugar, este contenido se mantiene en un archivo de configuración sencillo del proyecto. Cuando los novios necesiten cambiar algo, lo solicitan al desarrollador (Javier + asistencia de Claude Code), que actualiza y despliega el cambio en pocos minutos. Esta decisión reduce significativamente la complejidad de desarrollo sin sacrificar flexibilidad real, dado el ritmo de cambios esperado (bajo y puntual).

### 3.6 Vista previa al compartir (Open Graph)

Al compartir el enlace por WhatsApp (o cualquier red social), debe mostrarse una vista previa enriquecida: imagen de portada + título tipo "Boda de Javier y María — 📅 10 de abril de 2027".

### 3.7 Fuera de alcance (explícitamente descartado)

- Edición de respuestas por parte del invitado tras el envío.
- Fecha límite / cierre automático del formulario.
- Control de aforo o límite de acompañantes por invitado.
- Enlaces personalizados o login individual por invitado.
- Multilenguaje.
- Editor de contenido tipo CMS visual en el panel de administración.
- Descarga de galería completa en ZIP (solo descarga individual).
- Mantenimiento a largo plazo tras el evento (la web se da de baja unos meses después de la boda).

---

## 4. Experiencia de usuario y diseño

- **Mobile-first**: prioridad absoluta a la experiencia en móvil (iOS/Safari y Android/Chrome), verificando también el correcto funcionamiento en escritorio y en los navegadores principales.
- **Navegación por menú**, no una única página de scroll largo (dado el volumen de secciones).
- **Estilo visual**: elegante y clásico, con un toque rústico/campestre. Paleta de colores en tonos claros — beige, blanco, pastel —, sobria y no recargada, con un toque romántico.
- **Tipografía**: se propondrá una combinación de tipografía serif clásica para titulares y una tipografía sans-serif limpia para el texto, alineada con el estilo de las referencias aportadas.
- **Fotografía**: se incluirán fotos de la pareja, tratadas con un efecto tipo acuarela/pintura para reforzar la estética de boda.
- **Motivo decorativo "Iglesia de San Juan"**: guiño personal a la iglesia donde se celebra la ceremonia (Iglesia de San Juan, Málaga), cuya fachada presenta un característico patrón geométrico de rombos en tonos terracota, ocre y verde salvia sobre fondo crema. Se incorporará como **textura de fondo suavizada** (versión desaturada/aguada del patrón original, coherente con el tratamiento acuarela de las fotos), aplicada de forma puntual en:
  - Portada/cabecera (fondo sutil tras los nombres y la fecha).
  - Sección "Cómo llegar" / Iglesia (refuerzo directo del guiño).
  - Pie de página (franja decorativa recurrente).
  No se usará como patrón dominante en toda la web, para mantener la línea general sobria y en tonos pastel.
- **Referencias de inspiración aportadas**:
  - bodapix.net/city
  - bodapix.net/santorini
  - bodapix.net/palace
  - kuramaestudio.com/products/web-campo
  - Fachada de la Iglesia de San Juan (Málaga) — motivo geométrico de rombos, referencia fotográfica aportada por los novios

---

## 5. Arquitectura técnica

| Componente | Elección | Justificación |
|---|---|---|
| Frontend | Next.js (React) | Rendimiento, SEO/Open Graph nativo, responsive, ecosistema maduro |
| Hosting | Vercel (plan gratuito) | Gratuito para este volumen de tráfico, despliegue automático desde GitHub |
| Base de datos | Supabase (Postgres, plan gratuito) | Almacena invitados/respuestas y credenciales de administración; plan gratuito suficiente para ~150 invitados |
| Almacenamiento de fotos | Cloudinary (plan gratuito) | Especializado en imágenes, gratuito para ~300 fotos optimizadas, evita sobrecargar la base de datos |
| Dominio | Proveedor tipo Namecheap o similar | Registro anual dentro del presupuesto |
| Repositorio | GitHub (privado) | Control de versiones, conectado a Vercel para despliegue continuo |
| Email notificaciones | Servicio transaccional (a definir en implementación, ej. Resend) | Envío del aviso a los administradores en cada nueva confirmación |

### 5.1 Modelo de datos (alto nivel)

- **guests_responses**: id, nombre invitado principal, asistencia (sí/no), menú propio, alergias propias, uso autobús ida, uso autobús vuelta, franja horaria vuelta, necesidades especiales, consentimiento privacidad, fecha de envío.
- **companions**: id, response_id (FK), nombre, tipo de menú (normal/infantil), alergias.
- **site_content**: configuración editable (horarios de autobús, textos, datos de hoteles, dress code, etc.) — gestionado como archivo de configuración versionado, no como tabla editable vía UI.
- **admin_users**: credenciales del panel de administración (usuario/contraseña, almacenada con hash).
- **photos**: referencias a las imágenes alojadas en Cloudinary (metadatos, orden de visualización).

### 5.2 Dominio

Dominio elegido: **javierymaria2027.com** (a registrar durante la fase de implementación, verificando disponibilidad real en el proveedor).

---

## 6. Seguridad y protección de datos

- **Contraseña de acceso al sitio**: una única contraseña sencilla (ej. fecha de la boda), compartida junto con el enlace.
- **Panel de administración**: usuario/contraseña independiente, específico para Javier y María.
- **Protección anti-spam/bots** en el formulario público de RSVP.
- **Cumplimiento de protección de datos (RGPD/LOPDGDD)**:
  - El formulario recoge datos personales y, en el caso de alergias/intolerancias, datos de categoría especial (relacionados con la salud).
  - Se incluirá un **texto informativo de privacidad** breve junto a una **casilla de consentimiento obligatoria** para poder enviar el formulario.
  - Al dar de baja la web (ver sección 8), se **eliminarán los datos personales** de la base de datos en producción. Los novios conservarán, si lo desean, la exportación final en Excel para su propio archivo personal.

---

## 7. Presupuesto estimado

| Concepto | Coste estimado |
|---|---|
| Dominio (1 año) | ~10-15 €/año |
| Hosting (Vercel) | 0 € (plan gratuito) |
| Base de datos (Supabase) | 0 € (plan gratuito) |
| Almacenamiento de fotos (Cloudinary) | 0 € (plan gratuito) |
| **Total estimado** | **~10-15 €/año** (dentro del límite de 50 €/año establecido) |

---

## 8. Despliegue y ciclo de vida

1. **Desarrollo**: implementación asistida por Claude Code, con repositorio en GitHub.
2. **Lanzamiento**: despliegue en Vercel con dominio propio, con antelación suficiente para enviar el enlace por WhatsApp y dar tiempo a las confirmaciones (objetivo: todas las respuestas recogidas un mes antes del 10/04/2027).
3. **Fase post-boda**: activación de la galería de fotos unas semanas después del evento (subida manual por los novios desde el panel).
4. **Baja del servicio**: pasados unos meses tras la boda (una vez los invitados hayan descargado las fotos de interés):
   - Exportación final del listado de invitados a Excel.
   - Eliminación de los datos personales de la base de datos.
   - Baja de los proyectos en Vercel y Supabase (sin coste, al ser planes gratuitos).
   - No renovación del dominio al finalizar el periodo contratado.

---

## 9. Mantenimiento

- No se contempla un contrato de mantenimiento formal ni SLA. Ante cualquier incidencia o solicitud de cambio (texto, horarios, contenido, ajustes de diseño), los novios lo solicitarán directamente y se aplicará el cambio de forma puntual, con despliegue en minutos gracias a la integración continua GitHub → Vercel.
- No se requiere monitorización activa ni alertas de disponibilidad, dado el carácter temporal y de bajo tráfico del proyecto.

---

## 10. Resumen de decisiones clave (histórico)

| Tema | Decisión |
|---|---|
| Acceso invitados | Enlace público único vía WhatsApp, sin login individual |
| Seguridad de acceso | Contraseña única sencilla para toda la web |
| Edición de respuestas RSVP | No permitida; cambios se gestionan manualmente por los novios |
| Fecha límite RSVP | No hay; se gestiona con recordatorios manuales |
| Detalle de acompañantes | Individual: nombre, tipo de menú, alergias por acompañante |
| Autobuses | Ida (iglesia→finca) + vuelta (finca→ciudad) con 3 franjas horarias |
| Multilenguaje | No necesario |
| Galería de fotos | Post-boda, ~300 fotos optimizadas, descarga individual, sin ZIP |
| Edición de contenido | Vía archivo de configuración + asistencia de desarrollo, sin CMS visual |
| Notificaciones admin | Email automático en cada nueva confirmación |
| Stack técnico | Next.js + Vercel + Supabase + Cloudinary + GitHub |
| Dominio | javierymaria2027.com |
| Presupuesto | ~10-15 €/año (dominio), resto gratuito |
| Ciclo de vida | Baja del servicio unos meses después de la boda |

---

## 11. Próximos pasos

1. Verificar disponibilidad y registrar el dominio `javierymaria2027.com`.
2. Crear repositorio en GitHub y proyectos en Vercel / Supabase / Cloudinary.
3. Definir estructura visual y componentes base (maquetación) alineada con las referencias de estilo.
4. Implementar contenido informativo, formulario de RSVP y panel de administración.
5. Pruebas en dispositivos móviles (iOS/Android) y navegadores principales.
6. Lanzamiento y envío del enlace por WhatsApp a los invitados.
