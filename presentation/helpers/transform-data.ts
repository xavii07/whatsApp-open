export const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    timeZone: "America/Guayaquil",
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("es-EC", options);
};
