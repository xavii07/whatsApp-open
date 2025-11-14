import { mensajesPredefinidos } from "../data/consts";

export function obtenerMensajeAleatorio(): string {
  const categoriaAleatoria =
    mensajesPredefinidos[
      Math.floor(Math.random() * mensajesPredefinidos.length)
    ];

  const mensajeAleatorio =
    categoriaAleatoria.mensajes[
      Math.floor(Math.random() * categoriaAleatoria.mensajes.length)
    ];

  return mensajeAleatorio;
}
