import { DisplayMessage } from "@/components/Messages/types";
import { MensajePredefinido } from "@/config/data/consts";
import { SECTION_ORDER } from "@/components/Messages/constants";
import { FAVORITOS_CATEGORIA } from "@/config/data/messages";

const normalizeText = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export const getSectionTitle = (categoria: string) => {
  const normalized = normalizeText(categoria);

  if (normalized.includes("personalizado") || normalized.includes("directo")) {
    return "Personalizado / directo";
  }
  if (normalized.includes("primer contacto")) {
    return "Primer contacto";
  }
  if (normalized.includes("ventas") || normalized.includes("negocios")) {
    return "Ventas / negocios";
  }
  if (normalized.includes("asesoria") || normalized.includes("soporte")) {
    return "Asesoría / soporte";
  }
  if (normalized.includes("presentacion")) {
    return "Presentación personal";
  }
  if (normalized.includes("seguimiento") || normalized.includes("recontacto")) {
    return "Seguimiento / recontacto";
  }

  return categoria.trim();
};

export const syncGeneratedFavorites = (
  generatedMessages: DisplayMessage[],
  favoritosMensajes: string[],
) =>
  generatedMessages.map((message) => ({
    ...message,
    esFavorito: favoritosMensajes.includes(message.texto),
  }));

export const buildMensajesDisponibles = (
  messages: MensajePredefinido[],
  favoritosMensajes: string[],
): DisplayMessage[] => {
  const uniqueMessages = new Map<string, DisplayMessage>();

  messages
    .filter((category) => category.categoria !== FAVORITOS_CATEGORIA)
    .forEach((category) => {
      category.mensajes.forEach((texto, index) => {
        if (!uniqueMessages.has(texto)) {
          uniqueMessages.set(texto, {
            id: `${category.categoria}-${index}-${texto}`,
            texto,
            categoria: category.categoria.trim(),
            esFavorito: favoritosMensajes.includes(texto),
          });
        }
      });
    });

  return Array.from(uniqueMessages.values());
};

export const buildSeccionesMensajes = (
  mensajesDisponibles: DisplayMessage[],
) => {
  const grouped = mensajesDisponibles.reduce(
    (acc, message) => {
      const key = getSectionTitle(message.categoria ?? "");
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(message);
      return acc;
    },
    {} as Record<string, DisplayMessage[]>,
  );

  return SECTION_ORDER.filter((title) => grouped[title]?.length).map(
    (title) => ({
      title,
      data: grouped[title],
    }),
  );
};

export const buildMensajesFavoritos = (favoritosMensajes: string[]) =>
  favoritosMensajes.map((texto, index) => ({
    id: `favorito-${index}-${texto}`,
    texto,
    esFavorito: true,
    categoria: FAVORITOS_CATEGORIA,
  }));

export const getCategoriasDisponibles = (messages: MensajePredefinido[]) =>
  messages
    .filter((category) => category.categoria !== FAVORITOS_CATEGORIA)
    .map((category) => category.categoria);
