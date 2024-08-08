import { useEffect, useState } from "react";
import { getCountry } from "@/config/data/getContry";

const useIp = () => {
  const [country, setCountry] = useState<string | undefined>("");

  useEffect(() => {
    getCountry().then((data) => setCountry(data));
  }, []);

  return { country };
};

export default useIp;
