import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import {
  registerAgentLead,
  runAgentSimulation,
  type LeadPayload,
  type SimulationPayload,
} from "./agentSimulation";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(express.json({ limit: "1mb" }));

  app.post("/api/agent-leads", (req, res) => {
    const lead = req.body as LeadPayload;
    const registeredLead = registerAgentLead(lead);

    res.json({ ok: true, lead: registeredLead });
  });

  app.post("/api/chat-simulation", async (req, res) => {
    try {
      const result = await runAgentSimulation(req.body as SimulationPayload);
      res.json(result);
    } catch (error) {
      console.error("[chat-simulation-error]", error);
      res.status(500).json({
        error: "Nao foi possivel simular o atendimento agora.",
      });
    }
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
