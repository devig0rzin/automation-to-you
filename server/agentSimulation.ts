import fs from "fs";
import path from "path";

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

loadLocalEnv();

export function registerAgentLead(lead: LeadPayload) {
  const safeLead = {
    ...lead,
    createdAt: new Date().toISOString(),
    source: "agent-simulator",
  };

  console.log("[agent-lead]", JSON.stringify(safeLead));
  return safeLead;
}

export async function runAgentSimulation(payload: SimulationPayload) {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return {
      reply: buildFallbackReply(payload),
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
          content: buildSystemPrompt(payload.lead, payload.agent),
        },
        ...payload.messages.map((message) => ({
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
    reply:
      data.choices?.[0]?.message?.content?.trim() ||
      buildFallbackReply(payload),
    mode: "openrouter" as const,
  };
}

function buildSystemPrompt(lead: LeadPayload, agent: AgentSettings) {
  return `
Voce e ${agent.agentName || "um agente de atendimento"} da empresa ${agent.businessName}.
Simule um atendimento real de WhatsApp para um possivel cliente.

Contexto do lead:
- Nome: ${lead.name}
- Empresa: ${lead.businessName}
- Telefone: ${lead.phone}
- Segmento: ${lead.segment}
- Objetivo: ${lead.goal}

Configuracao do agente:
- Template: ${agent.templateId}
- Horarios: ${agent.schedule}
- Servicos: ${agent.services}
- Precos: ${agent.prices}
- Regras de negocio: ${agent.rules}
- Tom de voz: ${agent.tone}
- Instrucoes extras: ${agent.customInstructions}

Regras:
- Responda em portugues do Brasil.
- Seja claro, util e natural.
- Faca uma pergunta por vez quando precisar coletar dados.
- Quando fizer sentido, conduza para agendamento, orcamento ou atendimento humano.
- Como isso e uma demonstracao, voce pode inventar exemplos plausiveis dentro do segmento, como nomes de profissionais, horarios, combos ou opcoes de atendimento.
- Nao fuja do assunto, do segmento e do objetivo do negocio.
- Nao invente promessas medicas, juridicas, financeiras ou resultados garantidos.
`.trim();
}

function buildFallbackReply(payload: SimulationPayload) {
  const lastMessage =
    payload.messages[payload.messages.length - 1]?.content.toLowerCase() || "";
  const agentName = payload.agent.agentName || "Assistente";
  const businessName = payload.agent.businessName || payload.lead.businessName;

  if (lastMessage.includes("preco") || lastMessage.includes("valor")) {
    return `Claro. Aqui na ${businessName}, eu consigo te orientar pelos valores: ${payload.agent.prices || "ainda precisamos cadastrar a tabela de precos desse agente"}. Qual servico voce quer consultar primeiro?`;
  }

  if (
    lastMessage.includes("horario") ||
    lastMessage.includes("agenda") ||
    lastMessage.includes("marcar")
  ) {
    return `Perfeito. Nosso horario de atendimento e ${payload.agent.schedule || "definido conforme disponibilidade da equipe"}. Qual dia seria melhor para voce?`;
  }

  if (lastMessage.includes("servico") || lastMessage.includes("fazem")) {
    return `A ${businessName} trabalha com ${payload.agent.services || "os servicos principais cadastrados no agente"}. Me conta o que voce precisa resolver hoje?`;
  }

  return `Oi, eu sou ${agentName}, assistente da ${businessName}. Posso te ajudar com informacoes, servicos e agendamento. O que voce gostaria de fazer agora?`;
}

function loadLocalEnv() {
  const envPath = path.resolve(process.cwd(), ".env");

  if (!fs.existsSync(envPath)) {
    return;
  }

  const envFile = fs.readFileSync(envPath, "utf-8");

  for (const line of envFile.split(/\r?\n/)) {
    const trimmedLine = line.trim();

    if (!trimmedLine || trimmedLine.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmedLine.indexOf("=");
    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmedLine.slice(0, separatorIndex).trim();
    const value = trimmedLine.slice(separatorIndex + 1).trim();

    if (key && process.env[key] === undefined) {
      process.env[key] = value.replace(/^["']|["']$/g, "");
    }
  }
}
