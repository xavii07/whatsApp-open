// stores/useCountryStore.ts
import { StorageAdapter } from "@/config/adapters/storage-adapter";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CountryState {
  countryCode: string | null;
  isLoading: boolean;
  error: string | null;
  setCountryCode: (code: string) => void;
  loadCountry: () => Promise<void>;
  clearCountry: () => void;
}

export const useCountryStore = create<CountryState>()(
  persist(
    (set, get) => ({
      countryCode: null,
      isLoading: false,
      error: null,

      setCountryCode: (code: string) => {
        set({ countryCode: code });
      },

      loadCountry: async () => {
        if (get().countryCode) {
            console.log("ya existe el pais");
          return;
        }

        set({ isLoading: true, error: null });

        try {
          const response = await fetch("https://ipinfo.io/json");
          console.log({"llamada api": response});
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const data = await response.json();
          set({ 
            countryCode: data.country, 
            isLoading: false 
          });
        } catch (error) {
          console.error("Error al obtener la ubicación:", error);
          set({ 
            error: "No se pudo obtener la ubicación", 
            isLoading: false 
          });
        }
      },

      clearCountry: () => {
        set({ countryCode: null });
      },
    }),
    {
      name: "country-storage",
      storage: createJSONStorage(() => StorageAdapter),
      partialize: (state) => ({ 
        countryCode: state.countryCode 
      }),
    }
  )
);