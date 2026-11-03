# Revisión de contenido para campañas Meta

Rama feature/landing-copy. Base del proyecto ad03d33; revisión anterior ce87322. **Esta actualización sustituye las restricciones editoriales anteriores sobre seguridad y MCP**, a partir de la confirmación de producto de David aportada por el propietario en esta conversación. Seguridad y MCP están incluidos en Campus; ya no se tratan como extras o prestaciones pendientes de inclusión.

## Oferta vigente y evidencia

La confirmación de David es la fuente de la oferta descrita a continuación. No se ha convertido un aviso de seguridad en una prueba de fraude ni se han inferido controles adicionales. La consulta del producto conectado que falló en la revisión anterior no limita ni invalida esta nueva confirmación explícita.

- Plugin: 0,99 € por alumno activo al mes. IA integrada con el temario; pregunta del día, resúmenes, mapas conceptuales, flashcards, podcasts, tests generados al momento, estadísticas de estudio, nota estimada y chat. La academia puede habilitar descargas del material con marca de agua y DNI o correo del alumno.
- Campus: 3,99 € por alumno activo al mes. Incluye Plugin; añade alojamiento de vídeo, aula virtual con grabaciones, facturación y pasarela de pago, facturas y cobros automáticos, cupones, ofertas, accesos y matrículas, calendario, foro, mensajes, correos y altas/bajas de alumnos. Módulo de seguridad y MCP incluidos para operar funciones del campus desde una IA compatible.
- Campus Secure: misma oferta y precio de Campus, presentada desde accesos y distribución de contenido de pago. No es un plan ni una tarifa adicional.

No se utilizan los cuatro planes o precios antiguos. No se inventan testimonios, clientes, datos de uso ni conversaciones reales. El ejemplo de chat y el esquema de avisos son ilustraciones editoriales claramente identificadas.

## Matriz de revisión actualizada

| Contenido anterior | Evidencia disponible | Decisión vigente | Texto o ejemplo nuevo |
| --- | --- | --- | --- |
| Plugin: ayuda genérica para dudas y repaso | David confirma chat, pregunta del día y práctica sobre el temario | Mantener experiencia primero y explicar usos | Alumno pregunta por una definición, vuelve con la pregunta del día y practica lo estudiado |
| Materiales de estudio sin nombrar herramientas | Resúmenes, mapas, flashcards, podcasts y tests al momento confirmados | Incluir en sección Herramientas, sin lista exhaustiva en hero | Resumen para ideas principales, mapa para relaciones, tarjetas/audio y test del tema |
| Estadísticas y nota estimada sin concreción | Ambas confirmadas | Incluir sección Progreso | Revisar actividad y orientar el siguiente repaso; estimación no equivale a nota oficial ni garantiza aprobar |
| Plugin solo en un LMS indeterminado | Integración con temario confirmada; no compatibilidad universal | Mantener revisión técnica de cada entorno | Versión, configuración, accesos, permisos y materiales antes de integrar |
| Descargas identificadas pendientes de confirmar | David confirma activación por academia, marca de agua y DNI o correo | Incluir después de Integración; también en Campus/Secure | La academia decide si permite la descarga; la copia queda identificada. No se promete impedir que se comparta |
| Campus reducido a cursos, contenido e IA | David confirma las funciones de Plugin y el entorno completo | Mostrar experiencia completa del alumno primero | Tema → chat → resumen/práctica → estadísticas/nota estimada |
| Vídeo y clases sin confirmar el alcance | Alojamiento de vídeo y aula virtual con grabaciones confirmados | Incluir sección Clases y vídeo | Volver al desarrollo grabado de un ejercicio tras una clase |
| Gestión administrativa relegada por falta de evidencia | Matrículas, accesos, altas/bajas, facturación/pasarela, facturas/cobros automáticos, cupones/ofertas confirmados | Incluir grupo Matrículas y cobros | Del alta al cobro del curso y su factura; promoción con cupón/oferta |
| Comunicación genérica | Calendario, foro, mensajes y correos confirmados | Agrupar en sección Comunicación | Fechas de clase y dudas compartidas en el foro o contacto por mensajes/correos |
| Seguridad como conjunto pendiente de inclusión en 3,99 € | David confirma módulo incluido en Campus | **Restricción anterior sin efecto** | Módulo incluido y avisos configurables; no tarifa adicional |
| Guion de preguntas en Secure sin describir señales | Confirmadas combinaciones distintas de navegador/sistema, peticiones de apertura de vídeo y conexiones simultáneas distintas | Describir esas tres señales exactamente | Beneficios por señal y esquema ilustrativo de revisión, sin casos reales o umbrales inventados |
| Configuración de seguridad no descrita | Periodos y umbrales configurables confirmados | Sección propia de configuración | Ajustar avisos a la operativa y revisar el contexto; un aviso no prueba fraude |
| Geografía tratada como capacidad no confirmada | Distancia estimada refuerza evaluación de conexiones simultáneas; sola no crea ni oculta casos | Explicitar la regla en sección y FAQ | Contexto adicional de simultaneidad, nunca prueba geográfica independiente |
| Protección del vídeo pendiente de confirmar | Medidas contra captura de pantalla confirmadas | Incluir sin garantía absoluta | Medidas contra captura de pantalla, sin prometer imposibilidad de grabar o copiar por cualquier medio |
| MCP como extra pendiente | Incluido para operar funciones desde una IA compatible | **Restricción anterior sin efecto** | Sección Seguridad y MCP en Campus; sección final de capacidad de gestión en Secure |
| Precios y definición de alumno activo | Precios confirmados; definición contractual/impuestos no detallados | Conservar precios y unidad; no inventar condiciones | FAQ conserva revisión de alumno activo, impuestos y condiciones finales |

## Orden de lectura implementado

El hero conserva un titular, un subtítulo y tres ideas breves. Bajo el hero hay navegación por secciones con anclas. El detalle se reparte en tarjetas breves y FAQ, no en un inventario único.

1. **Plugin:** experiencia de estudio y chat ilustrativo → Herramientas → Progreso → Integración → Descargas identificadas → FAQ y solicitud de demo.
2. **Campus:** experiencia completa del alumno y chat ilustrativo → Clases y vídeo → Matrículas y cobros → Comunicación → Seguridad y MCP → FAQ y solicitud de demo.
3. **Campus Secure:** problema de accesos y contenidos → señales/avisos y esquema ilustrativo → periodos, umbrales y geografía → Vídeo y descargas → Campus completo → Gestión con MCP → FAQ y solicitud de demo.

El contenido y sus metadatos viven en src/content/landings.ts. Los componentes compartidos muestran las secciones y las anclas. Las rutas mantienen sus metadatos propios mediante el contenido de cada página. No se añaden nuevas librerías ni imágenes que pretendan ser capturas reales del producto.

## Límites que siguen vigentes

- Avisos configurables no equivalen a prueba concluyente de fraude. No se afirman bloqueos automáticos, expulsión, imposibilidad de compartir cuenta ni límites numéricos por defecto.
- La distancia geográfica estimada refuerza conexiones simultáneas; por sí sola no crea ni oculta casos. No se describe geobloqueo ni una regla independiente basada en país/IP.
- Vídeo: medidas contra captura de pantalla, sin garantía absoluta contra grabaciones/copias. No se etiqueta como DRM, ni se inventa su mecanismo técnico.
- Marca de agua y DNI/correo se aplican a las descargas del material habilitadas por la academia; no se atribuye esa marca al vídeo por inferencia.
- MCP: funciones del campus desde una IA compatible; no cualquier IA, ni una relación exhaustiva de acciones o permisos no confirmados.
- Nota estimada orientativa; no calificación oficial ni resultado garantizado. La IA puede equivocarse.

## Verificación

Se mantienen precios, campos, atribución y lógica del formulario. No se modifica src/server/, src/lib/leads.ts, src/components/lead-form.tsx, tests/leads.spec.ts o .env.example. LEADS_SHEETS_WRITES_ENABLED sigue en false. Las pruebas de interfaz interceptan /api/leads: ninguna escritura en la hoja ni correo real.

Resultado: lint correcto, 26 pruebas existentes correctas y build de producción correcto. Revisadas visualmente las seis vistas a 1440 × 1000 y 390 × 844 con Chrome/Playwright. Sin desbordamiento horizontal ni errores JavaScript. CTA móvil dentro del primer pantallazo en las tres páginas; navegación por secciones, enlaces a demo y FAQ comprobados. Atribución de landing/UTM/anuncio conservada en los POST interceptados. El script adicional comprueba éxito simulado, configuración pendiente y respuesta incierta, con bloqueo y datos conservados.

| Landing | Escritorio | Móvil |
| --- | --- | --- |
| Plugin | [Captura completa](capturas/plugin-escritorio.png) | [Captura completa](capturas/plugin-movil.png) |
| Campus | [Captura completa](capturas/campus-escritorio.png) | [Captura completa](capturas/campus-movil.png) |
| Campus Secure | [Captura completa](capturas/campus-secure-escritorio.png) | [Captura completa](capturas/campus-secure-movil.png) |

Las capturas son del build de las landings; las representaciones del producto dentro de ellas siguen etiquetadas como ilustraciones. Los resultados de las seis vistas se guardan en docs/capturas/revision.json. No se ha desplegado ni activado entrega real de leads.

## Pendientes antes de publicar

No quedan pendientes de inclusión comercial seguridad ni MCP. Sí quedan la configuración de la academia (periodos/umbrales, habilitación de descargas, conexión con IA compatible), la viabilidad técnica del LMS concreto y las condiciones contractuales (alumno activo, impuestos, condiciones finales). La primera entrega real de leads sigue pendiente de configuración/autorización. Logos oficiales todavía ausentes. Las ilustraciones pueden sustituirse por capturas reales solo cuando se disponga de material autorizado.
