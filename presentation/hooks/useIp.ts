// presentation/hooks/useIp.ts
import { useEffect } from "react";
import { useCountryStore } from "../store/useCountryStore";

const useIp = () => {
  const { countryCode, isLoading, error, loadCountry } = useCountryStore();
  console.log({countryCode, isLoading, error})

  useEffect(() => {
    if (!countryCode && !isLoading) {
      loadCountry();
    }
  }, [countryCode, isLoading]);

  return { 
    country: countryCode, 
    isLoading, 
    error 
  };
};

export default useIp;