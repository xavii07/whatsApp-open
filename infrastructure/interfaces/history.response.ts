export interface CardData {
  id: string;
  codigoISO: string;
  bandera: string;
  codigoPais: string;
  telefono: string;
}

export interface HistoryData {
  date: string;
  data: CardData[];
}
