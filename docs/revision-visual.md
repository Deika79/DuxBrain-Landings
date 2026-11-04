# Revisión visual · 4 de noviembre de 2026

Actualización de producto real: seis capturas revisadas e integradas, con roles, textos alternativos y enlaces a la imagen completa. Gestión utiliza campus-gestion-saneada.png con las dos identidades sustituidas por etiquetas ficticias mediante relleno opaco; el original se conserva fuera del repositorio y su antigua URL devuelve 404. En la franja azul noche se ajustan el contraste del pie, el enlace y el foco de teclado. secure-avisos.png sigue pendiente. Inventario, ubicaciones y sustituciones necesarias en [activos-pendientes.md](activos-pendientes.md). Las seis capturas enlazadas se han renovado con este estado.

Las notas del rediseño siguiente describen el diseño de base; donde mencionan una ilustración, esta ha sido sustituida por las capturas reales indicadas.

## Acabado visual actual en feature/landing-copy

Las seis capturas enlazadas corresponden al acabado actual, con las capacidades confirmadas por David. Se conservan sin cambios el contenido comercial, metadatos, precios y formulario. Plugin sigue centrado en estudiar sobre el temario existente; Campus, en reunir estudio, clases y gestión; Secure, en revisar accesos y contenidos dentro del mismo Campus.

- Rediseño en franjas de ancho completo: hero gris, beneficios blancos, demostración lavanda, capítulos blancos/grises, integración o gestión azul noche, capacidades complementarias en turquesa suave y cierre púrpura. Máximo interior de 1200 px. Se combinan columnas abiertas y bloques divididos sin sucesión de tarjetas blancas.
- H1 de 64 px en escritorio y 40 px en móvil; H2 de 46 px y 34 px. Texto principal de 19/17 px, FAQ de 21/19 px, campos de 17 px, etiquetas de 16 px y notas de 14 px. Espacios de sección de 96/64 px. Decisiones y referencia en [rediseno-visual.md](rediseno-visual.md).
- Rótulo legible encima de la ilustración: «Representación ilustrativa / No es una captura del producto». Se retira la barra que simulaba una ventana de navegador y se aumenta el tamaño del texto del ejemplo. El marco conserva el radio de 24 px de la marca.
- Identidad oficial: `DuxBrain-04.png` en cabecera y pie claros. Márgenes transparentes compensados sin deformar el original. Tamaño visible de 176 px en escritorio y 148 px en cabecera móvil; 176 px en el pie. `DuxBrain2.png` como icono de pestaña.
- CTA móvil adelantado tras la propuesta para permanecer visible a 390 × 844 con el texto ampliado. Formulario visible en escritorio, enlaces de sección con áreas de al menos 46 px y botones de al menos 56 px. Navegación por teclado y contraste de texto revisados; sin desbordamientos a 320, 390, 768 y 1440 px.

**Identidad resuelta; capturas del producto pendientes:** los PNG han sido aportados localmente. El conector EBAU no proporciona una sesión utilizable tras reintentar. Se mantiene la ilustración anterior y se detallan las siete capturas de producto necesarias en [activos-pendientes.md](activos-pendientes.md). Las capturas locales de revisión no se presentan como pantallas reales del producto.

Validación actual: lint, 26 pruebas de servicios simulados y build de producción. Revisión con Chrome a 1440 × 1000 y 390 × 844 en las tres rutas, incluida atribución, CTA, FAQ y error de configuración simulado. CSS generado con HTTP 200 y `text/css`, sin errores en consola durante la carga. También se revisan éxito, error e incertidumbre de envío con respuestas interceptadas. Ninguna prueba llega a Google Sheets ni SMTP; `LEADS_SHEETS_WRITES_ENABLED=false`.

Capturas finales tomadas en `http://localhost:3000` después de reiniciar el proceso antiguo de este mismo proyecto. Repetir con `node scripts/review-landings.mjs http://localhost:3000`. La comprobación adicional `node scripts/check-lead-form.mjs` usa un servidor local en el puerto 3100. Resultados en [capturas/revision.json](capturas/revision.json). La matriz de afirmaciones está en [revision-contenido.md](revision-contenido.md).

## Contexto histórico de la revisión inicial

Las notas siguientes describen la primera revisión; los resultados actuales son los del apartado anterior. El formulario ha evolucionado desde aquella revisión y ya dispone de API, bloqueada hasta completar su configuración.

Proyecto existente duxbrain-landings. Sin despliegue. Servidor local de producción en http://localhost:3000.

## Capturas finales de página completa

Capturadas con Playwright y Chrome instalado en Windows, tras ejecutar el build de producción, a escala 1 y esperando las fuentes. El navegador integrado falló con `codex/sandbox-state-meta: missing field sandboxPolicy`. Se instaló únicamente @playwright/test como dependencia de desarrollo; no fue necesario descargar otro navegador.

| Ruta | Escritorio 1440 × 1000 | Móvil 390 × 844 |
| --- | --- | --- |
| [/plugin](http://localhost:3000/plugin) | [Captura](capturas/plugin-escritorio.png) | [Captura](capturas/plugin-movil.png) |
| [/campus](http://localhost:3000/campus) | [Captura](capturas/campus-escritorio.png) | [Captura](capturas/campus-movil.png) |
| [/campus-secure](http://localhost:3000/campus-secure) | [Captura](capturas/campus-secure-escritorio.png) | [Captura](capturas/campus-secure-movil.png) |

## Correcciones realizadas

- Titular con tamaño máximo de 60 px y espaciado de letras menos cerrado; mejora los saltos y la proporción con el formulario.
- Cabecera y arranque más compactos en móvil. Enlace Demo en cabecera con área de 44 px y CTA principal visible en el primer pantallazo a 390 × 844 en las tres rutas.
- Aviso de privacidad a 12 px, aviso del formulario a 11 px y pie de demostración a 12 px.
- Panel ilustrativo de IA/controles visible en móvil, apilado bajo el contenido, con texto más grande. Antes quedaba oculto por completo bajo 600 px.
- Menos espacio vertical alrededor de la demostración en móvil.
- Aclaración al lado del precio de Campus Secure: mismo Campus y mismo precio, con foco en seguridad.

Las seis capturas finales se inspeccionaron visualmente: sin cortes ni desbordamiento horizontal, CTA y formulario legibles, contrastes de marca sobre superficies claras y cierre púrpura. Las imágenes son mockups identificados como ilustrativos, sin pruebas de producto o clientes inventados.

## Validación

- npm run lint: correcto.
- npm run build: correcto; las cuatro rutas se prerenderizan.
- npm audit --omit=dev: 0 vulnerabilidades. La instalación sigue señalando 16 avisos moderados de desarrollo en la cadena ESLint/minimatch. No se ejecutó audit fix --force.
- Seis vistas con HTTP 200, sin errores JavaScript y ancho del documento igual al viewport.
- FAQ probada; CTA móvil probado hasta #demo.
- Formulario probado con datos ficticios locales: muestra el error explícito de conexión pendiente y no realiza solicitudes POST.
- Script repetible: `node scripts/review-landings.mjs` con el servidor en localhost:3000. Resultados en capturas/revision.json. Capturas tomadas antes de rellenar el formulario.

## Logos pendientes

public/brand/ contiene solo README.md; no se encontraron PNG en el proyecto. Se mantiene DuxBrain como texto. Faltan el logo oficial oscuro sobre transparente para cabecera/pie claros y la variante oficial blanca sobre transparente para superficies oscuras. Nombres propuestos: duxbrain-logo.png y duxbrain-logo-white.png; si los originales tienen otros nombres, conservarlos y usar sus nombres reales. No se ha inventado ni convertido ningún logo.

## Decisiones comerciales pendientes

- Definición contractual de alumno activo, impuestos, mínimos si los hubiera y condiciones finales de los precios de referencia: Plugin 0,99 €; Campus y Campus Secure 3,99 € por alumno activo al mes.
- Compatibilidad de cada LMS y alcance concreto de integración.
- Configuración y límites reales de controles de accesos, sesiones y reproducción. No se ofrece protección infalible ni se confirman DRM o MCP.
- Capturas reales del producto para sustituir la ilustración, cuando estén disponibles.
- Destino real del formulario y validación del aviso antes de conectarlo. Continúa sin envíos ni éxitos ficticios.
