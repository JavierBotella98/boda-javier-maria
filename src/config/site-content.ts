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
  name: "Iglesia de San Juan, Málaga",
  address: "C. Cinco Bolas, 9, Distrito Centro, 29005 Málaga",
  mapsQuery: "Iglesia de San Juan de Málaga",
  coords: { lat: 36.720463, lng: -4.4233903 },
  mapsEmbedUrl:
    "https://www.google.com/maps?q=36.720463,-4.4233903&z=17&output=embed",
};

export const venue = {
  name: "Hacienda del Álamo",
  address: "Cam. de Casabermeja, 130, Cdad. Jardín, 29014 Málaga",
  mapsQuery: "Hacienda del Álamo, Málaga",
  coords: { lat: 36.7647705, lng: -4.421514 },
  mapsEmbedUrl:
    "https://www.google.com/maps?q=36.7647705,-4.421514&z=16&output=embed",
  parkingNote: "Hay aparcamiento disponible en la Hacienda para coches privados.",
};

export const accommodation = {
  isPublished: false,
  comingSoonMessage:
    "Estamos trabajando en ello: primero necesitamos saber el número aproximado de habitaciones que se van a necesitar. Intentaremos ofrecer opciones para todos los bolsillos.",
  rsvpDisclaimer:
    "Estamos hablando con distintos hoteles del centro de Málaga para ofrecer opciones para todos los bolsillos. En cuanto sepamos cuáles son los definitivos y el precio por noche, os lo haremos saber.",
};

export const hotels = [
  {
    name: "Hotel [pendiente]",
    description: "A 10 minutos de la Hacienda. Precio orientativo por noche: [pendiente].",
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
    description: "Iglesia → Hacienda, tras la ceremonia.",
  },
  returnTrips: [
    {
      id: "primera",
      label: "Primera salida",
      time: "19:30h",
      description: "Al terminar el convite.",
    },
    {
      id: "segunda",
      label: "Segunda salida",
      time: "21:30h",
      description: "Para los que quieran tomar alguna copa y bailar un poco.",
    },
    {
      id: "tercera",
      label: "Última salida",
      time: "01:00h",
      description: "Para los más valientes: los que vayan directos a Andén.",
    },
  ],
  returnDestination: "Centro de Málaga",
  returnTimesDisclaimer:
    "Los horarios de los autobuses son provisionales y podrían sufrir alguna modificación.",
};

export const dressCode = {
  title: "Código de vestimenta",
  intro: "Etiqueta elegante / formal.",
  women: {
    label: "Ellas",
    items: [
      "Vestido largo o de cóctel.",
      "Evitad el blanco y los colores crema — ese privilegio es solo de la novia 😉.",
    ],
  },
  men: {
    label: "Ellos",
    items: ["Traje.", "Corbata.", "Zapato de vestir."],
  },
};

export const timeline = [
  { time: "13:00h", event: "Ceremonia religiosa en la Iglesia de San Juan", icon: "⛪" },
  { time: "14:30h", event: "Salida de los autobuses hacia la Hacienda", icon: "🚌" },
  { time: "15:00h", event: "Cóctel de bienvenida", icon: "🥂" },
  { time: "17:00h", event: "Banquete", icon: "🍽️" },
  { time: "19:00h", event: "Fiesta y baile", icon: "💃" },
  { time: "01:00h", event: "Fin del evento", icon: "🎉" },
];

export const giftRegistry = {
  title: "Lista de bodas",
  message:
    "Vuestra presencia es el mejor regalo, pero si queréis contribuir a nuestro viaje de novios, podéis hacerlo en este número de cuenta:",
  iban: "ES71 0128 8700 1701 0569 4217",
  bank: "Bankinter",
  accountHolder: "Javier y María",
};

export const ourStory = {
  title: "Nuestra historia",
  paragraphs: [
    'Todo empezó como esas películas que luego resultan ser un cliché: un Erasmus en Florencia, demasiado spritz y demasiada pizza como para que saliera mal. Fue en Roma, en febrero de 2021, cuando decidimos que aquello iba en serio: sobrevivir juntos a un viaje ya dice mucho de una pareja. Cuando el Erasmus terminó, la vida no nos lo puso fácil: ella se fue a Málaga y luego a Oviedo a hacerse médico de verdad (el MIR manda), y él a Barcelona a terminar la carrera (o eso dijo). Un par de años a base de trenes, aviones y "nos vemos en dos finde", hasta que ella sacó plaza y aterrizamos los dos en Madrid, que es donde seguimos, ya sin excusas para no vernos.',
    'Cinco años después de aquel Erasmus, sin haber vuelto a Florencia desde entonces, a él le dio por proponer volver "solo a dar una vuelta". Sospechoso ya de por sí. Acabamos en el Giardino delle Rose, el mirador donde antes nos tomábamos una pizza y un spritz con vistas a la ciudad, y entre muchos nervios (de él, que quede claro) y la misma vista de siempre, hubo anillo, hubo un sí, y aquí estamos: los mismos del Erasmus, con algo más de experiencia y una boda por el medio.',
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
      "Sí, habrá autobús de la iglesia a la Hacienda, y de vuelta a Málaga con varios horarios a lo largo de la noche. Puedes indicarlo en el formulario.",
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
