export interface PromptSuggestionItem {
  label: string;
  prompt: string;
}

export const PROMPT_SUGGESTIONS: PromptSuggestionItem[] = [
  {
    label: "Saludo cliente",
    prompt:
      "Genera un saludo corto para iniciar una conversación con un cliente potencial de forma amable y profesional.",
  },
  {
    label: "Seguimiento",
    prompt:
      "Genera un mensaje corto para dar seguimiento a un cliente que mostró interés pero aún no responde.",
  },
  {
    label: "Recordatorio pago",
    prompt:
      "Genera un mensaje amable recordando a un cliente que tiene un pago pendiente.",
  },
  {
    label: "Confirmar cita",
    prompt:
      "Genera un mensaje para confirmar una cita o reunión con un cliente.",
  },
  {
    label: "Agradecimiento",
    prompt:
      "Genera un mensaje corto agradeciendo a un cliente por su compra o confianza.",
  },
  {
    label: "Reactivar cliente",
    prompt:
      "Genera un mensaje cordial para reactivar la conversación con un cliente que no responde desde hace semanas.",
  },
  {
    label: "Enviar catálogo",
    prompt:
      "Genera un mensaje breve para enviar un catálogo de productos y motivar al cliente a revisarlo.",
  },
  {
    label: "Promoción limitada",
    prompt:
      "Genera un mensaje persuasivo y corto para comunicar una promoción por tiempo limitado.",
  },
  {
    label: "Solicitud de reseña",
    prompt:
      "Genera un mensaje amable para pedir una reseña después de una compra o servicio.",
  },
  {
    label: "Soporte postventa",
    prompt:
      "Genera un mensaje de postventa para confirmar que todo salió bien y ofrecer ayuda adicional.",
  },
  {
    label: "Cierre de venta",
    prompt:
      "Genera un mensaje claro para invitar al cliente a concretar la compra hoy.",
  },
  {
    label: "Confirmar envío",
    prompt:
      "Genera un mensaje breve para confirmar al cliente que su pedido fue enviado y compartir seguimiento.",
  },
];
