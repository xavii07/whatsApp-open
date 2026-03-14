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
    "Debes convertir la intención del usuario en frases cortas, claras y listas para enviar.",
    "Ofrece variación de tono: una opción neutral, una cordial",
    "No respondas preguntas fuera de esta tarea.",
    "Debes responder con EXACTAMENTE 2 opciones.",
    "Sin numeración, sin viñetas, sin comillas y sin explicación.",
    "Una opción por línea.",
    "Evita frases genéricas y evita repetir estructura entre opciones.",
    "No hagas nada mas y no respondas preguntas genericas",
  ].join(" ");
};

const trimToTenWords = (value: string) => {
  const words = value.split(/\s+/).filter(Boolean);
  return words.slice(0, 10).join(" ").trim();
};

const sanitizeLine = (line: string) =>
  line
    .replace(/^\s*[-*•\d.)]+\s*/, "")
    .replace(/^\s*["'“”]+|["'“”]+\s*$/g, "")
    .trim();

const parseMessagesFromLLM = (content: string) => {
  const lines = content
    .split(/\r?\n/)
    .map(sanitizeLine)
    .filter((line) => line.length > 0);

  const unique = new Map<string, string>();

  lines.forEach((line) => {
    const compact = trimToTenWords(line);
    if (compact.length > 0 && !unique.has(compact.toLowerCase())) {
      unique.set(compact.toLowerCase(), compact);
    }
  });

  return Array.from(unique.values()).slice(0, 3);
};

const buildFallbackMessages = (prompt: string) => {
  const topic = trimToTenWords(prompt.replace(/[.?!]/g, "").trim()) || "esto";

  const base = [
    `Hola, me interesa hablar sobre ${topic}`,
    `¿Podemos revisar ${topic} cuando tengas un momento?`,
    `Gracias, quedo atento a tu respuesta sobre ${topic}`,
  ];

  return base.map(trimToTenWords).slice(0, 3);
};

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
              `Genera 2 mensaje para: ${prompt}. ` +
              "Deben sonar naturales para enviar por chat ahora.",
          },
        ],
        max_tokens: 220,
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      const isQuotaError =
        response.status === 402 ||
        response.status === 429 ||
        /quota|rate|limit|credits?/i.test(errorText);

      if (isQuotaError) {
        parsedMessages = buildFallbackMessages(prompt);
      } else {
        throw new Error(`OpenRouter error: ${response.status} ${errorText}`);
      }
    } else {
      const result = await response.json();
      const content = result?.choices?.[0]?.message?.content;

      if (typeof content !== "string" || content.trim().length === 0) {
        parsedMessages = buildFallbackMessages(prompt);
      } else {
        parsedMessages = parseMessagesFromLLM(content);
      }
    }
  } catch (error) {
    parsedMessages = buildFallbackMessages(prompt);
  }

  if (parsedMessages.length === 0) {
    parsedMessages = buildFallbackMessages(prompt);
  }

  return parsedMessages.map((texto, index) => ({
    id: `generated-llm-${Date.now()}-${index}`,
    texto,
    categoria: "LLM",
    esFavorito: favoriteMessages.includes(texto),
  }));
};
