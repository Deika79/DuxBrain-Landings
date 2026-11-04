# Activos de marca y producto · 4 de noviembre de 2026

## Inventario revisado e integración

Se han inspeccionado visualmente los seis PNG originales de public/product/, sin asumir su contenido por el nombre. Los nombres coinciden con los destinos propuestos, pero el contenido limita lo que cada uno demuestra. No se han encontrado metadatos EXIF, XMP, IPTC o comentarios en estos archivos.

| Archivo y dimensiones | Pantalla y rol visibles | Estado y ubicación |
| --- | --- | --- |
| plugin-chat.png · 976 × 790 | Estudio, vista de alumno: pregunta sobre romanización en Hispania, respuesta con referencias y pestañas de herramientas. | Integrada como principal de /plugin. Sin nombres personales, correos o URL visibles. El identificador corto etiquetado CONVERSACIÓN no es una credencial ni un enlace de acceso visible. |
| plugin-estudio.png · 931 × 807 | Estudio, vista de alumno: fragmento del mapa conceptual de la Monarquía Hispánica y sus instituciones. | Integrada en Herramientas de /plugin. El original tiene ramas recortadas: el pie la describe como detalle. No demuestra podcasts, resúmenes u otras herramientas solo por tener sus pestañas. |
| campus-cursos.png · 1178 × 855 | Vista de alumno: Mis cursos de Academia EBAU Demo, con Física II e Historia de España y material gráfico educativo. | Integrada como principal de /campus. Sin datos identificables de alumnos o docentes. |
| campus-aula-video.png · 1655 × 822 | Vista de alumno: lección de Historia con reproductor e identificación ficticia Alumno Demo. | Integrada en Clases y vídeo de /campus. Muestra una lección con vídeo; no una videollamada, ni acredita por sí sola medidas contra la captura. No se presenta como aula virtual o prueba de seguridad. |
| campus-gestion.png · 1530 × 772 | Administración: Accesos y matrículas, filtros, cifras y tabla de estudiantes. | EXCLUIDA. La columna ESTUDIANTE contiene dos direcciones de correo con nombres, aunque el dominio es de prueba. No se referencia ni se añade al commit. La sección de gestión queda sin imagen. |
| secure-umbrales.png · 1240 × 768 | Administración: configuración de umbrales y periodos para navegador/sistema y peticiones de vídeo; solo asoma el siguiente panel de conexiones. | Integrada como principal de /campus-secure. No muestra avisos ni casos, IP, ubicación o identidades. Los valores visibles son los de la demo; no se anuncian como configuración universal o garantía. |

Los cinco archivos integrados no muestran contraseñas, tokens de acceso, DNI, IP, ubicaciones de usuarios, datos financieros ni identidades de terceros en la revisión visual. Las referencias geográficas o personales del contenido de Historia son material educativo. No se ha retocado ninguna imagen ni fabricado una pantalla.

## Sustitución necesaria para gestión

En campus-gestion.png, sustituir las dos celdas de la columna ESTUDIANTE situadas bajo su cabecera, en la franja inferior: aproximadamente x=120–490, y=660–772 del original de 1530 × 772. Usar identificadores ficticios sin correo, por ejemplo Alumno Demo 01 y Alumno Demo 02, y comprobar cualquier fila adicional al volver a capturar.

El archivo original permanece localmente intacto e ignorado expresamente en .gitignore para evitar subirlo por accidente. Al recibir una versión limpia, revisarla visualmente otra vez y retirar la exclusión antes de incorporarla. No publicar este archivo con el estado actual.

## Pendientes

- secure-avisos.png: no existe porque la academia demo todavía no tiene avisos. Pendiente una captura real con casos de demostración y datos ficticios, cuando esté disponible. No se necesita inventar casos ni poblar la academia para esta tarea. La configuración real ya sustituye a la ilustración principal de Secure.
- campus-gestion.png: pendiente reemplazar la zona indicada. Sin imagen de gestión hasta entonces.

## Presentación y verificación

Las imágenes se declaran en src/content/product-images.ts, con dimensiones, texto alternativo y pie que identifica pantalla y rol. Se utiliza next/image, sin recortes adicionales ni superposiciones de controles. Cada imagen ofrece Abrir captura completa en otra pestaña: permite ampliar el original en móvil, incluso cuando el texto de la miniatura es pequeño. Un enlace al original no recupera el contenido que ya estaba fuera del encuadre de la captura.

Las tres representaciones editoriales se han retirado al disponer de capturas reales principales. No queda un panel de avisos ficticio. Los únicos ajustes de texto comercial describen fielmente las nuevas demostraciones; precios, metadatos y formulario se conservan. Logos oficiales DuxBrain-04.png en superficies claras y DuxBrain2.png como icono, sin modificaciones.

Revisión final con Chrome a 1440 y 390 px y seis capturas completas en docs/capturas/. Las pruebas de formulario interceptan la API. LEADS_SHEETS_WRITES_ENABLED=false; sin escrituras, correos reales, merge o despliegue.
