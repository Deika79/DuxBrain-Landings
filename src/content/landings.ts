export type LandingId = "plugin" | "campus" | "campus-secure";
export type LandingContent = {
  id: LandingId; name: string; eyebrow: string; title: string; accent: string;
  description: string; price: string; points: string[];
  benefitsTitle: string; benefits: { title: string; text: string }[];
  demoTitle: string; demoText: string;
  demo: { courseTitle: string; material: string; panelLabel: string; panelTitle: string; question?: string; answer?: string; reviewTopics?: string[]; caption: string };
  stepsEyebrow: string; stepsTitle: string; steps: string[];
  finalTitle: string; finalText: string;
  faqs: { question: string; answer: string }[];
  meta: { title: string; description: string };
};

const priceFaq = (price: string) => ({ question: "¿Cuánto cuesta y qué es un alumno activo?", answer: `El precio de referencia es ${price} por alumno activo al mes. Antes de contratar, confirmaremos contigo cómo se cuenta un alumno activo, los impuestos y las condiciones de la propuesta. La demo sirve para revisar el alcance que necesita tu academia.` });
const aiFaq = { question: "¿La IA sustituye al profesor?", answer: "La IA es una ayuda de estudio basada en los contenidos de tu academia: puede ofrecer otra explicación o ayudar a preparar un repaso. Puede equivocarse, por lo que el material del curso y el criterio del docente siguen siendo la referencia." };
const studyDemo = {
  courseTitle: "Estadística · Tema 1", material: "Variables y ejemplos",
  panelLabel: "EJEMPLO DE AYUDA CON IA", panelTitle: "Una duda sobre el tema.",
  question: "¿Qué es una variable? Ponme un ejemplo.",
  answer: "En el Tema 1 de este ejemplo, una variable es un dato que puede cambiar. Las horas de estudio son una variable: cada alumno puede dedicar un tiempo distinto.",
  caption: "Ejemplo editorial ilustrativo, no una captura ni una respuesta real del producto. El material y la conversación son ficticios.",
};

export const landings: Record<LandingId, LandingContent> = {
  plugin: {
    id: "plugin", name: "Plugin", eyebrow: "PARA ACADEMIAS QUE YA TIENEN PLATAFORMA",
    title: "IA sobre tu temario.", accent: "En tu campus actual.",
    description: "Añade ayuda de estudio basada en tus contenidos al campus que ya usas. Tus alumnos pueden preguntar y pedir otra explicación del tema. Revisamos antes la integración.",
    price: "0,99 €", points: ["Dudas sobre tus materiales", "Explicaciones y ayuda para repasar", "Sin cambiar de campus"],
    benefitsTitle: "Ayuda cuando un alumno se atasca.",
    benefits: [
      { title: "Resolver una duda", text: "Mientras estudia un tema, el alumno puede preguntar por un concepto y recibir una explicación basada en el contenido de la academia." },
      { title: "Entenderlo de otra forma", text: "Si una explicación no le resulta clara, puede pedir una alternativa o un ejemplo para trabajar la misma idea." },
      { title: "Preparar el repaso", text: "La IA puede ayudar a preparar materiales de estudio a partir del temario. El alumno mantiene el contenido del curso como referencia." },
    ],
    demoTitle: "Del material de tu academia a una explicación concreta.",
    demoText: "Imagina a un alumno leyendo el tema de variables. Pregunta por el concepto y recibe una explicación que parte de ese material, dentro de su entorno de estudio.",
    demo: studyDemo,
    stepsEyebrow: "ANTES DE INTEGRAR TU PLATAFORMA", stepsTitle: "Comprobamos cómo encaja en tu campus.",
    steps: ["Revisamos tu plataforma, su versión, cómo acceden los alumnos y qué opciones de integración ofrece.", "Comprobamos el formato de tus materiales y qué contenido quieres utilizar con la IA.", "Acordamos el alcance técnico y la puesta en marcha antes de contratar."],
    finalTitle: "Veamos la IA en tu campus.", finalText: "Cuéntanos qué plataforma utilizas y qué temario quieres incorporar. Revisaremos tu caso en la demo.",
    faqs: [
      { question: "¿Tengo que trasladar mis cursos a otro campus?", answer: "Plugin está pensado para añadir IA a tu plataforma actual, conservando tu campus y tu temario. Primero hay que confirmar que la integración es viable en tu entorno; no prometemos compatibilidad con cualquier plataforma." },
      { question: "¿Qué hay que comprobar si uso Moodle u otro LMS?", answer: "Moodle es una referencia conocida, pero el nombre de la plataforma no basta para confirmar compatibilidad. Revisaremos versión, configuración, forma de acceso de los alumnos, permisos técnicos y disponibilidad de los contenidos. La propuesta concretará qué se integra y cómo." },
      { question: "¿La ayuda se basa en mi temario o en contenido genérico?", answer: "El punto de partida son los materiales de tu academia que se incorporen a DuxBrain. Antes de integrar, revisaremos sus formatos y organización. En la demo puedes plantear una duda de un tema para ver el tipo de ayuda de estudio." },
      aiFaq, priceFaq("0,99 €"),
    ],
    meta: { title: "IA sobre tu temario en tu campus | DuxBrain Plugin", description: "Ayuda a tus alumnos a resolver dudas con IA basada en tus contenidos, sin cambiar de campus. Plugin: 0,99 € por alumno activo al mes. Solicita una demo." },
  },
  campus: {
    id: "campus", name: "Campus", eyebrow: "PARA ACADEMIAS QUE NECESITAN UN CAMPUS",
    title: "Cursos y alumnado.", accent: "Con IA para estudiar.",
    description: "Organiza tus cursos, publica materiales y ofrece ayuda de estudio con IA basada en ellos. Reúne la enseñanza y el seguimiento del alumnado en DuxBrain Campus.",
    price: "3,99 €", points: ["Cursos y temario organizados", "Ayuda con IA sobre tus contenidos", "Seguimiento de la actividad"],
    benefitsTitle: "Del curso preparado al alumno que estudia.",
    benefits: [
      { title: "Un curso con estructura", text: "Organiza el temario y publica el material de cada tema para que el alumno encuentre qué debe estudiar en un mismo lugar." },
      { title: "Ayuda durante el estudio", text: "El alumno puede preguntar por el contenido, pedir otra explicación y preparar materiales para repasar con ayuda de la IA." },
      { title: "Actividad para orientar el apoyo", text: "Las herramientas de seguimiento del campus te ayudan a revisar la actividad del alumnado y preparar el acompañamiento docente." },
    ],
    demoTitle: "El alumno encuentra el tema y pregunta sin salir del campus.",
    demoText: "En este ejemplo, el curso reúne el material y la ayuda de estudio. La academia organiza la formación y el alumno trabaja sobre esos contenidos.",
    demo: studyDemo,
    stepsEyebrow: "UN RECORRIDO DE PRINCIPIO A FIN", stepsTitle: "Así se trabaja en Campus.",
    steps: ["Organiza el curso y distribuye el temario por temas.", "Publica los materiales que utilizarán tus alumnos.", "El alumno estudia y utiliza la IA para resolver dudas sobre tus contenidos.", "Revisa la actividad para orientar el apoyo docente."],
    finalTitle: "Recorre un curso en la demo.", finalText: "Veremos cómo organizar el material, estudiar con IA y seguir la actividad desde el mismo campus.",
    faqs: [
      { question: "¿Necesito una plataforma de formación aparte?", answer: "Campus reúne cursos, contenidos, alumnado, herramientas de seguimiento y ayuda con IA. Si ya tienes una plataforma que quieres conservar y solo buscas añadir IA, revisa la opción Plugin." },
      { question: "¿Cómo sería el día a día de un curso?", answer: "La academia organiza el curso y publica el material. El alumno accede al tema y puede apoyarse en la IA al estudiar. Después, el equipo docente revisa la actividad mediante las herramientas de seguimiento del campus." },
      { question: "¿Puedo aprovechar materiales que ya tengo?", answer: "Revisaremos los formatos, la organización y el volumen del contenido para definir su incorporación. No damos por incluida una migración automática ni un plazo de puesta en marcha sin estudiar tu caso." },
      { question: "¿Qué información de seguimiento voy a ver?", answer: "El campus dispone de herramientas de seguimiento de actividad. En la demo revisaremos las vistas disponibles y qué información aporta cada una para tu forma de enseñar; no prometemos métricas o informes concretos sin confirmarlos." },
      aiFaq, priceFaq("3,99 €"),
    ],
    meta: { title: "Cursos, alumnos e IA en un campus | DuxBrain Campus", description: "Organiza cursos, publica materiales, ofrece ayuda con IA y sigue la actividad del alumnado. Campus: 3,99 € por alumno activo al mes. Solicita una demo." },
  },
  "campus-secure": {
    id: "campus-secure", name: "Campus · Seguridad", eyebrow: "DUXBRAIN CAMPUS · ACCESOS Y CONTENIDOS",
    title: "¿Se comparten accesos a tu curso?", accent: "Revisa qué puedes controlar.",
    description: "Si tu formación de pago circula fuera de la academia, empieza por revisar los accesos y el uso del contenido. En la demo de Campus concretamos las opciones y sus límites.",
    price: "3,99 €", points: ["Revisión de tu caso de acceso", "Alcance técnico antes de contratar", "El mismo Campus con IA"],
    benefitsTitle: "Parte del problema que vive tu academia.",
    benefits: [
      { title: "Accesos compartidos", text: "Cuéntanos quién debería acceder a cada curso y cómo se comparte hoy el acceso. Es el punto de partida para revisar qué opciones encajan en tu caso." },
      { title: "Material fuera de la academia", text: "Identifica qué contenido de pago te preocupa y cómo se distribuye. En la demo distinguiremos lo que se puede controlar de lo que requiere otras medidas." },
      { title: "La enseñanza sigue en Campus", text: "Esta página presenta el mismo campus de cursos, contenidos, alumnado, seguimiento e IA. El enfoque de seguridad no añade otra tarifa." },
    ],
    demoTitle: "Tres preguntas para revisar tu caso.",
    demoText: "La demo debe servir para contrastar tus necesidades con las opciones reales del campus, antes de decidir. Este esquema es un guion de conversación, no un panel de controles incluidos.",
    demo: { courseTitle: "Tu formación de pago", material: "Contenido que quieres revisar", panelLabel: "GUION DE LA DEMO", panelTitle: "Necesidades por revisar", reviewTopics: ["¿Quién debe acceder?", "¿Qué material te preocupa?", "¿Qué necesitas limitar?"], caption: "Esquema ilustrativo de la revisión, no una captura del producto. No representa controles incluidos ni garantías de protección." },
    stepsEyebrow: "ANTES DE DECIDIR", stepsTitle: "Concreta el alcance antes de contratar.",
    steps: ["Describe cómo se comparten los accesos o se distribuye tu contenido hoy.", "Contrastamos tus necesidades con las opciones disponibles y sus límites técnicos.", "La propuesta deja por escrito qué alcance se confirma para tu Campus."],
    finalTitle: "Trae tu caso de acceso a la demo.", finalText: "Revisa qué puede aportar Campus a tu academia y qué necesidades requieren una confirmación técnica.",
    faqs: [
      { question: "¿Campus Secure es otro producto o una tarifa adicional?", answer: "No. Es el mismo DuxBrain Campus presentado desde el problema de los accesos compartidos y la distribución de contenidos. El precio de referencia sigue siendo 3,99 € por alumno activo al mes." },
      { question: "¿Qué controles están incluidos por 3,99 €?", answer: "El precio corresponde a Campus. El alcance concreto de las restricciones de acceso o uso debe verificarse en la demo y quedar reflejado en la propuesta. Esta página no da por incluidos controles de sesiones o reproducción que no se hayan confirmado para esa oferta." },
      { question: "¿Evita que un alumno comparta su cuenta?", answer: "No prometemos impedir todos los usos compartidos. Revisaremos cómo acceden tus alumnos y qué opciones reales pueden atender tu caso, con sus límites y requisitos, antes de contratar." },
      { question: "¿Se puede impedir cualquier grabación o copia?", answer: "No. No se garantiza que sea imposible grabar o copiar un contenido. La demo debe ayudarte a entender el alcance real de las opciones disponibles, sin confundir control de acceso con protección absoluta." },
      { question: "¿Sigo teniendo cursos e IA educativa?", answer: "Sí. Sigue siendo Campus: cursos, contenidos, alumnado, herramientas de seguimiento y ayuda de estudio con IA basada en los materiales de la academia." },
      priceFaq("3,99 €"),
    ],
    meta: { title: "Accesos compartidos y contenido de pago | DuxBrain Campus", description: "¿Se comparten accesos o materiales de tu academia? Revisa las opciones y límites de Campus en una demo. Mismo Campus: 3,99 € por alumno activo al mes." },
  },
};
