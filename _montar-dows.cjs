// Monta o dows.html (downsell) das Mochilas a partir do downsell da micanga.
//   node funis/mochilas-croche/_montar-dows.cjs
//
// Mesma estrutura, mesmo CSS e mesmo JS da micanga; muda paleta, textos, mídia e links.
// Diferenças de conteúdo em relação à micanga:
//  - no lugar da imagem da oferta entra a VSL (mesmo player do /upsell, como o Heitor pediu)
//  - o trilho de gráficos vira o trilho das mochilas que aparecem nas aulas (assets/amostras)
//  - a prova social são os prints de conversa do funil, não depoimento com foto de rosto
const fs = require('fs');
const path = require('path');
const AQUI = __dirname;

// ── links (os dois ainda pendentes: o checkout do downsell não existe na Wiapy) ──
const LINK_OFERTA = 'https://pay.wiapy.com/grWFJBz5UgAE'; // provisório: Pacote Completo 50% OFF
const LINK_RECUSA = 'https://ateliedamari.vercel.app/';   // recusar vai para a área de membros
const PRECO_DE = 'R$ 19,90';
const PRECO_POR = 'R$ 9,90';

// VSL: mesmo player do /upsell
const VSL = { player: '6aafa4f8ae8c2d9f5c423321', midia: '6aafa4f288ed8308888b9df9' };

let h = fs.readFileSync(path.join(AQUI, '..', 'brincos-micanga', 'dows.html'), 'utf8').replace(/\r/g, '');

const troca = (de, para) => {
  if (typeof de === 'string' && !h.includes(de)) throw new Error('nao achei no dows da micanga: ' + de.slice(0, 70));
  h = typeof de === 'string' ? h.split(de).join(para) : h.replace(de, para);
};

// ── head ────────────────────────────────────────────────────────────────────
troca('<title>Última chance · Miçangas na Prática</title>', '<title>Última chance · Mochilas na Prática</title>');
troca('<meta name="theme-color" content="#e5446e">', '<meta name="theme-color" content="#C8466F">');
troca('<link rel="icon" href="assets/favicon.png">\n', '');
// bloco do VTurb que o painel manda pôr no head, igual ao do /upsell
troca('<link rel="preconnect" href="https://fonts.googleapis.com">', `<!-- ══════════ VSL (VTurb / ConverteAI) ══════════
     Marca o início do carregamento (_plt) e pede o player, a lib e o primeiro pedaço
     do vídeo antes do resto da página. -->
<script>!function(i,n){i._plt=i._plt||(n&&n.timeOrigin?n.timeOrigin+n.now():Date.now())}(window,performance);</script>
<link rel="preload" href="https://scripts.converteai.net/59fb2471-bbf9-48ae-ad59-009b3aba8bd1/players/${VSL.player}/v4/player.js" as="script">
<link rel="preload" href="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/smartplayer.js" as="script">
<link rel="preload" href="https://cdn.converteai.net/59fb2471-bbf9-48ae-ad59-009b3aba8bd1/${VSL.midia}/main.m3u8" as="fetch">
<link rel="dns-prefetch" href="https://cdn.converteai.net">
<link rel="dns-prefetch" href="https://scripts.converteai.net">
<link rel="dns-prefetch" href="https://images.converteai.net">
<link rel="dns-prefetch" href="https://license.vturb.com">
<link rel="preconnect" href="https://fonts.googleapis.com">`);

// ── topo: confirmação da compra e headline ──────────────────────────────────
troca('Seu acesso aos projetos está garantido. Falta só isto:', 'Suas receitas já estão garantidas. Falta só isto:');
troca('<span class="linha-2">As vídeoaulas podem ser <em>vitais para iniciantes</em></span>',
      '<span class="linha-2">As aulas em vídeo podem ser <em>decisivas na primeira mochila</em></span>');
troca(/<p class="ob-upsell__intro">[\s\S]*?<\/p>/,
      `<p class="ob-upsell__intro">
      A receita mostra <em>onde</em> cada ponto vai — mas não mostra a <em>tensão do fio</em>,
      nem como costurar a base no corpo sem a mochila entortar. É aí que a maioria trava.
      Por isso estou refazendo a oferta <strong>pela metade do preço</strong>, e só agora.
    </p>`);

// ── mídia: no lugar da foto entra a VSL ─────────────────────────────────────
const MEDIA_MIC = h.slice(h.indexOf('<div class="ob-upsell__media">'), h.indexOf('</div>', h.indexOf('<div class="ob-upsell__media">')) + 6);
troca(MEDIA_MIC, `<div class="palco-vsl">
        <vturb-smartplayer id="vid-${VSL.player}" style="display:block;margin:0 auto;width:100%;max-width:400px"><div class="vturb-player-placeholder" style="position:relative;width:100%;padding:177.77777777777777% 0 0;z-index:0;background-color:#000"></div></vturb-smartplayer>
      </div>`);

// ── trilho: gráficos da micanga viram as mochilas das aulas ─────────────────
const TRILHO_MIC = h.slice(h.indexOf('<div class="novos__trilho" id="novos-trilho">'),
  h.indexOf('</div>', h.indexOf('</figure>', h.lastIndexOf('assets/ups/modelos/g12-sm.webp'))) + 6);
const mochilas = Array.from({ length: 11 }, (_, i) => 'm' + String(i + 1).padStart(2, '0'))
  .map((m) => `        <figure><img src="assets/amostras-sm/${m}.webp" srcset="assets/amostras-sm/${m}.webp 340w, assets/amostras/${m}.webp 560w" sizes="168px" alt="Mochila de crochê feita nas aulas" width="340" height="340" loading="lazy" decoding="async"></figure>`)
  .join('\n');
troca(TRILHO_MIC, '<div class="novos__trilho" id="novos-trilho">\n' + mochilas + '\n      </div>');
troca('<h3 class="novos__titulo">Você ainda não tem nenhum destes</h3>',
      '<h3 class="novos__titulo">Você vê cada uma <em>sendo montada</em></h3>');

// ── lista: o que ela deixa de fora sem as aulas ─────────────────────────────
const ITENS = [
  ['<strong>50 modelos de brincos exclusivos</strong> — cada um com o seu gráfico, pronto para imprimir, e fora da sua coleção atual.',
   '<strong>50 aulas em vídeo</strong> — uma para cada mochila da coleção, do começo ao fim.'],
  ['<strong>Montagem do zero, do primeiro nó ao brinco pronto</strong> — você vê exatamente onde a agulha entra em cada passo.',
   '<strong>Montagem do zero, do primeiro ponto ao acabamento</strong> — você vê exatamente onde a agulha entra em cada passo.'],
  ['<strong>Passagem do fio sem embolar e sem quebrar miçanga</strong> — o detalhe que o gráfico sozinho não mostra.',
   '<strong>A tensão certa do fio</strong> — é ela que decide se a mochila sai firme ou mole e deformada.'],
  ['<strong>Franjas e acabamento com cara de profissional</strong> — o que separa o brinco caseiro do brinco que vende.',
   '<strong>Base, alças e fecho bem feitos</strong> — o que separa a mochila de iniciante da mochila com cara de loja.'],
  ['<strong>Mais de 17 horas de gravação, sem corte</strong> — dá para pausar, voltar e refazer no seu ritmo.',
   '<strong>Gravação sem corte, no aplicativo</strong> — dá para pausar, voltar dez segundos e refazer no seu ritmo.'],
];
ITENS.forEach(([de, para]) => troca(de, para));
troca('<h3 class="titulo-lista">O que você deixa de fora sem elas</h3>',
      '<h3 class="titulo-lista">O que você deixa de fora sem elas</h3>');

// ── preço ───────────────────────────────────────────────────────────────────
troca('<div class="de">De <s>R$ 19,90</s></div>', '<div class="de">De <s>' + PRECO_DE + '</s></div>');
troca('<div class="por"><b>R$ 9,90</b></div>', '<div class="por"><b>' + PRECO_POR + '</b></div>');
troca('por R$ 9,90', 'por ' + PRECO_POR);

// ── prova: depoimento com foto vira print de conversa, como na página de vendas ──
const PROVA_MIC = h.slice(h.indexOf('<div class="dep">'), h.lastIndexOf('</div>', h.indexOf('<div class="garantia">')) + 6);
const prints = ['dep-01', 'dep-02', 'dep-03']
  .map((d) => `      <figure class="dep-print"><img src="assets/depoimentos/${d}.webp" srcset="assets/depoimentos-sm/${d}.webp 340w, assets/depoimentos/${d}.webp 560w" sizes="(max-width:600px) 88vw, 340px" alt="Conversa de uma aluna mostrando a mochila que fez" width="560" height="1059" loading="lazy" decoding="async"></figure>`)
  .join('\n');
troca(PROVA_MIC, '<div class="dep-prints">\n' + prints + '\n    </div>');
troca('<h3 class="secao-titulo">Quem já está fazendo</h3>', '<h3 class="secao-titulo">Quem já está fazendo</h3>');
// estilo do trilho de prints (o CSS de depoimento com foto não serve para print de conversa)
troca('</style>', `  /* prints de conversa no lugar do depoimento com foto */
  .dep-prints{display:flex;gap:12px;overflow-x:auto;margin:0 -16px 26px;padding:4px 16px 10px;scrollbar-width:none}
  .dep-prints::-webkit-scrollbar{display:none}
  .dep-prints figure{flex:0 0 clamp(230px,72vw,300px);margin:0}
  .dep-prints img{width:100%;height:auto;border-radius:12px;border:1px solid var(--linha);box-shadow:0 8px 18px rgba(16,20,40,.1)}
  .palco-vsl{margin:0 0 4px}
  .novos__trilho figure::before{content:"AULA"}
</style>`);

// ── modal da recusa ─────────────────────────────────────────────────────────
troca(/<p>\s*Esta é a <strong>última vez<\/strong>[\s\S]*?<\/p>/,
      `<p>
      Esta é a <strong>última vez</strong> que as aulas aparecem por ${PRECO_POR}. Depois daqui elas
      voltam ao preço cheio — e a maioria só percebe que precisava delas quando a primeira
      mochila entorta.
    </p>`);

// ── links do gateway, do modal e do destino da recusa ───────────────────────
troca(/https:\/\/pay\.wiapy\.com\/checkout\/6aa1e08aa3b1f406fa7ab24d/g, LINK_OFERTA);
troca(/https:\/\/clubedajuh\.vercel\.app\//g, LINK_RECUSA);
troca(/A recusa NÃO volta para o login da Wiapy:[\s\S]*?\n/,
      'A recusa NÃO volta para o login da Wiapy: vai para a área de membros, que é o fim do funil.\n');

// ── rodapé ──────────────────────────────────────────────────────────────────
troca('Miçangas da Juh · todos os direitos reservados', 'Coleção Mochilas em Crochê · todos os direitos reservados');

// ── player da VSL no fim do body, como no /upsell ───────────────────────────
troca('</body>', `<script type="text/javascript">
  var s = document.createElement("script");
  s.src = "https://scripts.converteai.net/59fb2471-bbf9-48ae-ad59-009b3aba8bd1/players/${VSL.player}/v4/player.js",
  s.async = !0, document.head.appendChild(s);
</script>
</body>`);

// ── paleta por último: antes dela os hex da micanga ainda batem com os textos ──
const PALETA = [
  ['--rosa:#ec3a72', '--rosa:#C8466F'], ['--rosa-esc:#cc2f58', '--rosa-esc:#A8335A'],
  ['--rosa-fundo:#fff5f8', '--rosa-fundo:#FCEEF2'], ['--rosa-linha:#f5d4de', '--rosa-linha:#F0D6DF'],
  ['--tinta:#0e1120', '--tinta:#35242A'], ['--cinza:#6b7280', '--cinza:#6E5F64'],
  ['--papel:#f7f8fa', '--papel:#FBF5EF'], ['--linha:#e8ebef', '--linha:#F0E3DA'],
  [/#f2497e/g, '#D45C81'], [/#e5446e/g, '#C8466F'], [/#b03256/g, '#8A2A4A'],
  [/#fffdfd/g, '#FFFCFC'], [/#4b5163/g, '#5A4A50'], [/#111827/g, '#35242A'],
  [/rgba\(236,58,114,/g, 'rgba(200,70,111,'],
];
PALETA.forEach(([de, para]) => { h = typeof de === 'string' ? h.split(de).join(para) : h.replace(de, para); });

fs.writeFileSync(path.join(AQUI, 'dows.html'), h);
console.log('dows.html: ' + h.length + ' bytes · oferta ' + PRECO_POR + ' · botão ' + LINK_OFERTA);
