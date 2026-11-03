# Revisión visual · 3 de noviembre de 2026

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
