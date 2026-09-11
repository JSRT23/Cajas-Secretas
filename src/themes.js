export const THEMES = {
  "san-valentin": {
    id: "san-valentin",
    label: "San Valentín",
    subtitle: "Amigo Secreto",
    tagline: "Cada quien le escribe y regala a alguien en secreto.",
    revealVerb: "le escribe en secreto a",
    boxWord: "sobre",
    boxIcon: "/icons/san-valentin.png",
    cardEyebrow: "Tu persona secreta",
    className: "theme-valentin",
    icons: {
      seal: "/icons/san-valentin.png",
      bow: "/icons/oso-de-peluche.png",
      watermark: ["/icons/san-valentin.png", "/icons/oso-de-peluche.png"],
    },
    tips: [
      "Piensa en algo que de verdad le guste, no en lo primero que encuentres.",
      "Un detalle escrito a mano vale más que cualquier envoltura.",
      "La sorpresa se cuida: ni una pista antes del día del intercambio.",
    ],
  },
  navidad: {
    id: "navidad",
    label: "Navidad",
    subtitle: "Mi Santa Claus",
    tagline: "Cada quien es el Santa secreto de alguien más.",
    revealVerb: "es el Santa secreto de",
    boxWord: "regalo",
    boxIcon: "/icons/regalos.png",
    cardEyebrow: "Tu regalado secreto",
    className: "theme-navidad",
    icons: {
      seal: "/icons/arbol-de-navidad.png",
      bow: "/icons/regalos.png",
      watermark: ["/icons/regalos.png", "/icons/baston-de-caramelo.png", "/icons/arbol-de-navidad.png"],
    },
    tips: [
      "Envuélvelo con cuidado: la presentación también es parte del regalo.",
      "Pregunta indirectamente qué le hace falta o qué le gustaría.",
      "Un regalo pensado siempre vale más que uno costoso.",
    ],
  },
  halloween: {
    id: "halloween",
    label: "Halloween",
    subtitle: "Mi Dulce o Truco",
    tagline: "Cada quien le deja dulces (o trucos) a alguien más.",
    revealVerb: "le deja dulces a",
    boxWord: "caldero",
    boxIcon: "/icons/jack-o-linterna.png",
    cardEyebrow: "Tu víctima secreta",
    className: "theme-halloween",
    icons: {
      seal: "/icons/fiesta-de-halloween.png",
      bow: "/icons/jack-o-linterna.png",
      watermark: ["/icons/fantasma.png", "/icons/murcielagos.png", "/icons/jack-o-linterna.png"],
    },
    tips: [
      "Los dulces nunca fallan, pero un detalle personal se recuerda más.",
      "Si haces una broma, que sea divertida, nunca pesada.",
      "Guarda el secreto hasta la noche de Halloween.",
    ],
  },
};

export const THEME_ORDER = ["san-valentin", "navidad", "halloween"];
