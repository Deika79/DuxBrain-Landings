export type LandingId = "plugin" | "campus" | "campus-secure";
export type LandingContent = {
  id: LandingId; name: string; eyebrow: string; title: string; accent: string;
  description: string; price: string; points: string[];
  benefitsTitle: string; benefits: { title: string; text: string }[];
  demoTitle: string; demoText: string; steps: string[];
  faqs: { question: string; answer: string }[];
  meta: { title: string; description: string };
};

const priceFaq = (price: string) => ({ question: "¿Cómo se calcula el precio?", answer: `El precio de referencia es ${price} por alumno activo al mes. En la demo revisaremos el tamaño de tu academia, qué se considera un alumno activo y las condiciones aplicables antes de preparar una propuesta.` });
export const landings: Record<LandingId, LandingContent> = {
  plugin: {
    id: "plugin", name: "Plugin", eyebrow: "PARA ACADEMIAS QUE YA TIENEN LMS",
    title: "Tu plataforma de siempre.", accent: "Ahora, con IA sobre tu temario.",
    description: "Añade DuxBrain a tu LMS y acerca la inteligencia artificial a tus alumnos, dentro de su entorno de estudio. Sin migrar tu academia.",
    price: "0,99 €", points: ["Tu contenido como punto de partida", "Integrado en tu plataforma", "Sin cambiar de campus"],
    benefitsTitle: "Tu academia ya funciona. Dale el siguiente impulso.",
    benefits: [
      { title: "IA con tu contexto", text: "Acerca al alumno una IA centrada en el temario de tu academia y en lo que está estudiando." },
      { title: "Dentro de su LMS", text: "La experiencia de aprendizaje continúa en la plataforma que tu equipo y tus alumnos ya conocen." },
      { title: "Sin empezar de cero", text: "Conserva tu campus. Revisamos contigo la integración para incorporar DuxBrain a tu entorno actual." },
    ],
    demoTitle: "El temario en el centro de la conversación.", demoText: "Una forma de visualizar cómo conviven tus contenidos y la IA en el mismo entorno de estudio.",
    steps: ["Revisamos tu LMS y sus posibilidades de integración.", "Definimos el temario que utilizará la IA.", "Preparamos contigo la incorporación a tu academia."],
    faqs: [
      { question: "¿Tengo que cambiar de plataforma?", answer: "No. DuxBrain Plugin está pensado para academias que quieren mantener su LMS e incorporar IA sobre su temario." },
      { question: "¿Es compatible con mi LMS?", answer: "Revisaremos tu plataforma y los requisitos técnicos en la demo. La compatibilidad y el alcance de la integración se confirman antes de contratar." },
      { question: "¿Qué contenidos utilizará la IA?", answer: "El temario que tu academia decida incorporar. Revisaremos su formato y organización contigo para definir la configuración." }, priceFaq("0,99 €"),
    ],
    meta: { title: "IA para tu LMS, sin migraciones | DuxBrain Plugin", description: "Integra IA sobre tu temario en el LMS de tu academia. DuxBrain Plugin: precio de referencia de 0,99 € por alumno activo al mes. Solicita una demo." },
  },
  campus: {
    id: "campus", name: "Campus", eyebrow: "PARA ACADEMIAS QUE NECESITAN UN CAMPUS COMPLETO",
    title: "Toda tu academia.", accent: "Un campus con IA integrada.",
    description: "Cursos, contenidos, alumnos, clases y gestión en un mismo lugar. DuxBrain Campus reúne lo que necesitas para enseñar y hacer crecer tu academia.",
    price: "3,99 €", points: ["Cursos y contenidos organizados", "Alumnos, clases y gestión", "IA integrada en el aprendizaje"],
    benefitsTitle: "Menos piezas sueltas. Más espacio para enseñar.",
    benefits: [
      { title: "Tu contenido, organizado", text: "Reúne tus cursos y materiales en un campus que da estructura a la experiencia de aprendizaje." },
      { title: "La academia en un lugar", text: "Conecta alumnos, clases y gestión para trabajar desde un entorno común." },
      { title: "IA desde el principio", text: "Incorpora la inteligencia artificial al aprendizaje con el temario de tu academia como contexto." },
    ],
    demoTitle: "Un lugar para todo lo que enseñas.", demoText: "Explora una representación del campus: cursos, materiales y una IA que acompaña el estudio.",
    steps: ["Conocemos tus cursos y tu forma de trabajar.", "Organizamos contenidos, alumnos y clases.", "Definimos contigo la puesta en marcha del campus."],
    faqs: [
      { question: "¿Necesito tener un LMS?", answer: "No. Campus es la solución completa para academias que necesitan su propio entorno para cursos, contenidos, alumnos, clases, gestión e IA." },
      { question: "¿Y si ya tengo contenidos en otra plataforma?", answer: "Revisaremos los formatos y el volumen de tus materiales para definir el proceso de incorporación y su alcance." },
      { question: "¿En qué se diferencia del Plugin?", answer: "Plugin añade IA a un LMS que ya tienes. Campus reúne el entorno de formación completo y la IA integrada." }, priceFaq("3,99 €"),
    ],
    meta: { title: "El campus completo para tu academia | DuxBrain Campus", description: "Cursos, contenidos, alumnos, clases, gestión e IA integrada. Descubre DuxBrain Campus desde un precio de referencia de 3,99 € por alumno activo al mes." },
  },
  "campus-secure": {
    id: "campus-secure", name: "Campus · Seguridad", eyebrow: "DUXBRAIN CAMPUS · FOCO EN SEGURIDAD",
    title: "Tu contenido tiene valor.", accent: "Ten más control sobre su acceso.",
    description: "Tu campus completo, con el foco en controlar accesos, sesiones y reproducción de contenidos. Enseña con IA integrada y define cómo se utiliza tu formación.",
    price: "3,99 €", points: ["Control de accesos", "Gestión de sesiones", "Control de reproducción"],
    benefitsTitle: "Control donde importa. En tu día a día.",
    benefits: [
      { title: "Accesos bajo control", text: "Define quién accede a tu formación y revisa con nosotros la configuración que necesita tu academia." },
      { title: "Atención a las sesiones", text: "Pon el foco en el uso de las sesiones y en las condiciones de acceso de tus alumnos." },
      { title: "Reproducción de contenidos", text: "Revisa las opciones de control de reproducción y su alcance antes de poner tu campus en marcha." },
    ],
    demoTitle: "La formación y su acceso, en el mismo entorno.", demoText: "Una representación para explicar los puntos de control que revisaremos en la demo de Campus.",
    steps: ["Entendemos cómo se accede hoy a tus contenidos.", "Revisamos los controles y su alcance técnico.", "Definimos la configuración de tu Campus."],
    faqs: [
      { question: "¿Campus Secure es una tarifa diferente?", answer: "No. Es DuxBrain Campus presentado desde el enfoque de seguridad. El precio de referencia sigue siendo 3,99 € por alumno activo al mes." },
      { question: "¿Se puede garantizar que nadie grabe mis contenidos?", answer: "No. Ningún entorno puede garantizar que sea imposible grabar o copiar contenido. Los controles ayudan a gestionar el acceso y el uso; su alcance y limitaciones se revisan en la demo." },
      { question: "¿Qué controles incluye para mi academia?", answer: "Revisaremos accesos, sesiones y reproducción contigo. La configuración concreta, los requisitos técnicos y el alcance se confirman en la propuesta." },
      { question: "¿También incluye el campus y la IA?", answer: "Sí. Es el mismo Campus: cursos, contenidos, alumnos, clases, gestión e IA integrada, con el foco de esta presentación en la seguridad." }, priceFaq("3,99 €"),
    ],
    meta: { title: "Control de accesos y contenidos | DuxBrain Campus", description: "Descubre DuxBrain Campus con foco en accesos, sesiones y reproducción de contenidos. Mismo Campus, precio de referencia de 3,99 € por alumno activo al mes." },
  },
};
