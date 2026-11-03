# Revisión de contenido para campañas Meta

Base: master en `ad03d33`. Rama: feature/landing-copy. Se leyeron los textos, metadatos de las tres rutas y las seis capturas de docs/capturas/ antes de editar. Las capturas iniciales mostraban propuestas genéricas, un mismo ejemplo poco concreto en Plugin/Campus y un panel de Secure que podía interpretarse como controles disponibles.

## Evidencia y límites

- **Confirmado para esta redacción por el propietario:** IA educativa basada en contenidos de la academia; ayuda con dudas, explicaciones alternativas y materiales de estudio. Campus reúne cursos, contenidos, alumnado y seguimiento. Plugin añade IA a la plataforma existente, sujeto a comprobar integración. Moodle es una referencia, no garantía universal de compatibilidad.
- **Precios autorizados:** Plugin 0,99 € y Campus 3,99 € por alumno activo al mes. Secure presenta el mismo Campus y precio. No se utilizó una propuesta antigua de cuatro planes ni otros precios.
- **Sin evidencia técnica adicional:** el repositorio contiene las landings y la captura de leads, no el código del Campus. La consulta de solo lectura al conector DuxBrain EBAU Demo no obtuvo datos tras dos respuestas de autenticación; no se consultaron alumnos ni se modificó la academia. Las descripciones de herramientas no demuestran que un control esté incluido en el Campus de 3,99 €.
- Los mockups son ilustraciones editoriales, nunca capturas ni conversaciones reales del producto. No se añaden clientes, testimonios, métricas o resultados inventados.

## Matriz de decisiones

| Afirmación actual | Evidencia disponible | Decisión | Texto nuevo / tratamiento |
| --- | --- | --- | --- |
| Plugin: «Tu plataforma de siempre. Ahora, con IA sobre tu temario.» | Plataforma existente + IA basada en sus contenidos, según propietario. | Hacer explícito el uso y el público. | «IA sobre tu temario. En tu campus actual.»; dudas, otra explicación y repaso. |
| Plugin: «Dale el siguiente impulso.» / «Dentro de su LMS» / «Sin empezar de cero» | Mensajes sin ejemplo; dos beneficios repetían conservar el entorno. | Reemplazar por tres usos distintos. | Resolver una duda, entenderla de otra forma y preparar el repaso. |
| Ejemplo: «¿Me ayudas a entender este tema?» con respuesta genérica | Capacidad de explicar basada en material confirmada; no hay conversación real disponible. | Mostrar un caso editorial concreto y etiquetado. | Alumno pregunta qué es una variable; respuesta toma el Tema 1 ficticio y usa horas de estudio como ejemplo. Sin simular citas o trazabilidad técnica no confirmadas. |
| FAQ Plugin: «¿Es compatible con mi LMS?» sin comprobaciones concretas | Moodle es referencia; no se confirma compatibilidad con cualquier LMS. | **REQUIERE CONFIRMACIÓN por integración.** Añadir comprobaciones, no una promesa. | Versión/configuración, acceso de alumnos, permisos y disponibilidad/formato de materiales antes de contratar. |
| Campus: «Toda tu academia» / «hacer crecer tu academia» | Cursos, contenidos, alumnado y seguimiento confirmados; no hay evidencia de crecimiento comercial. | Quitar amplitud y resultados difíciles de demostrar. | «Cursos y alumnado. Con IA para estudiar.»; el subtítulo reúne enseñanza y seguimiento en Campus. |
| Campus: «Alumnos, clases y gestión» como lista de funciones | El contexto actual confirma enseñanza y seguimiento; no concreta todo el catálogo administrativo. | Priorizar el recorrido comprensible para dirección. | Organizar curso → publicar material → estudiar con IA → seguir actividad. |
| FAQ Campus: «¿Qué información de seguimiento voy a ver?» ausente | Herramientas de actividad confirmadas; no informes/indicadores específicos. | **REQUIERE CONFIRMACIÓN de vistas y datos.** | Explicar el uso docente y revisar las vistas reales en demo; no prometer métricas concretas. |
| Secure: «Control de accesos», «Gestión de sesiones», «Control de reproducción» y símbolos de control activo | No hay confirmación técnica de esos mecanismos dentro de Campus de 3,99 €. | **REQUIERE CONFIRMACIÓN.** Retirar la presentación como prestaciones incluidas y el panel que lo sugería. | «¿Se comparten accesos a tu curso? Revisa qué puedes controlar.»; ilustración como guion de preguntas, sin interruptores ni estados activos. |
| Secure: «Tu contenido tiene valor» | No explica el problema desde el anuncio. | Abrir con acceso compartido y formación de pago que circula fuera. | Revisar quién debe acceder, qué material preocupa y qué necesita limitar la academia. Son necesidades, no funcionalidades garantizadas. |
| Secure como posible plan separado | El propietario confirma mismo producto y precio. | Mantener explícito en hero, beneficios y FAQ. | «El mismo DuxBrain Campus. Mismo precio, con el foco en seguridad.» |
| Restricciones de dispositivos, IP, geografía, DRM, marcas de agua o antifraude | No confirmadas para esta oferta. | **REQUIERE CONFIRMACIÓN de disponibilidad y precio.** No añadirlas a las landings. | Sin promesa de controles específicos ni imposibilidad de copiar/grabar. La propuesta debe fijar el alcance. |
| IA presentada sin límites en las FAQ | El propietario confirma ayuda de estudio, no infalibilidad ni sustitución docente. | Añadir objeción sobre papel del profesor. | Ayuda basada en contenido que puede equivocarse; material y criterio docente como referencia. |
| «0,99 €» / «3,99 €» | Precios vigentes autorizados por el propietario. | Conservar precios de referencia y unidad. | **REQUIERE CONFIRMACIÓN:** alumno activo, impuestos y condiciones finales. No añadir mínimos ni planes antiguos. |
| Cierres y CTA genéricos («Hablemos…», «Quiero ver…») | El objetivo de conversión es solicitar demo. | Coherencia del CTA y cierre propio de cada público. | Solicitar una demo; revisar plataforma (Plugin), recorrer un curso (Campus), traer un caso de acceso (Secure). |
| Metadatos generales, con promesas amplias de campus completo/control | Mismo contexto confirmado; los metadatos también son contenido comercial. | Títulos y descripciones específicos por ruta. | Temario/campus actual; cursos/alumnos/IA; accesos compartidos/contenido de pago y revisión de límites. |

## Decisiones de implementación

El contenido específico, incluidos ejemplos editoriales, recorrido y cierre, vive en src/content/landings.ts. Los metadatos de cada page.tsx ya consumían ese contenido y reciben los títulos/descripciones nuevos sin duplicarlos.

Se adapta el componente compartido únicamente para mostrar el ejemplo y las preguntas correctos, los cuatro pasos de Campus y los cierres específicos. El formulario solo cambia título y entradilla: no se modifican campos, validación, captura de UTM, identificador, endpoint, estados ni protección contra duplicados. No hay cambios en src/server/, .env.example o el interruptor de escrituras.

## Comprobaciones de esta rama

Lint, las 26 pruebas existentes y build correctos. Se revisan las tres rutas a 1440 × 1000 y 390 × 844 con Chrome de Windows/Playwright tras fallar el navegador integrado por sandboxPolicy. Las seis capturas se regeneran desde el build local, no desde una maqueta. Solicitudes del formulario interceptadas con respuestas simuladas: no se escribe en Sheets ni se envían correos reales.

En la primera revisión se detectó «IA.» aislado al final del titular móvil de Campus y «tema.» aislado en el título de beneficios de Plugin en escritorio. Se acortan ambos titulares para mejorar la lectura. No hay cambios de identidad ni nueva librería.

El script de revisión comprueba HTTP 200, metadatos propios, ausencia de errores JavaScript/desbordamiento horizontal, CTA móvil dentro del primer pantallazo, FAQ y recepción de landing/UTM/anuncio en la solicitud interceptada. El script adicional check-lead-form comprueba éxito simulado, configuración ausente y recepción incierta: bloqueo y datos conservados. Capturas en [docs/capturas](capturas/) y datos en [revision.json](capturas/revision.json). El backend y LEADS_SHEETS_WRITES_ENABLED=false permanecen sin cambios.

## Antes de publicar

- Confirmar compatibilidad y requisitos del LMS concreto, formatos/materiales admitidos y alcance de puesta en marcha.
- Confirmar vistas/datos de seguimiento y materiales de estudio disponibles en la oferta comercial.
- Confirmar qué controles reales de acceso/uso se incluyen en Campus de 3,99 € y sus límites; dispositivos, IP, geografía, DRM, marcas de agua y antifraude siguen sin afirmarse.
- Confirmar definición de alumno activo, impuestos y condiciones de precio. Secure conserva el mismo producto/precio.
- Sustituir ilustraciones por material real solo si se dispone de él, con autorización; los logos oficiales siguen pendientes.
