import { StorageAdapter } from "@/config/adapters/storage-adapter";
import { MensajePredefinido, mensajesPredefinidos } from "@/config/data/consts";
import { create } from "zustand";

interface MessageState {
  messages: MensajePredefinido[];
  favoritos: MensajePredefinido;
  getMessagesFavoritos: () => Promise<void>;
  addFavorito: (nuevoMensaje: string) => Promise<void>;
  deleteFavorito: (mensajeABorrar: string) => Promise<void>;
}

const FAVORITOS_CATEGORIA = "⭐ Favoritos";

const buildMessagesWithFavoritos = (favoritosMensajes: string[]) => [
  {
    categoria: FAVORITOS_CATEGORIA,
    mensajes: favoritosMensajes,
  },
  ...mensajesPredefinidos,
];

export const useMessagesStore = create<MessageState>()((set, get) => ({
  messages: mensajesPredefinidos,
  favoritos: {
    categoria: FAVORITOS_CATEGORIA,
    mensajes: [],
  },
  getMessagesFavoritos: async () => {
    const favoritosStorage =
      (await StorageAdapter.getItem("favoritos")) ?? "[]";
    const parsedFavoritos = JSON.parse(favoritosStorage) as string[];

    const safeFavoritos = Array.from(new Set(parsedFavoritos));

    set({
      favoritos: {
        categoria: FAVORITOS_CATEGORIA,
        mensajes: safeFavoritos,
      },
      messages: buildMessagesWithFavoritos(safeFavoritos),
    });
  },

  addFavorito: async (nuevoMensaje: string) => {
    const { favoritos } = get();
    if (!favoritos.mensajes.includes(nuevoMensaje)) {
      const updatedFavoritos = {
        ...favoritos,
        mensajes: [...favoritos.mensajes, nuevoMensaje],
      };

      set({
        favoritos: updatedFavoritos,
        messages: buildMessagesWithFavoritos(updatedFavoritos.mensajes),
      });

      await StorageAdapter.setItem(
        "favoritos",
        JSON.stringify(updatedFavoritos.mensajes),
      );
    }
  },

  deleteFavorito: async (mensajeABorrar: string) => {
    const { favoritos } = get();
    const updatedMensajes = favoritos.mensajes.filter(
      (mensaje) => mensaje !== mensajeABorrar,
    );

    const updatedFavoritos = {
      ...favoritos,
      mensajes: updatedMensajes,
    };

    set({
      favoritos: updatedFavoritos,
      messages: buildMessagesWithFavoritos(updatedMensajes),
    });

    await StorageAdapter.setItem("favoritos", JSON.stringify(updatedMensajes));
  },
}));
