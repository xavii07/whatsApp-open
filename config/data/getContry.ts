import { IPResponse } from "@/infrastructure/interfaces/ip.response";

const URLPING = "https://ipinfo.io/json";

export const getCountry = async () => {
  console.log("llamada api");
  try {
    const response = await fetch(URLPING);
    if(!response.ok) {
      throw new Error("Error al obtener la ubicación");
    }

    const data: IPResponse = await response.json();
    return data.country;
  } catch (error) {
    console.error("Error al obtener la ubicación: " + error);
  }
};
