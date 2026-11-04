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
  demoAfterSection?: string;
  sections: LandingSection[];
  finalTitle: string; finalText: string;
  faqs: { question: string; answer: string }[];
  meta: { title: string; description: string };
};
const priceFaq = (price: string) => ({ question: "¿Cuánto cuesta y qué es un alumno activo?", answer: `El precio de referencia es ${price} por alumno activo al mes. Antes de contratar, confirmaremos cómo se cuenta un alumno activo, los impuestos y las condiciones de la propuesta.` });
const aiFaq = { question: "¿La IA sustituye al profesor o garantiza una nota?", answer: "No. La IA ayuda a estudiar sobre el temario de la academia, pero puede equivocarse. La nota estimada es una orientación para el estudio, no una garantía de resultado en un examen. El contenido del curso y el criterio del docente siguen siendo la referencia." };
const downloads = { title: "Descarga identificada por alumno", text: "La academia puede habilitar descargas del material con una marca de agua y el DNI o correo electrónico del alumno. La identificación acompaña a la copia descargada." };
const mcp = { title: "Opera el campus desde una IA compatible", text: "Campus incluye MCP para operar funciones del campus desde una IA compatible. En la demo puedes ver la conexión y las funciones disponibles para tu forma de gestionar la academia." };
export const landings: Record<LandingId, LandingContent> = {
  plugin: {
    id: "plugin", name: "Plugin", eyebrow: "PARA ACADEMIAS QUE YA TIENEN PLATAFORMA",
    title: "Una IA entrenada con tu temario.", accent: "Dentro de tu campus actual.",
    description: "Tus alumnos preguntan, repasan y practican con los contenidos de tu academia, dentro del LMS que ya utilizas. Sus respuestas y herramientas de estudio se apoyan en tu material, sin cambiar de plataforma.",
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
      { id: "herramientas", navLabel: "Herramientas", eyebrow: "PARA ENTENDER Y PRACTICAR", title: "Elige cómo trabajar cada tema.", description: "Del primer repaso a la práctica: trabaja las ideas de cada tema con herramientas apoyadas en el contenido de tu academia.", items: [
        { title: "Resúmenes y mapas conceptuales", text: "Repasa las ideas principales y sus relaciones. El alumno puede editar los resúmenes, textos y mapas conceptuales y compararlos en cualquier momento con el material original." },
        { title: "Flashcards y podcasts", text: "Alterna tarjetas de pregunta y respuesta con un repaso en audio. Puedes cambiar la forma de estudiar sin cambiar el contenido de referencia." },
        { title: "Tests generados al momento", text: "Prepara una práctica sobre lo que acabas de estudiar. Si una pregunta te cuesta, vuelve al material y utiliza el chat para trabajar la duda." },
      ] },
      { id: "progreso", navLabel: "Progreso", eyebrow: "PARA ORIENTAR EL ESTUDIO", title: "Mira tu progreso y decide qué repasar.", description: "Consulta tu actividad, cuánto has avanzado y qué queda por estudiar según el tiempo estimado hasta la evaluación.", items: [
        { title: "Estadísticas y avance", text: "El alumno puede consultar estadísticas de estudio y métricas del avance y de lo que queda por estudiar. Así cuenta con referencias para organizar el repaso con el tiempo estimado hasta la evaluación." },
        { title: "Nota estimada", text: "Ofrece una orientación para valorar el estudio y preparar el repaso. Es una estimación, no la nota oficial ni una garantía de aprobar." },
      ] },
      { id: "integracion", navLabel: "Integración", eyebrow: "TU ACADEMIA CONSERVA SU PLATAFORMA", title: "Integramos la ayuda con tu entorno.", description: "Plugin integra la IA y tu temario en el LMS que ya utilizas. En Moodle, la integración suele ser especialmente sencilla y rápida; revisamos cada instalación antes de ponerla en marcha.", items: [
        { title: "Tu plataforma y tus accesos", text: "Comprobamos la versión y configuración de la plataforma, los accesos y permisos del alumnado y los permisos técnicos necesarios para la integración." },
        { title: "Tu temario como punto de partida", text: "Revisamos formatos y organización de los materiales, y acordamos qué contenido se incorpora y cómo se pone en marcha." },
      ] },
      { id: "descargas", navLabel: "Descargas", eyebrow: "CUANDO EL MATERIAL SALE DEL CAMPUS", title: "La academia decide si habilita descargas.", description: "Si permites estudiar con material descargado, puedes hacerlo con identificación del alumno en la copia.", items: [downloads] },
    ],
    finalTitle: "Veamos Plugin con tu temario.", finalText: "Revisa las herramientas de estudio, el progreso y la integración con la plataforma que ya utiliza tu academia.",
    faqs: [
      { question: "¿Qué puede hacer un alumno sobre un tema?", answer: "Puede preguntar en el chat, responder a la pregunta del día, consultar resúmenes y mapas conceptuales, usar flashcards y podcasts y generar tests al momento. Por ejemplo, leer un resumen, practicar y pedir otra explicación de una idea que le cueste. Los resúmenes, textos y mapas conceptuales son editables por el alumno y se pueden comparar en cualquier momento con el material original." },
      { question: "¿Puede consultar cómo va estudiando?", answer: "Sí. Plugin muestra estadísticas de estudio y una nota estimada que orientan el repaso. También ofrece métricas del avance y de lo que queda por estudiar según el tiempo estimado hasta la evaluación. La nota estimada es una orientación, no una calificación garantizada." },
      { question: "¿Tengo que cambiar de campus si uso Moodle u otro LMS?", answer: "No. Plugin está pensado para integrar la IA y el temario en la plataforma actual de la academia. Antes de ponerlo en marcha revisamos la versión, la configuración, los accesos y permisos del alumnado y los materiales. En Moodle, la integración suele ser especialmente sencilla y rápida. La viabilidad se comprueba en cada instalación." },
      { question: "¿Puedo permitir que mis alumnos descarguen material?", answer: "Sí. La academia puede habilitar descargas identificadas con una marca de agua y el DNI o correo electrónico del alumno." },
      { question: "¿La IA sustituye al profesor o garantiza una nota?", answer: "No. Ayuda a estudiar con el temario de la academia; el contenido del curso y el criterio del docente siguen siendo la referencia." },
      { question: "¿Cuánto cuesta y qué es un alumno activo?", answer: "El precio de referencia es de 0,99 € por alumno activo al mes. Antes de contratar se confirma el criterio concreto con el que se contabilizan los alumnos activos." },
    ],
    meta: { title: "IA entrenada con tu temario en tu LMS | DuxBrain Plugin", description: "Tus alumnos preguntan, repasan y practican con una IA entrenada con tu temario, dentro de tu campus actual. Plugin: 0,99 € por alumno activo al mes." },
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
    id: "campus-secure", name: "Campus · Seguridad", eyebrow: "PROTEGE TU CONTENIDO",
    title: "Tu contenido es tu mayor activo.", accent: "Protégelo.",
    description: "¿Te preocupa que tus clases o materiales de pago se compartan fuera de tu academia? DuxBrain Campus combina protección antigrabación para vídeo, descargas identificadas con marca de agua y avisos configurables sobre el uso de las cuentas.",
    price: "3,99 €", points: ["Protección antigrabación de vídeo", "Descargas con marca de agua identificada", "Avisos de seguridad configurables"],
    benefitsTitle: "Protege lo que has creado para enseñar.",
    benefits: [
      { title: "Cuida tus clases grabadas", text: "Ofrece tus vídeos con protección antigrabación mediante medidas contra la captura de pantalla. El alumno puede volver a tus explicaciones dentro de Campus." },
      { title: "Identifica cada descarga", text: "Cuando habilites la descarga de material, incorpora una marca de agua con el correo o DNI del alumno. La identificación acompaña a la copia descargada." },
      { title: "Decide cuándo recibir avisos", text: "Configura periodos y umbrales para equipos detectados, aperturas de vídeo y conexiones simultáneas distintas. Adapta los avisos a la actividad de tu academia." },
    ],
    demoTitle: "Configura cuándo quieres recibir un aviso.",
    demoText: "Desde la administración puedes ajustar los periodos y umbrales para combinaciones de navegador y sistema y peticiones de apertura de vídeos. Esta pantalla real de Campus muestra los ajustes disponibles para adaptar los avisos a tu academia.",
    demo: { panelLabel: "CONFIGURACIÓN DE SEGURIDAD · ADMINISTRACIÓN" },
    demoAfterSection: "descargas-identificadas",
    sections: [
      { id: "proteccion-video", navLabel: "Protección de vídeo", eyebrow: "PROTECCIÓN PARA TUS CLASES", title: "Tus clases grabadas merecen protección.", description: "Detrás de cada vídeo hay preparación, experiencia y horas de enseñanza. Campus incorpora protección antigrabación con medidas contra la captura de pantalla para cuidar ese contenido formativo.", items: [
        { title: "Protección durante la reproducción", text: "Las medidas contra la captura de pantalla forman parte del vídeo de Campus. Puedes ofrecer una explicación grabada para el repaso con protección integrada en su reproducción." },
        { title: "Vídeo dentro del curso", text: "Reúne tus clases grabadas, el temario y las herramientas de estudio en el mismo entorno. En la demo puedes ver la reproducción y las medidas disponibles para tus clases." },
      ] },
      { id: "descargas-identificadas", navLabel: "Descargas", eyebrow: "MATERIAL CON IDENTIFICACIÓN", title: "Cada descarga lleva la identidad del alumno.", description: "La academia decide si habilita la descarga del material. Cuando lo haces, la copia puede incorporar una marca de agua con el correo o DNI del alumno.", items: [
        { title: "Marca de agua identificada", text: "Un alumno descarga el material para repasar: la copia queda identificada con su correo o DNI mediante la marca de agua." },
        { title: "Tú habilitas las descargas", text: "Decide si ofreces material descargable como parte de tu formación. La identificación se aplica al material que permites descargar." },
      ] },
      { id: "configuracion-avisos", navLabel: "Avisos", eyebrow: "PERIODOS Y UMBRALES A TU MEDIDA", title: "Conoce cómo se utilizan las cuentas.", description: "El módulo de seguridad reúne avisos configurables para ayudarte a revisar el uso de los accesos y del vídeo. Ajusta los periodos y umbrales a la operativa de tus cursos.", items: [
        { title: "Equipos detectados", text: "Configura avisos por combinaciones distintas de navegador y sistema. Por ejemplo, revisa los cambios de entorno con los que se utiliza una cuenta durante el periodo que establezcas." },
        { title: "Aperturas de vídeo", text: "Ajusta los avisos sobre peticiones de apertura de vídeos. Define el periodo y el umbral que te interesa revisar para seguir el uso de tus clases grabadas." },
        { title: "Conexiones simultáneas", text: "Revisa conexiones de internet simultáneas distintas. La distancia geográfica estimada aporta contexto a la evaluación de esa simultaneidad." },
      ] },
      { id: "campus-completo", navLabel: "Campus completo", eyebrow: "LA MISMA OFERTA DE CAMPUS", title: "Seguridad dentro de la academia completa.", description: "Campus Secure presenta el mismo Campus desde los accesos y contenidos. La oferta sigue siendo Campus a 3,99 € por alumno activo al mes, con todas sus funciones.", items: [
        { title: "Estudio y clases", text: "Incluye las funciones de Plugin: chat, pregunta del día, resúmenes, mapas, flashcards, podcasts, tests al momento, estadísticas y nota estimada. Añade alojamiento de vídeo y aula virtual con grabaciones." },
        { title: "Gestión y comunicación", text: "Incluye accesos, matrículas, altas y bajas, facturación y pasarela de pago, facturas, cobros automáticos, cupones y ofertas. Calendario, foro, mensajes y correos completan el curso." },
      ] },
      { id: "mcp", navLabel: "Gestión con MCP", eyebrow: "GESTIÓN DESDE UNA IA COMPATIBLE", title: "MCP también está incluido.", description: "Además de la IA de estudio del alumno, Campus incluye MCP como capacidad de gestión. Forma parte de la misma oferta, sin una tarifa adicional.", items: [mcp] },
    ],
    finalTitle: "Veamos cómo proteger tu contenido.", finalText: "Solicita una demo para recorrer la protección de vídeo, las descargas identificadas y los ajustes de seguridad. Todo dentro del Campus completo, con IA, gestión y MCP incluidos.",
    faqs: [
      { question: "¿Cómo protege Campus mis clases grabadas?", answer: "El vídeo incorpora protección antigrabación mediante medidas contra la captura de pantalla. Se integra en la reproducción del contenido formativo. En la demo puedes recorrer una clase y conocer las medidas disponibles." },
      { question: "¿Qué identificación lleva el material descargado?", answer: "Cuando la academia habilita las descargas, el material puede llevar una marca de agua con el correo o DNI del alumno. Por ejemplo, un alumno puede descargar el material para repasar y conservar su identificación en esa copia." },
      { question: "¿Qué avisos de seguridad puedo configurar?", answer: "Puedes configurar avisos por combinaciones distintas de navegador y sistema, peticiones de apertura de vídeos y conexiones de internet simultáneas distintas. Los periodos y umbrales permiten adaptar la revisión al uso de tus cursos." },
      { question: "¿Para qué sirve la distancia geográfica estimada?", answer: "Aporta contexto a la evaluación de conexiones simultáneas distintas. Se considera junto con la simultaneidad para ayudarte a revisar cómo se está utilizando una cuenta." },
      { question: "¿Campus Secure, seguridad o MCP tienen otra tarifa?", answer: "No. Campus Secure es el mismo Campus de 3,99 € por alumno activo al mes. Incluye las herramientas de estudio de Plugin, vídeo, aula virtual, gestión, comunicación, módulo de seguridad y MCP para operar funciones del campus desde una IA compatible." },
      priceFaq("3,99 €"),
    ],
    meta: { title: "Protege tus clases y materiales | DuxBrain Campus Secure", description: "Protección antigrabación de vídeo, descargas con marca de agua identificada y avisos configurables. Campus completo: 3,99 € por alumno activo al mes." },
  },
};
