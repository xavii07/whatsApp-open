import { StorageAdapter } from "@/config/adapters/storage-adapter";
import { getCountry } from "@/config/data/getContry";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CountryState {
  countryCode: string | null;
  isLoading: boolean;
  error: string | null;
  setCountryCode: (code: string) => void;
  loadCountry: () => Promise<void>;
  clearCountry: () => void;
  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
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
          return;
        }

        set({ isLoading: true, error: null });

        try {
            const country = await getCountry();
          set({ 
            countryCode: country, 
            isLoading: false 
          });
        } catch (error) {
          set({ 
            error: "No se pudo obtener la ubicación", 
            isLoading: false 
          });
        }
      },

      clearCountry: () => {
        set({ countryCode: null });
      },
      
      hasHydrated: false,
      setHasHydrated: (state: boolean) => {
        set({ hasHydrated: state });
      }
    }),
    {
      name: "country-storage",
      storage: createJSONStorage(() => StorageAdapter),
      partialize: (state) => ({ 
        countryCode: state.countryCode 
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);