# ☁️ GUIA DA NUVEM — ligando a Planilha Viva da Girls Shop

> ⏱️ Tempo total: uns 15 minutinhos, **uma vez só**. Feito por um adulto. Depois disso, tudo é automático!

**Conta Google da loja:** `girls.shop.sjc@gmail.com`

---

## 🗺️ O que vamos fazer (visão geral)

```
1. Colar o script no Google     2. Rodar o Instalador Mágico
   Apps Script                     (ele cria a planilha sozinho!)
        │                                │
        └──────────┬─────────────────────┘
                   ▼
3. Publicar a "ponte"    4. Colar o Link da Nuvem
   (botão Implantar)        no admin da loja ⚙️
```

---

## Passo 1 — Abrir o Apps Script

1. Entre no Google com a conta **`girls.shop.sjc@gmail.com`**
2. Acesse 👉 **https://script.google.com**
3. Clique em **＋ Novo projeto** (canto superior esquerdo)
4. Apague o código de exemplo que aparece

## Passo 2 — Colar o Instalador Mágico

1. Abra o arquivo **`instalador-nuvem.gs`** (está na pasta da loja)
2. Copie **TODO** o conteúdo e cole no editor do Apps Script
3. Clique em 💾 **Salvar** (pode dar o nome "Girls Shop Nuvem")

## Passo 3 — Rodar o Instalador Mágico 🪄

1. No menu de funções (lá em cima, escrito "myFunction"), escolha **`instalarLoja`**
2. Clique em ▶️ **Executar**
3. O Google vai pedir permissões (é normal!):
   - *"O app não foi verificado"* → clique em **Avançado** → **Acessar Girls Shop Nuvem (não seguro)** → **Permitir**
   - (É seguro: o script é nosso e só mexe na planilha e na pasta de fotos da própria conta!)
4. Ao terminar, clique em **Registro de execução** (na parte de baixo): ele mostra o **link da planilha** criada 🎉
5. Abra o link e admire: abas coloridas, Missões da Luna, tudo prontinho!

## Passo 4 — Publicar a "ponte" 🌉

1. No Apps Script, clique em **Implantar** (canto superior direito) → **Nova implantação**
2. Em "Selecionar tipo" (engrenagem ⚙️), escolha **App da Web**
3. Configure assim:
   - **Descrição:** `Girls Shop Nuvem`
   - **Executar como:** `Eu (girls.shop.sjc@gmail.com)`
   - **Quem pode acessar:** **Qualquer pessoa** ⚠️ (precisa ser esse! É assim que a vitrine consegue ler a planilha)
4. Clique em **Implantar**
5. **COPIE o "URL do app da Web"** — ele parece com:
   `https://script.google.com/macros/s/AKfy.../exec`
   👉 **Esse é o Link da Nuvem!** Guarde com carinho (é um segredo das sócias, igual ao PIN 🤫)

## Passo 5 — Colar o link na loja 🔗

**Opção A (você mesmo):** abra o `admin.html`, entre com o PIN, vá em **⚙️ Configurações** e cole o link no campo **🔗 Link da Nuvem** → Salvar.

**Opção B (mais fácil):** mande o link pra mim (Kimi) que eu gravo direto nos arquivos da loja — aí funciona em qualquer aparelho sem configurar nada!

## Passo 6 — A mágica acontece ✨

1. Abra o `admin.html` de novo → a loja **migra tudo sozinha** pra planilha (produtos, vendas, config)
2. Abra a planilha: os dados da loja estão lá, lindos e coloridos!
3. Teste a mágica suprema: **digite um produto novo direto na planilha** (preços em R$ mesmo!) → abra a vitrine → ele apareceu! 🤩

---

## 📷 Como funcionam as fotos agora

1. No admin, ao cadastrar/editar produto, toquem em **"📷 Tirar ou escolher foto"**
2. A câmera do iPad/celular abre na hora (ou escolhem uma foto da galeria)
3. O site **encolhe a foto sozinho** (máx. 800px — nem precisam saber disso! 😄)
4. A foto vai pra pasta **"GirlsShop Fotos"** no Google Drive da conta da loja
5. Pronto! O produto aparece com foto de verdade na vitrine

## ✏️ Cadastrando produtos DIRETO na planilha (a mágica didática!)

Na aba **🛍️ Produtos**, cada linha é um produto. Só é preciso digitar o **nome** — o resto tem ajuda automática:

| Coluna | Como preencher |
|---|---|
| **id** | 🤖 **Automático!** Digitou o nome, o ID nasce sozinho. Nunca digitem nada aqui |
| **nome** | ✏️ Digitem normalmente |
| **emoji** | ▼ Listinha de escolha! Cliquem na célula e escolham |
| **categoria** | ▼ Listinha que vem da aba **🏷️ Categorias** — cadastrem categorias novas lá que aparecem aqui sozinhas! |
| **custo/venda (R$)** | ✏️ Em REAIS mesmo (ex: `10,50`). O site converte |
| **desconto/estoque** | ✏️ Números simples |
| **cor** | ▼ Listinha de nomes ("Lilás", "Coral"...) — a célula **se pinta da cor**! 🎨 |
| **status** | 🤖 Nasce "disponivel" sozinho |
| **foto** | 📸 Colem o **link de compartilhamento** de uma foto da pasta "GirlsShop Fotos" do Drive — a planilha arruma o link sozinha! (Ou usem o botão 📷 Foto Mágica no admin — mais fácil!) |
| **descricao** | ✏️ Uma frase fofa sobre o produto |

**Como conseguir o link da foto no Drive (iPad/celular):**
app Drive → pasta **GirlsShop Fotos** → suba a foto (botão ＋) → toque nos **3 pontinhos** da foto → **Compartilhar** → **Copiar link** → cole na coluna foto. Pronto — a planilha transforma em imagem da vitrine! ✨

> ⚠️ As abas **💰 Vendas** e **📜 Log** são automáticas (só o site escreve nelas). Podem olhar e aprender, mas não digitem nada lá!

---

## ❓ Perguntas que podem surgir

**"E se ficar sem internet?"** A loja funciona igualzinho a antes (modo local). Quando a internet voltar, o admin sincroniza o que ficou pendente. 🪂

**"E se eu errar algo na planilha?"** O admin sempre manda a versão mais recente. Em caso de bagunça, me chama que a gente conserta juntos!

**"Mudei algo no script, e agora?"** Mudanças no código pedem: Implantar → Gerenciar implantações → editar → **Nova versão** → Implantar.

**"As meninas podem mexer na planilha?"** PODEM E DEVEM! 🎉 É a Planilha Viva: as abas 💰 Vendas e 📜 Log são do site (só olhar), o resto é brinquedo delas. As **Missões da Luna** (aba 🗺️) ensinam o caminho!

**"A planilha tem ajudante automático?"** TEM! 🤖 Um gatilho `aoEditar` (criado pelo instalador): cria o ID sozinho, preenche o status e arruma links de foto do Drive. Se rodarem o instalador de novo, ele limpa gatilhos antigos antes — sem duplicar.

---

_Qualquer erro estranho, anote a mensagem e me chame (Kimi). Bora fazer a loja voar! 🚀💜_


---

# ⬆️ ATUALIZAÇÃO v3 — Cofrinho & Encomendas (pra quem JÁ tem a planilha)

A loja evoluiu! A v3 traz: **💎 Aba Aportes**, **🛒 Aba Compras** e a coluna **"sob encomenda"** na aba Produtos. Pra ganhar tudo isso **sem perder nenhum dado**, siga estes 4 passos:

## Passo 1 — Trocar o código do Apps Script
1. Abra [script.google.com](https://script.google.com) com a conta da loja (girls.shop.sjc@gmail.com)
2. Clique no projeto da loja (o mesmo da instalação)
3. **Apague todo o código antigo** e **cole o novo** (arquivo `instalador-nuvem.gs` do projeto)
4. Salve (💾)

## Passo 2 — Rodar o upgrade (UMA vez só!)
1. No menu de funções (lá em cima, ao lado de "Executar"), escolha **`atualizarLojaV3`** ⚠️ (NÃO rode `instalarLoja` — essa é só pra planilha nova!)
2. Clique em **Executar**
3. Se pedir autorização, autorize normalmente (é o script da loja mexendo na própria planilha)
4. Olhe o "Registro de execução": deve aparecer **"✨ Loja atualizada pra v3!"**

## Passo 3 — Publicar a nova versão (o link NÃO muda!)
1. Clique em **Implantar → Gerenciar implantações**
2. Toque no **✏️ (lápis)** da implantação ativa
3. Em **"Versão"**, escolha **"Nova versão"**
4. Clique em **Implantar**
5. ✅ Pronto — o endereço `/exec` continua EXATAMENTE o mesmo, não precisa trocar nada no site!

## Passo 4 — Conferir
1. Abra a planilha: devem existir as abas **💎 Aportes** e **🛒 Compras**, e a coluna **"sob encomenda"** no fim da aba Produtos
2. Teste a ponte: abra no navegador `SEU_LINK/exec?acao=ler` → deve vir `"aportes":[]` e `"compras":[]` no resultado
3. No admin da loja, registre um aporte de teste → ele deve aparecer na aba 💎 Aportes em segundos ✨

> 🤫 **Segredo técnico:** mesmo se você esquecer este upgrade, o site NÃO perde dados — os aportes e compras ficam guardados no aparelho até a nuvem aprender a guardá-los. Mas faça logo: é rapidinho!
