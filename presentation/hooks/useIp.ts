import { useEffect } from "react";
import { useCountryStore } from "../store/useCountryStore";

const useIp = () => {
  const { countryCode, isLoading, error, loadCountry, hasHydrated } = useCountryStore();

  useEffect(() => {
    if (hasHydrated && !countryCode && !isLoading) {
      loadCountry();
    }
  }, [countryCode, isLoading, hasHydrated]);

  return { 
    country: countryCode, 
    isLoading: isLoading || !hasHydrated, 
    error 
  };
};

export default useIp;