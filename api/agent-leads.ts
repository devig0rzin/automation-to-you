import { ZodError } from "zod";
import { registerAgentLead, type LeadPayload } from "../server/agentSimulation";

export default function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Metodo nao permitido." });
  }

  try {
    const registeredLead = registerAgentLead(req.body as LeadPayload);
    return res.status(200).json({ ok: true, lead: registeredLead });
  } catch (error) {
    return res.status(400).json({
      error: "Dados do lead invalidos.",
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
