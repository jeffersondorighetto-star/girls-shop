# 💼 GIRLS SHOP — Manual Operacional das Sócias (v2)

_Documento interno da sociedade. Leitura obrigatória para as três sócias antes de operar qualquer ambiente da loja._

---

## 1. A operação em uma página

A Girls Shop funciona com **3 ambientes digitais** + **2 sistemas de apoio**:

| Ambiente | Endereço | Função | Acesso |
|---|---|---|---|
| 🏪 **Vitrine** | `jeffersondorighetto-star.github.io/girls-shop/` | Catálogo público e montagem de pedido | Clientes |
| 🔐 **Painel** | `.../girls-shop/admin.html` | Gestão: vendas, produtos, cofrinho, configurações | Sócias (PIN) |
| 📊 **Placar** | `.../girls-shop/dashboard.html` | Indicadores de desempenho (KPIs) | Sócias |
| ☁️ **Planilha Viva** | Google Planilhas (conta da loja) | Banco de dados + backup automático | Sócias |
| 👥 **Grupo da loja** | WhatsApp | Canal oficial de vendas e atendimento | Sócias + clientes |

**Princípio central:** a vitrine **não vende sozinha**. O pedido chega ao grupo; a venda só existe (estoque, lucro, placar) quando é registrada no Painel.

---

## 2. Governança da sociedade

1. **Três sócias, uma loja.** Decisões estruturais — trocar o PIN, remover produtos, alterar preços-base, dividir lucros — exigem consenso das três.
2. **O PIN é confidencial.** Não se compartilha fora da sociedade, em hipótese alguma.
3. **Registro antes de memória.** Se não está no Painel, não aconteceu. Venda, aporte ou compra "de cabeça" vira confusão na hora de dividir o lucro.
4. **Toda compra de cliente passa pela ciência dos responsáveis** — o aviso 🛡️ já vai embutido no pedido. É regra da casa, sem exceções.

---

## 3. SOP 01 — Venda com produto em estoque

**Gatilho:** cliente colou o pedido no grupo da loja.

1. Confirmar com a cliente no grupo: produto, quantidade, pagamento e **entrega** (ver SOP 06).
2. Abrir o **Painel → 💰 Registrar Venda**.
3. Marcar as quantidades com **+** (o **−** corrige).
4. Conferir **total** e **lucro estimado** na tela.
5. **✅ Confirmar venda.** O sistema baixa o estoque e alimenta o Placar automaticamente.
6. Errou? **↩️ Desfazer** na lista de últimas vendas devolve o estoque e remove o registro.

> ⚠️ Produto que zerar entra em **Troca Rápida** (aba Produtos): remover, substituir ou pausar. Decisão das três.

---

## 4. SOP 02 — Venda sob encomenda ✨

Produto **sob encomenda** é oferecido na vitrine **sem estoque em casa**: a loja só compra o item **depois** do pedido da cliente. Permite vender sem imobilizar dinheiro em estoque.

**Como funciona o ciclo completo:**

1. **Cadastro:** Painel → ➕ Novo Produto → passo 4 → **"✨ Sob encomenda"** (não pede quantidade).
2. **Na vitrine:** o produto aparece com o selo **"✨ Sob encomenda!"** e nunca esgota (limite de 10 por pedido).
3. **No pedido da cliente:** o texto já sinaliza _"(✨ sob encomenda)"_ e _"⏰ prazo combinado no grupo"_.
4. **Ao registrar a venda:** o Painel cria **automaticamente** uma ordem de compra em **💎 Cofrinho → ⏰ Compras pendentes**, com o custo estimado. Nada de anotar em papel.
5. **Compra realizada:** abrir o Cofrinho e tocar em **"✅ Recebida!"**. Se o valor pago foi diferente do estimado, registrar a compra real em **🛒 Registrar Compra** e apagar a pendente (🗑️).
6. **Prazo é compromisso:** combinar a data de entrega com a cliente **antes** de fechar a venda — e cumprir.

---

## 5. SOP 03 — Aporte de capital 💎

**Aporte** = dinheiro que uma sócia coloca do próprio bolso na loja para financiar compras. As sócias aportam em **momentos e valores diferentes** — e é exatamente por isso que o registro é indispensável.

1. Painel → **💎 Cofrinho → Registrar Aporte**.
2. Selecionar **quem** aportou (Sócia 1, 2 ou 3), **quanto** (R$) e, opcionalmente, a **finalidade** (ex.: "repor glosses").
3. **💎 Registrar aporte.** Confere no resumo: o total por sócia aparece no topo do Cofrinho e no Placar.

> 🤝 **Por que isso importa:** quem aporta mais, investe mais. O histórico de aportes por sócia é a **base objetiva** para acordos futuros de divisão de lucros e de decisões de reinvestimento. Sem registro, vira disputa de memória.

---

## 6. SOP 04 — Aquisição (compra da loja) 🛒

Toda vez que **a loja gasta** — repondo estoque ou atendendo encomenda — o gasto entra na **frente de aquisição**:

1. Painel → **💎 Cofrinho → Registrar Compra da Loja**.
2. Descrever o que foi comprado (ex.: "5 glosses + 10 scrunchies") e o **valor total pago**.
3. **🛒 Registrar compra.** A caixinha é recalculada na hora.

**Regra de ouro da aquisição:** compra não registrada infla o lucro "no papel". O Placar só conta a verdade se os gastos estiverem todos aqui.

---

## 7. SOP 05 — Cadastro de produto

Painel → **➕ Novo Produto**, em 5 passos:

1. **Nome + emoji** — claro e curto.
2. **Categoria + cor + foto + descrição** — a categoria é escolhida na **lista** (ou criada em "➕ Criar nova categoria"). Usem o botão **📷 Foto Mágica**: a foto sai do aparelho já otimizada e sobe para o Drive da loja.
3. **Preços** — custo e venda. O sistema **bloqueia prejuízo** (venda < custo) e calcula lucro e margem ao vivo. Referência: margem ≥ 50% é saudável.
4. **Tipo + estoque + desconto** — "📦 Tenho em estoque" (informar unidades) ou **"✨ Sob encomenda"** (SOP 02).
5. **Resumo** — conferir tudo antes de salvar.

**Edição rápida** (aba Produtos → ✏️ Editar): preço, estoque, desconto, foto e descrição — sem refazer o cadastro.

---

## 8. SOP 06 — Entrega 🛵

- **Cliente não paga frete.** A entrega é feita **pelas próprias sócias**, combinada diretamente no grupo (dia, horário e local).
- O texto do pedido já informa: _"🛵 Entrega SEM FRETE, feita pelas sócias!"_
- Combinem entre si **quem entrega** antes de prometer a data à cliente.
- Entreguem com capricho: produto embalado + bilhetinho de agradecimento. Pós-venda é o que traz a cliente de volta.

---

## 9. Gestão financeira — os três números que mandam

| Indicador | Onde aparece | O que responde |
|---|---|---|
| 💜 **Caixinha da loja** | Cofrinho + Placar | Quanto a loja tem em caixa: aportes + vendas − compras |
| 💎 **Aportes por sócia** | Cofrinho + Placar | Quanto cada uma investiu (base da divisão justa) |
| 💚 **Lucro líquido** | Placar | O que a operação gerou de resultado no período |

**Rotinas recomendadas:**
- **Diária (2 min):** registrar vendas do dia + conferir ⏰ pendentes.
- **Semanal (10 min, as três juntas):** abrir o Placar — top vendidos, meta, caixinha — e decidir a próxima aquisição com dados, não com palpite.
- **Mensal:** fechamento — lucro do mês vs. meta, revisão de aportes e planejamento do mês seguinte.

---

## 10. A Planilha Viva (bastidores)

Tudo que acontece no Painel é espelhado automaticamente na planilha da loja no Google:

- **🛍️ Produtos** — catálogo completo (a coluna "sob encomenda" marca os ✨)
- **💰 Vendas** — histórico de vendas
- **💎 Aportes** — quem investiu, quando e quanto
- **🛒 Compras** — aquisições (pendentes ficam amarelas!)
- **📜 Log** — diário de eventos
- **🏷️ Categorias / 🎨 Cores** — listas editáveis que alimentam o cadastro

As abas automáticas são "só leitura" na prática: quem escreve nelas é o site. Olhem, filtrem, aprendam fórmulas — mas cadastrem pelo Painel.

---

## 11. Segurança e continuidade

1. 🔐 PIN confidencial; troca apenas com as três presentes.
2. 🛡️ Ciência dos responsáveis em toda compra — sempre.
3. 🏪 **Uma aba por vez:** após qualquer atualização do site, fechem as abas antigas e reabram pelo atalho da tela inicial.
4. 🚫 Nunca limpar os dados de navegação do navegador usado na loja.
5. ☁️ A nuvem sincroniza sozinha a cada salvamento — mas a internet caiu? Sem pânico: a loja guarda a pendência e envia na próxima abertura.

---

## 12. Glossário executivo

- **Aporte** — capital que uma sócia injeta na loja.
- **Aquisição** — compra feita pela loja (reposição ou encomenda).
- **Caixinha** — caixa disponível: aportes + receita de vendas − compras.
- **Sob encomenda** — venda sem estoque: o item é comprado após o pedido.
- **Ticket médio** — valor médio por pedido.
- **Margem** — lucro sobre o custo, em %.
- **KPI** — indicador-chave de desempenho (os números do Placar).
- **SOP** — procedimento operacional padrão (o "jeito certo" de fazer, sempre igual).

---

## 13. Checklist de proficiência

Antes de operar sozinha, cada sócia deve saber executar **sem ajuda**:

- [ ] Registrar uma venda com produto em estoque
- [ ] Registrar uma venda com produto sob encomenda e baixar a pendência no Cofrinho
- [ ] Registrar um aporte e uma compra, e explicar o que é a caixinha
- [ ] Cadastrar um produto novo (dos dois tipos)
- [ ] Ler o Placar e apontar: lucro, ticket médio e produto motor
- [ ] Explicar por que a vitrine não registra venda sozinha
- [ ] Apontar onde ficam os aportes por sócia e por que eles importam

---

_Documento vivo: cada nova funcionalidade da loja atualiza este manual._
_Versão 2.0 — Fase "Cofrinho & Encomendas" · Girls Shop 💜_
