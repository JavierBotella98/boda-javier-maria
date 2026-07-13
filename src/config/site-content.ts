// Contenido editable de la web. Para cambiar cualquier texto, fecha, horario
// o dato, edita este archivo y despliega — no hace falta tocar el resto del código.

export const couple = {
  brideFirstName: "María",
  groomFirstName: "Javier",
  displayNames: "Javier & María",
};

export const wedding = {
  // Fecha y hora en ISO 8601, zona horaria de España
  dateTimeIso: "2027-04-10T13:00:00+02:00",
  dateLabel: "10 de abril de 2027",
  timeLabel: "13:00h",
};

export const ceremony = {
  name: "Iglesia de San Juan Bautista",
  address: "Calle San Juan, s/n, 29005 Málaga",
  mapsQuery: "Iglesia de San Juan Bautista, Málaga",
  // TODO: sustituir por el enlace real de Google Maps cuando esté disponible
  mapsEmbedUrl:
    "https://www.google.com/maps?q=Iglesia+de+San+Juan+Bautista+Malaga&output=embed",
};

export const venue = {
  name: "Finca [pendiente de confirmar]",
  address: "[Dirección pendiente]",
  mapsQuery: "Finca pendiente Malaga",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=Malaga&output=embed",
};

export const hotels = [
  {
    name: "Hotel [pendiente]",
    description: "A 10 minutos de la finca. Precio orientativo por noche: [pendiente].",
    link: "#",
  },
  {
    name: "Hotel [pendiente]",
    description: "En el centro de Málaga, cerca de la iglesia. Precio orientativo por noche: [pendiente].",
    link: "#",
  },
];

export const buses = {
  outbound: {
    label: "Autobús de ida",
    description: "Iglesia → Finca, tras la ceremonia.",
  },
  returnTrips: [
    {
      id: "primera",
      label: "Primera salida",
      time: "[hora pendiente]",
      description: "Justo después de la cena.",
    },
    {
      id: "segunda",
      label: "Segunda salida",
      time: "[hora pendiente]",
      description: "Un poco más tarde.",
    },
    {
      id: "tercera",
      label: "Última salida",
      time: "[hora pendiente]",
      description: "Al final de la fiesta.",
    },
  ],
  returnDestination: "Centro de Málaga",
};

export const dressCode = {
  title: "Código de vestimenta",
  description:
    "Etiqueta elegante / formal. Ellas, vestido largo o cocktail; ellos, traje. Evitad el blanco, es el color de la novia 😉.",
};

export const timeline = [
  { time: "13:00h", event: "Ceremonia religiosa" },
  { time: "14:30h", event: "Cóctel de bienvenida" },
  { time: "16:00h", event: "Banquete" },
  { time: "20:00h", event: "Fiesta y baile" },
  { time: "[pendiente]", event: "Autobuses de vuelta a Málaga" },
];

export const giftRegistry = {
  title: "Lista de bodas",
  message:
    "Vuestra presencia es el mejor regalo, pero si queréis contribuir a nuestro viaje de novios, podéis hacerlo en este número de cuenta:",
  iban: "ES00 0000 0000 0000 0000 0000",
  accountHolder: "Javier y María",
};

export const ourStory = {
  title: "Nuestra historia",
  paragraphs: [
    "[Aquí irá el texto sobre cómo os conocisteis — sustituid este párrafo por vuestra historia.]",
    "[Segundo párrafo opcional: algún momento o anécdota especial en el camino hasta la boda.]",
  ],
};

export const faq = [
  {
    question: "¿Hasta cuándo puedo confirmar mi asistencia?",
    answer:
      "No hay una fecha límite estricta, pero os agradeceríamos que confirmarais lo antes posible y, como muy tarde, un mes antes de la boda.",
  },
  {
    question: "¿Puedo llevar acompañante?",
    answer:
      "Sí, en el formulario de confirmación puedes indicar cuántas personas te acompañan.",
  },
  {
    question: "¿Hay servicio de autobús?",
    answer:
      "Sí, habrá autobús de la iglesia a la finca, y de vuelta a Málaga con varios horarios a lo largo de la noche. Puedes indicarlo en el formulario.",
  },
  {
    question: "¿Y si tengo alguna alergia o intolerancia?",
    answer:
      "Indícalo en el formulario de confirmación, tanto para ti como para cada acompañante, así el catering podrá tenerlo en cuenta.",
  },
];

export const gallery = {
  isPublished: false,
  comingSoonMessage:
    "Aquí podréis ver y descargar las fotos de la boda. Las subiremos en las semanas posteriores al evento — ¡Volved a visitar esta sección pronto!",
};

export const rsvpForm = {
  confirmationTitle: (name: string) => `¡Gracias, ${name}!`,
  confirmationMessage: "Hemos recibido tu confirmación 🎉",
  privacyNotice:
    "Tus datos (incluidos los relativos a alergias o necesidades especiales) se utilizarán exclusivamente para la organización de la boda y no se compartirán con terceros ajenos a su preparación (catering, transporte). Serán eliminados una vez finalizado el evento.",
};

export const siteMeta = {
  title: `Boda de ${couple.displayNames}`,
  description: `Toda la información sobre la boda de ${couple.displayNames} — ${wedding.dateLabel}. Confirma tu asistencia aquí.`,
};
