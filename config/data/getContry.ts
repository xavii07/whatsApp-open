import { IPResponse } from "@/infrastructure/interfaces/ip.response";

const URLPING = "https://ipinfo.io/json";

export const getCountry = async () => {
  try {
    const response = await fetch(URLPING);
    const data: IPResponse = await response.json();
    return data.country;
  } catch (error) {
    console.error("Error al obtener la ubicación: " + error);
  }
};
