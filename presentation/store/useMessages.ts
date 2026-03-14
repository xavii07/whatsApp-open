import { StorageAdapter } from "@/config/adapters/storage-adapter";
import { MensajePredefinido, mensajesPredefinidos } from "@/config/data/consts";
import { FAVORITOS_CATEGORIA } from "@/config/data/messages";
import { create } from "zustand";

interface MessageState {
  messages: MensajePredefinido[];
  favoritos: MensajePredefinido;
  customMessagesByCategory: Record<string, string[]>;
  getMessagesFavoritos: () => Promise<void>;
  addFavorito: (nuevoMensaje: string) => Promise<void>;
  deleteFavorito: (mensajeABorrar: string) => Promise<void>;
  addMessageToCategory: (categoria: string, mensaje: string) => Promise<void>;
}

const CUSTOM_MESSAGES_KEY = "customMessagesByCategory";

const normalizeByCategory = (
  customMessagesByCategory: Record<string, string[]>,
) => {
  const normalized: Record<string, string[]> = {};

  Object.entries(customMessagesByCategory).forEach(([categoria, mensajes]) => {
    normalized[categoria] = Array.from(new Set(mensajes));
  });

  return normalized;
};

const buildMessagesWithFavoritos = (
  favoritosMensajes: string[],
  customMessagesByCategory: Record<string, string[]>,
) => {
  const baseMessages = mensajesPredefinidos.map((category) => {
    const customMessages = customMessagesByCategory[category.categoria] ?? [];
    return {
      ...category,
      mensajes: Array.from(new Set([...category.mensajes, ...customMessages])),
    };
  });

  return [
    {
      categoria: FAVORITOS_CATEGORIA,
      mensajes: favoritosMensajes,
    },
    ...baseMessages,
  ];
};

export const useMessagesStore = create<MessageState>()((set, get) => ({
  messages: mensajesPredefinidos,
  favoritos: {
    categoria: FAVORITOS_CATEGORIA,
    mensajes: [],
  },
  customMessagesByCategory: {},
  getMessagesFavoritos: async () => {
    const favoritosStorage =
      (await StorageAdapter.getItem("favoritos")) ?? "[]";
    const customMessagesStorage =
      (await StorageAdapter.getItem(CUSTOM_MESSAGES_KEY)) ?? "{}";

    const parsedFavoritos = JSON.parse(favoritosStorage) as string[];
    const parsedCustomMessages = JSON.parse(customMessagesStorage) as Record<
      string,
      string[]
    >;

    const safeFavoritos = Array.from(new Set(parsedFavoritos));
    const safeCustomMessagesByCategory =
      normalizeByCategory(parsedCustomMessages);

    set({
      favoritos: {
        categoria: FAVORITOS_CATEGORIA,
        mensajes: safeFavoritos,
      },
      customMessagesByCategory: safeCustomMessagesByCategory,
      messages: buildMessagesWithFavoritos(
        safeFavoritos,
        safeCustomMessagesByCategory,
      ),
    });
  },

  addFavorito: async (nuevoMensaje: string) => {
    const { favoritos, customMessagesByCategory } = get();
    if (!favoritos.mensajes.includes(nuevoMensaje)) {
      const updatedFavoritos = {
        ...favoritos,
        mensajes: [...favoritos.mensajes, nuevoMensaje],
      };

      set({
        favoritos: updatedFavoritos,
        messages: buildMessagesWithFavoritos(
          updatedFavoritos.mensajes,
          customMessagesByCategory,
        ),
      });

      await StorageAdapter.setItem(
        "favoritos",
        JSON.stringify(updatedFavoritos.mensajes),
      );
    }
  },

  deleteFavorito: async (mensajeABorrar: string) => {
    const { favoritos, customMessagesByCategory } = get();
    const updatedMensajes = favoritos.mensajes.filter(
      (mensaje) => mensaje !== mensajeABorrar,
    );

    const updatedFavoritos = {
      ...favoritos,
      mensajes: updatedMensajes,
    };

    set({
      favoritos: updatedFavoritos,
      messages: buildMessagesWithFavoritos(
        updatedMensajes,
        customMessagesByCategory,
      ),
    });

    await StorageAdapter.setItem("favoritos", JSON.stringify(updatedMensajes));
  },

  addMessageToCategory: async (categoria: string, mensaje: string) => {
    const { favoritos, customMessagesByCategory } = get();

    if (!mensajesPredefinidos.some((cat) => cat.categoria === categoria)) {
      return;
    }

    const current = customMessagesByCategory[categoria] ?? [];
    if (current.includes(mensaje)) {
      return;
    }

    const updatedCustomMessagesByCategory = {
      ...customMessagesByCategory,
      [categoria]: [...current, mensaje],
    };

    set({
      customMessagesByCategory: updatedCustomMessagesByCategory,
      messages: buildMessagesWithFavoritos(
        favoritos.mensajes,
        updatedCustomMessagesByCategory,
      ),
    });

    await StorageAdapter.setItem(
      CUSTOM_MESSAGES_KEY,
      JSON.stringify(updatedCustomMessagesByCategory),
    );
  },
}));
