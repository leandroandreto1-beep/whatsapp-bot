import express from "express";

const app = express();
app.use(express.json());

const VERIFY_TOKEN = process.env.VERIFY_TOKEN || "renova_bot_123";

// ROTA DE VERIFICAÇÃO DO WEBHOOK (GET)
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("Webhook verificado com sucesso!");
    return res.status(200).send(challenge);
  } else {
    return res.sendStatus(403);
  }
});

// ROTA PARA RECEBER MENSAGENS (POST)
app.post("/webhook", (req, res) => {
  console.log("Evento recebido:", JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

// ROTA DE TESTE
app.get("/", (req, res) => {
  res.send("Bot do WhatsApp ativo 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
