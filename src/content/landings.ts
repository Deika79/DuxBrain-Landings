export type LandingId = "plugin" | "campus" | "campus-secure";
export type LandingSection = {
  id: string; navLabel: string; eyebrow: string; title: string; description: string;
  items: { title: string; text: string }[];
};
export type LandingContent = {
  id: LandingId; name: string; eyebrow: string; title: string; accent: string;
  description: string; price: string; points: string[];
  benefitsTitle: string; benefits: { title: string; text: string }[];
  demoTitle: string; demoText: string;
  demo: { panelLabel: string };
  sections: LandingSection[];
  finalTitle: string; finalText: string;
  faqs: { question: string; answer: string }[];
  meta: { title: string; description: string };
};
const priceFaq = (price: string) => ({ question: "¿Cuánto cuesta y qué es un alumno activo?", answer: `El precio de referencia es ${price} por alumno activo al mes. Antes de contratar, confirmaremos cómo se cuenta un alumno activo, los impuestos y las condiciones de la propuesta.` });
const aiFaq = { question: "¿La IA sustituye al profesor o garantiza una nota?", answer: "No. La IA ayuda a estudiar sobre el temario de la academia, pero puede equivocarse. La nota estimada es una orientación para el estudio, no una garantía de resultado en un examen. El contenido del curso y el criterio del docente siguen siendo la referencia." };
const downloads = { title: "Descarga identificada por alumno", text: "La academia puede habilitar descargas del material con marca de agua y DNI o correo del alumno. Así, una copia descargada queda identificada; no se garantiza que sea imposible compartirla." };
const videoProtection = { title: "Medidas contra la captura de pantalla", text: "El vídeo dispone de medidas contra la captura de pantalla. Ayudan a proteger el contenido, pero no garantizan que sea imposible grabarlo o copiarlo por cualquier medio." };
const mcp = { title: "Opera el campus desde una IA compatible", text: "Campus incluye MCP para operar funciones del campus desde una IA compatible. En la demo puedes ver la conexión y las funciones disponibles para tu forma de gestionar la academia." };
export const landings: Record<LandingId, LandingContent> = {
  plugin: {
    id: "plugin", name: "Plugin", eyebrow: "PARA ACADEMIAS QUE YA TIENEN PLATAFORMA",
    title: "IA sobre tu temario.", accent: "En tu campus actual.",
    description: "Pregunta, repasa y practica con el contenido de tu academia, en la plataforma que ya usas. Integramos la IA con tu temario y revisamos la conexión con tu LMS.",
    price: "0,99 €", points: ["Ayuda de estudio sobre tus contenidos", "Práctica y progreso del alumno", "Sin cambiar de campus"],
    benefitsTitle: "Del tema que cuesta al repaso que ayuda.",
    benefits: [
      { title: "Pregunta cuando te atasques", text: "Un alumno no entiende una definición del tema: abre el chat y pide una explicación alternativa con un ejemplo basado en el material de su academia." },
      { title: "Vuelve al tema cada día", text: "La pregunta del día ofrece una ocasión para practicar. El alumno puede contrastar lo que recuerda y volver al contenido que necesita repasar." },
      { title: "Practica lo que has estudiado", text: "Después de leer, el alumno puede generar un test al momento o repasar con flashcards. El estudio continúa sobre el mismo temario." },
    ],
    demoTitle: "Una duda concreta sobre el material de tu academia.",
    demoText: "El chat conecta el estudio con el temario: el alumno pregunta por una idea y puede pedir otra forma de entenderla. En esta captura de la academia demo, pregunta sobre la romanización en Hispania y recibe una respuesta con referencias al material.", demo: { panelLabel: "CHAT SOBRE EL TEMARIO · VISTA DE ALUMNO" },
    sections: [
      { id: "herramientas", navLabel: "Herramientas", eyebrow: "PARA ENTENDER Y PRACTICAR", title: "Elige cómo trabajar cada tema.", description: "Plugin incluye chat y pregunta del día, junto con herramientas para preparar el repaso y poner a prueba lo aprendido.", items: [
        { title: "Resúmenes y mapas conceptuales", text: "Repasa las ideas principales con un resumen y sus relaciones con un mapa conceptual. Por ejemplo, vuelve a la estructura de un tema antes de practicarlo." },
        { title: "Flashcards y podcasts", text: "Alterna tarjetas de pregunta y respuesta con un repaso en audio. Puedes cambiar la forma de estudiar sin cambiar el contenido de referencia." },
        { title: "Tests generados al momento", text: "Prepara una práctica sobre lo que acabas de estudiar. Si una pregunta te cuesta, vuelve al material y utiliza el chat para trabajar la duda." },
      ] },
      { id: "progreso", navLabel: "Progreso", eyebrow: "PARA ORIENTAR EL ESTUDIO", title: "Mira tu progreso y decide qué repasar.", description: "Las estadísticas de estudio y la nota estimada forman parte de Plugin. Aportan referencias para el repaso, sin prometer un resultado académico.", items: [
        { title: "Estadísticas de estudio", text: "El alumno puede consultar su actividad de estudio. Por ejemplo, revisar cómo está utilizando las herramientas antes de organizar su siguiente sesión." },
        { title: "Nota estimada", text: "Ofrece una orientación para valorar el estudio y preparar el repaso. Es una estimación, no la nota oficial ni una garantía de aprobar." },
      ] },
      { id: "integracion", navLabel: "Integración", eyebrow: "TU ACADEMIA CONSERVA SU PLATAFORMA", title: "Integramos la ayuda con tu entorno.", description: "Plugin añade la IA basada en tus contenidos a una plataforma existente. Moodle es una referencia conocida; la viabilidad se revisa para cada entorno.", items: [
        { title: "Tu plataforma y tus accesos", text: "Comprobamos la plataforma, su versión y configuración, cómo acceden los alumnos y los permisos técnicos necesarios para la integración." },
        { title: "Tu temario como punto de partida", text: "Revisamos formatos y organización de los materiales, y acordamos qué contenido se incorpora y cómo se pone en marcha." },
      ] },
      { id: "descargas", navLabel: "Descargas", eyebrow: "CUANDO EL MATERIAL SALE DEL CAMPUS", title: "La academia decide si habilita descargas.", description: "Si permites estudiar con material descargado, puedes hacerlo con identificación del alumno en la copia.", items: [downloads] },
    ],
    finalTitle: "Veamos Plugin con tu temario.", finalText: "Revisa las herramientas de estudio, el progreso y la integración con la plataforma que ya utiliza tu academia.",
    faqs: [
      { question: "¿Qué puede hacer un alumno sobre un tema?", answer: "Puede preguntar en el chat, responder a la pregunta del día, usar resúmenes, mapas conceptuales, flashcards y podcasts, y generar tests al momento. Por ejemplo, leer un resumen, practicar y pedir otra explicación de la idea que le cuesta." },
      { question: "¿Puede consultar cómo va estudiando?", answer: "Sí. Plugin incluye estadísticas de estudio y nota estimada. Sirven como orientación para organizar el repaso; la nota estimada no equivale a una calificación oficial ni garantiza aprobar." },
      { question: "¿Tengo que cambiar de campus si uso Moodle u otro LMS?", answer: "Plugin está pensado para integrar la IA con el temario en tu plataforma actual. Antes de ponerlo en marcha revisamos versión, configuración, acceso del alumnado, permisos y materiales. No prometemos compatibilidad con cualquier LMS." },
      { question: "¿Puedo permitir que mis alumnos descarguen material?", answer: "Sí. La academia puede habilitar descargas del material identificadas con marca de agua y el DNI o correo del alumno. La identificación no supone que sea imposible volver a compartir una copia." },
      aiFaq, priceFaq("0,99 €"),
    ],
    meta: { title: "IA y herramientas de estudio en tu campus | DuxBrain Plugin", description: "Chat, resúmenes, mapas, flashcards, podcasts y tests sobre tu temario. Progreso y descargas identificadas. Plugin: 0,99 € por alumno activo al mes." },
  },
  campus: {
    id: "campus", name: "Campus", eyebrow: "PARA ACADEMIAS QUE NECESITAN UN CAMPUS",
    title: "Cursos y alumnado.", accent: "Con IA para estudiar.",
    description: "Reúne el estudio con IA, las clases y la gestión de tu academia. Del primer tema a los cobros y la comunicación, en un mismo Campus.",
    price: "3,99 €", points: ["Estudio con IA sobre tu temario", "Clases, vídeo y matrículas", "Seguridad y MCP incluidos"],
    benefitsTitle: "Un recorrido completo para el alumno.",
    benefits: [
      { title: "Encuentra el tema y pregunta", text: "El alumno accede al material del curso y utiliza el chat para resolver dudas o pedir una explicación alternativa basada en ese contenido." },
      { title: "Repasa y practica a su ritmo", text: "Campus incluye las herramientas de Plugin: pregunta del día, resúmenes, mapas conceptuales, flashcards, podcasts y tests generados al momento." },
      { title: "Consulta cómo va estudiando", text: "Las estadísticas de estudio y la nota estimada ayudan a orientar el repaso. El equipo de la academia cuenta también con seguimiento del alumnado." },
    ],
    demoTitle: "El recorrido del alumno empieza en sus cursos.",
    demoText: "En la vista Mis cursos de la academia demo, el alumno encuentra las materias disponibles. Desde el curso continúa hacia los materiales y las herramientas de estudio. Campus reúne ese recorrido con las clases y la gestión.", demo: { panelLabel: "MIS CURSOS · VISTA DE ALUMNO" },
    sections: [
      { id: "clases-video", navLabel: "Clases y vídeo", eyebrow: "DEL MATERIAL A LA CLASE", title: "Da clase y conserva la grabación.", description: "Campus incluye alojamiento de vídeo y aula virtual con grabaciones para reunir las clases y los materiales del curso.", items: [
        { title: "Vídeo alojado en Campus", text: "Incorpora el vídeo a tu formación. El alumno puede volver a una explicación grabada junto al material que está estudiando." },
        { title: "Aula virtual y grabaciones", text: "Imparte la clase en el aula virtual y ofrece la grabación para el repaso. Por ejemplo, volver al desarrollo de un ejercicio después de la sesión." },
      ] },
      { id: "matriculas-cobros", navLabel: "Matrículas y cobros", eyebrow: "GESTIÓN DE LA ACADEMIA", title: "Del alta del alumno al cobro del curso.", description: "Gestiona accesos, matrículas y altas y bajas, junto con facturación y pasarela de pago. Sin separar el cobro de la formación que ofreces.", items: [
        { title: "Accesos y matrículas", text: "Gestiona quién está matriculado y sus accesos a la formación. Incluye las altas y bajas de alumnos en el campus." },
        { title: "Facturas y cobros automáticos", text: "Campus incluye facturación con pasarela de pago, facturas y cobros automáticos. Por ejemplo, gestionar el cobro y su factura en la operativa del curso." },
        { title: "Cupones y ofertas", text: "Prepara una oferta o un cupón para tu formación. Puedes organizar una promoción junto a la gestión de matrículas y cobros." },
      ] },
      { id: "comunicacion", navLabel: "Comunicación", eyebrow: "ACOMPAÑAMIENTO DURANTE EL CURSO", title: "Organiza las fechas y mantén la conversación.", description: "Calendario, foro, mensajes y correos forman parte de Campus. El equipo puede coordinar la enseñanza y comunicarse con el alumnado.", items: [
        { title: "Calendario del curso", text: "Organiza las fechas de la formación. Por ejemplo, sitúa las sesiones y los momentos de repaso dentro del recorrido del curso." },
        { title: "Foro, mensajes y correos", text: "Mantén las dudas y la comunicación con los alumnos. Utiliza el foro para conversar sobre el curso y los mensajes o correos para el contacto." },
      ] },
      { id: "seguridad-mcp", navLabel: "Seguridad y MCP", eyebrow: "TAMBIÉN INCLUIDOS EN CAMPUS", title: "Revisa el uso y gestiona desde una IA compatible.", description: "El módulo de seguridad y MCP están incluidos en la misma oferta de Campus a 3,99 € por alumno activo al mes; no son tarifas adicionales.", items: [
        { title: "Avisos de seguridad configurables", text: "Configura periodos y umbrales para revisar combinaciones de navegador y sistema, peticiones de apertura de vídeos y conexiones de internet simultáneas distintas. Un aviso requiere revisión; no prueba fraude." },
        { title: "Vídeo y descargas identificadas", text: "El vídeo incluye medidas contra la captura de pantalla. Si habilitas descargas del material, pueden llevar marca de agua y DNI o correo del alumno. No hay una garantía absoluta contra copias o grabaciones." },
        mcp,
      ] },
    ],
    finalTitle: "Recorre tu academia en la demo.", finalText: "Veremos estudio, clases, matrículas, cobros y comunicación, junto con la seguridad y MCP incluidos en Campus.",
    faqs: [
      { question: "¿Campus incluye todas las herramientas de Plugin?", answer: "Sí. Incluye pregunta del día, resúmenes, mapas conceptuales, flashcards, podcasts, tests generados al momento, estadísticas de estudio, nota estimada y chat sobre los contenidos de tu academia." },
      { question: "¿Puedo dar clases y ofrecer las grabaciones?", answer: "Sí. Campus incluye alojamiento de vídeo y aula virtual con grabaciones. El alumno puede volver a una explicación para repasar el tema o un ejercicio trabajado en clase." },
      { question: "¿Cómo gestiono alumnos y cobros?", answer: "Campus reúne accesos, matrículas y altas y bajas de alumnos. Incluye facturación con pasarela de pago, facturas, cobros automáticos, cupones y ofertas. En la demo puedes recorrer un caso de matriculación y cobro." },
      { question: "¿Qué herramientas de comunicación incluye?", answer: "Calendario, foro, mensajes y correos. Por ejemplo, organizar las fechas de clase y mantener una conversación sobre las dudas del curso." },
      { question: "¿Seguridad y MCP se pagan aparte?", answer: "No. El módulo de seguridad y MCP están incluidos en Campus de 3,99 € por alumno activo al mes. MCP permite operar funciones del campus desde una IA compatible. Campus Secure presenta esta misma oferta con el foco en accesos y contenidos." },
      aiFaq, priceFaq("3,99 €"),
    ],
    meta: { title: "IA, clases y gestión de tu academia | DuxBrain Campus", description: "Estudio con IA, vídeo, aula virtual, matrículas, cobros y comunicación. Seguridad y MCP incluidos en Campus: 3,99 € por alumno activo al mes." },
  },
  "campus-secure": {
    id: "campus-secure", name: "Campus · Seguridad", eyebrow: "DUXBRAIN CAMPUS · ACCESOS Y CONTENIDOS",
    title: "¿Se comparten accesos a tu curso?", accent: "Revisa avisos y señales.",
    description: "Si tu formación de pago circula fuera de la academia, revisa los accesos y el uso del contenido con el módulo de seguridad incluido en Campus.",
    price: "3,99 €", points: ["Avisos configurables", "Vídeo con medidas de protección", "Campus completo, mismo precio"],
    benefitsTitle: "Señales concretas para revisar el uso.",
    benefits: [
      { title: "Navegador y sistema", text: "Configura avisos por combinaciones distintas de navegador y sistema. Un cambio puede requerir revisión, pero no demuestra por sí mismo que una cuenta se esté compartiendo." },
      { title: "Peticiones de apertura de vídeos", text: "Revisa las peticiones de apertura de vídeos mediante avisos configurables. El aviso aporta una señal para examinar el uso del contenido, no una conclusión de fraude." },
      { title: "Conexiones simultáneas distintas", text: "El módulo contempla avisos por conexiones de internet simultáneas distintas. Permite revisar esa situación sin tratar cualquier cambio de conexión como prueba concluyente." },
    ],
    demoTitle: "Configura cuándo quieres recibir un aviso.",
    demoText: "Esta pantalla de administración muestra cómo se ajustan periodos y umbrales para combinaciones de navegador y sistema y peticiones de vídeo. Son parámetros de configuración: la captura no muestra avisos generados ni un caso de fraude.",
    demo: { panelLabel: "CONFIGURACIÓN DE SEGURIDAD · ADMINISTRACIÓN" },
    sections: [
      { id: "configuracion-avisos", navLabel: "Configuración", eyebrow: "PERIODOS, UMBRALES Y CONTEXTO", title: "Ajusta los avisos y revisa cada caso.", description: "El módulo de seguridad está incluido en Campus. Puedes configurar periodos y umbrales para los avisos, sin convertir una señal aislada en una acusación.", items: [
        { title: "Periodos y umbrales configurables", text: "Ajusta el periodo y el umbral de los avisos a la operativa de la academia. Por ejemplo, revisa el contexto de una sesión antes de interpretar un aviso por navegador o sistema." },
        { title: "La distancia aporta contexto", text: "La distancia geográfica estimada refuerza la evaluación de conexiones simultáneas. Por sí sola no crea ni oculta casos: se considera junto con la simultaneidad de conexiones." },
      ] },
      { id: "video-descargas", navLabel: "Vídeo y descargas", eyebrow: "CONTENIDO DE PAGO", title: "Medidas para el vídeo y copias identificadas.", description: "El vídeo y el material descargable tienen medidas distintas. Las descargas se habilitan por la academia; la identificación corresponde a la copia del material.", items: [videoProtection, downloads] },
      { id: "campus-completo", navLabel: "Campus completo", eyebrow: "LA MISMA OFERTA DE CAMPUS", title: "Seguridad dentro de la academia completa.", description: "Campus Secure presenta el mismo Campus desde los accesos y contenidos. La oferta sigue siendo Campus a 3,99 € por alumno activo al mes, con todas sus funciones.", items: [
        { title: "Estudio y clases", text: "Incluye las funciones de Plugin: chat, pregunta del día, resúmenes, mapas, flashcards, podcasts, tests al momento, estadísticas y nota estimada. Añade alojamiento de vídeo y aula virtual con grabaciones." },
        { title: "Gestión y comunicación", text: "Incluye accesos, matrículas, altas y bajas, facturación y pasarela de pago, facturas, cobros automáticos, cupones y ofertas. Calendario, foro, mensajes y correos completan el curso." },
      ] },
      { id: "mcp", navLabel: "Gestión con MCP", eyebrow: "GESTIÓN DESDE UNA IA COMPATIBLE", title: "MCP también está incluido.", description: "Además de la IA de estudio del alumno, Campus incluye MCP como capacidad de gestión. Forma parte de la misma oferta, sin una tarifa adicional.", items: [mcp] },
    ],
    finalTitle: "Revisa un caso de uso en la demo.", finalText: "Veremos los avisos configurables, las medidas de vídeo y las descargas identificadas dentro del mismo Campus, con MCP incluido.",
    faqs: [
      { question: "¿Qué avisos incluye el módulo de seguridad?", answer: "Avisos configurables por combinaciones distintas de navegador y sistema, peticiones de apertura de vídeos y conexiones de internet simultáneas distintas. Puedes configurar periodos y umbrales. Son señales que requieren revisión, no pruebas concluyentes de fraude." },
      { question: "¿La distancia geográfica genera un caso por sí sola?", answer: "No. La distancia geográfica estimada refuerza la evaluación de conexiones simultáneas, pero por sí sola no crea ni oculta casos. No debe interpretarse como una prueba independiente de uso indebido." },
      { question: "¿El vídeo impide cualquier grabación o copia?", answer: "El vídeo dispone de medidas contra la captura de pantalla. Eso no garantiza que sea imposible grabar o copiar el contenido por cualquier medio; conviene conocer su alcance y revisar el contexto de uso." },
      { question: "¿Puedo identificar el material descargado?", answer: "Sí. La academia puede habilitar descargas del material con marca de agua y DNI o correo del alumno. Esto identifica la copia descargada, sin garantizar que no pueda volver a compartirse." },
      { question: "¿Campus Secure, seguridad o MCP tienen otra tarifa?", answer: "No. Campus Secure es el mismo Campus de 3,99 € por alumno activo al mes. Incluye las herramientas de estudio de Plugin, vídeo, aula virtual, gestión, comunicación, módulo de seguridad y MCP para operar funciones del campus desde una IA compatible." },
      priceFaq("3,99 €"),
    ],
    meta: { title: "Avisos de seguridad, vídeo y descargas | DuxBrain Campus", description: "Avisos configurables, medidas para vídeo y descargas identificadas. Seguridad y MCP incluidos en el mismo Campus: 3,99 € por alumno activo al mes." },
  },
};
