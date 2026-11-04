# Formulario durante el recorrido

Una única instancia de `LeadForm` por landing conserva toda la lógica de validación, atribución, UUID, estados y protección contra dobles envíos. No se modifica la API ni se activa la entrega real. `LEADS_SHEETS_WRITES_ENABLED=false` permanece en la configuración de ejemplo.

Desde 1100 píxeles de ancho disponible, una columna lateral de 400 píxeles acompaña hero, beneficios, capturas y FAQ. Los contenidos reservan su espacio y las franjas siguen ocupando el ancho completo. El contenedor termina antes del cierre, de modo que el formulario se detiene antes del pie. En ventanas bajas o con zoom, su altura máxima depende del viewport y admite desplazamiento interno, también con teclado. El botón no se desplaza al pasar el puntero dentro de esta columna.

Por debajo de 1100 píxeles, el formulario está en el flujo después del hero. Una barra inferior con «Solicitar demo» respeta el área segura y lleva al mismo formulario, enfocando el primer campo habilitado. Se oculta cuando el formulario está visible o el pie está próximo. Hay espacio inferior y margen de desplazamiento para los controles de teclado. Los enlaces normales siguen funcionando sin JavaScript. El cambio a barra depende del ancho disponible: el zoom del navegador puede activarlo.

`node scripts/review-demo-rail.mjs http://localhost:3100` comprueba tres rutas, cuatro ventanas y dos niveles de zoom real (24 combinaciones), con perfiles temporales de Chrome propios. Comprueba inicio, demostración, FAQ, pie, unicidad del formulario, ausencia de desbordamiento, espacio reservado, foco y recorrido por todos los campos hasta enviar. Las peticiones a `/api/leads` se interceptan. [Resultados y capturas intermedias](capturas/scroll/revision.md).

`node scripts/review-landings.mjs http://localhost:3100` actualiza las seis capturas completas y comprueba CSS, imágenes, FAQ, anclas y envío simulado con atribución. `node scripts/check-lead-form.mjs` revisa los estados simulados de éxito, configuración ausente y respuesta incierta sobre ese mismo puerto. Ninguna de estas comprobaciones utiliza Google Sheets ni SMTP reales.
