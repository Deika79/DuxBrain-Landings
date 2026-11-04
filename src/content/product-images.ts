import type { LandingId } from "./landings";

// Only visually reviewed, approved screenshots belong in this manifest.
// campus-gestion.png is excluded pending replacement of the student email cells.
export type ProductScreenshot = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
};

export const primaryScreenshots: Record<LandingId, ProductScreenshot> = {
  plugin: {
    src: "/product/plugin-chat.png", width: 976, height: 790,
    alt: "Chat de estudio con una pregunta sobre la romanización en Hispania y una respuesta con referencias al material.",
    caption: "Vista de alumno · Chat sobre el temario de Historia en la academia demo, con referencias al material.",
  },
  campus: {
    src: "/product/campus-cursos.png", width: 1178, height: 855,
    alt: "Pantalla Mis cursos de Academia EBAU Demo, con cursos de Física II e Historia de España.",
    caption: "Vista de alumno · Mis cursos en Academia EBAU Demo.",
  },
  "campus-secure": {
    src: "/product/secure-umbrales.png", width: 1240, height: 768,
    alt: "Configuración de seguridad con umbrales y periodos para combinaciones de navegador y sistema y peticiones de vídeo.",
    caption: "Administración · Configuración de periodos y umbrales de la demo; no muestra avisos detectados.",
  },
};

export const sectionScreenshots: Record<string, ProductScreenshot> = {
  "plugin/herramientas": {
    src: "/product/plugin-estudio.png", width: 931, height: 807,
    alt: "Fragmento de un mapa conceptual de la Monarquía Hispánica, con relaciones entre las instituciones del Estado.",
    caption: "Vista de alumno · Detalle del mapa conceptual de la Monarquía Hispánica.",
  },
  "campus/clases-video": {
    src: "/product/campus-aula-video.png", width: 1655, height: 822,
    alt: "Lección de Historia de España con un reproductor de vídeo y la identificación ficticia Alumno Demo.",
    caption: "Vista de alumno · Lección con vídeo de Historia de España en la academia demo.",
  },
};
