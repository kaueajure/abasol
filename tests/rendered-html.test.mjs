import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";

const workerUrl = new URL(`../dist/server/index.js?test=${Date.now()}`, import.meta.url);
const { default: worker } = await import(workerUrl.href);

function render(path = "/", init = {}) {
  return worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html", ...(init.headers || {}) }, ...init }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

test("renderiza as rotas públicas essenciais", async () => {
  const routes = ["/", "/sobre", "/solucoes", "/solucoes/residencial", "/solucoes/empresarial", "/solucoes/rural", "/servicos", "/como-funciona", "/simulador", "/contato", "/privacidade", "/termos"];
  for (const route of routes) {
    const response = await render(route);
    assert.equal(response.status, 200, route);
    assert.match(response.headers.get("content-type") || "", /^text\/html/i, route);
  }
});

test("retira projetos, depoimentos e conteúdo incompleto da área pública", async () => {
  for (const route of ["/projetos", "/projetos/modelo-de-case", "/depoimentos", "/conteudos"]) {
    const response = await render(route);
    assert.equal(response.status, 404, route);
  }
  const home = await (await render("/")).text();
  assert.doesNotMatch(home, /href=["']\/(projetos|depoimentos|conteudos)/i);
});

test("não publica textos provisórios proibidos", async () => {
  const forbidden = /Dados aguardando validação|Local a confirmar|Capacidade não informada|Relatos em validação|Acervo em preparação|Modelo editorial de projeto|Projetos serão publicados depois|Imagem de referência/i;
  async function sourceFiles(directory) {
    const entries = await readdir(directory, { withFileTypes: true });
    const nested = await Promise.all(entries.map(entry => entry.isDirectory() ? sourceFiles(new URL(`${entry.name}/`, directory)) : [new URL(entry.name, directory)]));
    return nested.flat();
  }
  const files = (await sourceFiles(new URL("../app/", import.meta.url))).filter(url => /\.(tsx?|css)$/.test(url.pathname));
  for (const file of files) assert.doesNotMatch(await readFile(file, "utf8"), forbidden, file.pathname);
});

test("endpoint de leads valida dados e não confirma sem provider", async () => {
  const invalid = await render("/api/leads", { method: "POST", headers: { "content-type": "application/json", accept: "application/json" }, body: JSON.stringify({ source: "contact" }) });
  assert.equal(invalid.status, 400);
  const validPayload = { source: "contact", propertyType: "Residencial", city: "São José do Rio Preto", name: "Pessoa Teste", phone: "(17) 99999-9999", email: "teste@example.com", consent: true, origin: "http://localhost/contato", formStartedAt: Date.now() - 3000 };
  const unavailable = await render("/api/leads", { method: "POST", headers: { "content-type": "application/json", accept: "application/json", "x-forwarded-for": "192.0.2.20" }, body: JSON.stringify(validPayload) });
  assert.equal(unavailable.status, 503);
  assert.equal((await unavailable.json()).ok, undefined);
});

test("links internos da home apontam para rotas válidas", async () => {
  const html = await (await render("/")).text();
  const links = [...html.matchAll(/href=["'](\/[^"'#?]*)["']/g)].map(match => match[1]).filter(href => !href.startsWith("/_next/") && !/\.[a-z0-9]+$/i.test(href));
  for (const href of [...new Set(links)]) assert.notEqual((await render(href)).status, 404, href);
});

test("metadados específicos são emitidos nas páginas", async () => {
  const about = await (await render("/sobre")).text();
  assert.match(about, /<title>Sobre a Aba Sol \| Aba Sol Energia Solar<\/title>/i);
  assert.match(about, /rel=["']canonical["'][^>]+\/sobre/i);
  const residential = await (await render("/solucoes/residencial")).text();
  assert.match(residential, /<title>Energia solar residencial \| Aba Sol Energia Solar<\/title>/i);
  assert.match(residential, /property=["']og:title["'][^>]+Energia solar residencial/i);
  const missing = await (await render("/projetos")).text();
  assert.match(missing, /<title>Página não encontrada \| Aba Sol Energia Solar<\/title>/i);
  assert.match(missing, /name=["']robots["'][^>]+noindex/i);
});
