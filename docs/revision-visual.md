# Revisión visual · 3 de noviembre de 2026

## Acabado visual actual en feature/landing-copy

Las seis capturas enlazadas corresponden al acabado actual, con las capacidades confirmadas por David. Se conservan sin cambios el contenido comercial, metadatos, precios y formulario. Plugin sigue centrado en estudiar sobre el temario existente; Campus, en reunir estudio, clases y gestión; Secure, en revisar accesos y contenidos dentro del mismo Campus.

- Secciones de funciones con título y explicación a la izquierda y detalles agrupados a la derecha en escritorio; en móvil se apilan. Menos tarjetas independientes, bordes y espacios repetidos, sin eliminar funciones.
- Rótulo legible encima de la ilustración: «Representación ilustrativa / No es una captura del producto». Se retira la barra que simulaba una ventana de navegador y se aumenta el tamaño del texto del ejemplo. El marco conserva el radio de 24 px de la marca.
- Pie oscuro con texto blanco, enlaces identificables y texto secundario de mayor contraste. El nombre sigue siendo texto provisional; no se ha creado un logo.
- Primer pantallazo y formulario conservados: CTA visible a 390 × 844, precio y propuesta específica por ruta. Navegación por secciones, FAQ y CTA revisados en ambas resoluciones.

**Activos bloqueados por acceso:** no hay PNG en `public/brand/`, Drive redirige a iniciar sesión y el conector EBAU no proporciona una sesión utilizable tras reintentar. Se mantiene la ilustración anterior y se detallan los dos logos y siete capturas de producto necesarios en [activos-pendientes.md](activos-pendientes.md). Las capturas locales de revisión no se presentan como pantallas reales del producto.

Validación actual: lint, 26 pruebas de servicios simulados y build de producción. Revisión con Chrome a 1440 × 1000 y 390 × 844 en las tres rutas, incluida atribución, CTA, FAQ y error de configuración simulado. También se revisan éxito, error e incertidumbre de envío con respuestas interceptadas. Ninguna prueba llega a Google Sheets ni SMTP; `LEADS_SHEETS_WRITES_ENABLED=false`.

Repetir con `node scripts/review-landings.mjs http://localhost:3100` y `node scripts/check-lead-form.mjs`, con el servidor local de producción iniciado en el puerto 3100. Resultados en [capturas/revision.json](capturas/revision.json). La matriz de afirmaciones está en [revision-contenido.md](revision-contenido.md).

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
