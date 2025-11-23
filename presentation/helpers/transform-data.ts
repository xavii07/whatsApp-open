export const formatDate = (date: string) => {
  const [y, m, d] = date.split("-").map(Number);
  const localDate = new Date(y, m - 1, d);

  const options: Intl.DateTimeFormatOptions = {
    timeZone: "America/Guayaquil",
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return localDate.toLocaleDateString("es-EC", options);
};
