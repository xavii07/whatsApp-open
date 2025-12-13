export const URL_WHATSAPP = "https://wa.me";

export const COLOR_PRIMARY = "#25D366";
export const COLOR_SECONDARY = "#075E54";
export const COLOR_SECONDARY_ACCENT = "#075E54bb";
export const COLOR_BLANCO = "#ffffff";

export interface MensajePredefinido {
  categoria: string;
  mensajes: string[];
}

export const mensajesPredefinidos: MensajePredefinido[] = [
  {
    categoria: " 📝 Personalizado / directo",
    mensajes: [
      "Hola, tengo una consulta rápida.",
      "Buenas, ¿puedo llamarte un momento?",
      "¡Hola! ¿Podrías atenderme por favor?",
    ],
  },
  {
    categoria: " 📞 Primer contacto",
    mensajes: [
      "¡Hola! Vi tu número y quería consultarte sobre tus servicios.",
      "Hola 👋, me interesa obtener más información.",
      "¡Buenas! Estoy interesado(a) en lo que ofreces, ¿podrías contarme más?",
      "Hola, vi tu anuncio y me gustaría saber más detalles.",
    ],
  },
  {
    categoria: " 💼 Ventas / Negocios",
    mensajes: [
      "Hola 👋, ¿podrías enviarme una cotización o lista de precios?",
      "¡Buenas! Quisiera saber si tienen disponibilidad del producto.",
      "Hola, ¿aceptan transferencias o pagos por tarjeta?",
      "Hola, ¿cuáles son los métodos de envío y tiempos de entrega?",
    ],
  },
  {
    categoria: " 🛠️ Asesoría / Soporte",
    mensajes: [
      "Hola, necesito ayuda con mi pedido.",
      "Buenas, tengo una duda sobre el servicio que adquirí.",
      "Hola, ¿podrían asistirme con un problema que tengo?",
      "Hola 👋, necesito soporte técnico por favor.",
    ],
  },
  {
    categoria: " 🧑‍💼 Presentación personal",
    mensajes: [
      "¡Hola! Mi nombre es [Tu nombre], te contacto porque me interesa colaborar contigo.",
      "Hola, soy [Tu nombre] de [Tu empresa], quisiera conversar sobre una posible alianza.",
      "¡Saludos! Te escribo para presentarte una propuesta interesante.",
    ],
  },
  {
    categoria: " 🔄 Seguimiento / Recontacto",
    mensajes: [
      "Hola 👋, ¿tuviste oportunidad de revisar mi mensaje anterior?",
      "Buenas, solo quería hacer seguimiento a nuestra conversación anterior.",
      "Hola, quedamos pendientes de confirmar algo, ¿sigues interesado(a)?",
    ],
  },
];
