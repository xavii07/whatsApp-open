export type MensajesTab = "generar" | "todos" | "favoritos";

export interface DisplayMessage {
  id: string;
  texto: string;
  esFavorito: boolean;
  categoria?: string;
}
