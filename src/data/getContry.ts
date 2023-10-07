const URLPING = "https://ipinfo.io/json";

export const getCountry = () => {
  fetch(URLPING)
    .then((response) => response.json())
    .then((data) => {
      console.log("País: " + data.country);
    })
    .catch((error) => {
      console.error("Error al obtener la ubicación: " + error);
    });
};
