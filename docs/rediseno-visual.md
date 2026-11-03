# Rediseño visual de las landings

## Referencia y criterio

Se ha examinado la [referencia de Opoenea](https://opoenea.com/landing/oposiciones-infantil/) con Chrome a 1440 y 390 px: jerarquía tipográfica marcada, capítulos de fondo completo, demostración con más espacio y CTA reconocibles. La captura de referencia es solo material local de revisión, no se incorpora al repositorio ni a las landings. El navegador integrado sigue fallando al conectar; se utiliza Chrome instalado con Playwright.

Se adopta el ritmo de lectura, manteniendo Bai Jamjuree, la paleta, los logos oficiales y el contenido de DuxBrain. No se copian textos, recursos gráficos, cifras, testimonios, formas distintivas ni colores de la referencia.

## Escala y composición

| Elemento | Escritorio | Móvil |
| --- | --- | --- |
| H1 | 64 px / 1,08 | 40 px / 1,08 |
| H2 de sección | 46 px / 1,12 | 34 px / 1,12 |
| Texto principal | 19 px / 1,65–1,7 | 17 px / 1,65–1,7 |
| FAQ | 21 px | 19 px |
| Campos / etiquetas | 17 / 16 px | 17 / 16 px |
| Precio | 60 px | 48 px |
| Notas y privacidad | 14 px | 14 px |
| Espaciado vertical de capítulos | 96 px por lado | 64 px por lado |

Formulario: título de 34/30 px y texto introductorio de 17 px. Los titulares de la ilustración tienen su propia escala por tratarse de contenido dentro del marco. Las líneas explicativas se limitan a unos 52–60 caracteres cuando la composición lo permite. Contenedores fluidos con máximo de 1200 px y 20 px de margen mínimo lateral.

El hero reúne propuesta y formulario en dos columnas en escritorio. En móvil el CTA aparece inmediatamente después de la explicación; al pulsarlo alcanza el mismo formulario, con sus campos y funcionamiento intactos. La demostración ocupa una franja lavanda con un marco de hasta 1040 px, rótulo de representación y tipografía legible. Se conservan el ejemplo y la aclaración de que no es una captura real del producto.

## Capítulos por landing

Los beneficios se agrupan en tres columnas abiertas sobre blanco, apiladas en móvil. Las primeras funciones se presentan en columnas y los siguientes capítulos combinan explicación y detalles, sin encerrar cada función en una tarjeta idéntica.

| Landing | Blanco | Gris muy claro | Azul noche | Turquesa suave |
| --- | --- | --- | --- | --- |
| Plugin | Herramientas de estudio | Progreso | Integración con el LMS | Descarga identificada |
| Campus | Clases y vídeo | Comunicación | Matrículas y cobros | Seguridad y MCP incluidos |
| Campus Secure | Configuración de avisos | Vídeo y descargas | Campus completo | Gestión con MCP |

Todas cierran con FAQ sobre blanco y una franja púrpura con CTA turquesa. La cabecera y el pie conservan fondo claro y `DuxBrain-04.png`; `DuxBrain2.png` permanece como icono de pestaña.

## Verificación y servidor local

- Lint, 26 pruebas simuladas y build de producción.
- Seis capturas completas con Chrome: 1440 × 1000 y 390 × 844. CTA, secciones, FAQ, atribución y respuesta de formulario probados sin llamadas reales a la API. Escenarios de éxito, configuración pendiente e incertidumbre también interceptados.
- Comprobación adicional de ancho y contraste de los textos principales a 320, 390, 768 y 1440 px; navegación por teclado desde el enlace para saltar al contenido. Revisión manual de las seis capturas. Esto no sustituye una auditoría integral con tecnologías de apoyo.
- Red y consola: CSS generado con HTTP 200 y tipo `text/css`; sin errores al cargar. El único error HTTP de la prueba del formulario es el 503 simulado e intencionado.
- El proceso antiguo del puerto 3000 pertenecía a este proyecto (`next start` desde su `node_modules`) y servía HTML anterior con recursos fallidos después de reconstruir `.next`. Se reinicia con el build actual; no se modifica otro proyecto. Para revisar un nuevo build de producción, reiniciar el servidor después de `npm run build`, o utilizar `npm run dev` para editar con recarga automática. No ejecutar builds mientras se pretende seguir usando un servidor de producción anterior.

Los contenidos de `src/content/landings.ts`, metadatos, precios y lógica del formulario no cambian. `LEADS_SHEETS_WRITES_ENABLED=false`. No hay nuevas dependencias, capturas de producto inventadas, despliegue ni envíos reales.
