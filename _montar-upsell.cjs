// Monta o upsell.html das Mochilas a partir do upsell da micanga (mesma estrutura, mesmo
// CSS e mesmo JS), trocando paleta, textos da oferta, VSL e links do gateway.
//   node funis/mochilas-croche/_montar-upsell.cjs
//
// A oferta é a mesma da micanga adaptada: as videoaulas de cada mochila dentro do app
// (Ateliê da Mari). O texto sai da VSL gravada (player 6aafa4f8ae8c2d9f5c423321).
const fs = require('fs');
const path = require('path');
const AQUI = __dirname;

// ── link do checkout da oferta ───────────────────────────────────────────────
// Troque aqui quando o checkout do upsell for criado na Wiapy. Até lá, o botão
// aponta para o checkout do Pacote Completo, que existe e carrega.
const LINK_OFERTA = 'https://pay.wiapy.com/pYw2DaVsqSfq';
// Recusar leva para o downsell (/dows), que é a próxima oferta do funil.
const LINK_RECUSA = 'https://mochilasdecroche.vercel.app/dows';
const PRECO_DE = 'R$ 79,90';
const PRECO_POR = 'R$ 19,90';

// ── VSL (VTurb/ConverteAI): player e mídia da gravação das mochilas ──────────
const VSL_MIC = { player: '6aaf06249dfa48d5c4e4e2a7', midia: '6aaf061e80488426911e21fd' };
const VSL_MOC = { player: '6aafa4f8ae8c2d9f5c423321', midia: '6aafa4f288ed8308888b9df9' };

let h = fs.readFileSync(path.join(AQUI, '..', 'brincos-micanga', 'upsell.html'), 'utf8').replace(/\r/g, '');

// ── paleta: rosa/coral da micanga para o rosé e o vinho das mochilas ─────────
const PALETA = [
  ['--rosa:#ec3a72', '--rosa:#C8466F'], ['--rosa-esc:#cc2f58', '--rosa-esc:#A8335A'],
  ['--rosa-fundo:#fff5f8', '--rosa-fundo:#FCEEF2'], ['--rosa-linha:#f5d4de', '--rosa-linha:#F0D6DF'],
  ['--tinta:#0e1120', '--tinta:#35242A'], ['--cinza:#6b7280', '--cinza:#6E5F64'],
  ['--papel:#f7f8fa', '--papel:#FBF5EF'], ['--linha:#e8ebef', '--linha:#F0E3DA'],
  [/#f2497e/g, '#D45C81'], [/#e5446e/g, '#C8466F'], [/#b03256/g, '#8A2A4A'],
  [/#fffdfd/g, '#FFFCFC'], [/#4b5163/g, '#5A4A50'], [/#111827/g, '#35242A'],
];

const troca = (de, para) => {
  if (typeof de === 'string' && !h.includes(de)) throw new Error('nao achei no upsell da micanga: ' + de.slice(0, 70));
  h = typeof de === 'string' ? h.split(de).join(para) : h.replace(de, para);
};

// ── head: título, tema, favicon (as mochilas não têm), VSL e SDK do Wiapy ────
troca('<title>Oferta única · Miçangas na Prática</title>', '<title>Oferta única · Mochilas na Prática</title>');
troca('<meta name="theme-color" content="#e5446e">', '<meta name="theme-color" content="#C8466F">');
troca('<link rel="icon" href="assets/favicon.png">\n', '');
troca(new RegExp(VSL_MIC.player, 'g'), VSL_MOC.player);
troca(new RegExp(VSL_MIC.midia, 'g'), VSL_MOC.midia);
// SDK do Wiapy: a micanga já está no sell.min.js, que é o mesmo que usamos aqui
if (!h.includes('https://wiapy.com/sell/1.0.0/sell.min.js')) {
  troca('<script src="https://wiapy.com/js/upsell.js" async></script>',
        '<script src="https://wiapy.com/sell/1.0.0/sell.min.js" async></script>');
}
troca('a venda do upsell cai no mesmo painel da index', 'a venda do upsell cai no mesmo painel da index das mochilas');

// ── promessa acima do vídeo ─────────────────────────────────────────────────
troca('<p>Mas antes assista esse vídeo<br>para continuar seu acesso</p>',
      '<p>Mas antes assista esse vídeo<br>para liberar seu acesso completo</p>');

// ── lista da oferta: o que a VSL promete ────────────────────────────────────
const ITENS_MIC = [
  '<strong>+50 gráficos exclusivos</strong>, que não estão na sua coleção.',
  '<strong>50 videoaulas</strong>, uma para cada um desses brincos.',
  '<strong>A montagem do zero ao brinco pronto</strong>, sem corte.',
  '<strong>Acesso vitalício ao aplicativo</strong>, com todo o conteúdo.',
];
const ITENS_MOC = [
  '<strong>50 aulas em vídeo</strong>, uma para cada mochila da coleção.',
  '<strong>A montagem inteira</strong>, do primeiro ponto ao acabamento, sem corte.',
  '<strong>A tensão do fio e a costura da base</strong>, que é onde a mochila entorta.',
  '<strong>Acesso vitalício no aplicativo</strong>, para fazer junto pelo celular.',
];
ITENS_MIC.forEach((de, i) => troca(de, ITENS_MOC[i]));

// ── preço ───────────────────────────────────────────────────────────────────
troca('<s>R$ 79,90</s>', '<s>' + PRECO_DE + '</s>');
troca('<b>R$ 19,90</b>', '<b>' + PRECO_POR + '</b>');

// ── botões do gateway: aceite, recusa e o par de reserva sem o SDK ──────────
troca(new RegExp('https://pay\\.wiapy\\.com/checkout/6aa1e01db0c1c48195cf0ef8', 'g'), LINK_OFERTA);
troca(/https?:\/\/micangasdajuh\.vercel\.app\/dows/g, LINK_RECUSA);
troca(/SIM, EU QUERO A OFERTA/g, 'SIM, EU ACEITO ESSA OFERTA');
troca(/Eu não quero a oferta/g, 'Recusar esta oferta');
troca(/A recusa vai para o downsell \(\/dows\)\./, 'Recusar leva para o downsell (/dows).');

// ── garantia e rodapé ───────────────────────────────────────────────────────
troca('Miçangas da Juh · todos os direitos reservados', 'Coleção Mochilas em Crochê · todos os direitos reservados');

// a paleta entra por último: antes dela os hex da micanga ainda batem com os textos
PALETA.forEach(([de, para]) => { h = typeof de === 'string' ? h.split(de).join(para) : h.replace(de, para); });

fs.writeFileSync(path.join(AQUI, 'upsell.html'), h);
console.log('upsell.html: ' + h.length + ' bytes · oferta ' + PRECO_POR + ' · botão ' + LINK_OFERTA);
