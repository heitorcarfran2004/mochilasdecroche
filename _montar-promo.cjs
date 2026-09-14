// Monta o promo.html (pagina de saida) das Mochilas a partir do da micanga.
//   node funis/mochilas-croche/_montar-promo.cjs
const fs = require('fs');
const path = require('path');
let h = fs.readFileSync(path.join(__dirname, '..', 'brincos-micanga', 'promo.html'), 'utf8').replace(/\r/g, '');

const troca = (de, para) => {
  if (typeof de === 'string') {
    if (!h.includes(de)) throw new Error('nao achei: ' + de.slice(0, 70));
    h = h.split(de).join(para);
  } else h = h.replace(de, para);
};

// UTMify da micanga fora: mandaria as vendas para o painel errado
const UTMIFY = fs.readFileSync(path.join(__dirname, '_utmify.html'), 'utf8').trim();
h = h.replace(/<!-- UTMify -->\n<script>[^\n]*<\/script>/, () => '<!-- UTMify -->\n' + UTMIFY);

troca('<title>Espera! Oferta única — 100 Projetos de Brincos de Miçanga por R$ 8,90</title>',
  '<title>Espera! Oferta única — 50 Projetos de Mochilas em Crochê por R$ 8,90</title>');
troca('a Coleção Completa com os 100 projetos e os 6 bônus por R$ 8,90', 'a Coleção Completa com as 50 receitas e os 5 bônus por R$ 8,90');

// paleta
[['--coral:#E5446E', '--coral:#C8466F'], ['--coral-esc:#C32E56', '--coral-esc:#A8335A'], ['--coral-nevoa:#FDEFF3', '--coral-nevoa:#FCEEF2'],
 ['--turq:#12707C', '--turq:#8A2A4A'], ['--turq-esc:#0B5158', '--turq-esc:#5C1A31'],
 ['--mostarda:#F0A81E', '--mostarda:#E3A03A'], ['--mostarda-claro:#FFF3DA', '--mostarda-claro:#FDF1DC'],
 ['--tinta:#233039', '--tinta:#35242A'], ['--cinza:#5F7079', '--cinza:#6E5F64'],
 ['--creme:#FDF9F4', '--creme:#FBF5EF'], ['--borda:#EFE6DC', '--borda:#F0E3DA']].forEach(([a, b]) => troca(a, b));
h = h.replace(/rgba\(18,112,124,/g, 'rgba(92,26,49,').replace(/rgba\(229,68,110,/g, 'rgba(200,70,111,');

troca('<h2>Coleção Completa · 100 projetos</h2>', '<h2>Coleção Completa · 50 mochilas</h2>');
h = h.replace(/<li><span class="ck">✓<\/span><span>Os <b>100 projetos completos<\/b>[^\n]*\n/,
  '<li><span class="ck">✓</span><span>As <b>50 receitas completas</b>, dos modelos adultos aos infantis</span></li>\n');
troca('<span>O gráfico de cada peça, miçanga por miçanga</span>', '<span>Materiais, pontos, peças e ferragens de cada mochila</span>');
troca('<span>Legenda de cores e lista de materiais</span>', '<span>Passo a passo fotografado de cada peça</span>');
troca('<span>Os 7 passos ilustrados de cada modelo</span>', '<span>Montagem e acabamento com cara de loja</span>');
troca('Os 6 bônus continuam inclusos', 'Os 5 bônus continuam inclusos');
h = h.replace(/<ul class="bonus">[\s\S]*?<\/ul>/, `<ul class="bonus">
      <li>👛 <span>30 Carteiras de Crochê <s>R$ 47</s></span></li>
      <li>🧶 <span>Dicionário de Pontos Ilustrado <s>R$ 37</s></span></li>
      <li>✨ <span>Guia de Forro, Zíper e Ferragens <s>R$ 47</s></span></li>
      <li>💰 <span>Como Precificar e Vender <s>R$ 57</s></span></li>
      <li>🛒 <span>Guia de Fios e Lista de Compras <s>R$ 29</s></span></li>
    </ul>`);
troca('<a href="https://pay.wiapy.com/Pp1tgWLL7fXt" class="btn">', '<a href="https://pay.wiapy.com/grWFJBz5UgAE" class="btn">');
troca('Baixe, imprima e faça um projeto.', 'Baixe, escolha uma receita e comece.');

// vitrine: 6 paginas de receita (as mesmas amostras da index)
const V = [['m01', 'Mochila Bicolor'], ['m05', 'Mochila Leãozinho'], ['m03', 'Mochila Girassol Celeste'],
  ['m07', 'Mochila Tartaruga'], ['m11', 'Mochila Gatinho Laranja'], ['m04', 'Mochila Lavanda Serena']];
const fig = (m, alt, oc) => `    <figure${oc ? ' aria-hidden="true"' : ''}><img src="assets/amostras/${m}.webp" srcset="assets/amostras-sm/${m}.webp 320w, assets/amostras/${m}.webp 560w" sizes="(max-width:600px) 160px, 190px" alt="${oc ? '' : 'Página da receita ' + alt}" width="560" height="792" loading="lazy" decoding="async"></figure>`;
h = h.replace(/(<div class="vitrine" id="vitrine">\n)[\s\S]*?(\n  <\/div>)/,
  '$1' + V.map(v => fig(v[0], v[1], false)).concat(V.map(v => fig(v[0], v[1], true))).join('\n') + '$2');
troca('100 páginas como estas — cada uma com o gráfico, as cores e o passo a passo',
  '150 páginas como estas — cada receita com os materiais, as peças e o passo a passo');
troca('<b>Coleção de Brincos de Miçanga</b>', '<b>Coleção Mochilas em Crochê</b>');

// ---------- secao das 3 paginas da receita, reaproveitada da index ----------
{
  const idx = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
  const corpoIdx = fs.readFileSync(path.join(__dirname, '_corpo.html'), 'utf8').replace(/\r/g, '');
  const cssIni = idx.indexOf('  /* ---------- O QUE VAI RECEBER');
  const cssFim = idx.indexOf('  /* com 5 bonus');
  if (cssIni < 0 || cssFim < 0) throw new Error('css das etapas nao encontrado na index');
  const cssEtapas = idx.slice(cssIni, cssFim).replace(/  \.receber\{[^}]*\}\n  \.desejo\{[^}]*\}\n/, '');
  const ini = corpoIdx.indexOf('    <div class="etapas"');
  const fim = corpoIdx.indexOf('    </div>', corpoIdx.indexOf('<div class="zoom" id="zoom" hidden>')) + '    </div>'.length;
  if (ini < 0 || fim < ini) throw new Error('html das etapas nao encontrado');
  const htmlEtapas = corpoIdx.slice(ini, fim);
  const zIni = idx.lastIndexOf('<script>');
  const zoomJs = idx.slice(zIni, idx.indexOf('</script>', zIni) + 9);
  if (!/etapa-img/.test(zoomJs)) throw new Error('script do zoom nao encontrado');
  troca('</style>', cssEtapas + '  .promo-etapas{margin:34px 0 8px;text-align:center}\n  .promo-etapas h2{font-size:clamp(22px,4.6vw,28px);line-height:1.2;margin-bottom:6px}\n  .promo-etapas .etapas{margin-top:22px}\n</style>');
  troca('  <p class="legenda-vitrine">', `  <section class="promo-etapas">
    <h2>O que vem em <span class="script cr">cada receita</span></h2>
${htmlEtapas}
  </section>

  <p class="legenda-vitrine">`);
  troca('</body>', zoomJs + '\n</body>');
}

if (/miçanga|brinco/i.test(h)) {
  const resto = h.split('\n').filter(l => /miçanga|brinco|wiapy/i.test(l));
  console.log('SOBROU:\n' + resto.join('\n'));
}
fs.writeFileSync(path.join(__dirname, 'promo.html'), h, 'utf8');
console.log('promo.html: ' + h.length + ' bytes');
