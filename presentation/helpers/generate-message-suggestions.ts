import { MensajePredefinido } from "@/config/data/consts";
import { DisplayMessage } from "@/components/Messages/types";

const FAVORITOS_CATEGORIA = "⭐ Favoritos";

interface GenerateMessageSuggestionsParams {
  prompt: string;
  categories: MensajePredefinido[];
  favoriteMessages: string[];
  delayMs?: number;
}

const normalizeText = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

const sleep = (delayMs: number) =>
  new Promise((resolve) => setTimeout(resolve, delayMs));

export const generateMessageSuggestions = async ({
  prompt,
  categories,
  favoriteMessages,
  delayMs = 800,
}: GenerateMessageSuggestionsParams): Promise<DisplayMessage[]> => {
  await sleep(delayMs);

  const normalizedPrompt = normalizeText(prompt);
  const tokens = normalizedPrompt
    .split(/\s+/)
    .map((token) => token.trim())
    .filter((token) => token.length > 2);

  const candidates = categories
    .filter((category) => category.categoria !== FAVORITOS_CATEGORIA)
    .flatMap((category) =>
      category.mensajes.map((texto, index) => ({
        id: `${category.categoria}-${index}-${texto}`,
        texto,
        categoria: category.categoria.trim(),
        normalizedText: normalizeText(`${category.categoria} ${texto}`),
      })),
    );

  const rankedCandidates = candidates
    .map((candidate) => ({
      ...candidate,
      score: tokens.reduce((score, token) => {
        return candidate.normalizedText.includes(token) ? score + 1 : score;
      }, 0),
    }))
    .sort((first, second) => second.score - first.score);

  const selectedCandidates = rankedCandidates.some(
    (candidate) => candidate.score > 0,
  )
    ? rankedCandidates.filter((candidate) => candidate.score > 0)
    : rankedCandidates;

  const uniqueMessages = new Map<string, DisplayMessage>();

  selectedCandidates.forEach((candidate, index) => {
    if (!uniqueMessages.has(candidate.texto) && uniqueMessages.size < 4) {
      uniqueMessages.set(candidate.texto, {
        id: `generated-${Date.now()}-${index}`,
        texto: candidate.texto,
        categoria: candidate.categoria,
        esFavorito: favoriteMessages.includes(candidate.texto),
      });
    }
  });

  return Array.from(uniqueMessages.values());
};
