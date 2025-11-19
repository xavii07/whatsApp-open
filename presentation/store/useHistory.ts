import { StorageAdapter } from "@/config/adapters/storage-adapter";
import { CardData } from "@/infrastructure/interfaces/history.response";
import { create } from "zustand";

export interface HistoryState {
  history: Record<string, CardData[]>;
  getHistory: () => void;
  addHistory: (history: CardData, date: string) => void;
  removeHistory: (date: string, idHistory: string) => void;
  updateNombreUser: (idHistory: string, nombreUser: string) => void;
}

export const useHistory = create<HistoryState>((set, get) => ({
  history: {},

  getHistory: async () => {
    const history = (await StorageAdapter.getItem("history")) ?? "{}";
    const parsedHistory = JSON.parse(history) as Record<string, unknown>;

    const validHistory: Record<string, CardData[]> = {};
    for (const [date, data] of Object.entries(parsedHistory)) {
      if (data) {
        validHistory[date] = data as CardData[];
      }
    }

    const sortedHistory = Object.fromEntries(
      Object.entries(validHistory).sort(
        ([dateA], [dateB]) =>
          new Date(dateB).getTime() - new Date(dateA).getTime()
      )
    );

    set({ history: sortedHistory });
  },

  addHistory: async (historySave: CardData, date: string) => {
    const history = get().history;
    if (!history[date]) history[date] = [];
    history[date].unshift(historySave);
    set({ history });
    await StorageAdapter.setItem("history", JSON.stringify(history));
  },

  removeHistory: async (date: string, idHistory: string) => {
    const history = get().history;
    const searchHistory = history[date];

    if (searchHistory) {
      const newHistory = searchHistory.filter((item) => item.id !== idHistory);
      if (newHistory.length === 0) {
        delete history[date];
      } else {
        history[date] = newHistory;
      }
      set({ history });
      await StorageAdapter.setItem("history", JSON.stringify(history));
    }
  },

  updateNombreUser: async (idHistory: string, nombreUser: string) => {
    const history = get().history;

    for (const [date, data] of Object.entries(history)) {
      const index = data.findIndex((item) => item.id === idHistory);
      if (index !== -1) {
        history[date][index].nombreUser = nombreUser;
        break;
      }
    }

    set({ history });
    await StorageAdapter.setItem("history", JSON.stringify(history));
  },
}));
