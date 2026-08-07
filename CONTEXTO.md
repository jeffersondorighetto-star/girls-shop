# 🌟 CONTEXTO.md — Passaporte da Girls Shop (para IAs e humanos!)

> **Leia este arquivo antes de mexer em qualquer coisa.** Ele coloca qualquer IA (Kimi, Gemini, ChatGPT, etc.) ou pessoa por dentro do projeto em 1 minuto. Mantido atualizado a cada mudança.

---

## 1. O que é a Girls Shop?

Loja virtual de **duas sócias mirins** (crianças/jovens empreendedoras). Vende papelaria, acessórios, beleza e brinquedos. O cliente monta o pedido na vitrine, **copia o texto e cola no grupo da loja no WhatsApp** (grupo com as amigas — canal oficial de vendas); as sócias registram a venda manualmente no painel admin. **Não existe botão de envio direto** — o fluxo é copiar/colar proposital, e todo pedido carrega a linha "🛡️ Compra com a ciência e permissão dos meus responsáveis!" (segurança infantil).

**Filosofia do projeto (respeite SEMPRE):**
- 🧒 Tudo pensado para crianças: linguagem simples, fonte mínima 16px, alvos de toque ≥ 44px
- 💜 Tom carinhoso e didático em TODO texto visível (mensagens, toasts, comentários de código em português simples)
- 📦 **Zero dependências**: HTML/CSS/JS puro. Única coisa externa permitida: a fonte Baloo 2 (Google Fonts). Nada de frameworks, bibliotecas, build ou npm para a loja funcionar
- 📱 Deve funcionar abrindo o arquivo direto (file://) no navegador do celular — sem servidor
- 🎉 Confete em momentos de conquista; mascote **Luna** 👧🏽 dá dicas e parabeniza

## 2. Arquivos

| Arquivo | Função |
|---|---|
| `index.html` | 🏪 Vitrine pública: grid de produtos, filtros, carrinho (drawer), **modal de detalhes do produto ao clicar**, pedido para **copiar e colar no grupo da loja** (sem envio direto) |
| `admin.html` | 🔐 Painel das sócias (PIN, padrão 1234): registrar venda (com desfazer), cadastrar produto (wizard 5 passos), troca rápida (remover/substituir/pausar), editar, log, configurações |
| `dashboard.html` | 📊 Placar: receita, custo, lucro, ticket médio, margem, top 10, meta mensal, insights |
| `readme.md` | 📖 Manual das sócias (linguagem infantil) |
| `CONTEXTO.md` | Este arquivo — contexto para IAs |
| `package.json` | Apenas para preview local (`npm run dev`). **Não é necessário para a loja funcionar** |

## 3. Arquitetura de dados (ATUAL: localStorage)

Tudo no `localStorage` do navegador, 5 chaves compartilhadas pelas 3 páginas:

- `girlsShop_produtos` — array de produtos
- `girlsShop_vendas` — array de vendas
- `girlsShop_log` — array (máx. 50, mais recente primeiro)
- `girlsShop_config` — `{ nomeLoja, whatsapp, pin, metaMensal, aniversarios[], seedCarregado, linkGrupo?, linkNuvem?, atualizadoEm? }`
- `girlsShop_carrinho` — carrinho da vitrine `[{ id, qtd }]`

**Produto:** `{ id, nome, emoji, categoria, custo, precoVenda, desconto, estoque, cor, status, vendas, foto?, descricao? }`
- 💰 **Todos os valores em CENTAVOS** (nunca reais). `formatarPreco(centavos)` exibe "R$ XX,XX". **Exceção: na planilha Google os preços ficam em REAIS** — o Apps Script converte na ida e na volta
- `status`: `"disponivel"` | `"esgotado"` | `"pausado"` | `"removido"`
- `foto` (opcional): URL https **ou `data:image/...` base64** (Foto Mágica sem nuvem). **Se vazia, exibe o emoji** (fallback — nunca quebra)
- `descricao` (opcional): texto curto mostrado no modal de detalhes

**Venda:** `{ id, data (ISO), itens: [{ produtoId, nome, emoji, qtd, precoUnit, custoUnit, desconto }], total, lucro }`

⚠️ As 3 páginas têm funções utilitárias duplicadas de propósito (cada arquivo é autossuficiente). O seed inicial existe no `index.html` e no `admin.html` — **mantenha os dois sincronizados** ao mudar.

## 4. Decisões tomadas (roadmap)

- ✅ Mascote renomeada: **Luana → Luna** (ago/2026)
- ✅ **Fase 1**: fotos reais (campo `foto` com fallback emoji) + modal de detalhes ao clicar no produto
- ✅ **Fluxo de pedido no grupo** (ago/2026): botão "Enviar no WhatsApp" removido da vitrine; pedido é copiado e colado no grupo da loja; aviso 🛡️ de ciência dos responsáveis visível na página e embutido no texto do pedido.
- ✅ **Botão flutuante 💬 = portal do grupo** (ago/2026): abre `config.linkGrupo` (convite do grupo, configurado no admin ⚙️); sem link, copia um convite em texto. Etiqueta flutuante "👥 Grupo da loja!" ao lado.
- ✅ **Fase 2 — Planilha Viva** (ago/2026): Google Planilhas como banco de dados via Apps Script (conta `girls.shop.sjc@gmail.com`). Arquivos: `instalador-nuvem.gs` (colar em script.google.com, rodar `instalarLoja`, implantar como App da Web "Qualquer pessoa") e `GUIA-NUVEM.md` (passo a passo). **Link da nuvem GRAVADO nos 3 HTML** como `LINK_NUVEM_PADRAO` (config.linkNuvem no admin sobrescreve). Sync: **push total a cada salvamento** (embrulho das funções salvar*) + **pull na abertura se a nuvem for mais nova** (`atualizadoEm`) + **migração automática** (nuvem vazia → sobe o local) + fila offline (`girlsShop_nuvemPendente`). Planilha guarda preços em **R$** (script converte). Abas: 🛍️ Produtos, 💰 Vendas, ⚙️ Config, 📜 Log, 🗺️ Missões da Luna, 🏷️ Categorias (dropdown editável), 🎨 Cores (nome amigável→gradiente, célula se pinta). **Gatilho `aoEditar`** (installable, criado pelo instalador): ID automático ao digitar nome, status padrão, conversão de link do Drive em URL de foto. **Proteções gentis** (`protegerPlanilha`): coluna ID + abas Vendas/Log com aviso "tem certeza?".
- ✅ **📷 Foto Mágica** (ago/2026): botão "Tirar ou escolher foto" no wizard/editar/substituir. Comprime no canvas (máx. 800px, JPEG 0.82) → com nuvem, sobe pro Drive (pasta "GirlsShop Fotos", pública) e usa a URL `drive.google.com/thumbnail?id=...&sz=w1000`; sem nuvem, salva `data:image` no produto.
- ⏳ **Fase 2 — ativação**: seguir o `GUIA-NUVEM.md` (rodar instalador, implantar, colar o Link da Nuvem no admin). O código do site já está 100% pronto, aguardando só o link!

**Princípios do Plano Zero Atrito:** nada quebra sem internet (fallback localStorage), nada muda no dia a dia das sócias, nenhuma senha nova, tudo reversível.

## 5. Multi-IA (como colaboramos)

- 🌙 **Kimi**: arquiteto-mor, mantém este arquivo e o código local
- 🤖 **Gemini** (plano grátis, sócia 1): ideias, textos, ajuda nas ferramentas Google
- 🤖 **ChatGPT** (sócia 2): criatividade, nomes, descrições, marketing
- 👤 **Responsável (pai/mãe)**: aprova mudanças, guarda a pasta oficial

**Regras:** (1) a pasta oficial no Google Drive é a única fonte válida; (2) uma mudança por vez; (3) **quem mudar algo, atualiza este CONTEXTO.md**.

## 6. Checklist para qualquer IA que for editar

1. Leu este arquivo? ✅
2. Valores em centavos? ✅
3. Fallback emoji se `foto` vazia/quebrada? (aceita https:// e data:image/) ✅
4. Fonte ≥ 16px, toque ≥ 44px, tom infantil? ✅
5. Seed alterado? Sincronizou index.html ↔ admin.html? ✅
6. Sem novas dependências externas? ✅
7. Atualizou este arquivo ao terminar? ✅

---
_Última atualização: 07/ago/2026 — Fase 2 entregue: Planilha Viva + Foto Mágica (aguardando ativação via GUIA-NUVEM.md)_
