import { StorageAdapter } from "@/config/adapters/storage-adapter";
import { CardData } from "@/infrastructure/interfaces/history.response";
import { create } from "zustand";

export interface HistoryState {
  history: Record<string, CardData[]>;
  getHistory: () => void;
  addHistory: (history: CardData, date: string) => void;
  removeHistory: (date: string, idHistory: string) => void;
}

export const useHistory = create<HistoryState>((set, get) => ({
  history: {},

  getHistory: async () => {
    const history = (await StorageAdapter.getItem("history")) ?? "{}";
    console.log({ history });
    if (history) {
      set({ history: JSON.parse(history) });
    }
  },

  addHistory: async (historySave: CardData, date: string) => {
    const history = get().history;

    const searchHistory = history[date];

    if (searchHistory) {
      history[date] = [...searchHistory, historySave];
    } else {
      history[date] = [historySave];
    }
    set({ history });
    await StorageAdapter.setItem("history", JSON.stringify(history));
  },
  removeHistory: async (date: string, idHistory: string) => {
    const history = get().history;
    console.log({ history });
    console.log({ date });
    const searchHistory = history[date];
    console.log({ searchHistory });

    if (searchHistory) {
      const newHistory = searchHistory.filter(
        (history) => history.id !== idHistory
      );
      history[date] = newHistory;
      set({ history });
      await StorageAdapter.setItem("history", JSON.stringify(history));
    }
  },
}));
