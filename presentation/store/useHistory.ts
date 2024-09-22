import { create } from "zustand";

export interface HistoryState {
  history: string[];
  addHistory: (history: string) => void;
}
