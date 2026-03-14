import { DisplayMessage } from "@/components/Messages/types";

interface GenerateMessageSuggestionsParams {
  prompt: string;
  favoriteMessages: string[];
}

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const OPENROUTER_MODEL = "openrouter/free";

const buildSystemPrompt = () => {
  return [
    "Eres un asistente experto en redactar mensajes iniciales, saludos de conversación para WhatsApp y Telegram en español.",
    "Debes convertir la intención del usuario en una frase corta, clara y lista para enviar.",
    "Ofrece variación de tono: una opción neutral y cordial",
    "No respondas preguntas fuera de esta tarea.",
    "Debes responder con EXACTAMENTE 1 opcion.",
    "Sin numeración, sin viñetas, sin comillas y sin explicación.",
  ].join(" ");
};

const sanitizeLine = (line: string) =>
  line
    .replace(/^\s*[-*•\d.)]+\s*/, "")
    .replace(/^\s*["'“”]+|["'“”]+\s*$/g, "")
    .trim();

const parseMessagesFromLLM = (content: string) => {
  const seen = new Set<string>();

  return content
    .split(/\r?\n/)
    .map(sanitizeLine)
    .filter((line) => {
      if (line.length === 0) return false;
      const key = line.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
};

const FALLBACK_MESSAGE = "No se pudo generar el mensaje";

export const generateMessageSuggestions = async ({
  prompt,
  favoriteMessages,
}: GenerateMessageSuggestionsParams): Promise<DisplayMessage[]> => {
  const apiKey = process.env.EXPO_PUBLIC_OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error("Falta EXPO_PUBLIC_OPENROUTER_API_KEY");
  }

  let parsedMessages: string[] = [];

  try {
    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: OPENROUTER_MODEL,
        messages: [
          {
            role: "system",
            content: buildSystemPrompt(),
          },
          {
            role: "user",
            content:
              `Genera 1 mensaje para: ${prompt}. ` +
              "Debe sonar naturales para enviar por chat ahora.",
          },
        ],
        max_tokens: 220,
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenRouter error: ${response.status} ${errorText}`);
    }

    const result = await response.json();
    const content = result?.choices?.[0]?.message?.content;

    if (typeof content === "string" && content.trim().length > 0) {
      parsedMessages = parseMessagesFromLLM(content);
    }
  } catch (error) {
    parsedMessages = [FALLBACK_MESSAGE];
  }

  if (parsedMessages.length === 0) {
    parsedMessages = [FALLBACK_MESSAGE];
  }

  return parsedMessages.map((texto, index) => ({
    id: `generated-llm-${Date.now()}-${index}`,
    texto,
    categoria: "LLM",
    esFavorito: favoriteMessages.includes(texto),
  }));
};
