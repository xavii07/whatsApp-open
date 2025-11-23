import { StorageAdapter } from "@/config/adapters/storage-adapter";
import { MensajePredefinido, mensajesPredefinidos } from "@/config/data/consts";
import { create } from "zustand";

interface MessageState {
  messages: MensajePredefinido[];
  favoritos: MensajePredefinido;
  getMessagesFavoritos: () => void;
  addFavorito: (nuevoMensaje: string) => void;
  deleteFavorito: (mensajeABorrar: string) => void;
}

export const useMessagesStore = create<MessageState>()((set, get) => ({
  messages: mensajesPredefinidos,
  favoritos: {
    categoria: "⭐ Favoritos",
    mensajes: [],
  },
  getMessagesFavoritos: async () => {
    const favoritosStorage =
      (await StorageAdapter.getItem("favoritos")) ?? "[]";
    const parsedFavoritos = JSON.parse(favoritosStorage) as string[];

    set({
      favoritos: {
        categoria: "⭐ Favoritos",
        mensajes: parsedFavoritos,
      },
    });
    set({
      messages: [
        {
          categoria: "⭐ Favoritos",
          mensajes: parsedFavoritos,
        },
        ...mensajesPredefinidos,
      ],
    });
  },

  addFavorito: async (nuevoMensaje: string) => {
    const { favoritos, messages } = get();
    if (!favoritos.mensajes.includes(nuevoMensaje)) {
      favoritos.mensajes.push(nuevoMensaje);
      set({ favoritos });
      set({
        messages: [
          favoritos,
          ...messages.filter((msg) => msg.categoria !== "⭐ Favoritos"),
        ],
      });
      await StorageAdapter.setItem(
        "favoritos",
        JSON.stringify(favoritos.mensajes)
      );
    }
  },

  deleteFavorito: async (mensajeABorrar: string) => {
    const { favoritos, messages } = get();
    favoritos.mensajes = favoritos.mensajes.filter(
      (mensaje) => mensaje !== mensajeABorrar
    );
    set({ favoritos });
    set({
      messages: [
        favoritos,
        ...messages.filter((msg) => msg.categoria !== "⭐ Favoritos"),
      ],
    });
    await StorageAdapter.setItem(
      "favoritos",
      JSON.stringify(favoritos.mensajes)
    );
  },
}));
