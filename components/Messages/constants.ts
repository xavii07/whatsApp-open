import { MensajesTab } from "./types";
import { FAVORITOS_CATEGORIA } from "@/config/data/messages";

export { FAVORITOS_CATEGORIA };

export const MESSAGE_TABS: { key: MensajesTab; label: string }[] = [
  { key: "generar", label: "Generar" },
  { key: "todos", label: "Todos" },
  { key: "favoritos", label: "Favoritos" },
];

export const SECTION_ORDER = [
  "Personalizado / directo",
  "Primer contacto",
  "Ventas / negocios",
  "Asesoría / soporte",
  "Presentación personal",
  "Seguimiento / recontacto",
] as const;
