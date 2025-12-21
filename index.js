import express from "express";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

/**
 * Rota de teste (já funciona)
 */
app.get("/", (req, res) => {
  res.send("Bot do WhatsApp ativo 🚀");
});

/**
 * Webhook de verificação do WhatsApp (Meta)
 */
app.get("/webhook", (req, res) => {
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("Webhook verificado com sucesso");
    return res.status(200).send(challenge);
  }

  return res.sendStatus(403);
});

/**
 * Receber mensagens do WhatsApp
 */
app.post("/webhook", (req, res) => {
  console.log("Mensagem recebida:", JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
