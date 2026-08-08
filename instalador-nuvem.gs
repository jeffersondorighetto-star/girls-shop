/* ============================================================
   🛍️ GIRLS SHOP — PLANILHA VIVA (Instalador Mágico) v3
   ============================================================
   O que este script faz:
   1. instalarLoja() → cria a planilha-banco-de-dados da loja,
      com abas, cores, fórmulas, listas de escolha e as Missões
      da Luna (planilha NOVA, do zero)
   2. atualizarLojaV3() → UPGRADE pra quem já tinha a v2: cria as
      abas 💎 Aportes e 🛒 Compras + a coluna "sob encomenda",
      SEM perder nenhum dado
   3. doGet/doPost → a "ponte" entre o site e a planilha
   4. Upload de fotos → salva as fotos dos produtos no Drive
   5. aoEditar() → o "ajudante automático" da planilha:
      • cria o ID sozinho quando digitam o nome do produto
      • converte link do Google Drive em foto da vitrine
      • preenche o status "disponivel" sozinho

   📖 Passo a passo completo: ver o arquivo GUIA-NUVEM.md
   Conta da loja: girls.shop.sjc@gmail.com
   ============================================================ */

const NOME_PLANILHA = '🛍️ Girls Shop — Banco de Dados';
const NOME_PASTA_FOTOS = 'GirlsShop Fotos';

// Ordem das colunas da aba Produtos (preços na planilha são em REAIS,
// o script converte pra centavos quando conversa com o site!)
const COLUNAS_PRODUTOS = ['id','nome','emoji','categoria','custo (R$)','venda (R$)','desconto (%)','estoque','cor','status','vendidos','foto','descricao','sob encomenda'];

// Emojis que aparecem na listinha de escolha (iguais aos do site!)
const EMOJIS = ['⭐','🎀','🌸','✨','🍓','🧡','🦋','💫','👝','👑','🧸','💖','🌈','🍭','💎','🦄','🌻','🍒','🐻','🎁'];

/* ============================================================
   🪄 INSTALADOR MÁGICO — rode UMA vez só!
   ============================================================ */
function instalarLoja() {
  const ss = SpreadsheetApp.create(NOME_PLANILHA);
  const id = ss.getId();

  // Aba inicial vira "🛍️ Produtos"
  const abaProdutos = ss.getSheets()[0].setName('🛍️ Produtos');

  // Abas auxiliares PRIMEIRO (as listas de escolha moram nelas)
  const abaCategorias = ss.insertSheet('🏷️ Categorias');
  montarAbaCategorias(abaCategorias);

  const abaCores = ss.insertSheet('🎨 Cores');
  montarAbaCores(abaCores);

  montarAbaProdutos(abaProdutos, abaCategorias, abaCores);

  const abaVendas = ss.insertSheet('💰 Vendas');
  montarAbaVendas(abaVendas);

  const abaConfig = ss.insertSheet('⚙️ Config');
  montarAbaConfig(abaConfig);

  const abaLog = ss.insertSheet('📜 Log');
  montarAbaLog(abaLog);

  const abaMissoes = ss.insertSheet('🗺️ Missões da Luna');
  montarAbaMissoes(abaMissoes);

  const abaAportes = ss.insertSheet('💎 Aportes');
  montarAbaAportes(abaAportes);

  const abaCompras = ss.insertSheet('🛒 Compras');
  montarAbaCompras(abaCompras);

  // Pasta das fotos no Drive
  const pasta = DriveApp.createFolder(NOME_PASTA_FOTOS);
  pasta.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

  // Guarda os IDs pro script se achar depois
  PropertiesService.getScriptProperties().setProperty('PLANILHA_ID', id);
  PropertiesService.getScriptProperties().setProperty('PASTA_ID', pasta.getId());

  // 🤖 Liga o "ajudante automático" (roda a cada edição na planilha)
  //    (apaga gatilhos antigos pra não duplicar se rodarem 2 vezes)
  ScriptApp.getProjectTriggers().forEach(t => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger('aoEditar').forSpreadsheet(id).onEdit().create();

  // 🔒 Proteções gentis contra dedinhos curiosos
  protegerPlanilha();

  // Marca na aba Config que a instalação aconteceu
  abaConfig.getRange('A2:B2').setValues([['instaladoEm', new Date().toISOString()]]);

  Logger.log('🎉 TUDO PRONTO!');
  Logger.log('📊 Sua planilha: ' + ss.getUrl());
  Logger.log('📸 Pasta das fotos: ' + pasta.getUrl());
  Logger.log('👉 Agora: Implantar > Nova implantação > App da Web (ver GUIA-NUVEM.md passo 4)');
}

/* ---------- 🤖 O AJUDANTE AUTOMÁTICO (roda a cada edição) ---------- */

function aoEditar(e) {
  try {
    const aba = e.range.getSheet();
    if (aba.getName() !== '🛍️ Produtos') return;
    const linha = e.range.getRow();
    const coluna = e.range.getColumn();
    if (linha < 2) return; // cabeçalho não mexe

    // 🆔 ID AUTOMÁTICO: digitou o nome (coluna 2) sem ID? Nasce um!
    if (coluna === 2 && e.value) {
      const celulaId = aba.getRange(linha, 1);
      if (!celulaId.getValue()) celulaId.setValue(new Date().getTime());
      // Status padrão: disponivel ✅
      const celulaStatus = aba.getRange(linha, 10);
      if (!celulaStatus.getValue()) celulaStatus.setValue('disponivel');
    }

    // 📸 FOTO: colou um link do Google Drive? A gente arruma sozinho!
    if (coluna === 12 && e.value) {
      const arrumado = arrumarLinkFoto(String(e.value));
      if (arrumado !== e.value) aba.getRange(linha, 12).setValue(arrumado);
    }
  } catch (erro) {
    // o ajudante nunca atrapalha: se der erro, deixa quieto
  }
}

// Transforma link de compartilhamento do Drive em endereço de imagem
function arrumarLinkFoto(link) {
  const m = link.match(/[-\w]{25,}/); // o "código" do arquivo do Drive
  if (!m) return link; // não é link do Drive? deixa como está
  if (link.indexOf('thumbnail?id=') >= 0) return link; // já está arrumado
  try {
    const arquivo = DriveApp.getFileById(m[0]);
    arquivo.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    return 'https://drive.google.com/thumbnail?id=' + m[0] + '&sz=w1000';
  } catch (erro) {
    return link; // arquivo não encontrado? deixa como está
  }
}

/* ---------- 🔒 Proteções gentis (avisam antes de mexer errado!) ----------
   Não bloqueiam nada — só mostram "tem certeza?" antes de editar.
   O script continua escrevendo normalmente (proteção não segura o dono). */
function protegerPlanilha() {
  const ss = planilha();

  // Coluna do ID: o "CPF" do produto. Mudar aqui quebra carrinho e histórico!
  const produtos = ss.getSheetByName('🛍️ Produtos');
  if (produtos) {
    produtos.getRange('A2:A1000').protect()
      .setWarningOnly(true)
      .setDescription('🤖 ID automático — não precisa mexer! Mudar quebra o carrinho e o histórico.');
  }

  // Abas 100% automáticas: só o site escreve nelas
  ['💰 Vendas', '📜 Log', '💎 Aportes', '🛒 Compras'].forEach(function(nome) {
    const aba = ss.getSheetByName(nome);
    if (aba) {
      aba.protect()
        .setWarningOnly(true)
        .setDescription('🤖 Aba automática — só o site escreve aqui! Pode olhar à vontade 👀');
    }
  });

  Logger.log('🔒 Proteções gentis aplicadas!');
}

/* ---------- Montagem de cada aba (com carinho didático!) ---------- */

function montarAbaProdutos(aba, abaCategorias, abaCores) {
  aba.getRange(1, 1, 1, COLUNAS_PRODUTOS.length)
     .setValues([COLUNAS_PRODUTOS])
     .setBackground('#8B5CF6').setFontColor('#FFFFFF').setFontWeight('bold');
  aba.setFrozenRows(1);
  aba.setColumnWidth(2, 180); // nome
  aba.setColumnWidth(13, 220); // descricao
  aba.setColumnWidth(12, 220); // foto

  // Preços com cara de dinheiro 💰
  aba.getRange('E2:F1000').setNumberFormat('R$ #,##0.00');

  // 😀 EMOJI vira listinha de escolha!
  const regraEmoji = SpreadsheetApp.newDataValidation()
    .requireValueInList(EMOJIS, true)
    .setAllowInvalid(true).build();
  aba.getRange('C2:C1000').setDataValidation(regraEmoji);

  // 🏷️ CATEGORIA vira listinha que vem da aba Categorias!
  //    (adicionou categoria nova lá, ela aparece aqui sozinha ✨)
  const regraCategoria = SpreadsheetApp.newDataValidation()
    .requireValueInRange(abaCategorias.getRange('A2:A50'), true)
    .setAllowInvalid(true).build();
  aba.getRange('D2:D1000').setDataValidation(regraCategoria);

  // 🎨 COR vira listinha de nomes amigáveis que vem da aba Cores!
  const regraCor = SpreadsheetApp.newDataValidation()
    .requireValueInRange(abaCores.getRange('A2:A30'), true)
    .setAllowInvalid(true).build();
  aba.getRange('I2:I1000').setDataValidation(regraCor);

  // Status vira uma listinha de opções (nada de digitar errado!)
  const regraStatus = SpreadsheetApp.newDataValidation()
    .requireValueInList(['disponivel','esgotado','pausado','removido'], true)
    .setAllowInvalid(false).build();
  aba.getRange('J2:J1000').setDataValidation(regraStatus);

  // ✨ SOB ENCOMENDA: marque "sim" se a loja só compra o produto DEPOIS do pedido
  const regraEncomenda = SpreadsheetApp.newDataValidation()
    .requireValueInList(['sim'], true)
    .setAllowInvalid(true).build();
  aba.getRange('N2:N1000').setDataValidation(regraEncomenda);

  // Regras visuais: estoque baixinho fica vermelho; a cor escolhida PINTA a célula!
  const regras = [];
  regras.push(SpreadsheetApp.newConditionalFormatRule()
    .whenNumberEqualTo(0).setBackground('#FB7185').setFontColor('#FFFFFF')
    .setRanges([aba.getRange('H2:H1000')]).build());
  regras.push(SpreadsheetApp.newConditionalFormatRule()
    .whenNumberLessThanOrEqualTo(3).setBackground('#FFE4E6')
    .setRanges([aba.getRange('H2:H1000')]).build());
  // ✨ "sim" na coluna sob encomenda fica verdinho-água
  regras.push(SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('sim').setBackground('#99F6E4')
    .setRanges([aba.getRange('N2:N1000')]).build());
  // 🎨 Cada nome de cor pinta a célula da sua cor!
  const coresDaAba = abaCores.getRange('A2:C30').getValues();
  coresDaAba.forEach(c => {
    if (!c[0]) return;
    regras.push(SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo(String(c[0])).setBackground(String(c[2]))
      .setRanges([aba.getRange('I2:I1000')]).build());
  });
  aba.setConditionalFormatRules(regras);

  aba.getRange('A1').setNote('💡 Cada linha é um produto da vitrine! Digite só o NOME — o ID e o status nascem sozinhos. Preços em REAIS. Emoji, categoria e cor têm listinhas de escolha! ▼');
  aba.getRange('L1').setNote('📸 FOTO: cole aqui o link de compartilhamento de uma foto da pasta "GirlsShop Fotos" no Google Drive. A planilha arruma o link sozinha! Ou use o botão 📷 Foto Mágica no admin da loja (mais fácil!).');
}

function montarAbaCategorias(aba) {
  aba.getRange('A1').setValue('Categorias da loja 🏷️')
     .setBackground('#FBBF24').setFontColor('#5B4500').setFontWeight('bold');
  aba.setFrozenRows(1);
  aba.setColumnWidth(1, 180);
  aba.getRange('A2:A9').setValues([
    ['Acessórios'],['Papelaria'],['Beleza'],['Brinquedos'],['Cabelo'],['Bolsas'],['Roupas'],['Outros']
  ]);
  aba.getRange('A1').setNote('💡 Cadastrem as categorias aqui, uma por linha! Elas aparecem automaticamente na listinha da aba 🛍️ Produtos. Podem adicionar ou apagar à vontade!');
}

function montarAbaCores(aba) {
  aba.getRange('A1:C1').setValues([['Nome da cor','Código (o site usa)','Tom']])
     .setBackground('#F472B6').setFontColor('#FFFFFF').setFontWeight('bold');
  aba.setFrozenRows(1);
  aba.setColumnWidth(1, 120);
  aba.setColumnWidth(2, 280);
  // [nome amigável, gradiente que o site entende, cor pra pintar a célula]
  const cores = [
    ['Lilás',   'linear-gradient(135deg,#DDD6FE,#8B5CF6)', '#DDD6FE'],
    ['Amarelo', 'linear-gradient(135deg,#FDE68A,#FBBF24)', '#FDE68A'],
    ['Verde',   'linear-gradient(135deg,#99F6E4,#2DD4BF)', '#99F6E4'],
    ['Coral',   'linear-gradient(135deg,#FDA4AF,#FB7185)', '#FDA4AF'],
    ['Rosa',    'linear-gradient(135deg,#FBCFE8,#EC4899)', '#FBCFE8'],
    ['Azul',    'linear-gradient(135deg,#BAE6FD,#38BDF8)', '#BAE6FD'],
    ['Verde-lima','linear-gradient(135deg,#D9F99D,#84CC16)', '#D9F99D'],
    ['Laranja', 'linear-gradient(135deg,#FED7AA,#FB923C)', '#FED7AA'],
    ['Roxo',    'linear-gradient(135deg,#DDD6FE,#A78BFA)', '#DDD6FE'],
    ['Vermelho','linear-gradient(135deg,#FECACA,#F87171)', '#FECACA'],
    ['Cinza',   'linear-gradient(135deg,#E7E5E4,#A8A29E)', '#E7E5E4'],
    ['Índigo',  'linear-gradient(135deg,#C7D2FE,#818CF8)', '#C7D2FE']
  ];
  aba.getRange(2, 1, cores.length, 3).setValues(cores);
  // Pinta o nome de cada cor com o tom dela (fica uma paleta linda!)
  cores.forEach((c, i) => {
    aba.getRange(i + 2, 1).setBackground(c[2]);
  });
  aba.getRange('A1').setNote('🎨 Escolham a cor pelo NOME na aba Produtos — a célula se pinta sozinha! A coluna do meio é o código que o site entende (não precisam mexer).');
}

function montarAbaVendas(aba) {
  aba.getRange('A1:E1').setValues([['id','data','itens (JSON)','total (R$)','lucro (R$)']])
     .setBackground('#2DD4BF').setFontColor('#063A33').setFontWeight('bold');
  aba.setFrozenRows(1);
  aba.setColumnWidth(3, 300);
  aba.getRange('D2:E1000').setNumberFormat('R$ #,##0.00');
  aba.getRange('A1').setNote('🤖 Aba automática! Cada venda registrada no admin aparece aqui sozinha. Só olhem e aprendam — não precisa digitar nada! 📈');
}

function montarAbaConfig(aba) {
  aba.getRange('A1:B1').setValues([['chave','valor']])
     .setBackground('#FBBF24').setFontColor('#5B4500').setFontWeight('bold');
  aba.setFrozenRows(1);
  aba.setColumnWidth(1, 140);
  aba.setColumnWidth(2, 260);
  aba.getRange('A1').setNote('⚙️ As configurações da loja moram aqui. O admin do site atualiza esta aba sozinho. Podem olhar, mas mudem com cuidado! 😉');
}

function montarAbaLog(aba) {
  aba.getRange('A1:D1').setValues([['data','acao','detalhe','motivo']])
     .setBackground('#A78BFA').setFontColor('#FFFFFF').setFontWeight('bold');
  aba.setFrozenRows(1);
  aba.setColumnWidth(3, 260);
  aba.getRange('A1').setNote('🤖 Aba automática! É o diário da loja: tudo que acontece no admin é anotado aqui. Só leitura! 📖');
}

function montarAbaMissoes(aba) {
  aba.getRange('A1:D1').setValues([['Feita?','Nível','Missão','O que aprende']])
     .setBackground('#FB7185').setFontColor('#FFFFFF').setFontWeight('bold');
  aba.setFrozenRows(1);
  aba.setColumnWidth(3, 320);
  aba.setColumnWidth(4, 260);

  const missoes = [
    ['🥉 Exploradora','Ache na aba 💰 Vendas qual produto aparece mais vezes','Navegar e filtrar dados'],
    ['🥉 Exploradora','Na aba 🛍️ Produtos, descubra qual produto tem MENOS estoque (dica: a cor vermelha ajuda!)','Ler linhas e colunas'],
    ['🥈 Calculista','Crie uma célula com =SOMA() somando o lucro de todas as vendas','Primeira fórmula!'],
    ['🥈 Calculista','Crie uma fórmula que calcula o lucro de UM produto (venda - custo)','Fórmulas com células'],
    ['🥇 Detetive de Dados','Veja a mágica: o estoque fica vermelho sozinho quando está baixo! Descubra onde isso está configurado (Formatar > Formatação condicional)','Formatação condicional'],
    ['🥇 Detetive de Dados','Cadastre um produto NOVO digitando direto na planilha (ID e status nascem sozinhos!) e veja ele aparecer na vitrine!','Dados vivos!'],
    ['💎 Pesquisadora','Crie um Formulário Google perguntando às amigas o que elas comprariam, e ligue as respostas a uma planilha','Coleta de dados'],
    ['💎 Pesquisadora','Analise as respostas e decida a próxima compra da loja com base nos dados','Decisão com dados'],
    ['👑 CEO','Monte no Apresentações Google o "Pitch das Sócias" com um gráfico vinculado desta planilha','Storytelling com dados'],
    ['👑 CEO','Apresente o pitch pra família e comemore com sorvete! 🍦','Apresentação em público']
  ];
  aba.getRange(2, 2, missoes.length, 3).setValues(missoes);

  // Caixinhas de marcar ✅ (a parte mais gostosa!)
  aba.getRange('A2:A' + (missoes.length + 1)).insertCheckboxes();
  aba.getRange('A1').setNote('🗺️ A trilha de missões da Luna! Marquem ✅ quando completarem cada uma. No ritmo de vocês! 💜');
}

// 💎 Aportes: quem colocou dinheiro na loja, quando e quanto
function montarAbaAportes(aba) {
  aba.getRange('A1:E1').setValues([['id','data','socia','valor (R$)','obs']])
     .setBackground('#8B5CF6').setFontColor('#FFFFFF').setFontWeight('bold');
  aba.setFrozenRows(1);
  aba.setColumnWidth(3, 110);
  aba.setColumnWidth(5, 240);
  aba.getRange('D2:D1000').setNumberFormat('R$ #,##0.00');
  const regraSocia = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Sócia 1','Sócia 2','Sócia 3'], true)
    .setAllowInvalid(true).build();
  aba.getRange('C2:C1000').setDataValidation(regraSocia);
  aba.getRange('A1').setNote('💎 Cada linha é um aporte: dinheiro que uma sócia colocou do próprio bolso na loja. O admin registra e a planilha anota — é a base pra divisão justa dos lucros! 🤝');
}

// 🛒 Compras: a frente de aquisição (reposição de estoque + encomendas)
function montarAbaCompras(aba) {
  aba.getRange('A1:F1').setValues([['id','data','descricao','valor (R$)','status','origem']])
     .setBackground('#F59E0B').setFontColor('#4A2F00').setFontWeight('bold');
  aba.setFrozenRows(1);
  aba.setColumnWidth(3, 300);
  aba.getRange('D2:D1000').setNumberFormat('R$ #,##0.00');
  const regraStatus = SpreadsheetApp.newDataValidation()
    .requireValueInList(['pendente','recebida'], true)
    .setAllowInvalid(true).build();
  aba.getRange('E2:E1000').setDataValidation(regraStatus);
  // Pendente fica amarelinho: impossível esquecer de buscar a encomenda! ⏰
  const regras = [SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('pendente').setBackground('#FEF3C7')
    .setRanges([aba.getRange('E2:E1000')]).build()];
  aba.setConditionalFormatRules(regras);
  aba.getRange('A1').setNote('🛒 Tudo que a loja COMPRA mora aqui! "pendente" = encomenda esperando vocês comprarem (o admin cria sozinho quando vende produto sob encomenda ✨). "recebida" = produto já em mãos.');
}

/* ============================================================
   ⬆️ ATUALIZAÇÃO v3 — rode UMA vez se a planilha JÁ EXISTE!
   (planilha recém-instalada já nasce v3 — este upgrade é só pra
   quem instalou antes: ganha as novidades SEM perder nenhum dado)
   ============================================================ */
function atualizarLojaV3() {
  const ss = planilha(); // acha a planilha pelo ID guardado na instalação

  // 1) Coluna nova "sob encomenda" na aba Produtos (se ainda não tem)
  const abaProdutos = ss.getSheetByName('🛍️ Produtos');
  if (abaProdutos && abaProdutos.getRange(1, 14).getValue() !== 'sob encomenda') {
    abaProdutos.getRange(1, 14).setValue('sob encomenda')
      .setBackground('#8B5CF6').setFontColor('#FFFFFF').setFontWeight('bold');
    const regraSE = SpreadsheetApp.newDataValidation()
      .requireValueInList(['sim'], true).setAllowInvalid(true).build();
    abaProdutos.getRange('N2:N1000').setDataValidation(regraSE);
    const regras = abaProdutos.getConditionalFormatRules();
    regras.push(SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('sim').setBackground('#99F6E4')
      .setRanges([abaProdutos.getRange('N2:N1000')]).build());
    abaProdutos.setConditionalFormatRules(regras);
  }

  // 2) Abas novas (se ainda não existem)
  if (!ss.getSheetByName('💎 Aportes')) montarAbaAportes(ss.insertSheet('💎 Aportes'));
  if (!ss.getSheetByName('🛒 Compras')) montarAbaCompras(ss.insertSheet('🛒 Compras'));

  // 3) Proteções gentis nas abas novas
  ['💎 Aportes', '🛒 Compras'].forEach(function(nome) {
    const aba = ss.getSheetByName(nome);
    if (aba) {
      aba.protect().setWarningOnly(true)
        .setDescription('🤖 Aba automática — só o site escreve aqui! Pode olhar à vontade 👀');
    }
  });

  Logger.log('✨ Loja atualizada pra v3! Ganhou: abas 💎 Aportes e 🛒 Compras + coluna "sob encomenda" em Produtos.');
  Logger.log('👉 Último passo: Implantar > Gerenciar implantações > ✏️ > Versão: Nova versão > Implantar (o link NÃO muda!)');
}

/* ============================================================
   🌉 A PONTE — doGet (site LÊ da planilha) / doPost (site ESCREVE)
   ============================================================ */

function planilha() {
  const id = PropertiesService.getScriptProperties().getProperty('PLANILHA_ID');
  return SpreadsheetApp.openById(id);
}

function responderJSON(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// Site pediu os dados: montamos o pacotinho
function doGet(e) {
  try {
    const acao = (e && e.parameter && e.parameter.acao) || 'ler';
    if (acao !== 'ler') return responderJSON({ ok: false, erro: 'acao desconhecida' });

    const ss = planilha();
    const mapaCores = lerMapaCores(ss.getSheetByName('🎨 Cores'));
    const produtos = lerAbaProdutos(ss.getSheetByName('🛍️ Produtos'), mapaCores);
    const vendas = lerAbaVendas(ss.getSheetByName('💰 Vendas'));
    const config = lerAbaConfig(ss.getSheetByName('⚙️ Config'));
    const log = lerAbaLog(ss.getSheetByName('📜 Log'));
    const aportes = lerAbaAportes(ss.getSheetByName('💎 Aportes'));
    const compras = lerAbaCompras(ss.getSheetByName('🛒 Compras'));

    return responderJSON({
      ok: true,
      atualizadoEm: Number(PropertiesService.getScriptProperties().getProperty('ATUALIZADO_EM') || 0),
      produtos: produtos,
      vendas: vendas,
      config: config,
      log: log,
      aportes: aportes,
      compras: compras
    });
  } catch (erro) {
    return responderJSON({ ok: false, erro: String(erro) });
  }
}

// Site mandou dados: salvamos na planilha
// (o site manda como text/plain de propósito: evita o "preflight" do CORS)
function doPost(e) {
  try {
    const pacote = JSON.parse(e.postData.contents);

    if (pacote.acao === 'foto') {
      return responderJSON(salvarFoto(pacote.imagem));
    }

    if (pacote.acao === 'salvarTudo') {
      const ss = planilha();
      escreverAbaProdutos(ss.getSheetByName('🛍️ Produtos'), pacote.produtos || []);
      escreverAbaVendas(ss.getSheetByName('💰 Vendas'), pacote.vendas || []);
      escreverAbaConfig(ss.getSheetByName('⚙️ Config'), pacote.config || {});
      escreverAbaLog(ss.getSheetByName('📜 Log'), pacote.log || []);
      // Só escreve as abas novas se o site mandou (protege de versões antigas do site!)
      if (pacote.aportes !== undefined) escreverAbaAportes(ss.getSheetByName('💎 Aportes'), pacote.aportes);
      if (pacote.compras !== undefined) escreverAbaCompras(ss.getSheetByName('🛒 Compras'), pacote.compras);
      PropertiesService.getScriptProperties()
        .setProperty('ATUALIZADO_EM', String(pacote.atualizadoEm || Date.now()));
      return responderJSON({ ok: true });
    }

    return responderJSON({ ok: false, erro: 'acao desconhecida' });
  } catch (erro) {
    return responderJSON({ ok: false, erro: 'acao desconhecida' });
  }
}

/* ---------- Leitura (planilha → site). R$ viram centavos! ---------- */

// Lê a aba Cores: nome amigável → código que o site entende
function lerMapaCores(aba) {
  const mapa = {};
  if (!aba) return mapa;
  const dados = aba.getDataRange().getValues();
  for (let i = 1; i < dados.length; i++) {
    if (dados[i][0]) mapa[String(dados[i][0])] = String(dados[i][1]);
  }
  return mapa;
}

function lerAbaProdutos(aba, mapaCores) {
  const dados = aba.getDataRange().getValues();
  const produtos = [];
  for (let i = 1; i < dados.length; i++) {
    const l = dados[i];
    if (!l[0]) continue; // linha vazia
    let cor = String(l[8] || '');
    // Se escolheram a cor pelo nome ("Lilás"), troca pelo código do site!
    if (mapaCores && mapaCores[cor]) cor = mapaCores[cor];
    if (!cor) cor = 'linear-gradient(135deg,#DDD6FE,#8B5CF6)';
    produtos.push({
      id: Number(l[0]),
      nome: String(l[1] || ''),
      emoji: String(l[2] || '🎀'),
      categoria: String(l[3] || 'Outros'),
      custo: Math.round(Number(l[4] || 0) * 100),      // R$ → centavos
      precoVenda: Math.round(Number(l[5] || 0) * 100), // R$ → centavos
      desconto: Number(l[6] || 0),
      estoque: Number(l[7] || 0),
      cor: cor,
      status: String(l[9] || 'disponivel'),
      vendas: Number(l[10] || 0),
      foto: String(l[11] || ''),
      descricao: String(l[12] || ''),
      sobEncomenda: String(l[13] || '').toLowerCase() === 'sim'
    });
  }
  return produtos;
}

function lerAbaVendas(aba) {
  const dados = aba.getDataRange().getValues();
  const vendas = [];
  for (let i = 1; i < dados.length; i++) {
    const l = dados[i];
    if (!l[0]) continue;
    let itens = [];
    try { itens = JSON.parse(l[2] || '[]'); } catch (e) {}
    vendas.push({
      id: Number(l[0]),
      data: String(l[1] || ''),
      itens: itens,
      total: Math.round(Number(l[3] || 0) * 100), // R$ → centavos
      lucro: Math.round(Number(l[4] || 0) * 100)
    });
  }
  return vendas;
}

function lerAbaConfig(aba) {
  const dados = aba.getDataRange().getValues();
  const config = {};
  for (let i = 1; i < dados.length; i++) {
    const chave = String(dados[i][0] || '');
    if (!chave || chave === 'instaladoEm') continue;
    let valor = dados[i][1];
    // campos de dinheiro voltam em centavos
    if (chave === 'metaMensal') valor = Math.round(Number(valor || 0) * 100);
    if (chave === 'aniversarios') { try { valor = JSON.parse(valor); } catch (e) { valor = []; } }
    config[chave] = valor;
  }
  return config;
}

function lerAbaLog(aba) {
  const dados = aba.getDataRange().getValues();
  const log = [];
  for (let i = 1; i < dados.length; i++) {
    const l = dados[i];
    if (!l[0]) continue;
    const reg = { data: String(l[0]), acao: String(l[1] || ''), detalhe: String(l[2] || '') };
    if (l[3]) reg.motivo = String(l[3]);
    log.push(reg);
  }
  return log;
}

// 💎 Aportes: cada linha é dinheiro que uma sócia colocou na loja
function lerAbaAportes(aba) {
  if (!aba) return [];
  const dados = aba.getDataRange().getValues();
  const aportes = [];
  for (let i = 1; i < dados.length; i++) {
    const l = dados[i];
    if (!l[0]) continue;
    aportes.push({
      id: Number(l[0]),
      data: String(l[1] || ''),
      socia: String(l[2] || ''),
      valor: Math.round(Number(l[3] || 0) * 100), // R$ → centavos
      obs: String(l[4] || '')
    });
  }
  return aportes;
}

// 🛒 Compras: a frente de aquisição da loja (reposição + encomendas)
function lerAbaCompras(aba) {
  if (!aba) return [];
  const dados = aba.getDataRange().getValues();
  const compras = [];
  for (let i = 1; i < dados.length; i++) {
    const l = dados[i];
    if (!l[0]) continue;
    compras.push({
      id: Number(l[0]),
      data: String(l[1] || ''),
      descricao: String(l[2] || ''),
      valor: Math.round(Number(l[3] || 0) * 100), // R$ → centavos
      status: String(l[4] || 'recebida'),
      origem: String(l[5] || 'livre')
    });
  }
  return compras;
}

/* ---------- Escrita (site → planilha). Centavos viram R$! ---------- */

function limparAba(aba, numColunas) {
  const ultima = aba.getLastRow();
  if (ultima > 1) aba.getRange(2, 1, ultima - 1, numColunas).clearContent();
}

function escreverAbaProdutos(aba, produtos) {
  limparAba(aba, COLUNAS_PRODUTOS.length);
  if (produtos.length === 0) return;
  const linhas = produtos.map(p => [
    p.id, p.nome, p.emoji, p.categoria,
    (p.custo || 0) / 100, (p.precoVenda || 0) / 100, // centavos → R$
    p.desconto || 0, p.estoque || 0, p.cor || '', p.status || 'disponivel',
    p.vendas || 0, p.foto || '', p.descricao || '', p.sobEncomenda ? 'sim' : ''
  ]);
  aba.getRange(2, 1, linhas.length, COLUNAS_PRODUTOS.length).setValues(linhas);
}

function escreverAbaVendas(aba, vendas) {
  limparAba(aba, 5);
  if (vendas.length === 0) return;
  const linhas = vendas.map(v => [
    v.id, v.data, JSON.stringify(v.itens || []),
    (v.total || 0) / 100, (v.lucro || 0) / 100 // centavos → R$
  ]);
  aba.getRange(2, 1, linhas.length, 5).setValues(linhas);
}

function escreverAbaConfig(aba, config) {
  limparAba(aba, 2);
  const linhas = [];
  Object.keys(config).forEach(chave => {
    if (chave === 'seedCarregado') return; // detalhe interno do site
    let valor = config[chave];
    if (chave === 'metaMensal') valor = (valor || 0) / 100; // centavos → R$
    if (chave === 'aniversarios') valor = JSON.stringify(valor || []);
    linhas.push([chave, valor]);
  });
  if (linhas.length) aba.getRange(2, 1, linhas.length, 2).setValues(linhas);
}

function escreverAbaLog(aba, log) {
  limparAba(aba, 4);
  if (log.length === 0) return;
  const linhas = log.slice(0, 50).map(l => [l.data || '', l.acao || '', l.detalhe || '', l.motivo || '']);
  aba.getRange(2, 1, linhas.length, 4).setValues(linhas);
}

// 💎 Aportes: centavos viram R$ na planilha
function escreverAbaAportes(aba, aportes) {
  if (!aba) return;
  limparAba(aba, 5);
  if (aportes.length === 0) return;
  const linhas = aportes.map(a => [
    a.id, a.data, a.socia || '', (a.valor || 0) / 100, a.obs || ''
  ]);
  aba.getRange(2, 1, linhas.length, 5).setValues(linhas);
}

// 🛒 Compras: a frente de aquisição, em R$ na planilha
function escreverAbaCompras(aba, compras) {
  if (!aba) return;
  limparAba(aba, 6);
  if (compras.length === 0) return;
  const linhas = compras.map(c => [
    c.id, c.data, c.descricao || '', (c.valor || 0) / 100, c.status || 'recebida', c.origem || 'livre'
  ]);
  aba.getRange(2, 1, linhas.length, 6).setValues(linhas);
}

/* ---------- 📷 Upload de fotos → pasta do Drive ---------- */

function salvarFoto(dataUrl) {
  // dataUrl vem como "data:image/jpeg;base64,...."
  const partes = String(dataUrl || '').split(',');
  if (partes.length !== 2) return { ok: false, erro: 'imagem estranha' };

  const tipo = partes[0].indexOf('png') >= 0 ? 'png' : 'jpeg';
  const blob = Utilities.newBlob(Utilities.base64Decode(partes[1]),
    'image/' + tipo, 'produto-' + Date.now() + '.' + (tipo === 'png' ? 'png' : 'jpg'));

  const pastaId = PropertiesService.getScriptProperties().getProperty('PASTA_ID');
  const pasta = DriveApp.getFolderById(pastaId);
  const arquivo = pasta.createFile(blob);
  arquivo.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

  // Esse endereço serve a imagem direto no site ✨
  const url = 'https://drive.google.com/thumbnail?id=' + arquivo.getId() + '&sz=w1000';
  return { ok: true, url: url };
}
