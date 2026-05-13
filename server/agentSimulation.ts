import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";
import { z } from "zod";

export type LeadPayload = {
  name: string;
  businessName: string;
  phone: string;
  segment: string;
  goal: string;
};

export type AgentSettings = {
  templateId: string;
  businessName: string;
  agentName: string;
  schedule: string;
  services: string;
  prices: string;
  rules: string;
  tone: string;
  customInstructions: string;
};

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export type SimulationPayload = {
  lead: LeadPayload;
  agent: AgentSettings;
  messages: ChatMessage[];
};

const DEFAULT_MODEL = "openai/gpt-4o-mini";
const LEADS_DIR = path.resolve(process.cwd(), ".data");
const LEADS_PATH = path.join(LEADS_DIR, "agent-leads.jsonl");
const ASSISTANT_MESSAGE_SEPARATOR = "@@NOVA_MENSAGEM@@";

const DELIVERY_MENU_MESSAGE = `Ótimo! 🍕 Você pode escolher uma categoria:

1. Pizzas
2. Combos
3. Bebidas
4. Sobremesas

Qual delas você gostaria de ver?`;

const DELIVERY_COMBOS_MESSAGE = `Perfeito! Aqui estão nossos combos:

1. **Combo Família**: 2 pizzas médias + 1 refrigerante de 2L - R$ 89
2. **Combo Duplo**: 2 pizzas médias + 1 sobremesa + 1 refrigerante de 1L - R$ 99
3. **Combo Light**: 1 pizza média + 1 salada + 1 suco natural - R$ 79

Qual combo você gostaria de pedir? 😊`;

const DELIVERY_JUICES_MESSAGE = `Nós temos os seguintes sabores de suco natural:

1. Laranja
2. Limão
3. Abacaxi
4. Manga

Qual sabor você prefere? 🍹`;

const DELIVERY_SODAS_MESSAGE = `Para os refrigerantes, temos as seguintes opções:

1. Coca-Cola
2. Guaraná
3. Fanta Laranja
4. Sprite

Qual refrigerante você gostaria de escolher? 🥤`;

const AESTHETIC_LOCALIZED_FAT_MESSAGE =
  "Perfeito! Para a redução de gordura localizada, temos algumas opções de protocolos que podem ser avaliados. Antes de agendarmos, você já fez algum procedimento estético antes? Isso nos ajuda a entender melhor seu histórico. Você já teve alguma experiência anterior?";

dotenv.config({ quiet: true });

const leadSchema = z.object({
  name: z.string().trim().min(1, "Nome é obrigatório."),
  businessName: z.string().trim().min(1, "Empresa é obrigatória."),
  phone: z.string().trim().min(6, "WhatsApp inválido."),
  segment: z.string().trim().min(1, "Segmento é obrigatório."),
  goal: z.string().trim().min(1, "Objetivo é obrigatório."),
});

const simulationSchema = z.object({
  lead: leadSchema,
  agent: z.object({
    templateId: z.string().default("personalizado"),
    businessName: z.string().default(""),
    agentName: z.string().default("Assistente"),
    schedule: z.string().default(""),
    services: z.string().default(""),
    prices: z.string().default(""),
    rules: z.string().default(""),
    tone: z.string().default("natural"),
    customInstructions: z.string().default(""),
  }),
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().trim().min(1),
      }),
    )
    .default([]),
});

export function registerAgentLead(lead: LeadPayload) {
  const parsedLead = leadSchema.parse(lead);
  const safeLead = {
    ...parsedLead,
    createdAt: new Date().toISOString(),
    source: "agent-simulator",
  };

  persistLead(safeLead);
  console.log("[agent-lead]", JSON.stringify(safeLead));
  return safeLead;
}

export async function runAgentSimulation(payload: SimulationPayload) {
  const safePayload = simulationSchema.parse(payload);
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return {
      reply: buildFallbackReply(safePayload),
      mode: "fallback" as const,
    };
  }

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.OPENROUTER_SITE_URL || "http://localhost:3000",
      "X-Title": process.env.OPENROUTER_APP_NAME || "Automation To You",
    },
    body: JSON.stringify({
      model: process.env.OPENROUTER_MODEL || DEFAULT_MODEL,
      temperature: 0.75,
      messages: [
        {
          role: "system",
          content: buildSystemPrompt(safePayload.lead, safePayload.agent),
        },
        ...safePayload.messages.map((message) => ({
          role: message.role,
          content: message.content,
        })),
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenRouter error ${response.status}: ${errorText}`);
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };

  return {
    reply: data.choices?.[0]?.message?.content?.trim() || buildFallbackReply(safePayload),
    mode: "openrouter" as const,
  };
}

function buildSystemPrompt(lead: LeadPayload, agent: AgentSettings) {
  return `
Você é ${agent.agentName || "um agente de atendimento"} da empresa ${agent.businessName}.
Simule um atendimento real de WhatsApp para um possível cliente.

Contexto do lead:
- Nome: ${lead.name}
- Empresa: ${lead.businessName}
- Telefone: ${lead.phone}
- Segmento: ${lead.segment}
- Objetivo: ${lead.goal}

Configuração do agente:
- Template: ${agent.templateId}
- Horários: ${agent.schedule}
- Serviços: ${agent.services}
- Preços: ${agent.prices}
- Regras de negócio: ${agent.rules}
- Tom de voz: ${agent.tone}
- Instruções extras: ${agent.customInstructions}

Regras:
- Responda em português do Brasil.
- Seja claro, útil e natural.
- Faça uma pergunta por vez quando precisar coletar dados.
- Quando fizer sentido, conduza para agendamento, orçamento ou atendimento humano.
- Use sempre os campos customizados como fonte principal. Se o usuário mudar nome da empresa, nome do atendente, serviços ou valores, responda com esses dados atualizados em vez de repetir textos antigos do template.
- Quando precisar simular duas bolhas separadas no WhatsApp, use exatamente ${ASSISTANT_MESSAGE_SEPARATOR} entre as mensagens.
- Como isso é uma demonstração, você pode inventar exemplos plausíveis dentro do segmento, como nomes de profissionais, horários, combos ou opções de atendimento.
- Não fuja do assunto, do segmento e do objetivo do negócio.
- Não invente promessas médicas, jurídicas, financeiras ou resultados garantidos.
${buildTemplatePromptRules(lead, agent)}
`.trim();
}

function buildFallbackReply(payload: SimulationPayload) {
  const lastMessage = normalizeText(payload.messages[payload.messages.length - 1]?.content || "");
  const agentName = payload.agent.agentName || "Assistente";
  const businessName = payload.agent.businessName || payload.lead.businessName;

  if (payload.agent.templateId === "delivery") {
    const deliveryReply = buildDeliveryFallbackReply(lastMessage);
    if (deliveryReply) return deliveryReply;
  }

  if (
    payload.agent.templateId === "estetica" &&
    matchesAny(lastMessage, ["gordura", "gordura localizada", "reducao de gordura", "reduzir gordura", "medidas"])
  ) {
    return `${AESTHETIC_LOCALIZED_FAT_MESSAGE}

Botões:
- Sim
- Não
- Falar com atendente`;
  }

  if (
    payload.agent.templateId === "dentista" &&
    matchesAny(lastMessage, ["limpeza", "profilaxia"]) &&
    matchesAny(lastMessage, ["terca", "17", "17:00", "agendar", "confirmar", "marcar"])
  ) {
    return buildDentalSchedulingReply(payload);
  }

  if (matchesAny(lastMessage, ["preco", "precos", "valor", "valores", "quanto custa", "custa", "orcamento", "orcar"])) {
    return `Claro. Aqui na ${businessName}, eu consigo te orientar pelos valores: ${payload.agent.prices || "ainda precisamos cadastrar a tabela de preços desse agente"}. Qual serviço você quer consultar primeiro?`;
  }

  if (matchesAny(lastMessage, ["horario", "horarios", "agenda", "agendar", "marcar", "disponibilidade", "encaixe", "vaga"])) {
    return `Perfeito. Nosso horário de atendimento é ${payload.agent.schedule || "definido conforme disponibilidade da equipe"}. Qual dia seria melhor para você?`;
  }

  if (matchesAny(lastMessage, ["servico", "servicos", "fazem", "atendem", "opcoes", "catalogo", "cardapio", "menu"])) {
    return `A ${businessName} trabalha com ${payload.agent.services || "os serviços principais cadastrados no agente"}. Me conta o que você precisa resolver hoje?`;
  }

  if (matchesAny(lastMessage, ["local", "localizacao", "endereco", "onde fica", "mapa", "chegar"])) {
    return `Posso te ajudar com a localização da ${businessName}. Me diga se prefere receber endereço, ponto de referência ou instruções de chegada.`;
  }

  if (matchesAny(lastMessage, ["humano", "atendente", "pessoa", "falar com alguem", "suporte"])) {
    return `Certo. Vou reunir o contexto e encaminhar para uma pessoa da equipe continuar o atendimento. Antes disso, me diga seu principal objetivo.`;
  }

  return `Oi, eu sou ${agentName}, assistente da ${businessName}. Posso te ajudar com informações, serviços e agendamento. O que você gostaria de fazer agora?`;
}

function buildTemplatePromptRules(lead: LeadPayload, agent: AgentSettings) {
  if (agent.templateId === "delivery") {
    return `

Regras específicas do template Delivery:
- Para cardápio/menu, responda exatamente neste formato:
${DELIVERY_MENU_MESSAGE}
- Para combos, responda exatamente neste formato:
${DELIVERY_COMBOS_MESSAGE}
- Para suco natural, responda exatamente neste formato:
${DELIVERY_JUICES_MESSAGE}
- Para refrigerante, responda exatamente neste formato:
${DELIVERY_SODAS_MESSAGE}`;
  }

  if (agent.templateId === "estetica") {
    return `

Regra específica do template Clínica Estética:
- Quando o cliente falar sobre redução de gordura localizada, responda:
${AESTHETIC_LOCALIZED_FAT_MESSAGE}
Botões:
- Sim
- Não
- Falar com atendente`;
  }

  if (agent.templateId === "dentista") {
    return `

Regra específica do template Dentista:
- Ao confirmar agendamento de limpeza, envie em duas mensagens separadas usando ${ASSISTANT_MESSAGE_SEPARATOR}.
- Modelo:
Obrigado, ${lead.name}! Agora, só para confirmar, você está agendando uma limpeza para terça-feira às 17:00. Vou encaminhar seus dados para a equipe confirmar o horário. Um momento, por favor. [Encaminhando os dados...]
${ASSISTANT_MESSAGE_SEPARATOR}
Pronto! Um atendente irá entrar em contato com você em breve para finalizar o agendamento e tirar qualquer dúvida. Se precisar de mais alguma coisa, é só avisar!`;
  }

  return "";
}

function buildDeliveryFallbackReply(lastMessage: string) {
  if (matchesAny(lastMessage, ["combo", "combos", "familia", "duplo", "light"])) {
    return DELIVERY_COMBOS_MESSAGE;
  }

  if (matchesAny(lastMessage, ["suco", "sucos", "natural", "laranja", "limao", "abacaxi", "manga"])) {
    return DELIVERY_JUICES_MESSAGE;
  }

  if (matchesAny(lastMessage, ["refrigerante", "refrigerantes", "coca", "guarana", "fanta", "sprite"])) {
    return DELIVERY_SODAS_MESSAGE;
  }

  if (matchesAny(lastMessage, ["cardapio", "menu", "catalogo", "categoria", "categorias", "pizza", "pizzas", "sobremesa", "sobremesas"])) {
    return DELIVERY_MENU_MESSAGE;
  }

  if (matchesAny(lastMessage, ["bebida", "bebidas"])) {
    return "Temos sucos naturais e refrigerantes. Você prefere ver sucos ou refrigerantes?";
  }

  return "";
}

function buildDentalSchedulingReply(payload: SimulationPayload) {
  return `Obrigado, ${payload.lead.name}! Agora, só para confirmar, você está agendando uma limpeza para terça-feira às 17:00. Vou encaminhar seus dados para a equipe confirmar o horário. Um momento, por favor. [Encaminhando os dados...]

${ASSISTANT_MESSAGE_SEPARATOR}

Pronto! Um atendente irá entrar em contato com você em breve para finalizar o agendamento e tirar qualquer dúvida. Se precisar de mais alguma coisa, é só avisar!`;
}

function persistLead(lead: LeadPayload & { createdAt: string; source: string }) {
  fs.mkdirSync(LEADS_DIR, { recursive: true });
  fs.appendFileSync(LEADS_PATH, `${JSON.stringify(lead)}\n`, "utf-8");
}

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function matchesAny(value: string, keywords: string[]) {
  return keywords.some((keyword) => value.includes(keyword));
}
