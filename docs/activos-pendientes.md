# Activos de marca y producto · 4 de noviembre de 2026

## Inventario revisado e integración

Se han inspeccionado visualmente los seis PNG de origen de public/product/, sin asumir su contenido por el nombre. Los nombres coinciden con los destinos propuestos, pero el contenido limita lo que cada uno demuestra. No se han encontrado metadatos EXIF, XMP, IPTC o comentarios en estos archivos.

| Archivo y dimensiones | Pantalla y rol visibles | Estado y ubicación |
| --- | --- | --- |
| plugin-chat.png · 976 × 790 | Estudio, vista de alumno: pregunta sobre romanización en Hispania, respuesta con referencias y pestañas de herramientas. | Integrada como principal de /plugin. Sin nombres personales, correos o URL visibles. El identificador corto etiquetado CONVERSACIÓN no es una credencial ni un enlace de acceso visible. |
| plugin-estudio.png · 931 × 807 | Estudio, vista de alumno: fragmento del mapa conceptual de la Monarquía Hispánica y sus instituciones. | Integrada en Herramientas de /plugin. El original tiene ramas recortadas: el pie la describe como detalle. No demuestra podcasts, resúmenes u otras herramientas solo por tener sus pestañas. |
| campus-cursos.png · 1178 × 855 | Vista de alumno: Mis cursos de Academia EBAU Demo, con Física II e Historia de España y material gráfico educativo. | Integrada como principal de /campus. Sin datos identificables de alumnos o docentes. |
| campus-aula-video.png · 1655 × 822 | Vista de alumno: lección de Historia con reproductor e identificación ficticia Alumno Demo. | Integrada en Clases y vídeo de /campus. Muestra una lección con vídeo; no una videollamada, ni acredita por sí sola medidas contra la captura. No se presenta como aula virtual o prueba de seguridad. |
| campus-gestion-saneada.png · 1530 × 772 | Administración: Accesos y matrículas, filtros y tabla de estudiantes. | Integrada en Matrículas y cobros de /campus. Las dos celdas de correo se sustituyen con relleno opaco por Alumno demo 01 y Alumno demo 02. El original nunca se sube. |
| secure-umbrales.png · 1240 × 768 | Administración: configuración de umbrales y periodos para navegador/sistema y peticiones de vídeo; solo asoma el siguiente panel de conexiones. | Integrada como principal de /campus-secure. No muestra avisos ni casos, IP, ubicación o identidades. Los valores visibles son los de la demo; no se anuncian como configuración universal o garantía. |

Los seis archivos integrados no muestran contraseñas, tokens de acceso, DNI, IP, ubicaciones de usuarios, datos financieros ni identidades de terceros en la revisión visual. Las referencias geográficas o personales del contenido de Historia son material educativo. No se ha retocado ninguna imagen ni fabricado una pantalla.

## Gestión saneada y original privado

A petición del propietario se crea campus-gestion-saneada.png a partir del original, sustituyendo íntegramente las dos celdas de correo mediante parches RGB blancos opacos con las etiquetas Alumno demo 01 y Alumno demo 02. No se utiliza desenfoque, pixelado ni reconstrucción generativa.

Regiones de sustitución en el original de 1530 × 772: x=112, y=664, ancho=340, alto=51; y x=112, y=727, ancho=340, alto=45. Todo el contenido de estas regiones se reemplaza antes de exportar. Se comprueban los píxeles fuera de las dos regiones: cero diferencias. PNG plano RGB de tres canales, sin alfa, capas, EXIF, XMP, IPTC, comentarios ni miniatura del original. Solo contiene las cabeceras PNG, dimensiones de píxel, datos de imagen e indicador de fin.

Se revisan las dos celdas ampliadas al 300 % y la imagen completa. No se observan otros correos, DNI, IP, ubicaciones de usuarios, tokens, contraseñas o datos financieros. Los identificadores numéricos de filas y las fechas son los visibles en la demo, sin identidades asociadas; las cifras de la interfaz no se usan como resultados comerciales.

El original se conserva intacto en ../activos-privados-duxbrain/campus-gestion-original.png, carpeta hermana situada fuera de duxbrain-landings y fuera de public/. Su SHA-256 se compara antes y después del traslado. No se guarda ninguna copia del original en el repositorio; .gitignore conserva la exclusión de la antigua ruta como prevención, pero la protección efectiva es haber retirado el archivo de public/.

Tras actualizar las referencias remotas con git fetch, se consulta todo el historial disponible por la antigua ruta y por el identificador Git del contenido original: sin coincidencias. No se reescribe historial. La URL /product/campus-gestion.png debe devolver 404; solo /product/campus-gestion-saneada.png sirve la copia aprobada. La revisión de Chrome comprueba ambas condiciones.

## Pendientes

- secure-avisos.png: no existe porque la academia demo todavía no tiene avisos. Pendiente una captura real con casos de demostración y datos ficticios, cuando esté disponible. No se necesita inventar casos ni poblar la academia para esta tarea. La configuración real ya sustituye a la ilustración principal de Secure.
- Gestión: resuelta con la copia saneada. No restaurar el original en public/.

## Presentación y verificación

Las imágenes se declaran en src/content/product-images.ts, con dimensiones, texto alternativo y pie que identifica pantalla y rol. Se utiliza next/image, sin recortes adicionales ni superposiciones de controles. Cada imagen ofrece Abrir captura completa en otra pestaña: permite ampliar el original en móvil, incluso cuando el texto de la miniatura es pequeño. Un enlace al original no recupera el contenido que ya estaba fuera del encuadre de la captura.

Las tres representaciones editoriales se han retirado al disponer de capturas reales principales. No queda un panel de avisos ficticio. Los únicos ajustes de texto comercial describen fielmente las nuevas demostraciones; precios, metadatos y formulario se conservan. Logos oficiales DuxBrain-04.png en superficies claras y DuxBrain2.png como icono, sin modificaciones.

Revisión final con Chrome a 1440 y 390 px y seis capturas completas en docs/capturas/. Las pruebas de formulario interceptan la API. LEADS_SHEETS_WRITES_ENABLED=false; sin escrituras, correos reales, merge o despliegue.
