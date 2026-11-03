# Activos oficiales pendientes · 3 de noviembre de 2026

## Resultado de los accesos

- Resuelto: el propietario ha copiado los PNG en `public/brand/`. Se usa `DuxBrain-04.png` en cabecera y pie claros de las tres landings y `DuxBrain2.png` como icono de pestaña. Se conservan sus nombres y proporciones originales. El acceso anterior a Drive pedía iniciar sesión; ya no bloquea la integración de identidad.
- El navegador integrado falla antes de abrir una sesión con `codex/sandbox-state-meta: missing field sandboxPolicy`. Se ha utilizado Chrome instalado con Playwright para la revisión local.
- El conector DuxBrain EBAU Demo responde que la autenticación se ha solicitado y aceptado y pide reintentar; el reintento devuelve el mismo mensaje, sin acceso a la academia ni sesión navegable. No se han consultado alumnos ni realizado operaciones en el campus.

Logos oficiales incorporados. Siguen pendientes las capturas reales del producto. Se conserva la ilustración anterior, con un rótulo visible fuera del marco: «Representación ilustrativa / No es una captura del producto». El ejemplo no acredita el aspecto real de ninguna pantalla. Las seis imágenes de `docs/capturas/` son capturas de las landings locales, no del producto.

## Identidad resuelta

No faltan activos para la cabecera, pie o icono actuales. Se han compensado los márgenes transparentes de `DuxBrain-04.png` mediante CSS sin modificar el PNG. El pie se presenta sobre blanco para utilizar la misma variante oscura indicada por el propietario.

La variante opcional `DuxBrain_sinfondo_celeste(1).png` solo se necesitaría si se añade un logo sobre fondo oscuro. No se utiliza en este diseño ni se ha sustituido por otro archivo de nombre parecido. Detalles en [public/brand/README.md](../public/brand/README.md).

## Siete capturas prioritarias necesarias

Los siguientes nombres son destinos propuestos para organizar las capturas, no archivos ya existentes. Entregar PNG originales sin compresión de mensajería; anchura recomendada de 1440 px o superior, con el área de interés completa. No incluir la barra del navegador. Indicar si la pantalla corresponde al rol alumno o administración.

| Destino propuesto en `public/product/` | Pantalla real requerida | Uso |
| --- | --- | --- |
| `plugin-chat.png` | Alumno con un tema ficticio abierto y una pregunta y respuesta reales del chat sobre ese material; debe verse la relación con el tema. | Principal de Plugin |
| `plugin-estudio.png` | Herramientas sobre ese mismo tema, por ejemplo resumen, mapa o flashcards generados con material ficticio. | Herramientas de estudio |
| `campus-cursos.png` | Vista de cursos o inicio del alumno con cursos de demostración. | Principal de Campus |
| `campus-aula-video.png` | Lección con vídeo alojado o aula con una grabación de demostración, sin rostros ni participantes reales. | Clases y vídeo |
| `campus-gestion.png` | Gestión de cursos o matrículas exclusivamente ficticias, sin datos de pago ni registros de personas reales. | Gestión de Campus |
| `secure-avisos.png` | Panel real de avisos con casos sintéticos claramente identificados, sin IP, ubicaciones, dispositivos o identidades de personas reales. | Principal de Campus Secure |
| `secure-umbrales.png` | Configuración real de periodos y umbrales de los avisos, sin secretos ni datos de terceros. No hace falta cambiar ni guardar valores. | Configuración de seguridad |

No es necesario mostrar todas las funciones en una única captura. Si una pantalla no existe o no resulta adecuada para publicación, indicarlo para mantener la representación ilustrativa. Solo añadir pantallas que correspondan a las capacidades confirmadas. No fabricar pantallas de MCP, avisos o herramientas de estudio.

Antes de copiar un activo a `public/`, revisar todos los píxeles: nombres, correos, DNI, avatares, notificaciones, direcciones IP, URL con tokens, contraseñas, códigos de acceso y datos financieros. Usar exclusivamente una demo con datos ficticios; no compartir credenciales por chat ni incorporar datos personales al repositorio. Las descargas identificadas, si se muestran en el futuro, deben utilizar también una identidad completamente ficticia.

## Integración pendiente al recibir los archivos

Sustituir la representación en `VisualDemo` por una captura real pertinente a cada ruta, con `next/image`, dimensiones explícitas, proporción conservada y pie descriptivo del rol y pantalla. No superponer textos que simulen controles ni recortar la información necesaria para entender la función. En móvil seleccionar un encuadre legible y permitir consultar la imagen completa. Validar de nuevo las seis vistas.

Los textos comerciales, precios, metadatos, campos, atribución y lógica del formulario se conservan. `LEADS_SHEETS_WRITES_ENABLED=false`; entrega real todavía pendiente de configurar y verificar. Este trabajo no despliega ni activa envíos.
