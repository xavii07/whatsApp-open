export const formatDate = (date: string) => {
  const localDate = new Date(date + "T00:00:00");

  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return localDate.toLocaleDateString("es-EC", options);
};
