import { ZodError } from "zod";
import { runAgentSimulation, type SimulationPayload } from "../server/agentSimulation";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Metodo nao permitido." });
  }

  try {
    const result = await runAgentSimulation(req.body as SimulationPayload);
    return res.status(200).json(result);
  } catch (error) {
    console.error("[chat-simulation-error]", error);
    return res.status(error instanceof ZodError ? 400 : 500).json({
      error: error instanceof ZodError ? "Dados da simulacao invalidos." : "Nao foi possivel simular o atendimento agora.",
      details: formatApiError(error),
    });
  }
}

function formatApiError(error: unknown) {
  if (error instanceof ZodError) {
    return error.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
    }));
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Erro desconhecido.";
}
