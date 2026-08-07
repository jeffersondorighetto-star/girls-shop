/* ============================================================
   🛍️ GIRLS SHOP — servidorzinho de preview (Node puro, sem deps)
   Só serve pra ver a loja no navegador durante o desenvolvimento.
   A loja NÃO precisa dele: clique duplo no index.html funciona!
   ============================================================ */
const http = require("http");
const fs = require("fs");
const path = require("path");

// Aceita a porta de qualquer jeito: --port 7100, -p 7100, PORT=7100 ou o padrão
function pegarPorta() {
  const args = process.argv.slice(2);
  for (let i = 0; i < args.length; i++) {
    if (["--port", "-p", "--listen", "-l"].includes(args[i]) && args[i + 1]) {
      const n = parseInt(args[i + 1], 10);
      if (!isNaN(n)) return n;
    }
  }
  if (process.env.PORT && !isNaN(parseInt(process.env.PORT, 10))) {
    return parseInt(process.env.PORT, 10);
  }
  return 7100;
}

const PORTA = pegarPorta();
const HOST = "0.0.0.0"; // escuta em todas as interfaces (localhost incluído)
const RAIZ = __dirname;

const TIPOS = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".webp": "image/webp"
};

const servidor = http.createServer((req, res) => {
  // Tira a query string (?a=b) e protege contra caminhos esquisitos (../)
  let caminho = decodeURIComponent(req.url.split("?")[0]);
  if (caminho === "/") caminho = "/index.html";
  const arquivo = path.normalize(path.join(RAIZ, caminho));
  if (!arquivo.startsWith(RAIZ)) { res.writeHead(403); res.end("🚫"); return; }

  fs.readFile(arquivo, (erro, conteudo) => {
    if (erro) {
      res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      res.end("<h1>😅 Página não encontrada</h1><p>Tente <a href='/'>a vitrine</a>!</p>");
      return;
    }
    const ext = path.extname(arquivo).toLowerCase();
    res.writeHead(200, { "Content-Type": TIPOS[ext] || "application/octet-stream" });
    res.end(conteudo);
  });
});

servidor.listen(PORTA, HOST, () => {
  console.log("🛍️ Girls Shop no ar! Abra: http://localhost:" + PORTA + "/");
});
