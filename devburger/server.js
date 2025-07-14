const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/sugestao", (req, res) => {
  const { nome, ingredientes } = req.query;
  res.send(`
        <html>
            <head>
                <title>Obrigado!</title>
                <link rel="stylesheet" href="/css/style.css">
            </head>
            <body>
                <div class="container">
                    <h1>Obrigado pela sua sugestão, ${nome}!</h1>
                    <p>Agradecemos por sugerir um lanche com os seguintes ingredientes: <strong>${ingredientes}</strong>.</p>
                    <p>Sua sugestão foi recebida e será avaliada pela nossa equipe!</p>
                    <a href="/" class="btn">Voltar ao Início</a>
                </div>
            </body>
        </html>
    `);
});

app.get("/contato", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "contato.html"));
});

app.post("/contato", (req, res) => {
  const { nome, email, assunto, mensagem } = req.body;
  res.send(`
        <html>
            <head>
                <title>Contato Recebido</title>
                <link rel="stylesheet" href="/css/style.css">
            </head>
            <body>
                <div class="container">
                    <h1>Contato Recebido!</h1>
                    <p>Obrigado por sua mensagem, <strong>${nome}</strong>.</p>
                    <p>Recebemos sua mensagem e responderemos em breve no e-mail: <strong>${email}</strong>.</p>
                    <hr>
                    <h3>Resumo da sua mensagem:</h3>
                    <p><strong>Assunto:</strong> ${assunto}</p>
                    <p><strong>Mensagem:</strong> ${mensagem}</p>
                    <a href="/" class="btn">Voltar ao Início</a>
                </div>
            </body>
        </html>
    `);
});

app.get("/api/lanches", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "data", "lanches.json"));
});

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor da DevBurger rodando em http://localhost:${PORT}`);
});
